<template>
    <div class="min-h-screen">
        <div>
            <Topbar :title="company?.name || 'Company Details'" />

            <!-- Company Information Cards -->
            <div class="bg-white rounded-lg p-8 border border-gray-200">
                <div class="flex flex-col md:flex-row justify-between gap-8 w-full">
                    <div>
                        <h3 class="text-[14px] font-medium text-[#666666] mb-1">Account Number</h3>
                        <p class="text-[18px] font-semibold text-[#333333]">
                            {{ company?.companyNumber || 'CMP123456789' }}
                        </p>
                    </div>
                    <div>
                        <h3 class="text-[14px] font-medium text-[#666666] mb-1">Type</h3>
                        <p class="text-[18px] font-semibold text-[#333333]">Private Limited</p>
                    </div>
                    <div>
                        <h3 class="text-[14px] font-medium text-[#666666] mb-1">Industry</h3>
                        <p class="text-[18px] font-semibold text-[#333333]">
                            {{ company?.industry || 'Financial Services' }}
                        </p>
                    </div>
                    <div>
                        <h3 class="text-[14px] font-medium text-[#666666] mb-1">Address</h3>
                        <p class="text-[18px] font-semibold text-[#333333]">
                            The Mound, Edinburgh EH1 1YZ
                        </p>
                    </div>
                    <div>
                        <h3 class="text-[14px] font-medium text-[#666666] mb-1">Jurisdiction</h3>
                        <p class="text-[18px] font-semibold text-[#333333]">
                            {{ company?.jurisdiction || 'England' }}
                        </p>
                    </div>
                </div>
            </div>


            <div class="py-[30px]">
                <div class="flex items-center justify-between">
                    <h2 class="text-[20px] font-semibold text-[#022652]">{{ employees.length }} Employees</h2>
                    <button class="flex items-center gap-2 cursor-pointer">
                        <ArrowDownTrayIcon class="h-4 w-4 text-[#068EC6]" />
                        <span class="text-[#333333] text-sm">Download</span>
                    </button>
                </div>
            </div>
            <!-- Employees Section -->
            <div class="bg-white rounded-lg shadow-sm border border-gray-200">


                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead class="bg-white border-b border-gray-200">
                            <tr>
                                <th class="px-6 py-[30px] text-left text-[16px] semi-bold text-[#022652]">
                                    Name</th>
                                <th class="px-6 py-[30px] text-center text-[16px] semi-bold text-[#022652]">
                                    Employee Number</th>
                                <th class="px-6 py-[30px] text-center text-[16px] semi-bold text-[#022652]">
                                    Age</th>
                                <th class="px-6 py-[30px] text-center text-[16px] semi-bold text-[#022652]">
                                    Work Jurisdiction</th>
                                <th class="px-6 py-[30px] text-center text-[16px] semi-bold text-[#022652]">
                                    Residence Jurisdiction</th>
                                <th class="px-6 py-[30px] text-center text-[16px] semi-bold text-[#022652]">
                                    Status</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            <tr v-for="(employee, index) in employees" :key="index" class="hover:bg-gray-50">
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="flex items-center">
                                        <div class="flex-shrink-0 h-10 w-10">
                                            <img
                                                :src="employee.photo"
                                                :alt="employee.name"
                                                class="h-10 w-10 rounded-full object-cover"
                                                @error="handleImageError"
                                            />
                                        </div>
                                        <div class="ml-4">
                                            <div class="text-sm font-medium text-[#333333]">{{ employee.name }}</div>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">{{
                                    employee.employeeNumber
                                }}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">{{
                                    employee.age }}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">{{
                                    employee.workJurisdiction }}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">{{
                                    employee.residenceJurisdiction }}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-center">
                                    <!-- <span class="text-sm font-medium text-gray-900">£{{ employee.salary }}</span> -->
                                    <div class="flex justify-center">
                                        <span
                                            class="inline-flex px-2 py-1 text-sm text-[#5EBA4F]">
                                            {{ employee.status }}
                                        </span>

                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Topbar from '../../components/Topbar.vue'
import { ArrowDownTrayIcon } from "@heroicons/vue/24/outline";
const route = useRoute()

const company = ref<any>(null)

// Mock companies data
const companies = [
    {
        id: 1,
        name: 'Hilton Food Group PLC',
        companyNumber: 'CMP5236987',
        industry: 'Pharma',
        jurisdiction: 'England',
        employeeCount: '254',
        status: 'Active'
    },
    {
        id: 2,
        name: 'Lloyds Banking Group PLC',
        companyNumber: 'CMP5236988',
        industry: 'Banking',
        jurisdiction: 'England',
        employeeCount: '36',
        status: 'Active'
    },
    {
        id: 3,
        name: 'Tesco PLC',
        companyNumber: 'CMP5236989',
        industry: 'Retail',
        jurisdiction: 'England',
        employeeCount: '450',
        status: 'Active'
    },
    {
        id: 4,
        name: 'BP PLC',
        companyNumber: 'CMP5236990',
        industry: 'Energy',
        jurisdiction: 'England',
        employeeCount: '180',
        status: 'Active'
    },
    {
        id: 5,
        name: 'Unilever PLC',
        companyNumber: 'CMP5236991',
        industry: 'Consumer Goods',
        jurisdiction: 'England',
        employeeCount: '320',
        status: 'Active'
    }
]

