<template>
  <v-navigation-drawer app v-model="syncedDrawer" absolute bottom temporary>
    <v-sheet color="grey lighten-3" elevation="0" height="100" width="100%">
      <v-container fill-height height="100%">
        <v-row justify="center" align="center">
          <v-avatar color="purple" size="56">
            <span class="white--text">JD</span>
          </v-avatar>
        </v-row>
      </v-container>
    </v-sheet>
    <v-list nav dense>
      <v-list-item-group v-model="linksGroup" active-class="deep-purple--text text--accent-4">
        <v-list-item
          v-for="({ text, route }, index) in links"
          :key="index"
          :to="localePath(route, $i18n.locale)"
          nuxt
          exact
          class="list-item"
        >
          <v-list-item-title>{{ text }}</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import {Prop, PropSync, Watch} from "vue-property-decorator";

@Component
export default class NavigationDrawer extends Vue {
  @PropSync('drawer', {type: Boolean}) syncedDrawer!: boolean

  linksGroup = null;

  get links () {
    return [
      {
        text: this.$t('nav.home'),
        route: 'index'
      },
      {
        text: this.$t('nav.about'),
        route: 'about',
      },
    ]
  }

  @Watch('linksGroup')
  onGroupChanged() {
    this.$emit('update:drawer', false)
  }
}
</script>
