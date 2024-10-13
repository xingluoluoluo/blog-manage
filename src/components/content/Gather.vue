<!--  -->
<template>
  <yk-space class="gather">
    <div
      v-for="(item, index) in gathers"
      :key="index"
      class="gather_list"
      :style="{ background: 'linear-gradient(' + item.bgColor + ')' }"
    >
      <yk-space dir="vertical" size="s">
        <yk-text type="secondary">{{ item.name }}</yk-text>
        <yk-title :level="2" style="margin: 0">{{ item.total }}</yk-title>
      </yk-space>
      <yk-button v-if="index > 0" shape="square" type="secondary" size="xl">
        <IconPlusOutline
      /></yk-button>
    </div>
  </yk-space>
</template>

<script lang='ts' setup>
import { ref, onMounted } from 'vue';
import { overInfo } from '../../utils/menu';
import { overview } from '../../mock/data';


const gathers = ref(overInfo)
// 获取数据
const getGatherData = () => {
  if (overview.code == 200) {
    let data = overview.data
    gathers.value[0].total = data.fileNum
    gathers.value[1].total = data.acticleNum
    gathers.value[2].total = data.imagesNum
    gathers.value[3].total = data.diaryNum
  }
}
onMounted(() => {
  getGatherData()
})

</script>
<style lang='less' scoped>
.gather {
  width: 100%;
  &_list {
    width: 25%;
    background: #eee;
    display: flex;
    justify-content: space-between;
    padding: @space-xl;
    border-radius: @radius-m;
    align-items: center;
    &:first-child {
      .yk-title,
      .yk-text {
        color: @white;
      }
    }
  }
}
</style>