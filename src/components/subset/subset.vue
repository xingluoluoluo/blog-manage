<!--  -->
<template>
  <div class="subset">
    <yk-space wrap>
      <div
        class="subset_item"
        :class="{ subset_item_selected: selectedFlag === '-1all' }"
        @click="changeSelectState(-1, 'all')"
      >
        全部 {{ subsetStore.total }}
      </div>
      <div
        class="subset_item"
        v-for="item in articleStauts.data"
        :key="item.id"
        @click="changeSelectState(item.id, 'state')"
        :class="{
          subset_item_selected: selectedFlag === item.id + 'state',
        }"
      >
        {{ item.publishStatus == '1' ? '已发布' : '未发布' }} {{ item.count }}
      </div>
      <div
        class="subset_item"
        @click="changeSelectState(subsetStore.excludeDivded.id, 'exclude')"
        :class="{
          subset_item_selected:
            selectedFlag === subsetStore.excludeDivded.id + 'exclude',
        }"
      >
        {{ subsetStore.excludeDivded.subsetName }}
        {{ subsetStore.excludeDivded.count }}
      </div>
      <div
        class="subset_item"
        v-for="item in subsetStore.data"
        @click="changeSelectState(item.id, 'subset')"
        :class="{
          subset_item_selected: selectedFlag === item.id + 'subset',
        }"
        :key="item.id"
      >
        {{ item.subsetName }} {{ item.count }}
      </div>
    </yk-space>
    <yk-space style="flex: none">
      <yk-popconfirm
        title="请输入分组名称"
        trigger="click"
        placement="bottom"
        @cancel="cancel"
        @confirm="confirm"
      >
        <yk-text type="primary"
          ><IconCirclePlusOutline style="margin-right: 2px" /> 新建</yk-text
        >
        <template #content>
          <div style="margin: 8px 4px 16px">
            <yk-input
              :limit="6"
              show-counter
              placeholder="请输入"
              style="width: 208px"
              v-model="addSubsetName"
            ></yk-input>
          </div>
        </template>
      </yk-popconfirm>
      <yk-text type="primary" @click="showModal"
        ><IconSettingsOutline style="margin-right: 2px" /> 管理分组</yk-text
      >
    </yk-space>
    <yk-modal v-model="visible" title="文章分类管理">
      <SubsetManage />
      <template #footer>
        <yk-button @click="showModal">确定</yk-button>
      </template>
    </yk-modal>
  </div>
</template>

<script lang='ts' setup>
import { ref, onMounted, getCurrentInstance } from 'vue'
import { subset, articleStauts } from '../../mock/data';
import { SubsetData } from '../../utils/interface';
import { useSubsetStore } from '../../store/subset'
import SubsetManage from './subsetManage.vue'

const emits = defineEmits(['changeSubset'])

const proxy: any = getCurrentInstance()?.proxy
// store
const subsetStore = useSubsetStore()
// 分组选择
const selectedFlag = ref<string>('-1all')
// 新建分组名称
const addSubsetName = ref<number | string>('')
// 控制弹窗显隐
const visible = ref<boolean>(false)

// 分组选择切换
const changeSelectState = (id: number | string, flag: string) => {
  if (selectedFlag.value != id + flag) {
    selectedFlag.value = ''
    selectedFlag.value = id + flag
    // emit通知父组件
    emits('changeSubset', { id, flag })
  }
}
const cancel = () => {
  addSubsetName.value = ''
}
const confirm = () => {
  if (addSubsetName.value) {
    let param = {
      id: -2,
      subsetName: addSubsetName.value,
      count: 0
    }
    subsetStore.data.push(param)
    addSubsetName.value = ''
    proxy.$message({ type: 'primary', message: '新建成功' })
  } else {
    proxy.$message({ type: 'warning', message: '操作失败' })
  }
}
// 展示管理分组弹窗
const showModal = () => {
  visible.value = !visible.value
}

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
  display: flex;
  justify-content: space-between;
  align-items: center;
  .yk-text {
    cursor: pointer;
  }
  &_item {
    line-height: 32px;
    padding: 0 @space-l;
    background: @bg-color-ss;
    border-radius: @radius-r;
    user-select: none;
    cursor: pointer;
    &_selected {
      background: @pcolor-1;
      color: @pcolor;
      font-weight: 500;
    }
  }
}
</style>