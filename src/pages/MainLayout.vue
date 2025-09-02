<!-- layouts/MainLayout.vue -->
<template>
  <div class="flex h-screen">
    <Drawer />
    <div
      :class="[
        'flex flex-col flex-1 transition-all duration-300',
        drawerStore.isCollapsed ? 'ml-16' : 'ml-64'
      ]"
    >
      <!-- <Navbar /> -->
      <main class="flex-1 overflow-y-auto bg-[#E5EBEF]">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import Drawer from '../components/Drawer.vue';
import { useDrawerStore } from '../store/Drawer'
const drawerStore = useDrawerStore();
</script>
