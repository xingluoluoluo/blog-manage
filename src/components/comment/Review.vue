<!--  -->
<template>
  <div class="card review">
    <div class="card__title">
      <span class="card__title-name">评论 {{ count }}</span>
    </div>
    <yk-scrollbar ref="scrollbar" :height="height" style="padding: 0 24px">
      <yk-space dir="vertical">
        <Item
          v-for="item in comments"
          :key="item.id"
          :content="item"
          @delete="deleteReview"
        />
      </yk-space>
    </yk-scrollbar>
    <div class="review__pagination">
      <yk-pagination
        :total="count"
        size="m"
        @change="changePagination"
      ></yk-pagination>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { ref, onMounted, getCurrentInstance } from 'vue';
import Item from './Item.vue'
import { comment } from '../../mock/data'
import { CommentProps } from './review'

// 提示
const proxy: any = getCurrentInstance()?.proxy

const props = withDefaults(defineProps<CommentProps>(), {
  pageSize: 8,
  height: '500px'
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
  // getTotal?: boolean; // 是否获取总数

}
const request: Request = {
  pageSize: props.pageSize,
  currentPage: 1,
  // getTotal: false
}

// 获取数据
const getCommentData = () => {
  let data = comment.data
  count.value = data.total
  comments.value = data.list.slice(
    (request.currentPage - 1) * request.pageSize,
    request.currentPage * request.pageSize
  )
}

// 删除单条评论
const deleteReview = (e: number) => {
  comments.value = comments.value.filter((item: any) => {
    return item.id !== e
  })
  proxy.$message({ type: 'success', message: '删除成功' })
  // getCommentData()
}

// 翻页
const changePagination = (e: number) => {
  request.currentPage = e
  getCommentData()
}

onMounted(() => { getCommentData() })
</script>
<style lang='less' scoped>
.review {
  position: relative;
  padding: @space-xl 0 64px;
  .card__title-name {
    padding: 0 @space-xl;
  }
  &__pagination {
    padding: @space-l @space-xl;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    border-top: 1px solid @line-color-s;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    // background: @bg-color-l;
  }
}
</style>