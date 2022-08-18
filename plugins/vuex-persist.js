import VuexPersistence from 'vuex-persist'

export default ({ store }) => {
  new VuexPersistence({
    storage: window.localStorage,
    supportCircular: true,
    reducer: (state) => ({
      general: {
        tokens: state.general.tokens
      },
      web3: {
        currentAccount: state.web3.currentAccount,
        currentWallet: state.web3.currentWallet,
      }
    })
  }).plugin(store);
}
