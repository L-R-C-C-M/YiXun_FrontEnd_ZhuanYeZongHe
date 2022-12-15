<template>
  <el-container style="height: fit-content">
    <el-header class="myHeader3">
      <MainHeader />
      <div style="margin-top: 100px; font-size: 30px; color: white">
        志愿活动
      </div>
    </el-header>
    <el-main class="mainBlock">
      <div class="overBlock">
        <el-col class="toptext">志愿活动</el-col>
        <router-link to="/volunAct" class="linktext">更多>></router-link>
        <!--el-link class="linktext">更多>></!--el-link-->
        <el-divider />
        <el-row type="flex" justify-content="flex-start">
          <!--列元素居中-->
          <!-- <el-col
            v-for="actitem in volActAll"
            :key="actitem.VolActId"
            :span="6"
          > -->
          <el-card
            v-for="actitem in volActAll"
            :key="actitem.VolActId"
            @click="goActInfo(actitem.VolActId)"
            class="mycard"
            :body-style="{ padding: '0px' }"
          >
            <el-image
              v-if="actitem.ActPicUrl == null"
              style="width: 100%; height: 150px"
              :src="pic"
              fit="cover"
            />

            <el-image
              v-if="actitem.ActPicUrl != null"
              style="width: 100%; height: 150px"
              :src="actitem.ActPicUrl"
              fit="cover"
            />

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
                <el-button type="primary" class="button" round
                  >了解详情</el-button
                >
              </div>
            </div>
          </el-card>
          <!-- </el-col> -->
        </el-row>
      </div>

      <!--div class="overBlock">
        <el-col class="toptext">志愿机构</el-col>
        <router-link
          to="/volunInst"
          class="linktext"
        >更多>></router-link>
        <el-divider />
        <el-row
          type="flex"
          justify-content="flex-start"
      -->

      <!--列元素居中-->
      <!--旧版已注释 <el-col
            v-for="institem in volInstAll.slice(0, 4)"
            :key="institem.VolInstId"
            :span="6"
          > -->

      <!--el-card
            v-for="institem in volInstAll.slice(0, 4)"
            :key="institem.VolInstId"
            @click="goInstInfo(institem.VolInstId)"
            class="InstCard"
            :body-style="{ padding: '0px' }"
          >
            <el-row style="padding: 10% 5% 0">
              <el-col :span="6"-->

      <!--旧版已注释 <el-avatar
                  v-if="institem.InstPicUrl != null"
                  shape="square"
                  :src="institem.InstPicUrl"
                />
                <el-avatar
                  v-if="institem.InstPicUrl == null"
                  shape="square"
                  src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                  fit="cover"
                /> -->

      <!--el-image
                  v-if="institem.InstPicUrl"
                  style="width: 50px; height: 50px"
                  :src="institem.InstPicUrl"
                  fit="cover"
                /-->
      <!--默认头像-->
      <!--el-image
                  v-else
                  style="width: 50px; height: 50px"
                  :src="pic"
                  fit="cover"
                /-->

      <!--旧版已注释 <el-avatar shape="square" :src="pic" fit="fill" /> -->

      <!--/el-col>
              <el-col :span="18">
                <div style="
                    color: #67bbff;
                    font-size: 15px;
                    text-align: left;
                    padding-bottom: 5%;
                  ">
                  {{ institem.InstName }}
                </div>
                <div style="font-size: 12px; text-align: left">
                  {{ institem.InstSlogan }}
                </div>
                <div style="font-size: 12px; text-align: left">
                  |位置：{{
                    codeToText(institem.Province, institem.City, institem.Area)
                  }}
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col
                :span="12"
                class="botInfo"
              >
                <div style="color: #2e74b6">{{ institem.PeopleCount }}</div>
                <div>组织人数</div>
              </el-col>
              <el-col
                :span="12"
                class="botInfo"
              >
                <div style="color: #2e74b6; background-color: #ffffff">
                  {{ institem.FundationTime }}
                </div>
                <div>成立时间</div>
              </el-col>
            </el-row>
          </!--el-card>
        </el-row>
      </div-->

      <div class="overBlock">
        <el-col class="toptext">志愿者排行榜</el-col>
        <el-divider />
        <el-row type="flex" justify="space-around" style="align-items: center">
          <!--列元素居中-->
          <el-col :span="11" class="rank">
            <el-row
              v-for="(volunteer, index) in volRank.slice(0, 5)"
              :key="index"
              class="ranktop"
              style="align-items: center"
            >
              <el-image
                style="width: 50px; height: 50px; border-radius: 50%"
                :src="volunteer.UserHeadUrl"
                fit="cover"
              />
              <!-- <el-image
                v-if="volunteer.UserHeaderUrl != null"
                style="width: 50px; height: 50px; border-radius: 50%"
                :src="volunteer.UserHeadUrl"
                fit="cover"
              />
              <默认头像-->
              <!-- <el-image
                v-if="volunteer.UserHeaderUrl == null"
                style="width: 50px; height: 50px; border-radius: 50%"
                :src="pic"
                fit="cover"
              />  -->
              <!-- <el-avatar style="" shape="circle" :src="pic" fit="cover" /> -->
              <el-col :span="6">{{ volunteer.UserName }}</el-col>
              <el-col
                style="
                  justify-content: flex-end;
                  text-align: right;
                  font-weight: bold;
                  color: #2e74b6;
                "
                :span="5"
                >{{ volunteer.VolunteerTime }}</el-col
              >
              <el-col
                style="justify-content: flex-start; text-align: left"
                :span="4"
                >小时</el-col
              >
              <el-col :style="rankColor(index + 1)" :span="6">{{
                "No." + (index + 1)
              }}</el-col>
            </el-row>
          </el-col>
          <div class="divideLine"></div>

          <!--el-divider direction="vertical" /-->

          <el-col :span="11" class="rank">
            <el-row
              v-for="(volunteer, index) in volRank.slice(5, 10)"
              :key="index"
              class="ranktop"
              style="align-items: center"
            >
              <!-- <el-image
                v-if="volunteer.UserHeaderUrl != null"
                style="width: 50px; height: 50px; border-radius: 50%"
                :src="volunteer.UserHeadUrl"
                fit="cover"
              />
              <el-image
                v-if="volunteer.UserHeaderUrl == null"
                style="width: 50px; height: 50px; border-radius: 50%"
                :src="pic"
                fit="cover"
              /> -->
              <el-col :span="6">{{ volunteer.UserName }}</el-col>
              <el-col
                style="
                  justify-content: flex-end;
                  text-align: right;
                  font-weight: bold;
                  color: #2e74b6;
                "
                :span="5"
                >{{ volunteer.VolunteerTime }}</el-col
              >
              <el-col
                style="justify-content: flex-start; text-align: left"
                :span="4"
                >小时</el-col
              >
              <el-col :style="rankColor(index + 6)" :span="6">{{
                "No." + (index + 6)
              }}</el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </el-main>
    <Footer></Footer>
  </el-container>
