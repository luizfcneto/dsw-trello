import Vue from 'vue'
import App from './App.vue'
import Router from "vue-router";
import { routes } from './routes.js';

//Informa ao Vue para utilizar o Router
Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: routes,
});

Vue.config.productionTip = false

new Vue({
  data: {
    credentials: null,
    config: {
      url: "http://localhost:8080"
    }
  },

  el: "#app",
  render: h => h(App),
  router
});