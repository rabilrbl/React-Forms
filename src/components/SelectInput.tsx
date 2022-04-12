import React from "react";

export default function SelectInput(props: {
  fieldId: number;
  fieldValue: string;
  fieldOptions?: string[];
  fieldLabel: string;
  setValueCB: (value: string) => void;
}) {
  const selectRef = React.createRef<HTMLSelectElement>();
  React.useEffect(() => {
    selectRef.current?.focus();
  }, [props])
  return (
    <div>
      <label className="text-lg font-semibold" htmlFor={props.fieldId.toString()}>
        {props.fieldLabel}
      </label>
      <br />
      <select
        className="w-[50%] min-w-fit border border-blue-500 px-2 py-1 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        id={props.fieldId.toString()}
        value={props.fieldValue}
        onChange={(e) => {
          props.setValueCB(e.target.value);
        }}
        ref={selectRef}
      >
        <option value="">Select</option>
        {props.fieldOptions &&
          props.fieldOptions.map((value, index) => {
            return (
              <option key={index} value={value}>
                {value}
              </option>
            );
          })}
      </select>
    </div>
  );
}