</template>

<script>
import api from "/src/api/index";
import { CodeToText } from "element-china-area-data";
import { UserFilled } from "@element-plus/icons-vue";
import { ref } from "vue";
import MainHeader from "@/views/Frontstage/MainHeader.vue";
import Footer from "@/views/Frontstage/Footer.vue";
//import { url } from "inspector";
export default {
  name: "ref",
  components: {
    MainHeader,
    Footer,
  },
  setup() {
    const defaultImg =
      'this.src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"';
    const currentDate = ref(new Date());
    let volActAll = ref([]);
    //let volInstAll = ref([]);
    let volRank = ref([]);
    let pageNum = ref(1);
    let pageSize = ref(4);
    let pic =
      "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png";
    //axios
    //.get("/api/volAct")
    api
      .getVolAct(pageNum.value, pageSize.value)
      .then((res) => {
        console.log("请求志愿活动概览成功", res);
        volActAll.value = res.data.data.activity_list;
        console.log("获取数据", volActAll.value);
      })
      .catch((err) => {
        console.log("请求失败", err);
      });

    // api
    //   .getVolInst(pageNum.value, pageSize.value)
    //   .then((res) => {
    //     console.log("请求成功", res);
    //     volInstAll.value = res.data.data.volInst_list;
    //     console.log("获取数据", volInstAll.value);
    //   })
    //   .catch((err) => {
    //     console.log("请求失败", err);
    //   });

    api
      .getVolRank()
      .then((res) => {
        console.log("请求成功", res);
        volRank.value = res.data.data.AllVolActivity_list;
        console.log("获取数据", volRank.value);
      })
      .catch((err) => {
        console.log("请求失败", err);
      });

    return {
      //picUrl,
      UserFilled,
      defaultImg,
      pic,
      currentDate,
      volActAll,
      //volInstAll,
      volRank,
      pageNum,
      pageSize,
    };
  },
  computed: {
    rankColor() {
      return (rankNum) => {
        // 使用JavaScript闭包，进行传值操作
        // console.log("序号", rankNum);

        if (rankNum === 1) {
          return { color: "#FF8C5B" };
        } else if (rankNum === 2) {
          return { color: "#FFD600" };
        } else if (rankNum === 3) {
          return { color: "#63E258" };
        } else {
          return { color: "#67BBFF" };
        }
      };
    },
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
    goInstInfo(instID) {
      console.log("志愿机构id:", instID);
      //跳转至机构详情页面
      this.$router.push({
        path: "/volunInstInfo",
        //params: { index: "1" },
        query: { inst_id: instID },
      });
    },
  },
};
</script>

