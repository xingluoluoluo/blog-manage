<!--  -->
<template>
  <div class="top-title">
    <yk-title :level="3" style="margin: 0">{{ props.name }}</yk-title>
    <slot name="custom" />
    <yk-space v-if="props.isSearch">
      <yk-button type="secondary" @click="cancelSearch" v-show="searchContent"
        >取消搜索</yk-button
      >
      <yk-input-search
        style="width: 320px"
        placeholder="请输入..."
        v-model="searchContent"
        @search="search"
      >
        <!-- <template #prefix>
          <IconSearchOutline />
        </template> -->
        <template #suffix>
          <yk-button type="secondary"><IconSearchOutline /></yk-button>
        </template>
      </yk-input-search>
    </yk-space>
  </div>
</template>

<script lang='ts' setup>
import { ref } from 'vue'

const searchContent = ref()
type titleProps = {
  name: string,
  isSearch: boolean
}
const props = withDefaults(defineProps<titleProps>(), {
  name: '总览',
  isSearch: true
})

//search事件
const search = () => {
  emit('search', searchContent.value)
}

const cancelSearch = () => {
  emit('search', '')
  searchContent.value = ''
}

const emit = defineEmits(['search'])
</script>
<style lang='less' scoped>
.top-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>