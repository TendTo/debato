import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./components";

const rootElement = document.getElementById("root");
console.log("rootElement", rootElement);
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
} else {
  throw new Error("No root element found");
}
