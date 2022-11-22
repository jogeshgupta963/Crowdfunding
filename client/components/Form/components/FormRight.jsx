import React, { useRef } from "react";
import { useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";
import axios from "axios";
import { ethers } from "ethers";
import CampaignFactory from "../../../utils/CampaignFactory.json";

function FormRight({ title, story }) {
  const amount = useRef(0);
  const category = useRef("");
  const [image, setImage] = useState(null);
  const [storyUrl, setStoryUrl] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [address, setAddress] = useState("");

  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const uploadFiles = async (e) => {
    //upload files
    try {
      setUploading(true);
      setImageUrl(
        "https://crowdfundingplatform.s3.ap-south-1.amazonaws.com/campaign/29caafc6-ba6c-4936-9ded-792e22e37966"
      );
      setStoryUrl(
        "https://crowdfundingplatform.s3.ap-south-1.amazonaws.com/campaign/text.txt"
      );
      setUploading(false);
      setUploaded(true);
    } catch (err) {
      console.log(err);
    }
  };
  const startCampaign = async (e) => {
    e.preventDefault();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    try {
      if (title.current.value === "") {
        toast.warn("Title Field Is Empty");
      } else if (storyUrl === "") {
        toast.warn("Story Field Is Empty");
      } else if (!amount.current.value) {
        toast.warn("Required Amount Field Is Empty");
      } else if (uploaded == false) {
        toast.warn("Files Upload Required");
      } else {
        setLoading(true);
        setLoaded(false);
        const contract = new ethers.Contract(
          // process.env.Deployed_Contract_Address,
          "0xeEb2C67c67a410248C094dFd7b7284B8c24818bD",
          CampaignFactory.abi,
          signer
        );

        const campaignAmount = ethers.utils.parseEther(amount.current.value);

        const campaignData = await contract.createCampaign(
          title.current.value,
          campaignAmount,
          imageUrl,
          storyUrl,
          category
        );
        await campaignData.wait();

        setAddress(campaignData.to);
        setLoading(false);
        setLoaded(true);
        console.log(address);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <FormRightWrapper>
      <FormInput>
        <FormRow>
          <RowFirstInput>
            <label>Required Amount</label>
            <Input
              ref={amount}
              type="number"
              placeholder="Required Amount"
            ></Input>
          </RowFirstInput>
          <RowSecondInput>
            <label>Choose Category</label>
            <Select ref={category}>
              <option>Education</option>
              <option>Health</option>
              <option>Animal</option>
            </Select>
          </RowSecondInput>
        </FormRow>
      </FormInput>
      {/* Image */}
      <FormInput>
        <label>Select Image</label>
        <Image
          alt="dapp"
          onChange={(e) => setImage(e.target.files[0])}
          type={"file"}
          accept="image/*"
        ></Image>
      </FormInput>

      {uploading == true ? (
        <Button>
          <TailSpin color="#fff" height={20} />
        </Button>
      ) : uploaded == false ? (
        <Button onClick={uploadFiles}>Upload Files to IPFS</Button>
      ) : (
        <Button style={{ cursor: "no-drop" }}>
          Files uploaded Sucessfully
        </Button>
      )}
      {loading == true ? (
        <Button>
          <TailSpin color="#fff" height={20} />
        </Button>
      ) : loaded == false ? (
        <Button onClick={startCampaign}>Start Campaign</Button>
      ) : (
        <Button style={{ cursor: "no-drop" }}>
          Campaign Created Sucessfully
        </Button>
      )}
      {/* <Button onClick={startCampaign}>Start Campaign</Button> */}
    </FormRightWrapper>
  );
}

const FormRightWrapper = styled.div`
  width: 45%;
`;

const FormInput = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "poppins";
  margin-top: 10px;
`;

const FormRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Input = styled.input`
  padding: 15px;
  background-color: ${(props) => props.theme.bgDiv};
  color: ${(props) => props.theme.color};
  margin-top: 4px;
  border: none;
  border-radius: 8px;
  outline: none;
  font-size: large;
  width: 100%;
`;

const RowFirstInput = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
`;

const RowSecondInput = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
`;

const Select = styled.select`
  padding: 15px;
  background-color: ${(props) => props.theme.bgDiv};
  color: ${(props) => props.theme.color};
  margin-top: 4px;
  border: none;
  border-radius: 8px;
  outline: none;
  font-size: large;
  width: 100%;
`;

const Image = styled.input`
  background-color: ${(props) => props.theme.bgDiv};
  color: ${(props) => props.theme.color};
  margin-top: 4px;
  border: none;
  border-radius: 8px;
  outline: none;
  font-size: large;
  width: 100%;
  &::-webkit-file-upload-button {
    padding: 15px;
    background-color: ${(props) => props.theme.bgSubDiv};
    color: ${(props) => props.theme.color};
    outline: none;
    border: none;
    font-weight: bold;
  }
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 15px;
  color: white;
  background-color: #00b712;
  background-image: linear-gradient(180deg, #00b712 0%, #5aff15 80%);
  border: none;
  margin-top: 30px;
  cursor: pointer;
  font-weight: bold;
  font-size: large;
`;
export default FormRight;
