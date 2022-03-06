import React from "react";

export default function AppContainer(props: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col p-4 h-screen bg-gray-100 items-center justify-center">
      {props.children}
    </div>
  );
}