<style scoped>
.myHeader3 {
  height: 300px;
  background-image: url(../../image/volun.png);
  background-size: cover;
  /* position: relative; */
}
.mainBlock {
  background-color: #f4f6f9;
  position: relative;
  padding: 2% 3% 2%;
  width: 100%;
  height: 100%;
  /*top: 250px;
  bottom: 0;
  position: absolute;*/
}
/* .el-footer {
  background-color: #202741;
  color: #dddcdc;
  height: 40px;
  font-size: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
} */
.overBlock {
  margin-bottom: 5%;
}
.toptext {
  height: 30px;
  text-align: left;
  color: #2e74b6;
  font-size: 30px;
} /*格式调整*/
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

.mycard {
  background-color: #ffffff;
  border-radius: 10%;
  /* background-image: url(../assets/hands.png); */
  background-repeat: no-repeat;
  background-size: 100%;
  margin: 25px;
  width: 300px;
}
.bottom {
  border-radius: 10%;
  background-color: #ffffff;
  padding: 14px;
  text-align: left;
  font-size: 8px;
  line-height: 18px;
  margin-top: 0%;
  margin-bottom: 5px;
}

.button {
  float: right;
  background-color: #67bbff;
  padding: 0px;
  width: 40%;
  min-height: fit-content;
  font-size: 10px;
  margin-bottom: 5px;
}
.InstCard {
  border-radius: 10%;
  background-color: #ffffff;
  margin: 25px;
  width: 300px;
}
.botInfo {
  padding: 5%;
  min-height: auto;
  font-size: 16px;
  background-color: #ffffff;
}
.rank {
  padding: 2% 2% 2%;
}
.ranktop {
  background-color: #ffffff;
  border-radius: 20px;
  margin: 5% 0 5%;
}

.el-divider--vertical {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  height: 20em;
  width: 0.5px;
  background-color: #044c90;
  border-style: dashed;
  border-spacing: 1px;
  /*border:1px dashed #044C90;*/
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
/*.cardImage {
    width: 100%;
    display: block;
}*/
</style>