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
      >{{ formattedCurrentAccount  }}</v-btn>
    </template>

    <v-card>
      <v-card-title>{{ $t('navbar.connected_wallet') }}</v-card-title>
      <v-list-item-group
        :value="selectedWallet"
        color="orange"
      >
        <v-list-item v-for="(wallet, i) in wallets" :key="i" style="cursor: default;">
          <v-list-item-content>
            <v-list-item-title v-text="wallet.text"></v-list-item-title>
          </v-list-item-content>

          <v-list-item-icon>
            <metamask-icon />
          </v-list-item-icon>
        </v-list-item>
      </v-list-item-group>
      <v-card-actions>
        <v-row justify="end" class="mt-2">
          <v-btn color="orange" text depressed @click="logout">{{ $t('navbar.logout') }}</v-btn>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class Connected extends Vue {
  dialog = false;
  selectedWallet = 0;

  get formattedCurrentAccount() {
    const currentAccount = this.$store.state.web3.currentAccount

    return currentAccount.substring(0, 4) + '...' + currentAccount.substring(currentAccount.length - 4)
  }

  get wallets () {
    return [{
      text: this.$store.getters["web3/currentWallet"],
    }]
  }

  logout() {
    this.$store.dispatch('web3/logout')
    this.dialog = false
  }
}
</script>

<style>
.v-card {
  padding: 8px 8px 16px;
}
</style>
