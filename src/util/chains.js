
export const mainnet = {
  chainId: 1,
  name: 'Ethereum',
  currency: 'ETH',
  explorerUrl: 'https://etherscan.io',
  // rpcUrl: 'https://cloudflare-eth.com'
  rpcUrl: 'https://mainnet.infura.io/v3/' + process.env.REACT_APP_INFURA_TOKEN
}

export const bsc = {
  chainId: 56,
  name: 'Binance Smart Chain',
  currency: 'BNB',
  explorerUrl: 'https://bscscan.com/',
  rpcUrl: 'https://bsc-dataseed.binance.org/'
}

export const base = {
  chainId: 8453,
  name: 'Base',
  currency: 'ETH',
  explorerUrl: 'https://basescan.org/',
  rpcUrl: 'https://mainnet.base.org'
}


