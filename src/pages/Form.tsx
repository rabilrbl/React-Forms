import React, { useEffect, useRef } from "react";
import Header from "../components/Header";
import Button from "../components/Button";
import AddFormField from "../components/AddFormField";
import { Link, navigate } from "raviger";
import QuestionInput from "../components/QuestionInput";

interface formDataType {
  id: number;
  title: string;
  fields: formFieldsType[];
}

interface formFieldsType {
  id: number;
  name: string;
  label: string;
  type: string;
  value: string;
}

export const defaultFields: formFieldsType[] = [
  {
    id: 1,
    name: "firstName",
    label: "First Name",
    type: "text",
    value: "",
  },
  {
    id: 2,
    name: "lastName",
    label: "Last Name",
    type: "text",
    value: "",
  },
  {
    id: 3,
    name: "email",
    label: "Email",
    type: "email",
    value: "",
  },
  {
    id: 4,
    name: "phone",
    label: "Phone Number",
    type: "tel",
    value: "",
  },
  {
    id: 5,
    name: "dateOfBirth",
    label: "Date Of Birth",
    type: "date",
    value: "",
  },
];

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
  if (form && form.fields.length > 0) {
    console.log("Found form", form, Date.now());
    return form;
  }
  return { id: 0, title: "", fields: [] };
};

export const saveLocalForms = (formData: formDataType[]): void => {
  localStorage.setItem("forms", JSON.stringify(formData));
};

export const setLocalFields = (formData: formDataType): void => {
  const localForms = getLocalForms();
  const updatedForms = localForms.map((form) =>
    form.id === formData.id ? formData : form
  );
  saveLocalForms(updatedForms);
};

export default function Form(props: {
  action: string;
  method: string;
  id: number;
}) {
  const [formData, setFormData] = React.useState(() =>
    getLocalFields(props.id)
  );
  const [fieldName, setFieldName] = React.useState("");
  const [showAddForm, setShowAddForm] = React.useState(false);
  const [fieldType, setFieldType] = React.useState("text");

  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const oldTitle = document.title;
    document.title = "Form Editor";
    titleRef.current?.focus();
    return () => {
      document.title = oldTitle;
    };
  }, []);

  useEffect(() => {
    let timeout = setTimeout(() => {
      setLocalFields(formData);
      console.log("State Saved at", Date.now());
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [formData]);

  useEffect(() => {
    if (formData.id === 0) {
      alert("No form found with id " + formData.id);
      navigate("/");
    }
  }, [formData.id]);

  const setValue = (id: number, value: string) => {
    setFormData({
      ...formData,
      fields: [
        ...formData.fields.map((field) => {
          if (field.id === id) {
            return { ...field, label: value };
          }
          return field;
        }),
      ],
    });
  };
  const addField = (name: string, label: string, type: string = "text") => {
    setFormData({
      ...formData,
      fields: [
        ...formData.fields,
        { id: Math.floor(Math.random() * 1000), name, label, type, value: "" },
      ],
    });
  };

  const deleteField = (id: number) => {
    setFormData({
      ...formData,
      fields: formData.fields.filter((field) => field.id !== id),
    });
  };
  return (
    <>
      <Header title="WD302 React with Tailwindcss" />
      <input
        className="bg-white focus:outline-none py-1 px-4 focus:ring-2 focus:ring-sky-500 rounded-lg w-full text-gray-800 transition duration-200 ease-in-out"
        type="text"
        placeholder="Enter title for your form"
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        value={formData.title}
        ref={titleRef}
      />
      {formData.fields.map((field) => (
        <QuestionInput
          id={field.id}
          key={field.id}
          type={field.type}
          name={field.name}
          label={field.label}
          value={field.value}
          deleteFieldCB={deleteField}
          setValueCB={setValue}
        />
      ))}

      <div className="relative px-2">
        {showAddForm && (
          <div id="formField" className="rounded-xl">
            <div className="flex items-center space-x-2">
              <AddFormField
                fieldName={fieldName}
                setFieldNameCB={setFieldName}
                fieldType={fieldType}
                setFieldTypeCB={setFieldType}
              />
              <Button
                size="py-1 px-4"
                color="bg-blue-500"
                text="Add"
                onClick={() => {
                  const name = fieldName ? fieldName : "New Field";
                  addField(name.replace(" ", ""), name, fieldType);
                  setFieldName("");
                  setShowAddForm(!showAddForm);
                }}
                hoverColor="bg-red-800"
              />

              <button onClick={() => setShowAddForm(!showAddForm)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}

        <div className="space-x-2">
          {!showAddForm && (
            <span
              className="text-red-700 hover:underline cursor-pointer font-medium"
              onClick={() => {
                setShowAddForm(!showAddForm);
              }}
            >
              Add field
            </span>
          )}
          <span
            className="text-gray-700 hover:underline cursor-pointer font-medium"
            onClick={() => {
              setFormData({
                ...formData,
                fields: formData.fields.map((field) => ({
                  ...field,
                  value: "",
                })),
              });
            }}
          >
            Clear fields
          </span>
        </div>
      </div>

      <div>
        <Button
          color="bg-blue-600"
          text="Save"
          onClick={() => setLocalFields(formData)}
        />
        <Link className="bg-red-500 px-4 py-2 rounded-lg text-white " href="/">
          Close
        </Link>
      </div>
    </>
  );
}
