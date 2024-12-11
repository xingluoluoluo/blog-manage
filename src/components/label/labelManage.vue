<!--  -->
<template>
  <div class="label-manage">
    <yk-table>
      <yk-table-column property="index" label="序号"></yk-table-column>
      <yk-table-column property="labelName" label="标签名称"></yk-table-column>
      <yk-table-column property="createTime" label="创建时间"></yk-table-column>
      <yk-table-column
        property="manage"
        label="操作"
        align="right"
      ></yk-table-column>
      <template #tbody>
        <tr
          v-for="(item, index) in labelData"
          :key="index"
          class="yk-table__row"
        >
          <td class="yk-table__cell">
            {{ index + 1 }}
          </td>
          <td class="yk-table__cell">
            {{ item.labelName }}
          </td>

          <td class="yk-table__cell">
            {{ item.createTime }}
          </td>
          <td class="yk-table__cell text-right">
            <yk-text
              type="primary"
              style="cursor: pointer"
              @click="deleteLabel(item.id)"
              >删除</yk-text
            >
          </td>
        </tr>
      </template>
    </yk-table>
  </div>
</template>

<script lang='ts' setup>
import { ref, getCurrentInstance, watch } from 'vue';
import { LabelData } from '../../utils/interface';

const emits = defineEmits(['deleteLabelE'])
// 定义props 
type labelProps = {
  label: LabelData[]
}
const props = withDefaults(defineProps<labelProps>(), {})

// 当前标签
const labelData = ref<LabelData[]>([])

const proxy: any = getCurrentInstance()?.proxy

// 删除标签
const deleteLabel = (e: number | string) => {
  labelData.value = labelData.value.filter((item: { id: number | string }) => {
    return item.id != e
  })
  emits('deleteLabelE', e)
  proxy.$message({ type: 'primary', message: '删除成功' })
}

watch(
  () => props.label,
  (e) => {
    labelData.value = [...e]
  },
  { immediate: true }
)
</script>
<style lang='less' scoped>
</style>