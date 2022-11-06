require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

task("accounts", "Prints list", async (taskArgs, hre) => {
  const accs = await hre.ethers.getSigners();

  accs.forEach(async (acc) => {
    const address = await acc.getAddress();

    console.log(address);
  });
});
module.exports = {
  solidity: "0.8.8",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    polygon: {
      url: process.env.POLYGON_API_HTTP,
      accounts: [process.env.METAMASK_PVT_KEY],
    },
  },
};
