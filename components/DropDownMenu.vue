<template>
  <v-menu
    open-on-hover
    bottom
    rounded
    offset-y
    transition="slide-y-transition"
  >
    <template v-slot:activator="{ on, attrs }">
      <slot name="trigger" :on="on" :attrs="attrs"></slot>
    </template>
    <v-list dense>
      <v-subheader v-if="subheader" class="font-weight-black text-uppercase menu-list-subheader">{{ subheader }}</v-subheader>
      <v-list-item-group v-model="syncGroupModel" active-class="list-item-active orange--text lighten-5">
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          @click="$emit('onItemClick', item)"
          class="text-capitalize"
        >
          <slot name="listitemicon" :item="item"></slot>
          <v-list-item-title class="list-item-title">
            {{ item.name }}
          </v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import {Prop, PropSync} from "vue-property-decorator";

@Component
export default class DropDownMenu extends Vue {
  @PropSync('groupModel', { type: Number }) syncGroupModel!: string

  @Prop(Array) readonly items!: Array<object>
  @Prop(String) readonly subheader!: string
  @Prop({default: false}) readonly showListItemIcon!: boolean
}
</script>

<style>
.v-list-item-group {
  padding: 0 8px !important;
}
.v-list-item {
  min-height: 32px !important;
}
.v-list-item:not(:last-child) {
  margin-bottom: 4px;
}
.v-list-item, .list-item-active::before{
  border-radius: 4px !important;
}
.menu-list-subheader {
  height: auto !important;
  margin: 0 10px 5px !important;
  text-align: left;
  padding: 0 10px 0 0 !important;
}
</style>
