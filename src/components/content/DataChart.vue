<!--  -->
<template>
  <yk-space dir="vertical" size="xl" style="width: 50%">
    <div class="data-chart card">
      <div class="card__title">
        <span class="card__title-name">访问量</span>
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
    <div class="data-card card">
      <div class="card__title">
        <span class="card__title-name">数据监测</span>
        <yk-radio-group
          v-model="radio1"
          type="button"
          :solid="true"
          @change="changePie"
        >
          <yk-radio value="weekday">近一周</yk-radio>
          <yk-radio value="monthday">近一月</yk-radio>
        </yk-radio-group>
      </div>
      <div style="display: flex">
        <PieChart :data="pieChartData" title="设备总数" chart-height="208px" />
        <PieChart :data="pieChartData1" title="访问总数" chart-height="208px" />
      </div>
    </div>
  </yk-space>
</template>

<script lang='ts' setup>
import { LineChart, PieChart } from '../echarts/index'
import { ref, onMounted } from 'vue'
import { visit, survey } from '../../mock/data'
let radio = ref('weekday')
let radio1 = ref('weekday')

const lineChartData = ref([])
const pieChartData = ref([])
const pieChartData1 = ref([])
const changeLine = (e: string) => {
  let data = visit.data
  if (e === 'weekday') {
    data = data.slice(0, 7)
  }
  lineChartData.value = data
}
const changePie = (e: string) => {
  pieChartData.value = e === 'weekday' ? survey.data.divice : survey.data.divicemonth
  pieChartData1.value = e === 'weekday' ? survey.data.website : survey.data.websitemonth

}
onMounted(() => {
  changeLine(radio.value)
  changePie(radio1.value)
})
</script>
<style lang='less' scoped>
</style>