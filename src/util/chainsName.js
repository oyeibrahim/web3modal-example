

// Just improvised for getting base chain name
export const getChainName = (chainId) => {
  let ticker = "";
  if (chainId === 1)
    ticker = "Ethereum"
  if (chainId === 56)
    ticker = "Binance Smart Chain"
  if (chainId === 8453)
    ticker = "Base"
  return ticker;
}
