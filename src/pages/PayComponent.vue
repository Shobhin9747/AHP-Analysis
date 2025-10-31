<template>
  <div>
    <Topbar />
    <div class="p-4">
      <!-- Header -->
      <div class="rounded-2xl border border-gray-200 bg-gradient-to-r from-[#F5FAFF] to-white p-4 mb-4 flex items-center justify-between">
        <div>
          <div class="text-xl font-bold text-[#195384]">Pay Components</div>
          <div class="flex flex-wrap items-center gap-2 mt-1">
            <span class="text-[10px] text-slate-500">Employee</span>
            <span class="px-2 py-0.5 text-[11px] font-semibold rounded-full bg-blue-50 text-blue-700 border border-blue-200">{{ employeeData.employeeNumber || '-' }}</span>
            <span class="text-[10px] text-slate-500 ml-2">Company</span>
            <span class="px-2 py-0.5 text-[11px] font-semibold rounded-full bg-blue-50 text-blue-700 border border-blue-200">{{ employeeData.companyNumber || '-' }}</span>
            <span class="text-[10px] text-slate-500 ml-2">Tenant</span>
            <span class="px-2 py-0.5 text-[11px] font-semibold rounded-full bg-blue-50 text-blue-700 border border-blue-200">{{ employeeData.tenantCode || '-' }}</span>
          </div>
        </div>
      
      </div>

      
      <div v-if="items.length" class="space-y-5">
        <div class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div class="flex items-center justify-between mb-3">
            <div class="text-sm font-semibold text-[#195384]">All Pay Components</div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-7 gap-3">
            <div v-for="(item, idx) in items" :key="item._id" class="rounded-lg border p-3 hover:shadow-sm transition relative" :class="cardBgClass(item.typeCode)">
              <div class="flex items-center justify-between mb-1">
                <div class="text-xs font-semibold text-slate-800">£{{ fmt(item.amount) }}</div>
                <div class="flex items-center gap-1">
                  <span class="px-2 py-0.5 rounded-full text-[10px] border" :class="chipClass(item.typeCode)">{{ item.typeCode }}</span>
                </div>
              </div>
              <div class="text-[11px] text-gray-700">{{ formatDate(item.payDate) }}</div>
              <div v-if="item.typeName" class="text-[10px] text-gray-600 mt-1">{{ item.typeName }}</div>
              <div v-if="item.hours != null" class="text-[10px] text-gray-600 mt-1">Hours: {{ item.hours }}</div>
             
             
              <div class="absolute bottom-2 right-2 flex items-center gap-1">
                <button class="p-1 rounded-full border border-slate-200 bg-white/70 hover:bg-white shadow-sm" @click="onEdit(idx)">
                  <PencilIcon class="w-3.5 h-3.5 text-slate-600" />
                </button>
                <button class="p-1 rounded-full border border-slate-200 bg-white/70 hover:bg-white shadow-sm" @click="onDelete(idx)">
                  <TrashIcon class="w-3.5 h-3.5 text-rose-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="rounded-xl border border-slate-200 bg-white p-6 text-center text-sm text-gray-600">No pay components to display</div>
    </div>
  </div>
</template>

<script setup>
import Topbar from '../components/Topbar.vue'
import { ref, computed, onMounted } from 'vue'
import { usePayComponentsStore } from '../store/PayComponents'
import { PencilIcon, TrashIcon } from '@heroicons/vue/24/outline'

const store = usePayComponentsStore()
const employeeData = ref({ employeeNumber: '', companyNumber: '', tenantCode: '', payComponents: [] })

onMounted(() => {
  if (store.selected) {
    employeeData.value = {
      employeeNumber: store.selected.employeeNumber,
      companyNumber: store.selected.companyNumber,
      tenantCode: store.selected.tenantCode,
      payComponents: store.selected.payComponents || []
    }
    return
  }
  // If a single employee exists in store, use it
  if (store.employees && store.employees.length === 1) {
    const e = store.employees[0]
    employeeData.value = {
      employeeNumber: e.employeeNumber,
      companyNumber: e.companyNumber,
      tenantCode: e.tenantCode,
      payComponents: e.payComponents || []
    }
    return
  }
  // Fallback to sessionStorage if page reloaded and store cleared
  try {
    const raw = sessionStorage.getItem('payComponentEmployeeData')
    if (raw) employeeData.value = JSON.parse(raw)
  } catch {}
})

function fmt(v) {
  const n = Number(v)
  return isNaN(n) ? '0.00' : n.toFixed(2)
}

function formatDate(d) {
  if (!d) return '-'
  try {
    const dt = new Date(d)
    return dt.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })
  } catch { return '-' }
}

function chipClass(code) {
  if (code === 'BASIC') return 'bg-green-50 text-green-700 border-green-200'
  return 'bg-blue-50 text-blue-700 border-blue-200'
}

function cardBgClass(code) {
  if (code === 'BASIC') return 'bg-green-50/70 border-green-200'
  return 'bg-blue-50/70 border-blue-200'
}

const items = computed(() => {
  const pcs = employeeData.value.payComponents || []
  return pcs.map((p, i) => ({ ...p, _id: `pc-${i}` }))
})

const totalAmount = computed(() => {
  return (employeeData.value.payComponents || []).reduce((sum, p) => sum + Number(p.amount || 0), 0)
})

function onEdit(index) {
  console.log('Edit pay component at index', index)
}

function onDelete(index) {
  if (!employeeData.value.payComponents) return
  const confirmDelete = window.confirm('Delete this pay component?')
  if (!confirmDelete) return
  employeeData.value.payComponents.splice(index, 1)
}
</script> 