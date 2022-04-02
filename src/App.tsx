import React, { useState } from "react";
import "./App.css";
import AppContainer from "./components/AppContainer";
import Form from "./pages/Form";
import Block from "./components/Block";
import Home from "./pages/Home";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [formId, setFormId] = useState(0);
  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="App">
      <AppContainer>
        <Block>
          {showForm ? (
            <Form action="" id={formId} method="" fillFormCB={toggleForm} />
          ) : (
            <Home fillFormCB={toggleForm} setFormIdCB={setFormId} />
          )}
        </Block>
      </AppContainer>
    </div>
  );
}

export default App;
