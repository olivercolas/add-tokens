const NETWORKS = {
  avalanche: {
      chainId: 43114,
      logoURL: 'avalanche.svg',
      explorerURL: 'https://snowtrace.io',
      explorerTokenURL: 'https://snowtrace.io/token',
      chainName: 'Avalanche',
      nativeCurrency: {
        name: 'AVAX',
        symbol: 'AVAX',
        decimals: 18
      },
      rpcUrl: 'https://api.avax.network/ext/bc/C/rpc',
  },
  ethereum: {
    chainId: 1,
    logoURL: 'ethereum.svg',
    explorerURL: 'https://etherscan.io',
    explorerTokenURL: 'https://etherscan.io/token',
    chainName: 'Ethereum',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    rpcUrl: 'https://api.mycryptoapi.com/eth',
  }
} as Record<string, {
  chainId: number
  logoURL: string
  explorerURL: string
  explorerTokenURL: string
  chainName: string
  nativeCurrency: {
    name: string
    symbol: string
    decimals: number
  }
  rpcUrl: string
}>


export function getNetworkLogoURL(network: string) {
  return NETWORKS[network].logoURL
}

export function getNetworkExplorerTokenURL(network: string) {
  return NETWORKS[network].explorerTokenURL
}

export function getCurrentNetworkInfo(network: string) {
  return {
    name: network,
    ...NETWORKS[network]
  }
}

export function getNetworksInfo() {
  return Object.keys(NETWORKS).map(network => {
    const currentNetwork = NETWORKS[network]

    return {
      name: network,
      ...currentNetwork
    }
  })
}

export async function getIsOnCorrectNetwork(network: string) {
  const currentChainId = getCurrentNetworkInfo(network).chainId

  const networkId = await window.web3.eth.net.getId()

  const userWalletIsOnDifferentChain = networkId !== currentChainId

  if (userWalletIsOnDifferentChain) {
    return false
  } else {
    return true
  }
}

const NETWORK_API = {
  avalanche: 'https://raw.githubusercontent.com/traderjoe-xyz/joe-tokenlists/main/joe.tokenlist.json',
  ethereum: 'https://wispy-bird-88a7.uniswap.workers.dev/?url=http://tokenlist.aave.eth.link'
}

export async function getTokensForNetwork(axios: any, network: keyof typeof NETWORK_API) {
  try {
    const result = await axios.get(NETWORK_API[network])
    const currentChainId = getCurrentNetworkInfo(network).chainId

    return result.data.tokens.filter((token: any) => token?.chainId === currentChainId)
  } catch(error) {
    console.error(error)
  }
}
