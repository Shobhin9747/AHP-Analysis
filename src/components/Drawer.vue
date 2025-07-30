<template>
  <aside
    :class="[
      'fixed top-0 left-0 h-screen transition-all duration-300 text-white z-20 shadow-lg',
      drawerStore.isCollapsed ? 'w-16' : 'w-64',
      'bg-gradient-to-b from-slate-800 via-indigo-900 to-slate-900',
    ]"
  >
    <!-- Logo & Toggle -->
    <div class="flex items-center justify-between p-4 border-b border-white/10">
      <h2 v-if="!drawerStore.isCollapsed" class="text-lg font-semibold">
        AHP Analysis
      </h2>
      <button
        @click="drawerStore.toggle"
        class="text-white text-xl focus:outline-none cursor-pointer"
      >
        ☰
      </button>
    </div>

    <!-- Navigation -->
    <ul class="mt-6 space-y-1 px-2">
      <li v-for="item in menuItems" :key="item.name">
        <router-link
          :to="item.path"
          class="flex items-center gap-3 p-3 rounded-md transition"
          active-class="bg-white/10"
          exact-active-class="bg-white/20"
        >
          <component :is="item.icon" class="w-5 h-5" />
          <span v-if="!drawerStore.isCollapsed" class="text-sm">{{ item.name }}</span>
        </router-link>
      </li>
    </ul>
  </aside>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useDrawerStore } from '../store/Drawer';
import { useAuthStore } from '../store/Auth';

import {
  HomeIcon,
  InformationCircleIcon,
  Cog6ToothIcon,
  GlobeAltIcon,
  BuildingOfficeIcon,
  ClipboardDocumentListIcon,
  CurrencyDollarIcon,
  CalendarDaysIcon,
  ClockIcon,
} from '@heroicons/vue/24/outline';

const drawerStore = useDrawerStore();
const auth = useAuthStore();

const menuItems = computed(() => {
  const role = auth.user?.role;

  if (role === 'admin') {
    return [
      { name: 'Dashboard', path: '/app', icon: HomeIcon },
      { name: 'Jurisdiction', path: '/app/jurisdiction', icon: GlobeAltIcon },
      { name: 'Company', path: '/app/company', icon: BuildingOfficeIcon },
      { name: 'Contract Type', path: '/app/contract-type', icon: ClipboardDocumentListIcon },
      { name: 'Pay Component', path: '/app/pay-component', icon: CurrencyDollarIcon },
      { name: 'Holiday Policy', path: '/app/holiday-policy', icon: CalendarDaysIcon },
      { name: 'Working Pattern', path: '/app/working-pattern', icon: ClockIcon },
      { name: 'Settings', path: '/app/settings', icon: Cog6ToothIcon },
    ];
  }

  if (role === 'director') {
    return [
      { name: 'Dashboard', path: '/app', icon: HomeIcon },
      { name: 'Employee', path: '/app/employee', icon: InformationCircleIcon },
      { name: 'Settings', path: '/app/settings', icon: Cog6ToothIcon },
    ];
  }

  if (role === 'employee') {
    return [
      { name: 'Dashboard', path: '/app', icon: HomeIcon },
      { name: 'Profile', path: '/app/employee', icon: InformationCircleIcon },
    ];
  }

  return [];
});
</script>
