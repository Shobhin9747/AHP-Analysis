<template>
  <Topbar />
  <div class="bg-white rounded p-2">



    <!-- Main Content -->
    <div class="max-w-8xl mx-auto px-4 py-3">
      <!-- Simple Upload Section -->
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
            <button @click="SearchEmployees"
              class="h-10 px-5 rounded-lg bg-gradient-to-r from-[#195384] to-[#11376D] text-white text-sm shadow hover:shadow-md transition">Search</button>
          </div>
        </div>

      </div>

      <!-- Results Section -->
      <div>
        <div v-if="responseData" class="space-y-6">


          <!-- Employee Results Grid -->
          <div v-if="responseData.Employees?.length" class="space-y-6">
            <div class="flex justify-between w-full">
              <h3 class="text-xl font-semibold text-gray-800 flex items-center">
                <UserGroupIcon class="w-6 h-6 mr-2 text-blue-600" />
                Employee Analysis Results
              </h3>
              <div class="relative flex items-center">
                <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <SearchIcon />
                </div>
                <input type="text" placeholder="Search by Employee Number..." v-model="searchQuery"
                  class="block w-80 pl-3 pr-10 py-2 border border-[#DAEBF8] rounded-full text-sm placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
            </div>

            <!-- Employee Cards Grid -->
            <div v-if="filteredResults.length > 0"
              class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <div v-for="(result, index) in filteredResults" :key="index" @click="openEmployeeModal(result)"
                class="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105">
                <!-- Employee Header -->
                <div class="bg-gradient-to-r from-[#195384] to-[#11376D] p-3 text-white">
                  <div class="text-center">
                    <h4 class="text-xs font-bold mb-1">{{ result.EmployeeNumber }}</h4>
                    <p class="text-indigo-100 text-xs">{{ result.CompanyNumber }}</p>
                  </div>
                </div>

                <!-- Key Metrics -->
                <div class="p-3">
                  <div class="space-y-2">
                    <!-- Basic Pay -->
                    <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-2 border border-blue-200">
                      <div class="flex items-center justify-between">
                        <div class="w-5 h-5 bg-[#195384] rounded flex items-center justify-center">
                          <CurrencyPoundIcon class="w-4 h-4 text-white" />
                        </div>
                        <div class="text-right">
                          <div class="text-[10px] text-blue-700 font-medium">Basic Pay</div>
                          <div class="text-xs font-bold text-blue-800">£{{ parseFloat(result.AHPWithBasicPay).toFixed(2)
                            }}</div>
                        </div>
                      </div>
                    </div>

                    <!-- Daily Rate -->
                    <div class="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-2 border border-green-200">
                      <div class="flex items-center justify-between">
                        <div class="w-5 h-5 bg-green-600 rounded flex items-center justify-center">
                          <CalendarDaysIcon class="w-4 h-4 text-white" />
                        </div>
                        <div class="text-right">
                          <div class="text-[10px] text-green-700 font-medium">Daily Rate</div>
                          <div class="text-xs font-bold text-green-800">£{{
                            parseFloat(result.dailyAhpWithBasicPay).toFixed(2) }}</div>
                        </div>
                      </div>
                    </div>

                    <!-- Hourly Rate -->
                    <div class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-2 border border-gray-300">
                      <div class="flex items-center justify-between">
                        <div class="w-5 h-5 bg-gray-600 rounded flex items-center justify-center">
                          <ClockIcon class="w-4 h-4 text-white" />
                        </div>
                        <div class="text-right">
                          <div class="text-[10px] text-gray-700 font-medium">Hourly Rate</div>
                          <div class="text-xs font-bold text-gray-800">£{{ result.hourlyAhpWithBasicPay ?
                            parseFloat(result.hourlyAhpWithBasicPay).toFixed(2) :0}}</div>
                        </div>
                      </div>
                    </div>

                    <!-- Weeks Eligible -->
                    <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-2 border border-blue-200">
                      <div class="flex items-center justify-between">
                        <div class="w-5 h-5 bg-[#195384] rounded flex items-center justify-center">
                          <ChartBarIcon class="w-4 h-4 text-white" />
                        </div>
                        <div class="text-right">
                          <div class="text-[10px] text-blue-700 font-medium">Weeks Eligible</div>
                          <div class="text-xs font-bold text-blue-800">{{ result.EligibleWeeksFound }}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Click to View Details -->
                  <div class="mt-3 text-center">
                    <div class="text-xs text-gray-500 flex items-center justify-center">
                      <EyeIcon class="w-3 h-3 mr-1" />
                      Click to view details
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- No Search Results -->
            <div v-else-if="searchQuery.trim()"
              class="bg-white rounded-2xl shadow-lg border border-gray-200 p-12 text-center">
              <div class="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <MagnifyingGlassIcon class="w-8 h-8 text-gray-400" />
              </div>
              <h3 class="text-lg font-semibold text-gray-800 mb-2">No Employees Found</h3>
              <p class="text-gray-600 text-sm">No employees match your search for "{{ searchQuery }}"</p>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="bg-white rounded-2xl shadow-lg border border-gray-200 p-12 text-center">
          <div class="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <ChartBarIcon class="w-8 h-8 text-gray-400" />
          </div>
          <h3 class="text-lg font-semibold text-gray-800 mb-2">No Results Yet</h3>

        </div>
      </div>
    </div>
  </div>

  <!-- Toast Notification -->
  <div v-if="showToast" class="fixed top-4 right-4 z-50 transform transition-all duration-300"
    :class="toastVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'">
    <div class="bg-white rounded-xl shadow-2xl border border-gray-200 p-4 max-w-sm">
      <div class="flex items-center">
        <div class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
          :class="toastType === 'error' ? 'bg-red-100' : 'bg-green-100'">
          <ExclamationTriangleIcon v-if="toastType === 'error'" class="w-5 h-5 text-red-600" />
          <CheckCircleIcon v-else class="w-5 h-5 text-green-600" />
        </div>
        <div class="ml-3 flex-1">
          <p class="text-sm font-semibold" :class="toastType === 'error' ? 'text-red-800' : 'text-gray-800'">{{
            toastMessage }}</p>
        </div>
        <button @click="hideToast" class="ml-3 flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors">
          <XMarkIcon class="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>

  <!-- Employee Details Dialog -->
  <div v-if="showModal" class="fixed inset-0 z-50 pointer-events-none" @click="closeModal">
    <!-- Dialog container - centered in main content area -->
    <div class="flex items-center justify-center min-h-screen px-4 py-4" style="background-color: rgba(0, 0, 0, 0.6);">
      <!-- Dialog panel -->
      <div class="relative w-full max-w-4xl pointer-events-auto" @click.stop>
        <!-- Main Content Section -->
        <div class="bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 mx-auto">
          <!-- Modal Header -->
          <div class="flex items-center justify-between mb-5">
            <div class="flex items-center">
              <div
                class="w-12 h-12 bg-gradient-to-br from-[#195384] to-[#11376D] rounded-xl flex items-center justify-center mr-3 shadow-lg border border-blue-200">
                <UserIcon class="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 class="text-base font-bold text-gray-800">{{ selectedEmployee?.EmployeeNumber }}</h3>
                <p class="text-xs text-gray-600">{{ selectedEmployee?.CompanyNumber }} • {{ selectedEmployee?.TenantCode
                  }}</p>
              </div>
            </div>
            <div class="flex items-center space-x-4">
              <button @click="navigateToOverride(selectedEmployee)"
                class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#195384] to-[#11376D] text-white rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-200 font-semibold text-[11px]">
                <PencilIcon class="w-4 h-4 mr-2" />
                Override AHP
              </button>
              <button @click="closeModal"
                class="inline-flex items-center justify-center w-10 h-10 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-200">
                <XMarkIcon class="w-6 h-6" />
      </button>
            </div>
          </div>

          <!-- Modal Content -->
          <div v-if="selectedEmployee" class="space-y-6">
            <!-- Key Metrics Overview -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <!-- Basic Pay AHP -->
              <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3 border border-blue-200">
                <div class="flex items-center justify-between mb-2">
                  <div class="w-6 h-6 bg-[#195384] rounded flex items-center justify-center">
                    <CurrencyPoundIcon class="w-4 h-4 text-white" />
                  </div>
                  <div class="text-right">
                    <div class="text-[10px] text-blue-700 font-medium">Basic Pay AHP</div>
                    <div class="text-sm font-bold text-blue-800">£{{
                      parseFloat(selectedEmployee.AHPWithBasicPay).toFixed(2) }}</div>
                  </div>
                </div>
              </div>

              <!-- Daily Rate -->
              <div class="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-3 border border-green-200">
                <div class="flex items-center justify-between mb-2">
                  <div class="w-6 h-6 bg-green-600 rounded flex items-center justify-center">
                    <CalendarDaysIcon class="w-4 h-4 text-white" />
                  </div>
                  <div class="text-right">
                    <div class="text-[10px] text-green-700 font-medium">Daily Rate</div>
                    <div class="text-sm font-bold text-green-800">£{{
                      parseFloat(selectedEmployee.dailyAhpWithBasicPay).toFixed(2) }}</div>
                  </div>
                </div>
              </div>

              <!-- Hourly Rate -->
              <div class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-3 border border-gray-300">
                <div class="flex items-center justify-between mb-2">
                  <div class="w-6 h-6 bg-gray-600 rounded flex items-center justify-center">
                    <ClockIcon class="w-4 h-4 text-white" />
                  </div>
                  <div class="text-right">
                    <div class="text-[10px] text-gray-700 font-medium">Hourly Rate</div>
                    <div class="text-sm font-bold text-gray-800">£{{ selectedEmployee.hourlyAhpWithBasicPay ?
                      parseFloat(selectedEmployee.hourlyAhpWithBasicPay).toFixed(2) :0}}</div>
                  </div>
                </div>
              </div>

              <!-- Weeks Analyzed -->
              <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3 border border-blue-200">
                <div class="flex items-center justify-between mb-2">
                  <div class="w-6 h-6 bg-[#195384] rounded flex items-center justify-center">
                    <ChartBarIcon class="w-4 h-4 text-white" />
                  </div>
                  <div class="text-right">
                    <div class="text-[10px] text-blue-700 font-medium">Weeks Analyzed</div>
                    <div class="text-base font-bold text-blue-800">{{ selectedEmployee.TotalWeeksAnalyzed }}</div>
                    <div class="text-[10px] text-blue-600">{{ selectedEmployee.EligibleWeeksFound }} Eligible</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Detailed Analysis -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <!-- Basic Pay Analysis -->
              <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200 p-4">
                <h4 class="text-sm font-semibold text-gray-800 mb-2 flex items-center">
                  <div class="w-6 h-6 bg-[#195384] rounded flex items-center justify-center mr-2">
                    <CurrencyPoundIcon class="w-4 h-4 text-white" />
                  </div>
                  Basic Pay Analysis
                </h4>

                <div class="space-y-3">
                  <div class="flex justify-between items-center py-1.5 border-b border-gray-200">
                    <span class="text-[10px] text-gray-600">Weekly Base Salary</span>
                    <span class="text-[11px] font-semibold text-gray-800">£{{
                      parseFloat(selectedEmployee.WeeklyBaseSalary).toFixed(2) }}</span>
                  </div>
                  <div class="flex justify-between items-center py-1.5 border-b border-gray-200">
                    <span class="text-[10px] text-gray-600">Total Eligible Pay</span>
                    <span class="text-[11px] font-semibold text-gray-800">£{{
                      parseFloat(selectedEmployee.TotalEligiblePayBasic).toFixed(2) }}</span>
                  </div>
                  <div class="flex justify-between items-center py-1.5 border-b border-gray-200">
                    <span class="text-[10px] text-gray-600">Calculated AHP</span>
                    <span class="text-[11px] font-semibold text-gray-800">£{{
                      parseFloat(selectedEmployee.CalculatedAhpWithBasicPay).toFixed(2) }}</span>
                  </div>
                  <div class="flex justify-between items-center py-1.5 bg-blue-100 rounded-lg px-2.5">
                    <span class="text-blue-800 font-medium text-[11px]">Final AHP</span>
                    <span class="text-blue-900 font-bold text-sm">£{{
                      parseFloat(selectedEmployee.AHPWithBasicPay).toFixed(2) }}</span>
                  </div>
                </div>
              </div>

              <!-- All Components Analysis -->
              <div class="bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200 p-4">
                <h4 class="text-sm font-semibold text-gray-800 mb-2 flex items-center">
                  <div class="w-6 h-6 bg-green-600 rounded flex items-center justify-center mr-2">
                    <BoltIcon class="w-4 h-4 text-white" />
                  </div>
                  All Components Analysis
                </h4>

                <div class="space-y-3">
                  <div class="flex justify-between items-center py-1.5 border-b border-gray-200">
                    <span class="text-[10px] text-gray-600">Total Eligible Pay</span>
                    <span class="text-[11px] font-semibold text-gray-800">£{{
                      parseFloat(selectedEmployee.TotalEligiblePayWithAllEligibleComponents).toFixed(2) }}</span>
                  </div>
                  <div class="flex justify-between items-center py-1.5 border-b border-gray-200">
                    <span class="text-[10px] text-gray-600">Calculated AHP</span>
                    <span class="text-[11px] font-semibold text-gray-800">£{{
                      parseFloat(selectedEmployee.CalculatedAhpWithAllEligibleComponents).toFixed(2) }}</span>
                  </div>
                  <div class="flex justify-between items-center py-1.5 bg-green-100 rounded-lg px-2.5">
                    <span class="text-green-800 font-medium text-[11px]">Final AHP</span>
                    <span class="text-green-900 font-bold text-sm">£{{
                      parseFloat(selectedEmployee.AHPWithAllEligibleComponents).toFixed(2) }}</span>
                  </div>
                  <div class="flex justify-between items-center py-1.5">
                    <span class="text-[10px] text-gray-600">Daily Rate</span>
                    <span class="text-[11px] font-semibold text-gray-800">£{{
                      parseFloat(selectedEmployee.dailyAhpWithAllEligibleComponents).toFixed(2) }}</span>
                  </div>
                  <div class="flex justify-between items-center py-1.5">
                    <span class="text-[10px] text-gray-600">Hourly Rate</span>
                    <span class="text-[11px] font-semibold text-gray-800">£{{ selectedEmployee.hourlyAhpWithAllEligibleComponents ?
                      parseFloat(selectedEmployee.hourlyAhpWithAllEligibleComponents).toFixed(2):0 }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Calculation Info -->
            <div class="bg-gray-50 rounded-xl p-3">
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <ClockIcon class="w-3.5 h-3.5 text-gray-400 mr-2" />
                  <span class="text-[11px] text-gray-600">Calculation Date</span>
                </div>
                <span class="text-[11px] font-medium text-gray-800">{{ formatDate(selectedEmployee.CalculationDate)
                  }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import {
  UserIcon,
  CurrencyPoundIcon,
  CloudArrowUpIcon,
  BoltIcon,
  CalendarDaysIcon,
  ClockIcon,
  ChartBarIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XMarkIcon,
  PencilIcon,
  ArrowPathIcon,
  UserGroupIcon,
  MagnifyingGlassIcon as SearchIcon
} from '@heroicons/vue/24/outline'
import Topbar from '../../components/Topbar.vue'
import apiClient from '../../helpers/apiClient'

const selectedTenantCode = ref('MAPI000DTA')
const selectedCompanyNumber = ref('COMP001')
const employeeNumber = ref('')
const responseData = ref(null)

// Toast state
const showToast = ref(false)
const toastVisible = ref(false)
const toastMessage = ref('')
const toastType = ref('success')

// Search state
const searchQuery = ref('')
const filteredResults = ref([])

// Modal state
const showModal = ref(false)
const selectedEmployee = ref(null)

const router = useRouter()

// Helper to extract results array from API response in either shape
function extractResultsArray(resp) {
  if (!resp) return []
 
  if (Array.isArray(resp.Employees) && resp.Employees.length) return resp.Employees
  return []
}

// Search functionality
function filterEmployees() {
  const base = extractResultsArray(responseData.value)
  if (!base.length) {
    filteredResults.value = []
    return
  }
  if (!searchQuery.value.trim()) {
    filteredResults.value = base
    return
  }
  const q = searchQuery.value.toLowerCase()
  filteredResults.value = base.filter(e => String(e.EmployeeNumber || '').toLowerCase().includes(q))
}

// Watch for search query changes
watch(searchQuery, () => {
  filterEmployees()
})

// Toast functions
function showToastNotification(message, type = 'success') {
  toastMessage.value = message
  toastType.value = type
  showToast.value = true
  toastVisible.value = true

  // Auto-hide after 4 seconds
  setTimeout(() => {
    hideToast()
  }, 4000)
}

function hideToast() {
  toastVisible.value = false
  setTimeout(() => {
    showToast.value = false
  }, 300)
}

function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

async function SearchEmployees() {
  if (!selectedTenantCode.value || !selectedCompanyNumber.value) {
    return
  }

  try {
    const url = `Sync/v1/${selectedTenantCode.value}/${selectedCompanyNumber.value}`
    const params = {}
    if (employeeNumber.value && employeeNumber.value.trim()) {
      params.employeeNumber = employeeNumber.value.trim()
    }
    const response = await apiClient.get(url, params)

    responseData.value = response
    filteredResults.value = extractResultsArray(response)

    
    if (!searchQuery.value) {
     
    } else {
     
      filterEmployees()
    }
  } catch (error) {
    let errorMessage = 'Get Employees failed. '

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
          errorMessage += 'Please check your input and try again.'
        }
      } else {
        errorMessage += 'Please check your input and try again.'
      }
    } else if (error.message) {
      errorMessage += error.message
    }

    showToastNotification(errorMessage, 'error')
  }
}

// Modal functions
function openEmployeeModal(employee) {
  selectedEmployee.value = employee
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  selectedEmployee.value = null
}

// Navigation function
function navigateToOverride(employee) {
  // Store employee data in sessionStorage to pass to the override page
  sessionStorage.setItem('selectedEmployee', JSON.stringify(employee))

  // Close modal if open
  closeModal()

  // Navigate to the override page
  router.push({ name: 'Overide AhpResult' })
}
</script>
