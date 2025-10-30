<template>
    <Topbar />
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6">
        <!-- Tenant Code -->
        <div>
            <label class="block text-xs font-semibold text-gray-600 mb-1 tracking-wide">TENANT CODE</label>
            <div class="relative">
                <select v-model="selectedTenantCode"
                    class="w-full h-10 appearance-none px-3 pr-8 border border-[#DAEBF8] rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="">Select TenantCode</option>
                    <option value="MAPI000DTA">MAPI000DTA</option>
                    <option value="MAPI001DTA">MAPI001DTA</option>
                    <option value="MAPI002DTA">MAPI002DTA</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                    <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>
        </div>
        <!-- Company Number -->
        <div>
            <label class="block text-xs font-semibold text-gray-600 mb-1 tracking-wide">COMPANY NUMBER</label>
            <div class="relative">
                <select v-model="selectedCompanyNumber"
                    class="w-full h-10 appearance-none px-3 pr-8 border border-[#DAEBF8] rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="">Select Company...</option>
                    <option value="COMP001">COMP001</option>
                    <option value="COMP002">COMP002</option>
                    <option value="COMP003">COMP003</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                    <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>
        </div>
      
        <div>
            
            <div class="flex items-end  h-10 md:h-full">
                <button @click="searchEmployees" class="h-10 px-4 rounded-lg bg-gradient-to-r from-[#195384] to-[#11376D] text-white text-sm shadow">Search</button>
            </div>
        </div>

    </div>

    <!-- Results -->
    <div v-if="employees.length" class="mt-4 rounded-xl border border-gray-200 bg-white p-4">
        <div class="mb-3 text-sm font-semibold text-gray-800">Results ({{ employees.length }})</div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <div v-for="emp in employees" :key="emp.EmployeeNumber" class="rounded-lg border border-gray-200 p-3 bg-white">
                <div class="text-sm font-bold text-[#195384]">{{ emp.EmployeeNumber }}</div>
                <div class="text-xs text-gray-600">Company: {{ emp.CompanyNumber || selectedCompanyNumber }}</div>
                <div class="text-xs text-gray-600">Tenant: {{ emp.TenantCode || selectedTenantCode }}</div>
            </div>
        </div>
    </div>

</template>
<script setup>
import Topbar from '../../components/Topbar.vue';
import { ref } from 'vue'
import apiClient from '../../helpers/apiClient'

const selectedTenantCode = ref('MAPI000DTA')
const selectedCompanyNumber = ref('COMP001')
const employeeNumber = ref('')
const employees = ref([])

async function searchEmployees() {
    if (!selectedTenantCode.value || !selectedCompanyNumber.value) {
        return
    }
    try {
        const url = `Sync/v1/${selectedTenantCode.value}/${selectedCompanyNumber.value}`
        const params = {}
        if (employeeNumber.value && employeeNumber.value.trim()) {
            params.employeeNumber = employeeNumber.value.trim()
        }
        const res = await apiClient.get(url, params)
        employees.value = res?.Employees || []
    } catch (e) {
        employees.value = []
    }
}
</script>