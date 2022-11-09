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
  display:flex;
  alighn-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.theme.bgSubDiv}
  height: 100%;
  font-family: "Roboto";
  margin:7px;
  border-radius: 10px;
  text-decoration: none;
  padding:0 5px 5px;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: bold;

`;
export default HeaderNav;
