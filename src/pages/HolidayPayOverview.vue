<template>
  <div class="p-3 sm:p-4 lg:p-5 space-y-4 sm:space-y-6 bg-gray-50">
    <!-- Top Bar -->
    <div class="flex items-center space-x-4 pb-2">
      <h1 class="text-xl sm:text-2xl font-bold text-[#068EC6]">Holiday Pay</h1>
      <div class="h-6 border-l border-gray-300"></div>

      <!-- Tabs -->
      <div class="flex space-x-6">
        <button
          v-for="tab in tabs"
          :key="tab"
          @click="activeTab = tab"
          :class="[
            'pb-1 border-b-2',
            activeTab === tab
              ? 'border-[#002D53] font-semibold text-[#022652]'
              : 'border-transparent text-gray-400'
          ]"
        >
          {{ tab }}
        </button>
      </div>
    </div>

    <!-- Dynamic Content -->
    <component :is="getComponent(activeTab)" />
  </div>
</template>

<script setup>
import { ref } from "vue";

// Import all 3 possible components
import OverviewView from "./section/OverviewView.vue";
import AnalyticsView from "./section/AnalyticsView.vue";
import AhpFlowView from "./section/AhpFlowView.vue";

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
