import React from "react";
import Header from "./Header";
import themes from "./theme";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { useState } from "react";

function Layout({ children }) {
  const [theme, setTheme] = useState("light");

  return (
    <>
      {/* <ThemeProvider> */}
      <Header />
      <div>Layout</div>
      {/* </ThemeProvider> */}
    </>
  );
}

export default Layout;
