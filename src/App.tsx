import React from "react";
import { useRoutes, Redirect } from "raviger";
import "./App.css";
import AppContainer from "./components/AppContainer";
import Block from "./components/Block";
import About from "./pages/About";
import { NavBar } from "./components/NavBar";
import Preview from "./pages/Preview";
import { Login } from "./pages/Login";
import { Logout } from "./pages/Logout";
import { Signup } from "./pages/Signup";
import NotFound from "./pages/NotFound";
import Loading from "./components/Loading";

const Home = React.lazy(() => import("./pages/Home"));
const Form = React.lazy(() => import("./pages/Form"));

const routes = {
  "/": () => (
    <React.Suspense fallback={<Loading />}>
      <Home />
    </React.Suspense>
  ),
  "/about": () => <About />,
  "/form/:id": ({ id }: { id: string }) => (
    <React.Suspense fallback={<Loading />}>
      <Form action="" id={Number(id)} method="" />
    </React.Suspense>
  ),
  "/preview/:formId": ({ formId }: { formId: string }) => (
    <Redirect to={`/preview/${formId}/0`} />
  ),
  "/preview/:formId/:fieldId": ({
    formId,
    fieldId,
  }: {
    formId: string;
    fieldId: string;
  }) => <Preview formId={Number(formId)} fieldId={Number(fieldId)} />,
  "/login": () => <Login />,
  "/logout": () => <Logout />,
  "/signup": () => <Signup />,
};

let NavLinks = [
  { id: 0, name: "Home", path: "/" },
  { id: 1, name: "About", path: "/about" },
];

function App() {
  const route = useRoutes(routes);

  const [navLinks, setNavLinks] = React.useState(NavLinks);

  React.useEffect(() => {
    if (localStorage.getItem("token")) {
      NavLinks = [
        { id: 0, name: "Home", path: "/" },
        { id: 1, name: "About", path: "/about" },
        { id: 2, name: "Logout", path: "/logout" },
      ];
    } else {
      NavLinks = [
        { id: 0, name: "Home", path: "/" },
        { id: 1, name: "About", path: "/about" },
        { id: 2, name: "Login", path: "/login" },
        { id: 3, name: "Sign Up", path: "/signup" },
      ];
    }
    setNavLinks(NavLinks);
  }, []);

  return (
    <div className="App">
      <AppContainer>
        <Block>
          {/* Navbar */}
          <NavBar navLinks={navLinks} />
          {route || <NotFound />}
        </Block>
      </AppContainer>
    </div>
  );
}

export default App;
