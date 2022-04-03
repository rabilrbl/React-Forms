import React from "react";
import { useRoutes } from "raviger";
import "./App.css";
import AppContainer from "./components/AppContainer";
import Form from "./pages/Form";
import Block from "./components/Block";
import Home from "./pages/Home";
import About from "./pages/About";
import { NavBar } from "./components/NavBar";

const routes = {
  "/": () => <Home />,
  "/about": () => <About />,
  "/form/:id": ({ id }: { id: string }) => <Form action="" id={Number(id)} method="" />,
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
