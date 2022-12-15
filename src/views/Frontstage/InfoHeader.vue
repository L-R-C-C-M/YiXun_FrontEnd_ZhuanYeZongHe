<!-- @author:刘睿萌-详情界面的顶部导航栏（无背景图片） -->
<template>
  <div class="detail-view">
    <el-header style="height: 60px">
      <el-menu
        router
        :default-active="activeIndex"
        class="up-menu"
        mode="horizontal"
        background-color="#202741"
        text-color="#FFFFFF"
        active-text-color="#2E74B6"
        :ellipsis="false"
        @select="handleSelect"
      >
        <el-image
          style="height: 70%; width: 20%"
          :src="require('../../../image/logo.png')"
          fit="contain"
        />
        <div class="flex-grow" />
        <el-menu-item index="/">首页</el-menu-item>
        <el-menu-item index="/volunOver">志愿活动</el-menu-item>
        <!--el-menu-item index="/forum">寻人论坛</!--el-menu-item-->
        <el-menu-item index="/news">寻人资讯</el-menu-item>
        <el-menu-item index="/department">相关部门信息</el-menu-item>
        <el-avatar
          v-if="loginState && userHead != null"
          shape="circle"
          :src="userHead"
          @click="gobackStage"
        ></el-avatar>
        <el-avatar
          v-if="loginState && userHead == null"
          shape="circle"
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          @click="gobackStage"
        ></el-avatar>
        <el-menu-item v-if="!loginState" index="/login">登录</el-menu-item>
      </el-menu>
    </el-header>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import api from "/src/api/index";
export default {
  name: "InfoHeader",
  setup() {
    let loginState = reactive(false);
    // let userHead = ref(
    //   "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
    // ); //默认图片
    let userHead = ref("");
    let user_type = reactive("");
    let user_id = reactive();
    let homepage = reactive("/"); //个人主页路径
    if (sessionStorage.getItem("userid") != null) {
      loginState = true;
      user_id = JSON.parse(sessionStorage.getItem("userid"));
      //获取用户头像
      api
        .getUserHead(user_id)
        .then((res) => {
          console.log("请求用户头像成功", res);
          //console.log("用户头像", userHead.value);
          if (res.data.data.user_head != null) {
            userHead.value = res.data.data.user_head;
            console.log("有图");
          } else console.log("无图");
        })
        .catch((err) => {
          console.log("请求失败", err);
        });
      user_type = JSON.parse(sessionStorage.getItem("useridentity"));
      if (user_type == "user") homepage = "/UserBackstage/UserHomePage";
      else homepage = "/VolBackstage/VolHomePage";
    }
    return {
      homepage,
      loginState,
      user_id,
      userHead,
      user_type,
    };
  },
  methods: {
    gobackStage() {
      if (this.user_type == "user") {
        //普通用户
        this.$router.push({ path: "/UserBackstage/UserHomePage" });
      } else {
        //志愿者
        this.$router.push({ path: "/VolBackstage/VolHomePage" });
      }
    },
  },
};
//放一些引入的量  如const url =‘balabala'
// import { ref } from 'vue'
// const activeIndex = ref('1')
// const handleSelect = (key: string, keyPath: string[]) => {
//   console.log(key, keyPath)
// }
</script>


<!-- css -->
<style scoped>
.detail-view .el-header {
  background-color: #202741;
  color: #ffffff;
  align-items: center;
  display: flex;
  justify-content: center;
}
.up-menu {
  height: 55px;
  width: 100%;
  align-items: center;
}
.flex-grow {
  flex-grow: 1;
}
</style>