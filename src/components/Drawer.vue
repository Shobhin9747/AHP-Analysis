<template>
  <aside
    :class="[
      'fixed top-0 left-0 h-screen bg-gradient-to-r from-[#195384] to-[#11376D] transition-all duration-300 text-white z-20 shadow-lg flex flex-col',
      drawerStore.isCollapsed ? 'w-16' : 'w-64',
    ]"
  >
    <!-- Logo & Toggle -->
    <div
      :class="[
        'flex items-center gap-2 p-4  border-white/10 flex-shrink-0',
        drawerStore.isCollapsed ? 'justify-center' : 'justify-start',
      ]"
    >
      <button
        @click="drawerStore.toggle"
        class="text-white p-1 rounded focus:outline-none cursor-pointer hover:bg-white/10"
        aria-label="Toggle menu"
      >
        <Bars3Icon class="w-6 h-6" />
      </button>
      <div v-if="!drawerStore.isCollapsed" class="flex items-center">
        <img
          :src="logoImage"
          alt="Company Logo"
          class="h-7 object-contain mr-2"
        />
      </div>
    </div>

    <!-- Navigation -->
         <ul
       class="flex-1 overflow-y-auto mt-6 space-y-2 px-2 pb-4 custom-scrollbar"
     >
      <li v-for="(item, index) in menuItems" :key="item.name">
                 <router-link
           :to="item.path"
           :title="drawerStore.isCollapsed ? item.name : ''"
           :class="[
             'flex items-center gap-3 p-4 rounded-md transition-all duration-200 border border-white/10',
             isMenuActive(item)
               ? 'bg-[#068EC6] text-white font-semibold shadow-sm router-link-active'
               : 'text-white font-normal hover:bg-white/10 hover:shadow-sm',
           ]"
         >
          <component
            :is="item.icon"
            class="w-5 h-5 flex-shrink-0"
            :style="{ color: isMenuActive(item) ? '#ffffff' : '#ffffff' }"
          />
          <span
            v-if="!drawerStore.isCollapsed"
            class="text-sm truncate"
            :style="{ color: isMenuActive(item) ? '#ffffff' : '#ffffff' }"
          >
            {{ item.name }}
          </span>
        </router-link>
      </li>
    </ul>
    <div
      v-if="!drawerStore.isCollapsed"
      class="flex items-center gap-3 p-3  border-white/10 flex-shrink-0"
    >
      <div
        class="flex items-center justify-between bg-blue-50 p-4 gap-6 rounded-md"
      >
        <!-- User Info -->
        <div class="flex items-center gap-2 whitespace-nowrap">
          <svg
            width="18"
            height="17"
            viewBox="0 0 18 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.66667 15.0667C4.66667 13.9174 5.12321 12.8152 5.93587 12.0025C6.74853 11.1899 7.85073 10.7333 9 10.7333C10.1493 10.7333 11.2515 11.1899 12.0641 12.0025C12.8768 12.8152 13.3333 13.9174 13.3333 15.0667M11.1 5.97998C11.1 7.13998 10.16 9.16664 8.99998 9.16664C7.83998 9.16664 6.89998 7.14331 6.89998 5.98331C6.92159 5.44127 7.15212 4.92862 7.54327 4.55275C7.93442 4.17688 8.45585 3.96696 8.99832 3.96696C9.54079 3.96696 10.0622 4.17688 10.4534 4.55275C10.8445 4.92862 11.075 5.44127 11.0967 5.98331L11.1 5.97998ZM17 8.5C17 12.9183 13.4183 16.5 9 16.5C4.58172 16.5 1 12.9183 1 8.5C1 4.08172 4.58172 0.5 9 0.5C13.4183 0.5 17 4.08172 17 8.5Z"
              stroke="#068EC6"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <span class="text-gray-800 font-small">Vipin Nair</span>
        </div>

        <!-- Notifications -->
        <div class="relative">
          <svg
            width="25"
            height="27"
            viewBox="0 0 25 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.52507 24.2697C7.42358 24.2651 5.32233 24.2556 3.22108 24.2418C1.67373 24.2124 0.400075 22.4362 1.02306 20.9012C1.38197 20.0166 2.28973 19.3999 3.25045 19.3936H4.69645C4.69645 16.9386 4.68923 14.4836 4.69669 12.0286C4.72582 8.91659 6.63955 5.91443 9.4839 4.60729L9.51086 4.59517C9.51086 3.77239 9.47451 2.88149 9.72222 2.21047C10.2068 0.899206 11.478 -0.00866482 12.9228 6.23761e-05C14.6791 0.0330318 16.2392 1.56344 16.251 3.39227V4.59517C16.3066 4.62038 16.3622 4.64608 16.4174 4.6725C19.1837 6.00752 21.0561 8.96362 21.0654 12.0787V19.3936C21.8892 19.3936 22.7507 19.2775 23.4739 19.596C24.8626 20.2079 25.3548 22.2983 24.2721 23.4694C23.8301 23.947 23.1953 24.2294 22.5408 24.2418C20.4543 24.2556 18.3675 24.2648 16.2809 24.2697C16.2515 24.6081 16.1025 24.987 15.9728 25.2667C15.5036 26.2791 14.4507 26.9748 13.3135 26.9967C12.6787 27.0008 12.0418 27.0282 11.4636 26.8148C10.4116 26.4272 9.63772 25.4054 9.52507 24.2697ZM15.2304 24.4844H10.5315C10.7462 25.3467 11.5558 26.0095 12.4607 26.027C12.9693 26.0304 13.4746 26.0793 13.9442 25.9128C14.5727 25.6898 15.0677 25.138 15.2304 24.4844ZM12.8511 0.96975C11.6003 0.993265 10.4817 2.08295 10.4737 3.39518V4.91614C10.4473 5.31977 10.3115 5.29916 9.92177 5.47225C7.4243 6.59952 5.68606 9.2121 5.65934 12.0346V19.8784C5.65934 19.8784 5.55871 20.3381 5.17789 20.3633C3.86693 20.3633 2.32873 20.1691 1.90145 21.301C1.57816 22.1577 2.26133 23.2413 3.21458 23.2718C9.6577 23.3945 16.1042 23.3948 22.5473 23.2718C23.6349 23.2372 24.3953 21.7017 23.5552 20.8144C23.2863 20.5301 22.9033 20.3659 22.5081 20.3633H20.584C20.3235 20.3461 20.1254 20.2311 20.1026 19.8784C20.1026 17.2637 20.1103 14.6491 20.1023 12.0344C20.0768 9.19464 18.2789 6.46037 15.5893 5.36559C15.5893 5.36559 15.3101 5.25044 15.2882 4.91614C15.2882 3.8073 15.3832 2.62452 14.7241 1.83447C14.2612 1.27981 13.6188 0.965144 12.8511 0.96975Z"
              fill="#068EC6"
            />
          </svg>

          <!-- Red dot badge -->
          <span
            class="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"
          ></span>
        </div>

        <button
          @click="handleLogout"
          class="p-1 hover:bg-white/10 active:bg-white/20 rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/30"
          title="Logout"
        >
          <svg
            width="26"
            height="27"
            viewBox="0 0 26 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.9979 1L10.1053 4.08621C8.51629 4.53036 7.06505 5.35272 5.88183 6.47951L2.68589 5.6867L0.861511 8.77079L3.16703 11.1088C2.9695 11.874 2.86789 12.6599 2.86441 13.449C2.86875 14.261 2.97699 15.0693 3.18662 15.855L0.861511 18.1867L2.68589 21.2687L5.94061 20.4822C7.10635 21.5732 8.52574 22.3718 10.077 22.8096L10.9979 26H14.6445L15.5872 22.8139C17.1499 22.3765 18.5795 21.5732 19.7519 20.4737L23.0371 21.2687L24.8615 18.1867L22.519 15.838C22.7242 15.0574 22.8295 14.2549 22.8325 13.449C22.8278 12.6678 22.7269 11.8899 22.532 11.1322L24.8615 8.77079L23.0371 5.6867L19.8281 6.48163C18.6325 5.33984 17.1623 4.50958 15.5524 4.06708L14.6445 1H10.9979ZM10.3601 9.29366H15.363L17.8361 13.4787L15.3368 17.7063H10.3862L7.88473 13.4787L10.3601 9.29366Z"
              stroke="#0E6EA1"
              stroke-width="0.935314"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
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
  HomeIcon,
  InformationCircleIcon,
  Cog6ToothIcon,
  Bars3Icon,
  ChartBarIcon,
  DocumentTextIcon,
  UserIcon,
  DocumentDuplicateIcon,
  CheckCircleIcon,
  ArrowDownTrayIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/vue/24/outline";
