<template>
    <Topbar />
    <div class="bg-white rounded p-2">
        <!-- Main Content -->
        <div class="max-w-8xl mx-auto px-4 py-3">
            <!-- Filters -->
            <div class="mb-8">
                <div class="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 w-full">


                    <div class="flex items-center gap-4">

                        <input ref="fileInput" type="file" accept=".json" class="hidden" @change="handleFileUpload" />


                        <button @click="fileInput.click()"
                            class="inline-flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-[#195384] to-[#11376D] text-white shadow">
                            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2 6a2 2 0 012-2h4l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                            </svg>
                            Upload JSON Payload
                        </button>

                        <span class="text-sm text-gray-600">{{ selectedFile ? selectedFile.name : 'No file selected'
                        }}</span>
                    </div>

                    <div class="mt-4 text-sm text-blue-700 bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <span class="mr-2">💡</span>Upload a JSON file with employee data. The system will parse and
                        display the information below.
                    </div>

                    <!-- Employee Navigation and Actions -->
                    <div class="mt-6 flex items-center justify-between gap-4">
                        <!-- Left side: Employee count and filter -->
                        <div class="flex items-center gap-4">
                            <div class="flex items-center gap-2">
                                <label class="text-sm font-semibold text-gray-700">Filter Employee:</label>
                                <div class="relative">
                                    <select v-model.number="selectedEmployeeIndex"
                                        class="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-1.5 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[120px]"
                                        @change="onEmployeeChange">
                                        <option value="-1">All</option>
                                        <option v-for="(employee, index) in allEmployees" :key="employee.EmployeeNumber"
                                            :value="index">
                                            {{ employee.EmployeeNumber }}
                                        </option>
                                    </select>
                                    <div
                                        class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-gray-400">
                                        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Right side: Load Sample Data button -->
                        <button @click="loadEmployeeData()"
                            class="px-4 py-2 rounded-lg bg-[#195384] hover:bg-[#11376D]  text-white shadow text-sm font-medium">
                            Load Employee Data
                        </button>
                    </div>
                </div>
            </div>


            <div class="space-y-4">
                <HolidayPayEmployeeCard v-for="employee in employeesList" :key="employee.EmployeeNumber"
                    :employeeData="employee" :holidaySummary="holidaySummary" @calculate="calculateHolidayPay" />
            </div>


        </div>
    </div>
</template>
<script setup>
import Topbar from '../../components/Topbar.vue';
import HolidayPayEmployeeCard from '../../components/HolidayPayEmployeeCard.vue';
import { ref} from 'vue';
import apiClient from '../../helpers/apiClient';
import { usePayComponentsStore } from '../../store/PayComponents'

const selectedFile = ref(null)
const employeesList = ref([])
const allEmployees = ref([]) // Store all employees for the filter dropdown
const selectedTenantCode = ref('MAPI000DTA')
const selectedCompanyNumber = ref('COMP001')
const selectedEmployeeIndex = ref(-1) // -1 => All

const payComponentsStore = usePayComponentsStore()

// no computed filtering; we call API with optional employeeNumber instead


const holidaySummary = ref({
    payRecords: '2',
    totalPay: '206.92',
    leaveRecords: '2',
    leaveHours: '15.5h'
})

const fileInput = ref(null)

async function handleFileUpload(event) {
    const file = event.target.files[0]
    if (!file) {
        return
    }
    selectedFile.value = file


}

