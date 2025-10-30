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
                <button @click="searchEmployees" class="h-10 px-5 rounded-lg bg-gradient-to-r from-[#195384] to-[#11376D] text-white text-sm shadow hover:shadow-md transition">Search</button>
            </div>
        </div>

    </div>

    <!-- Results -->
    <div v-if="employees.length" class="mt-4 space-y-5">
        <div v-for="emp in employees" :key="emp.EmployeeNumber" class="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            <!-- Card top bar -->
            <div class="bg-gradient-to-r from-[#F5FAFF] to-white border-b border-slate-200 p-4 flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <div class="text-base font-bold text-[#195384]">{{ emp.EmployeeNumber }}</div>
                </div>
                <div class="text-[11px] text-gray-500">Calc: {{ formatDate(emp.CalculationDate) }}</div>
            </div>

            <div class="p-4">
                <!-- Top summary (Weekly base, Weeks) -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                    <div class="rounded-lg border border-slate-200 p-3 bg-white hover:shadow-sm transition">
                        <div class="flex items-center gap-2 text-[10px] text-slate-500 font-semibold uppercase tracking-wide">
                            Weekly Base Salary
                        </div>
                        <div class="text-sm font-bold text-slate-900">£{{ fmt(emp.WeeklyBaseSalary) }}</div>
                    </div>
                    <div class="rounded-lg border border-slate-200 p-3 bg-white hover:shadow-sm transition">
                        <div class="text-[10px] text-slate-500 font-semibold uppercase tracking-wide">Eligible Weeks</div>
                        <div class="text-sm font-bold text-slate-900">{{ emp.EligibleWeeksFound }}</div>
                    </div>
                    <div class="rounded-lg border border-slate-200 p-3 bg-white hover:shadow-sm transition">
                        <div class="text-[10px] text-slate-500 font-semibold uppercase tracking-wide">Analyzed Weeks</div>
                        <div class="text-sm font-bold text-slate-900">{{ emp.TotalWeeksAnalyzed }}</div>
                    </div>
                </div>

                <!-- Two columns: Basic vs All Components -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <!-- Basic Pay Analysis -->
                    <div class="rounded-xl border border-slate-200 p-4 bg-blue-50">
                        <div class="text-sm font-semibold text-[#195384] mb-3">Basic Pay Analysis</div>
                        <div class="grid grid-cols-2 gap-3">
                            <div class="rounded-lg border border-slate-200 p-3 bg-white hover:shadow-sm transition">
                                <div class="text-[10px] text-slate-500 font-semibold uppercase tracking-wide">Total Eligible Pay</div>
                                <div class="text-sm font-bold text-slate-900">£{{ fmt(emp.TotalEligiblePayBasic) }}</div>
                            </div>
                            <div class="rounded-lg border border-slate-200 p-3 bg-white hover:shadow-sm transition">
                                <div class="text-[10px] text-slate-500 font-semibold uppercase tracking-wide">Calculated AHP</div>
                                <div class="text-sm font-bold text-slate-900">£{{ fmt(emp.CalculatedAhpWithBasicPay) }}</div>
                            </div>
                            <div class="rounded-lg border border-slate-200 p-3 bg-white hover:shadow-sm transition">
                                <div class="text-[10px] text-slate-500 font-semibold uppercase tracking-wide">Final AHP</div>
                                <div class="text-sm font-bold text-slate-900">£{{ fmt(emp.AHPWithBasicPay) }}</div>
                            </div>
                            <div class="rounded-lg border border-slate-200 p-3 bg-white hover:shadow-sm transition">
                                <div class="text-[10px] text-slate-500 font-semibold uppercase tracking-wide">Daily Rate</div>
                                <div class="text-sm font-bold text-slate-900">£{{ fmt(emp.dailyAhpWithBasicPay) }}</div>
                            </div>
                            <div class="rounded-lg border border-slate-200 p-3 bg-white hover:shadow-sm transition">
                                <div class="text-[10px] text-slate-500 font-semibold uppercase tracking-wide">Hourly Rate</div>
                                <div class="text-sm font-bold text-slate-900">£{{ fmt(emp.hourlyAhpWithBasicPay) }}</div>
                            </div>
                        </div>
                    </div>

                    <!-- All Components Analysis -->
                    <div class="rounded-xl border border-slate-200 p-4 bg-cyan-50">
                        <div class="text-sm font-semibold text-[#195384] mb-3">All Components Analysis</div>
                        <div class="grid grid-cols-2 gap-3">
                            <div class="rounded-lg border border-slate-200 p-3 bg-white hover:shadow-sm transition">
                                <div class="text-[10px] text-slate-500 font-semibold uppercase tracking-wide">Total Eligible Pay</div>
                                <div class="text-sm font-bold text-slate-900">£{{ fmt(emp.TotalEligiblePayWithAllEligibleComponents) }}</div>
                            </div>
                            <div class="rounded-lg border border-slate-200 p-3 bg-white hover:shadow-sm transition">
                                <div class="text-[10px] text-slate-500 font-semibold uppercase tracking-wide">Calculated AHP</div>
                                <div class="text-sm font-bold text-slate-900">£{{ fmt(emp.CalculatedAhpWithAllEligibleComponents) }}</div>
                            </div>
                            <div class="rounded-lg border border-slate-200 p-3 bg-white hover:shadow-sm transition">
                                <div class="text-[10px] text-slate-500 font-semibold uppercase tracking-wide">Final AHP</div>
                                <div class="text-sm font-bold text-slate-900">£{{ fmt(emp.AHPWithAllEligibleComponents) }}</div>
                            </div>
                            <div class="rounded-lg border border-slate-200 p-3 bg-white hover:shadow-sm transition">
                                <div class="text-[10px] text-slate-500 font-semibold uppercase tracking-wide">Daily Rate</div>
                                <div class="text-sm font-bold text-slate-900">£{{ fmt(emp.dailyAhpWithAllEligibleComponents) }}</div>
                            </div>
                            <div class="rounded-lg border border-slate-200 p-3 bg-white hover:shadow-sm transition">
                                <div class="text-[10px] text-slate-500 font-semibold uppercase tracking-wide">Hourly Rate</div>
                                <div class="text-sm font-bold text-slate-900">£{{ fmt(emp.hourlyAhpWithAllEligibleComponents) }}</div>
                            </div>
                        </div>
                    </div>
                </div>
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

function fmt(v) {
    const num = Number(v)
    if (isNaN(num)) return '0.00'
    return num.toFixed(2)
}

function formatDate(d) {
    if (!d) return '-'
    try {
        const dt = new Date(d)
        return dt.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })
    } catch {
        return '-'
    }
}
</script>