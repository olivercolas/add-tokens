import {getTokensForNetwork} from "~/api/networks";

export const state = () => ({
  loading: true,
  network: 'avalanche',
  tokens: {
    avalanche: [],
    ethereum: []
  }
})

export const mutations = {
  SET_NETWORK(state, network) {
    state.network = network
  },
  SET_TOKENS(state, {tokens, network}) {
    state.tokens[network] = tokens
  }
}

export const getters = {
  getCurrentNetwork(state) {
    return state.network
  },
  getCurrentNetworkTokens(state) {
    return state.tokens[state.network]
  }
}

export const actions = {
  async getNetworkTokens({state, commit}) {
    const hasTokensForNetwork = state.tokens[state.network].length > 0

    if(!hasTokensForNetwork) {
      const tokens = await getTokensForNetwork(this.$axios, state.network)

      commit('SET_TOKENS', {network: state.network, tokens: tokens})
    }
  }
}
