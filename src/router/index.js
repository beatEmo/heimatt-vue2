import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/Layout",
  },
  {
    path: "/login",
    name: "login",
    meta: {
      title: "登录",
    },
    component: () => import("@/views/login"),
  },
  {
    path: "/Layout",
    // name: "Layout",
    component: () => import("@/views/Layout"),
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("@/views/Home"),
      },
      {
        path: "Qa",
        name: "Qa",
        component: () => import("@/views/Qa"),
      },
      {
        path: "My",
        name: "My",
        component: () => import("@/views/My"),
      },
      {
        path: "Video",
        name: "Video",
        component: () => import("@/views/Video"),
      },
    ],
  },
  // {
  //   path: '/',
  //   name: 'home',
  //   component: HomeView
  // },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
];

const router = new VueRouter({
  mode: "hash",
  routes,
});

export default router;
