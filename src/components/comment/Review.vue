<!--  -->
<template>
  <div class="card review">
    <div class="card__title">
      <span class="card__title-name">评论 {{ count }}</span>
    </div>
    <Item v-for="item in comments" :key="item.id" :content="item" />
  </div>
</template>

<script lang='ts' setup>
import { ref, onMounted } from 'vue';
import Item from './Item.vue'
import { comment } from '../../mock/data'
import { CommentProps } from './review'

const props = withDefaults(defineProps<CommentProps>(), {
  pageSize: 4
})

// 总数
const count = ref<number>(0)

// 数据内容
const comments = ref()

// 请求
type Request = {
  token?: string,
  pageSize: number; // 单页条数
  currentPage: number; // 当前页
  getTotal?: boolean; // 是否获取总数

}
const request: Request = {
  pageSize: props.pageSize,
  currentPage: 1,
  getTotal: false
}

// 获取数据
const getCommentData = (e: boolean) => {
  let data = comment.data
  if (e) {
    count.value = data.total
  }
  comments.value = data.list.slice(
    (request.currentPage - 1) * request.pageSize,
    request.currentPage * request.pageSize
  )
}

onMounted(() => { getCommentData(true) })
</script>
<style lang='less' scoped>
</style>