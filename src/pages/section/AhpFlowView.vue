<template>
    <PageLayout>
            <template #content>
  <div class="flex bg-[#EEF4F8] p-6 space-x-8">
    <!-- LEFT: Steps List -->
    <div class="relative">
      <!-- Vertical Line -->
      <div class="absolute top-0 bottom-0 left-4 w-0.5 bg-gray-300"></div>

      <div
        v-for="(step, index) in steps"
        :key="index"
        class="relative flex items-center mb-4 cursor-pointer"
        @click="currentStep = index"
      >
        <!-- Step Number -->
        <div
          class="relative flex items-center justify-center w-8 h-8 rounded border-2 text-sm font-bold z-10 transition-colors duration-200 bg-white"
          :class="
            currentStep === index
              ? 'border-green-500 text-green-600'
              : 'border-blue-500 text-blue-600'
          "
        >
          {{ index + 1 }}

          <!-- Right Arrow -->
          <div
            v-if="currentStep === index"
            class="absolute right-[-8px] w-0 h-0 border-t-[8px] border-b-[8px] border-l-[8px] border-t-transparent border-b-transparent"
            :class="
              currentStep === index ? 'border-l-green-500' : 'border-l-blue-500'
            "
          ></div>
        </div>

        <!-- Step Content -->
        <div
          :class="[
            'flex items-center rounded transition-colors duration-200',
            currentStep === index
              ? 'bg-white border-green-200'
              : 'bg-[#F5FCFF] border-transparent',
          ]"
          style="width: 420px; height: 80px; padding-left: 20px"
        >
          <p
            :class="[
              'text-sm font-medium',
              currentStep === index ? 'text-green-700' : 'text-blue-900',
            ]"
          >
            {{ step.title }}
          </p>
        </div>
      </div>
    </div>

    <!-- RIGHT: Step Details -->
    <div class="flex-1 bg-white shadow rounded-lg p-6">
      <h2 class="text-lg font-bold text-[#002D53] mb-3">
        {{ steps[currentStep].title }}
      </h2>
      <p class="text-gray-700 mb-4">
        {{ steps[currentStep].description }}
      </p>

      <div
        v-if="steps[currentStep].note"
        class="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-3 mb-4"
      >
        {{ steps[currentStep].note }}
      </div>

      <div
        v-if="steps[currentStep].status"
        class="text-green-600 font-semibold"
      >
        ✔ {{ steps[currentStep].status }}
      </div>
    </div>
  </div>
            </template>
  </PageLayout>
</template>

<script setup>
import { ref } from "vue";
import PageLayout from "../../components/PageLayout.vue";
const steps = [
  {
    title: "We started by checking how you work",
    description:
      "You are a Zero Hour worker — holiday pay is based on a percentage of qualifying pay, not fixed hours.",
    note: "Why this matters: this ensures your holiday pay reflects actual work rather than inactive weeks.",
    status: "Applied",
  },
  {
    title: "We checked your contract for special rules",
    description:
      "We reviewed your contract for any specific terms that might affect your holiday pay calculation.",
  },
  {
    title: "We set the timeframe",
    description:
      "We determined the correct period over which your holiday pay should be calculated.",
  },
  {
    title: "We checked your working pattern",
    description:
      "We verified your average working pattern to ensure accurate pay computation.",
  },
  {
    title: "We calculated your qualifying pay",
    description:
      "We calculated the total qualifying pay over the reference period.",
  },
  {
    title: "We applied the Zero-Hour accrual rate",
    description: "We applied the accrual rate specific to zero-hour contracts.",
  },
  {
    title: "We applied the 20-Day Rule",
    description:
      "We applied the rule to adjust your holiday pay based on the 20-day calculation method.",
  },
  {
    title: "Final AHP result",
    description: "This is your final holiday pay amount after all adjustments.",
  },
];

const currentStep = ref(0);
</script>
