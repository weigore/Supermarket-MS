import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
//引入组件  //引入的第一种方式 要使用组件，在js中就要引入组件
import Login from './views/Login.vue'
import Itunes from './views/Itunes.vue' 

Vue.use(Router)

export default new Router({
  routes: [
    //配置路由
    {
      path: '/',//路径，地址
      component: Login//这个地方的login是上面引入登陆组件的Login 登陆页
    },
    {
      path: '/home',
      name: 'home',//name可不要  首页
      component: Home
    },
    {
      path:'/sort',
      component:()=>import(/*webpackChunkName:"PwdEdit"*/'./views/Sort.vue')
    },
    {
      path:'/sortadd',
      component:()=>import(/*webpackChunkName:"PwdEdit"*/'./views/SortAdd.vue')
    },

    { //账号管理
      path: '/itunes',
      component:Itunes
    },
    {//添加账号
      path:'/addusers',
      component:()=>import(/*webpackChunkName:"PwdEdit"*/'./views/AddUsers.vue')//引入的第二种方式
    },
    {//密码修改
      path:'/changepsw',
      component:()=>import(/*webpackChunkName:"PwdEdit"*/'./views/ChangePsw.vue')//动态导入组件
    },
    {//商品管理
      path:'/goodsmsg',
      component:()=>import(/*webpackChunkName:"PwdEdit"*/'./views/GoodsMsg.vue')//动态导入组件
    },
    {//增加商品
      path:"/goodadd",
      component:()=>import(/*webpackChunkName:"PwdEdit"*/'./views/GoodsAdd.vue')//动态导入组件
    }
  ]
})
