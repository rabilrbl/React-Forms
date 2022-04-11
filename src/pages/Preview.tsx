import { Link, navigate } from "raviger";
import React, { useEffect } from "react";
import Button from "../components/Button";
import FormInput from "../components/FormInput";
import Header from "../components/Header";
import Loading from "../components/Loading";
import MultiSelectInput from "../components/MultiSelectInput";
import RadioInput from "../components/RadioInput";
import SelectInput from "../components/SelectInput";
import TextAreaInput from "../components/TextAreaInput";
import { PreviewReducer } from "../reducers/PreviewReducer";
import { formDataType, formFieldsType } from "../types/form";
import { Fetch } from "../utils/Api";

const FetchData = async (formId: number, signal: AbortSignal) => {
  const response = await Fetch(
    `/forms/${formId}/fields/`,
    "GET",
    undefined,
    signal
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const jsonData = await response.json();
  const fields: formFieldsType[] = await jsonData.results;
  return {
    id: formId,
    title: "",
    fields: fields,
  } as formDataType;
};

export default function Preview(props: { formId: number; fieldId: number }) {
  const [formData, dispatch] = React.useReducer(PreviewReducer, {
    id: 0,
    title: "",
    fields: [],
  });

  const [field, setField] = React.useState<formFieldsType>();
  const isMount = React.useRef(false);
  const isFirst = React.useRef(false);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [formDetails, setFormDetails] = React.useState({
    id: 0,
    title: "",
    description: "",
    is_public: false,
  });

  useEffect(() => {
    const abortController = new AbortController();
    FetchData(props.formId, abortController.signal)
      .then((data) => {
        dispatch({ type: "SET_STATE", payload: data });
        if(data.fields.length === 0){
          alert("No fields found");
          navigate("/");
        }
        return data;
      })
      .then((data) => {
        const field = data.fields[props.fieldId];
        try {
          if (!field.value) {
            field.value = "";
          }
        } catch (e: any) {
          // ignore undefined error
          if(e.message === "Cannot read property 'value' of undefined"){
            field.value = "";
          }
        }
        console.log(field);
        setField(field);
        Fetch(`/forms/${props.formId}/`, "GET")
          .then((response) => response.json())
          .then((data) =>
            setFormDetails({
              id: data.id,
              title: data.title,
              description: data.description,
              is_public: data.is_public,
            })
          );
      })
      .then(() => setIsLoaded(true));
    return () => {
      abortController.abort();
    };
  }, []);

  useEffect(() => {
    if (isFirst.current) {
      const field = formData.fields[props.fieldId];
      if (field.value === null) {
        field.value = "";
      }
      console.log(field);
      setField(field);
    } else {
      isFirst.current = true;
    }
  }, [props.fieldId]);

  useEffect(() => {
    if (isMount.current) {
      let timeout = setTimeout(() => {
        console.log("State Saved at", Date.now());
      }, 1000);
      return () => {
        clearTimeout(timeout);
      };
    } else {
      isMount.current = true;
    }
  }, [formData]);

  const setValue = (id: number, value: string) => {
    dispatch({ type: "SET_VALUE", id, value });
    field && setField({ ...field, value: value });
  };

  const renderInput = (field: formFieldsType) => {
    if (field.kind === "TEXT") {
      switch (field.meta.type) {
        case "textarea":
          return (
            <TextAreaInput
              fieldId={field.id}
              fieldValue={field.value}
              fieldLabel={field.label}
              setValueCB={setValue}
            />
          );

        default:
          return (
            <FormInput
              id={field.id}
              type={field.meta.type}
              label={field.label}
              value={field.value}
              setValueCB={setValue}
            />
          );
      }
    } else if (field.kind === "DROPDOWN") {
      switch (field.meta.type) {
        case "select":
          return (
            <SelectInput
              fieldId={field.id}
              fieldValue={field.value}
              fieldOptions={field.options}
              fieldLabel={field.label}
              setValueCB={setValue}
            />
          );
        case "radio":
          return (
            <RadioInput
              fieldId={field.id}
              fieldValue={field.value}
              fieldOptions={field.options}
              fieldLabel={field.label}
              setValueCB={setValue}
            />
          );
        case "multi-select":
          return (
            <MultiSelectInput
              fieldId={field.id}
              fieldValue={field.value}
              fieldOptions={field.options}
              fieldLabel={field.label}
              setValueCB={setValue}
            />
          );
      }
    }
  };

  return (
    <>
      <Header title="Quiz" />
      <h3> {formDetails.title}</h3>
      <hr className="my-3" />
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const body = {
              answers: formData.fields.map((field) => {
                return {
                  form_field: field.id,
                  value: field.value,
                };
              }),
              form: formDetails,
            };
            console.log(body);
            Fetch(`/forms/${formData.id}/submission/`, "POST", body).then(
              (response) => {
                if (response.ok) {
                  alert("Submitted " + formDetails.title);
                } else {
                  alert("Error submitting form");
                }
              }
            );
          }}
        >
          {!isLoaded && <h2 className="my-5 flex justify-center"><Loading /></h2>}
          {isLoaded && field && renderInput(field)}
          <div className="flex items-center space-x-2 justify-end pt-2 w-[90%]">
            {/* Previous button if previous field exists */}
            {props.fieldId > 0 && (
              <Link
                className="flex justify-start"
                href={`/preview/${props.formId}/${props.fieldId - 1}`}
              >
                <button className="flex justify-center items-center bg-blue-500 px-2 py-1 rounded-lg text-blue-50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                    />
                  </svg>
                  &nbsp;Previous
                </button>
              </Link>
            )}
            {/* Next Button */}
            {field && props.fieldId + 1 < formData.fields.length ? (
              <Link
                className="flex justify-end"
                href={`/preview/${formData.id}/${props.fieldId + 1}`}
              >
                <button className="flex justify-center items-center bg-blue-500 px-2 py-1 rounded-lg text-blue-50">
                  Next&nbsp;
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 5l7 7-7 7M5 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </Link>
            ) : (
              <div className="flex justify-end">
                <Button color="bg-blue-500" text="Submit" />
              </div>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
