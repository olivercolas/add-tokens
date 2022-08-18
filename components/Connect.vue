<template>
  <v-dialog
    width="500"
    v-model="dialog"
  >
    <template v-slot:activator="props">
      <v-btn
        class="mr-2"
        rounded
        depressed
        color="grey lighten-3"
        v-bind="props.attrs"
        v-on="props.on"
      >{{ $t('navbar.connect') }}</v-btn>
    </template>

    <v-card>
      <v-card-title>{{ $t('navbar.connect_wallet') }}</v-card-title>
      <v-list-item-group
        v-model="selectedWallet"
        color="orange"
      >
        <v-list-item v-for="(wallet, i) in wallets" :key="i" @click="wallet.onClick">
          <v-list-item-content>
            <v-list-item-title v-text="wallet.text"></v-list-item-title>
          </v-list-item-content>

          <v-list-item-icon>
            <metamask-icon />
          </v-list-item-icon>
        </v-list-item>
      </v-list-item-group>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { initWeb3, WEB3_ERROR } from '~/api/web3'

@Component
export default class Connect extends Vue {
  selectedWallet = null;
  dialog = false;

  get wallets() {
    return this.$store.state.web3.wallets.map((wallet: string) => ({
      text: wallet,
      onClick: () => this.init(wallet)
    }))
  }

  async init(selectedWallet: string) {
    try{
      const accounts = await initWeb3()
      const currentAccount = accounts[0]

      await this.$store.commit('web3/SET_CURRENT_WALLET', selectedWallet)

      if(currentAccount) {
        this.$store.commit('web3/SET_CURRENT_ACCOUNT', currentAccount)
      }
    } catch(e) {
      console.error(e)

      if(e.message === WEB3_ERROR.USER_REJECTED) {
        this.dialog = false
        this.$store.commit('toast/DISPLAY_ERROR', this.$t('toast.errorMessages.userRejected'))
      }
    }
  }
}
</script>

<style>
.v-card {
  padding: 8px 8px 16px;
}
</style>
