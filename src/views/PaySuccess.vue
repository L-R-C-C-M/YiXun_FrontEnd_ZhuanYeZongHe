<template>
    <div>
      <!--class="common-layout"-->
      <el-container>
        <el-header style="padding: 0">
          <InfoHeader />
        </el-header>
        <el-main :style="{ minHeight: `${screenHeight}px` }">
            <div class="center">
                <el-image style="width: 150px;" :src="require('../../image/pay_success.png')" :fit="contain" />
                <div style="padding-top: 1%; font-size: larger;">支付成功</div>
                <el-button @click="goBack()" type="primary" size="large" class="return" style="margin-top: 2%;"
                    > 返回</el-button
                >
        </div>
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
    setup(){
        const screenHeight = 0.89*window.innerHeight;
        const num = ref(10);
        const method = ref(1);
        const out_trade_no=sessionStorage.getItem("out_trade_no");
        console.log(`屏幕高度为：${screenHeight}px`);

        return {
            screenHeight,
            out_trade_no
        }
    },
    mounted(){
        this.checkPay();
    },
    methods: {
        goBack() {
            //跳转至捐款页面
            this.$router.push({
            path: "/volunAct",
            });
        },
        checkPay(){
            if(this.out_trade_no!=null){
                api
                api
                    .payCheck(this.out_trade_no)
                    .then((res) => {
                        console.log("支付调用成功", res);
                    })

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
    float: center;
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

.center {
    padding-top: 17%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

  </style>