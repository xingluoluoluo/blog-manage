<!--  -->
<template>
  <yk-space dir="vertical" size="xl" class="article">
    <ArtilceItem
      v-for="item in articleList"
      :key="item.id"
      :data="item"
    ></ArtilceItem>
  </yk-space>
</template>

<script lang='ts' setup>
import ArtilceItem from './artilceItem.vue';
import { articleMock } from '../../mock/data'
import { ArticleData } from '../../utils/interface'
import { ref, onMounted } from 'vue';

const props = defineProps({
  pageSize: {
    type: Number,
    default: 4
  },
  subsetId: { // 所属分组
    type: Number,
    default: -1
  },
  searchTerm: { // 搜索关键词
    type: String,
    default: ''
  },
  publishStatus: {
    type: Number,
    default: 0
  },
  getTotal: {
    type: Boolean,
    default: true
  }
})
// 文章数据
const articleList = ref<ArticleData[]>([])
// 文章总数
const count = ref<number>(0)

// 请求
type Request = {
  token?: string,
  pageSize: number; // 单页条数
  currentPage: number; // 当前页
  publishStatus?: number;// 发布状态
  subsetId?: number;// 分组
  searchTerm?: string;// 搜索关键词
  getTotal?: boolean; // 是否获取总数


}
const request: Request = {
  pageSize: props.pageSize,
  currentPage: 1,
  publishStatus: props.publishStatus,
  subsetId: props.subsetId,
  searchTerm: props.searchTerm,
  getTotal: props.getTotal
}
// 获取数据
const getArticleList = (getTotal: boolean) => {
  let data = articleMock.data
  if (getTotal) count.value = data.total
  articleList.value = data.list.slice(
    (request.currentPage - 1) * request.pageSize,
    request.currentPage * request.pageSize
  )
}

onMounted(() => { getArticleList(true) })
</script>
<style lang='less' scoped>
.article {
}
</style>