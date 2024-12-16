<!--  -->
<template>
  <yk-space dir="vertical" width="100%" size="l" class="gallery-view">
    <TopTitle name="摄影图库" style="margin-bottom: 8px"></TopTitle>
    <Subset />
    <Gallery style="width: 100%" />
  </yk-space>
</template>

<script lang='ts' setup>
import TopTitle from '../../components/frame/TopTitle.vue';
import Subset from '../../components/subset/subset.vue'
import Gallery from '../../components/gallery/gallery.vue'
</script>
<style lang='less' scoped>
</style>