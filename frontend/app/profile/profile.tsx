import { useForm, Controller } from "react-hook-form";
import { profileFields } from "@/constants/profileData";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
  Dimensions,
  Modal,
  Pressable,
} from "react-native";
import { FieldDefinition, FormValues } from "@/types/types";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { SelectInput } from "@/components/SelectInput";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useTranslation } from "react-i18next";
import {
  faCheck,
  faClose,
  faQuestion,
  faRotate,
  faSave,
  faUpload,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useData } from "@/contexts/DataContext";
import { generatePdf } from "@/lib/downloadPDFprofile";

const MAX_WIDTH = Dimensions.get("window").width * 0.9;
const MAX_HEIGHT = Dimensions.get("window").height * 0.8;

const prefectures = [
  { label: "東京都", value: "tokyo" },
  { label: "大阪府", value: "osaka" },
  { label: "福島県", value: "fukushima" },
];

const municipalities: Record<string, { label: string; value: string }[]> = {
  tokyo: [
    { label: "品川区", value: "shinagawa" },
    { label: "新宿区", value: "shinjuku" },
  ],
  osaka: [
    { label: "大阪市北区", value: "osaka-kita" },
    { label: "大阪市中央区", value: "osaka-chuo" },
  ],
  fukushima: [
    { label: "郡山市", value: "koriyama" },
    { label: "福島市", value: "fukushima-shi" },
  ],
};

const towns: Record<string, { label: string; value: string }[]> = {
  // Tokyo
  shinagawa: [
    { label: "二葉", value: "futaba" },
    { label: "大崎", value: "osaki" },
  ],
  shinjuku: [
    { label: "歌舞伎町", value: "kabukicho" },
    { label: "西新宿", value: "nishi-shinjuku" },
  ],

  // Osaka
  "osaka-kita": [
    { label: "梅田", value: "umeda" },
    { label: "中之島", value: "nakanoshima" },
  ],
  "osaka-chuo": [
    { label: "心斎橋", value: "shinsaibashi" },
    { label: "道頓堀", value: "dotonbori" },
  ],

  // Fukushima
  koriyama: [
    { label: "開成", value: "kaisei" },
    { label: "安積町", value: "asaka-machi" },
  ],
  "fukushima-shi": [
    { label: "笹谷", value: "sasaya" },
    { label: "飯坂町", value: "iizaka-machi" },
  ],
};

