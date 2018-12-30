<template>
   <!-- 卡片组件： -->
   <div id="box">
        <el-card class="box-card" id="login">
        <div slot="header" class="clearfix">
          <h2>用户登录</h2>
        </div>
        <div class="text item">
          <!-- 表单内容：表单输入框 -->
          <el-form :model="ruleForm2" 
          status-icon 
          :rules="rules2" 
          ref="ruleForm2" 
          label-width="100px" 
          class="demo-ruleForm">
        
          <el-form-item label="用户名" prop="user">
            <el-input type="text" v-model="ruleForm2.user" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm2')">登陆</el-button>
            <el-button @click="resetForm('ruleForm2')">重置</el-button>
          </el-form-item>
        </el-form>
        </div>
      </el-card>
    
   </div>


</template>

<script>
//暴露一个模块：登陆组件
export default {
  data() {//data是函数，所有需要将数据返回出去
    //返回数据
    return {
      //数据对象
      ruleForm2: {
        pass: "",
        user: ""
      },
      //验证规则
      rules2: {
        user: [
          // //required: true 必填     trigger: 'blur' 失去焦点的事件触发     message: "出错信息"
          { required: true, trigger: "blur", message: "请输入用户名" }, //非空验证
          { min: 6, max: 18, trigger: "blur", message: "用户长度在6到18个字符" } //验证长度值
        ],

        pass: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 6, max: 12, message: "密码长度不对", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //提交表单的方法
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        //valid参数表示验证的结果，true表示验证通过，false验证失败
        if (valid) {
          // alert("表单验证成功"); // 
          //发起ajax请求去后端做数据库的验证
          //使用路由对象的push实现跳转
          this.$router.push("/home");//使用路由对象的push实现跳转
        } else {
          console.log("×表单验证失败");
          return false;
        }
      });
    },
       //重置表单的方法
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
#box{
  background: url("../assets/images/login.jpg") no-repeat;
  background-size: 100%;
}
#login{
  width: 500px;
  height: 300px;
  /* 水平、垂直绝对居中 */
  position: fixed;
  left: 0;
  top:0;
  right: 0;
  bottom: 0;
  margin: auto;
}
/* scoped局部，如果不加，其他页面会受影响 */
   .el-card__header{
       padding: 0px 15px !important;
   }
/* 登陆页面的宽度 */
   .el-input{
     width: 80%;
   }


</style>