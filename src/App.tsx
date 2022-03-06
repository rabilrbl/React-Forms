import React from "react";
import logo from "./logo.svg";
import "./App.css";
import AppContainer from "./components/AppContainer";
import Header from "./components/Header";

function App() {
  const formFields = [
    {
      id: 1,
      name: "firstName",
      label: "First Name",
      type: "text",
      placeholder: "Enter your first name",
    },
    {
      id: 2,
      name: "lastName",
      label: "Last Name",
      type: "text",
      placeholder: "Enter your last name",
    },
    {
      id: 3,
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter your email",
    },
    {
      id: 4,
      name: "phone",
      label: "Phone Number",
      type: "tel",
      placeholder: "Enter your phone number",
    },
    {
      id: 5,
      name: "dateOfBirth",
      label: "Date Of Birth",
      type: "date",
    },
  ];

  return (
    <div className="App">
      <AppContainer>
        <div className="bg-white shadow-lg rounded-xl p-4 w-[35rem] text-sky-600">
          <Header title="WD302 Level 1 React with Tailwindcss" />
          {formFields.map((field) => (
            <div className="my-2 mx-1" key={field.id}>
              <label htmlFor={field.name}>{field.label}</label>
              <input
                type={field.type}
                className="py-2 px-4 border border-sky-200 focus:outline-none focus:ring-2 focus:ring-sky-500 rounded-lg w-full text-sky-800 transition duration-200 ease-in-out"
                name={field.name}
                placeholder={field.placeholder}
              />
            </div>
          ))}
          <button
            type="submit"
            className="px-4 py-2 text-white bg-sky-600 my-2 mx-1 rounded-lg"
          >
            Submit
          </button>
        </div>
      </AppContainer>
    </div>
  );
}

export default App;
