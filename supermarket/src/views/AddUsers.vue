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
            <h3>添加账号</h3>
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
              id="addusers"
            >

              <el-form-item label="用户名" prop="user" >
                <el-input type="text" v-model="ruleForm2.user" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
              </el-form-item>
               <el-form-item label="确认密码" prop="checkpass">
                <el-input type="password" v-model="ruleForm2.checkpass" autocomplete="off"></el-input>
              </el-form-item>
               <el-form-item label="选择用户组" prop="group">
                  <el-select v-model="ruleForm2.group" placeholder="选择用户组">
                    <el-option label="管理员" value="管理员"></el-option>
                    <el-option label="普通用户" value="普通用户"></el-option>
                  </el-select>
              </el-form-item>

              <el-form-item> 
                <el-button type="primary" @click="submitForm('ruleForm2')">添加</el-button>
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
import LeftMenu from "../components/leftMenu";
import RightTop from "../components/rightTop";
import RightFoot from "../components/rightFoot";

export default {
  data() {
    //验证2次密码是否一致
    var validatePass2 = (rule, value, callback) => {
       if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
      //数据对象
      ruleForm2: {
        pass: "",
        user: "",
        checkpass:"",
        group:""
      },
      //验证规则
      rules2: {
        user: [
          // //required: true 必填     trigger: 'blur' 失去焦点的事件触发     message: "出错信息"
          { required: true, trigger: "blur", message: "请输入用户名" }, //非空验证
          { min: 6, max: 18, trigger: "blur", message: "用户长度在6到18个字符" } //验证长度值
        ],

        pass: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 12, message: "密码长度不对", trigger: "blur" }
        ],

        checkpass:[
           { required: true, message: "请再次确认密码", trigger: "blur" },
           { min: 6, max: 12, message: "密码不一致,请再次输入", trigger: "blur" },
           { validator: validatePass2, trigger: 'blur' }//调用自定义的验证方法，验证是否一致？
        ],
        group:[
          { required: true, message: "请输入用户组", trigger: "blur" }
        ]
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
          //发起ajax请求去后端做数据库添加用户
            // 1.获取用户信息
          console.log(this.ruleForm2)
            // 2.使用axios发送请求到后端api: http://127.0.0.1:3000/users/useradd
            this.axios.post(
              this.api+"/user/useradd",
              this.qs.stringify(this.ruleForm2)//使用q处理post的参数
            ).then(result=>{
              console.log("服务器成功返回的结果",result);
            //3.将后端响应回来的结果渲染到页面上
            if(result.data.isOK){
              //添加成功
              this.$message({
                message:result.data.msg,
                type:"success"
              });
              setTimeout(()=>{
                this.$router.push("/Itunes");
              },100);
            }else{
              //添加失败
              this.$message.error("服务器错误返回的信息",err);
            }
            }).catch(err=>{
              console.error("服务器错误返回的信息",err);
            });
          //使用路由对象的push实现跳转
          // this.$router.push("/home");//使用路由对象的push实现跳转
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
</style>



 