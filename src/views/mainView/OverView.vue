<!--  -->
<template>
  <yk-space dir="vertical" size="xl">
    <TopTitle :is-search="false">
      <!-- <template #custom>
      <yk-button>111</yk-button>
    </template> -->
    </TopTitle>
    <Gather />
    <yk-space style="width: 100%">
      <DataChart />
      <div style="background-color: aqua; height: 200px">评论</div>
    </yk-space>
  </yk-space>
</template>

<script lang='ts' setup>
import TopTitle from '../../components/frame/TopTitle.vue';
import Gather from '../../components/content/Gather.vue'
import DataChart from '../../components/content/DataChart.vue';
</script>
<style lang='less' scoped>
</style>