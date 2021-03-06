import React from "react";
import { Fetch } from "../utils/Api";

export default function OptionsInput(props: {
  fieldId: number;
  setOptionsCB: (id: number, options: string[]) => void;
  fieldOptions: string[];
  formId: number;
}) {
  const [addOption, setAddOption] = React.useState<string>("");
  const [fieldOptions, setFieldOptions] = React.useState<string[]>(
    props.fieldOptions
  );
  const isMount = React.useRef(false);

  React.useEffect(() => {
    if (isMount.current) {
      const timeout = setTimeout(() => {
        Fetch(`/forms/${props.formId}/fields/${props.fieldId}/`, "PATCH", {
          options: fieldOptions,
        }).catch((err) => {
          console.log(err);
        });
        console.log("Options Saved at", Date.now());
      }, 500);
      return () => {
        clearTimeout(timeout);
      };
    } else {
      isMount.current = true;
    }
  }, [fieldOptions, props.fieldId, props.formId]);
  return (
    <div className="border-l-2 border-l-sky-100 pl-4 mb-4">
      <label>
        Options for above field
        <ul className="flex flex-col list-disc ml-10">
          {fieldOptions.map((option, index) => {
            return (
              <li key={index}>
                <div className="flex items-center">
                  {option}{" "}
                  <button className="ml-2">
                    <svg
                      onClick={() => {
                        setFieldOptions(
                          fieldOptions.filter((_, i) => i !== index)
                        );
                      }}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-red-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
        <div
          className="flex flex-row items-center w-[70%]"
          onInput={() => {
            props.setOptionsCB(props.fieldId, fieldOptions);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              setFieldOptions([...fieldOptions, addOption]);
              setAddOption("");
            }
          }}
        >
          <input
            className="bg-white border border-sky-300 focus:outline-none py-1 w-full px-4 focus:ring-2 focus:ring-sky-500 rounded-lg text-gray-800 transition duration-200 ease-in-out"
            type="text"
            value={addOption}
            placeholder="Add Option"
            onChange={(e) => {
              setAddOption(e.target.value);
            }}
          />
          <button
            className="py-1 px-2 border text-sm rounded-lg bg-blue-200 hover:text-white hover:bg-blue-500"
            onClick={() => {
              setFieldOptions([...fieldOptions, addOption]);
              setAddOption("");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        </div>
      </label>
    </div>
  );
}
