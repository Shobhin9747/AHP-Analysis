<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200">
    <div class="w-80 bg-white rounded-2xl shadow-2xl p-6 text-center space-y-6">
      <div class="space-y-2">
        <div class="text-2xl font-extrabold text-indigo-800">Welcome</div>
        <p class="text-gray-600 text-sm">Select your role to proceed</p>
      </div>
      <div class="space-y-3">
        <button
          v-for="role in roles"
          :key="role"
          @click="handleLogin(role)"
          class="w-full py-2 px-4 rounded-xl text-white font-semibold bg-indigo-500 hover:bg-indigo-600 transition-all duration-200 shadow hover:shadow-lg"
        >
          Login as {{ capitalize(role) }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/Auth';

const roles = ['employee', 'admin', 'director'];
const router = useRouter();
const auth = useAuthStore();

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

async function handleLogin(role: string) {
  await auth.login(role);
  router.push('/app');
}
</script>
