<!--  -->
<template>
  <yk-space dir="vertical" width="100%" size="l" class="article-view">
    <TopTitle name="博客文章" style="margin-bottom: 8px"></TopTitle>
    <Subset />
    <yk-space style="width: 100%">
      <div style="width: 100%">
        <Article style="width: 100%" />
      </div>
      <Label />
    </yk-space>
  </yk-space>
</template>

<script lang='ts' setup>
import TopTitle from '../../components/frame/TopTitle.vue';
import Subset from '../../components/subset/subset.vue'
import Label from '../../components/label/label.vue'
import Article from '../../components/article/article.vue'
</script>
<style lang='less' scoped>
</style>