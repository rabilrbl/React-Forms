import React from "react";

export const Signup = () => {
  const [user, setUser] = React.useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
  });
  React.useEffect(() => {
    if (localStorage.getItem("token")) {
      alert("You are already logged in!");
      window.location.href = "/";
    }
  }, []);
  return (
    <div>
      <h1>Signup</h1>
      <hr className="my-4" />
      <form
        className="w-full space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          user.username && user.email && user.password1 && user.password2
            ? fetch(
                `https://typescriptcourseapi.herokuapp.com/api/auth/registration/`,
                {
                  body: JSON.stringify(user),
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              ).then((response) => {
                if (response.ok) {
                  response.json().then((data) => {
                    alert("User created! " + data.username);
                    window.location.href = "/login";
                  });
                } else {
                  response.json().then((data) => {
                    alert("Error! " + data.non_field_errors);
                  });
                }
              })
            : alert(
                "Please enter username, email, password and password confirmation!"
              );
        }}
      >
        <div>
            <label className="" htmlFor="username">
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
            <label className="" htmlFor="username">
              Email:
              <input
                className="w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 border border-sky-300 shadow-xl"
                value={user.email}
                name="email"
                type="email"
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </label>
        </div>

        <div>
            <label htmlFor="password1">
              Password:
              <input
                className="w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 border border-sky-300 shadow-xl"
                value={user.password1}
                name="password1"
                type="password"
                onChange={(e) => setUser({ ...user, password1: e.target.value })}
              />
            </label>
        </div>
        <div>
            <label htmlFor="password2">
                Password confirmation:
              <input
                className="w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 border border-sky-300 shadow-xl"
                value={user.password2}
                name="password2"
                type="password"
                onChange={(e) => setUser({ ...user, password2: e.target.value })}
              />
            </label>
        </div>
        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
          >
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
};
