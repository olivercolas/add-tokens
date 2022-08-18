export {}

declare global {
  interface Window {
    web3?: any
    currentWeb3Account?: any
    web3Contract?: any
    ethereum?: any
    currentNetwork?: string
  }
}
