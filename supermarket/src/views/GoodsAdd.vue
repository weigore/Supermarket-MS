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
            <h3>添加商品</h3>
          </div>
          <div class="text item">
              <!-- 模板内容 -->
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
                     <el-button type="success" @click="createBarcode()">生成条码</el-button>
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
                  <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">添加商品</el-button>
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
    return {
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
     submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
           //表单验证通过
          //1）前端——表单验证通过后收集数据发起ajax请求去后端api
              this.axios
                .post(`${this.api}/goods/add`,this.qs.stringify(this.ruleForm))
                .then(result=>{
                  console.log("后端返回的结果是",result);
                  //{data: {…}, status: 200, statusText: "OK", headers: {…}, config: {…}, …}
                  //4）前端——根据后端的json处理业务逻辑 
                  if(result.data.isOK){
                    this.$message({
                      message:"恭喜你哦,"+result.data.msg,
                      type:"success"
                    });
                    //确认是否继续添加的对话框的内容
                        this.$confirm('是否继续添加商品？', '提示', {
                          confirmButtonText: '确定',
                          cancelButtonText: '取消',
                          type: 'warning'
                        }).then(() => {
                          //确认：执行再次添加，重置表单
                           this.ruleForm={
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
                              };
                        }).catch(() => {
                          //取消执行，跳转到列表页
                          this.$router.push("/goodsmsg")       
                        });
                  }else{
                    console.message()
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
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      //生成条码的方法
      createBarcode(){
        this.ruleForm.barcode=new Date().getTime();
      },
       //自动更新价格  市场价=进货价*3.2    销售价=市场价*0.9
       updatePrice(){
          this.ruleForm.marketprice=this.ruleForm.costprice *3.2  ;
           this.ruleForm.saleprice = this.ruleForm.marketprice * 0.9;
       }
    }
};
</script>

<style>
</style>



 