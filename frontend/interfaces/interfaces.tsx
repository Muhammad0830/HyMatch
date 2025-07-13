import { FontAwesome } from "@expo/vector-icons";

export type FontAwesomeIconName = React.ComponentProps<typeof FontAwesome>["name"];

export interface HeaderProps {
  title: string;
  leftIcon: FontAwesomeIconName;
  rightIcon: FontAwesomeIconName;
  isIndexHeader?: boolean;
}

export type DataContextType = {
  data: any;
  setData: React.Dispatch<React.SetStateAction<any>>;
};
