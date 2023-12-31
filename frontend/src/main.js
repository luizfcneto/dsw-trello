import Vue from "vue"
import App from "./App.vue"
import Router from "vue-router";
import { routes } from "./routes.js";

//Informa ao Vue para utilizar o Router
Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: routes,
});

Vue.config.productionTip = false

new Vue({
  data: {
    credentials: {
      token: null
    },
    config: {
      url: process.env.BASE_URL
    }
  },

  el: "#app",
  render: h => h(App),
  router
});