<template>
     <Topbar />
  <div class="bg-white rounded p-2">



    <!-- Main Content -->
    <div class="max-w-8xl mx-auto px-4 py-3">
      <!-- Simple Upload Section -->
      <div class="mb-8">
        <div class="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 w-full">
          <div class="flex items-center gap-4">
            <!-- File Input -->
            <div class="flex-1">
      <input
                ref="fileInput"
        type="file"
        @change="handleFileUpload"
        accept=".json"
                class="hidden"
              />
              <div 
                @click="$refs.fileInput.click()"
                class="relative cursor-pointer"
              >
                <input
                  type="text"
                  :value="selectedFile ? selectedFile.name : 'Select JSON file...'"
                  readonly
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#195384] focus:border-[#195384] transition-colors bg-gray-50 hover:bg-gray-100 cursor-pointer"
                  placeholder="Select JSON file..."
                />
                <div class="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                  </svg>
                </div>
              </div>
            </div>

            <!-- Upload Button -->
      <button
        @click="uploadFile"
              :disabled="!selectedFile || isUploading"
              :class="[
                'px-8 py-3 rounded-xl font-semibold text-white transition-all duration-300 transform whitespace-nowrap',
                selectedFile && !isUploading 
                  ? 'bg-gradient-to-r from-[#195384] to-[#11376D] hover:scale-105 shadow-lg hover:shadow-xl' 
                  : 'bg-gray-400 cursor-not-allowed'
              ]"
            >
              <div class="flex items-center">
                <svg v-if="isUploading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <svg v-else class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                {{ isUploading ? 'Processing...' : 'Upload' }}
              </div>
      </button>
          </div>

        </div>
      </div>

      <!-- Results Section -->
      <div>
           <div v-if="responseData && !uploadError" class="space-y-6">
           

             <!-- Employee Results Grid -->
             <div v-if="responseData.AHPResults?.length" class="space-y-6">
              <div class="flex justify-between w-full">
                            <h3 class="text-xl font-semibold text-gray-800 flex items-center">
                                <svg class="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z">
                                    </path>
                                </svg>
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
               <div v-if="filteredResults.length > 0" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                 <div v-for="(result, index) in filteredResults" :key="index" 
                      @click="navigateToOverride(result)" 
                      class="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300">
                   <!-- Employee Header -->
                   <div class="bg-gradient-to-r from-[#195384] to-[#11376D] p-4 text-white">
                     <div class="flex items-center justify-between">
                       <div>
                         <h4 class="text-lg font-bold mb-1">{{ result.EmployeeNumber }}</h4>
                         <p class="text-indigo-100 text-xs">{{ result.CompanyNumber }}</p>
                       </div>
                       <div class="text-right">
                         <div class="text-indigo-100 text-xs mb-1">Calculated</div>
                         <div class="text-sm font-semibold">{{ formatDate(result.CalculationDate) }}</div>
                       </div>
                     </div>
                   </div>

                   <!-- Key Metrics -->
                   <div class="p-3">
                     <div class="grid grid-cols-2 gap-2 mb-3">
                       <!-- Final AHP -->
                       <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-2 border border-blue-200">
                         <div class="flex items-center justify-between mb-1">
                           <div class="w-4 h-4 bg-blue-500 rounded flex items-center justify-center">
                             <svg class="w-2 h-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                             </svg>
                           </div>
                           <div class="text-right">
                             <div class="text-xs text-blue-600 font-medium">Final AHP</div>
                           </div>
                         </div>
                         <div class="text-sm font-bold text-blue-800">£{{ parseFloat(result.AHPWithBasicPay).toFixed(2) }}</div>
                         <div class="text-xs text-blue-600">Basic Pay</div>
                       </div>

                       <!-- Daily Rate -->
                       <div class="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-2 border border-green-200">
                         <div class="flex items-center justify-between mb-1">
                           <div class="w-4 h-4 bg-green-500 rounded flex items-center justify-center">
                             <svg class="w-2 h-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                             </svg>
                           </div>
                           <div class="text-right">
                             <div class="text-xs text-green-600 font-medium">Daily Rate</div>
                           </div>
                         </div>
                         <div class="text-sm font-bold text-green-800">£{{ parseFloat(result.dailyAhpWithBasicPay).toFixed(2) }}</div>
                         <div class="text-xs text-green-600">Per Day</div>
                       </div>

                       <!-- Hourly Rate -->
                       <div class="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-2 border border-purple-200">
                         <div class="flex items-center justify-between mb-1">
                           <div class="w-4 h-4 bg-purple-500 rounded flex items-center justify-center">
                             <svg class="w-2 h-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                             </svg>
                           </div>
                           <div class="text-right">
                             <div class="text-xs text-purple-600 font-medium">Hourly Rate</div>
                           </div>
                         </div>
                         <div class="text-sm font-bold text-purple-800">£{{result.hourlyAhpWithBasicPay? parseFloat(result.hourlyAhpWithBasicPay).toFixed(2) :0}}</div>
                         <div class="text-xs text-purple-600">Per Hour</div>
                       </div>

                       <!-- Weeks Analyzed -->
                       <div class="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-2 border border-orange-200">
                         <div class="flex items-center justify-between mb-1">
                           <div class="w-4 h-4 bg-orange-500 rounded flex items-center justify-center">
                             <svg class="w-2 h-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                             </svg>
                           </div>
                           <div class="text-right">
                             <div class="text-xs text-orange-600 font-medium">Weeks</div>
                           </div>
                         </div>
                         <div class="text-sm font-bold text-orange-800">{{ result.TotalWeeksAnalyzed }}</div>
                         <div class="text-xs text-orange-600">{{ result.EligibleWeeksFound }} Eligible</div>
                       </div>
                     </div>

                     <!-- Detailed Breakdown -->
                     <div class="space-y-3">
                       <!-- Basic Pay Analysis -->
                       <div class="bg-gray-50 rounded-xl p-3">
                         <h5 class="text-sm font-semibold text-gray-800 mb-2 flex items-center">
                           <div class="w-5 h-5 bg-blue-500 rounded flex items-center justify-center mr-2">
                             <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                             </svg>
                           </div>
                           Basic Pay Analysis
                         </h5>
                         
                         <div class="space-y-2 text-xs">
                           <div class="flex justify-between items-center py-1 border-b border-gray-200">
                             <span class="text-gray-600">Weekly Base Salary</span>
                             <span class="font-semibold text-gray-800">£{{ parseFloat(result.WeeklyBaseSalary).toFixed(2) }}</span>
                           </div>
                           <div class="flex justify-between items-center py-1 border-b border-gray-200">
                             <span class="text-gray-600">Total Eligible Pay</span>
                             <span class="font-semibold text-gray-800">£{{ parseFloat(result.TotalEligiblePayBasic).toFixed(2) }}</span>
                           </div>
                           <div class="flex justify-between items-center py-1 border-b border-gray-200">
                             <span class="text-gray-600">Calculated AHP</span>
                             <span class="font-semibold text-gray-800">£{{ parseFloat(result.CalculatedAhpWithBasicPay).toFixed(2) }}</span>
                           </div>
                           <div class="flex justify-between items-center py-1 bg-blue-50 rounded px-2">
                             <span class="text-blue-700 font-medium">Final AHP</span>
                             <span class="text-blue-800 font-bold">£{{ parseFloat(result.AHPWithBasicPay).toFixed(2) }}</span>
                           </div>
                         </div>
                       </div>

                       <!-- All Components Analysis -->
                       <div class="bg-gray-50 rounded-xl p-3">
                         <h5 class="text-sm font-semibold text-gray-800 mb-2 flex items-center">
                           <div class="w-5 h-5 bg-green-500 rounded flex items-center justify-center mr-2">
                             <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                             </svg>
                           </div>
                           All Components Analysis
                         </h5>
                         
                         <div class="space-y-2 text-xs">
                           <div class="flex justify-between items-center py-1 border-b border-gray-200">
                             <span class="text-gray-600">Total Eligible Pay</span>
                             <span class="font-semibold text-gray-800">£{{ parseFloat(result.TotalEligiblePayWithAllEligibleComponents).toFixed(2) }}</span>
                           </div>
                           <div class="flex justify-between items-center py-1 border-b border-gray-200">
                             <span class="text-gray-600">Calculated AHP</span>
                             <span class="font-semibold text-gray-800">£{{ parseFloat(result.CalculatedAhpWithAllEligibleComponents).toFixed(2) }}</span>
                           </div>
                            <div class="flex justify-between items-center py-1 bg-green-50 rounded px-2">
                             <span class="text-blue-700 font-medium">Final AHP</span>
                             <span class="text-blue-800 font-bold">£{{ parseFloat(result.AHPWithAllEligibleComponents).toFixed(2) }}</span>
                           </div>
                           <div class="flex justify-between items-center py-1">
                             <span class="text-gray-600">Daily Rate</span>
                             <span class="font-semibold text-gray-800">£{{ parseFloat(result.dailyAhpWithAllEligibleComponents).toFixed(2) }}</span>
                           </div>
                           <div class="flex justify-between items-center py-1">
                             <span class="text-gray-600">Hourly Rate</span>
                             <span class="font-semibold text-gray-800">£{{result.hourlyAhpWithAllEligibleComponents? parseFloat(result.hourlyAhpWithAllEligibleComponents).toFixed(2):0 }}</span>
                           </div>
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
               
               <!-- No Search Results -->
               <div v-else-if="searchQuery.trim()" class="bg-white rounded-2xl shadow-lg border border-gray-200 p-12 text-center">
                 <div class="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                   <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                   </svg>
                 </div>
                 <h3 class="text-lg font-semibold text-gray-800 mb-2">No Employees Found</h3>
                 <p class="text-gray-600 text-sm">No employees match your search for "{{ searchQuery }}"</p>
               </div>
             </div>
           </div>

          <!-- Empty State -->
          <div v-else class="bg-white rounded-2xl shadow-lg border border-gray-200 p-12 text-center">
            <div class="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-800 mb-2">No Results Yet</h3>
            <p class="text-gray-600 text-sm">Upload a JSON file to see AHP analysis results here</p>
          </div>
        </div>
      </div>
    </div>

  <!-- Toast Notification -->
  <div v-if="showToast" class="fixed top-4 right-4 z-50 transform transition-all duration-300" :class="toastVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'">
    <div class="bg-white rounded-xl shadow-2xl border border-gray-200 p-4 max-w-sm">
      <div class="flex items-center">
        <div class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center" :class="toastType === 'error' ? 'bg-red-100' : 'bg-green-100'">
          <svg v-if="toastType === 'error'" class="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
          </svg>
          <svg v-else class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
          </svg>
        </div>
        <div class="ml-3 flex-1">
          <p class="text-sm font-semibold" :class="toastType === 'error' ? 'text-red-800' : 'text-gray-800'">{{ toastMessage }}</p>
        </div>
        <button @click="hideToast" class="ml-3 flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import Topbar from '../../components/Topbar.vue'

