<template>
  <div style="min-width: 500px">
    <!--class="common-layout"-->
    <el-container style="height: fit-content">
      <el-header class="myHeader3">
        <MainHeader />
        <div style="margin-top: 100px; font-size: 30px; color: white">
          志愿支持
        </div>
      </el-header>
      <el-main class="mainBlock">
        <el-row class="search">
          <el-input v-model="inputAct" placeholder="请输入志愿活动名..." :prefix-icon="Search" clearable @change="goSearchAct" />
        </el-row>
        <el-col class="toptext">志愿活动</el-col>
        <!--el-link class="linktext">更多>></!--el-link-->
        <el-divider />
        <div v-if="volActList.length == 0">无相关内容</div>
        <!--div width="600px"-->
        <el-row type="flex" justify-content="flex-start">
          <el-card v-for="actitem in volActList" :key="actitem.VolActId" class="mycard" :body-style="{ padding: '0px' }">
            <el-image v-if="actitem.ActPicUrl == null" style="width: 100%; height: 150px" :src="pic" fit="cover" />

            <el-image v-if="actitem.ActPicUrl != null" style="width: 100%; height: 150px" :src="actitem.ActPicUrl"
              fit="cover" />

            <div class="bottom">
              <div style="color: #67bbff; font-size: 15px; margin: 0 0 10px">
                {{ actitem.VolActName }}
              </div>
              <div>
                位置：{{
                  codeToText(actitem.Province, actitem.City, actitem.Area)
                }}
              </div>
              <div>志愿时间：{{ actitem.ExpTime }}</div>
              <div>
                人数：{{ actitem.SignupPeople }}/{{ actitem.Needpeople }}人
              </div>
              <div>
                <el-button type="primary" class="button" round @click="goActInfo(actitem.VolActId)">了解详情</el-button>
              </div>
            </div>
          </el-card>
          <!-- </el-col> -->
        </el-row>
        <!--/!--div-->
        <div class="Parent">
          <!--分页-->
          <el-pagination v-model:page-size="pageSize" v-model:current-page="currentPage" :total="total"
            layout="total,prev, pager, next, jumper" @current-change="handleCurrentChange" />
        </div>
      </el-main>

      <el-main class="mainBlock">
        <el-col class="toptext">志愿捐助</el-col>
        <el-divider />
        <el-row :gutter="30">
        <el-col :span="7" :offset="2"><div class="donate-record-card">
          <div style="padding-top: 15px; ">历史捐款总额</div>
          <div style="padding-top: 35px; color: #67bbff;font-weight:bolder;font-size: larger">{{donateCount}}</div>
        </div></el-col>
        <el-col :span="7" :offset="2" ><div class="donate-record-card">
          <div style="padding-top: 15px; ">历史捐款人次</div>
          <div style="padding-top: 35px; color: #67bbff;font-weight:bolder; font-size: larger">{{donateHead}}</div>
        </div></el-col>
        <el-col :span="2" :offset="2">
          <el-button type="primary" class="donate-button">我要捐款</el-button>
        </el-col>
      </el-row>
      </el-main>

      <el-main class="mainBlock">
        <el-row class="toptext">
          <el-col :span="12"> 捐款记录 </el-col>
          <el-col :span="12"> 善款去向 </el-col>
        </el-row>
        <el-divider />
      
      <div class="overBlock">
        <el-row
          type="flex"
          justify="space-around"
        >
          <!--列元素居中-->
          <el-col
            :span="11"
            class="rank"
          >
            <el-row
              v-for="(income, index) in incomeList"
              :key="index"
              class="ranktop"
              style="align-items: center"
            >
              <el-image
                style="width: 50px; height: 50px; border-radius: 50%"
                :src="income.userHeadUrl"
                fit="cover"
              />
              <el-col :span="6">{{ income.phoneNum.substring(0,3)+"****"+ income.phoneNum.substring(7,11)}}</el-col>
              <el-col
                style="
                  justify-content: flex-end;
                  text-align: right;
                  font-weight: bold;
                  color: #2e74b6;

                "
                :span="5"
              >{{ income.amount }}</el-col>
              <el-col
                style="justify-content: flex-start; text-align: left"
                :span="4"
              >元</el-col>
              <el-col
                :span="6"
              >{{
                income.time
              }}</el-col>
            </el-row>
          </el-col>
          <div class="divideLine"></div>

          <el-col
            :span="11"
            class="rank" >
            <el-row
              v-for="(income, index) in incomeList"
              :key="index"
              class="ranktop outcome-record"
              style="align-items: center"
            >
              <el-col  :span="12" :offset="2" type="flex" justify="left">

                <el-row  style= "margin-bottom: 30px;">
                  <el-col>{{ income.amount }}</el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <div >历史捐款人次</div>
                    <div style="color: #67bbff;font-weight:bolder; font-size: larger">{{donateHead}}</div>
                  </el-col>
                  <el-col :span="12">
                    <div >历史捐款人次</div>
                    <div style="color: #67bbff;font-weight:bolder; font-size: larger">{{donateHead}}</div>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="8" style="font-size:small" >本项目自2022年12月29日上线以来，共筹集善款1053.67元，本项目2023年1月4日至2023年1月28日期间，组织志愿者开展项目前期调研工作，了解残障儿童的基础情况及需求。</el-col>
            </el-row>
          </el-col>

        </el-row>
      </div>

      </el-main>
      <Footer></Footer>
    </el-container>
  </div>
