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
            </div>

            <!-- Step Content -->
            <div
              :class="[
                'flex items-center rounded transition-colors duration-200 ml-[15px]',
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
            <!-- Right Arrow -->
            <div
              v-if="currentStep === index"
              class="absolute right-[-13px] w-0 h-0 border-t-[8px] border-b-[8px] border-l-[8px] border-t-transparent border-b-transparent ml-[59px]"
              :class="
                currentStep === index
                  ? 'border-l-green-500'
                  : 'border-l-blue-500'
              "
            ></div>
          </div>
        </div>

        <!-- RIGHT: Step Details -->
        <div class="flex-1 p-6">
          <!-- Description Title -->
          <h2
            class="mb-3"
            style="
              font-family: Inter;
              font-weight: 700;
              font-style: Bold;
              font-size: 28px;
              line-height: 100%;
              letter-spacing: 0%;
              color: #022652;
            "
          >
            {{ steps[currentStep].descriptionTitle }}
          </h2>

          <!-- Description -->
          <p
            class="text-gray-700 mb-4 font-normal text-[16px] leading-6 tracking-normal"
          >
            {{ steps[currentStep].description }}
          </p>

          <!-- Status Box -->
          <div v-if="steps[currentStep].status">
            <!-- Not Applied -->
            <div
              v-if="steps[currentStep].status === 'Not Applied'"
              class="flex items-center p-4 rounded-md bg-[#F9E1E2] text-red-700 mb-4"
            >
              <!-- Left: Tick + Status -->
              <div
                class="flex items-center text-[#022652] font-bold mr-4 whitespace-nowrap"
              >
                <span class="text-red-500 mr-2">✔</span>
                Not Applied
              </div>

              <!-- Vertical Divider -->
              <div class="h-20 border-l border-red-400 mx-4"></div>

              <!-- Right: Why this matters -->
              <p class="text-red-600 text-sm">
                <span class="font-bold">Why this matters:</span>
                this ensures your holiday pay reflects actual work rather than
                inactive weeks.
              </p>
            </div>

            <!-- Applied -->
            <div
              v-else-if="steps[currentStep].status === 'Applied'"
              class="flex items-center p-4 rounded-md bg-green-50 text-green-700 mb-4"
            >
              <!-- Left: Tick + Status -->
              <div class="flex items-center text-[#022652] font-bold mr-4">
                <span class="text-green-500 mr-2">✔</span>
                Applied
              </div>

              <!-- Vertical Divider -->
              <div class="h-20 border-l border-green-400 mx-4"></div>

              <!-- Right: Success message -->
              <p class="text-green-600 text-sm">
                <span class="font-bold">Success:</span>
                this step has been successfully applied to your holiday pay
                calculation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </template>
  </PageLayout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import PageLayout from "../../components/PageLayout.vue";


const defaultSteps = [
  {
    title: "We started by checking how you work",
    descriptionTitle: "Profile & Contract",
    description:
      "You are a Zero Hour worker — holiday pay is based on a percentage of qualifying pay, not fixed hours.",
    note: "Why this matters: this ensures your holiday pay reflects actual work rather than inactive weeks.",
    status: "Applied",
  },
  {
    title: "We checked your contract for special rules",
    descriptionTitle: "Contract Review",
    description:
      "We reviewed your contract for any specific terms that might affect your holiday pay calculation.",
    status: "Not Applied",
  },
  {
    title: "We set the timeframe",
    descriptionTitle: "Reference Period",
    description:
      "We determined the correct period over which your holiday pay should be calculated.",
  },
  {
    title: "We checked your working pattern",
    descriptionTitle: "Work Pattern Analysis",
    description:
      "We verified your average working pattern to ensure accurate pay computation.",
  },
  {
    title: "We calculated your qualifying pay",
    descriptionTitle: "Earnings Calculation",
    description:
      "We calculated the total qualifying pay over the reference period.",
  },
  {
    title: "We applied the Zero-Hour accrual rate",
    descriptionTitle: "Accrual Rate Application",
    description: "We applied the accrual rate specific to zero-hour contracts.",
  },
  {
    title: "We applied the 20-Day Rule",
    descriptionTitle: "Regulatory Adjustment",
    description:
      "We applied the rule to adjust your holiday pay based on the 20-day calculation method.",
  },
  {
    title: "Final AHP result",
    descriptionTitle: "Final Outcome",
    description: "This is your final holiday pay amount after all adjustments.",
  },
];

const steps = ref([...defaultSteps]); // start with defaults
const currentStep = ref(0);

// onMounted(async () => {
//   // Add user-specific context if available
//   const userContext = { contractType: "Zero Hour", role: "Retail Worker" };

//   // Generate AI-personalized steps
//   steps.value = await generateSteps(defaultSteps, userContext);
// });
</script>
