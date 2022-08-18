<template>
  <v-main>
    <v-container fluid class="main-container">
      <slot name="children"></slot>
    </v-container>
  </v-main>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class MainBody extends Vue {
}
</script>

<style>
.main-container{
  padding: 0 36px;
  height: calc(100vh - 64px);
}
</style>
