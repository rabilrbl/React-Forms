export interface formDataType {
  id: number;
  title: string;
  fields: formFieldsType[];
}

export interface formFieldsType {
  id: number;
  name: string;
  label: string;
  type: string;
  value: string;
}
