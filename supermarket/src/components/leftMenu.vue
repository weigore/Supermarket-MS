<!-- 一、抽取模板 -->
<template>
  <!--1. 左侧 -->
  <el-aside width="230px">
    <!--1.1 左侧导航顶部 -->
    <div id="asideTop">
      <h2>便利超市管理系统</h2>
      <p><span>您好</span>,admin</p>
      <p><a href="#">管理首页</a> | <a href="javascript:void(0)" @click="loginOut()">退出系统</a></p>
    </div>
    <!--1.2 左侧导航菜单  -->
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :unique-opened="onlyOne"
    >
      <!-- 菜单一 -->
      <el-submenu index="1">
        <template slot="title">
          <span>分类管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1"><router-link to="sort">分类管理</router-link></el-menu-item>
          <el-menu-item index="1-2"><router-link to="sortadd">添加分类</router-link></el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <!-- 菜单二 -->
      <el-submenu index="2">
        <template slot="title">
          <span>商品管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="2-1"> <router-link to="goodsmsg">商品管理</router-link> </el-menu-item>
          <el-menu-item index="2-2"><router-link to="goodadd"> 添加商品</router-link></el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <!-- 菜单三 -->
      <el-submenu index="3">
        <template slot="title">
          <span>进货管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="3-1">库存管理</el-menu-item>
          <el-menu-item index="3-2">添加库存</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <!-- 菜单四 -->
      <el-submenu index="4">
        <template slot="title">
          <span>出货管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="4-1">选项1</el-menu-item>
          <el-menu-item index="4-2">选项2</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          <span>统计管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="5-1">选项1</el-menu-item>
          <el-menu-item index="5-2">选项2</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="6">
        <template slot="title">
          <span>账号管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="6-1"><router-link to="itunes">账号管理</router-link></el-menu-item>
          <el-menu-item index="6-2"><router-link to="addusers">添加账号</router-link></el-menu-item>
          <el-menu-item index="6-3"><router-link to="changepsw">密码修改</router-link></el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="7">
        <template slot="title">
          <span>会员管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="7-1">选项1</el-menu-item>
          <el-menu-item index="7-2">选项2</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="8">
        <template slot="title">
          <span>系统管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="8-1">选项1</el-menu-item>
          <el-menu-item index="8-2">选项2</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>


<script>
export default {
  data() {
    return {
      onlyOne: true
    };
  },
  components:{},
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    loginOut(){
      //发起ajax到后端路由去执行清除cookie的操作
      this.axios.get("http://127.0.0.1:3000/user/loginOut").then(result=>{
          //根据是否清除成功处理业务逻辑
          this.$message({
            message: '退出成功！ 欢迎下次登录!',
            type: 'success'
          });
          //跳转到登录页面
          this.$router.push("/");
      }).catch(err=>{
        console.log(err);
      })

    }
  }
};
</script>


<style>
</style>


