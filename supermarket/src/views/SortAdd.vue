<template>
  <el-container id="home">
    <!--1. 左侧 -->
      <!-- 四、像标签一样使用组件 -->
      <LeftMenu></LeftMenu>
   
    <!--2. 右侧 -->
    <el-container>
      <!-- 2.1 头部-->
      <RightTop></RightTop>
    
      <!-- 2.2 内容 中间 -->
      <el-main>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <h3>添加分类</h3>
          </div>
          <div class="text item">
              <!-- 模板内容 -->
          

          </div>

        </el-card>
      </el-main>

      <!--  2.3 页脚-->
      <el-footer>
        <RightFoot></RightFoot>
      </el-footer>
    </el-container>
  </el-container>

</template>

<script>
//二.在需要使用此组件的父组件中引入 组件名必须大写
import LeftMenu from '../components/leftMenu'
import RightTop from '../components/rightTop'
import RightFoot from '../components/rightFoot'

export default {
  data() {
    return {
    
    };
  },
  //三、 父组件中注册子组件
  components: {
    LeftMenu,
    RightTop,
    RightFoot
  }, 
  methods: {
    
  }
};
</script>

<style>
</style>



 