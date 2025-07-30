import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
const pinia = createPinia();
import './style.css'
import { useAuthStore } from "./store/Auth";

const app = createApp(App);

app.use(router);
app.use(pinia);
const auth = useAuthStore()
auth?.loadUserFromStorage()
app.mount("#app");