export default function ProfileForm() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
    getValues,
    trigger,
    watch,
    setValue,
  } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      name: "",
      profileImage: null,
    },
  });
  const [imageUri, setImageUri] = useState<string | null>(null);
  const { t } = useTranslation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [showErrorModal, setShowErrorModal] = useState(false);
  const { profileData, setProfileData, setFilterState } = useData();
  const [submitted, setSubmitted] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [showImportantJobsModal, setShowImportantJobsModal] = useState(false);

  const postalCode = watch("postalCode");
  const prefecture = watch("prefecture");
  const city = watch("city");

  // Postal → Address autofill (uses ZipCloud; adjust to your fetch)
  const fetchAddress = async () => {
    if (!postalCode || postalCode.length !== 7) return;

    try {
      const res = await fetch(
        `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${postalCode}`
      );
      const data = await res.json();
      if (!data?.results?.length) return;

      const r = data.results[0]; // { address1: 都道府県, address2: 市区町村, address3: 町域 }

      // match prefecture by kanji label
      const prefVal =
        prefectures.find((p) => r.address1.includes(p.label))?.value ?? "";

      // find city from municipalities of that prefecture
      const muniList = municipalities[prefVal] ?? [];
      const cityVal =
        muniList.find((m) => r.address2.includes(m.label))?.value ?? "";

      // find town from towns of that city
      const townList = towns[cityVal] ?? [];
      const townVal =
        townList.find((t) => r.address3.includes(t.label))?.value ?? "";

      setValue("prefecture", prefVal, {
        shouldDirty: true,
        shouldValidate: true,
      });
      setValue("city", cityVal, { shouldDirty: true, shouldValidate: true });
      setValue("town", townVal, { shouldDirty: true, shouldValidate: true });
    } catch (e) {
      // handle error UI if you want
    }
  };

  const onSubmit = () => {
    const values = getValues();
    values.profileImage = imageUri;
    setProfileData(values);
    const obj: Record<string, boolean> = {};
    values.starred.forEach((star: string) => {
      obj[star] = true;
    });
    setFilterState((prev: any) => ({
      ...prev,
      japaneseLevel: values.JapaneseLevel,
      starred: obj,
    }));

    setSubmitted(true);
  };

  useEffect(() => {
    reset(profileData);

    if (profileData.name && profileData.age) {
      setSubmitted(true);
    }
  }, [profileData, reset]);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission required", "Camera roll access is needed.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const openImageModal = (imageUri: any) => {
    Image.getSize(
      imageUri,
      (width, height) => {
        const aspectRatio = width / height;

        let displayWidth = width;
        let displayHeight = height;

        if (width > MAX_WIDTH) {
          displayWidth = MAX_WIDTH;
          displayHeight = MAX_WIDTH / aspectRatio;
        }

        if (displayHeight > MAX_HEIGHT) {
          displayHeight = MAX_HEIGHT;
          displayWidth = MAX_HEIGHT * aspectRatio;
        }

        setImageSize({ width: displayWidth, height: displayHeight });
        setIsModalVisible(true);
      },
      (error) => {
        console.warn("Image size error", error);
      }
    );
  };

  return (
    <ScrollView className="px-4 mt-4 mb-4">
      <View className="flex-row gap-4 mb-4">
        <View className="flex-1">
          <Text className="mb-1 font-semibold">{t("Name")}</Text>
          <View className="flex-row items-center gap-2">
            <View className="justify-center items-center p-2.5 border border-blue-700 rounded-full">
              <FontAwesomeIcon icon={faUser} size={20} color="blue" />
            </View>
            <Controller
              control={control}
              name="name"
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  className={`border flex-1 rounded-md p-3 bg-white text-black ${
                    errors.name ? "border-red-600" : "border-blue-600/30"
                  }`}
                  value={value}
                  onChangeText={onChange}
                  placeholder={t("name")}
                  placeholderTextColor="#4B5563"
                />
              )}
            />
          </View>
        </View>

        <View className="">
          <Text className="mb-1 font-semibold">{t("Image")}</Text>
          <Controller
            control={control}
            name="profileImage"
            render={() => (
              <View className="flex-row items-center gap-2">
                {imageUri && (
                  <View style={{ width: 40, height: 40, borderRadius: 6 }}>
                    <TouchableOpacity
                      className="w-full h-full"
                      onPress={() => openImageModal(imageUri)}
                    >
                      <Image
                        source={{
                          uri: imageUri,
                        }}
                        className="w-full h-full rounded-md object-contain"
                      />
                    </TouchableOpacity>

                    <Modal
                      animationType="fade"
                      visible={isModalVisible}
                      transparent
                      onRequestClose={() => setIsModalVisible(false)}
                    >
                      <Pressable
                        className="flex-1 justify-center items-center bg-black/30"
                        onPress={() => setIsModalVisible(false)}
                      >
                        <Image
                          source={{ uri: imageUri }}
                          style={{
                            width: imageSize.width,
                            height: imageSize.height,
                            borderRadius: 12,
                          }}
                        />
                      </Pressable>
                    </Modal>
                  </View>
                )}
                <View className="w-[40px] aspect-square">
                  {imageUri ? (
                    <View className="w-full h-full gap-1">
                      <TouchableOpacity
                        onPress={() => setImageUri(null)}
                        className="bg-red-600 w-full h-[45%] justify-center items-center p-2 rounded-md"
                      >
                        <FontAwesomeIcon
                          icon={faClose}
                          size={10}
                          color="white"
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={pickImage}
                        className="bg-blue-500 w-full flex-1 justify-center items-center p-2 rounded-md"
                      >
                        <FontAwesomeIcon
                          icon={faRotate}
                          size={10}
                          color="white"
                        />
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <TouchableOpacity
                      onPress={pickImage}
                      className="bg-blue-500 w-full h-full justify-center items-center p-2 rounded-md"
                    >
                      <FontAwesomeIcon
                        icon={faUpload}
                        size={20}
                        color="white"
                      />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            )}
          />
        </View>
      </View>

      {profileFields
        .filter((field) => !["name", "profileImage"].includes(field.name))
        .map((field: FieldDefinition) => (
          <View key={field.name} className="mb-4">
            <Text className="mb-1 font-bold text-black">
              {t(`${field.label}`)}
            </Text>

            <View className="flex-row items-center gap-2">
              {field.icon ? (
                <View className="justify-center items-center p-2.5 border border-blue-700 rounded-full">
                  <FontAwesomeIcon icon={field.icon} size={20} color="blue" />
                </View>
              ) : (
                ""
              )}
              <View className="flex-1">
                <Controller
                  control={control}
                  name={field.name}
                  rules={{ required: field.required }}
                  render={({ field: { onChange, value } }) => {
                    if (field.type === "text") {
                      return (
                        <TextInput
                          className={`border rounded-md text-black p-3 bg-white ${
                            errors[field.name]
                              ? "border-red-600"
                              : "border-blue-600/30"
                          }`}
                          value={value}
                          onChangeText={onChange}
                          keyboardType={field.keyboardType ?? "default"}
                          placeholder={t(`${field.label}`)}
                          placeholderTextColor={"#4B5563"}
                        />
                      );
                    }

                    if (field.type === "file") {
                      return (
                        <>
                          {imageUri && (
                            <Image
                              source={{ uri: imageUri }}
                              style={{
                                width: 200,
                                height: 200,
                                borderRadius: 10,
                              }}
                            />
                          )}
                          <TouchableOpacity
                            onPress={pickImage}
                            className="bg-blue-500 p-2 rounded-md"
                          >
                            <Text>{field.label}</Text>
                          </TouchableOpacity>
                        </>
                      );
                    }

                    if (field.type === "select" && field.options) {
                      return (
                        <SelectInput
                          buttonClassName={`border rounded-md p-3 bg-white ${
                            errors[field.name]
                              ? "border-red-600"
                              : "border-blue-600/30"
                          }`}
                          label={field.label}
                          value={value}
                          options={field.options}
                          onChange={onChange}
                        />
                      );
                    }

                    if (field.type === "address") {
                      return (
                        <View className="flex-1 padding-[20px] justify-center">
                          {field.name === "postalCode" ? (
                            <View className="flex-row items-center gap-2 mb-2">
                              <TextInput
                                className={`border flex-1 rounded-md p-3 bg-white text-black ${
                                  errors.postalCode
                                    ? "border-red-600"
                                    : "border-blue-600/30"
                                }`}
                                keyboardType="numeric"
                                value={value}
                                onChangeText={(txt) =>
                                  onChange(txt.replace(/\D/g, ""))
                                }
                                placeholder={`${t("例: 1420043")}`}
                                placeholderTextColor="#4B5563"
                              />
                              <TouchableOpacity
                                disabled={postalCode?.length !== 7}
                                className={`bg-blue-700 h-full px-3 justify-center items-center rounded-md ${
                                  (value || "").length !== 7 ? "opacity-50" : ""
                                }`}
                                onPress={fetchAddress}
                              >
                                <Text className="text-white">
                                  {t("autoFill")}
                                </Text>
                              </TouchableOpacity>
                            </View>
                          ) : field.name === "prefecture" ? (
                            <SelectInput
                              buttonClassName={`border rounded-md p-3 bg-white ${
                                errors.prefecture
                                  ? "border-red-600"
                                  : "border-blue-600/30"
                              }`}
                              label="都道府県"
                              value={value}
                              options={prefectures}
                              onChange={(val) => {
                                setValue("prefecture", String(val), {
                                  shouldDirty: true,
                                  shouldValidate: true,
                                });
                                setValue("city", "", {
                                  shouldDirty: true,
                                  shouldValidate: true,
                                });
                                setValue("town", "", {
                                  shouldDirty: true,
                                  shouldValidate: true,
                                });
                              }}
                            />
                          ) : field.name === "city" ? (
                            <SelectInput
                              buttonClassName={`border rounded-md p-3 bg-white ${
                                errors.city
                                  ? "border-red-600"
                                  : "border-blue-600/30"
                              }`}
                              label="市区町村"
                              value={value}
                              options={municipalities[prefecture] || []}
                              onChange={(val) => {
                                setValue("city", String(val), {
                                  shouldDirty: true,
                                  shouldValidate: true,
                                });
                                setValue("town", "", {
                                  shouldDirty: true,
                                  shouldValidate: true,
                                });
                              }}
                              disabled={!prefecture}
                            />
                          ) : field.name === "town" ? (
                            <SelectInput
                              buttonClassName={`border rounded-md p-3 bg-white ${
                                errors.town
                                  ? "border-red-600"
                                  : "border-blue-600/30"
                              }`}
                              label="町域"
                              value={value}
                              options={towns[city] || []}
                              onChange={(val) => onChange(String(val))}
                              disabled={!city}
                            />
                          ) : (
                            <TextInput
                              className={`border flex-1 rounded-md p-3 bg-white text-black ${
                                errors["Chome, block number, and number"]
                                  ? "border-red-600"
                                  : "border-blue-600/30"
                              }`}
                              value={value}
                              onChangeText={onChange}
                              placeholder="丁目・番地・号（手動入力）"
                              placeholderTextColor="#4B5563"
                            />
                          )}
                        </View>
                      );
                    }

                    if (field.type === "radio") {
                      const radioOptions = field.options as {
                        label: string;
                        icon: any;
                      }[];

                      return (
                        <View
                          className={`flex-row items-center gap-2 justify-between border rounded-md ${
                            errors[field.name]
                              ? "border-red-600"
                              : "border-transparent"
                          }`}
                        >
                          {radioOptions?.map((option, index) => {
                            const isSelected = value === option.label;

                            return (
                              <TouchableOpacity
                                key={index}
                                className={`flex-row items-center gap-2 px-3 py-2 rounded-md border ${
                                  isSelected
                                    ? "bg-blue-100 border-blue-500"
                                    : "bg-white border-blue-600/30"
                                }`}
                                onPress={() => onChange(option.label)}
                              >
                                <View>
                                  <FontAwesomeIcon
                                    icon={option.icon}
                                    size={20}
                                    color="blue"
                                  />
                                </View>
                                <Text className="text-black font-bold">
                                  {t(`${option.label}`)}
                                </Text>
                              </TouchableOpacity>
                            );
                          })}
                        </View>
                      );
                    }

                    if (field.type === "checkbox") {
                      return (
                        <View
                          className={`flex-row flex-1 items-center gap-1 p-1 border ${
                            errors[field.name]
                              ? "border-red-600 rounded-md"
                              : "border-blue-200 border-y-0 border-x-[1px]"
                          } ${
                            field.name === "JapaneseLevel"
                              ? "justify-evenly"
                              : "justify-between"
                          }`}
                        >
                          {field.options?.map((option, index) => {
                            const isSelected = value?.includes(
                              option as string
                            );
                            const handleToggle = () => {
                              const updated = isSelected
                                ? value?.filter((v: string) => v !== option)
                                : [...(value || []), option];
                              onChange(updated);
                            };

                            return (
                              <TouchableOpacity
                                key={index}
                                className={`aspect-square w-[35px] justify-center items-center rounded-full bg-white border ${
                                  isSelected
                                    ? "bg-[#dbeafe] border-blue-500"
                                    : "bg-white border-blue-600/30"
                                }`}
                                onPress={handleToggle}
                              >
                                <Text className="text-sm font-bold text-black">
                                  {t(`${option}`)}
                                </Text>
                              </TouchableOpacity>
                            );
                          })}
                        </View>
                      );
                    }

                    if (field.type === "col-checkbox") {
                      return (
                        <View>
                          <TouchableOpacity
                            className={`px-4 py-3 flex-row items-center bg-white justify-between gap-2 p-1 border rounded-md ${
                              errors["starred"]
                                ? "border-red-600"
                                : "border-blue-200"
                            }`} 
                            onPress={() => setShowImportantJobsModal(true)}
                          >
                            <Text>
                              {value?.length > 0
                                ? t("Selected")
                                : t("Select...")}
                            </Text>
                            <View
                              className={`p-1 rounded-full bg-green-500 justify-center items-center ${
                                value?.length > 0 ? "flex" : "hidden"
                              }`}
                            >
                              <FontAwesomeIcon
                                icon={faCheck}
                                size={16}
                                color="white"
                              />
                            </View>
                          </TouchableOpacity>

                          {/* important jobs criteria modal */}
                          <View>
                            <Modal visible={showImportantJobsModal} transparent>
                              <View className="absolute top-0 bottom-0 left-0 right-0 rounded-md w-full justify-center items-center">
                                <Pressable
                                  className="flex-1 w-full justify-center items-center bg-black/40 px-4"
                                  onPress={() =>
                                    setShowImportantJobsModal(false)
                                  }
                                ></Pressable>

                                <View
                                  style={{ width: 300 }}
                                  className={`absolute bg-white items-center gap-2 p-3 border rounded-md`}
                                >
                                  {field.options?.map((option, index) => {
                                    const isSelected = value?.includes(
                                      option as string
                                    );
                                    const handleToggle = () => {
                                      const updated = isSelected
                                        ? value?.filter(
                                            (v: string) => v !== option
                                          )
                                        : [...(value || []), option];
                                      onChange(updated);
                                    };

                                    return (
                                      <TouchableOpacity
                                        key={index}
                                        className={`w-full px-3 py-2 flex-row justify-between items-center rounded-md bg-white border ${
                                          isSelected
                                            ? "bg-[#DBEAFE] border-blue-500"
                                            : "bg-white border-blue-600/30"
                                        }`}
                                        onPress={handleToggle}
                                      >
                                        <Text className="text-sm text-black font-bold">
                                          {t(`${option}`)}
                                        </Text>
                                        {isSelected ? (
                                          <View className="bg-green-500 border border-green-500 rounded-full p-1">
                                            <FontAwesomeIcon
                                              icon={faCheck}
                                              size={10}
                                              color="white"
                                            />
                                          </View>
                                        ) : (
                                          <View className="bg-white border rounded-full p-1">
                                            <FontAwesomeIcon
                                              icon={faCheck}
                                              size={10}
                                              color="white"
                                            />
                                          </View>
                                        )}
                                      </TouchableOpacity>
                                    );
                                  })}
                                  <TouchableOpacity
                                    className="flex-1 w-full justify-center items-center bg-blue-500 px-4 py-3 rounded-md"
                                    onPress={() =>
                                      setShowImportantJobsModal(false)
                                    }
                                  >
                                    <Text className="text-white font-bold">
                                      {t("Close")}
                                    </Text>
                                  </TouchableOpacity>
                                </View>
                              </View>
                            </Modal>
                          </View>
                        </View>
                      );
                    }

                    return <></>;
                  }}
                />
              </View>
            </View>
          </View>
        ))}

      <View className="flex-row items-center gap-4 mt-4">
        <View className="w-[45%]">
          <TouchableOpacity
            disabled={!isValid}
            className={`bg-blue-700 rounded-md px-3 py-2 gap-2 flex-row justify-center items-center`}
            style={{ backgroundColor: isValid ? "#1D4ED8" : "#93C5FD" }}
            onPress={handleSubmit(onSubmit)}
          >
            <FontAwesomeIcon icon={faSave} size={16} color="white" />
            <Text className="text-white">{t("Save")}</Text>
            {submitted ? (
              <View className="absolute top-0 left-0 bottom-0 justify-center">
                <TouchableOpacity
                  disabled={!isValid}
                  className={`bg-green-500 rounded-full p-1 ml-4 ${
                    isValid ? "" : "opacity-50"
                  }`}
                >
                  <FontAwesomeIcon icon={faCheck} size={12} color="white" />
                </TouchableOpacity>
              </View>
            ) : null}
          </TouchableOpacity>
          {!isValid && (
            <View className="absolute right-0 top-0 bottom-0 left-0 justify-end flex-row items-center gap-1">
              <TouchableOpacity
                onPress={() => {
                  trigger();
                  setShowErrorModal(true);
                }}
                className="ml-1 bg-red-600 rounded-full p-1 mr-4"
              >
                <FontAwesomeIcon icon={faQuestion} size={12} color="white" />
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View className="flex-1">
          <TouchableOpacity
            disabled={!isValid || !submitted}
            className={`bg-blue-700 rounded-md px-3 py-2 gap-2 flex-row justify-center items-center`}
            style={{ backgroundColor: isValid ? "#1D4ED8" : "#93C5FD" }}
            onPress={() => {
              generatePdf({ ...profileData, imageUri });
              setDownloaded(true);
            }}
          >
            <Text className="text-white">{t("Download")}</Text>
            {downloaded ? (
              <View className="absolute top-0 left-0 bottom-0 justify-center">
                <TouchableOpacity
                  disabled={!isValid}
                  className={`bg-green-500 rounded-full p-1 ml-4 ${
                    isValid ? "" : "opacity-50"
                  }`}
                >
                  <FontAwesomeIcon icon={faCheck} size={12} color="white" />
                </TouchableOpacity>
              </View>
            ) : null}
          </TouchableOpacity>
          {!isValid && (
            <View className="absolute right-0 top-0 bottom-0 left-0 justify-end flex-row items-center gap-1">
              <TouchableOpacity
                onPress={() => {
                  trigger();
                  setShowErrorModal(true);
                }}
                className="ml-1 bg-red-600 rounded-full p-1 mr-4"
              >
                <FontAwesomeIcon icon={faQuestion} size={12} color="white" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      {/* empty fields modal */}
      <View>
        <Modal
          transparent
          visible={showErrorModal}
          animationType="fade"
          onRequestClose={() => setShowErrorModal(false)}
        >
          <Pressable
            className="flex-1 justify-center items-center bg-black/40 px-4"
            onPress={() => setShowErrorModal(false)}
          >
            <View className="bg-white p-5 rounded-lg w-full max-w-md">
              <Text className="text-lg font-bold mb-2 text-red-600">
                {t("Required fields missing:")}
              </Text>

              <View className="gap-1.5">
                {Object.entries(errors).map(([fieldName]) => (
                  <View
                    key={fieldName}
                    className="p-1.5 rounded-md border border-red-600"
                  >
                    <Text className="text-gray-800">{t(fieldName)}</Text>
                  </View>
                ))}
              </View>

              <TouchableOpacity
                onPress={() => setShowErrorModal(false)}
                className="mt-4 bg-blue-600 py-2 px-4 rounded-md"
              >
                <Text className="text-white text-center">{t("Got it")}</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Modal>
      </View>
    </ScrollView>
  );
}
