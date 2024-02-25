import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme.ts";
import { ViewportProvider } from "./contexts/viewport/provider.tsx";
import Router from "./router/index.tsx";
import { RouterProvider } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <ViewportProvider>
        <RouterProvider router={Router} />
      </ViewportProvider>
    </ThemeProvider>
  </React.StrictMode>
);
