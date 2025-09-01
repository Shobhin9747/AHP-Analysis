<template>
  <div class="p-3 sm:p-4 lg:p-5 space-y-4 sm:space-y-6 bg-gray-50">
    <!-- GRID CONTAINER -->
    <div class="grid grid-cols-12 items-center pb-2">
      
      <!-- LEFT SECTION (col-span-8) -->
      <div class="col-span-8 flex items-center space-x-4">
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
              'pb-1 border-b-2 font-semibold',
              activeTab === tab
                ? 'border-[#002D53] text-[#022652]'
                : 'border-[#E9F1F8] text-[#A4B2BD]',
            ]"
          >
            {{ tab }}
          </button>
        </div>
      </div>

      <!-- RIGHT SECTION (col-span-4) -->
      <div class="col-span-4 flex items-center justify-between p-2 ml-2">
        <!-- LEFT PART inside RIGHT SECTION -->
        <div class="flex items-center gap-2">
        <h2 class="font-semibold text-[20px] leading-[100%] tracking-normal text-[#022652]">
  Weekly Status
</h2>

          <div class="h-6 border-l-2 border-[#022652]"></div>
          <ArrowDownTrayIcon class="w-5 h-5 text-blue-500" />
<h2 class="text-[14px] leading-[100%] tracking-normal text-[#022652]">
  Download
</h2>
        </div>

        <!-- BUTTONS inside RIGHT SECTION -->
        <div class="flex items-center gap-2">
          <!-- First Grid Button -->
          <button class="p-1 hover:bg-blue-50">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect width="24" height="23" transform="translate(0 0.5)" fill="white"/>
              <rect x="0.5" y="1" width="23" height="9" stroke="#068EC6"/>
              <path d="M23.5 14V23H0.5V14H23.5Z" stroke="#068EC6"/>
            </svg>
          </button>

          <!-- Second Grid Button -->
          <button class="p-1 hover:bg-blue-50">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <g opacity="0.25">
                <rect y="0.5" width="5" height="3" fill="#068EC6"/>
                <rect x="6" y="0.5" width="18" height="3" fill="#068EC6"/>
                <rect y="5.5" width="5" height="3" fill="#068EC6"/>
                <rect x="6" y="5.5" width="18" height="3" fill="#068EC6"/>
                <rect y="10.5" width="5" height="3" fill="#068EC6"/>
                <rect x="6" y="10.5" width="18" height="3" fill="#068EC6"/>
                <rect y="15.5" width="5" height="3" fill="#068EC6"/>
                <rect x="6" y="15.5" width="18" height="3" fill="#068EC6"/>
                <rect y="20.5" width="5" height="3" fill="#068EC6"/>
                <rect x="6" y="20.5" width="18" height="3" fill="#068EC6"/>
              </g>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- COMPONENT -->
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
import { ViewColumnsIcon, ListBulletIcon } from "@heroicons/vue/24/outline";

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
