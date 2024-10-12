<!--  -->
<template>
  <yk-space dir="vertical" class="side-menu" size="m">
    <router-link
      :to="link.path"
      v-for="link in navLinks"
      class="side-menu__bar"
      :key="link.path"
    >
      <yk-space align="center" size="m">
        <component :is="link.icon" />
        <yk-text>{{ link.name }}</yk-text>
      </yk-space>
    </router-link>
  </yk-space>
</template>

<script lang='ts' setup>
import { navLinks } from '../../utils/menu';
</script>
<style lang='less' scoped>
.side-menu {
  // width: 160px;
  padding: @space-l;
  position: fixed;
  top: 72px;
  left: 8px;
  &__bar {
    padding: 0 @space-l;
    width: 160px;
    height: 40px;
    // background-color: @bg-color-l;
    text-decoration: none;
    border-radius: @radius-m;

    display: flex;
    align-items: center;
    .yk-icon {
      color: @font-color-ss;
      width: 16px;
      height: 16px;
    }
    &:hover {
      background-color: @bg-color-l;
      .yk-text {
        font-weight: 600;
      }
    }
  }
  .router-link-active {
    background: linear-gradient(180deg, #2b5aedde 0%, #2b5aed 100%);
    .yk-icon {
      color: @bg-color-l;
    }
    .yk-text {
      color: @bg-color-l;
      font-weight: 600;
    }
  }
}
</style>