<!-- layouts/MainLayout.vue -->
<template>
  <div class="flex">
    <Drawer />
    <div
      :class="[
        'transition-all duration-300 flex-1 overflow-y-auto min-h-screen',
        drawerStore.isCollapsed ? 'ml-16' : 'ml-64'
      ]"
    >
      <Navbar />
      <main class="p-3">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import Drawer from '../components/Drawer.vue';
import Navbar from '../components/Navbar.vue';
import { useDrawerStore } from '../store/Drawer'
const drawerStore = useDrawerStore();
</script>
