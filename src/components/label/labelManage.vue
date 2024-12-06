<!--  -->
<template>
  <div class="label-manage">
    <yk-table>
      <yk-table-column property="index" label="序号"></yk-table-column>
      <yk-table-column property="subsetName" label="分组名称"></yk-table-column>
      <yk-table-column property="count" label="关联文章数"></yk-table-column>
      <yk-table-column property="createTime" label="创建时间"></yk-table-column>
      <yk-table-column
        property="manage"
        label="操作"
        align="right"
      ></yk-table-column>
      <template #tbody>
        <tr
          v-for="(item, index) in subsetStore.data"
          :key="index"
          class="yk-table__row"
        >
          <td class="yk-table__cell">
            {{ index + 1 }}
          </td>
          <td class="yk-table__cell">
            <yk-input
              v-model="item.subsetName"
              @focus="focusName(item.id)"
              @blur="blurName(item.id)"
            />
          </td>

          <td class="yk-table__cell">
            {{ item.count }}
          </td>
          <td class="yk-table__cell">
            {{ item.createTime }}
          </td>
          <td class="yk-table__cell text-right">
            <yk-text
              type="primary"
              style="cursor: pointer"
              @click="deleteSubset(item.id)"
              >删除</yk-text
            >
          </td>
        </tr>
      </template>
    </yk-table>
  </div>
</template>

<script lang='ts' setup>
import { ref, getCurrentInstance } from 'vue';
import { useSubsetStore } from '../../store/label'
// store
const subsetStore = useSubsetStore()

const proxy: any = getCurrentInstance()?.proxy

let currentName = ref<string | number>('')
// 名称聚焦
const focusName = (id: number | string) => {
  let result = subsetStore.data.find((item: { id: number | string }) => item.id === id)
  if (result) currentName = result.subsetName

}
// 名称blur
const blurName = (id: number | string) => {
  let result = subsetStore.data.find((item: { id: number | string }) => item.id === id)
  if (result && currentName != result.subsetName) {
    // 执行提交操作
    proxy.$message({ type: 'primary', message: '修改成功' })
  }
}
// 删除分组
const deleteSubset = (id: number | string) => {
  subsetStore.data = subsetStore.data.filter((item: { count: number; id: number | string }) => {
    if (item.id === id) {
      subsetStore.excludeDivded.count += item.count
    }
    return item.id != id
  })
  proxy.$message({ type: 'primary', message: '删除成功' })
}
</script>
<style lang='less' scoped>
</style>