<template>
  <div
    class="table-container"
  >
    <v-data-table
      :headers="headers"
      :items="tokens"
      :search="search"
      :items-per-page="15"
      :page.sync="page"
      hide-default-footer
      :custom-filter="filterTable"
      @pagination="onPaginationChanged"
      class="table-body"
      height="100%"
    >
      <template v-slot:item.image="{item}">
        <v-avatar>
          <img
            v-if="item.logoURI"
            :src="getLogoURL(item.logoURI)"
            :alt="item.name"
            class="avatar-image"
          >
          <v-icon v-else>mdi-help-circle</v-icon>
        </v-avatar>
      </template>
      <template v-slot:item.address="{ item }">
        <v-btn class="text-capitalize" plain text :href="onAddressClick(item.address)" target="_blank">
          {{ formattedAddress(item.address) }} <v-icon small>mdi-open-in-new</v-icon>
        </v-btn>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn
          elevation="0"
          rounded
          small
          color="rgb(248 239 229)"
          class="add-btn"
          @click="addToWallet(item)"
        >{{ $t('pages.home.table.rows.action') }} <metamask-icon width="16px" height="16px" margin="0 0 0 5px"/></v-btn>
      </template>
    </v-data-table>
    <div class="footer-container text-center d-flex align-items justify-center pt-2 pb-2">
      <v-pagination
        v-model="page"
        :length="pageCount"
        class="d-flex"
        color="orange darken-3"
      ></v-pagination>
    </div>
    <v-dialog width="500" v-model="showWrongNetworkDialog">
      <v-card>
        <v-card-title>{{ $t('pages.home.table.wrongNetwork.title') }}</v-card-title>
        <v-card-actions>
          <v-row justify="end" class="mt-2">
            <v-btn color="orange" text depressed @click="switchNetwork">{{ $t('pages.home.table.wrongNetwork.switchTo') }} {{ currentNetwork }}</v-btn>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import {Token} from "~/types/tokenList";
import { addTokenToWallet, NETWORK_RESULT, switchWeb3Network } from "~/api/web3";
import { Prop, Watch } from "vue-property-decorator";
import { getIsOnCorrectNetwork, getNetworkExplorerTokenURL, getTokensForNetwork } from "~/api/networks";

@Component
export default class DataTable extends Vue {
  @Prop(String) readonly search: string | undefined

  showWrongNetworkDialog = false

  headers = [
    {
      text: '',
      align: 'start',
      sortable: false,
      value: 'image'
    },
    {
      text: this.$t('pages.home.table.headers.symbol'),
      value: 'symbol'
    },
    {
      text: this.$t('pages.home.table.headers.name'),
      value: 'name'
    },
    {
      text: this.$t('pages.home.table.headers.address'),
      align: 'center',
      sortable: false,
      value: 'address'
    },
    {
      text: '',
      align: 'right',
      sortable: false,
      value: 'actions'
    },
  ]
  page = 1
  pageCount = 0

  get tokens() {
    return this.$store.getters['general/getCurrentNetworkTokens'] || []
  }

  get loading() {
    return this.$store.state.general.loading
  }

  get currentNetwork() {
    return this.$store.getters["general/getCurrentNetwork"]
  }

  getLogoURL(logoURI: string) {
    if(logoURI.includes('ipfs')) {
      return 'https://ipfs.io/' + logoURI.replace('ipfs:', 'ipfs')
    } else {
      return logoURI
    }
  }

  onPaginationChanged(items: any) {
    this.page = items.page
    this.pageCount = items.pageCount
  }

  filterTable(value: any, search: string | null, item: any) {
    const containsSymbol = item.symbol.toLowerCase().includes(search || '')
    const containsName = item.name.toLowerCase().includes(search || '')

    return containsSymbol || containsName
  }

  @Watch('currentNetwork')
  onCurrentNetworkChanged() {
    this.getTokens()
  }

  async addToWallet(item: Token) {
    const isOnCorrectNetwork = await getIsOnCorrectNetwork(this.$store.getters["general/getCurrentNetwork"])

    if(!this.$store.getters['web3/currentAccount']) {
      this.$store.commit('toast/DISPLAY_ERROR', this.$t('toast.errorMessages.connectWallet'))
    } else if (!isOnCorrectNetwork){
      this.showWrongNetworkDialog = true
    } else {
      const added = await addTokenToWallet(item)

      if(!added) {
        this.$store.commit('toast/DISPLAY_ERROR', this.$t('toast.errorMessages.unableToAddToken'))
      }
    }
  }

  onAddressClick(address: string) {
    const explorerURL = getNetworkExplorerTokenURL(this.$store.getters["general/getCurrentNetwork"])

    return explorerURL + '/' + address
  }

  formattedAddress(address: string) {
    return address.substring(0, 5) + '...' + address.substring(address.length-5, address.length)
  }

  async switchNetwork() {
    const result = await switchWeb3Network(this.$store.getters["general/getCurrentNetwork"])

    switch(result) {
       case NETWORK_RESULT.SUCCESS: this.showWrongNetworkDialog = false;
         break;
       default: {
         this.$store.commit('toast/DISPLAY_ERROR', this.$t('toast.errorMessages.unexpectedError'))
         this.showWrongNetworkDialog = false;
       }
    }
  }

  mounted() {
    this.getTokens()
  }

  async getTokens() {
    this.$store.dispatch('general/getNetworkTokens')
  }
}
</script>

<style>
.table-container {
  grid-area: body;
  display: grid;
  grid-template-areas:
    "main"
    "footer"
  ;
  grid-template-rows: calc(100% - 80px) 80px;
}
.table-body {
  grid-area: main;
}
.footer-container {
  grid-area: footer;
}
.avatar-image{
  padding: 8px;
}
.add-btn{
  color: #c07e18 !important;
}
</style>
