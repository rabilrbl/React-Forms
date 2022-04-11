import React from "react";

export interface FormInputProps {
  type: string;
  label: string;
  id: number;
  value: string;
  setValueCB: (id: number, value: string) => void;
  children?: React.ReactNode;
  deleteFieldCB?: (id: number) => void;
}

export default function FormInput(props: FormInputProps) {
  return (
    <div className="relative my-2 mx-1 flex flex-col" key={props.id}>
      <label htmlFor={props.id.toString()}>Type: {(props.type === "tel" && "TELEPHONE") || props.type}</label>
      <input
        type="text"
        className="py-2 px-4 border border-sky-200 focus:outline-none focus:ring-2 focus:ring-sky-500 rounded-lg w-[90%] text-sky-800 transition duration-200 ease-in-out"
        value={props.label}
        onChange={(e) => props.setValueCB(props.id, e.target.value)}
      />
      {props.deleteFieldCB && <button
        onClick={() => {
          props.deleteFieldCB && props.deleteFieldCB(props.id);
        }}
        className="absolute inset-y-0 mt-6 right-0 flex items-center px-4 "
      >
        <svg
          className="h-5 w-5 text-red-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      }
      {props.children}
    </div>
  );
}
