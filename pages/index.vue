<template>
  <v-card elevation="0" height="100%" class="content-container">
    <v-card-title class="filter-container">
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        :label="$t('pages.home.table.search')"
        single-line
        hide-details
        filled
        rounded
        dense
      ></v-text-field>
    </v-card-title>
    <data-table :search="search"></data-table>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import DropDownMenu from "~/components/DropDownMenu.vue";

@Component({
  components: {DropDownMenu}
})
export default class index extends Vue {
  search = ''
}
</script>

<style>
.filter-container {
  height: 100%;
  grid-area: filter;
}
.content-container {
  height: calc(100vh - 64px);
  width: 100%;
  display: grid;
  grid-template-areas:
    "filter"
    "body"
    "pagination"
  ;
  grid-template-rows: 90px calc(100% - 90px);
}
</style>