import CustomIcon from "./Icons/CustomIcon.vue";
import logoImage from "../assets/logo.png";

const drawerStore = useDrawerStore();
const auth = useAuthStore();
const route = useRoute();
const router = useRouter();

const menuItems = computed(() => {
  const role = auth.user?.role;

  if (role === "admin") {
    return [
      { name: "Overview", path: "/app", icon: CustomIcon },
      { name: "Analytics", path: "/app/analytics", icon: CustomIcon },
      { name: "AHP Flow", path: "/app/ahp-flow", icon: CustomIcon },
      { name: "Company Profile", path: "/app/company", icon: CustomIcon },
      { name: "Profile", path: "/app/profile", icon: CustomIcon },
      { name: "Contract", path: "/app/contract", icon: CustomIcon },
      { name: "Help & Support", path: "/app/help", icon: CustomIcon },
    ];
  }

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

  return [];
});

function handleLogout() {
  auth.logout();
  router.push('/');
}

function isMenuActive(item: { path: string }) {
  if (item.path === "/app") {
    return route.path === "/app" || route.path === "/app/";
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

/* Enhanced hover effects */
.router-link-active {
  position: relative;
}

/* Smooth transitions for all interactive elements */
* {
  transition-property: background-color, color, transform, box-shadow;
  transition-duration: 200ms;
  transition-timing-function: ease-in-out;
}
</style>
