import Vue from 'vue'
import App from './App'
import router from './router'
import monitor from '../src/monitor'

Vue.config.productionTip = false;

monitor.onEvent = event => {
  console.log(event)
}

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
});
