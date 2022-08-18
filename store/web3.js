export const state = () => ({
  currentAccount: null,
  currentWallet: '',
  wallets: ['Metamask']
})

export const mutations = {
  SET_CURRENT_WALLET(state, wallet) {
    state.currentWallet = wallet
  },
  SET_CURRENT_ACCOUNT(state, account) {
    state.currentAccount = account
  }
}

export const getters = {
  connected(state) {
    return !!state.currentAccount
  },
  currentAccount(state) {
    return state.currentAccount
  },
  currentWallet(state) {
    return state.currentWallet
  },
}

export const actions = {
  logout({commit}) {
    commit('SET_CURRENT_WALLET', null)
    commit('SET_CURRENT_ACCOUNT', null)
    window.web3 = null
  },
}

