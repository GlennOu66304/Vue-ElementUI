import VueRouter from "vue-router";
import Vue from 'vue'
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";

Vue.use(VueRouter);

const routes = [
    // {
    //   path: "/home",
    //   redirect: "/",
    // },
    {
      path: "/home",
      name: "home",
      component: Home,
    },
    {
      path: "/",
      name: "login",
      component: Login,
    },
]

// initainl a new vue Router
const router = new VueRouter({
  mode: "history",
  //   base: process.env.BASE_URL,
  routes,
});

export default router

