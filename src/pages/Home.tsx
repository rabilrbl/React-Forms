import { Link, useQueryParams } from "raviger";
import { useState, useEffect, useRef } from "react";
import Button from "../components/Button";
import Header from "../components/Header";
import Loading from "../components/Loading";
import Modal from "../components/Modal";
import { Form } from "../types/form";
import { Fetch } from "../utils/Api";
import { createForm } from "../utils/form";

export default function Home() {
  const [forms, setForms] = useState<Form[]>([]);
  const [paginate, setPaginate] = useState({
    count: 0,
    next: "",
    previous: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [newForm, setNewForms] = useState<Omit<Form, "id">>({
    title: "Untitled",
    description: "",
    is_public: true,
  });
  const [open, setOpen] = useState(false);
  const isMounted = useRef(false);
  const [{ search, offset }, setQueryParams] = useQueryParams();

  useEffect(() => {
    Fetch(`/forms/?limit=10&offset=${offset}`)
      .then((response) => response.json())
      .then((data) => {
        setPaginate({
          count: data.count,
          next: data.next,
          previous: data.previous,
        });
        setForms(data.results);
      })
      .then(() => setIsLoading(false));
  }, [offset]);

  const deleteForm = (id: number) => {
    setForms(forms.filter((form) => form.id !== id));
  };

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      setTitleError(newForm.title.length < 1 || newForm.title.length > 100);
    }
  }, [newForm.title]);

  useEffect(() => {
    if (isMounted.current) {
      // saveLocalForms(forms);
      console.log("Form Saved at", Date.now());
    } else {
      isMounted.current = true;
    }
  }, [forms]);
  const [titleError, setTitleError] = useState(false);
  const [searchState, setSearchState] = useState("");
  return (
    <div className="border border-sky-200 px-4 py-2 rounded">
      <Header title="Form builder!" />
      <form
        className="flex flex-col"
        onSubmit={(e) => {
          e.preventDefault();
          setQueryParams({ offset, search: searchState || "" });
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
            setOpen(true);
          }}
          hoverColor="bg-red-800"
          size="px-3 py-2"
        />
      </div>

      {isLoading && (
        <h2 className="my-5 flex justify-center">
          <Loading />
        </h2>
      )}
      {forms.length > 0
        ? forms
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
        : !isLoading && <h3>No Forms Available</h3>}
      {/* Next and previous buttons */}
      <hr className="my-4" />
      <div className="flex justify-between">
        <button
          className={"bg-sky-500 text-blue-50 flex px-2 py-1 rounded-lg shadow-lg" + ((Number(offset) === 0 || !offset) ? " opacity-0" : "")}
          title="Previous"
          id="previous"
          onClick={() => {
            if (offset && Number(offset) !== 0) {
              window.location.href = `?offset=${
                offset ? Number(offset) - 10 : ""
              }&search=${search ? search : ""}`;
            }
          }}
          disabled={Number(offset) === 0 || !offset}
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
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            />
          </svg>&nbsp;Previous
        </button>
        {paginate.count > 5 && <span>{`Page: ${offset ? Number(offset) / 10 + 1 : 1} of ${Math.ceil(
          paginate.count / 10
        )}`}</span>}
        <button
          className={"bg-sky-500 text-blue-50 flex px-2 py-1 rounded-lg shadow-lg"+ (!(forms.length <= 10) ? "" : " opacity-0")}
          title="Next"
          id="next"
          onClick={() => {
            if (!(forms.length < 10)) {
              window.location.href = `?offset=${
                offset ? Number(offset) + 10 : 10
              }&search=${search ? search : ""}`;
            }
          }}
          disabled={forms.length < 10}
        >
          Next&nbsp;<svg
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
              d="M13 5l7 7-7 7M5 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
      <Modal open={open} setOpen={setOpen}>
        <div className="flex flex-col space-y-5">
          <h1 className="text-2xl text-center">Create Form</h1>
          <div className="flex flex-col">
            <label htmlFor="title">Title:&nbsp;</label>
            <input
              className="w-full px-2 py-1 border rounded-lg border-gray-300 shadow-lg  focus:outline-none focus:ring-2 focus:ring-sky-500"
              type="text"
              name="title"
              value={newForm.title}
              onChange={(e) => {
                setNewForms({ ...newForm, title: e.target.value });
              }}
            />
            {titleError && (
              <span className="text-red-500">
                Title should be atleast 1 character and max of 100 characters.
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="description">Description:&nbsp;</label>
            <textarea
              className="w-full px-2 py-1 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
              name="description"
              // value={newForm.description}
              onChange={(e) => {
                setNewForms({ ...newForm, description: e.target.value });
              }}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="is_public">Is Public:&nbsp;</label>
            {/* Checkbox */}
            <div className="flex flex-row items-center">
              <input
                className="mr-2 h-6 w-6 rounded-lg"
                type="checkbox"
                checked={newForm.is_public}
                name="is_public"
                onChange={(e) => {
                  setNewForms({ ...newForm, is_public: e.target.checked });
                }}
              />
              <span className="text-sm">
                <span className="text-gray-600">
                  Check this box if you want your form to be public.
                </span>
              </span>
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                onClick={() => {
                  if (!titleError) {
                    createForm(newForm, setNewForms);
                  } else {
                    alert("Please fix the errors before submitting.");
                  }
                }}
              >
                Create Form
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
