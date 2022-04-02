import React from "react";
import logo from "../logo.svg";

export default function Header(props: { title: string }) {
  return (
    <div className="flex mx-auto gap-2 items-center justify-center">
      <img
        src={logo}
        style={{ animation: "spin 3s linear infinite" }}
        className="animate-spin h-16 w-16"
        alt="logo"
      />
      <h2 className="text-center">{props.title}</h2>
    </div>
  );
}
