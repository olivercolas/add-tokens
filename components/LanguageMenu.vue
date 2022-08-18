<template>
  <drop-down-menu
    :subheader="$t('navbar.translations')"
    :groupModel="localeGroup"
    :items="$i18n.locales"
    @onItemClick="onItemClick"
  >
    <template v-slot:trigger="props">
      <v-btn
        text
        rounded
        v-bind="props.attrs"
        v-on="props.on"
      >
        <v-icon :size="20">mdi-translate</v-icon>
        <chevron-down-icon />
      </v-btn>
    </template>
  </drop-down-menu>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import DropDownMenu from "~/components/DropDownMenu.vue";
import ChevronDownIcon from "~/components/ChevronDownIcon.vue";

@Component({
  components: {ChevronDownIcon, DropDownMenu}
})
export default class LanguageMenu extends Vue {
  localeGroup = this.$i18n.localeCodes.indexOf(this.$i18n.locale)

  onItemClick(locale: any) {
    this.$i18n.setLocale(locale.code)
  }
}
</script>
