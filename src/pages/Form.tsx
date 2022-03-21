import React from "react";
import Header from "../components/Header";
import FormInput from "../components/FormInput";
import Button from "../components/Button";

const defaultFields = [
  {
    id: 1,
    name: "firstName",
    label: "First Name",
    type: "text",
    placeholder: "Enter your first name",
    value: "",
  },
  {
    id: 2,
    name: "lastName",
    label: "Last Name",
    type: "text",
    placeholder: "Enter your last name",
    value: "",
  },
  {
    id: 3,
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter your email",
    value: "",
  },
  {
    id: 4,
    name: "phone",
    label: "Phone Number",
    type: "tel",
    placeholder: "Enter your phone number",
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

export default function Form(props: {
  action: string;
  method: string;
  fillFormCB: () => void;
}) {
  const [formFields, setFormFields] = React.useState(defaultFields);
  const [fieldName, setFieldName] = React.useState("");
  const [showAddForm, setShowAddForm] = React.useState(false);
  const [fieldType, setFieldType] = React.useState("text");
  const setValue = (id: number, value: string) => {
    setFormFields(
      formFields.map((field) => {
        if (field.id === id) {
          field.value = value;
        }
        return field;
      })
    );
  };
  const addField = (name: string, label: string, type: string = "text") => {
    setFormFields([
      ...formFields,
      { id: Math.random(), name, label, type, value: "" },
    ]);
  };

  const deleteField = (id: number) => {
    setFormFields(formFields.filter((field) => field.id !== id));
  };
  return (
    <>
      <Header title="WD302 React with Tailwindcss" />
      {formFields.map((field) => (
        <FormInput
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
              <input
                className="bg-white border focus:outline-none py-1 px-4 focus:ring-2 focus:ring-sky-500 rounded-lg w-50 text-gray-800 transition duration-200 ease-in-out"
                type="text"
                placeholder="Field Name"
                onChange={(e) => setFieldName(e.target.value)}
                value={fieldName}
              />
              <div className="relative">
                <select
                  className="bg-white pr-6 focus:outline-none border border-gray-300 rounded-lg py-1 px-4 block w-50 max-w-fit leading-normal text-gray-700"
                  name="facility"
                  value={fieldType}
                  onChange={(e) => setFieldType(e.target.value)}
                >
                  {["text", "date", "time", "color", "file", "url"].map(
                    (type, index) => (
                      <option
                        value={type}
                        className="px-4 py-2 rounded-xl border border-gray-400 focus:outline-none focus:border-gray-500"
                        key={index}
                      >
                        {type}
                      </option>
                    )
                  )}
                </select>
              </div>
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

              <Button
                size="py-1 px-4"
                color="bg-red-500"
                text="Close"
                onClick={() => setShowAddForm(!showAddForm)}
                hoverColor="bg-red-800"
              />
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
              setFormFields([]);
            }}
          >
            Clear fields
          </span>
        </div>
      </div>

      <div>
        <Button color="bg-blue-600" text="Submit" />
        <Button color="bg-sky-600" text="Close" onClick={props.fillFormCB} />
      </div>
    </>
  );
}
