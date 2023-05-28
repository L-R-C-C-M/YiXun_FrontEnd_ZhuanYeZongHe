<template>
    <div>
      <!--class="common-layout"-->
      <el-container>
        <el-header style="padding: 0">
          <InfoHeader />
        </el-header>
        <el-main :style="{ minHeight: `${screenHeight}px` }">
            <el-row>
                <el-button @click="goBack()" type="text" class="return"
                    >&lt;&lt;返回</el-button
                >
                <!--el-button @click="prev()">返回</!--el-button-->
            </el-row>

            <el-row style="display: flex; justify-content: center; align-items: center;">
                <el-image style="height: 500px;" :src="require('../../image/weixin_codebar.png')" :fit="contain" /> 
            </el-row>
           

        </el-main>
        <Footer></Footer>
      </el-container>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
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
        const screenHeight = 0.85*window.innerHeight;
        console.log(`屏幕高度为：${screenHeight}px`);

        return {
            screenHeight,
        }
    },
    methods: {
        goBack() {
        this.$router.back();
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

  </style>