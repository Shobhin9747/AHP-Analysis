<template>
  <div class="min-h-screen flex flex-col md:flex-row">
    <!-- Left Section - Blue Background -->
    <div class="flex-1 bg-gradient-to-r from-[#195384] to-[#11376D] hidden md:flex flex-col p-6 md:p-[100px]">
     
      <div>
        <img :src="logoImage" alt="Company Logo" class="h-10 object-contain" />
      </div>

      <!-- Main Content centered -->
      <div class="flex-1 flex items-center gap-[50px]">


        <div class="w-px h-28 bg-[#F4F5F9]"></div>


        <h2 class="font-bold text-[150px] text-white">More</h2>

        <div class="text-white">
          <p class="font-medium text-[48px] leading-[100%] tracking-[0%]">Efficient.</p>
          <p class="font-medium text-[48px] leading-[100%] tracking-[0%]">Compliant.</p>
          <p class="font-medium text-[48px] leading-[100%] tracking-[0%]">Commercial.</p>
        </div>

      </div>
      
      <!-- Horizontal line at the end -->
      <div class="w-16 h-px bg-[#F4F5F9]"></div>
    </div>

    <!-- Right Section - Login Form -->
    <div class="flex-1 relative flex items-center justify-center  px-16 bg-cover bg-center bg-no-repeat" :style="{ backgroundImage: `url(${loginBg})` }">
      <div class="absolute inset-0 bg-white/80 backdrop-blur-sm "></div>
      <!-- Login Form -->
      <div class="relative z-10 w-full max-w-sm p-8">
        <div class="space-y-6">
          <!-- Header -->
          <div class="space-y-2">
            <h2 class="text-2xl font-bold text-gray-800">Login to Moorepay AHP</h2>
            <p class="text-sm text-[#89868D]">Seamless Access. Secure Experience.</p>
          </div>

          <!-- Form -->
          <form @submit.prevent="handleLogin" class="space-y-4">
            <!-- Email Field -->
            <div>
              <input v-model="email" type="email" placeholder="Email Address" required
                class="w-full px-4 py-3 rounded-lg bg-white  placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>

            <!-- Password Field -->
            <div class="relative">
              <input v-model="password" :type="showPassword ? 'text' : 'password'" placeholder="Password" required
                class="w-full px-4 py-3 pr-12 rounded-lg bg-white  placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              <div class="absolute inset-y-0 right-0 flex items-center pr-3">
                <button type="button" @click="showPassword = !showPassword"
                  class="text-gray-400 hover:text-gray-600 p-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path v-if="!showPassword" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path v-if="!showPassword" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    <path v-if="showPassword" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  </svg>
                </button>
              </div>
            </div>

           
            <div class="text-xs text-gray-600">
              You are agreeing to the
              <a href="#" class="text-[#068EC6] hover:underline">Terms of Services</a>
              and
              <a href="#" class="text-[#068EC6] hover:underline">Privacy Policy</a>.
            </div>

           
            <button type="submit"
              class="w-full py-3 px-4 rounded-lg text-white font-semibold bg-[#023769] hover:bg-blue-800 transition-all duration-200">
              Get started
            </button>
          </form>

          <!-- Error Message -->
          <div v-if="error" class="text-red-500 text-sm text-center">
            {{ error }}
          </div>

          <!-- Sign Up Link -->
          <div class="text-left text-sm text-gray-600">
            Not a member?
            <a href="#" class="text-[#068EC6] hover:underline font-medium">Sign up</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/Auth';
import logoImage from "../assets/logo.png";
import loginBg from "../assets/loginBg.jpg";

type User = {
  email: string;
  role: 'admin' | 'director' | 'employee';
};

const auth = useAuthStore();
const email = ref('');
const password = ref('');
const error = ref('');
const showPassword = ref(false);
const router = useRouter();

// Mock user data
const mockUsers = [
  { email: 'admin@example.com', password: 'admin123', role: 'admin' },
  { email: 'director@example.com', password: 'director123', role: 'director' },
  { email: 'employee@example.com', password: 'employee123', role: 'employee' },
];

// Simulate login API
function mockLogin(email: string, password: string) {

  return new Promise((resolve, reject) => {

    const user = mockUsers.find((user) => user.email === email && user.password === password);
    if (user) {
      let userData = { email: user.email, role: user.role }
      resolve(userData);
    } else {
      reject('Invalid email or password');
    }
  })
}

async function handleLogin() {
  error.value = '';
  try {
    const user = await mockLogin(email.value, password.value) as User;
    let token = 'mock-token';
    auth.login(user, token);

    // Redirect based on user role
    if (user.role === 'admin') {
      router.push('/admin');
    } else {
      router.push('/app');
    }
  } catch (err) {
    error.value = String(err);
  }
}
</script>
