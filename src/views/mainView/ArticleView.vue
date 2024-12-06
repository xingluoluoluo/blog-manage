<!--  -->
<template>
  <yk-space dir="vertical" width="100%" size="l" class="article-view">
    <TopTitle name="博客文章" style="margin-bottom: 8px"></TopTitle>
    <Subset />
    <yk-space style="width: 100%">
      <div style="background-color: #eee; height: 20px; width: 100%">aaa</div>
      <div style="background-color: #999; width: 280px"><Label /></div>
    </yk-space>
  </yk-space>
</template>

<script lang='ts' setup>
import TopTitle from '../../components/frame/TopTitle.vue';
import Subset from '../../components/subset/subset.vue'

import Label from '../../components/label/label.vue'
</script>
<style lang='less' scoped>
</style>