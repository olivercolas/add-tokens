import {Token} from "~/types/tokenList";
import Web3 from "web3";

export enum WEB3_ERROR {
  USER_REJECTED = 'User rejected the request.',
  ALREADY_PROCESSING_REQUEST_ACCOUNTS = -32002
}

export enum NETWORK_RESULT {
  SUCCESS,
  NETWORK_UNAVAILABLE,
  OTHER_ERROR
}

export async function addTokenToWallet({address, symbol, decimals, image}: Token){
  let wasAdded: boolean;

  try {
    // wasAdded is a boolean. Like any RPC method, an error may be thrown.
    wasAdded = await window.ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20', // Initially only supports ERC20, but eventually more!
        options: {
          address, // The address that the token is at.
          symbol, // A ticker symbol or shorthand, up to 5 chars.
          decimals, // The number of decimals in the token
          image, // A string url of the token logo
        },
      },
    });

    return wasAdded
  } catch (error) {
    console.error(error)
    return false
  }
}

interface NetworkProps {
  web3: any,
  chainId: number,
  chainName: string,
  nativeCurrency: {
    name: string,
    symbol: string,
    decimals: number
  },
  rpcUrl: string,
  explorerUrl: string,
}

export async function initWeb3(): Promise<Array<string>> {
  let accounts = []

  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum)

    try {
      accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
    } catch(e: any) {
      if(e.code === WEB3_ERROR.ALREADY_PROCESSING_REQUEST_ACCOUNTS) {
        // Already waiting for user to unlock wallet, do nothing
      } else {
        console.error(e)
      }
    }
  }

  return accounts
}

export function onWeb3AccountsChanged(func: (accounts: string[]) => void) {
  if (window.ethereum) {
    window.ethereum.on('accountsChanged', func)
  }
}

export async function switchWeb3Network(props: NetworkProps) {
  let result: NETWORK_RESULT = await switchNetworkUsingChainId({chainId: props.chainId, web3: props.web3})

  if(result === NETWORK_RESULT.NETWORK_UNAVAILABLE){
    result = await addAndSwitchNetwork(props)
  }

  return result
}

async function switchNetworkUsingChainId({chainId, web3}: {chainId: number, web3: any}) {
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: web3.utils.toHex(chainId) }],
    })

    return NETWORK_RESULT.SUCCESS
  } catch (e: any) {
    if (e.code === 4902) {
      return NETWORK_RESULT.NETWORK_UNAVAILABLE
    } else {
      return NETWORK_RESULT.OTHER_ERROR
    }
  }
}

async function addAndSwitchNetwork({
  web3,
  chainId,
  chainName,
  nativeCurrency,
  rpcUrl,
  explorerUrl
}: NetworkProps) {
  try{
    await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [{
        chainId: web3.utils.toHex(chainId),
        chainName: chainName,
        nativeCurrency: nativeCurrency,
        rpcUrls: [rpcUrl],
        blockExplorerUrls: [explorerUrl]
      }],
    })

    return NETWORK_RESULT.SUCCESS
  } catch (e) {
    return NETWORK_RESULT.OTHER_ERROR
  }
}
