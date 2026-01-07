import React from "react";
import ReactDOM from "react-dom/client";
import Phone from "./Phone.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Phone sizeX={24} sizeY={16} frameRate={8} />
  </React.StrictMode>
);
