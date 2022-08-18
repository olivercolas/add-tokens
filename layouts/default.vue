<template>
    <v-app>
        <nav-bar>
          <template v-slot:title>
            <div class="d-flex align-center">
              <i18n path="navbar.logo" tag="div" class="d-flex align-center">
                <template v-slot:metamask>
                  <metamask-icon width="18px" height="18px" margin="0 0 0 5px"/>
                </template>
              </i18n>
            </div>
          </template>
          <template v-slot:right>
            <connect v-if="!connected" />
            <connected v-else="connected" />
            <select-network-menu></select-network-menu>
            <v-btn
              text
              rounded
              elevation="0"
              :min-width="48"
              href="https://github.com/olivercolas/add-tokens"
              target="_blank"
              style="text-decoration: none;"
            >
              <v-icon dense color="black" :size="24">mdi-github</v-icon>
            </v-btn>
          </template>
        </nav-bar>

        <main-body>
          <template v-slot:children>
            <nuxt />
          </template>
        </main-body>

        <global-alerts />
    </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { initWeb3, onWeb3AccountsChanged } from "~/api/web3";

@Component({
  head() {
    // https://i18n.nuxtjs.org/seo
    return this.$nuxtI18nHead({ addSeoAttributes: true })
  },
})
export default class DefaultLayout extends Vue {
    drawer = false;

    onDrawerUpdate(value: boolean) {
      this.drawer = value
    }

    get connected() {
      return this.$store.getters["web3/connected"]
    }

    async mounted() {
      await initWeb3()

      onWeb3AccountsChanged(([account, ...rest]) => {
        if(this.$store.getters["web3/connected"]) {
          this.$store.commit('web3/SET_CURRENT_ACCOUNT', account)
        }
      })
    }
}
</script>

<style>
html {
  overflow: hidden;
}
</style>
