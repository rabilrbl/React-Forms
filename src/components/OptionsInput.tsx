import React from "react";

export default function OptionsInput(props: {
  fieldName: string;
  fieldId: number;
  setOptionsCB: (id: number, options: string[]) => void;
  fieldOptions: string[];
}) {
  const [addOption, setAddOption] = React.useState<string>("");
  const [fieldOptions, setFieldOptions] = React.useState<string[]>(
    props.fieldOptions
  );
  const isMount = React.useRef(false);
  React.useEffect(() => {
    if (isMount.current) {
      const timeout = setTimeout(() => {
        console.log("Options Saved at", Date.now());
        props.setOptionsCB(props.fieldId, fieldOptions);
      }, 1000);
      return () => {
        clearTimeout(timeout);
      };
    } else {
      isMount.current = true;
    }
  }, [fieldOptions]);
  return (
    <div>
      <label>
        Options for {props.fieldName}
        <ul className="flex flex-col list-disc ml-10">
          {fieldOptions.map((option, index) => {
            return (
              <li key={index}>
                <div className="flex items-center">
                  {option}{" "}
                  <button
                    className="ml-2"
                  >
                    <svg
                     onClick={() => {
                      setFieldOptions(
                        fieldOptions.filter((_, i) => i !== index),
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
        <div className="flex flex-row items-center w-[70%]">
          <input
            className="bg-white border focus:outline-none py-1 w-full px-4 focus:ring-2 focus:ring-sky-500 rounded-lg text-gray-800 transition duration-200 ease-in-out"
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
            Add
          </button>
        </div>
      </label>
      <hr className="my-5 " />
    </div>
  );
}
