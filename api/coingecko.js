import axios from "axios";

async function getEthereumPrice() {
  try {
    const ethUrl =
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd";
    const ethResponse = await axios.get(ethUrl);
    const ethPrice = ethResponse.data.ethereum.usd;

    return ethPrice;
  } catch (error) {
    console.error("An error occurred:", error);
    return 0;
  }
}

async function getTokenPrice(tokenAddress) {
  try {
    const tokenUrl = `https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${tokenAddress}&vs_currencies=usd`;
    const tokenResponse = await axios.get(tokenUrl);
    const tokenPrice =
      tokenResponse.data[tokenAddress]?.usd || "Token not found";

    return tokenPrice;
  } catch (error) {
    console.error("An error occurred:", error);
    return 0;
  }
}

export { getEthereumPrice, getTokenPrice };
