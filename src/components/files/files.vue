<!--  -->
<template>
  <div class="files">
    <div class="files_bar">
      <yk-space>
        <yk-checkbox
          :checked="checkedAll"
          :indeterminate="indeterminate"
          @change="handleChangeAll"
          >全选</yk-checkbox
        >
        <yk-text>已选择 3 项内容</yk-text>
        <yk-text type="primary" style="cursor: pointer">取消选择</yk-text>
      </yk-space>
      <yk-space>
        <IconDeleteOutline class="files_bar_delete" />
        <IconSwitchOutline class="files_bar_switch" />
      </yk-space>
    </div>
    <div class="files_main">
      <FileItem v-for="item in files" :key="item.id" :data="item" />
    </div>
    <div class="files_pagination">
      <yk-pagination
        :total="count"
        size="m"
        @change="changePagination"
      ></yk-pagination>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { ref, onMounted, getCurrentInstance } from 'vue'
import { file } from '../../mock/data'
import FileItem from './fileItem.vue'
// 多选框控制
// 是否半选
const indeterminate = ref(false)
// 是否全选
const checkedAll = ref(false)
// 提示
const proxy: any = getCurrentInstance()?.proxy
// 总数
const count = ref<number>(0)

// 数据内容
const files = ref()

// 
type FileProps = {
  pageSize: number;
  subsetId: number | string;
}
const props = withDefaults(defineProps<FileProps>(), {
  pageSize: 10,
  subsetId: -1
})
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
const getFileData = (getTotal: boolean) => {
  let data = file.data
  if (getTotal) count.value = data.total
  files.value = data.list.slice(
    (request.currentPage - 1) * request.pageSize,
    request.currentPage * request.pageSize
  )
  // 加入是否选择
  files.value.forEach((i: { selected: boolean }) => {
    i.selected = false
  })
}

// 删除单条评论
const deleteReview = (e: number) => {
  files.value = files.value.filter((item: any) => {
    return item.id !== e
  })
  proxy.$message({ type: 'success', message: '删除成功' })
  // getCommentData()
}

// 翻页
const changePagination = (e: number) => {
  request.currentPage = e
  getFileData(false)
}

const handleChangeAll = () => { }

onMounted(() => { getFileData(true) })

</script>
<style lang='less' scoped>
.files {
  padding: @space-xl;
  border-radius: @radius-m;
  background-color: @bg-color-l;
  width: 100%;
  &_bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: @space-l;
    border-radius: @radius-m;
    background: @bg-color-m;
    &_delete,
    &_switch {
      width: 20px;
      height: 20px;
      color: @font-color-s;
      cursor: pointer;
      &:hover {
        color: @font-color-l;
      }
    }
    &-switch {
      cursor: pointer;
    }
  }
  &_main {
    padding: @space-xl 0 32px;

    display: grid;
    grid-template-columns: repeat(auto-fill, 200px);
    row-gap: 32px;
    column-gap: 24px;
    justify-content: center;
  }
  &_pagination {
    padding: @space-l 0 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
  }
}
</style>