import VueRouter from "vue-router";
import Vue from "vue";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Users from "../views/Users.vue";
import Roles from "../views/Roles.vue";
import Goods from "../views/Goods.vue";
import Params from "../views/Params.vue";
import Categories from "../views/Categories.vue";
import Orders from "../views/Orders.vue";
import Reports from "../views/Reports.vue";
import Rights from "../views/Rights.vue";
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
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/users",
    name: "users",
    component: Users,
  },
  {
    path: "/roles",
    name: "roles",
    component: Roles,
  },
  {
    path: "/rights",
    name: "rights",
    component: Rights,
  },
  {
    path: "/goods",
    name: "goods",
    component: Goods,
  },
  {
    path: "/params",
    name: "params",
    component: Params,
  },

  {
    path: "/categories",
    name: "categories",
    component: Categories,
  },

  {
    path: "/orders",
    name: "orders",
    component: Orders,
  },
  {
    path: "/reports",
    name: "reports",
    component: Reports,
  },
];

// initainl a new vue Router
const router = new VueRouter({
  mode: "history",
  //   base: process.env.BASE_URL,
  routes,
});

// private router guard
router.beforeEach((to, from, next) => {
  // condition check, if the local storage has the jwt_token
  const isLogin = window.sessionStorage.token ? true : false;

  //if the router path is login, then just head to the login path
  if (to.path == "/login") {
    next();
  } else {
    // else, check if it localstorage contains the token, yes go to the dash board page, other wise go back to the login page
    isLogin ? next() : next("/login");
  }
});

export default router;
