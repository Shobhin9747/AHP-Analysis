<template>
  <div>

    <div class="py-4 mb-6">
      <div class="flex items-center">

        <div class="flex items-center">
          <h1 class="text-2xl font-bold text-[#068EC6]">{{ resolvedTitle }}</h1>
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

// Optional title override (e.g., show company name on details page)
const props = defineProps<{ title?: string }>()

const pageTitle = computed(() => {
  const routeName = route.name as string
  return routeName || 'AHP Admin Console'
})

const resolvedTitle = computed(() => props.title ?? pageTitle.value)

function handleLogout() {
  auth.logout();
  router.push('/');
}
</script>
