import Vue from "vue";
import Router from "vue-router";
import MainPage from '../page/MainPage';
import SettingPage from '../page/SettingPage';

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: "/",
      redirect: '/MainPage',
    },
    {
      path: "/MainPage",
      component: MainPage,
    },
    {
      path: "/SettingPage",
      component: SettingPage,
    }
  ]
});

export default router;
