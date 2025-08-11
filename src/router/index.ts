import { createRouter, createWebHistory } from 'vue-router';
import Login from '../pages/Login.vue';
import MainLayout from '../pages/MainLayout.vue';
import Home from '../pages/Home.vue';
import Employee from "../pages/Employee.vue";
import Settings from "../pages/Settings.vue";
import Jurisdiction from "../pages/Jurisdiction.vue";
import Company from "../pages/Company.vue";
import ContractType from "../pages/ContractType.vue";
import PayComponent from "../pages/PayComponent.vue";
import HolidayPolicy from "../pages/HolidayPolicy.vue";
import WorkingPattern from "../pages/WorkingPattern.vue";
import { useAuthStore } from "../store/Auth";
import HolidayPayOverview from '../pages/HolidayPayOverview.vue';

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/app",
    component: MainLayout,
    meta: { requiresAuth: true },
    name: "App",
    children: [
      { path: "", name: "Dashboard", component: HolidayPayOverview },
      { path: "employee", name: "Employee", component: Employee },
      { path: "settings", name: "Settings", component: Settings },
      { path: "jurisdiction", name: "Jurisdiction", component: Jurisdiction },
      { path: "company", name: "Company", component: Company },
      { path: "contract-type", name: "ContractType", component: ContractType },
      { path: "pay-component", name: "PayComponent", component: PayComponent },
      {
        path: "holiday-policy",
        name: "HolidayPolicy",
        component: HolidayPolicy,
      },
      {
        path: "working-pattern",
        name: "WorkingPattern",
        component: WorkingPattern,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _from, next) => {
  const auth = useAuthStore();
  console.log(`Navigating to: ${to.name}, Authenticated: ${auth.isAuthenticated}`);
  
  if (!auth.isAuthenticated && to.name !== "Login" && to.name !== "Signup") {
    // Not logged in → redirect to login
    next({ name: "Login" });
  } else if (
    auth.isAuthenticated &&
    (to.name === "Login" || to.name === "Signup")
  ) {
    // Already logged in → redirect to home
    next({ name: "App" });
  } else {
    next();
  }
});

export default router;
