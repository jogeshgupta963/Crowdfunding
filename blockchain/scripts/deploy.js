
const hre = require("hardhat");
const {ethers} =require('ethers')
async function main() {
  const CampaignFactory = await hre.ethers.getContractFactory('CampaignFactory')
  const campaignFactory = await CampaignFactory.deploy()
  await campaignFactory.deployed();
  console.log(campaignFactory.address)
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
