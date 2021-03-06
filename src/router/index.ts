import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  { name: "Home", path: "/", component: () => import("@/views/Home.vue") },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
