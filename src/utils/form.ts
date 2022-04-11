import { navigate } from "raviger";
import { formDataType, formFieldsType, NewForm } from "../types/form";
import { Fetch } from "./Api";

export const getLocalForms = (): formDataType[] => {
  const localForms = localStorage.getItem("forms");
  if (localForms) {
    return JSON.parse(localForms);
  }
  return [];
};

export const getLocalFields = async (id: number) => {
  const response = await Fetch(`/forms/${id}/fields/`);
  if (response.ok) {
    const json = await response.json();
    const title = await Fetch(`/forms/${id}/`).then((res) => res.json()).then(data => data.title);
    const data = json.results;
    return {
      id,
      title: await title,
      fields: await data,
    } as formDataType
  } else {
    throw new Error(`${response.status} ${response.statusText}`);
  }
};

export const saveLocalForms = (formData: formDataType[]): void => {
  localStorage.setItem("forms", JSON.stringify(formData));
};

export const createForm = (formData: NewForm, CB:({title}:{title:string})=>void) => {
  return Fetch("/forms/", "POST", formData).then((response) => {
    if (response.ok) {
      response.json().then((data) =>{
      console.log("Form created", data);
      navigate(`/form/${data.id}`);
    })
      CB({title:""});
    }
  }).catch((error) => {
    
    console.log("Error in Form Creation",error);
  })
}
