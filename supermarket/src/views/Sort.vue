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
            <h3>分类管理</h3>
             <el-button style="float: right; padding: 10px 10px" type="text"><span>分类管理</span></el-button>
              <el-button style="float: right; padding: 10px 10px" type="text"><span>添加分类</span></el-button>
          </div>
          <div class="text item">
            <!-- 模板内容 -->
            <el-table
              :data="tableData"
              style="width: 100%"
            >
              <el-table-column label="分类管理" width="680px">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.sortname }}</span>
                </template>
              </el-table-column>

              <el-table-column label="管理">
                <template slot-scope="scope">
                  <el-button
                    @click.native.prevent="deleteRow(scope.$index,editor)"
                    type="text"
                    size="small"
                  >
                    <a><i class="el-icon-edit"></i></a>
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
          { sortname: "日用品" },
        { sortname: "舒肤佳" },
        { sortname: "力士" },
        { sortname: "上海硫磺" }
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
/* 为什么用不起？scoped */
.el-table th, .el-table td {
    padding: 4px 0;}
</style>



 