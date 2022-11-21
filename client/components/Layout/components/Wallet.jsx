import React, { useState } from "react";
import styled from "styled-components";
import { ethers } from "ethers";
const networks = {
  polygon: {
    chainId: `0x${Number(80001).toString(16)}`,
    chainName: "Polygon Testnet",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
    blockExplorerUrls: ["https://mumbai.poygonscan.com"],
  },
};

function Wallet() {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState(null);
  const connectWallet = async () => {
    await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    // if (provider.network !== "matic") {
    //   await window.ethereum.request({
    //     method: "wallet_addEthereumChain",
    //     params: [
    //       {
    //         ...networks["polygon"],
    //       },
    //     ],
    //   });
    // }
    const account = provider.getSigner();
    const add = await account.getAddress();
    const bal = ethers.utils.formatEther(await account.getBalance());
    const addr = "0x..." + add.substring(add.length - 5);

    setAddress(addr);
    setBalance(Number(bal).toFixed(2));
  };

  return (
    <ConnectWallet onClick={connectWallet}>
      {address.length > 0 ? (
        <Details>
          <div>Address: {address}</div>

          <div>Balance: {balance} Matic</div>
        </Details>
      ) : (
        "Connect To Wallet"
      )}
    </ConnectWallet>
  );
}

const Details = styled.div`
  font-weight: bold;
  font-size: 1rem;
`;
const ConnectWallet = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.bgDiv};
  box-shadow: ${(props) => props.theme.showdowInput};
  padding: 0.4rem 1rem;
  height: 100%;
  cursor: pointer;
  font-weight: bold;
  margin-right: 0.4rem;
  color: ${(props) => props.theme.color};
  border-radius: 10px;
`;
export default Wallet;
