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
            <h3>商品管理</h3>
          </div>
          <div class="text item">
              <!-- 模板内容 -->
                <!-- 搜索 -->
              <div>
                <el-form :inline="true" :model="formSearch" class="demo-form-inline" id="goodsMsgInput">
                      <el-form-item label="选择分类">
                        <el-select v-model="formSearch.classname" placeholder="选择分类">
                          <el-option label="日用品" value="日用品"></el-option>
                          <el-option label="零食" value="零食"></el-option>
                          <el-option label="服装" value="服装"></el-option>
                          <el-option label="玩具" value="玩具"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="关键字">
                        <el-input v-model="formSearch.keywords" placeholder="商品名称,条形码"></el-input>
                      </el-form-item>
                      <el-form-item>
                        <el-button type="success" @click="onSearch">查询</el-button>
                      </el-form-item>
                    </el-form>
              </div>
              <div id="searchBox"></div>
              <!-- 商品列表-->
              <div>
                  <el-table :data="tableData" style="width: 100%">
                    <el-table-column label="商品条码">
                      <template slot-scope="scope">
                        {{ scope.row.barcode }}
                      </template>
                    </el-table-column>

                    <el-table-column label="商品名称">
                      <template slot-scope="scope">
                          {{ scope.row.goodsname }}
                      </template>
                    </el-table-column>

                    <el-table-column label="所属分类">
                      <template slot-scope="scope">
                          {{ scope.row.classname }}
                      </template>
                    </el-table-column>

                    <el-table-column label="售价">
                      <template slot-scope="scope">
                          {{ scope.row.saleprice }}
                      </template>
                    </el-table-column>

                    <el-table-column label="市场价">
                      <template slot-scope="scope">
                          {{ scope.row.marketprice }}
                      </template>
                    </el-table-column>

                    <el-table-column label="成本价">
                      <template slot-scope="scope">
                          {{ scope.row.costprice }}
                      </template>
                    </el-table-column>

                    <el-table-column label="操作" width="180">
                      <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.row.goodsid)"><i class="el-icon-edit"></i> 编辑</el-button>
                        <el-button
                          size="mini"
                          type="danger"
                          @click="handleDelete(scope.row.goodsid)"
                        ><i class="el-icon-delete"></i>删除</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
            </div>
              <!--分页 -->
              <!--:page-sizes 	每页显示个数选择器的选项设置
                   page-size    每页显示条目个数，
                  -->
                 <div class="pagerBox">
                    <el-pagination
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :current-page="currentPage"
                      :page-sizes="[10, 20, 30, 40]"
                      :page-size="pageSize"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="total">
                    </el-pagination>
                </div>
          

          </div>

        </el-card>
      </el-main>

      <!--  2.3 页脚-->
      <el-footer>
        <RightFoot></RightFoot>
      </el-footer>
    </el-container>
    <!-- 模态框 -->
    <el-dialog
      title="修改商品资料"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      id="mydailog"
    >
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                
                  <el-form-item label="所属分类" prop="classname">
                    <el-select v-model="ruleForm.classname" placeholder="选择分类">
                      <el-option label="零食" value="零食"></el-option>
                      <el-option label="玩具" value="玩具"></el-option>
                       <el-option label="服装" value="服装"></el-option>
                      <el-option label="鞋包" value="鞋包"></el-option>
                    </el-select>
                  </el-form-item>

                  <el-form-item label="商品条形码" prop="barcode">
                    <el-input v-model="ruleForm.barcode"></el-input>
                  </el-form-item>

                   <el-form-item label="商品名称" prop="goodsname">
                    <el-input v-model="ruleForm.goodsname"></el-input>
                  </el-form-item>

                   <el-form-item label="商品进价" prop="costprice">
                    <el-input v-model="ruleForm.costprice" @blur="updatePrice()"></el-input>
                  </el-form-item>

                 <el-form-item label="商品售价" prop="saleprice">
                <el-input v-model="ruleForm.saleprice"></el-input>
              </el-form-item>

                  <el-form-item label="市场价" prop="marketprice">
                <el-input v-model="ruleForm.marketprice"></el-input>
              </el-form-item>

              <el-form-item label="入库数量" prop="stocknum">
                <el-input v-model="ruleForm.stocknum"></el-input>
              </el-form-item>

              <el-form-item label="商品重量" prop="weight">
                <el-input v-model="ruleForm.weight"></el-input>
              </el-form-item>

              <el-form-item label="商品单位" prop="unit">
                <el-input v-model="ruleForm.unit"></el-input>
              </el-form-item>

                  <el-form-item label="会员优惠" prop="isdiscount">
                    <el-radio-group v-model="ruleForm.isdiscount">
                       <el-radio label="1" value="1">享受</el-radio>
                        <el-radio label="0" value="0">不享受</el-radio>
                    </el-radio-group>
                  </el-form-item>

                   <el-form-item label="是否促销" prop="ispromotion">
                    <el-radio-group v-model="ruleForm.ispromotion">
                     <el-radio label="1" value="1">启用</el-radio>
                     <el-radio label="0" value="0">禁用</el-radio>
                    </el-radio-group>
                  </el-form-item>

                  <el-form-item label="商品简介" prop="details">
                    <el-input type="textarea" v-model="ruleForm.details"></el-input>
                  </el-form-item>
               </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确定修改</el-button>
      </span>
    </el-dialog>
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
          dialogVisible: false,
          tableData: [],
           // 查询的表单
          formSearch: {
          classname: '',
          keywords: ''
        },
        currentPage: 1,//当前在那页，默认值
        pageSize:5,    //每页大小，默认值
        total: 0,      //总记录数量
       //数据对象
     ruleForm: {
        classname: "",
        barcode: "",
        goodsname: "",
        saleprice: 0,
        marketprice: 0,
        costprice: 0,
        stocknum: 0,
        weight: "",
        unit: "",
        isdiscount: "1",
        ispromotion: "0",
        details: ""
        },
        rules: {
            classname: [{ required: true, message: "请选择分类", trigger: "change" }],
            barcode: [{ required: true, message: "请输入条码", trigger: "blur" }],
            goodsname: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
            costprice: [{ required: true, message: "商品进货价必须输入", trigger: "blur" }]
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
    //改变每页大小的方法
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        //把改变后的值赋值给数据属性
        this.pageSize=val;
        this.getGoods();
      },
      //改变当前页
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
         //把改变后的值赋值给数据属性
         this.currentPage=val;
         this.getGoods();
      },
      getGoods(){
        console.log(this.formSearch.classname);
        this.axios.get(`${this.api}/goods/getgoods?classname=${this.formSearch.classname}&keywords=${this.formSearch.keywords}&pagesize=${this.pageSize}&currentpage=${this.currentPage}`)
       .then(result=>{
          console.log("这是",result)
          this.tableData=result.data.goodsArray
           //把后端返回的total总记录数赋值给total属性
           this.total=result.data.total;
       })
       .catch(err=>{
         console.error(err.message);
       })
      },
      onSearch() {
       //点击搜索按钮，把商品分类和关键字，发送到后端api
       //`${this.api}/goods/goodsmsg?classname=${this.onSearch.classname}&keywords=${this.onSearch.keywords}&pagesize=${this.pageSize}&currentpage=${this.currentPage}`
       //调用封装的方法
      this.getGoods();
      },
      handleEdit(goodsid) { // 根据商品id来获取该商品信息数据，在弹出编辑商品模态框, 把数据渲染到模态框中
        this.axios.get(`${this.api}/goods/changgoods?goodsid=${goodsid}`)
        .then(result => {
          console.log(result.data);
          result.data[0].isdiscount = result.data[0].isdiscount + "";
          result.data[0].ispromotion = result.data[0].ispromotion + "";
          this.ruleForm = result.data[0];
          this.dialogVisible = true;
        }).catch(err => {

        });
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
           //表单验证通过
          //1）前端——表单验证通过后收集数据发起ajax请求去后端api
              this.axios
                .post(`${this.api}/goods/savegoods`,this.qs.stringify(this.ruleForm))
                .then(result=>{
                  console.log("后端返回的结果是",result);
                  //{data: {…}, status: 200, statusText: "OK", headers: {…}, config: {…}, …}
                  //4）前端——根据后端的json处理业务逻辑 
                  if(result.data.isOK){
                    this.$message({
                      message:"恭喜你哦,"+result.data.msg,
                      type:"success"
                    });
                    this.dialogVisible = false;
                    this.getGoods();
                  }else{
                     this.$message.error("错了哦，"+result.data.msg);
                  }
                })
                .catch(err=>{
                  console.error(err.message)
                });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    //自动更新价格  市场价=进货价*3.2    销售价=市场价*0.9
    updatePrice(){
      this.ruleForm.marketprice = this.ruleForm.costprice * 3.2;
      this.ruleForm.saleprice = this.ruleForm.marketprice * 0.9;
    }
  },
  // 功能：获取数据到全表
   //1）前端——created钩子函数中发起ajax请求去获取商品数据信息
   created(){
    this.getGoods();
   },
   
   //功能：执行查询
};
</script>

<style>
</style>



 