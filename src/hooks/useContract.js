import React from "react";
import { ethers } from "ethers";
import erc721abi from "../abis/erc721.json";

export const useContract = (address) => {
  const [contract, setContract] = React.useState();
  React.useEffect(() => {
    const provider = new ethers.providers.JsonRpcProvider(
      "https://rpc.ftm.tools/"
    );
    const _contract = new ethers.Contract(address, erc721abi, provider);

    setContract(_contract);
  }, [address]);

  return contract;
};
