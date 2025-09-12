<template>
  <div>

    <div class="px-6 py-4">
      <div class="flex items-center">

        <div class="flex items-center">
          <h1 class="text-2xl font-bold text-[#068EC6]">{{ pageTitle }}</h1>
        </div>


        <div class="ml-8">
          <div class="relative">
            <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
             <SearchIcon/>
            </div>
            <input type="text" placeholder="Search..."
              class="block w-80 pl-3 pr-10 py-2 border border-[#DAEBF8] rounded-full text-sm placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
        </div>


        <div class="flex-1"></div>


        <div class="flex items-center space-x-4">
          <div class="relative">
            <button class="text-gray-400 hover:text-gray-600 transition-colors">
              <NotificationIcon />

            </button>

            <span class="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center">
              <span class="text-xs text-white font-medium">3</span>
            </span>
          </div>


          <button class="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer" @click="handleLogout">
            <SettingsIcon />

          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import NotificationIcon from './Icons/NotificationIcon.vue'
import SettingsIcon from './Icons/SettingsIcon.vue'
import { useAuthStore } from '../store/Auth';
import SearchIcon from './Icons/SearchIcon.vue';

const auth = useAuthStore();
const route = useRoute();
const router = useRouter();


const pageTitle = computed(() => {
  const routeName = route.name as string
  return routeName || 'AHP Admin Console'
})

function handleLogout() {
  auth.logout();
  router.push('/');
}
</script>
