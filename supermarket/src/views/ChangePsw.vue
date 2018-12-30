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
            <h3>修改密码</h3>
             <el-button style="float: right; padding: 10px 10px" type="text"><span>账号管理</span></el-button>
              <el-button style="float: right; padding: 10px 10px" type="text"><span>添加账号</span></el-button>
              <el-button style="float: right; padding: 10px 10px" type="text"><span>密码修改</span></el-button>
          </div>

          <div class="text item">
              <!-- 模板内容 -->
               <el-form
              :model="ruleForm2"
              status-icon
              :rules="rules2"
              ref="ruleForm2"
              label-width="100px"
              class="demo-ruleForm"
              label-position="top"
            >

              <el-form-item label="原密码" prop="oldpass" >
                <el-input type="password" v-model="ruleForm2.oldpass" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="新密码" prop="newpass">
                <el-input type="password" v-model="ruleForm2.newpass" autocomplete="off"></el-input>
              </el-form-item>
               <el-form-item label="新密码" prop="checkpass">
                <el-input type="password" v-model="ruleForm2.checkpass" autocomplete="off"></el-input>
              </el-form-item>
              
              <el-form-item> 
                <el-button type="primary" @click="submitForm('ruleForm2')">修改</el-button>
              </el-form-item>
            </el-form>

          

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
      //验证2次密码是否一致
    var validatePass2 = (rule, value, callback) => {
       if (value !== this.ruleForm2.newppass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
       //数据对象
      ruleForm2: {
        oldpass: "",
        newppass: "",
        checkpass:"",
      },
        //验证规则
      rules2: {
        oldpass: [
          // //required: true 必填     trigger: 'blur' 失去焦点的事件触发     message: "出错信息"
          { required: true, trigger: "blur", message: "请输入原密码" }, //非空验证
          { min: 6, max: 18, trigger: "blur", message: "用户长度在6到18个字符" } //验证长度值
        ],

        newpass: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          { min: 6, max: 12, message: "密码长度不对", trigger: "blur" }
        ],

        checkpass:[
           { required: true, message: "请再次确认密码", trigger: "blur" },
           { min: 6, max: 12, message: "密码不一致,请再次输入", trigger: "blur" },
           { validator: validatePass2, trigger: 'blur' }//调用自定义的验证方法，验证是否一致？
        ],
      }
    
    };
  },
  //三、 父组件中注册子组件
  components: {
    LeftMenu,
    RightTop,
    RightFoot
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
/* 添加按钮 */
.el-button--primary{
  background-color:#5da500;
}

/* 输入框之间的间距 */
.el-form-item {
  margin-bottom:10px;
}
.el-form--label-top .el-form-item__label{
  padding:0;
}

/* 输入框的宽度 */
.el-input{
  width: 30%
}
.el-input--suffix{
  width: 60%
}

</style>



 