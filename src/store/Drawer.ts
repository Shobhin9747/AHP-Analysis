import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDrawerStore = defineStore('drawer', () => {
  const isCollapsed = ref(false)

  const toggle = () => {
    isCollapsed.value = !isCollapsed.value
  }

  return { isCollapsed, toggle }
})
