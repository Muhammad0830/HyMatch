import { FieldDefinition } from "@/types/types";
import { faMars, faQuestion, faVenus } from "@fortawesome/free-solid-svg-icons";

export const profileFields: FieldDefinition[] = [
  { name: "name", label: "Name", type: "text" },
  { name: "profileImage", label: "Profile Image", type: "file" },
  {
    name: "age",
    label: "Age",
    type: "select",
    options: Array.from({ length: 83 }, (_, i) => 18 + i),
  },
  {
    name: "country",
    label: "Country",
    type: "select",
    options: ["Japan", "Uzbekistan", "USA"],
  },
  {
    name: "gender",
    label: "Gender",
    type: "radio",
    options: [
      { label: "Male", icon: faMars },
      { label: "Female", icon: faVenus },
      { label: "Other", icon: faQuestion },
    ],
  },
  {
    name: "homeLocation",
    label: "Home Location",
    type: "select",
    options: ["Tokyo", "Osaka", "Kyoto"],
  },
  {
    name: "schoolLocation",
    label: "School Location",
    type: "select",
    options: ["Waseda", "Todai", "Keio"],
  },
  {
    name: "addressCode",
    label: "Address Code",
    type: "text",
    keyboardType: "numeric",
  },
  {
    name: "address",
    label: "Address",
    type: "select",
    options: ["Shinjuku", "Meguro", "Setagaya"],
  },
  {
    name: "phoneNumber",
    label: "Phone Number",
    type: "text",
    keyboardType: "phone-pad",
  },
  {
    name: "emailAddress",
    label: "Email",
    type: "text",
    keyboardType: "email-address",
  },
  {
    name: "JapaneseLevel",
    label: "Japanese Level",
    type: "checkbox",
    options: ["N5", "N4", "N3", "N2", "N1"],
  },
  {
    name: "dayWork",
    label: "Working Days",
    type: "checkbox",
    options: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  { name: "hoursWorkFrom", label: "Work From", type: "text" },
  { name: "hoursWorkTo", label: "Work To", type: "text" },
  {
    name: "starred",
    label: "Starred",
    type: "col-checkbox",
    options: [
      "nearStation",
      "beginnerWelcome",
      "salaryIncrease",
      "timeFlexiblity",
      "5/7Workday",
    ],
  },
];
