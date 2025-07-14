import React, { useCallback, useEffect } from "react";
import {
  BackHandler,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
} from "react-native";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import { useData } from "@/contexts/DataContext";
import {
  faBellConcierge,
  faBroom,
  faChevronDown,
  faHotel,
  faIndustry,
  faTruck,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import RefusedCard from "@/components/RefusedCard";

const Refused = () => {
  const router = useRouter();
  const { data, setData } = useData();
  const [refusedData, setRefusedData] = React.useState([]);

  useEffect(() => {
    setRefusedData(data.RefusedData);
  }, [data]);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        router.replace("/");
        return true; // prevent default
      };

      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );
      return () => subscription.remove();
    }, [router])
  );

  if (refusedData.length) {
    return (
      <ScrollView className="flex-1 px-2 pt-4 pb-[70px] gap-2">
        {refusedData?.length > 0 ? (
          <View className="gap-2">
            {refusedData.map((job: any, index: number) => (
              <RefusedCard key={index} job={job} index={index} />
            ))}
          </View>
        ) : null}
      </ScrollView>
    );
  }

  return (
    <View>
      <Text>loading</Text>
    </View>
  );
};

export default Refused;
