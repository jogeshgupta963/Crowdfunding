import React from "react";
import Header from "./Header";
import themes from "./theme";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import { useSelector, useDispatch } from "react-redux";

function Layout({ children }) {
  const { theme } = useSelector((state) => state.theme);

  return (
    <>
      <ThemeProvider theme={themes[theme]}>
        <LayoutWrapper>
          <GlobalStyle />
          <Header />
          {children}
        </LayoutWrapper>
      </ThemeProvider>
    </>
  );
}
const GlobalStyle = createGlobalStyle`
  body{
    margin:0;
    padding:0;
    overflow-x: hidden;
  }
`;

const LayoutWrapper = styled.div`
  min-height: 100vh;
  background-color: ${(props) => props.theme.bgColor};
  background-image: ${(props) => props.theme.bgImage};
  color: ${(props) => props.theme.color};
`;
export default Layout;
