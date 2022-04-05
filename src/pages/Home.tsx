import { Link, useQueryParams } from "raviger";
import { useState, useEffect, useRef } from "react";
import Button from "../components/Button";
import Header from "../components/Header";
import { getLocalForms, saveLocalForms } from "../utils/form";
import { defaultFields } from "./Form";

export default function Home() {
  const [forms, setForms] = useState(getLocalForms());
  const isMounted = useRef(false);

  const deleteForm = (id: number) => {
    setForms(forms.filter((form) => form.id !== id));
  };

  const createForm = () => {
    const newForm = {
      id: Date.now(),
      title: "Untitled Form",
      fields: defaultFields,
    };
    setForms([...forms, newForm]);
    document.location.href = `/form/${newForm.id}`;
  };

  useEffect(() => {
    if (isMounted.current) {
      saveLocalForms(forms);
      console.log("Form Saved at", Date.now());
    } else {
      isMounted.current = true;
    }
  }, [forms]);

  const [{ search }, setQueryParams] = useQueryParams();
  const [searchState, setSearchState] = useState("");
  return (
    <div className="border border-sky-200 px-4 py-2 rounded">
      <Header title="Form builder!" />
      <form
        className="flex flex-col"
        onSubmit={(e) => {
          e.preventDefault();
          setQueryParams({ search: searchState || "" });
        }}
      >
        <div className="flex flex-row items-center mb-4">
          <label htmlFor="search">Search:&nbsp;</label>
          <input
            className="w-full px-2 py-1 border rounded-lg drop-shadow focus:outline-none focus:ring-2 focus:ring-sky-500"
            type="text"
            name="search"
            onChange={(e) => {
              setSearchState(e.target.value);
              // Simultaneously update the query string and show the results
              // setQueryParams({ search: e.target.value }, { replace: false });
            }}
          />
          <div className="flex justify-end items-center"></div>
        </div>
      </form>
      <div className="flex justify-end">
        <Button
          color="bg-sky-500"
          text="+ Add Form"
          onClick={() => {
            createForm();
          }}
          hoverColor="bg-red-800"
          size="px-3 py-2"
        />
      </div>

      <p>Available Forms</p>

      {forms.length > 0 ? (
        forms
          .filter((form) => {
            if (search) {
              return form.title.toLowerCase().includes(search.toLowerCase());
            }
            return true;
          })
          .map((form, index) => {
            return (
              <div
                className="flex flex-row items-center border-2 px-4 py-2 my-3 rounded-lg shadow-lg"
                key={form.id}
              >
                <strong>
                  {index + 1}. {form.title}
                </strong>
                <div className="ml-auto order-1 mr-2 space-x-5">
                  {/* <Button
                  color="bg-blue-500"
                  text="Open"
                  onClick={() => {
                    window.location.href = `/form/${form.id}`;
                  }}
                  hoverColor="bg-red-800"
                  size="px-2 py-1"
                /> */}
                  <Link className="" href={`/form/${form.id}`}>
                    <button
                      className="bg-blue-600 text-blue-50 p-1 rounded-lg shadow-lg"
                      title="Open Form"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                  </Link>

                  <Link className="" href={`/preview/${form.id}/0`}>
                    <button
                      className="bg-indigo-600 text-blue-50 p-1 rounded-lg shadow-lg"
                      title="Preview"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                        />
                      </svg>
                    </button>
                  </Link>

                  <button
                    className="bg-red-600 p-1 rounded-lg shadow-lg"
                    title="Delete"
                    onClick={() => {
                      deleteForm(form.id);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-blue-50"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })
      ) : (
        <h3>No Forms Available</h3>
      )}
    </div>
  );
}
