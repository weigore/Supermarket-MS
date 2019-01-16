import Vue from 'vue'
import App from './App.vue'
import router from './router'
//elementUI的js和css
import './plugins/element.js'

//在elementUI后面引入公用样式
import "./assets/style/public.css"

//引入axios
import axios from "axios"
//将axios挂载到vue原型上，vue实例中可无限使用(看不懂)
Vue.prototype.axios=axios;

//引入qs处理axios的post参数(是否需要下载？属于前端)
import qs from 'qs'
//挂在原型方便后期的vue实例使用
Vue.prototype.qs=qs;

//配置后端服务器的主机
let serverApi="http://127.0.0.1:3000";
Vue.prototype.api=serverApi;

//构造全局守卫
   //进入其他路由前都要进行守卫
router.beforeEach((to,from,next)=>{
  //alert("全局守卫")
  //next()//放行:只要登录成功的才放行
   //前端到后端拿cookie需要携带cookie证书
   //************************ 让ajax携带cookie证书********************************
   axios.defaults.withCredentials=true;

  //去服务器端看是否登录成功：发起ajax到后端路由获取cookie，cookie存在就放行，否则去登录页面
  axios.get(serverApi+"/user/getCookie").then(result=>{
     console.log("成功",result);
      //如果登录成或者是访问的页面时登录页面就放行
      if(result.data.isOK ||to.path=="/"){
        next();//进入下一个
      }else{  //否则就跳转到登录页面
        //console.log(to)打印不出来？
        next('/')
      }
  }).catch(err=>{
    console.log("错误"+err.message)
  })

})


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
