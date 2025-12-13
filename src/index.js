import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./App.css";
import FacebookEmojiCounter from "./week9";
import ToggleMode from "./ToggleModeComponent";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <>
      <FacebookEmojiCounter type="Like" />
      <FacebookEmojiCounter type="Love" />
      <FacebookEmojiCounter type="happy" />
      <ToggleMode />
    </>
  </React.StrictMode>
);
