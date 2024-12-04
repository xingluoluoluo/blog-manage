<!--  -->
<template>
  <yk-space dir="vertical" size="xl" class="local-file">
    <TopTitle name="本地文件" :is-search="false">
      <template #custom>
        <yk-space align="center">
          <yk-text type="third">图片、视频、音频大小不超过120M</yk-text>
          <yk-button>上传</yk-button>
        </yk-space>
      </template>
    </TopTitle>
    <Subset />
    <Files />
  </yk-space>
</template>

<script lang='ts' setup>
import TopTitle from '../../components/frame/TopTitle.vue';
import Subset from '../../components/subset/subset.vue'
import Files from '../../components/files/files.vue';
</script>
<style lang='less' scoped>
</style>