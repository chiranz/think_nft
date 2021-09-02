import React from "react";
import dotenv from "dotenv";
import axios from "axios";
import NFTCard from "./NFTCard";
dotenv.config();

const WALLET_ADDRESS = "0x00fbfcf036fe12012c849c3f7dd9cb0afb7d64c1";
export default function WalletNFT() {
  const [walletNFTs, setWalletNFTs] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  async function initialize() {
    const nfts = [];
    const res = await axios.get(
      `https://api.ftmscan.com/api?module=account&action=tokennfttx&address=${WALLET_ADDRESS}&startblock=0&endblock=999999999&sort=asc&apikey=${process.env.FTMSCAN_KEY}`
    );
    const erc721Transfers = res.data.result;
    const totalNfts = erc721Transfers.length < 20 ? erc721Transfers.length : 20;
    for (let i = 0; i < totalNfts; i++) {
      if (i === erc721Transfers.length - 1) {
        console.log(erc721Transfers[i]);
      }

      const { to, tokenID, tokenName, tokenSymbol, contractAddress } =
        erc721Transfers[i];
      nfts[tokenID] = {
        owner: to,
        tokenID,
        tokenName,
        tokenSymbol,
        contractAddress,
      };
    }
    const _nfts = Object.values(nfts);
    setWalletNFTs(_nfts);
    setLoading(false);
  }

  React.useEffect(() => {
    initialize();
  }, []);
  console.log(walletNFTs);

  if (loading) {
    return <h1>Loading...</h1>;
  }
  return (
    <div>
      <h1>Your NFT's</h1>
      <div className="container">
        {walletNFTs.map((nft) => (
          <NFTCard nftDetails={nft} />
        ))}
      </div>
    </div>
  );
}
