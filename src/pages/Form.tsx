import React, { useEffect, useRef } from "react";
import Header from "../components/Header";
import Button from "../components/Button";
import AddFormField from "../components/AddFormField";
import { Link, navigate } from "raviger";
import QuestionInput from "../components/QuestionInput";
import {
  DropdownInput,
  fieldType,
  formDataType,
  formFieldsType,
} from "../types/form";
import { getLocalFields, getLocalForms, saveLocalForms } from "../utils/form";
import OptionsInput from "../components/OptionsInput";
import { FormReducer } from "../reducers/FormReducer";
import { FieldReducer } from "../reducers/FieldReducer";

export const defaultFields: formFieldsType[] = [
  {
    kind: "text",
    id: 1,
    name: "firstName",
    label: "First Name",
    type: "text",
    value: "",
  },
  {
    kind: "text",
    id: 2,
    name: "lastName",
    label: "Last Name",
    type: "text",
    value: "",
  },
  {
    kind: "text",
    id: 3,
    name: "email",
    label: "Email",
    type: "email",
    value: "",
  },
  {
    kind: "text",
    id: 4,
    name: "phone",
    label: "Phone Number",
    type: "tel",
    value: "",
  },
  {
    kind: "text",
    id: 5,
    name: "dateOfBirth",
    label: "Date Of Birth",
    type: "date",
    value: "",
  },
  {
    kind: "dropdown",
    id: 6,
    name: "Dropdown",
    label: "Dropdown",
    type: "select",
    value: "",
    options: ["Option 1", "Option 2", "Option 3"],
  },
];

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
  const [formData, dispatch] = React.useReducer(
    FormReducer,
    {
      id: 0,
      fields: [],
      title: "",
    },
    () => getLocalFields(props.id)
  );
  const [field, fieldDispatch] = React.useReducer(FieldReducer, {
    name: "",
    addForm: false,
    type: "text",
  });

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

  return (
    <>
      <Header title="WD302 React with Tailwindcss" />
      <input
        className="bg-white focus:outline-none py-1 px-4 focus:ring-2 focus:ring-sky-500 rounded-lg w-full text-gray-800 transition duration-200 ease-in-out"
        type="text"
        placeholder="Enter title for your form"
        onChange={(e) => dispatch({ type: "SET_TITLE", title: e.target.value })}
        value={formData.title}
        ref={titleRef}
      />
      {formData.fields.map((field: formFieldsType) => {
        if (field.kind === "dropdown") {
          return (
            <QuestionInput
              key={field.id}
              id={field.id}
              name={field.name}
              label={field.label}
              type={field.type}
              value={field.value}
              setValueCB={(id: number,value: string) => dispatch({type: "SET_VALUE", id, value})}
              deleteFieldCB={(id: number) => dispatch({type: "DELETE_FIELD", id})}
            >
              {field.options && (
                <OptionsInput
                  fieldName={field.name}
                  fieldId={field.id}
                  setOptionsCB={(id: number, options: string[]) => dispatch({type: "SET_OPTIONS", id, options})}
                  fieldOptions={field.options}
                />
              )}
            </QuestionInput>
          );
        } else if (field.kind === "text") {
          
          return (
              <>
                <QuestionInput
                  id={field.id}
                  key={field.id}
                  type={field.type}
                  name={field.name}
                  label={field.label}
                  value={field.value}
                  deleteFieldCB={(id: number) =>
                    dispatch({ type: "DELETE_FIELD", id: id })
                  }
                  setValueCB={(id, value) =>
                    dispatch({ type: "SET_VALUE", id: id, value: value })
                  }
                />
                <hr className="my-5 " />
              </>
            );
        }
      })}

      <div className="relative px-2">
        {field.addForm && (
          <div id="formField" className="rounded-xl">
            <div className="flex items-center space-x-2">
              <AddFormField
                fieldName={field.name}
                setFieldNameCB={(name) => fieldDispatch({type: "SET_NAME", name: name})}
                FieldType={field.type}
                setFieldTypeCB={(type) => fieldDispatch({type: "SET_TYPE", fieldType: type})}
              />
              <Button
                size="py-1 px-4"
                color="bg-blue-500"
                text="Add"
                onClick={() => {
                  const name = field.name ? field.name : "New Field";
                  dispatch({
                    type: "ADD_FIELD",
                    name: name.replace(" ", ""),
                    label: name,
                    formType: field.type,
                  });
                  fieldDispatch({type: "SET_NAME", name: ""});
                  fieldDispatch({type: "TOGGLE_ADD"});
                }}
                hoverColor="bg-red-800"
              />

              <button onClick={() => fieldDispatch({type: "TOGGLE_ADD"})}>
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
          {!field.addForm && (
            <button
              className="bg-sky-500 px-4 py-2 text-white rounded-lg hover:underline cursor-pointer"
              onClick={() => {
                fieldDispatch({type: "TOGGLE_ADD"});
              }}
            >
              Add field
            </button>
          )}
          <span
            className="text-gray-700 hover:underline cursor-pointer font-medium"
            onClick={() => {
              dispatch({ type: "CLEAR_FIELDS" });
            }}
          >
            Clear fields
          </span>
        </div>
      </div>
      <hr className="my-3 " />
      <div>
        <Button
          color="bg-blue-600"
          text="Save"
          onClick={() => setLocalFields(formData)}
          size="px-4 py-2 font-medium"
        />
        <Link className="bg-red-500 px-4 py-2 rounded-lg text-white " href="/">
          Close
        </Link>
      </div>
    </>
  );
}
