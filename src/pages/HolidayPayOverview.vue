<template>
  <div class="p-3 sm:p-4 lg:p-5 space-y-4 sm:space-y-6 bg-gray-50">
    <div class="flex items-center justify-between pb-2">
      <div class="flex items-center space-x-4">
        <h1 class="text-xl sm:text-2xl font-bold text-[#068EC6]">
          Holiday Pay
        </h1>
        <div class="h-6 border-l border-gray-300"></div>

        <div class="flex space-x-6">
          <button
            v-for="tab in tabs"
            :key="tab"
            @click="activeTab = tab"
            :class="[
              'pb-1 border-b-2',
              activeTab === tab
                ? 'border-[#002D53] font-semibold text-[#022652]'
                : 'border-transparent text-gray-400',
            ]"
          >
            {{ tab }}
          </button>
        </div>
      </div>

      <div class="flex items-center justify-between gap-2">
        <h2 class="text-sm sm:text-base font-semibold text-[#022652]">Weekly Status</h2>
        <div class="h-6 border-l-2 border-[#022652]"></div>
        <ArrowDownTrayIcon class="w-5 h-5 text-blue-500" />
        <h2 class="text-sm sm:text-base text-[#022652]">Download</h2>
      </div>
    </div>
    <keep-alive>
  <component :is="getComponent(activeTab)" />
</keep-alive>

  </div>
</template>

<script setup>
import { ref } from "vue";
import OverviewView from "./section/OverviewView.vue";
import AnalyticsView from "./section/AnalyticsView.vue";
import AhpFlowView from "./section/AhpFlowView.vue";
import { ArrowDownTrayIcon } from "@heroicons/vue/24/outline";
import { ViewColumnsIcon, ListBulletIcon } from '@heroicons/vue/24/outline'

const tabs = ["Overview", "Analytics", "AHP Flow"];
const activeTab = ref("Overview");

const getComponent = (tab) => {
  switch (tab) {
    case "Overview":
      return OverviewView;
    case "Analytics":
      return AnalyticsView;
    case "AHP Flow":
      return AhpFlowView;
    default:
      return OverviewView;
  }
};
</script>
