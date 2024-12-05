<!--  -->
<template>
  <div class="files">
    <div class="files_bar" v-show="selectedIdArr.length > 0">
      <yk-space>
        <yk-checkbox
          :checked="checkedAll"
          :indeterminate="indeterminate"
          @change="handleChangeAll"
          >全选</yk-checkbox
        >
        <yk-text>已选择 {{ selectedIdArr.length }} 项内容</yk-text>
        <yk-text type="primary" style="cursor: pointer" @click="cancelCheck"
          >取消选择</yk-text
        >
      </yk-space>
      <yk-space>
        <IconDeleteOutline class="files_bar_delete" @click="deleteFiles" />
        <yk-popconfirm
          title="请选择分组"
          trigger="click"
          placement="bottomRight"
          @cancel="cancel"
          @confirm="confirm"
        >
          <IconSwitchOutline class="files_bar_switch" />
          <template #content>
            <yk-scrollbar
              ref="scrollbar"
              height="148px"
              class="files_scrollbar"
            >
              <div
                class="files_scrollbar_item"
                v-for="item in subsetStore.data"
                :key="item.id"
                :class="{ 'sub-selected': subsetSelectId === item.id }"
                @click="changeSubset(item.id)"
              >
                {{ item.subsetName }} {{ item.count }}
              </div>
            </yk-scrollbar>
          </template>
        </yk-popconfirm>
      </yk-space>
    </div>
    <div class="files_main">
      <FileItem
        v-for="item in files"
        :key="item.id"
        :data="item"
        @changeSubsetId="changeSubsetId"
        @deleteFile="deleteFile"
        @selectFile="selectFile"
      />
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
import { useSubsetStore } from '../../store/subset'
import './files.less'
import Item from '../comment/Item.vue'
import { number } from 'echarts/core'
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
// store
const subsetStore = useSubsetStore()
//分类选择
let subsetSelectId = ref<number | string>('')
// 选择数组
const selectedIdArr = ref<number[]>([])
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
// 切换分组
const changeSubset = (id: number | string) => {
  subsetSelectId.value = id
}
// 翻页
const changePagination = (e: number) => {
  request.currentPage = e
  getFileData(false)
}

// 全选点击
const handleChangeAll = (value: boolean) => {
  indeterminate.value = false
  selectedIdArr.value = []
  if (value) {
    files.value.forEach((item: { id: number, selected: boolean }) => {
      item.selected = true
      selectedIdArr.value.push(item.id)
    })
    checkedAll.value = true

  } else {
    checkedAll.value = false
    files.value.forEach((item: { id: number, selected: boolean }) => {
      item.selected = false
    })
  }
}
// 取消选择
const cancelCheck = () => {
  selectedIdArr.value = []
  files.value.forEach((item: { id: number, selected: boolean }) => {
    item.selected = false
  })
}
function cancel() {
  proxy.$message({ type: 'warning', message: '你点击了取消按钮' })
}
function confirm() {
  proxy.$message({ type: 'primary', message: '你点击了确认按钮' })
}
// 删除选中
const deleteFiles = () => {
  selectedIdArr.value.forEach((i: number) => {
    files.value = files.value.filter((item: any) => {
      return item.id !== i
    })
  })
  selectedIdArr.value = []
  proxy.$message({ type: 'success', message: '删除成功' })
}
// 更改单个分组
const changeSubsetId = (parm: { id: number, subsetId: number }) => {
  console.log(parm);

}
// 删除单个文件
const deleteFile = (e: number) => {
  files.value = files.value.filter((item: { id: number }) => {
    return item.id != e
  })
  proxy.$message({ type: 'success', message: '删除成功' })
}
// 选中单个
const selectFile = (e: number) => {
  let tarFileIndex = files.value.findIndex((item: { id: number }) => item.id === e)
  if (tarFileIndex != -1) files.value[tarFileIndex].selected = !files.value[tarFileIndex].selected
  if (files.value[tarFileIndex].selected) {
    selectedIdArr.value.push(e)
  } else {
    selectedIdArr.value = selectedIdArr.value.filter((item: number) => {
      return item != e
    })
  }
  if (selectedIdArr.value.length == 0) {
    checkedAll.value = false
    indeterminate.value = false
  } else if (selectedIdArr.value.length === files.value.length) {
    checkedAll.value = true
    indeterminate.value = false
  } else {
    checkedAll.value = false
    indeterminate.value = true
  }

}
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
    padding: 24px 0 32px;
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