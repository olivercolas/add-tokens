<template>
  <v-menu
    bottom
    rounded
    offset-y
    transition="slide-y-transition"
    :open-on-click="true"
    :close-on-content-click="false"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        rounded
        v-bind="attrs"
        v-on="on"
        class="text-capitalize mr-2"
        elevation="0"
      >
        {{ $t('navbar.donate') }}
        <v-icon>mdi-hands-pray</v-icon>
      </v-btn>
    </template>
    <v-card class="pa-2">
      <v-row class="pa-2">
        <v-btn
          class="d-block"
          tile
          color="orange lighten-5"
          elevation="0"
        >
          Donate
        </v-btn>
      </v-row>
    </v-card>
  </v-menu>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class DonateMenu extends Vue {
}
</script>

<style>
</style>
