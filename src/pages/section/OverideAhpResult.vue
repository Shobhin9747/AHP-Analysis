<template>
    <Topbar />
    <div class="min-h-screen bg-gray-50">

        <div class="max-w-full mx-auto px-2 pb-8">
            <div v-if="selectedEmployee" class="flex flex-col space-y-8">

                <!-- Top Section: Input Form & Employee Details -->
                <div class="flex flex-col space-y-6">
                    <!-- Employee Info Card -->
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex-shrink-0">
                        <div class="flex items-center justify-between">
                            <!-- Employee Info -->
                            <div class="flex items-center">
                                <div class="w-10 h-10 bg-[#195384] rounded-lg flex items-center justify-center mr-3">
                                    <UserIcon class="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h2 class="text-lg font-semibold text-gray-800">{{ selectedEmployee.EmployeeNumber
                                    }}</h2>

                                </div>
                            </div>

                            <!-- Current AHP Values -->
                            <div class="flex items-center space-x-4">
                                <div class="bg-blue-50 rounded-lg p-3 border border-blue-200">
                                    <div class="flex items-center mb-1">
                                        <CurrencyPoundIcon class="w-4 h-4 text-[#195384] mr-1" />
                                        <span class="text-xs font-medium text-blue-800">Basic Pay AHP</span>
                                    </div>
                                    <div class="text-sm font-bold text-blue-900">£{{
                                        parseFloat(selectedEmployee.AHPWithBasicPay).toFixed(2) }}</div>
                                </div>

                                <div class="bg-green-50 rounded-lg p-3 border border-green-200">
                                    <div class="flex items-center mb-1">
                                        <ChartBarIcon class="w-4 h-4 text-green-600 mr-1" />
                                        <span class="text-xs font-medium text-green-800">All Components AHP</span>
                                    </div>
                                    <div class="text-sm font-bold text-green-900">£{{
                                        parseFloat(selectedEmployee.AHPWithAllEligibleComponents).toFixed(2) }}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Override Form -->
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h3 class="text-lg font-semibold text-gray-800 mb-6 flex items-center">
                            <PencilIcon class="w-5 h-5 text-gray-600 mr-2" />
                            Override AHP Values
                        </h3>

                        <form @submit.prevent="submitOverride" class="space-y-6">
                            <!-- Input Fields Row -->
                            <div class="flex space-x-4">
                                <!-- Current AHP Input (Smaller space) -->
                                <div class="w-1/3">
                                    <label class="block text-sm font-medium text-gray-700 mb-2">
                                        Current Basic Pay AHP
                                    </label>
                                    <input v-model="overrideData.newBasicPayAHP" type="number" step="0.01" required
                                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        placeholder="Enter new AHP value" />
                                </div>

                                <!-- Override Reason (Larger space) -->
                                <div class="w-2/3">
                                    <label class="block text-sm font-medium text-gray-700 mb-2">
                                        Override Reason
                                    </label>
                                    <input v-model="overrideData.OverrideReason" required
                                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        placeholder="Enter override reason" />
                                </div>
                            </div>

                            <!-- Action Buttons -->
                            <div class="flex justify-end space-x-4 pt-4">
                                <button type="submit"
                                    :disabled="isSubmittingOverride || !overrideData.newBasicPayAHP || !overrideData.OverrideReason"
                                    :class="[
                                        'py-3 px-6 rounded-lg font-semibold text-white transition-all duration-200 flex items-center justify-center',
                                        isSubmittingOverride || !overrideData.newBasicPayAHP || !overrideData.OverrideReason
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : 'bg-gradient-to-r from-[#195384] to-[#11376D] hover:shadow-lg hover:scale-105'
                                    ]">
                                    <CheckIcon v-if="!isSubmittingOverride" class="w-5 h-5 mr-2" />
                                    <div v-if="isSubmittingOverride"
                                        class="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                    {{ isSubmittingOverride ? 'Submitting...' : 'Submit Override' }}
                                </button>

                                <button type="button" @click="resetValues"
                                    :disabled="isSubmittingOverride || isReversingAHP" :class="[
                                        'py-3 px-6 rounded-lg font-semibold text-white transition-all duration-200 flex items-center justify-center',
                                        isSubmittingOverride || isReversingAHP
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : 'bg-[#195384] hover:bg-[#11376D] hover:scale-105'
                                    ]">
                                    <ArrowPathIcon v-if="!isReversingAHP" class="w-5 h-5 mr-2" />
                                    <div v-if="isReversingAHP"
                                        class="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2">
                                    </div>
                                    {{ isReversingAHP ? 'Reversing...' : 'Reverse AHP' }}
                                </button>
                            </div>
                        </form>

                        <!-- Success/Error Messages -->
                        <div v-if="overrideMessage" class="mt-4 p-4 rounded-lg"
                            :class="overrideError ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'">
                            <div class="flex items-center">
                                <CheckCircleIcon v-if="!overrideError" class="w-5 h-5 text-green-600 mr-2" />
                                <ExclamationTriangleIcon v-else class="w-5 h-5 text-red-600 mr-2" />
                                <span :class="overrideError ? 'text-red-800' : 'text-green-800'" class="font-medium">{{
                                    overrideMessage }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Bottom Section: Results -->
                <div class="flex flex-col space-y-6">
                    <!-- Loading State -->
                    <div v-if="isLoadingAnalysis"
                        class="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                        <div class="flex flex-col items-center justify-center">
                            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#195384] mb-4"></div>
                            <h3 class="text-lg font-semibold text-gray-800 mb-2">Updating Analysis...</h3>
                            <p class="text-gray-600 text-sm">Please wait while we fetch the latest data</p>
                        </div>
                    </div>

                    <!-- Updated Analysis Results -->
                    <div v-else-if="updatedAnalysisData?.Employees?.length"
                        class="grid grid-cols-1 lg:grid-cols-2 gap-6">

                        <!-- Basic Pay Analysis Section -->
                        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h3 class="text-lg font-semibold text-gray-800 mb-6 flex items-center">
                                <div class="w-6 h-6 bg-blue-600 rounded flex items-center justify-center mr-2">
                                    <CurrencyPoundIcon class="w-4 h-4 text-white" />
                                </div>
                                Basic Pay Analysis
                            </h3>

                            <div v-for="employee in updatedAnalysisData.Employees" :key="employee.EmployeeNumber"
                                class="space-y-4">
                                <!-- Basic Pay Analysis Details -->
                                <div class="space-y-3 text-sm">
                                    <div class="flex justify-between items-center py-2 border-b border-blue-200">
                                        <span class="text-blue-700">Weekly Base Salary</span>
                                        <span class="font-semibold text-blue-800">£{{
                                            parseFloat(employee.WeeklyBaseSalary).toFixed(2)
                                        }}</span>
                                    </div>
                                    <div class="flex justify-between items-center py-2 border-b border-blue-200">
                                        <span class="text-blue-700">Total Eligible Pay</span>
                                        <span class="font-semibold text-blue-800">£{{
                                            parseFloat(employee.TotalEligiblePayBasic).toFixed(2)
                                        }}</span>
                                    </div>
                                    <div class="flex justify-between items-center py-2 border-b border-blue-200">
                                        <span class="text-blue-700">Calculated AHP</span>
                                        <span class="font-semibold text-blue-800">£{{
                                            parseFloat(employee.CalculatedAhpWithBasicPay).toFixed(2) }}</span>
                                    </div>
                                    <div class="flex justify-between items-center py-2 bg-blue-100 rounded px-3">
                                        <span class="text-blue-800 font-medium">Final AHP</span>
                                        <span class="text-blue-900 font-bold text-lg">£{{
                                            parseFloat(employee.AHPWithBasicPay).toFixed(2)
                                        }}</span>
                                    </div>
                                    <div class="flex justify-between items-center py-1">
                                        <span class="text-blue-700">Daily Rate</span>
                                        <span class="font-semibold text-blue-800">£{{
                                            parseFloat(employee.dailyAhpWithBasicPay).toFixed(2)
                                        }}</span>
                                    </div>
                                    <div class="flex justify-between items-center py-1">
                                        <span class="text-blue-700">Hourly Rate</span>
                                        <span class="font-semibold text-blue-800">£{{
                                            parseFloat(employee.hourlyAhpWithBasicPay).toFixed(2)
                                        }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- All Components Analysis Section -->
                        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h3 class="text-lg font-semibold text-gray-800 mb-6 flex items-center">
                                <div class="w-6 h-6 bg-green-600 rounded flex items-center justify-center mr-2">
                                    <ChartBarIcon class="w-4 h-4 text-white" />
                                </div>
                                All Components Analysis
                            </h3>

                            <div v-for="employee in updatedAnalysisData.Employees" :key="employee.EmployeeNumber"
                                class="space-y-4">
                                <!-- All Components Analysis Details -->
                                <div class="space-y-3 text-sm">
                                    <div class="flex justify-between items-center py-2 border-b border-green-200">
                                        <span class="text-green-700">Total Eligible Pay</span>
                                        <span class="font-semibold text-green-800">£{{
                                            parseFloat(employee.TotalEligiblePayWithAllEligibleComponents).toFixed(2)
                                        }}</span>
                                    </div>
                                    <div class="flex justify-between items-center py-2 border-b border-green-200">
                                        <span class="text-green-700">Calculated AHP</span>
                                        <span class="font-semibold text-green-800">£{{
                                            parseFloat(employee.CalculatedAhpWithAllEligibleComponents).toFixed(2)
                                        }}</span>
                                    </div>
                                    <div class="flex justify-between items-center py-2 bg-green-100 rounded px-3">
                                        <span class="text-green-800 font-medium">Final AHP</span>
                                        <span class="text-green-900 font-bold text-lg">£{{
                                            parseFloat(employee.AHPWithAllEligibleComponents).toFixed(2) }}</span>
                                    </div>
                                    <div class="flex justify-between items-center py-1">
                                        <span class="text-green-700">Daily Rate</span>
                                        <span class="font-semibold text-green-800">£{{
                                            parseFloat(employee.dailyAhpWithAllEligibleComponents).toFixed(2) }}</span>
                                    </div>
                                    <div class="flex justify-between items-center py-1">
                                        <span class="text-green-700">Hourly Rate</span>
                                        <span class="font-semibold text-green-800">£{{
                                            parseFloat(employee.hourlyAhpWithAllEligibleComponents).toFixed(2) }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Empty Results State -->
                    <div v-else class="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                        <div>
                            <div class="mx-auto w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                                <ChartBarIcon class="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 class="text-lg font-semibold text-gray-800 mb-2">No Results Yet</h3>
                            <p class="text-gray-600 text-sm">Submit an override to see updated analysis results here</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Empty State -->
            <div v-else class="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                <div class="mx-auto w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                    <ExclamationTriangleIcon class="w-8 h-8 text-gray-400" />
                </div>
                <h3 class="text-lg font-semibold text-gray-800 mb-2">No Employee Selected</h3>
                <p class="text-gray-600 text-sm">Please go back to select an employee to override AHP values</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import {
    ArrowLeftIcon,
    UserIcon,
    CurrencyPoundIcon,
    ChartBarIcon,
    PencilIcon,
    CheckIcon,
    ArrowPathIcon,
    CheckCircleIcon,
    ExclamationTriangleIcon
} from '@heroicons/vue/24/outline'
import Topbar from '../../components/Topbar.vue'
import apiClient from '../../helpers/apiClient'

const router = useRouter()

const selectedEmployee = ref(null)
const overrideData = ref({
    newBasicPayAHP: '',
    OverrideReason: ''
})
const isSubmittingOverride = ref(false)
const isReversingAHP = ref(false)
const overrideMessage = ref('')
const overrideError = ref(false)
const updatedAnalysisData = ref(null)
const isLoadingAnalysis = ref(false)

onMounted(() => {
    // Get employee data from sessionStorage
    const employeeData = sessionStorage.getItem('selectedEmployee')
    if (employeeData) {
        selectedEmployee.value = JSON.parse(employeeData)

    }
})

function goBack() {
    // Clear sessionStorage and navigate back
    sessionStorage.removeItem('selectedEmployee')
    router.push({ name: 'AHP Analysis' })
}

async function resetValues() {
    if (!selectedEmployee.value) {
        return
    }

    isReversingAHP.value = true
    overrideMessage.value = ''
    overrideError.value = false

    try {
        const payload = {
            EmployeeNumber: selectedEmployee.value.EmployeeNumber,
            CompanyNumber: selectedEmployee.value.CompanyNumber
        }

        const response = await axios.delete(
            'https://as-dev-ahp-d0gjcde4facrabc3.uksouth-01.azurewebsites.net/api/override/v1/deleteahp',
            {
                data: payload,  // Send payload in the body
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        // Clear the form values
        overrideData.value = {
            newBasicPayAHP: '',
            OverrideReason: ''
        }

        overrideMessage.value = 'AHP successfully reversed!'
        overrideError.value = false

        // Fetch updated analysis data after successful reverse
        await fetchUpdatedAnalysis()

    } catch (error) {
        console.error('Error reversing AHP:', error)
        overrideMessage.value = 'Failed to reverse AHP. Please try again.'
        overrideError.value = true
    } finally {
        isReversingAHP.value = false
    }
}


// Function to fetch updated analysis data
async function fetchUpdatedAnalysis() {
    debugger;
    if (!selectedEmployee.value) return

    isLoadingAnalysis.value = true

    try {
        const params = {
            employeeNumber: selectedEmployee.value.EmployeeNumber,

        };
        const response = await apiClient.get(`Sync/v1/${selectedEmployee.value.TenantCode}/${selectedEmployee.value.CompanyNumber}`, params)

        updatedAnalysisData.value = response

    } catch (error) {

        updatedAnalysisData.value = null
    } finally {
        isLoadingAnalysis.value = false
    }
}

async function submitOverride() {
    if (!selectedEmployee.value || !overrideData.value.newBasicPayAHP || !overrideData.value.OverrideReason) {
        return
    }

    isSubmittingOverride.value = true
    overrideMessage.value = ''
    overrideError.value = false

    try {
        const payload = {
            EmployeeNumber: selectedEmployee.value.EmployeeNumber,
            CompanyNumber: selectedEmployee.value.CompanyNumber,
            AHPAmount: parseFloat(overrideData.value.newBasicPayAHP),
            OverrideReason: overrideData.value.OverrideReason
        }


        const response = await axios.post(
            'https://as-dev-ahp-d0gjcde4facrabc3.uksouth-01.azurewebsites.net/api/override/v1/updateahp',
            payload,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )

        overrideMessage.value = 'AHP override submitted successfully!'
        overrideError.value = false

        // Fetch updated analysis data after successful override
        await fetchUpdatedAnalysis()

    } catch (error) {
        console.error('Error submitting override:', error)
        let errorMessage = 'Override failed. Please try again.'

        overrideMessage.value = errorMessage
        overrideError.value = true
    } finally {
        isSubmittingOverride.value = false
    }
}
</script>