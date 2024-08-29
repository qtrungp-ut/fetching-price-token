import axios from "axios";

async function getTokenPrice(tokenContractAddress) {
  try {
    const tokenResponse = await axios.get(
      `https://api.dexscreener.com/latest/dex/tokens/${tokenContractAddress}`,
    );
    const tokenPriceData = tokenResponse.data.pairs[0];
    const tokenPrice = tokenPriceData.priceUsd;

    return tokenPrice;
  } catch (error) {
    console.error("Error fetching prices from Dex Screener:", error);
    return 0;
  }
}

export { getTokenPrice };
