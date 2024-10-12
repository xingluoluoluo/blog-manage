<!--  -->
<template>
  <div class="header-bar">
    <yk-space align="center" @click="backHome" size="m" style="cursor: pointer">
      <img class="pro-logo" src="../../assets/pro-logo.png" />
      <span class="pro-name">zll博客后台</span>
    </yk-space>
    <yk-space align="center" size="xl">
      <yk-badge is-dot>
        <IconMailOutline style="font-size: 20px" />
      </yk-badge>
      <yk-avatar
        img-url="https://www.huohuo90.com:3003/user/6353b034dd4b583975e77fbe.png"
      ></yk-avatar>
      <div><yk-theme /></div>
      <yk-button>退出</yk-button>
    </yk-space>
  </div>
</template>

<script lang='ts' setup>
import { useRouter } from 'vue-router';

const router = useRouter()

const backHome = () => {
  router.push('/')
}

</script>
<style lang='less' scoped>
.header-bar {
  width: 100%;
  height: 64px;
  position: fixed;
  top: 0;
  left: 0;
  background-color: @bg-color-l;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 @space-xl;
  .pro-logo {
    height: 24px;
    width: 38px;
  }
  .pro-name {
    font-size: 20px;
    font-weight: 600;
  }
}
</style>