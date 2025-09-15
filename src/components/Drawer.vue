<template>
  <aside :class="[
    'fixed top-0 left-0 h-screen bg-gradient-to-r from-[#195384] to-[#11376D] transition-all duration-300 text-white z-20 shadow-lg flex flex-col',
    drawerStore.isCollapsed ? 'w-16' : 'w-64',
  ]">
    <div :class="[
      'flex items-center gap-2 p-4  border-white/10 flex-shrink-0',
      drawerStore.isCollapsed ? 'justify-center' : 'justify-start',
    ]">
      <button @click="drawerStore.toggle"
        class="text-white p-1 rounded focus:outline-none cursor-pointer hover:bg-white/10" aria-label="Toggle menu">
        <Bars3Icon class="w-6 h-6" />
      </button>
      <div v-if="!drawerStore.isCollapsed" class="flex items-center">
        <img :src="logoImage" alt="Company Logo" class="h-6 object-contain mr-2" />
      </div>
    </div>

  
    <div class="flex-1 overflow-y-auto mt-6 px-2 pb-4 custom-scrollbar">
     
      <div v-if="auth.user?.role === 'admin'">
        <div v-if="!drawerStore.isCollapsed" class="mb-6">
          <h3 class="text-white font-bold text-sm mb-3 px-2">Explore</h3>
          <ul class="space-y-1">
            <li v-for="item in exploreItems" :key="item.name">
              <router-link :to="item.path" :title="drawerStore.isCollapsed ? item.name : ''" :class="[
                'flex items-center gap-3 p-4 rounded-md transition-all duration-200 border border-white/10',
                isMenuActive(item)
                  ? 'bg-[#068EC6] text-white font-semibold shadow-sm router-link-active'
                  : 'text-white font-normal hover:bg-white/10 hover:shadow-sm',
              ]">
                <component :is="item.icon" class="w-5 h-5 flex-shrink-0"
                  :style="{ color: isMenuActive(item) ? '#ffffff' : '#ffffff' }" />
                <span v-if="!drawerStore.isCollapsed" class="text-sm truncate"
                  :style="{ color: isMenuActive(item) ? '#ffffff' : '#ffffff' }">
                  {{ item.name }}
                </span>
              </router-link>
            </li>
          </ul>
        </div>

        <div v-if="!drawerStore.isCollapsed" class="mb-6">
          <h3 class="text-white font-bold text-sm mb-3 px-2">Jurisdiction</h3>
          <ul class="space-y-1">
            <li v-for="item in jurisdictionItems" :key="item.name">
              <router-link :to="item.path" :title="drawerStore.isCollapsed ? item.name : ''" :class="[
                'flex items-center justify-between p-4 rounded-md transition-all duration-200 border border-white/10',
                isMenuActive(item)
                  ? 'bg-[#068EC6] text-white font-semibold shadow-sm router-link-active'
                  : 'text-white font-normal hover:bg-white/10 hover:shadow-sm',
              ]">
                <div class="flex items-center gap-3">
                  <component :is="item.icon" class="w-5 h-5 flex-shrink-0"
                    :style="{ color: isMenuActive(item) ? '#ffffff' : '#ffffff' }" />
                  <span v-if="!drawerStore.isCollapsed" class="text-sm truncate"
                    :style="{ color: isMenuActive(item) ? '#ffffff' : '#ffffff' }">
                    {{ item.name }}
                  </span>
                </div>
                <div v-if="!drawerStore.isCollapsed" class="flex items-center gap-2">
                  <span class="text-[#068EC6] text-sm font-medium">{{ item.count }}</span>
                  <chartBarIcon class="w-4 h-4 text-white" />
                </div>
              </router-link>
            </li>
          </ul>
        </div>

        <ul v-if="drawerStore.isCollapsed" class="space-y-2">
          <li v-for="item in allMenuItems" :key="item.name">
            <router-link :to="item.path" :title="item.name" :class="[
              'flex items-center gap-3 p-4 rounded-md transition-all duration-200 border border-white/10',
              isMenuActive(item)
                ? 'bg-[#068EC6] text-white font-semibold shadow-sm router-link-active'
                : 'text-white font-normal hover:bg-white/10 hover:shadow-sm',
            ]">
              <component :is="item.icon" class="w-5 h-5"
                :style="{ color: isMenuActive(item) ? '#ffffff' : '#ffffff' }" />
            </router-link>
          </li>
        </ul>
      </div>


      <div v-else>
        <ul class="space-y-2">
          <li v-for="(item) in menuItems" :key="item.name">
            <router-link :to="item.path" :title="drawerStore.isCollapsed ? item.name : ''" :class="[
              'flex items-center gap-3 p-4 rounded-md transition-all duration-200 border border-white/10',
              isMenuActive(item)
                ? 'bg-[#068EC6] text-white font-semibold shadow-sm router-link-active'
                : 'text-white font-normal hover:bg-white/10 hover:shadow-sm',
            ]">
              <component :is="item.icon" class="w-5 h-5 flex-shrink-0"
                :style="{ color: isMenuActive(item) ? '#ffffff' : '#ffffff' }" />
              <span v-if="!drawerStore.isCollapsed" class="text-sm truncate"
                :style="{ color: isMenuActive(item) ? '#ffffff' : '#ffffff' }">
                {{ item.name }}
              </span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <div v-if="!drawerStore.isCollapsed && auth.user?.role=='employee'"  class="flex items-center gap-3 p-3  border-white/10 flex-shrink-0">
      <div class="flex items-center justify-between bg-blue-50 p-4 gap-6 rounded-md">
        <!-- User Info -->
        <div class="flex items-center gap-2 whitespace-nowrap">
          <svg width="18" height="17" viewBox="0 0 18 17" fill="none">
            <path
              d="M4.66667 15.0667C4.66667 13.9174 5.12321 12.8152 5.93587 12.0025C6.74853 11.1899 7.85073 10.7333 9 10.7333C10.1493 10.7333 11.2515 11.1899 12.0641 12.0025C12.8768 12.8152 13.3333 13.9174 13.3333 15.0667M11.1 5.97998C11.1 7.13998 10.16 9.16664 8.99998 9.16664C7.83998 9.16664 6.89998 7.14331 6.89998 5.98331C6.92159 5.44127 7.15212 4.92862 7.54327 4.55275C7.93442 4.17688 8.45585 3.96696 8.99832 3.96696C9.54079 3.96696 10.0622 4.17688 10.4534 4.55275C10.8445 4.92862 11.075 5.44127 11.0967 5.98331L11.1 5.97998ZM17 8.5C17 12.9183 13.4183 16.5 9 16.5C4.58172 16.5 1 12.9183 1 8.5C1 4.08172 4.58172 0.5 9 0.5C13.4183 0.5 17 4.08172 17 8.5Z"
              stroke="#068EC6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>

          <span class="text-gray-800 font-small">Vipin Nair</span>
        </div>

        
        <div class="relative">
          <NotificationIcon />

          
          <span class="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
        </div>

        <button @click="handleLogout"
          class="p-1 hover:bg-white/10 active:bg-white/20 rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/30"
          title="Logout">
          <SettingsIcon />
        </button>
      </div>
    </div>
  </aside>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useDrawerStore } from "../store/Drawer";
