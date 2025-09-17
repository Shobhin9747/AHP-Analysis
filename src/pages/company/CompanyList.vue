<template>
    <div class="min-h-screen">
        <div>
            <Topbar />

            <div class="flex items-center justify-between mb-6">
                <h1 class="text-[20px] font-semibold text-[#022652]">25 Companies</h1>
                <button class="flex items-center gap-2 cursor-pointer">
                    <ArrowDownTrayIcon class="h-4 w-4 text-[#068EC6]" />
                    <span class="text-[#333333] text-[14px]">Download</span>
                </button>
            </div>

            
            <div class="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead class="border-b border-[#F4F4F4]">
                            <tr>
                                <th class="px-6 py-[30px] text-left text-[16px] font-semibold text-[#022652]">
                                    Name</th>
                                <th class="px-6 py-[30px] text-left text-[16px] font-semibold text-[#022652]">
                                    Company Number</th>
                                <th class="px-6 py-[30px] text-left text-[16px] font-semibold text-[#022652]">
                                    Industry</th>
                                <th class="px-6 py-[30px] text-left text-[16px] font-semibold text-[#022652]">
                                    Jurisdiction</th>
                                <th class="px-6 py-[30px] text-left text-[16px] font-semibold text-[#022652]">
                                    Employee Count</th>
                                <th class="px-6 py-[30px] text-left text-[16px] font-semibold text-[#022652]">
                                    Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(company, index) in companies" :key="index" 
                                :class="['hover:bg-gray-50 cursor-pointer', index < companies.length - 1 ? 'border-b border-[#F4F4F4]' : '']"
                                @click="handleCompanyClick(company.id)">
                                <td class="px-6 py-5 whitespace-nowrap">
                                    <div class="flex items-center gap-2">
                                        <CompanyIcon />
                                        <div class="text-sm font-medium text-[#333333]">{{ company.name }}</div>
                                    </div>
                                </td>
                                <td class="px-6 py-5 whitespace-nowrap text-sm text-[#333333]">{{ company.companyNumber
                                    }}</td>
                                <td class="px-6 py-5 whitespace-nowrap text-sm text-[#333333]">{{ company.industry }}
                                </td>
                                <td class="px-6 py-5 whitespace-nowrap text-sm text-[#333333]">{{ company.jurisdiction
                                }}
                                </td>
                                <td class="px-6 py-5 whitespace-nowrap text-center text-sm text-[#333333]">{{
                                    company.employeeCount
                                }}</td>
                                <td class="px-6 py-5 whitespace-nowrap">
                                    <span
                                        class="inline-flex px-2 py-1 text-xs font-semibold rounded-full text-[#5EBA4F]">
                                        {{ company.status }}
                                    </span>
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
import { useRouter } from 'vue-router'
import Topbar from '../../components/Topbar.vue'
import { ArrowDownTrayIcon } from "@heroicons/vue/24/outline";
import CompanyIcon from '../../components/Icons/CompanyIcon.vue';

const router = useRouter()

const handleCompanyClick = (companyId: number) => {
    router.push(`/admin/company/${companyId}`)
}

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
    },
    {
        id: 6,
        name: 'GlaxoSmithKline PLC',
        companyNumber: 'CMP5236992',
        industry: 'Pharma',
        jurisdiction: 'England',
        employeeCount: '280',
        status: 'Active'
    },
    {
        id: 7,
        name: 'AstraZeneca PLC',
        companyNumber: 'CMP5236993',
        industry: 'Pharma',
        jurisdiction: 'England',
        employeeCount: '195',
        status: 'Active'
    },
    {
        id: 8,
        name: 'Vodafone Group PLC',
        companyNumber: 'CMP5236994',
        industry: 'Telecommunications',
        jurisdiction: 'England',
        employeeCount: '220',
        status: 'Active'
    },
    {
        id: 9,
        name: 'Rolls-Royce Holdings PLC',
        companyNumber: 'CMP5236995',
        industry: 'Aerospace',
        jurisdiction: 'England',
        employeeCount: '150',
        status: 'Active'
    },
    {
        id: 10,
        name: 'Diageo PLC',
        companyNumber: 'CMP5236996',
        industry: 'Beverages',
        jurisdiction: 'England',
        employeeCount: '95',
        status: 'Active'
    }
]
</script>