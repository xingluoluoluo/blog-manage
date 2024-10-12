<!--  -->
<template>
  <div class="index-view">
    <SideMenu />
    <router-view></router-view>
  </div>
</template>

<script lang='ts' setup>
import SideMenu from '../../components/frame/SideMenu.vue';
</script>
<style lang='less' scoped>
.index-view {
  padding: 32px 32px 32px 232px;
}
</style>