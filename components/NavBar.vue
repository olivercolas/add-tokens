<template>
  <v-app-bar color="white" app elevation="0" class="header">
    <slot name="menu-icon"></slot>
    <slot name="title"></slot>
    <v-spacer></v-spacer>
    <slot name="right"></slot>
    <language-menu></language-menu>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import DonateMenu from "~/components/DonateMenu.vue";
@Component({
  components: {DonateMenu}
})
export default class NavBar extends Vue {
}
</script>

<style>
.header .v-toolbar__content {
  padding: 0 36px;
}
.header__title {
  font-size: 18px;
}
</style>
