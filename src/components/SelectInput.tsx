import React from "react";

export default function SelectInput(props: {
  fieldId: number;
  fieldName: string;
  fieldValue: string;
  fieldOptions?: string[];
  fieldLabel: string;
  setValueCB: (id: number, value: string) => void;
}) {
  return (
    <div>
      <label className="text-lg font-semibold" htmlFor={props.fieldName}>
        {props.fieldLabel}
      </label>
      <br />
      <select
        className="w-[50%] min-w-fit border border-blue-500 px-2 py-1 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        id={props.fieldId.toString()}
        name={props.fieldName}
        value={props.fieldValue}
        onChange={(e) => {
          props.setValueCB(props.fieldId, e.target.value);
        }}
      >
        {props.fieldOptions &&
          props.fieldOptions.map((value) => {
            return (
              <option value={value} selected={props.fieldValue === value}>
                {value}
              </option>
            );
          })}
      </select>
    </div>
  );
}