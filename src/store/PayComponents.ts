import { defineStore } from 'pinia'

interface PayComponentItem {
  payDate?: string
  amount?: number | string
  typeCode?: string
  typeName?: string
  hours?: number | string | null
}

interface PayComponentsState {
  employeeNumber: string
  companyNumber: string
  tenantCode: string
  payComponents: PayComponentItem[]
}

export const usePayComponentsStore = defineStore('payComponents', {
  state: () => ({
    selected: null as PayComponentsState | null,
    employees: [] as PayComponentsState[],
    allEmployees: [] as PayComponentsState[],
  }),
  actions: {
    setSelected(data: PayComponentsState) {
      this.selected = data
    },
    setEmployees(list: PayComponentsState[]) {      
      this.employees = Array.isArray(list) ? list : []
    },
    setAllEmployees(list: PayComponentsState[]) {
      this.allEmployees = Array.isArray(list) ? list : []
    },
    clear() {
      this.selected = null
      this.employees = []
      this.allEmployees = []
    }
  }
})
