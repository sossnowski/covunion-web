import Vue from "vue";
import VueRouter from "vue-router";
import MyAdsTaken from "../views/MyAdsTaken";
import TakenBySomebody from "../views/TakenBySomebody";

Vue.use(VueRouter);

const routes = [
  {
    path: "/myAdsTaken",
    name: "MyAdsTaken",
    component: MyAdsTaken
  },
  {
    path: "/takenBySomebody",
    name: "TakenBySomebody",
    component: TakenBySomebody
  },
  {
    path: "/",
    name: "AllAds",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AllAds.vue")
  },
  {
    path: "/myAds",
    name: "MyAds",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/MyAds.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
