import { ChainId } from "@uniswap/sdk-core";
import { ethers } from "ethers";

import {
  getEthereumPrice,
  getTokenPrice as getTokenPriceCG,
} from "./api/coingecko.js";
import { getTokenPrice as getTokenPriceDS } from "./api/dex-screener.js";

import { getTokenPrice as getTokenPriceUniswapV3 } from "./sdk/uniswap-v3.js";

const ethContractAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
const a8ContractAddress = "0x3e5a19c91266ad8ce2477b91585d1856b84062df";

async function fetchPricesByRestAPI() {
  console.log("Starting to fetch prices...");

  const ethPriceDS = await getTokenPriceDS(ethContractAddress);
  const a8PriceDS = await getTokenPriceDS(a8ContractAddress);

  const ethPriceCG = await getEthereumPrice();
  const a8PriceCG = await getTokenPriceCG(a8ContractAddress);

  console.log(`Dex-screener:\nETH/USDT: ${ethPriceDS}\nA8/USDT: ${a8PriceDS}`);
  console.log(`Coingecko:\nETH/USDT: ${ethPriceCG}\nA8/USDT: ${a8PriceCG}`);

  console.log("Finished fetching prices.");
}

async function fetchPriceByUniswapV3SDK() {
  const ETH_ADDRESS_CONTRACT = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
  const USDC_ADDRESS_CONTRACT = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48";
  const USDC_WETH_POOLS_LIQUITIY = "0x8ad599c3A0ff1De082011EFDDc58f1908eb6e6D8";

  const A8_ADDRESS_CONTRACT = "0x3e5a19c91266ad8ce2477b91585d1856b84062df";
  const USDT_ADDRESS_CONTRACT = "0xdac17f958d2ee523a2206206994597c13d831ec7";
  const A8_USDT_POOLS_LIQUIDITY = "0x0e59f2cfda2bb2e7fee10278dd2016a2e4311d72";

  const INFURA_API_KEY = "fc0e01daf6a442499b87a0e040edb8e9";

  const provider = new ethers.InfuraProvider(ChainId.MAINNET, INFURA_API_KEY);

  const pairA8UsdtPrice = await getTokenPriceUniswapV3(
    provider,
    A8_USDT_POOLS_LIQUIDITY,
    A8_ADDRESS_CONTRACT,
    USDT_ADDRESS_CONTRACT,
  );
  const pairUsdcWethPrice =
    1 /
    (await getTokenPriceUniswapV3(
      provider,
      USDC_WETH_POOLS_LIQUITIY,
      USDC_ADDRESS_CONTRACT,
      ETH_ADDRESS_CONTRACT,
    ));

  console.log(`A8/USDT: ${pairA8UsdtPrice}\nWETH/USDC: ${pairUsdcWethPrice}`);
}

fetchPricesByRestAPI()
fetchPriceByUniswapV3SDK();
