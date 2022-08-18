<template>
  <v-img
    :height="height"
    :width="width"
    :margin="margin"
    class="add-avatar"
    src="/metamask.svg"
  ></v-img>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import {Prop} from "vue-property-decorator";

@Component
export default class MetamaskIcon extends Vue {
    @Prop({default: 16}) readonly height: number | undefined
    @Prop({default: 16}) readonly width: number | undefined
    @Prop(String) readonly margin: string | undefined
}
</script>

<style>
.add-avatar {
  margin-left: 5px;
  height: 16px;
  width: 16px;
}
</style>
