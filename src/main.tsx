import React from "react";
import ReactDOM from "react-dom/client";
import Phone from "./Phone.tsx";
import { ThemeProvider } from "styled-components";
import { theme } from "./style/Theme.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Phone sizeX={24} sizeY={16} frameRate={8} />
    </ThemeProvider>
  </React.StrictMode>
);
