<template>
  <v-snackbar
    v-model="snackbar"
    bottom
    :absolute="true"
    :tile="tile"
    :timeout="3000"
    :text="text"
    :color="color"
  >
    {{ message }}

    <template v-slot:action="{ attrs }">
      <v-btn
        v-if="showButton"
        text
        v-bind="attrs"
        @click="closeAlert"
      >
        {{ $t('toast.close') }}
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class GlobalAlerts extends Vue {
  get snackbar () {
    return this.$store.getters["toast/show"]
  }
  set snackbar (value) {
    this.closeAlert()
  }

  get tile () {
    return this.$store.getters["toast/tile"]
  }

  get text () {
    return this.$store.getters["toast/text"]
  }

  get message() {
    return this.$store.getters["toast/message"]
  }

  get color() {
    return this.$store.getters["toast/color"]
  }

  get showButton() {
    return this.$store.getters["toast/showButton"]
  }

  closeAlert() {
    this.$store.commit('toast/CLOSE_ALERT')
  }
}
</script>
