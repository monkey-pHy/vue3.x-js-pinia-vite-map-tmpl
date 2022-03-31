/*
 * @Description:
 * @Author:
 * @Date: 2022-03-31 17:10:32
 * @LastEditTime: 2022-03-31 17:45:16
 * @LastEditors: PengHeyan
 * @Usage:
 */
import { createRouter, createWebHashHistory } from "vue-router";
import Login from "@views/Login.vue";
import Index from "@components/index/IndexPage.vue";
const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/home",
    name: "Home",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("@views/Home.vue"),
    children: [
      {
        path: "",
        name: "Index",
        component: Index,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