async function loadEmployeeData() {
    try {
        const text = await selectedFile.value.text()
        const json = JSON.parse(text)

        // Basic validation
        if (!json || !Array.isArray(json.employees)) {
            console.error('Invalid JSON structure. Expected { tenantCode, companyNumber, employees: [] }')
            return
        }

        const tenant = json.tenantCode || selectedTenantCode.value
        const company = json.companyNumber || selectedCompanyNumber.value

        const mappedEmployees = json.employees.map((emp) => {
            const weeksInYear = emp.numberOfWeeksInYear || 52
            const weeklyBase = (emp.baseSalary || 0) / weeksInYear


            // Normalize Pay Components
            const typeMap = {
                '1': { code: 'BASIC', name: 'Basic Pay' },
                '2': { code: 'OTHER', name: 'Other' }
            }
            const normalizedPay = Array.isArray(emp.payComponents)
                ? emp.payComponents.map((p) => ({
                    payDate: p.payDate,
                    amount: Number(p.amount || 0),
                    hours: null, // no calculation required
                    typeCode: (typeMap[p.payType]?.code) || 'UNKNOWN',
                    typeName: (typeMap[p.payType]?.name) || 'Unknown'
                }))
                : []

            const normalizedLeaves = Array.isArray(emp.leaves)
                ? emp.leaves.map((l) => ({
                    leaveDate: l.leaveDate || l.date || null,
                    type: l.type || l.leaveType || 'LEAVE',
                    hours: Number(l.hours || 0)
                }))
                : []

            return {

                EmployeeNumber: emp.employeeNumber,
                CompanyNumber: company,
                TenantCode: tenant,
                CalculationDate: new Date().toISOString(),
                StartDate: emp.startDate || null,
                EndDate: emp.endDate || null,
                WorkPattern: emp.workPattern || '-',
                BaseSalary: Number(emp.baseSalary || 0),

                // Summary used by card header
                WeeklyBaseSalary: weeklyBase.toFixed(2),
                EligibleWeeksFound: weeksInYear,
                PayComponents: normalizedPay,
                Leaves: normalizedLeaves
            }
        })

        employeesList.value = mappedEmployees
        allEmployees.value = mappedEmployees
        selectedEmployeeIndex.value = -1

        // Populate PayComponents store with the loaded employees' pay components
        payComponentsStore.setEmployees(
            mappedEmployees.map(e => ({
                employeeNumber: e.EmployeeNumber,
                companyNumber: e.CompanyNumber,
                tenantCode: e.TenantCode,
                payComponents: e.PayComponents || []
            }))
        )
    } catch (e) {
        console.error('Failed to parse uploaded JSON:', e)
    }
}


function onEmployeeChange() {

    if (allEmployees.value && allEmployees.value.length) {
        if (selectedEmployeeIndex.value === -1) {
            employeesList.value = allEmployees.value
            return
        }
        const selected = allEmployees.value[selectedEmployeeIndex.value]
        employeesList.value = selected ? [selected] : []
        return
    }

    if (selectedEmployeeIndex.value === -1) {
        loadEmployeeData()
        return
    }
    const selected = allEmployees.value[selectedEmployeeIndex.value]
    const employeeNumber = selected ? selected.EmployeeNumber : null
    loadEmployeeData(employeeNumber)
}


