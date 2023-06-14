<template>
  <div>
    <!--class="common-layout"-->
    <el-container>
      <el-header style="padding: 0">
        <InfoHeader />
      </el-header>
      <el-main :style="{ minHeight: `${screenHeight}px` }">
        <el-row>
          <el-button @click="goBack()" type="text" class="return">&lt;&lt;返回</el-button>
          <!--el-button @click="prev()">返回</!--el-button-->
        </el-row>
        <el-row class="toptext">付款信息</el-row>
        <el-divider />
        <div class="card1">
          <el-row class="info" :gutter="20">
            <el-col :span="4">
              <div>收 款 方：</div>
            </el-col>
            <el-col :span="4">
              <div>益寻 </div>
            </el-col>
          </el-row>
          <el-row class="info" :gutter="20">
            <el-col :span="4">
              <div>支付用途：</div>
            </el-col>
            <el-col :span="4">
              <div>公益捐款 </div>
            </el-col>
          </el-row>
          <el-row class="info" :gutter="20">
            <el-col :span="4">
              <div>捐款金额：</div>
            </el-col>
            <el-col :span="4"> <el-input-number v-model="num" :step="10"></el-input-number></el-col>
            <el-col :span="4">
              <div>元</div>
            </el-col>
          </el-row>
        </div>
        <el-row class="toptext">支付方式</el-row>
        <el-divider />
        <div class="card2">
          <el-radio-group v-model="method">
            <el-radio :label="1"> <el-image style="width: 150px; height: 55px"
                :src="require('../../image/AliPayLogo.png')" :fit="contain" /> </el-radio>
            <el-radio :label="2"> <el-image style="width: 150px; height: 40px" :src="require('../../image/WePayLogo.png')"
                :fit="contain" /></el-radio>
            <el-radio :label="3"> <el-image style="width: 150px; height: 40px"
                :src="require('../../image/UnionPayLogo.jpg')" :fit="contain" /></el-radio>
          </el-radio-group>
        </div>
        <el-button type="primary" color="#2e74b6" size="large" @click="pay()"> 确定 </el-button>

      </el-main>
      <Footer></Footer>
    </el-container>
  </div>
</template>
  
<script>
import axios from 'axios'
import api from "/src/api/index";
import InfoHeader from "@/views/Frontstage/InfoHeader.vue";
import Footer from "@/views/Frontstage/Footer.vue";
import { ref } from 'vue'
export default {
  name: "donate",
  components: {
    InfoHeader,
    Footer,
  },
  setup() {
    const screenHeight = 0.85 * window.innerHeight;
    const num = ref(10);
    const method = ref(1);
    const out_trade_no = ref(0);
    const user_id = JSON.parse(sessionStorage.getItem("userid"));
    console.log(`屏幕高度为：${screenHeight}px`);

    return {
      screenHeight,
      num,
      //付款方式
      method,
      user_id,
      //是否已登陆
      loginState: false,
      out_trade_no,
    }
  },
  mounted() {
    console.log(this.user_id);
    if (this.user_id != null) {
      this.loginState = true;
    }
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    pay() {
      //检查登陆状态
      if (!this.loginState) {
        ElMessage({
          message: "请先登录",
          type: "warning",
        });
        //跳转至登陆页面
        this.$router.push({
          path: "/login",
        });
      }
      else {
        //支付宝支付
        if (this.method == 1) {
          console.log(this.user_id);
          api
            .createOrder(this.user_id, this.num)
            .then((res) => {
              console.log(res.data);
              this.out_trade_no = res.data.data.outTradeNo;
              console.log(this.out_trade_no)
              sessionStorage.setItem("out_trade_no", this.out_trade_no);
              const url = 'http://47.96.94.96:3300/api/Alipay/pay?out_trade_no=' + this.out_trade_no + '&subject=益寻公益捐款&total_amount=' + this.num
              window.open(url, '_blank');
            });
        }
        //微信支付
        else if (this.method == 2) {
          //跳转至微信捐款页面
          this.$router.push({
            path: "/weixinpay",
          });
        }
      }
    }
  }
};
</script>
  
<style scoped>
.el-main {
  background-color: #f4f6f9;
  position: relative;
  padding: 2% 15% 15%;
  width: 100%;
}

.el-footer {
  background-color: #202741;
  color: #dddcdc;
  height: 40px;
  font-size: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.return {
  float: left;
  color: grey;
  font-size: 15px;
  margin-bottom: 30px;
}

.toptext {
  height: 30px;
  text-align: left;
  margin-top: 30px;
  color: #2e74b6;
  font-size: 30px;
}

.card1 {
  border-radius: 15px;
  height: 150px;
  background: #ffffff;
  margin-top: 15px;
  text-align: left;
  font-size: larger;
  padding-left: 10%;
  padding-top: 30px;
  font-weight: bold;
}

.card2 {
  border-radius: 15px;
  height: 80px;
  background: #ffffff;
  margin-top: 15px;
  margin-bottom: 40px;
  text-align: left;
  font-size: larger;
  padding-left: 10%;
  padding-top: 50px;
  font-weight: bold;
}

.info {
  margin-bottom: 20px;

}
</style>