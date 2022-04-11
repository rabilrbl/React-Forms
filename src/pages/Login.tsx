
import { Link } from "raviger";
import React from "react";

export const Login = () => {
  const [user, setUser] = React.useState({
    username: "",
    password: "",
  });
  React.useEffect(() => {
    if(localStorage.getItem("token")){
        alert("You are already logged in!");
        window.location.href = "/";
    }
},[])
  return (
    <div>
      <h1>Login</h1>
      <hr className="my-4" />
      <form
        className="w-full space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
         ( user.username && user.password) ? fetch(`https://typescriptcourseapi.herokuapp.com/api/auth-token/`, {
            body: JSON.stringify(user),
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }).then((response) => {
            if (response.ok) {
              response.json().then((data) => {
                localStorage.setItem("token", data.token);
                window.location.href = "/";
              });
            } else {
              response.json().then((data) => {
                alert("Login failed! " + data.non_field_errors);
              });
            }
          }) : alert("Please enter username and password!");
        }}
      >
        <div>
            <label htmlFor="username">
              Username:
              <input
                className="w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 border border-sky-300 shadow-xl"
                value={user.username}
                name="username"
                type="text"
                onChange={(e) => setUser({ ...user, username: e.target.value })}
              />
            </label>
        </div>

        <div>
            <label htmlFor="password">
              Password:
              <input
                className="w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 border border-sky-300 shadow-xl"
                value={user.password}
                name="password"
                type="password"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </label>
        </div>
        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
          >
            Sign in
          </button>
        </div>
      </form>
      <Link href="/signup" className="block mt-4">
            Don't have an account? Sign up
        </Link>
    </div>
  );
};
