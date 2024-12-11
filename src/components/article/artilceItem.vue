<!--  -->
<template>
  <div class="article-item">
    <yk-space>
      <div class="article-item_cover">
        <yk-image
          fit="cover"
          width="160"
          height="120"
          :src="url"
          :isLazy="true"
          :preview="false"
        ></yk-image>
      </div>
    </yk-space>
  </div>
</template>

<script lang='ts' setup>
import { computed } from 'vue';
import { ArticleData } from '../../utils/interface'

type ArticleItemProps = {
  data?: ArticleData
}
const props = withDefaults(defineProps<ArticleItemProps>(), {})

// 封面路径
const url = computed(() => {
  return `src/assets/images/${props.data?.coverUrl}`
})
</script>
<style lang='less' scoped>
.article-item {
  width: 100%;
  border-radius: @radius-m;
  background: @bg-color-l;
  padding: @space-xl;
}
</style>