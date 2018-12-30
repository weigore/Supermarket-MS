import Vue from 'vue'
import App from './App.vue'
import router from './router'
//elementUI的js和css
import './plugins/element.js'

//在elementUI后面引入公用样式
import "./assets/style/public.css"

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