</template>

<script>
//import axios from "axios";
import api from "/src/api/index";
import { CodeToText } from "element-china-area-data";
import { ref } from "vue";
import MainHeader from "@/views/Frontstage/MainHeader.vue";
import Footer from "@/views/Frontstage/Footer.vue";
import { Search } from "@element-plus/icons-vue";
import { defaultDocument } from "@vueuse/core";
export default {
  name: "VolunActView",
  components: {
    MainHeader,
    Footer,
  },

  setup() {
    const inputAct = ref("");
    const currentDate = ref(new Date());
    let volActList = ref([]);
    let incomeList = ref([{"userHeadUrl":"https://yixun-picture.oss-cn-shanghai.aliyuncs.com/user_head/1.jpeg","phoneNum":"19969779835","amount":12878787832,"time":"2023-04-02"}]);
    // let volActSearch = ref([]);
    let currentPage = ref(1);
    let pageSize = ref(8);
    let total = ref(0);
    let ifSearch = ref(false);
    let pic =
      "https://yixun-picture.oss-cn-shanghai.aliyuncs.com/user_head/1.jpeg";
    let donateCount=ref(200000);
    let donateHead=ref(100000);
    console.log(pageSize.value);
    return {
      inputAct,
      Search,
      ifSearch,
      pic,
      currentDate,
      currentPage,
      pageSize,
      total,
      volActList,
      donateCount,
      donateHead,
      incomeList
    };
  },
  mounted() {
    this.getBeforePage();
  },
  methods: {
    codeToText(province, city, area) {
      return CodeToText[province] + CodeToText[city] + CodeToText[area];
    },
    goActInfo(actID) {
      console.log("志愿活动id:", actID);
      //跳转至活动详情页面
      this.$router.push({
        path: "/volunActInfo",
        //params: {  }, path和params不能同时使用，会使params失效，要用params需要将path替代为name(router名)
        query: { act_id: actID },
      });
    },

    //搜索志愿活动
    goSearchAct() {
      //this.ifSearch = true;
      this.currentPage = 1;
      //sessionStorage.setItem("volact_ifSearch", this.ifSearch);
      sessionStorage.setItem("volact_searchKey", this.inputAct);
      sessionStorage.setItem("volact_currentPage", this.currentPage);
      this.goonSearchAct();
    },
    goonSearchAct() {
      api
        .getActSearch(this.inputAct, this.currentPage, this.pageSize)
        .then((res) => {
          console.log("搜索成功", res);
          this.volActList = res.data.data.activity_list;
          this.total = res.data.data.total;
        })
        .catch((err) => {
          console.log("请求失败", err);
        });
    },
    //获取之前存储的页码，便于详情页跳转返回原页面
    getBeforePage() {
      //如果有这个就读取缓存里面的数据，没有的话当前页码设为1
      if (sessionStorage.getItem("volact_currentPage")) {
        this.currentPage = Number(sessionStorage.getItem("volact_currentPage"));
      }
      // else {
      //   this.currentPage = 1;
      // }

      if (sessionStorage.getItem("volact_searchKey")) {
        this.inputAct = sessionStorage.getItem("volact_searchKey");
      }
      this.goonSearchAct();
    },
    //更新分页
    handleCurrentChange(newPage) {
      console.log("新的页面", newPage);
      this.currentPage = newPage; //重新指定当前页
      this.goonSearchAct();
      //页码保存进sessionstorage
      sessionStorage.setItem("currentPage", newPage);
    },
  },
};
</script>

