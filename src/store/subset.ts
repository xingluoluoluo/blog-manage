/**
 * 分组
 */
import { defineStore } from 'pinia'
import { SubsetData } from '../utils/interface'
export const useSubsetStore = defineStore('subset', {
  state: () => {
    return {
      // 所有属性自动推断类型
      total: 0,
      data: [] as SubsetData[]
    }
  },
  getters: {
    excludeDivded: (state) => {
      let arr = []
      let n = state.total
      for (let i = 0; i < state.data.length; i++) {
        arr[i] = state.data[i].id
        n -= state.data[i].count
      }
      return {
        id: arr.join(','), subsetName: '未分类', count: n
      }
    }
  }
})