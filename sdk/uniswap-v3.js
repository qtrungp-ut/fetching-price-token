import { ethers } from "ethers";
import IUniswapV3Pool from "@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json" assert { type: "json" };

async function getTokenPrice(
  provider,
  poolAddress,
  tokenAAddress,
  tokenBAddress,
) {
  // step 0: get the contract of tokenA & tokenB
  const tokenAContract = new ethers.Contract(
    tokenAAddress,
    [
      "function decimals() view returns (uint8)",
      "function symbol() view returns (string)",
    ],
    provider,
  );
  const tokenBContract = new ethers.Contract(
    tokenBAddress,
    [
      "function decimals() view returns (uint8)",
      "function symbol() view returns (string)",
    ],
    provider,
  );

  // step 1.A: fetch the decimals & symbol (can skip if already know)
  const [tokenADecimals, tokenBDecimals, tokenASymbol, tokenBSymbol] =
    await Promise.all([
      tokenAContract.decimals(),
      tokenBContract.decimals(),
      tokenAContract.symbol(),
      tokenBContract.symbol(),
    ]);

  const tokenADecimalsInt = Number(tokenADecimals);
  const tokenBDecimalsInt = Number(tokenBDecimals);

  // step 1.B: init the pool of contract in Uniswap
  const poolContract = new ethers.Contract(
    poolAddress,
    IUniswapV3Pool.abi,
    provider,
  );

  // step 2: calculate the price of pair tokenA/tokenB base on the sqrtPriceX96
  const slot0 = await poolContract.slot0();
  const sqrtPriceX96 = slot0[0];

  const price =
    Math.pow(Number(sqrtPriceX96) / Math.pow(2, 96), 2) *
    Math.pow(10, tokenADecimalsInt - tokenBDecimalsInt);

  return price;
}

export { getTokenPrice };
