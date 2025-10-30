<template>
    <div v-if="employeeData" class="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <!-- Employee Header -->
        <div class="mb-6">
            <div class="flex items-center">
                <div class="flex items-center gap-4">
                    <h2 class="text-xl font-bold text-[#195384]">{{ employeeData.EmployeeNumber || '-' }}</h2>
                    <span class="px-2 py-0.5 bg-green-500 text-white text-[10px] font-semibold rounded-full">Active</span>
                </div>
               
            </div>
            
            <!-- Employee Info Grid (Base salary, start date, end date, work pattern) -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
                <div>
                    <div class="text-[10px] text-gray-500 font-semibold uppercase tracking-wide mb-0.5">BASE SALARY</div>
                    <div class="text-xs font-semibold text-gray-800">£{{ formatCurrency(employeeData.BaseSalary) }}</div>
                </div>
                <div>
                    <div class="text-[10px] text-gray-500 font-semibold uppercase tracking-wide mb-0.5">START DATE</div>
                    <div class="text-xs font-semibold text-gray-800">{{ formatDate(employeeData.StartDate) || '-' }}</div>
                </div>
                <div>
                    <div class="text-[10px] text-gray-500 font-semibold uppercase tracking-wide mb-0.5">END DATE</div>
                    <div class="text-xs font-semibold text-gray-800">{{ formatDate(employeeData.EndDate) || 'Current' }}</div>
                </div>
                <div>
                    <div class="text-[10px] text-gray-500 font-semibold uppercase tracking-wide mb-0.5">WORK PATTERN</div>
                    <div class="text-xs font-semibold text-gray-800">{{ employeeData.WorkPattern || '-' }}</div>
                </div>
            </div>
        </div>

        <!-- Holiday Pay Summary (matches screenshot: Pay Records, Total Pay, Leave Records, Leave Hours) -->
        <div>
            <div class="flex items-center justify-end mb-3">
                
                <button @click="emitCalculate()" class="inline-flex items-center px-3 py-3 rounded-lg bg-[#195384] hover:bg-[#11376D] text-white shadow text-xs">
                    <svg class="w-3.5 h-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Calculate Holiday Pay
                </button>
            </div>

            <!-- Beautified Results Panel -->
            <div v-if="employeeData && employeeData._calcResults" class="rounded-2xl border border-blue-200 bg-gradient-to-b from-[#F8FBFF] to-white p-5 shadow-sm">
                <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center gap-2 text-[#195384] font-semibold text-sm">
                        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v8m-4-4h8"/></svg>
                        Holiday Pay Calculation Results
                    </div>
                    <button class="px-2 py-1 text-xs rounded-lg bg-gray-100 hover:bg-gray-200" @click="employeeData._calcResults = null">X Close</button>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <!-- Basic Pay Analysis -->
                    <div class="rounded-xl border border-slate-200 p-4 bg-white/90 backdrop-blur-sm shadow-sm">
                        <div class="text-sm font-semibold text-[#195384] mb-3">Basic Pay Analysis</div>
                        <div class="grid grid-cols-2 gap-3">
                            <div class="rounded-lg border border-slate-200 p-3 bg-white hover:shadow transition">
                                <div class="text-[10px] text-slate-500 font-semibold uppercase tracking-wide">TOTAL ELIGIBLE PAY</div>
                                <div class="text-sm font-bold text-slate-900">£{{ formatCurrency(employeeData._calcResults.basic.totalEligiblePay) }}</div>
                            </div>
                            <div class="rounded-lg border border-slate-200 p-3 bg-white hover:shadow transition">
                                <div class="text-[10px] text-slate-500 font-semibold uppercase tracking-wide">CALCULATED AHP</div>
                                <div class="text-sm font-bold text-slate-900">£{{ formatCurrency(employeeData._calcResults.basic.calculatedAhp) }}</div>
                            </div>
                            <div class="rounded-lg border border-slate-200 p-3 bg-white hover:shadow transition">
                                <div class="text-[10px] text-slate-500 font-semibold uppercase tracking-wide">FINAL AHP</div>
                                <div class="text-sm font-bold text-slate-900">£{{ formatCurrency(employeeData._calcResults.basic.finalAhp) }}</div>
                            </div>
                            <div class="rounded-lg border border-slate-200 p-3 bg-white hover:shadow transition">
                                <div class="text-[10px] text-slate-500 font-semibold uppercase tracking-wide">DAILY RATE</div>
                                <div class="text-sm font-bold text-slate-900">£{{ formatCurrency(employeeData._calcResults.basic.dailyRate) }}</div>
                            </div>
                            <div class="rounded-lg border border-slate-200 p-3 bg-white hover:shadow transition">
                                <div class="text-[10px] text-slate-500 font-semibold uppercase tracking-wide">HOURLY RATE</div>
                                <div class="text-sm font-bold text-slate-900">£{{ formatCurrency(employeeData._calcResults.basic.hourlyRate) }}</div>
                            </div>
                        </div>
                    </div>

                    <!-- All Components Analysis -->
                    <div class="rounded-xl border border-slate-200 p-4 bg-white/90 backdrop-blur-sm shadow-sm">
                        <div class="text-sm font-semibold text-[#195384] mb-3">All Components Analysis</div>
                        <div class="grid grid-cols-2 gap-3">
                            <div class="rounded-lg border border-slate-200 p-3 bg-white hover:shadow transition">
                                <div class="text-[10px] text-slate-500 font-semibold uppercase tracking-wide">TOTAL ELIGIBLE PAY</div>
                                <div class="text-sm font-bold text-slate-900">£{{ formatCurrency(employeeData._calcResults.allComponents.totalEligiblePay) }}</div>
                            </div>
                            <div class="rounded-lg border border-slate-200 p-3 bg-white hover:shadow transition">
                                <div class="text-[10px] text-slate-500 font-semibold uppercase tracking-wide">CALCULATED AHP</div>
                                <div class="text-sm font-bold text-slate-900">£{{ formatCurrency(employeeData._calcResults.allComponents.calculatedAhp) }}</div>
                            </div>
                            <div class="rounded-lg border border-slate-200 p-3 bg-white hover:shadow transition">
                                <div class="text-[10px] text-slate-500 font-semibold uppercase tracking-wide">FINAL AHP</div>
                                <div class="text-sm font-bold text-slate-900">£{{ formatCurrency(employeeData._calcResults.allComponents.finalAhp) }}</div>
                            </div>
                            <div class="rounded-lg border border-slate-200 p-3 bg-white hover:shadow transition">
                                <div class="text-[10px] text-slate-500 font-semibold uppercase tracking-wide">DAILY RATE</div>
                                <div class="text-sm font-bold text-slate-900">£{{ formatCurrency(employeeData._calcResults.allComponents.dailyRate) }}</div>
                            </div>
                            <div class="rounded-lg border border-slate-200 p-3 bg-white hover:shadow transition">
                                <div class="text-[10px] text-slate-500 font-semibold uppercase tracking-wide">HOURLY RATE</div>
                                <div class="text-sm font-bold text-slate-900">£{{ formatCurrency(employeeData._calcResults.allComponents.hourlyRate) }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="mt-6">
            <div class="flex items-center justify-between mb-2">
                <div class="text-sm font-bold text-gray-800">Pay Components</div>
               
            </div>
            <div class="w-full overflow-x-auto border border-gray-200 rounded-lg">
                <table class="min-w-full divide-y divide-gray-200 text-xs">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-4 py-2 text-left font-semibold text-gray-600">Pay Date</th>
                            <th class="px-4 py-2 text-left font-semibold text-gray-600">Type</th>
                            <th class="px-4 py-2 text-left font-semibold text-gray-600">Amount</th>
                            <th class="px-4 py-2 text-left font-semibold text-gray-600">Hours</th>
                            <th class="px-4 py-2 text-left font-semibold text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-100">
                        <tr v-for="(p, idx) in employeeData.PayComponents || []" :key="idx">
                            <td class="px-4 py-2">{{ formatDate(p.payDate) }}</td>
                            <td class="px-4 py-2">
                                <span class="font-semibold">{{ p.typeCode }}</span>
                                <span class="text-gray-500"> - {{ p.typeName }}</span>
                            </td>
                            <td class="px-4 py-2">£{{ formatCurrency(p.amount) }}</td>
                            <td class="px-4 py-2">{{ p.hours != null ? p.hours : '-' }}</td>
                            <td class="px-4 py-2">
                                <div class="flex items-center gap-2">
                                    <button class="px-2 py-0.5 rounded bg-blue-600 hover:bg-blue-700 text-white text-[10px]">Edit</button>
                                    <button class="px-2 py-0.5 rounded bg-red-600 hover:bg-red-700 text-white text-[10px]">Delete</button>
                                </div>
                            </td>
                        </tr>
                        <tr v-if="!(employeeData.PayComponents && employeeData.PayComponents.length)">
                            <td colspan="5" class="px-4 py-3 text-center text-gray-500">No pay components</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

       
     <div class="mt-6">
            <div class="flex items-center justify-between mb-2">
                <div class="text-sm font-bold text-gray-800">Leave Records</div>
                
            </div>
            <div class="w-full overflow-x-auto border border-gray-200 rounded-lg">
                <table class="min-w-full divide-y divide-gray-200 text-xs">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-4 py-2 text-left font-semibold text-gray-600">Leave Date</th>
                            <th class="px-4 py-2 text-left font-semibold text-gray-600">Type</th>
                            <th class="px-4 py-2 text-left font-semibold text-gray-600">Hours</th>
                            <th class="px-4 py-2 text-left font-semibold text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-100">
                        <tr v-for="(l, idx) in employeeData.Leaves || []" :key="idx">
                            <td class="px-4 py-2">{{ formatDate(l.leaveDate) }}</td>
                            <td class="px-4 py-2">{{ l.type }}</td>
                            <td class="px-4 py-2">{{ l.hours != null ? l.hours : '-' }}</td>
                            <td class="px-4 py-2">
                                <div class="flex items-center gap-2">
                                    <button class="px-2 py-0.5 rounded bg-blue-600 hover:bg-blue-700 text-white text-[10px]">Edit</button>
                                    <button class="px-2 py-0.5 rounded bg-red-600 hover:bg-red-700 text-white text-[10px]">Delete</button>
                                </div>
                            </td>
                        </tr>
                        <tr v-if="!(employeeData.Leaves && employeeData.Leaves.length)">
                            <td colspan="4" class="px-4 py-3 text-center text-gray-500">No leave records</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
    employeeData: {
        type: Object,
        default: null
    },
    holidaySummary: {
        type: Object,
        default: () => ({
            payRecords: '2',
            totalPay: '206.92',
            leaveRecords: '2',
            leaveHours: '15.5h'
        })
    }
})

const emit = defineEmits(['calculate'])

function emitCalculate() {
    emit('calculate', props.employeeData)
}

function formatDate(dateString) {
    if (!dateString) return '-'
    try {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        })
    } catch (error) {
        return '-'
    }
}

function formatCurrency(value) {
    if (!value && value !== 0) return '0.00'
    const num = parseFloat(value)
    if (isNaN(num)) return '0.00'
    return num.toFixed(2)
}

</script>

