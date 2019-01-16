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
          <div
            slot="header"
            class="clearfix"
          >
            <h3>
              账号管理
            </h3>
            <el-button
              style="float: right; padding: 10px 10px"
              type="text"
            ><span>账号管理</span></el-button>
            <el-button
              style="float: right; padding: 10px 10px"
              type="text"
            ><span>添加账号</span></el-button>
            <el-button
              style="float: right; padding: 10px 10px"
              type="text"
            ><span>密码修改</span></el-button>
          </div>

          <div class="text item">
            <!-- 模板内容 -->
            <el-table
              :data="tableData"
              style="width: 100%"
            >

              <!-- 日期 -->
              <el-table-column
                label="添加日期"
                width="176"
              >
                <template slot-scope="scope">
                  <span>{{ scope.row.addDate | foramtData }}</span>
                </template>
              </el-table-column>
              <!-- 编号 -->
              <el-table-column
                label="编号"
                width="176"
              >
                <template slot-scope="scope">
                  {{ scope.row.userid }}
                </template>
              </el-table-column>

              <!-- 用户名 -->
              <el-table-column
                label="用户名称"
                width="176"
              >
                <template slot-scope="scope">
                  <span>{{ scope.row.username }}</span>
                </template>
              </el-table-column>

              <el-table-column
                label="用户组"
                width="176"
              >
                <template slot-scope="scope">
                  <span>{{scope.row.usergroup}}</span>
                  <!--   <span style="margin-left: 10px">{{scope.row.usergroup | foramtGroup}}</span> -->
                </template>
              </el-table-column>

              <el-table-column label="管理">
                <template slot-scope="scope">
                  <el-button size="mini" @click="handleEdit(scope.row.userid)">
                    <i class="el-icon-edit"><a>编辑</a></i>
                  </el-button>
                  <el-button size="mini" type="danger" @click="handleDelete(scope.row.userid)">
                    <i class="el-icon-delete">删除</i>
                  </el-button>
                </template>
              </el-table-column>
            </el-table>

          </div>

        </el-card>
      </el-main>

      <!--  2.3 页脚-->
      <el-footer>
        <RightFoot></RightFoot>
      </el-footer>
      <!-- 点击修改，跳出的页面 -->
      <el-dialog
        title="修改用户信息"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
        id="mydialog"
      >

        <el-form
          :model="ruleForm2"
          status-icon
          :rules="rules2"
          ref="ruleForm2"
          label-width="100px"
          class="demo-ruleForm"
          label-position="right"
        >

          <el-form-item
            label="用户名"
            prop="username"
          >
            <el-input
              type="text"
              v-model="ruleForm2.username"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="密码"
            prop="userpwd"
          >
            <el-input
              type="password"
              v-model="ruleForm2.userpwd"
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <el-form-item
            label="选择用户组"
            prop="usergroup"
          >
            <el-select
              v-model="ruleForm2.usergroup"
              placeholder="选择用户组"
            >
              <el-option
                label="管理员"
                value="管理员"
              ></el-option>
              <el-option
                label="普通用户"
                value="普通用户"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>·
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="submitForm('ruleForm2')"
          >确认修改</el-button>
        </span>
      </el-dialog>
    </el-container>
  </el-container>

</template>

<script>
//二.在需要使用此组件的父组件中引入 组件名必须大写
import LeftMenu from "../components/leftMenu";
import RightTop from "../components/rightTop";
import RightFoot from "../components/rightFoot";

//引入momentjs
import moment from "moment";

