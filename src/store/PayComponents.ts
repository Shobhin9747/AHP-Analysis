import { defineStore } from 'pinia'
import { ref } from 'vue'

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

export const usePayComponentsStore = defineStore('payComponents', () => {
  const selected = ref<PayComponentsState | null>(null)
  const employees = ref<PayComponentsState[]>([])

  function setSelected(data: PayComponentsState) {
    selected.value = data
  }

  function setEmployees(list: PayComponentsState[]) {
    employees.value = Array.isArray(list) ? list : []
  }

  function getByEmployeeNumber(employeeNumber: string | number): PayComponentsState | null {
    const num = String(employeeNumber)
    const found = employees.value.find(e => String(e.employeeNumber) === num)
    return found || null
  }

  function clear() {
    selected.value = null
    employees.value = []
  }

  return { selected, employees, setSelected, setEmployees, getByEmployeeNumber, clear }
})