<style scoped>
.myHeader3 {
  height: 300px;
  background-image: url(../../image/volun.png);
  background-size: cover;
}

.mainBlock {
  background-color: #f4f6f9;
  position: relative;
  padding: 2% 3% 2%;
  width: 100%;
  height: 100%;
}

.Parent {
  display: flex;
}

.el-pagination {
  margin: auto;
}

.toptext {
  height: 30px;
  text-align: left;
  color: #2e74b6;
  font-size: 30px;
}

/*格式调整*/
.linktext {
  float: right;
  text-align: right;
  color: grey;
  font-size: 12px;
}

.el-divider {
  background-color: #67bbff;
  /*height: 36px;*/
  margin: 20px 0;
}

/*.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}*/
.search {
  float: right;
  text-align: right;
  width: 250px;
}

.mycard {
  border-radius: 10%;
  background-color: #ffffff;
  /* background-image: url(../assets/hands.png); */
  background-repeat: no-repeat;
  background-size: 100%;
  margin: 25px;
  width: 300px;
}

/*.text {
  text-align:left;
  font-size: 14px;
}
.item {
  margin-top: 5px;
  margin-bottom: 5px;
}
.time {
  font-size: 12px;
  color: #999;
}*/
.bottom {
  border-radius: 10%;
  background-color: #ffffff;
  padding: 14px;
  text-align: left;
  font-size: 10px;
  line-height: 18px;
  margin-top: 0%;
  margin-bottom: 5px;
}

/*.bottom {
  line-height: 12px;
  display: flex;
  justify-content: space-between;/*在主轴上的对齐方式
  align-items: center;/*在交叉轴上的对齐方式 
}*/
.button {
  float: right;
  background-color: #67bbff;
  padding: 0px;
  width: 40%;
  min-height: fit-content;
  font-size: 10px;
  margin-bottom: 5px;
}
.donate-record-card{
  border-radius: 15px;
  height: 150px;
  background:  #ffffff;
  margin-top: 15px;

}
  .donate-button {
    border-radius: 5px;
    height: 50px;
    background-color:#2e74b6;
    margin-top: 65px;
    font-size:medium;
}
.overBlock {
  margin-bottom: 5%;
}
.divideLine {
  position: absolute;
  /*right: 10px;*/
  width: 1px;
  height: 100%;
  background-image: linear-gradient(
    to bottom,
    #044c90 0%,
    #044c90 80%,
    transparent 50%
  );
  background-size: 100% 18px;
  background-repeat: repeat-y;
}

.ranktop {
  background-color: #ffffff;
  border-radius: 20px;
}
.outcome-record{
  height:150px;
}

.rank {
  padding: 1% 2% 2%;
}

</style>