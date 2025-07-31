<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200">
    <div class="w-96 bg-white rounded-2xl shadow-2xl p-8 space-y-6">
      <div class="text-center space-y-2">
        <h2 class="text-2xl font-bold text-indigo-700">Login</h2>
        <p class="text-sm text-gray-500">Enter your credentials to continue</p>
      </div>
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block text-left text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            v-model="email"
            type="email"
            required
            class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label class="block text-left text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            v-model="password"
            type="password"
            required
            class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <button
          type="submit"
          class="w-full py-2 px-4 rounded-xl text-white font-semibold bg-indigo-600 hover:bg-indigo-700 transition-all duration-200 shadow"
        >
          Login
        </button>
      </form>

      <div v-if="error" class="text-red-500 text-sm text-center">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/Auth';

type User = {
  email: string;
  role: 'admin' | 'director' | 'employee';
};

const auth = useAuthStore();
const email = ref('');
const password = ref('');
const error = ref('');
const router = useRouter();

// Mock user data
const mockUsers = [
  { email: 'admin@example.com', password: 'admin123', role: 'admin' },
  { email: 'director@example.com', password: 'director123', role: 'director' },
  { email: 'employee@example.com', password: 'employee123', role: 'employee' },
];

// Simulate login API
function mockLogin(email: string, password: string) {

  return new Promise((resolve,reject)=>{
    
      const user = mockUsers.find((user)=> user.email === email && user.password === password);
      if(user){
        let userData = { email: user.email, role: user.role }
        resolve(userData);
      }else{
        reject('Invalid email or password');
      }
  })
}

async function handleLogin() {
  error.value = '';
  try {
    const user = await mockLogin(email.value, password.value) as User;
    let token = 'mock-token';
    auth.login(user,token);
    router.push('/app');
  } catch (err) {
    error.value = String(err);
  }
}
</script>
