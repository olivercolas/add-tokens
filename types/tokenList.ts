export interface Token {
  name: string
  chainId: number
  address: string
  symbol: string
  decimals: number
  image: string
}

export type TokenList = Array<Token>