async function calculateHolidayPay(employee) {
    try {
        // Build payload for a single employee using the normalized employee object
        const reverseTypeMap = {
            'BASIC': '1',
            'OTHER': '2',
            'UNKNOWN': '1'
        }

        const tenantCode = employee?.TenantCode || selectedTenantCode.value
        const companyNumber = employee?.CompanyNumber || selectedCompanyNumber.value

        const payloadEmployee = {
            employeeNumber: employee.EmployeeNumber,
            startDate: employee.StartDate || null,
            endDate: employee.EndDate || null,
            baseSalary: Number(employee.BaseSalary || 0),
            hourlyRate: employee._derived?.averageHourlyRate || null,
            salaryPeriod: 'M',
            numberOfWeeksInYear: 52,
            weeklyContractedHours: 40,
            workPattern: employee.WorkPattern || '--YYYYY',
            payComponents: (employee.PayComponents || []).map(p => ({
                payDate: p.payDate,
                amount: Number(p.amount || 0),
                payType: reverseTypeMap[p.typeCode] || '1'
            })),
            leaves: (employee.Leaves || []).map(l => ({
                leaveDate: l.leaveDate,
                hours: Number(l.hours || 0),
                type: l.type || 'LEAVE'
            }))
        }

        const payload = {
            tenantCode: tenantCode,
            companyNumber: companyNumber,
            employees: [payloadEmployee]
        }

        const result = await apiClient.post('Sync/v1/calculate', payload)
        
        // Extract AHPResults for the specific employee
        const res = result?.AHPResults || result?.data?.AHPResults || []
        const ahp = Array.isArray(res)
            ? res.find(r => String(r.EmployeeNumber) === String(employee.EmployeeNumber))
            : null

        let metrics = null
        if (ahp) {
            metrics = {
                basic: {
                    totalEligiblePay: Number(ahp.TotalEligiblePayBasic || 0),
                    calculatedAhp: Number(ahp.CalculatedAhpWithBasicPay || 0),
                    finalAhp: Number(ahp.AHPWithBasicPay || 0),
                    dailyRate: Number(ahp.dailyAhpWithBasicPay || 0),
                    hourlyRate: Number(ahp.hourlyAhpWithBasicPay || 0)
                },
                allComponents: {
                    totalEligiblePay: Number(ahp.TotalEligiblePayWithAllEligibleComponents || 0),
                    calculatedAhp: Number(ahp.CalculatedAhpWithAllEligibleComponents || 0),
                    finalAhp: Number(ahp.AHPWithAllEligibleComponents || 0),
                    dailyRate: Number(ahp.dailyAhpWithAllEligibleComponents || 0),
                    hourlyRate: Number(ahp.hourlyAhpWithAllEligibleComponents || 0)
                },
                eligibleWeeksFound: Number(ahp.EligibleWeeksFound || 0),
                totalWeeksAnalyzed: Number(ahp.TotalWeeksAnalyzed || 0),
                weeklyBaseSalary: Number(ahp.WeeklyBaseSalary || 0)
            }
        }

        if (!metrics) {
            // Fallback minimal composition if API didn't return expected structure
            const derived = employee._derived || {}
            const weeklyBase = derived.averageWeeklyPay || Number(employee.WeeklyBaseSalary || 0)
            metrics = {
                basic: {
                    totalEligiblePay: Number(derived.totalHolidayEntitlement || 0),
                    calculatedAhp: Number(weeklyBase || 0),
                    finalAhp: Number(weeklyBase || 0),
                    dailyRate: Number(derived.dailyHolidayRate || (weeklyBase / 5) || 0),
                    hourlyRate: Number(derived.averageHourlyRate || (weeklyBase / (5 * 8)) || 0)
                },
                allComponents: {
                    totalEligiblePay: Number(derived.totalHolidayEntitlement || 0),
                    calculatedAhp: Number(weeklyBase || 0),
                    finalAhp: Number(weeklyBase || 0),
                    dailyRate: Number(derived.dailyHolidayRate || (weeklyBase / 5) || 0),
                    hourlyRate: Number(derived.averageHourlyRate || (weeklyBase / (5 * 8)) || 0)
                },
                eligibleWeeksFound: 0,
                totalWeeksAnalyzed: 0,
                weeklyBaseSalary: weeklyBase
            }
        }

        // Attach metrics to the employee and refresh the list reference to trigger reactivity
        const idx = employeesList.value.findIndex(e => e.EmployeeNumber === employee.EmployeeNumber)
        if (idx !== -1) {
            employeesList.value[idx] = {
                ...employeesList.value[idx],
                _calcResults: metrics
            }
        }
        const allIdx = allEmployees.value.findIndex(e => e.EmployeeNumber === employee.EmployeeNumber)
        if (allIdx !== -1) {
            allEmployees.value[allIdx] = {
                ...allEmployees.value[allIdx],
                _calcResults: metrics
            }
        }
        
    } catch (error) {
        let errorMessage = 'Upload failed. '

        if (error.response) {
            const status = error.response.status
            const statusText = error.response.statusText
            const responseData = error.response.data

            errorMessage += `Server error (${status} ${statusText}). `

            if (responseData && typeof responseData === 'object') {
                if (responseData.message) {
                    errorMessage += responseData.message
                } else if (responseData.error) {
                    errorMessage += responseData.error
                } else {
                    errorMessage += 'Please check your JSON file format and try again.'
                }
            } else {
                errorMessage += 'Please check your JSON file format and try again.'
            }
        } else if (error.message) {
            errorMessage += error.message
        }

    }
}

</script>