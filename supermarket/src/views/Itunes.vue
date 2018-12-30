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
              <h3>
                账号管理
              </h3>
              <el-button style="float: right; padding: 10px 10px" type="text"><span>账号管理</span></el-button>
              <el-button style="float: right; padding: 10px 10px" type="text"><span>添加账号</span></el-button>
              <el-button style="float: right; padding: 10px 10px" type="text"><span>密码修改</span></el-button>
          </div>

          <div class="text item">
            <!-- 模板内容 -->
            <el-table :data="tableData" style="width: 100%">
              <el-table-column label="用户名称" width="380">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.username }}</span>
                </template>
              </el-table-column>
              
              <el-table-column label="用户组" width="380">
                <template slot-scope="scope"> 
                  <el-popover trigger="hover" placement="top">
                    <!-- <p>姓名: {{ scope.row.name }}</p>
                    <p>住址: {{ scope.row.address }}</p> -->
                    <div slot="reference" class="name-wrapper">
                      <el-tag size="medium">{{ scope.row.group }}</el-tag>
                    </div>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column label="管理">
                <template slot-scope="scope">
                  <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">
                    <i class="el-icon-edit"><a>编辑</a></i>
                  </el-button>
                  <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">
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
    return {
      tableData: [
        {
          username: "admin",
          group: "超级管理员",
        },
         {
          username: "admin",
          group: "超级管理员",
        }
      ]
    };
  },
  //三、 父组件中注册子组件
  components: {
    LeftMenu,
    RightTop,
    RightFoot
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  }
};
</script>

<style>

</style>



 