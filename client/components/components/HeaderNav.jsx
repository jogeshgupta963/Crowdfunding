import React from "react";
import styled from "styled-components";
function HeaderNav() {
  return (
    <HeaderNavWrapper>
      <HeaderNavLinks>Campaigns</HeaderNavLinks>
      <HeaderNavLinks>Create Campaign</HeaderNavLinks>
      <HeaderNavLinks>Dashboard</HeaderNavLinks>
    </HeaderNavWrapper>
  );
}

const HeaderNavWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.theme.bgDiv};
  padding: 6px;
  height: 50%;
  border-radius: 10px;
`;
const HeaderNavLinks = styled.div`
  font-family: "Roboto";
  height: 100%;
  margin:7px;
  border:2px solid black
  border-radius: 10px;
  background-color: ${(props) => props.theme.bgSubDiv}
  text-decoration: none;
`;
export default HeaderNav;
