import React from "react";
import styled from "styled-components";
function FormLeft({ title, story }) {
  return (
    <FormLeftWrapper>
      <FormInput>
        <label>Campaign Title</label>
        <Input
          ref={title}
          placeholder="Campaign Title"
          name="campaignTitle"
        ></Input>
      </FormInput>
      <FormInput>
        <label>Story</label>
        <TextArea ref={story} placeholder="Describe Your Story"></TextArea>
      </FormInput>
    </FormLeftWrapper>
  );
}

const FormLeftWrapper = styled.div`
  width: 48%;
`;

const FormInput = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "poppins";
  margin-top: 10px;
`;
const Input = styled.input`
  padding: 15px;
  background-color: ${(props) => props.theme.bgDiv};
  color: ${(props) => props.theme.color};
  box-shadow: ${(props) => props.theme.showdowInput};
  margin-top: 4px;
  border: none;
  border-radius: 8px;
  outline: none;
  font-size: large;
  width: 100%;
`;

const TextArea = styled.textarea`
  padding: 15px;
  background-color: ${(props) => props.theme.bgDiv};
  color: ${(props) => props.theme.color};
  box-shadow: ${(props) => props.theme.showdowInput};
  margin-top: 4px;
  border: none;
  border-radius: 8px;
  outline: none;
  font-size: large;
  max-width: 100%;
  min-width: 100%;
  overflow-x: hidden;
  min-height: 160px;
`;
export default FormLeft;
