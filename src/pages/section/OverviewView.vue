<template>
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
    <!-- Left Section -->
    <div class="lg:col-span-8 space-y-4 sm:space-y-6">
      <div class="bg-white shadow rounded-lg p-4 sm:p-6">
        <EmployeeCard />

        <!-- StatsCards Grid -->
        <div class="mt-4 sm:mt-6">
          <StatsCards />
        </div>
      </div>

      <PayBreakdown />
    </div>

    <!-- Right Section -->
    <div class="lg:col-span-4 space-y-3 sm:space-y-4">
      <div class="bg-white shadow rounded-lg p-4">
        <h2 class="text-lg sm:text-xl font-bold text-[#068EC6] mb-4">
          Weekly Status
        </h2>
        <div class="space-y-3">
          <WeekStatus
            :week="1"
            :amount="600"
            :dates="'28 Jul 2025 - 05 Aug 2025'"
          />
          <WeekStatus
            :week="2"
            :amount="550"
            :dates="'15 Jul 2025 - 21 Jul 2025'"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import EmployeeCard from "../../components/EmployeeCard.vue";
import StatsCards from "../../components/StatsCards.vue";
import PayBreakdown from "../../components/PayBreakdown.vue";
import WeekStatus from "../../components/WeekStatus.vue";
</script>
