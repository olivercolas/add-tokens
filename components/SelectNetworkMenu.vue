<template>
  <v-menu
    bottom
    rounded
    offset-y
    transition="slide-y-transition"
    :open-on-click="true"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        rounded
        v-bind="attrs"
        v-on="on"
        class="text-capitalize mr-2"
        elevation="0"
      >
        <v-icon v-if="isDefaultNetwork" color="grey darken-1" class="mr-1">mdi-web</v-icon>
        <v-img v-else height="20px" width="20px" :src="require(`~/assets/${networkLogoURL}`)" :alt="currentNetwork" class="mr-1"/>
        <span class="mr-1">{{ currentNetwork }}</span>
        <chevron-down-icon />
      </v-btn>
    </template>
    <v-card class="pt-2 pb-2">
      <v-btn
        v-for="(item, index) in networks"
        :key="index"
        @click="handleNetworkSwitch(item)"
        class="network-btn d-block"
        tile
        :color="buttonColor(item.name)"
        elevation="0"
      >
        <span :class="currentNetwork === item.name && 'orange--text'">
         {{ item.name }}
        </span>
        <img :src="require(`~/assets/${item.logoURL}`)" height="20px" width="20px" />
      </v-btn>
    </v-card>
  </v-menu>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import {NETWORK_RESULT, switchWeb3Network} from "~/api/web3";
import { getNetworkLogoURL, getNetworksInfo } from "~/api/networks";

@Component
export default class SelectNetwork extends Vue {
  get isDefaultNetwork() {
    return this.$store.state.general.network === 'all'
  }

  get networks() {
    return getNetworksInfo()
  }

  get currentNetwork() {
    return this.$store.state.general.network
  }

  get networkLogoURL() {
    return getNetworkLogoURL(this.$store.getters['general/getCurrentNetwork'])
  }

  buttonColor(name: string) {
    const activeColor = "orange lighten-5"
    const defaultColor = "grey lighten-3"

    return name === this.currentNetwork ? activeColor : defaultColor
  }

  async handleNetworkSwitch({
    name,
    chainId,
    chainName,
    explorerURL,
    rpcUrl,
    nativeCurrency
  }: any) {
    if(this.$store.getters["web3/connected"]) {
      const result = await switchWeb3Network({
        web3: window.web3,
        chainId,
        chainName,
        nativeCurrency,
        rpcUrl,
        explorerUrl: explorerURL
      })

      if(result === NETWORK_RESULT.OTHER_ERROR) {
        this.$store.commit('toast/DISPLAY_ERROR', this.$t('toast.errorMessages.unexpectedError'))
        return
      }
    }

    this.$store.commit('general/SET_NETWORK', name)
  }
}
</script>

<style>
.network-btn {
  width: 100%;
  justify-content: space-between;
  text-transform: capitalize;
  border-radius: 6px;
}
.network-btn:not(:last-child) {
  margin-bottom: 8px;
}
.network-btn span > span {
  margin-right: 16px;
}
</style>
