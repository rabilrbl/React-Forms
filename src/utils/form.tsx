import { formDataType } from "../types/form";

export const getLocalForms = (): formDataType[] => {
  const localForms = localStorage.getItem("forms");
  if (localForms) {
    return JSON.parse(localForms);
  }
  return [];
};

export const getLocalFields = (id: number): formDataType => {
  const localForms = getLocalForms();
  const form = localForms.find((form) => form.id === id);
  console.log(form);
  if (form) {
    console.log("Found form", form, Date.now());
    return form;
  }
  return { id: 0, title: "", fields: [] };
};

export const saveLocalForms = (formData: formDataType[]): void => {
  localStorage.setItem("forms", JSON.stringify(formData));
};
