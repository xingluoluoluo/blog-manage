<!--  -->
<template>
  <div class="subset">
    <yk-space>
      <div class="subset_item">全部 {{ subsetStore.total }}</div>
      <div
        class="subset_item"
        v-for="item in articleStauts.data"
        :key="item.id"
      >
        {{ item.publishStatus == '1' ? '已发布' : '未发布' }} {{ item.count }}
      </div>
      <div class="subset_item" v-for="item in subsetStore.data" :key="item.id">
        {{ item.subsetName }} {{ item.count }}
      </div>
    </yk-space>
  </div>
</template>

<script lang='ts' setup>
import { subset, articleStauts } from '../../mock/data';
import { SubsetData } from '../../utils/interface';
import { useSubsetStore } from '../../store/subset'
import { onMounted } from 'vue';

// store
const subsetStore = useSubsetStore()

// 获取分组数据
const getSubsetData = () => {

  if (subset.code === 200) {
    subsetStore.data = subset.data.list
    subsetStore.total = subset.data.total

  }

}


onMounted(() => { getSubsetData() })
</script>
<style lang='less' scoped>
.subset {
  padding: @space-l @space-xl;
  border-radius: @radius-m;
  background-color: @bg-color-l;
  width: 100%;
}
</style>