import { Link, useQueryParams } from "raviger";
import { useState, useEffect, useRef } from "react";
import Button from "../components/Button";
import Header from "../components/Header";
import { getLocalForms, saveLocalForms, defaultFields } from "./Form";

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
    document.location.href = (`/form/${newForm.id}`);
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
                className="flex flex-row items-center border-2 px-2 my-2 rounded-lg drop-shadow-lg"
                key={form.id}
              >
                <strong>
                  {index + 1}. {form.title}
                </strong>
                <div className="ml-auto">
                  {/* <Button
                  color="bg-blue-500"
                  text="Open"
                  onClick={() => {
                    window.location.href = `/form/${form.id}`;
                  }}
                  hoverColor="bg-red-800"
                  size="px-2 py-1"
                /> */}
                  <Link
                    className="bg-blue-500 px-2 py-1 rounded-lg text-white "
                    href={`/form/${form.id}`}
                  >
                    Open
                  </Link>
                  <Button
                    color="bg-red-500"
                    text="Delete"
                    onClick={() => {
                      deleteForm(form.id);
                    }}
                    hoverColor="bg-red-800"
                    size="px-2 py-1"
                  />
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
