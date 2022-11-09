import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import Link from "next/link";
function HeaderNav() {
  const router = useRouter();
  return (
    <HeaderNavWrapper>
      <Link href={"/"}>
        <HeaderNavLinks active={router.pathname == "/" ? true : false}>
          Campaigns
        </HeaderNavLinks>
      </Link>
      <Link href={"/campaign"}>
        <HeaderNavLinks active={router.pathname == "/campaign" ? true : false}>
          Create Campaign
        </HeaderNavLinks>
      </Link>
      <Link href={"/dashboard"}>
        <HeaderNavLinks active={router.pathname == "/dashboard"}>
          Dashboard
        </HeaderNavLinks>
      </Link>
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
  display: flex;
  alighn-items: center;
  justify-content: space-between;
  background-color: ${(props) =>
    props.active ? props.theme.bgSubDiv : props.theme.bgDiv}
  height: 100%;
  font-family: "Roboto";
  margin: 7px;
  border-radius: 10px;
  text-decoration: none;
  padding: 0 5px 5px;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: bold;
`;
export default HeaderNav;

// background-color: ${(props) =>
//   props.active ? props.theme.bgSubDiv : props.theme.bgDiv}
