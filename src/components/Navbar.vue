<template>
  <div class="flex justify-between items-center h-16 px-6 shadow-md bg-white">
    <!-- Left Header: Route Title -->
    <div class="flex items-center gap-3 animate-fade-in">
      <!-- Optional Icon -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 text-indigo-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3 12l2-2m0 0l7-7 7 7m-2 2v6a2 2 0 002 2h-6a2 2 0 01-2-2v-6m0 0l-2 2m2-2l2 2"
        />
      </svg>

      <!-- Route Name or Title -->
      <h1 class="text-xl font-semibold tracking-wide text-gray-800 capitalize drop-shadow-sm">
        {{ route.meta.title || route.name || 'Welcome' }}
      </h1>
    </div>

    <!-- Right: Avatar -->
    <div
      class="group flex items-center gap-3 cursor-pointer px-3 py-1 rounded-full transition-all duration-300 hover:bg-gray-100"
    >
      <div class="relative">
        <img
          src="https://i.pravatar.cc/40"
          alt="User Avatar"
          class="w-10 h-10 rounded-full ring-2 ring-indigo-400 group-hover:ring-4 transition-all duration-300 shadow"
        />
        <span class="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></span>
      </div>
      <div class="hidden md:flex flex-col leading-tight text-right">
        <span class="text-sm font-semibold text-gray-800">Admin</span>
        <span class="text-xs text-gray-500">TC001</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in {
  animation: fade-in 0.4s ease-out;
}
</style>

