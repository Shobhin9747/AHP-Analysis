// stores/auth.ts
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as { username: string; role: string } | null
  }),
  getters: {
    isAuthenticated: (state) => !!state.user
  },
  actions: {
    async login(role: string) {
      this.user = { username: role, role }
    },
    logout() {
      this.user = null
    }
  }
})