import { useAuthStore } from "../store/Auth";

import {
  Bars3Icon,
} from "@heroicons/vue/24/outline";
import CustomIcon from "./Icons/CustomIcon.vue";
import JurisdictionIcon from "./Icons/JurisdictionIcon.vue";
import logoImage from "../assets/logo.png";
import chartBarIcon from "./Icons/ChartBarIcon.vue";
import NotificationIcon from "./Icons/NotificationIcon.vue";
import SettingsIcon from "./Icons/SettingsIcon.vue";


const drawerStore = useDrawerStore();
const auth = useAuthStore();
const route = useRoute();
const router = useRouter();

const exploreItems = computed(() => {
  const role = auth.user?.role;

  if (role === "admin") {
    return [
      { name: "Overview", path: "/admin", icon: CustomIcon },
      { name: "Reports & Download", path: "/admin/reports", icon: CustomIcon },
      { name: "Help & Support", path: "/admin/support", icon: CustomIcon },
    ];
  }

  return [];
});

const jurisdictionItems = computed(() => {
  const role = auth.user?.role;

  if (role === "admin") {
    return [
      { name: "England & Wales", path: "/admin/england-wales", icon: JurisdictionIcon, count: 25 },
      { name: "Scotland", path: "/admin/scotland", icon: JurisdictionIcon, count: 60 },
      { name: "Northern Ireland", path: "/admin/northern-ireland", icon: JurisdictionIcon, count: 40 },
    ];
  }

  return [];
});

const allMenuItems = computed(() => {
  return [...exploreItems.value, ...jurisdictionItems.value];
});

const menuItems = computed(() => {
  const role = auth.user?.role;

  if (role === "director") {
    return [
      { name: "Overview", path: "/app", icon: CustomIcon },
      { name: "Analytics", path: "/app/analytics", icon: CustomIcon },
      { name: "AHP Flow", path: "/app/ahp-flow", icon: CustomIcon },
      { name: "Company Profile", path: "/app/company", icon: CustomIcon },
      { name: "Profile", path: "/app/profile", icon: CustomIcon },
      { name: "Contract", path: "/app/contract", icon: CustomIcon },
      { name: "Jurisdiction", path: "/app/jurisdiction", icon: CustomIcon },
      { name: "Eligibility Status", path: "/app/eligibility", icon: CustomIcon },
      { name: "Reports & Downloads", path: "/app/reports", icon: CustomIcon },
      { name: "Help & Support", path: "/app/help", icon: CustomIcon },
    ];
  }

  if (role === "employee") {
    return [
      { name: "Overview", path: "/app", icon: CustomIcon },
      { name: "Company Profile", path: "/app/company", icon: CustomIcon },
      { name: "Profile", path: "/app/profile", icon: CustomIcon },
      { name: "Contract", path: "/app/contract", icon: CustomIcon },
      { name: "Jurisdiction", path: "/app/jurisdiction", icon: CustomIcon },
      { name: "Holiday List", path: "/app/holiday-list", icon: CustomIcon },
      { name: "Eligibility Status", path: "/app/eligibility", icon: CustomIcon },
      { name: "Reports & Downloads", path: "/app/reports", icon: CustomIcon },
      { name: "Help & Support", path: "/app/help", icon: CustomIcon },
    ];
  }

  return [];
});

function handleLogout() {
  auth.logout();
  router.push('/');
}

function isMenuActive(item: { path: string }) {
  if (item.path === "/app" || item.path === "/admin") {
    return route.path === item.path || route.path === item.path + "/";
  }
  return route.path?.startsWith(item.path);
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

.router-link-active {
  position: relative;
}

* {
  transition-property: background-color, color, transform, box-shadow;
  transition-duration: 200ms;
  transition-timing-function: ease-in-out;
}
</style>
