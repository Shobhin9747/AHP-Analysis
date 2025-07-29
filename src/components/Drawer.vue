<!-- src/components/Drawer.vue -->
<template>
  <aside
    :class="[
      'fixed top-0 left-0 h-screen transition-all duration-300 text-white z-20 shadow-lg',
      drawerStore.isCollapsed ? 'w-16' : 'w-64',
      'bg-gradient-to-b from-slate-800 via-indigo-900 to-slate-900',
    ]"
  >
    <!-- Logo and Toggle -->
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
      <li>
        <router-link
          to="/app"
          class="flex items-center gap-3 p-3 rounded-md transition"
          active-class="bg-white/10"
          exact-active-class="bg-white/20"
        >
          <HomeIcon class="w-5 h-5" />
          <span v-if="!drawerStore.isCollapsed" class="text-sm">DashBoard</span>
        </router-link>
      </li>
      <li>
        <router-link
          to="/app/employee"
          class="flex items-center gap-3 p-3 rounded-md transition"
          active-class="bg-white/10"
          exact-active-class="bg-white/20"
        >
          <InformationCircleIcon class="w-5 h-5" />
          <span v-if="!drawerStore.isCollapsed" class="text-sm">Employee</span>
        </router-link>
      </li>
      <li>
        <router-link
          to="/app/settings"
          class="flex items-center gap-3 p-3 rounded-md transition"
          active-class="bg-white/10"
          exact-active-class="bg-white/20"
        >
          <Cog6ToothIcon class="w-5 h-5" />
          <span v-if="!drawerStore.isCollapsed" class="text-sm">Settings</span>
        </router-link>
      </li>
    </ul>
  </aside>
</template>

<script lang="ts" setup>
import { useDrawerStore } from "../store/Drawer";
import {
  HomeIcon,
  InformationCircleIcon,
  Cog6ToothIcon,
} from "@heroicons/vue/24/outline";
const drawerStore = useDrawerStore();
</script>
