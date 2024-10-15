<!--  -->
<template>
  <div ref="chart" :style="{ height: chartHeight }" class="line-chart"></div>
</template>

<script lang='ts' setup>
import { ref, onMounted, onBeforeMount, markRaw, watch } from 'vue'

// 引入echart
import * as echarts from 'echarts/core'
// 按需引入组件
import {
  TitleComponent, TooltipComponent, GridComponent, DatasetComponent, TransformComponent, LegendComponent
} from 'echarts/components'
// 引入折线
import { LineChart } from 'echarts/charts'
// 引入标签自动布局、全局过渡动画
import { LabelLayout, UniversalTransition } from 'echarts/features'
// 引入Canvas
import { CanvasRenderer } from 'echarts/renderers'

// 注册组件
echarts.use([
  TitleComponent, TooltipComponent, GridComponent, DatasetComponent, TransformComponent, LegendComponent, LineChart, LabelLayout, UniversalTransition, CanvasRenderer
])

const chart = ref<HTMLDivElement>()
const myChart = ref()
const props = defineProps(['data', 'chartHeight'])

const xAxisD = ref<string[]>([])
const seriesD = ref<number[]>([])
const option = ref()

const formatChart = (data: []) => {
  xAxisD.value = []
  seriesD.value = []
  if (Array.isArray(data) && data.length > 0) {
    data.forEach((item) => {
      xAxisD.value.push(item['date'])
      seriesD.value.push(item['count'])
    })
  }

  option.value = {
    color: ['#2B5AED'],
    grid: {
      top: '4%',
      bottom: '0%',
      left: '0%',
      right: '0%',
      containLabel: true
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: xAxisD.value
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: seriesD.value,
        type: 'line',
        smooth: true
      }
    ]
  }
}

onMounted(() => {
  formatChart(props.data)
  // 格式化生成图标
  myChart.value = markRaw(echarts.init(chart.value as HTMLDivElement))
  myChart.value.setOption(option.value)
  // 监听页面视图变化改变echart宽度
  window.addEventListener('resize', () => {
    myChart.value.resize()
  })
})

watch(
  () => props.data,
  (n) => {
    formatChart(n)
    myChart.value = markRaw(echarts.init(chart.value as HTMLDivElement))
    myChart.value.setOption(option.value)
  }
)

onBeforeMount(() => {
  window.removeEventListener('resize', () => {
    myChart.value.resize()
  })
})
</script>
<style lang='less' scoped>
.line-chart {
  width: 100%;
}
</style>