<template>
  <div v-else class="d-flex align-items justify-center content-container">
    <v-progress-circular indeterminate></v-progress-circular>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class LoadingSpinner extends Vue {
}
</script>
