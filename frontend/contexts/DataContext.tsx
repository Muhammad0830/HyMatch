import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import defaultData from "../data.json";
import { DataContextType } from "@/interfaces/interfaces";

const DataContext = createContext<DataContextType | null>(null);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error("useData must be used within a DataProvider");
  return context;
};

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<any>(defaultData);

  useEffect(() => {
    (async () => {
      const stored = await AsyncStorage.getItem("myData");
      if (stored) {
        setData(JSON.parse(stored));
      }
    })();
  }, []);

  useEffect(() => {
    console.log(
      "data",
      data.jobsData.map((job: any) => job.id)
    );
    console.log(
      "chosen",
      data.ChosenData.map((job: any) => job.id)
    );
    console.log(
      "refused",
      data.RefusedData.map((job: any) => job.id)
    );
    AsyncStorage.setItem("myData", JSON.stringify(data));
  }, [data]);

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};
