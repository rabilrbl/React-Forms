import React, { useEffect, useRef } from "react";
import Header from "../components/Header";
import Button from "../components/Button";
import AddFormField from "../components/AddFormField";
import { Link } from "raviger";
import QuestionInput from "../components/QuestionInput";
import { formDataType, formFieldsType } from "../types/form";
import { getLocalFields, getLocalForms, saveLocalForms } from "../utils/form";
import OptionsInput from "../components/OptionsInput";
import { FormReducer } from "../reducers/FormReducer";
import { FieldReducer } from "../reducers/FieldReducer";
import { Fetch } from "../utils/Api";
import Loading from "../components/Loading";

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
  const [formData, dispatch] = React.useReducer(FormReducer, {
    id: 0,
    title: "",
    fields: [],
  });
  const [field, fieldDispatch] = React.useReducer(FieldReducer, {
    name: "",
    addForm: false,
    type: "text",
  });
  const isMounted = useRef(false);
  const [isLoading, setIsLoading] = React.useState(true);

  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getLocalFields(props.id)
      .then((data) => {
        dispatch({ type: "SET_STATE", payload: data });
      })
      .then(() => setIsLoading(false));
  }, [props.id]);

  useEffect(() => {
    const oldTitle = document.title;
    document.title = "Form Editor";
    titleRef.current?.focus();
    return () => {
      document.title = oldTitle;
    };
  }, []);

  useEffect(() => {
    if (isMounted.current) {
      let timeout = setTimeout(() => {
        Fetch(`/forms/${props.id}/`, "PUT", formData);
        console.log("State Saved at", Date.now());
      }, 1000);
      return () => {
        clearTimeout(timeout);
      };
    } else {
      isMounted.current = true;
    }
  }, [formData, props.id]);

  return (
    <>
      <Header title="WD302 React with Tailwindcss" />
      {isLoading ? (
        <h2 className="my-5 flex justify-center">
          <Loading />
        </h2>
      ) : (
        <input
          className="bg-white border shadow-lg focus:outline-none text-lg font-bold text-sky-600 py-1 px-4 mb-5 focus:ring-2 focus:ring-sky-500 rounded-lg w-full transition duration-200 ease-in-out"
          type="text"
          placeholder="Enter title for your form"
          onChange={(e) =>
            dispatch({ type: "SET_TITLE", title: e.target.value })
          }
          value={formData.title}
          ref={titleRef}
        />
      )}
      {formData.fields.map((field: formFieldsType) => {
        if (field.kind === "DROPDOWN") {
          if (!field.options) {
            field.options = [];
          }
          return (
            <QuestionInput
              key={field.id}
              id={field.id}
              label={field.label}
              type={field.meta.type}
              value={field.value}
              setValueCB={(id: number, value: string) =>
                dispatch({ type: "SET_VALUE", id, value })
              }
              deleteFieldCB={(id: number) => {
                Fetch(`/forms/${formData.id}/fields/${id}/`, "DELETE").then(
                  (response) => {
                    if (response.ok) {
                      response.json().then((data) => {
                        alert("Field Deleted");
                        console.log("Field deleted", data);
                      });
                    } else {
                      throw new Error(
                        `${response.status} ${response.statusText}`
                      );
                    }
                  }
                );
                dispatch({ type: "DELETE_FIELD", id: id, formId: formData.id });
              }}
            >
              {field.options && (
                <OptionsInput
                  fieldId={field.id}
                  setOptionsCB={(id: number, options: string[]) =>
                    dispatch({ type: "SET_OPTIONS", id, options })
                  }
                  formId={formData.id}
                  fieldOptions={field.options}
                />
              )}
            </QuestionInput>
          );
        } else if (field.kind === "TEXT") {
          return (
            <React.Fragment key={field.id}>
              <QuestionInput
                id={field.id}
                type={field.meta.type ? field.meta.type : "text"}
                label={field.label}
                value={field.value}
                deleteFieldCB={(id: number) => {
                  Fetch(`/forms/${formData.id}/fields/${id}/`, "DELETE").then(
                    (response) => {
                      if (response.ok) {
                        response.json().then((data) => {
                          alert("Field Deleted");
                          console.log("Field deleted", data);
                        });
                      } else {
                        throw new Error(
                          `${response.status} ${response.statusText}`
                        );
                      }
                    }
                  );
                  dispatch({
                    type: "DELETE_FIELD",
                    id: id,
                    formId: formData.id,
                  });
                }}
                setValueCB={(id, value) =>
                  dispatch({ type: "SET_VALUE", id: id, value: value })
                }
              />
              <hr className="my-5 " />
            </React.Fragment>
          );
        }
      })}

      <div className="relative px-2">
        {field.addForm && (
          <div id="formField" className="rounded-xl">
            <div className="flex items-center space-x-2">
              <AddFormField
                fieldName={field.name}
                setFieldNameCB={(name) =>
                  fieldDispatch({ type: "SET_NAME", name: name })
                }
                FieldType={field.type}
                setFieldTypeCB={(type) =>
                  fieldDispatch({ type: "SET_TYPE", fieldType: type })
                }
              />
              <Button
                size="py-1 px-4"
                color="bg-blue-500"
                text="Add"
                onClick={() => {
                  const kind =
                    field.type === "select" ||
                    field.type === "multi-select" ||
                    field.type === "radio"
                      ? "DROPDOWN"
                      : "TEXT";
                  Fetch(`/forms/${formData.id}/fields/`, "POST", {
                    label: field.name,
                    kind: kind,
                    meta: {
                      type: field.type,
                    },
                  }).then((response) => {
                    if (response.ok) {
                      response.json().then((data) => {
                        console.log("Field added", data);
                        dispatch({
                          type: "ADD_FIELD",
                          label: data.label,
                          formType: data.meta.type,
                          formId: formData.id,
                          id: data.id,
                        });
                      });
                    } else {
                      throw new Error(
                        `${response.status} ${response.statusText}`
                      );
                    }
                  });
                  fieldDispatch({ type: "SET_NAME", name: "" });
                  fieldDispatch({ type: "TOGGLE_ADD" });
                }}
                hoverColor="bg-red-800"
              />

              <button onClick={() => fieldDispatch({ type: "TOGGLE_ADD" })}>
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
                fieldDispatch({ type: "TOGGLE_ADD" });
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
