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
        <el-divider />
        <div v-if="volActList.length == 0">无相关内容</div>
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
              <div>开始时间：{{ actitem.ExpTime }}</div>
              <div>结束时间：{{ actitem.EndTime }}</div>
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
          <el-col :span="7" :offset="2">
            <div class="donate-record-card">
              <div style="padding-top: 15px; ">历史捐款总额</div>
              <div style="padding-top: 35px; color: #67bbff;font-weight:bolder;font-size: larger">{{ donateCount }}</div>
            </div>
          </el-col>
          <el-col :span="7" :offset="2">
            <div class="donate-record-card">
              <div style="padding-top: 15px; ">历史捐款人次</div>
              <div style="padding-top: 35px; color: #67bbff;font-weight:bolder; font-size: larger">{{ donateHead }}</div>
            </div>
          </el-col>
          <el-col :span="2" :offset="2">
            <el-button type="primary" class="donate-button" @click="pay()">我要捐款</el-button>
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
          <el-row type="flex" justify="space-around">
            <!--列元素居中-->
            <el-col :span="11" class="rank">
              <el-row v-for="(income, index) in incomeList" :key="index" class="ranktop"
                style="align-items: center;margin-bottom:30px">
                <el-image style="width: 50px; height: 50px; border-radius: 50%" :src="income.userHeadUrl" fit="cover" />
                <el-col :span="6">{{ income.phoneNum.substring(0, 3) + "****" + income.phoneNum.substring(7, 11)
                }}</el-col>
                <el-col style="
                  justify-content: flex-end;
                  text-align: right;
                  font-weight: bold;
                  color: #2e74b6;
                " :span="5">{{ income.amount }}</el-col>
                <el-col style="justify-content: flex-start; text-align: left; color: #2e74b6;" :span="4">元</el-col>
                <el-col :span="6">{{
                  income.time
                }}</el-col>
              </el-row>
              <div class="Parent">
                <!--分页-->
                <el-pagination v-model:page-size="donatePageSize" v-model:current-page="donatePageNum"
                  :total="donateTotal" layout="total,prev, pager, next, jumper"
                  @current-change="handleCurrentChange_donate" />
              </div>

            </el-col>

            <div class="divideLine"></div>

            <el-col :span="11" class="rank">
              <el-row v-for="(expense, index) in expenseList" :key="index" class="ranktop outcome-record"
                style="align-items: center; margin-bottom:30px">
                <el-col :span="12" :offset="2" type="flex" justify="left" class="financeOutBox_middle">

                  <el-row style="margin-bottom:20px;font-weight:bolder;font-size: larger;align-items: center;">
                    <el-col>{{ expense.fund_out_usage }}</el-col>
                  </el-row>
                  <el-row style="height:60%;align-items: center;">
                    <el-col :span="12" class="financeOutBox_inner">
                      <div style="color: #67bbff;font-weight:bolder; font-size: larger">{{ expense.fund_out_amount }}元
                      </div>
                      <div class="financeOutText">支出金额</div>
                    </el-col>
                    <el-col :span="12" class="financeOutBox_inner">
                      <div style="color: #67bbff;font-weight:bolder; font-size:larger">{{ expense.fund_out_time }}</div>
                      <div class="financeOutText">支出时间</div>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="8" style="font-size:small;text-align: left;">{{ expense.fund_out_detail }}</el-col>
              </el-row>
              <div class="Parent">
                <!--分页-->
                <el-pagination v-model:page-size="fundOutPageSize" v-model:current-page="fundOutPageNum"
                  :total="fundOutTotal" layout="total,prev, pager, next, jumper"
                  @current-change="handleCurrentChange_fundOut" />
              </div>
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
import { ElMessage } from "element-plus";
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
    let incomeList = ref([]);
    let expenseList = ref([]);
    // let volActSearch = ref([]);
    let currentPage = ref(1);
    let pageSize = ref(8);
    let total = ref(0);
    let ifSearch = ref(false);
    let pic =
      "https://yixun-picture.oss-cn-shanghai.aliyuncs.com/user_head/1.jpeg";
    let donatePageNum = ref(1);
    let donatePageSize = ref(5);
    let donateCount = ref();
    let donateHead = ref();
    let donateTotal = ref(0);
    let fundOutPageNum = ref(1);
    let fundOutPageSize = ref(2);
    let fundOutTotal = ref(0);
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
      incomeList,
      expenseList,
      donatePageSize,
      donatePageNum,
      donateTotal,
      fundOutPageNum,
      fundOutPageSize,
      fundOutTotal,
      user_id: "",
      //是否已登陆
      loginState: false,
    };
  },
  mounted() {
    this.getBeforePage();
    this.getDonateRecord();
    this.getDonateCount();
    this.getDonateHead();
    this.getFundOutRecord();
    if ((this.user_id = sessionStorage.getItem("userid") != null)) {
        this.loginState = true;
    }
  },
  methods: {
    getDonateCount() {
      api
        .getDonateCount()
        .then((res) => {
          console.log("获取捐款数量成功", res);
          this.donateCount = res.data;
        })
        .catch((err) => {
          console.log("获取捐款数量失败", err);
        });
    },
    getDonateHead() {
      api
        .getDonateHead()
        .then((res) => {
          console.log("获取捐款人数成功", res);
          this.donateHead = res.data;
        })
        .catch((err) => {
          console.log("获取捐款人数失败", err);
        });
    },
    getDonateRecord() {
      api
        .getDonateRecord(
          this.donatePageNum,
          this.donatePageSize
        )
        .then((res) => {
          console.log(res.data);
          this.incomeList = res.data.data.income;
          this.donateTotal = res.data.data.total;
        });
    },
    handleCurrentChange_donate(newPage) {
      this.donatePageNum = newPage; //重新指定当前页
      this.getDonateRecord();
    },
    getFundOutRecord() {
      api
        .getFundOutRecord(
          this.fundOutPageNum,
          this.fundOutPageSize
        )
        .then((res) => {
          console.log(res.data);
          this.expenseList = res.data.data.fund_out;
          this.fundOutTotal = res.data.data.total;
        });
    },
    handleCurrentChange_fundOut(newPage) {
      this.fundOutPageNum = newPage; //重新指定当前页
      this.getFundOutRecord();
      console.log("换页成功")
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
      else{
        //跳转至捐款页面
        this.$router.push({
          path: "/donate",
        });
      }
    },
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
.financeOutText {
  font-size: small;
}

.financeOutBox_middle {
  display: flex;
  flex-direction: column;
  text-align: left;
  justify-content: space-between;
}

.financeOutBox_inner {
  display: flex;
  flex-direction: column;
  text-align: left;
}

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

.donate-record-card {
  border-radius: 15px;
  height: 150px;
  background: #ffffff;
  margin-top: 15px;

}

.donate-button {
  border-radius: 5px;
  height: 50px;
  background-color: #2e74b6;
  margin-top: 65px;
  font-size: medium;
}

.overBlock {
  margin-bottom: 5%;
}

.divideLine {
  position: absolute;
  /*right: 10px;*/
  width: 1px;
  height: 100%;
  background-image: linear-gradient(to bottom,
      #044c90 0%,
      #044c90 80%,
      transparent 50%);
  background-size: 100% 18px;
  background-repeat: repeat-y;
}

.ranktop {
  background-color: #ffffff;
  border-radius: 20px;
}

.outcome-record {
  height: 170px;
}

.rank {
  padding: 1% 2% 2%;
}
</style>