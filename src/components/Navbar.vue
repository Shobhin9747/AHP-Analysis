<template>
  <div class="flex justify-between items-center h-16 px-6 shadow-md bg-white">
    <!-- Left Header: Route Title -->
    <div class="flex items-center gap-3 animate-fade-in">
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
      <h1 class="text-xl font-semibold tracking-wide text-gray-800 capitalize drop-shadow-sm">
        {{ route.meta.title || route.name || 'Welcome' }}
      </h1>
    </div>

    <!-- Avatar + Dropdown -->
    <div class="relative">
      <div
        @click="toggleDropdown"
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
        <div class="hidden md:flex flex-col leading-tight">
          <span class="text-sm font-semibold text-gray-800">{{ auth.user?.role }}</span>
          <span class="text-xs text-gray-500">{{ auth.user?.email }}</span>
        </div>
      </div>

      <!-- Dropdown -->
      <div
        v-if="dropdownOpen"
        class="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg ring-1 ring-black/10 z-50"
      >
        <ul class="text-sm text-gray-700">
          <li>
            <button
              @click="logout"
              class="w-full text-left px-4 py-2 hover:bg-gray-100 transition"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>


<script lang="ts" setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '../store/Auth';

const route = useRoute();
const router = useRouter();
const auth = useAuthStore();

const dropdownOpen = ref(false);

function toggleDropdown() {
  dropdownOpen.value = !dropdownOpen.value;
}

function logout() {
  auth.logout();
  dropdownOpen.value = false;
  router.push('/');
}
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

