export interface formDataType {
  id: number;
  title: string;
  fields: formFieldsType[];
}

export type fieldType =
  | "text"
  | "date"
  | "number"
  | "textarea"
  | "checkbox"
  | "radio"
  | "select"
  | "email"
  | "password"
  | "tel"
  | "url"
  | "hidden"
  | "file"
  | "range"
  | "color"
  | "time"
  | "week"
  | "datetime-local"
  | "datetime"
  | "image"
  | "multi-select";

export interface TextInput {
  id: number;
  name: string;
  label: string;
  type: fieldType;
  value: string;
  options?: string[];
}

export interface DropdownInput {
  id: number;
  name: string;
  label: string;
  type: "select" | "radio";
  value: string;
  options: string[];
}

export type formFieldsType = TextInput | DropdownInput;
