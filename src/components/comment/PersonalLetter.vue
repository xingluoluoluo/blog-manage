<!--  -->
<template>
  <yk-drawer
    placement="right"
    :show="isShow"
    :title="'私信' + count"
    @close="closeDrawer"
  >
    <yk-space dir="vertical">
      <Item
        v-for="item in comments"
        :key="item.id"
        :content="item"
        :isReview="false"
        @delete="deleteReview"
      />
    </yk-space>
    <template #footer>
      <yk-pagination
        :total="count"
        @change="changePagination"
        simple
      ></yk-pagination>
    </template>
  </yk-drawer>
</template>

<script lang='ts' setup>
import { toRefs } from 'vue'
import { PersonalLetterProps } from './review'
import { ref, onMounted, getCurrentInstance } from 'vue';
import { comment } from '../../mock/data'
// 提示
const proxy: any = getCurrentInstance()?.proxy


const emits = defineEmits(['close'])
const props = withDefaults(defineProps<PersonalLetterProps>(), {
  isShow: false,
  pageSize: 8
})
const { isShow } = toRefs(props)

const closeDrawer = () => {
  emits('close')
}


// 总数
const count = ref<number>(123)

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
</style>