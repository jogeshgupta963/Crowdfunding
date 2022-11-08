import React from "react";
import styled from "styled-components";
import { HeaderLogo, HeaderNav, HeaderRight } from "../components";
function Header() {
  return (
    <HeaderWrapper>
      <HeaderLogo />
      <HeaderNav />
      <HeaderRight />
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.div`
  width: 100%;
  height: 70px;
  border: 2px solid red;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: "Roboto";
`;
export default Header;
