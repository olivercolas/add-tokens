<template>
  <v-app-bar-nav-icon @click.stop="$emit('click:icon')"></v-app-bar-nav-icon>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class NavIcon extends Vue {
}
</script>