export default {
  data() {
    return {
      // addDate、userid、username、group
      tableData: [], //数组对象 相当于上面的scope
      //scope.crow 一行数据(就是一行数据对象)、访问对象里面的id  scope.crow.userid
      dialogVisible: false, //控制对话框的显示、隐藏
      //数据对象
      ruleForm2: {
        //
        username: "",
        userpwd: "",
        usergroup: "", //也可以不改
        userid:""
      },
      //验证规则
      rules2: {
        username: [
          // //required: true 必填     trigger: 'blur' 失去焦点的事件触发     message: "出错信息"
          { required: true, trigger: "blur", message: "请输入用户名" }, //非空验证
          { min: 6, max: 18, trigger: "blur", message: "用户长度在6到18个字符" } //验证长度值
        ],

        userpwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 12, message: "密码长度不对", trigger: "blur" }
        ],

        usergroup: [
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
          console.log(this.ruleForm2);
          //alert("修改验证通过")
          // 2.使用axios发送请求到后端api: http://127.0.0.1:3000/users/saveuser
          this.axios
            .post(
              this.api+"/user/saveuser",
              this.qs.stringify(this.ruleForm2)
            )
            .then(result => {
              //reslt {"isOk":true,"msg":"用户添加成功！"}
              if(result.data.isOK){
                //返回提示信息
                 this.$message({
                  message: result.data.msg,
                  type: 'success'
                });
                 //修改完毕就关闭对话框
                 this.dialogVisible = false;
                 //调用获取数据的方法更新数据列表
                this.getusers();
              }else{
                this.$message.error(result.data.msg);
              }
            })
            .catch(err => {//前端发送到
              this.$message.error("发送失败" + err.message);
            });
          // dialogVisible: false
        } else {
          console.log("×表单验证失败");
          return false;
        }
      });
    },
    //封装一个发送Ajax请求-----删除后的,新的数据库的渲染到用户列表上。避免全局刷新
    getusers() {
      this.axios
        .get( this.api+"/user/getusers")
        .then(result => {
          console.log("后端返回的数据", result.data);
          //3)把返回的数据赋值给表格数据(账号管理页)属性
          this.tableData = result.data; //如何对应。
        })
        .catch(err => {
          console.error(err.message);
        });
    },
    //关闭对话框的确认方法
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    //修改
    handleEdit(row) {
      //(1)绑定事件执行删除的方法，根据id执行删除
      console.log(row);
      //(2)前端发送ajax到后端userid
      this.axios
        .get(this.api+"/user/changuser?userid=" + row)
        .then(olddata => {
          console.log("服务器返回的结果s", olddata); //把旧的数据赋值给表单数据对象，包含了userid
          //(5)前端——把旧的数据回填的表单中
          this.ruleForm2 = olddata.data[0]; //将后端返回的数据赋给表单。这时上面的ruleForm2的字段已经改变，为返回后的字段
          //(5-1).准备模态框
          //(5-2)使用双向数据绑定回填数据
          this.dialogVisible = true; //显示对话框
        })
        .catch(err => {
          this.$message.error("出错了：" + err.message); //调用消息框给用户提示
        });
    },
    //删除按钮执行的方法
    // handleDelete(index, row) {//形参
    //   console.log(index, row);
    // }
    //删除
    handleDelete(row) {
      //去掉索引 通过找这一行对象里面的userid来找到对应的数据 row：形参  row=scope.row.userid(实参)
      //(1)绑定事件执行删除的方法，根据id执行删除
      //console.log("删除用户的id",row);
      //(2).前端发送ajax到后端
      this.axios
        .get(this.api+"/user/deluser?userid=" + row)
        .then(result => {
          console.log("这是服务器返回的结果", result); //打印出来的是一个对象。{{}}对象里面还有对象
          //(6).前端-根据返回的结果处理业务逻辑(删除成功就更新用户列表)
          result = result.data; //回去对象里面的data属性 {"isOK":false,"msg":"用户删除失败"}
          if (result.isOK) {
            this.$message({
              message: result.msg,
              type: "success"
            });
            //更新用户列表
            //this.$router.push("/userlist");//页面会整理刷新，用户体验差
            //再发起ajax请求删除后的数据，并赋值给tableData利用mvvm的特点自动实现无刷新更新
            this.getusers(); ////通过vue实例调用自定义方法，要加this
            // console.log(this)//this：代表VueComponent 组建
          } else {
            //删除失败
            this.$message.error("出错了:" + result.msg);
          }
        })
        .catch(err => {
          this.$message.error("出错了", err);
        });
    }
  },
  //组件实例化之后执行的构造
  created() {
    // 1）前端发起ajax请求到后端获取数据 Itunes.vue
    //调用上面封装好了
    this.getusers();
  },
  filters: {
    foramtData(oldDate) {
      return moment(oldDate).format("YYYY-MM-DD");
    }
    // foramtGroup(oldGroup){
    //  var group={
    //     user: "普通用户",
    //     management: "管理员"
    //   };
    //   return group[oldGroup];
    // }
  }
};
</script>

<style>
</style>



 