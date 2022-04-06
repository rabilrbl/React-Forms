import React from "react";

export default function MultiSelectInput(props: {
  fieldId: number;
  fieldName: string;
  fieldValue: string;
  fieldOptions?: string[];
  fieldLabel: string;
  setValueCB: (id: number, value: string) => void;
}) {
  const [values, setValues] = React.useState<string[]>(() => {
    const values = props.fieldValue.split(",").map((v) => v.trim());
    // values.shift(); // remove first element
    return values;
  });
  // Set first option as default
  // const isDone = React.useRef(false);
  // React.useEffect(() => {
  //   if (!isDone.current && values.length < 1 && props.fieldOptions) {
  //     setValues([props.fieldOptions[0]]);
  //   } else {
  //     isDone.current = true;
  //   }
  // }, [values])

  const [listOpen, setListOpen] = React.useState<boolean>(false);
  React.useEffect(() => {
    let timeout = setTimeout(() => {
      console.log(values);
      props.setValueCB(props.fieldId, values.join(","));
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
      <div className="relative w-[80%]">
        <div
          className="flex flex-row py-2 items-center w-full bg-gray-100 rounded-lg shadow-lg px-4 cursor-pointer"
          onClick={() => {
            setListOpen(!listOpen);
          }}
        >
          <div className="w-full h-full flex space-x-2 flex-wrap bg-gray-100">
            {!values.length && <span>Select choices</span>}
            {values.map((value, index) => {
              return (
                value !== "" && (
                  <div key={index} className="flex items-center">
                    <span className="text-gray-800">{value}</span>
                  </div>
                )
              );
            })}
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

        <div className="border px-2 bg-gray-100 rounded-lg flex flex-col space-y-2">
          {listOpen && (
            <React.Fragment>
              <div className="flex space-x-2 items-center">
                <input
                  type="checkbox"
                  checked={values.length === props.fieldOptions?.length}
                  className="w-5 h-5"
                  onChange={(e) => {
                    if (e.target.checked && props.fieldOptions) {
                      setValues(props.fieldOptions);
                    } else {
                      setValues([]);
                    }
                  }}
                />
                <label>Select All</label>
              </div>
            </React.Fragment>
          )}
          {listOpen &&
            props.fieldOptions &&
            props.fieldOptions.map((option, index) => {
              return (
                <React.Fragment key={index}>
                  <div className="flex space-x-2 items-center">
                    <input
                      type="checkbox"
                      checked={values.includes(option)}
                      className="w-5 h-5"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setValues([...values, option]);
                        } else {
                          setValues(values.filter((value) => value !== option));
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
