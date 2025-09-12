import { createRouter, createWebHistory } from 'vue-router';
import Login from '../pages/Login.vue';
import MainLayout from '../pages/MainLayout.vue';
import Employee from "../pages/Employee.vue";
import Settings from "../pages/Settings.vue";
import Jurisdiction from "../pages/Jurisdiction.vue";
import Company from "../pages/Company.vue";
import ContractType from "../pages/ContractType.vue";
import PayComponent from "../pages/PayComponent.vue";
import HolidayPolicy from "../pages/HolidayPolicy.vue";
import { useAuthStore } from "../store/Auth";
import HolidayPayOverview from '../pages/HolidayPayOverview.vue';
import HolidayList from '../pages/HolidayList.vue';
import CompanyOverview from '../pages/company/CompanyOverview.vue';
import CompanyList from '../pages/company/CompanyList.vue';


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
      { path: "analytics", name: "Analytics", component: Settings },
      { path: "ahp-flow", name: "AHP Flow", component: Jurisdiction },
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
        name: "Settings",
        component: Settings,
      },
      {
        path: "holiday-list",
        name: "HolidayList",
        component: HolidayList,
      },
    ],
  },
  {
    path: "/admin",
    component: MainLayout,
    meta: { requiresAuth: true, requiresAdmin: true },
    name: "Admin",
    children: [
      { path: "", name: " AHP Admin Console", component: CompanyOverview },
      { path: "reports", name: "AdminReports", component: Settings },
      { path: "england-wales", name: "England & Wales", component: CompanyList },
      { path: "scotland", name: "ScotLand", component: CompanyList },
      { path: "northern-ireland", name: "Northern Ireland", component: CompanyList },
      
    
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _from, next) => {
  const auth = useAuthStore();

  if (!auth.isAuthenticated && to.name !== "Login" && to.name !== "Signup") {
    next({ name: "Login" });
  } else if (
    auth.isAuthenticated &&
    (to.name === "Login" || to.name === "Signup")
  ) {
    
    if (auth.user?.role === 'admin') {
      next({ name: "Admin" });
    } else {
      next({ name: "App" });
    }
  } else if (to.meta.requiresAdmin && auth.user?.role !== 'admin') {
    next({ name: "App" });
  } else {
    next();
  }
});

export default router;
