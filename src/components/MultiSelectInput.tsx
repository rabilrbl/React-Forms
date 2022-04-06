import React from "react";

export default function MultiSelectInput(props: {
  fieldId: number;
  fieldName: string;
  fieldValue: string;
  fieldOptions?: string[];
  fieldLabel: string;
  setValueCB: (id: number, value: string) => void;
}) {
  const [values, setValues] = React.useState<string[]>(
    props.fieldValue.split(",")
  );
  const [listOpen, setListOpen] = React.useState<boolean>(false);
  React.useEffect(() => {
    let timeout = setTimeout(() => {
      props.setValueCB(props.fieldId, values.toString());
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [values]);
  return (
    <div>
      <label className="text-lg font-semibold" htmlFor={props.fieldName}>
        {props.fieldLabel}
      </label>
      <br />
      {/* Multi Select Checkbox */}
      <div className="relative">
        <div
          className="flex flex-col items-center w-full bg-gray-100 rounded-lg shadow-lg px-4 cursor-pointer"
          onClick={() => {
            setListOpen(!listOpen);
          }}
        >
          <div className="w-full h-full">
            {values.length > 0
              ? values.map((value, index) => {
                  console.log(value);
                  return <span key={index}>{value}</span>+" ";
                })
              : "Select"}
          </div>
          <div className="ml-auto order-last absolute right-4">
            <svg
              className="h-5 w-5 text-gray-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

          <div className="border px-2 py-1 rounded-lg flex flex-col space-y-2">
            {listOpen &&
              props.fieldOptions &&
              props.fieldOptions.map((option, index) => {
                return (
                  <React.Fragment key={index}>
                    <div className="flex space-x-2 items-center">
                      <input
                        type="checkbox"
                        checked={values.includes(option)}
                        className="w-4 h-4"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setValues([...values, option]);
                          } else {
                            setValues(
                              values.filter((value) => value !== option)
                            );
                          }
                        }}
                      />
                      <label>{option}</label>
                    </div>
                  </React.Fragment>
                );
              })}
          </div>
        </div>
      </div>
  );
}
