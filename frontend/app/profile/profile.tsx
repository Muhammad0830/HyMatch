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
} from "@fortawesome/free-solid-svg-icons";
import { useData } from "@/contexts/DataContext";

const MAX_WIDTH = Dimensions.get("window").width * 0.9;
const MAX_HEIGHT = Dimensions.get("window").height * 0.8;

export default function ProfileForm() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
    getValues,
    trigger,
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
  const { profileData, setProfileData } = useData();
  const [submitted, setSubmitted] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const onSubmit = () => {
    const values = getValues();
    values.profileImage = imageUri;
    setProfileData(values);

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
          <Controller
            control={control}
            name="name"
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                className={`border rounded-md p-3 bg-white text-black font-bold ${
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
                        source={{ uri: imageUri }}
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

            <Controller
              control={control}
              name={field.name}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => {
                if (field.type === "text") {
                  return (
                    <TextInput
                      className={`border rounded-md font-bold text-black p-3 bg-white ${
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

                if (field.type === "radio") {
                  const radioOptions = field.options as {
                    label: string;
                    icon: any;
                  }[];

                  return (
                    <View className="flex-row">
                      <View
                        className={`flex-row items-center gap-2 p-1 border rounded-md ${
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
                    </View>
                  );
                }

                if (field.type === "checkbox") {
                  return (
                    <View
                      className={`flex-row items-center gap-2 p-1 border rounded-md ${
                        errors[field.name]
                          ? "border-red-600"
                          : "border-transparent"
                      } ${
                        field.name === "japaneseLevel"
                          ? "justify-between"
                          : "justify-evenly"
                      }`}
                    >
                      {field.options?.map((option, index) => {
                        const isSelected = value?.includes(option as string);
                        const handleToggle = () => {
                          const updated = isSelected
                            ? value?.filter((v: string) => v !== option)
                            : [...(value || []), option];
                          onChange(updated);
                        };

                        return (
                          <TouchableOpacity
                            key={index}
                            className={`aspect-square w-[40px] justify-center items-center rounded-full bg-white border ${
                              isSelected
                                ? "bg-[#DBEAFE] border-blue-500"
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
                    <View
                      className={`items-center gap-2 p-1 border rounded-md ${
                        errors[field.name]
                          ? "border-red-600"
                          : "border-transparent"
                      } ${
                        field.name === "japaneseLevel"
                          ? "justify-between"
                          : "justify-evenly"
                      }`}
                    >
                      {field.options?.map((option, index) => {
                        const isSelected = value?.includes(option as string);
                        const handleToggle = () => {
                          const updated = isSelected
                            ? value?.filter((v: string) => v !== option)
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
                    </View>
                  );
                }

                return <></>;
              }}
            />
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
                  setShowErrorModal(true);
                  trigger();
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
            disabled={!isValid}
            className={`bg-blue-700 rounded-md px-3 py-2 gap-2 flex-row justify-center items-center`}
            style={{ backgroundColor: isValid ? "#1D4ED8" : "#93C5FD" }}
            onPress={() => {
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
                  setShowErrorModal(true);
                  trigger();
                }}
                className="ml-1 bg-red-600 rounded-full p-1 mr-4"
              >
                <FontAwesomeIcon icon={faQuestion} size={12} color="white" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

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
