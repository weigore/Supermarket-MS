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
            <h3>系统信息</h3>
          </div>

          <div class="text item">
            <el-alert
              title="商品总数:5。已经销售的总金额:890.00。库存商品总价:1235.82"
              type="warning"
              show-icon
            >
            </el-alert>

            <el-alert
              title="导入数据"
              type="success"
              show-icon
            >
            </el-alert>

            <!-- 一行两列 -->
            <el-row :gutter="40">
              <!-- 左侧 -->
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <el-card class="box-card">
                    <div
                      slot="header"
                      class="clearfix"
                    >
                      <h3>销售排行</h3>
                    </div>
                    <div class="text item">
                      <el-table :data="tableData" stripe style="width: 100%">
                        <el-table-column prop="name" label="商品名称" width="300"></el-table-column>
                        <el-table-column prop="sales" label="销量"></el-table-column>
                      </el-table>
                    </div>
                  </el-card>
                </div>
              </el-col>
              <!-- 右侧 -->
              <el-col :span="12">
                <div class="grid-content bg-purple-light">
                  <el-card class="box-card">
                    <div slot="header" class="clearfix" >
                      <h3>缺货商品</h3>
                    </div>
                    <div class="text item">
                      <el-table :data="tableData2" stripe style="width: 100%">
                        <el-table-column prop="goods" label="商品名称" width="180"></el-table-column>
                        <el-table-column prop="stock" label="库存" width="180"></el-table-column>
                        <el-table-column prop="action" label="操作"></el-table-column>
                      </el-table>
                    </div>
                  </el-card>

                </div>
              </el-col>
            </el-row>

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
      tableData: [
        {
          name: "海飞丝去屑洗发水",
          sales: 8
        },
        {
          name: "茅台酒",
          sales: 6
        },
        {
          name: "龙凤呈祥",
          sales: 5
        },
        {
          name: "龙凤呈祥2",
          sales: 2
        },
         {
          name: "龙凤呈祥2",
          sales: 2
        },
         {
          name: "龙凤呈祥2",
          sales: 2
        }
      ],
      // ,
      tableData2: [{
          goods: '我的优乐美',
          stock: 0,
          action: <a>入库</a>
        }]
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



 