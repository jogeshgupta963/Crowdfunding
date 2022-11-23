import styled from "styled-components";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PaidIcon from "@mui/icons-material/Paid";
import EventIcon from "@mui/icons-material/Event";
import Image from "next/image";
import { ethers } from "ethers";
import CampaignFactory from "../utils/CampaignFactory.json";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Dashboard() {
  const [campaignsData, setCampaignsData] = useState([]);

  const Request = async () => {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const Web3provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = Web3provider.getSigner();
    const Address = await signer.getAddress();

    const provider = new ethers.providers.JsonRpcProvider(
      "https://polygon-mumbai.g.alchemy.com/v2/w-fqvGbEOfieIbLKKSEGwXbWmTuMt-rB"
    );

    const contract = new ethers.Contract(
      "0x96ce70C4625aDE8c917BAcB04E1d880B630A3999",
      CampaignFactory.abi,
      provider
    );

    const getAllCampaigns = contract.filters.campaignCreate(
      null,
      null,
      Address
    );
    const AllCampaigns = await contract.queryFilter(getAllCampaigns);
    const AllData = AllCampaigns.map((e) => {
      return {
        title: e.args.title,
        image: e.args.image,
        owner: e.args.owner,
        timeStamp: parseInt(e.args.timestamp),
        amount: ethers.utils.formatEther(e.args.requiredAmount),
        address: e.args.campaign,
      };
    });
    setCampaignsData(AllData);
  };

  useEffect(() => {
    Request();
  }, []);

  return (
    <HomeWrapper>
      {/* Cards Container */}
      <CardsWrapper>
        {/* Card */}
        {campaignsData.length > 0 &&
          campaignsData.map((e) => {
            return (
              <Card key={e.title}>
                <CardImg>
                  <Image alt="crowdfunding dapp" layout="fill" src={e.image} />
                </CardImg>
                <Title>{e.title}</Title>
                <CardData>
                  <Text>
                    Owner
                    <AccountBoxIcon />
                  </Text>
                  <Text>
                    {e.owner.slice(0, 6)}...{e.owner.slice(39)}
                  </Text>
                </CardData>
                <CardData>
                  <Text>
                    Amount
                    <PaidIcon />
                  </Text>
                  <Text>{e.amount} Matic</Text>
                </CardData>
                <CardData>
                  <Text>
                    <EventIcon />
                  </Text>
                  <Text>{new Date(e.timeStamp * 1000).toLocaleString()}</Text>
                </CardData>
                <Link passHref href={"/" + e.address}>
                  <Button>Go to Campaign</Button>
                </Link>
              </Card>
            );
          })}
        {/* Card */}
      </CardsWrapper>
    </HomeWrapper>
  );
}

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
const CardsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 80%;
  margin-top: 25px;
`;
const Card = styled.div`
  width: 30%;
  margin-top: 20px;
  background-color: ${(props) => props.theme.bgDiv};
  box-shadow: ${(props) => props.theme.shadowButton};
  &:hover {
    transform: translateY(-10px);
    transition: transform 0.5s;
  }

  &:not(:hover) {
    transition: transform 0.5s;
  }
`;
const CardImg = styled.div`
  position: relative;
  height: 120px;
  width: 100%;
`;
const Title = styled.h2`
  font-family: "Roboto";
  font-size: 18px;
  margin: 2px 0px;
  background-color: ${(props) => props.theme.bgSubDiv};
  padding: 5px;
  cursor: pointer;
  font-weight: normal;
`;
const CardData = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 2px 0px;
  background-color: ${(props) => props.theme.bgSubDiv};
  padding: 5px;
  cursor: pointer;
`;
const Text = styled.p`
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
  font-family: "Roboto";
  font-size: 18px;
  font-weight: bold;
`;
const Button = styled.button`
  padding: 8px;
  text-align: center;
  width: 100%;
  background-color: ${(props) => props.theme.bgDiv};
  box-shadow: ${(props) => props.theme.shadowButton};
  border: none;
  cursor: pointer;
  font-family: "Roboto";
  text-transform: uppercase;
  color: green;
  font-size: 14px;
  font-weight: bold;
`;