// Dummy employee data with random photos
const employees = ref([
    {
        name: 'Tiger Nixon',
        employeeNumber: 'EMP5236987',
        age: 61,
        workJurisdiction: 'England',
        residenceJurisdiction: 'Manchester',
        salary: '627.51',
        status: 'Active',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    {
        name: 'Manson Florick',
        employeeNumber: 'EMP5236988',
        age: 45,
        workJurisdiction: 'England',
        residenceJurisdiction: 'London',
        salary: '742.30',
        status: 'Active',
        photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    {
        name: 'Sarah Johnson',
        employeeNumber: 'EMP5236989',
        age: 38,
        workJurisdiction: 'England',
        residenceJurisdiction: 'Manchester',
        salary: '589.20',
        status: 'Active',
        photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    },
    {
        name: 'David Wilson',
        employeeNumber: 'EMP5236990',
        age: 52,
        workJurisdiction: 'England',
        residenceJurisdiction: 'Birmingham',
        salary: '675.80',
        status: 'Active',
        photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
    },
    {
        name: 'Emma Brown',
        employeeNumber: 'EMP5236991',
        age: 29,
        workJurisdiction: 'England',
        residenceJurisdiction: 'Leeds',
        salary: '543.90',
        status: 'Active',
        photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    },
    {
        name: 'Michael Davis',
        employeeNumber: 'EMP5236992',
        age: 41,
        workJurisdiction: 'England',
        residenceJurisdiction: 'Liverpool',
        salary: '612.45',
        status: 'Active',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    {
        name: 'Lisa Anderson',
        employeeNumber: 'EMP5236993',
        age: 35,
        workJurisdiction: 'England',
        residenceJurisdiction: 'Newcastle',
        salary: '598.75',
        status: 'Active',
        photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face'
    },
    {
        name: 'James Taylor',
        employeeNumber: 'EMP5236994',
        age: 47,
        workJurisdiction: 'England',
        residenceJurisdiction: 'Sheffield',
        salary: '689.20',
        status: 'Active',
        photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face'
    },
    {
        name: 'Rachel Green',
        employeeNumber: 'EMP5236995',
        age: 33,
        workJurisdiction: 'England',
        residenceJurisdiction: 'Bristol',
        salary: '556.30',
        status: 'Active',
        photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face'
    },
    {
        name: 'Robert White',
        employeeNumber: 'EMP5236996',
        age: 44,
        workJurisdiction: 'England',
        residenceJurisdiction: 'Nottingham',
        salary: '634.85',
        status: 'Active',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    {
        name: 'Jennifer Black',
        employeeNumber: 'EMP5236997',
        age: 31,
        workJurisdiction: 'England',
        residenceJurisdiction: 'Leicester',
        salary: '571.40',
        status: 'Active',
        photo: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face'
    },
    {
        name: 'Christopher Lee',
        employeeNumber: 'EMP5236998',
        age: 39,
        workJurisdiction: 'England',
        residenceJurisdiction: 'Coventry',
        salary: '603.15',
        status: 'Active',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    {
        name: 'Amanda Clark',
        employeeNumber: 'EMP5236999',
        age: 26,
        workJurisdiction: 'England',
        residenceJurisdiction: 'Bradford',
        salary: '525.60',
        status: 'Active',
        photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    },
    {
        name: 'Daniel Lewis',
        employeeNumber: 'EMP5237000',
        age: 50,
        workJurisdiction: 'England',
        residenceJurisdiction: 'Cardiff',
        salary: '712.90',
        status: 'Active',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    {
        name: 'Michelle Walker',
        employeeNumber: 'EMP5237001',
        age: 36,
        workJurisdiction: 'England',
        residenceJurisdiction: 'Belfast',
        salary: '587.25',
        status: 'Active',
        photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face'
    }
])

const handleImageError = (event: Event) => {
    const target = event.target as HTMLImageElement
    // Fallback to a default avatar or initials if image fails to load
    target.style.display = 'none'
    const parent = target.parentElement
    if (parent) {
        parent.innerHTML = `<div class="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
            <span class="text-sm font-medium text-gray-700">${target.alt?.charAt(0) || '?'}</span>
        </div>`
    }
}

onMounted(() => {
    const companyId = parseInt(route.params.id as string)
    company.value = companies.find(c => c.id === companyId)
})
</script>