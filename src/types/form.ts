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

type TextInput = {
  id: number;
  kind: "TEXT";
  label: string;
  meta:{
    type: fieldType;
  }
  value: string;
};

export interface DropdownInput {
  id: number;
  kind: "DROPDOWN";
  label: string;
  meta: {
    type: "select" | "radio" | "multi-select";
  }
  value: string;
  options: string[];
}

export type formFieldsType = DropdownInput | TextInput;

export interface Form {
  id: number;
  title: string;
  description?: string;
  is_public?: boolean;
}

export type NewForm = Omit<Form, "id">;

export interface formResult<t> {
  count: number;
  next: string | null;
  previous: string | null;
  results: t[];
}

export interface formRawType {
  id: number;
  title: string;
  description: string;
  is_public: boolean;
  created_by: number;
  created_data: string;
  modified_date: string;
}

export type indexFormsType = formResult<formRawType>