const selectedFile = ref(null)
const uploadMessage = ref('')
const uploadError = ref(false)
const isUploading = ref(false)
const responseData = ref(null)

// Toast state
const showToast = ref(false)
const toastVisible = ref(false)
const toastMessage = ref('')
const toastType = ref('success') // 'success' or 'error'

// Search state
const searchQuery = ref('')
const filteredResults = ref([])

const router = useRouter()

// Search functionality
function filterEmployees() {
  if (!responseData.value?.AHPResults) {
    filteredResults.value = []
    return
  }
  
  if (!searchQuery.value.trim()) {
    filteredResults.value = responseData.value.AHPResults
    return
  }
  
  filteredResults.value = responseData.value.AHPResults.filter(employee => 
    employee.EmployeeNumber.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
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

function handleFileUpload(event) {
  const file = event.target.files[0]
  if (file && file.type === 'application/json') {
    selectedFile.value = file
    uploadMessage.value = ''
    uploadError.value = false
    responseData.value = null
  } else {
    selectedFile.value = null
    showToastNotification('Please select a valid JSON file.', 'error')
    uploadError.value = true
  }
}

async function uploadFile() {
  if (!selectedFile.value) {
    showToastNotification('No file selected.', 'error')
    uploadError.value = true
    return
  }

  isUploading.value = true
  uploadMessage.value = ''
  uploadError.value = false

  try {
    const fileContent = await selectedFile.value.text()
    
    const jsonData = JSON.parse(fileContent)


    const response = await axios.post(
      'https://as-dev-ahp-d0gjcde4facrabc3.uksouth-01.azurewebsites.net/api/Sync/v1/calculate',
      jsonData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    // Show success toast instead of inline message
    showToastNotification('Analysis completed successfully')
    uploadError.value = false
    responseData.value = response.data
    // Initialize filtered results with all results
    filteredResults.value = response.data.AHPResults || []
    console.log('Response:', response.data)
  } catch (error) {
   
    let errorMessage = 'Upload failed. '
    
    if (error.response) {
      // Server responded with error status
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
    } 
    
    uploadMessage.value = errorMessage
    uploadError.value = true
    responseData.value = null
    showToastNotification(errorMessage, 'error')
  } finally {
    isUploading.value = false
  }
}

// Navigation function
function navigateToOverride(employee) {
  // Store employee data in sessionStorage to pass to the override page
  sessionStorage.setItem('selectedEmployee', JSON.stringify(employee))
  
  // Navigate to the override page
  router.push({ name: 'Overide AhpResult' })
}
</script>
