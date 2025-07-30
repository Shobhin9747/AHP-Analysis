import { defineStore } from 'pinia';

interface User {
  email: string;
  role: 'admin' | 'director' | 'employee';
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    token: localStorage.getItem('token') || null as string | null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.user,
  },
  
  actions: {
    login(user: User, token: string) {
      this.token =token
      this.user = user;
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('token', token);
    },
     loadUserFromStorage() {
      const token = localStorage.getItem('token')
      const user = localStorage.getItem('user')
      if (token && user) {
        this.token = token
        this.user = JSON.parse(user) as User
      }
    },
    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
});
