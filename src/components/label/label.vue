<!--  -->
<template>
  <div class="label">
    <div class="label_content">
      <yk-title :level="4" style="margin: 0">标签</yk-title>
      <yk-space style="flex: none">
        <yk-popconfirm
          title="新建标签"
          trigger="click"
          placement="bottom"
          @cancel="cancel"
          @confirm="confirm"
        >
          <yk-text type="primary"
            ><IconCirclePlusOutline style="margin-right: 2px" />新建</yk-text
          >
          <template #content>
            <div style="margin: 8px 4px 16px">
              <yk-input
                :limit="6"
                show-counter
                placeholder="请输入"
                style="width: 208px"
                v-model="addLabelName"
              ></yk-input>
            </div>
          </template>
        </yk-popconfirm>
        <yk-text type="primary" @click="showModal"
          ><IconSettingsOutline style="margin-right: 2px" />管理标签</yk-text
        >
      </yk-space>
    </div>

    <yk-space wrap size="s">
      <yk-tag v-for="item in labelData" :key="item.id">
        {{ item.labelName }}
      </yk-tag>
    </yk-space>
  </div>
  <yk-modal v-model="visible" title="管理标签">
    <LabelManage :label="labelData" @deleteLabelE="deleteLabelE" />
    <template #footer>
      <yk-button @click="showModal">确定</yk-button>
    </template>
  </yk-modal>
</template>

<script lang='ts' setup>
import { ref, onMounted, getCurrentInstance } from 'vue'
import { labelMock } from '../../mock/data';
import { LabelData } from '../../utils/interface';
import LabelManage from './labelManage.vue'

const emits = defineEmits(['changeSubset'])

const proxy: any = getCurrentInstance()?.proxy
// 标签数据
const labelData = ref<LabelData[]>([])
// 新建分组名称
const addLabelName = ref<number | string>('')
// 控制弹窗显隐
const visible = ref<boolean>(false)

const cancel = () => {
  addLabelName.value = ''
}
const confirm = () => {
  if (addLabelName.value) {
    let param = {
      id: -2,
      labelName: addLabelName.value,
    }
    labelData.value.push(param)
    addLabelName.value = ''
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
    labelData.value = [...labelMock.data.list]
  }
}
// 删除标签
const deleteLabelE = (e: number | string) => {
  labelData.value = labelData.value.filter((item: { id: number | string }) => {
    return item.id != e
  })
}


onMounted(() => { getLabelData() })
</script>
<style lang='less' scoped>
.label {
  padding: @space-l @space-xl;
  border-radius: @radius-m;
  background-color: @bg-color-l;
  width: 280px;
  flex: none;
  &_content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: @space-l;
  }
  .yk-text {
    cursor: pointer;
  }
  // &_item {
  //   line-height: 32px;
  //   padding: 0 @space-l;
  //   background: @bg-color-ss;
  //   border-radius: @radius-r;
  //   user-select: none;
  //   cursor: pointer;
  //   &_selected {
  //     background: @pcolor-1;
  //     color: @pcolor;
  //     font-weight: 500;
  //   }
  // }
}
</style>