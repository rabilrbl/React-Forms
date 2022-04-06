import React from "react";

export default function RadioInput(props: {
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
      <div className="flex flex-col space-y-1 mt-2">
        {props.fieldOptions &&
          props.fieldOptions.map((value, index) => {
            return (
              <label key={index}>
                <input
                  type="radio"
                  name={props.fieldName}
                  value={value}
                  checked={props.fieldValue === value}
                  onChange={(e) => {
                    props.setValueCB(props.fieldId, e.target.value);
                  }}
                />
                {value}
              </label>
            );
          })}
      </div>
      <hr className="my-5 " />
    </div>
  );
}