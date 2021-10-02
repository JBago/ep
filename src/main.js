import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueApexCharts from 'vue-apexcharts'
import vuetify from './plugins/vuetify'
import Axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueApexCharts)
Vue.use(VueAxios, Axios);

Axios.defaults.baseURL = 'https://ivanmarincic.com/ep/api';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: function (h) { return h(App) }
}).$mount('#app')
