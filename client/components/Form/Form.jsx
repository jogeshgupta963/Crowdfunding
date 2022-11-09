import React, { useState } from "react";
import { useRef } from "react";
import styled from "styled-components";
import { FormLeft, FormRight } from "./components/index";
function Form() {
  const title = useRef("");
  const story = useRef("");
  return (
    <FormWrapper>
      <FormMain>
        <FormTitle>Create Campaign</FormTitle>
        <FormInputWrapper>
          <FormLeft title={title} story={story} />
          <FormRight title={title} story={story} />
        </FormInputWrapper>
      </FormMain>
    </FormWrapper>
  );
}
const FormWrapper = styled.div`
  display: flex;
  width: 90%;
  justify-content: center;
`;
const FormMain = styled.div`
  width: 80%;
`;
const FormTitle = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: capitalize;
  font-weight: bold;
  color: ${(props) => props.theme.color};
  font-family: "Poppins";
  font-size: 40px;
  margin-top: 1rem;
`;
const FormInputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

export default Form;
