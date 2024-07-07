

// Just improvised for getting base coin ticker
export const getBaseCoinName = (chainId) => {
  let ticker = "Ethereum";
  if (chainId === 1)
    ticker = "Ethereum"
  if (chainId === 56)
    ticker = "Binance Coin"
  if (chainId === 8453)
    ticker = "Ethereum"
  return ticker;
}
export const getBaseCoinTicker = (chainId) => {
  let ticker = "ETH";
  if (chainId === 1)
    ticker = "ETH"
  if (chainId === 56)
    ticker = "BNB"
  if (chainId === 8453)
    ticker = "ETH"
  return ticker;
}
