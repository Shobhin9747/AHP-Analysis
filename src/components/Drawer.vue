<template>
  <aside
    :class="[
      'fixed top-0 left-0 h-screen transition-all duration-300 text-white z-20 shadow-lg flex flex-col',
      drawerStore.isCollapsed ? 'w-16' : 'w-64',
    ]"
  >
    <!-- Logo & Toggle -->
    <div
      :class="[
        'flex items-center gap-2 p-4 border-b border-white/10 flex-shrink-0',
        drawerStore.isCollapsed ? 'justify-center' : 'justify-start'
      ]"
    >
      <button
        @click="drawerStore.toggle"
        class="text-[#023769] p-1 rounded focus:outline-none cursor-pointer hover:bg-white/10"
        aria-label="Toggle menu"
      >
        <Bars3Icon class="w-6 h-6" />
      </button>
      <img
        v-if="!drawerStore.isCollapsed"
        :src="logoImage"
        alt="Company Logo"
        class="h-7 object-contain"
      />
    </div>

    <!-- Navigation -->
    <ul
      class="flex-1 overflow-y-auto mt-6 space-y-1 px-2 pb-4 custom-scrollbar"
    >
      <li v-for="item in menuItems" :key="item.name">
        <router-link
          :to="item.path"
          :title="drawerStore.isCollapsed ? item.name : ''"
          :class="[
            'flex items-center gap-3 p-3 rounded-md transition',
            isMenuActive(item) ? 'text-[#022652] font-medium' : 'text-[#022652] font-normal',
          ]"
        >
          <component :is="item.icon" class="w-5 h-5 flex-shrink-0" />
          <span v-if="!drawerStore.isCollapsed" class="text-sm truncate">{{
            item.name
          }}</span>
        </router-link>
      </li>
    </ul>
    <div
      class="flex items-center gap-3 p-4 border-t border-white/10 flex-shrink-0"
    >
      <img
        src="https://i.pravatar.cc/40"
        alt="User Avatar"
        class="w-8 h-8 rounded-full ring-2 ring-indigo-400 group-hover:ring-4 transition-all duration-300 shadow"
      />
      <div v-if="!drawerStore.isCollapsed">
        <p class="text-sm font-medium text-gray-400">{{ auth.user?.email }}</p>
        <p class="text-xs text-gray-400">{{ auth.user?.role }}</p>
      </div>
    </div>
  </aside>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useDrawerStore } from "../store/Drawer";
import { useAuthStore } from "../store/Auth";

import { HomeIcon, InformationCircleIcon, Cog6ToothIcon, Bars3Icon } from "@heroicons/vue/24/outline";
import CustomIcon from "./Icons/CustomIcon.vue";
import logoImage from "../assets/logo.png"

const drawerStore = useDrawerStore();
const auth = useAuthStore();
const route = useRoute();

const menuItems = computed(() => {
  const role = auth.user?.role;

  if (role === "admin") {
    return [
      { name: "Dashboard", path: "/app", icon: CustomIcon },
      { name: "Jurisdiction", path: "/app/jurisdiction", icon: CustomIcon },
      { name: "Company", path: "/app/company", icon: CustomIcon },
      {
        name: "Contract Type",
        path: "/app/contract-type",
        icon: CustomIcon,
      },
      {
        name: "Pay Component",
        path: "/app/pay-component",
        icon: CustomIcon,
      },
      {
        name: "Holiday Policy",
        path: "/app/holiday-policy",
        icon: CustomIcon,
      },
      {
        name: "Working Pattern",
        path: "/app/working-pattern",
        icon: CustomIcon,
      },
      { name: "Settings", path: "/app/settings", icon: CustomIcon },
    ];
  }

  if (role === "director") {
    return [
      { name: "Dashboard", path: "/app", icon: HomeIcon },
      { name: "Employee", path: "/app/employee", icon: InformationCircleIcon },
      { name: "Settings", path: "/app/settings", icon: Cog6ToothIcon },
    ];
  }

  if (role === "employee") {
    return [
      { name: "Dashboard", path: "/app", icon: HomeIcon },
      { name: "Profile", path: "/app/employee", icon: InformationCircleIcon },
    ];
  }

  return [];
});

function isMenuActive(item: { path: string }) {
  if (item.path === "/app") {
    return route.path === "/app" || route.path === "/app/";
  }
  return route.path.startsWith(item.path);
}
</script>

<style scoped>
.custom-scrollbar {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.custom-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
