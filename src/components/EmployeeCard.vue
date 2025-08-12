<template>
  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 flex-wrap">
    <!-- Profile Info -->
    <div class="flex items-center gap-3 sm:gap-4">
      <img :src="Profile" class="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 object-cover rounded-full" />
      <div>
        <h2 class="text-base sm:text-lg font-semibold">Vipin Nair</h2>
        <p class="text-xs sm:text-sm text-gray-500">Emp ID - #12345</p>
        <h2 class="text-base sm:text-lg font-semibold">Senior Architect</h2>
        <p class="text-xs sm:text-sm text-gray-500">Larsen & Toubr</p>
      </div>
    </div>

    <!-- Employee Type -->
    <div class="flex flex-col sm:items-end">
      <p class="text-xs sm:text-sm text-gray-500">Employee Type</p>
      <p class="text-sm sm:text-base">Weekly Fixed</p>
    </div>

    <div class="flex flex-col sm:items-end">
      <p class="text-xs sm:text-sm text-gray-500">Work Pattern</p>
      <p class="text-sm sm:text-base">Mon-Fri</p>
    </div>

    <div class="flex flex-col sm:items-end">
      <p class="text-xs sm:text-sm text-gray-500">Timing</p>
      <p class="text-sm sm:text-base">9:00-17:00</p>
    </div>

    <!-- Annual Salary -->
    <div class="flex flex-col sm:items-end">
      <p class="text-xs sm:text-sm text-gray-500">Annual Salary</p>
      <p class="text-sm sm:text-base font-medium">£32,630.64</p>
    </div>
  </div>
</template>
<script setup>
import Profile from '../assets/Profile.png'
 </script>
