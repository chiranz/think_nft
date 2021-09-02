import axios from "axios";
import React from "react";
import { useContract } from "../hooks/useContract";

export default function NFTCard({ nftDetails }) {
  const [loading, setLoading] = React.useState(true);
  const [imageUrl, setImageUrl] = React.useState("");

  const contract = useContract(nftDetails.contractAddress);
  React.useEffect(() => {
    async function init() {
      if (contract) {
        const _tokenURI = await contract.functions.tokenURI(nftDetails.tokenID);
        if (_tokenURI[0].includes("https")) {
          const _tokenMetadata = await axios.get(_tokenURI[0]);
          setImageUrl(_tokenMetadata.data.image);
        }
        setLoading(false);
      }
    }
    init();
  }, [contract, nftDetails.tokenID]);

  if (loading) {
    return <div className="card">Loading....</div>;
  }

  return (
    <div className="card">
      <div className="card-header">
        {nftDetails.tokenName} #{nftDetails.tokenID}
      </div>
      <div className="card-body">
        {imageUrl && (
          <img src={imageUrl} alt="" style={{ maxWidth: "100px" }} />
        )}
      </div>
      <div className="card-actions">
        <div>Price</div>
        <button>Sell</button>
      </div>
    </div>
  );
}
