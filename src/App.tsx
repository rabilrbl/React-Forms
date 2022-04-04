import React from "react";
import { useRoutes, Redirect } from "raviger";
import "./App.css";
import AppContainer from "./components/AppContainer";
import Form from "./pages/Form";
import Block from "./components/Block";
import Home from "./pages/Home";
import About from "./pages/About";
import { NavBar } from "./components/NavBar";
import Preview from "./pages/Preview";

const routes = {
  "/": () => <Home />,
  "/about": () => <About />,
  "/form/:id": ({ id }: { id: string }) => <Form action="" id={Number(id)} method="" />,
  "/preview/:formId" : ({ formId }: { formId: string }) => <Redirect to={`/preview/${formId}/0`} />,
  "/preview/:formId/:fieldId" : ({ formId, fieldId }: { formId: string, fieldId: string }) => <Preview formId={Number(formId)} fieldId={Number(fieldId)} />,
};

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
];

function App() {
  const route = useRoutes(routes);

  return (
    <div className="App">
      <AppContainer>
        <Block>
          {/* Navbar */}
          <NavBar navLinks={navLinks} />
          {route}
        </Block>
      </AppContainer>
    </div>
  );
}

export default App;
