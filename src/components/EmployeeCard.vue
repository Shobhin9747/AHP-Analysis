<template>
  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 flex-wrap">
    <!-- Profile Info -->
    <div class="flex items-center gap-3 sm:gap-4">
      <img src="https://i.pravatar.cc/60" class="w-12 h-12 sm:w-14 sm:h-14 rounded-full" />
      <div>
        <h2 class="text-base sm:text-lg font-semibold">Vipin Nair</h2>
        <p class="text-xs sm:text-sm text-gray-500">Emp ID - #12345</p>
      </div>
    </div>

    <!-- Employee Type -->
    <div class="flex flex-col sm:items-end">
      <p class="text-xs sm:text-sm text-gray-500">Employee Type</p>
      <p class="text-sm sm:text-base">Weekly Fixed</p>
    </div>

    <!-- Annual Salary -->
    <div class="flex flex-col sm:items-end">
      <p class="text-xs sm:text-sm text-gray-500">Annual Salary</p>
      <p class="text-sm sm:text-base font-medium">£32,630.64</p>
    </div>
  </div>
</template>
