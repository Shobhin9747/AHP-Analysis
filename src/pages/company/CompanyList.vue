<template>
    <div class="min-h-screen bg-gray-50">
        <Topbar />
        <div class="p-6">
           
            <div class="flex items-center justify-between mb-6">
                <h1 class="text-sm font-semibold text-[#022652]">25 Companies</h1>
                <button class="flex items-center gap-2 cursor-pointer">
                    <ArrowDownTrayIcon class="h-4 w-4 text-[#068EC6]" />
                    <span class="text-[#333333] text-sm">Download</span>
                </button>
            </div>

            
            <div class="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead class="border-b border-[#F4F4F4]">
                            <tr>
                                <th class="px-6 py-4 text-left text-base font-medium text-[#022652] ">
                                    Name</th>
                                <th class="px-6 py-4 text-left text-base font-medium text-[#022652]">
                                    Company Number</th>
                                <th class="px-6 py-4 text-left text-base font-medium text-[#022652]">
                                    Industry</th>
                                <th class="px-6 py-4 text-left text-base font-medium text-[#022652]">
                                    Jurisdiction</th>
                                <th class="px-6 py-4 text-center text-base font-medium text-[#022652]">
                                    Employee Count</th>
                                <th class="px-6 py-4 text-left text-base font-medium text-[#022652]">
                                    Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(company, index) in companies" :key="index" 
                                :class="['hover:bg-gray-50', index < companies.length - 1 ? 'border-b border-[#F4F4F4]' : '']">
                                <td class="px-6 py-5 whitespace-nowrap">
                                    <div class="flex items-center gap-1">
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
import Topbar from '../../components/Topbar.vue'
import { ArrowDownTrayIcon } from "@heroicons/vue/24/outline";
import CompanyIcon from '../../components/Icons/CompanyIcon.vue';

const companies = [
    {
        name: 'Hilton Food Group PLC',
        companyNumber: 'CMP5236987',
        industry: 'Pharma',
        jurisdiction: 'England',
        employeeCount: '254',
        status: 'Active'
    },
    {
        name: 'Lloyds Banking Group PLC',
        companyNumber: 'CMP5236987',
        industry: 'Banking',
        jurisdiction: 'England',
        employeeCount: '36',
        status: 'Active'
    },
    {
        name: 'Hilton Food Group PLC',
        companyNumber: 'CMP5236987',
        industry: 'Pharma',
        jurisdiction: 'England',
        employeeCount: '254',
        status: 'Active'
    },
    {
        name: 'Hilton Food Group PLC',
        companyNumber: 'CMP5236987',
        industry: 'Pharma',
        jurisdiction: 'England',
        employeeCount: '254',
        status: 'Active'
    },
    {
        name: 'Hilton Food Group PLC',
        companyNumber: 'CMP5236987',
        industry: 'Pharma',
        jurisdiction: 'England',
        employeeCount: '254',
        status: 'Active'
    },
    {
        name: 'Hilton Food Group PLC',
        companyNumber: 'CMP5236987',
        industry: 'Pharma',
        jurisdiction: 'England',
        employeeCount: '254',
        status: 'Active'
    },
    {
        name: 'Hilton Food Group PLC',
        companyNumber: 'CMP5236987',
        industry: 'Pharma',
        jurisdiction: 'England',
        employeeCount: '254',
        status: 'Active'
    },
    {
        name: 'Hilton Food Group PLC',
        companyNumber: 'CMP5236987',
        industry: 'Pharma',
        jurisdiction: 'England',
        employeeCount: '254',
        status: 'Active'
    },
    {
        name: 'Hilton Food Group PLC',
        companyNumber: 'CMP5236987',
        industry: 'Pharma',
        jurisdiction: 'England',
        employeeCount: '254',
        status: 'Active'
    },
    {
        name: 'Hilton Food Group PLC',
        companyNumber: 'CMP5236987',
        industry: 'Pharma',
        jurisdiction: 'England',
        employeeCount: '254',
        status: 'Active'
    }
]
</script>