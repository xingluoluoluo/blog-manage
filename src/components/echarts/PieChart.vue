<!--  -->
<template>
  <div ref="chart" :style="{ height: chartHeight }" class="pie-chart"></div>
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
import { PieChart } from 'echarts/charts'
// 引入标签自动布局、全局过渡动画
import { LabelLayout, UniversalTransition } from 'echarts/features'
// 引入Canvas
import { CanvasRenderer } from 'echarts/renderers'

// 注册组件
echarts.use([
  TitleComponent, TooltipComponent, GridComponent, DatasetComponent, TransformComponent, LegendComponent, PieChart, LabelLayout, UniversalTransition, CanvasRenderer
])

const chart = ref<HTMLDivElement>()
const myChart = ref()
const props = defineProps(['data', 'title', 'chartHeight'])

const option = ref()

const formatChart = (data: []) => {
  let total: number = 0
  if (Array.isArray(data) && data.length > 0) {
    data.forEach(item => {
      total += item['value']
    })
  }

  option.value = {
    color: ['#2B5AED', '#FA5247', '#1CCBB6', '#F625AF', '#FFB435'],
    title: {
      text: total, // 主标题文本
      subtext: props.title, // 副标题文本
      left: 'center',
      top: '34%',
      textStyle: {
        fontSize: 32,
        color: '#686B73',
        align: 'center'
      },
      subTextStyle: {
        fontSize: 14,
        color: '#686B73',
      }
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      show: false,
      bottom: 0,
      icon: 'circle'
    },
    series: [
      {
        type: 'pie',
        radius: ['60', '76'],
        avoidLabelOverlap: true,
        label: {
          normal: {
            show: true
          },
          emphasis: {
            show: true
          }
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 14,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: data
      }
    ]

  }
}

formatChart(props.data)


onMounted(() => {
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
.pie-chart {
  width: 100%;
}
</style>