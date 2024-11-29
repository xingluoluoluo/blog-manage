/**
 * 分组
 */
import { defineStore } from 'pinia'
import { SubsetData } from '../utils/interface'
export const useSubsetStore = defineStore('subset', {
  state: () => {
    return {
      total: 0,
      data: [] as SubsetData[]
    }
  },
  getters: {
    excludeNum: () => { }
  }
})