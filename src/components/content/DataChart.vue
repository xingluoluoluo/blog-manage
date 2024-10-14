<!--  -->
<template>
  <yk-space dir="vertical" size="xl" style="width: 50%">
    <div class="data-card">
      <div class="data-card__title">
        <span class="data-card__title-name">访问量</span>
        <yk-radio-group
          v-model="radio"
          type="button"
          :solid="true"
          @change="changeLine"
        >
          <yk-radio value="weekday">近一周</yk-radio>
          <yk-radio value="monthday">近一月</yk-radio>
        </yk-radio-group>
      </div>
      <LineChart :data="lineChartData" chart-height="208px" />
    </div>
    <div class="data-card">
      <div class="data-card__title">
        <span class="data-card__title-name">数据监测</span>
        <yk-radio-group v-model="radio1" type="button" :solid="true">
          <yk-radio value="weekday">近一周</yk-radio>
          <yk-radio value="monthday">近一月</yk-radio>
        </yk-radio-group>
      </div>
    </div>
  </yk-space>
</template>

<script lang='ts' setup>
import { LineChart } from '../echarts/index'
import { ref, onMounted } from 'vue'
import { visit } from '../../mock/data'
let radio = ref('weekday')
let radio1 = ref('weekday')

const lineChartData = ref([])
const changeLine = (e: string) => {
  let data = visit.data
  if (e === 'weekday') {
    data = data.slice(0, 7)
  }
  lineChartData.value = data

}
onMounted(() => {
  changeLine(radio.value)
})
</script>
<style lang='less' scoped>
.data-card {
  padding: @space-xl;
  border-radius: @radius-m;
  background-color: @bg-color-l;
  width: 100%;
  &__title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: @space-l;
    &-name {
      .font-l();
      font-weight: 600;
      color: @font-color-l;
    }
  }
}
</style>