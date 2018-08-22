import Vue from 'vue'
import App from './App.vue'


//开发时
import PopupPlugin from './../src/index.js'

//测试生成的文件
// import PopupPlugin from './../dist/index.js'
// import PopupPluginCss from './../dist/style.css'

//测试npm上的库
// import PopupPlugin from 'vue-lite-popup';
// import PopupPluginCss from 'vue-lite-popup/dist/style.css'

Vue.use(PopupPlugin);

new Vue({
  el: '#app',
  render: h => h(App)
})
