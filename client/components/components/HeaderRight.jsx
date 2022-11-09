import React from "react";
import styled from "styled-components";
import Brightness7icon from "@mui/icons-material/Brightness7";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useDispatch, useSelector } from "react-redux";
import { changeTheme } from "../../redux/theme";
import Wallet from "./Wallet";

function HeaderRight() {
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const themeHandle = () => {
    dispatch(changeTheme());
  };
  return (
    <HeaderRightWrapper>
      <Wallet />
      <ThemeToggle onClick={themeHandle}>
        {theme == "dark" ? <Brightness7icon /> : <DarkModeIcon />}
      </ThemeToggle>
    </HeaderRightWrapper>
  );
}

const HeaderRightWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 2rem;
  height: 50%;
`;
const ThemeToggle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.bgDiv};
  height: 100%;
  padding: 5px;
  width: 50px;
  cursor: pointer;
  border-radius: 12px;
`;
export default HeaderRight;
