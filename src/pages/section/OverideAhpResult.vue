<template>
  <Topbar />
  <div class="bg-white rounded p-2">
    <!-- Main Content -->
    <div class="max-w-8xl mx-auto px-4 py-3">
      <div class="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        <!-- Employee Info Section -->
        <div class="xl:col-span-1">
          <div class="bg-white/80 backdrop-blur-sm shadow-xl rounded-3xl p-6 border border-white/20 sticky">
            <h2 class="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
              Employee Details
            </h2>

            <div v-if="selectedEmployee" class="space-y-4">
              <!-- Employee Header -->
              <div class="bg-gradient-to-r from-[#195384] to-[#11376D] p-4 text-white rounded-xl">
                <div class="text-center">
                  <h3 class="text-lg font-bold mb-1">{{ selectedEmployee.EmployeeNumber }}</h3>
                 
                </div>
              </div>

              <!-- Current AHP Values -->
              <div class="bg-gray-50 rounded-xl p-4">
                <h4 class="text-sm font-semibold text-gray-800 mb-3">Current AHP Values</h4>
                <div class="space-y-2 text-sm">
                  <div class="flex justify-between items-center py-2 border-b border-gray-200">
                    <span class="text-gray-600">Basic Pay AHP:</span>
                    <span class="font-semibold text-gray-800">{{ parseFloat(selectedEmployee.AHPWithBasicPay).toFixed(2) }}</span>
                  </div>
                  <div class="flex justify-between items-center py-2">
                    <span class="text-gray-600">All Components AHP:</span>
                    <span class="font-semibold text-gray-800">{{ parseFloat(selectedEmployee.AHPWithAllEligibleComponents).toFixed(2) }}</span>
                  </div>
                </div>
              </div>

              <!-- Back Button -->
              <button
                @click="goBack"
                class="w-full py-3 px-4 rounded-xl font-semibold text-white bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 transition-all duration-300"
              >
                <div class="flex items-center justify-center">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                  </svg>
                  Back to Results
                </div>
              </button>
            </div>

            <div v-else class="text-center py-8">
              <div class="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-800 mb-2">No Employee Selected</h3>
              <p class="text-gray-600 text-sm">Please go back to select an employee</p>
            </div>
          </div>
        </div>

        <!-- Override Form Section -->
        <div class="xl:col-span-2">
          <div v-if="selectedEmployee" class="space-y-6">
            <h3 class="text-xl font-semibold text-gray-800 flex items-center">
              <svg class="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
              Override AHP Values
            </h3>
            
            <!-- Override Form -->
            <div class="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <form @submit.prevent="submitOverride" class="space-y-6">
                <!-- Basic Pay AHP Input -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    New Basic Pay AHP
                  </label>
                  <input
                    v-model="overrideData.newBasicPayAHP"
                    type="number"
                    step="0.01"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-lg"
                    placeholder="Enter new AHP value"
                  />
                 
                </div>

                <!-- All Components AHP Input -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Overide Reason
                  </label>
                  <input
                   v-model="overrideData.OverrideReason"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-lg"
                    placeholder="Enter Overide Reason"
                  />
                 
                </div>

                <!-- Action Buttons -->
                <div class="flex space-x-4 pt-4">
                  <button
                    type="submit"
                    :disabled="isSubmittingOverride || !overrideData.newBasicPayAHP || !overrideData.OverrideReason"
                    :class="[
                      'flex-1 py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300',
                      isSubmittingOverride || !overrideData.newBasicPayAHP || !overrideData.OverrideReason
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105 shadow-lg hover:shadow-xl'
                    ]"
                  >
                    <div class="flex items-center justify-center">
                      <svg v-if="isSubmittingOverride" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <svg v-else class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      {{ isSubmittingOverride ? 'Submitting...' : 'Submit Override' }}
                    </div>
                  </button>

                  <button
                    type="button"
                    @click="resetValues"
                    :disabled="isSubmittingOverride"
                    :class="[
                      'flex-1 py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300',
                      isSubmittingOverride
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 hover:scale-105 shadow-lg hover:shadow-xl'
                    ]"
                  >
                    <div class="flex items-center justify-center">
                      <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"></path>
                      </svg>
                      Reverse AHP
                    </div>
                  </button>
                </div>
              </form>

            </div>
          </div>

          <!-- Empty State -->
          <div v-else class="bg-white rounded-2xl shadow-lg border border-gray-200 p-12 text-center">
            <div class="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-800 mb-2">No Employee Selected</h3>
            <p class="text-gray-600 text-sm">Please go back to select an employee to override AHP values</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import Topbar from '../../components/Topbar.vue'

const router = useRouter()

const selectedEmployee = ref(null)
const overrideData = ref({
  newBasicPayAHP: '',
  OverrideReason: ''
})
const isSubmittingOverride = ref(false)
const overrideMessage = ref('')
const overrideError = ref(false)

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

function resetValues() {
  
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
      OverrideReason: parseFloat(overrideData.value.OverrideReason)
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
   
    // Auto-redirect after successful submission
    setTimeout(() => {
      goBack()
    }, 3000)

  } catch (error) {
    
    let errorMessage = 'Override failed. '
    
    overrideMessage.value = errorMessage
    overrideError.value = true
  } finally {
    isSubmittingOverride.value = false
  }
}
</script>