<!--  -->
<template>
  <div class="label">
    <yk-space wrap>
      <div
        class="label_item"
        v-for="item in labelData"
        @click="changeSelectState(item.id, 'label')"
        :class="{
          subset_item_selected: selectedFlag === item.id + 'label',
        }"
        :key="item.id"
      >
        {{ item.labelName }}
      </div>
    </yk-space>
    <yk-space style="flex: none">
      <yk-popconfirm
        title="请输入标签名称"
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
    <yk-modal v-model="visible" title="标签管理">
      <!-- <LabelManage /> -->
      <template #footer>
        <yk-button @click="showModal">确定</yk-button>
      </template>
    </yk-modal>
  </div>
</template>

<script lang='ts' setup>
import { ref, onMounted, getCurrentInstance } from 'vue'
import { labelMock, articleStauts } from '../../mock/data';
import { LabelData } from '../../utils/interface';
import LabelManage from './labelManage.vue'

const emits = defineEmits(['changeSubset'])

const proxy: any = getCurrentInstance()?.proxy
// 标签选择
const selectedFlag = ref<string>('-1all')
// 标签数据
const labelData = ref<LabelData[]>()
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

// 获取标签数据
const getLabelData = () => {
  if (labelMock.code === 200) {
    labelData.value = labelMock.data.list
    // labelData.total = labelMock.data.total
  }
}


onMounted(() => { getLabelData() })
</script>
<style lang='less' scoped>
.label {
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