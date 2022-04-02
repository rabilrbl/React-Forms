import { useState, useEffect } from "react";
import Button from "../components/Button";
import Header from "../components/Header";
import { getLocalForms, saveLocalForms, defaultFields } from "./Form";

export default function Home(props: { fillFormCB: () => void, setFormIdCB: (id: number) => void }) {
  const [forms, setForms] = useState(getLocalForms());

  const deleteForm = (id: number) => {
    setForms(forms.filter((_,index) => index!=id));
  }

  const createForm = () => {
    const newForm = {
      id: Math.floor(Math.random() * 1000),
      title: "Untitled Form",
      fields: defaultFields,
    };
    setForms([...forms, newForm])
  }

  useEffect(() => {
    saveLocalForms(forms);
    console.log("Form Saved at", Date.now());
    // return () => {
    //   clearTimeout(timeout);
    // };
  }, [forms]);

  return (
    <div className="border px-2 py-1 rounded">
      <Header title="Form builder!" />
      <p>Available Forms</p>
    {forms ? forms.map((form, index) => {
        
      return <div className="flex flex-row items-center border px-2" key = {index}>
        <strong>{index+1}. {form.title}</strong>
        <div className="ml-auto order-last">
          <Button
            color="bg-blue-500"
            text="Open"
            onClick={() => {
              props.fillFormCB()
              props.setFormIdCB(index)
            }}
            hoverColor="bg-red-800"
            size="px-2 py-1"
          />
          <Button
            color="bg-red-500"
            text="Delete"
            onClick={() => {
              deleteForm(index)
            }}
            hoverColor="bg-red-800"
            size="px-2 py-1"
          />
        </div>
      </div>
      }):
      <p>No Forms Available</p>
      }
      <Button
          color="bg-sky-500"
          text="Create Form"
          onClick={() => {
            createForm()
          }}
          hoverColor="bg-red-800"
        />
    </div>
  );
}
