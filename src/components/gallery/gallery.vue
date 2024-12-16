<!--  -->
<template>
  <yk-space dir="vertical" size="xl" class="gallery">
    <GalleryItem
      v-for="item in articleList"
      :key="item.id"
      :data="item"
      @delete-item="deleteArticle"
      @change-status="changeArticleItem"
    ></GalleryItem>
    <div class="article_pagination">
      <yk-pagination
        :total="count"
        size="m"
        @change="changePagination"
      ></yk-pagination>
    </div>
  </yk-space>
</template>

<script lang='ts' setup>
import GalleryItem from './galleryItem.vue';
import { galleryMock } from '../../mock/data'
import { ArticleData } from '../../utils/interface'
import { ref, onMounted, getCurrentInstance } from 'vue';
const proxy: any = getCurrentInstance()?.proxy
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
  let data = galleryMock.data
  if (getTotal) count.value = data.total
  articleList.value = data.list.slice(
    (request.currentPage - 1) * request.pageSize,
    request.currentPage * request.pageSize
  )
}
const deleteArticle = (e: number) => {
  articleList.value = articleList.value.filter((item: { id: number }) => {
    return item.id !== e
  })
  proxy.$message({ type: 'success', message: '删除成功' })
}
const changeArticleItem = (e: { id: number, publishStatus: number }) => {
  articleList.value.filter((item: { id: number, publishStatus: number }) => {
    if (item.id === e.id) {
      item.publishStatus = e.publishStatus === 0 ? 1 : 0
      proxy.$message.success(e.publishStatus === 0 ? '发布成功!' : '撤回成功！')
    }
  })
}
// 翻页
const changePagination = (e: number) => {
  request.currentPage = e
  getArticleList(false)
}
onMounted(() => { getArticleList(true) })
</script>
<style lang='less' scoped>
.gallery {
  &_pagination {
    padding: @space-s 0 @space-xl;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
  }
}
</style>