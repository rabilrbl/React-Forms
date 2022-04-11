import React from "react";

export default function MultiSelectInput(props: {
  fieldId: number;
  fieldValue: string;
  fieldOptions?: string[];
  fieldLabel: string;
  setValueCB: (value: string) => void;
}) {
  const [values, setValues] = React.useState<string[]>(() => {
    const values = props.fieldValue.split(",").map((v) => v.trim());
    values[0] === "" && values.shift(); // Necessary because parsing of string to array crates an empty value
    return values;
  });

  const [listOpen, setListOpen] = React.useState<boolean>(false);
  
  return (
    <div>
      <label className="text-lg font-semibold" htmlFor={props.fieldId.toString()}>
        {props.fieldLabel}
      </label>
      <br />
      {/* Multi Select Checkbox */}
      <div className="relative w-[80%]">
        <div
          className="flex flex-row py-2 items-center w-full bg-gray-100 rounded-lg shadow-lg px-4 cursor-pointer"
          onClick={() => {
            setListOpen(!listOpen);
          }}
        >
          <div className="w-full h-full flex space-x-2 flex-wrap bg-gray-100">
            {values.length === 0 && <span>Select choices</span>}
            {values.join(", ")}
          </div>
          <div className="ml-auto order-last">
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

        <div className="border px-2 bg-gray-100 rounded-lg flex flex-col space-y-2" onInput={() => props.setValueCB(values.join(","))}>
          {listOpen && (
            <React.Fragment>
              <div className="flex space-x-2 items-center" >
                <label>
                <input
                  type="checkbox"
                  checked={values.length === props.fieldOptions?.length}
                  className="w-5 h-5 rounded-lg"
                  onChange={(e) => {
                    if (e.target.checked && props.fieldOptions) {
                      setValues(props.fieldOptions);
                    } else {
                      setValues([]);
                    }
                  }}
                />
                &nbsp;&nbsp;Select All</label>
              </div>
            </React.Fragment>
          )}
          {listOpen &&
            props.fieldOptions &&
            props.fieldOptions.map((option, index) => {
              return (
                <React.Fragment key={index}>
                  <div className="flex space-x-2 items-center">
                  <label>
                    <input
                      type="checkbox"
                      checked={values.includes(option)}
                      className="w-5 h-5 rounded-lg"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setValues([...values, option]);
                        } else {
                          setValues(values.filter((value) => value !== option));
                        }
                      }}
                      />
                      &nbsp;&nbsp;{option}</label>
                  </div>
                </React.Fragment>
              );
            })}
        </div>
      </div>
    </div>
  );
}
