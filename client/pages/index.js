import styled from "styled-components";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PaidIcon from "@mui/icons-material/Paid";
import EventIcon from "@mui/icons-material/Event";
import Image from "next/image";
import { ethers } from "ethers";
import CampaignFactory from "../utils/CampaignFactory.json";
import { useState } from "react";
import Link from "next/link";
import { useEffect } from "react";
import { width } from "@mui/system";

export default function Home({
  AllData,
  HealthData,
  EducationData,
  AnimalData,
}) {
  const [filter, setFilter] = useState(AllData);

  return (
    <HomeWrapper>
      {/* Filter Section */}
      <FilterWrapper>
        <FilterAltIcon style={{ fontSize: 40 }} />
        <Category onClick={() => setFilter(AllData)}>All</Category>
        <Category onClick={() => setFilter(HealthData)}>Health</Category>
        <Category onClick={() => setFilter(EducationData)}>Education</Category>
        <Category onClick={() => setFilter(AnimalData)}>Animal</Category>
      </FilterWrapper>

      {/* Cards Container */}
      <CardsWrapper>
        {/* Card */}
        {filter.length > 0 &&
          filter.map((e) => {
            return (
              <Card key={e.title}>
                <CardImg>
                  <img src={e.image} style={{ width: "80%", height: "100%" }} />
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
                  {/* <Text>{new Date(e.timeStamp * 1000).toLocaleString()}</Text> */}
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

export async function getStaticProps() {
  const provider = new ethers.providers.JsonRpcProvider(
    // process.env.POLYGON_API_HTTP
    "https://polygon-mumbai.g.alchemy.com/v2/w-fqvGbEOfieIbLKKSEGwXbWmTuMt-rB"
  );

  const contract = new ethers.Contract(
    "0x96ce70C4625aDE8c917BAcB04E1d880B630A3999",
    CampaignFactory.abi,
    provider
  );

  const getAllCampaigns = contract.filters.campaignCreate();
  const AllCampaigns = await contract.queryFilter(getAllCampaigns);
  const AllData = AllCampaigns.map((e) => {
    return {
      title: e.args.title,
      image: e.args.image,
      owner: e.args.owner,
      timeStamp: parseInt(e.args.timeStamp),
      amount: ethers.utils.formatEther(e.args.requiredAmount),
      address: e.args.campaign,
    };
  });

  const getHealthCampaigns = contract.filters.campaignCreate(
    null,
    null,
    null,
    null,
    null,
    null,
    "Health"
  );
  const HealthCampaigns = await contract.queryFilter(getHealthCampaigns);

  const HealthData = HealthCampaigns.map((e) => {
    return {
      title: e.args.title,
      image: e.args.image,
      owner: e.args.owner,
      timeStamp: parseInt(e.args.timeStamp),
      amount: ethers.utils.formatEther(e.args.requiredAmount),
      address: e.args.campaign,
    };
  });

  const getEducationCampaigns = contract.filters.campaignCreate(
    null,
    null,
    null,
    null,
    null,
    null,
    "Education"
  );
  const EducationCampaigns = await contract.queryFilter(getEducationCampaigns);
  const EducationData = EducationCampaigns.map((e) => {
    return {
      title: e.args.title,
      image: e.args.image,
      owner: e.args.owner,
      timeStamp: parseInt(e.args.timeStamp),
      amount: ethers.utils.formatEther(e.args.requiredAmount),
      address: e.args.campaign,
    };
  });

  const getAnimalCampaigns = contract.filters.campaignCreate(
    null,
    null,
    null,
    null,
    null,
    null,
    "Animal"
  );
  const AnimalCampaigns = await contract.queryFilter(getAnimalCampaigns);
  const AnimalData = AnimalCampaigns.map((e) => {
    return {
      title: e.args.title,
      image: e.args.image,
      owner: e.args.owner,
      timeStamp: parseInt(e.args.timeStamp),
      amount: ethers.utils.formatEther(e.args.requiredAmount),
      address: e.args.campaign,
    };
  });

  return {
    props: {
      AllData,
      HealthData,
      EducationData,
      AnimalData,
    },
    revalidate: 10,
  };
}

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
const FilterWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  margin-top: 15px;
`;
const Category = styled.div`
  padding: 10px 15px;
  background-color: ${(props) => props.theme.bgDiv};
  box-shadow: ${(props) => props.theme.shadowButton};
  margin: 0px 15px;
  border-radius: 8px;
  font-family: "Poppins";
  font-weight: normal;
  cursor: pointer;
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
  border-radius: 8px;
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
  width: 125%;
  border-radius: 8px 8px 0px 0px;
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
  background-color: ${(props) => props.theme.bgSubDiv};
  box-shadow: ${(props) => props.theme.shadowButton};
  border: none;
  cursor: pointer;
  font-family: "Roboto";
  text-transform: uppercase;
  color: 'green' ;
  font-size: 14px;
  font-weight: bold;
`;
