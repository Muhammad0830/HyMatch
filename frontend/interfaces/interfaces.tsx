import { FontAwesome } from "@expo/vector-icons";

type FontAwesomeIconName = React.ComponentProps<typeof FontAwesome>["name"];

export interface HeaderProps {
  title: string;
  leftIcon: FontAwesomeIconName;
  rightIcon: FontAwesomeIconName;
  isIndexHeader?: boolean;
}
