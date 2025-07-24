import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import defaultData from "../data.json";
import defaultprofileData from "../profileData.json";
import { DataContextType } from "@/interfaces/interfaces";

const DataContext = createContext<DataContextType | null>(null);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error("useData must be used within a DataProvider");
  return context;
};

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<any>(defaultData);
  const [profileData, setProfileData] = useState<any>(defaultprofileData);

  useEffect(() => {
    (async () => {
      const stored = await AsyncStorage.getItem("myData");
      const profileStored = await AsyncStorage.getItem("profileData");

      if (stored) {
        setData(JSON.parse(stored));
      }
      if (profileStored) {
        setProfileData(JSON.parse(profileStored));
      }
    })();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("myData", JSON.stringify(data));
  }, [data]);
  useEffect(() => {
    AsyncStorage.setItem("profileData", JSON.stringify(profileData));
  }, [profileData]);
  console.log("Chosen", profileData);

  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        profileData,
        setProfileData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
