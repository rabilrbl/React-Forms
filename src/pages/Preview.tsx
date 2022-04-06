import { navigate, Link } from "raviger";
import React, { useEffect } from "react";
import Button from "../components/Button";
import FormInput from "../components/FormInput";
import Header from "../components/Header";
import MultiSelectInput from "../components/MultiSelectInput";
import RadioInput from "../components/RadioInput";
import SelectInput from "../components/SelectInput";
import { fieldType, formFieldsType } from "../types/form";
import { getLocalFields } from "../utils/form";

export default function Preview(props: { formId: number; fieldId: number }) {
  const [formData, setUserSub] = React.useState(getLocalFields(props.formId));
  const field = formData.fields[props.fieldId];
  const isMount = React.useRef(false);

  useEffect(() => {
    if (formData.id === 0) {
      alert("Not Found!");
      navigate("/");
    } else if (formData.fields.length === 0) {
      alert("No fields found!");
      navigate("/");
    }
  });

  useEffect(() => {
    if (isMount.current) {
      let timeout = setTimeout(() => {
        const localSubs = localStorage.getItem("userSubs");
        const userSubs = JSON.parse(localSubs ? localSubs : "[]");
        if (userSubs) {
          // localStorage.setItem(
          //   "userSubs",
          //   JSON.stringify([...userSubs, formData])
          // );
          console.log("State Saved at", Date.now());
        }
      }, 1000);
      return () => {
        clearTimeout(timeout);
      };
    } else {
      isMount.current = true;
    }
  }, [formData]);

  const setValue = (id: number, value: string) => {
    setUserSub({
      ...formData,
      fields: [
        ...formData.fields.map((field) => {
          if (field.id === id) {
            return { ...field, value };
          }
          return field;
        }),
      ],
    });
  };

  const renderInput = (field: formFieldsType) => {
    switch(field.type) {
      case "select":
        return <SelectInput fieldId={field.id}
      fieldName={field.name}
      fieldValue={field.value}
      fieldOptions={field.options}
      fieldLabel={field.label}
      setValueCB={setValue}
    />
      case "radio":
        return <RadioInput fieldId={field.id}
      fieldName={field.name}
      fieldValue={field.value}
      fieldOptions={field.options}
      fieldLabel={field.label}
      setValueCB={setValue}
    />
    case "multi-select":
      return (<MultiSelectInput
        fieldId={field.id}
        fieldName={field.name}
        fieldValue={field.value}
        fieldOptions={field.options}
        fieldLabel={field.label}
        setValueCB={setValue}
      />);
      
      default:
        return <FormInput
      id={field.id}
      type={field.type}
      name={field.name}
      label={field.label}
      value={field.value}
      setValueCB={setValue}
    />
    }
  }

  return (
    <>
      <Header title="Quiz" />
      <h3> {formData.title}</h3>
      <hr className="my-3" />
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("Submitted " + formData.title);
          }}
        >
          {renderInput(field)}
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
