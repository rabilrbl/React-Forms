import React from "react";

export default function TextAreaInput(props: {
  fieldId: number;
  fieldValue: string;
  fieldLabel: string;
  setValueCB: (value: string) => void;
}) {
  const inputRef = React.createRef<HTMLTextAreaElement>();
  React.useEffect(() => {
    inputRef.current?.focus();
  }, [props, inputRef]);
  return (
    <div>
      <label
        className="text-lg font-semibold"
        htmlFor={props.fieldId.toString()}
      >
        {props.fieldLabel}
      </label>
      <br />
      <textarea
        className="w-full min-w-fit border border-blue-500 px-2 py-1 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        id={props.fieldId.toString()}
        value={props.fieldValue}
        onChange={(e) => {
          props.setValueCB(e.target.value);
        }}
        ref={inputRef}
      />
    </div>
  );
}
