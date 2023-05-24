<template>
  <div>
    <!--class="common-layout"-->
    <el-container>
      <el-header style="padding: 0">
        <InfoHeader />
      </el-header>
      <el-main style="min-height: 650px">
        <el-row>
          <el-button @click="goBack()" type="text" class="return">&lt;&lt;返回</el-button>
          <!--el-button @click="prev()">返回</!--el-button-->
        </el-row>
        <el-row style="width:100%">
          <el-image v-if="volActInfo.activity_pic != null" lazy :src="volActInfo.activity_pic" class="InstImage" />
          <!-- 默认图片 -->
          <el-image v-if="volActInfo.activity_pic == null" lazy
            src="https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg" class="InstImage" />
          <!-- <el-image lazy :src="pic" class="InstImage" /> -->


          <div>
            <div class="title">{{ volActInfo.activity_name }}</div>
            <div class="actInfo">
              <div>项目编号：{{ volActInfo.activity_id }}</div>
              <div>
                招募人数：{{ volActInfo.activity_signupPeople }}/{{
                  volActInfo.activity_needpeople
                }}人
              </div>
              <div>开始时间：{{ volActInfo.activity_expTime }}</div>
              <div>结束时间：{{ volActInfo.activity_endTime }}</div>
              <div>服务地点：{{ volActInfo.activity_address }}</div>
              <!-- <div>发起机构：{{ volActInfo.activity_inst }}</div> -->
              <div>联络方式：{{ volActInfo.activity_contactMethod }}</div>
            </div>

            <!--在点击报名时判断登录状态-->
            <!--未到截止报名时间，报名人数未满可以报名,也可以取消报名-->
            <el-button v-show="!volActInfo.is_overdue &&
              volActInfo.activity_signupPeople <
              volActInfo.activity_needpeople
              " type="primary" class="actButton" round @click="goSignUp()">{{ signup }}</el-button>

            <!--未到截止报名时间但报名人数已满且自己未报名-->
            <el-button v-show="!volActInfo.is_overdue && (volActInfo.activity_signupPeople >=
              volActInfo.activity_needpeople) && !is_applied
              " type="primary" class="actButton" round disabled>人数已满</el-button>

            <!--已到截止报名时间-->
            <el-button v-show="volActInfo.is_overdue" type="primary" class="actButton" round disabled>报名结束</el-button>


            <!--，未登录无法报名、普通用户禁止报名-->
            <!-- <el-button
              v-show="
                !isVolunteer &&
                volActInfo.activity_signupPeople <
                  volActInfo.activity_needpeople
              "
              type="primary"
              class="actButton"
              round
              disabled
              >志愿者可报名</el-button
            > -->

            <!--普通用户且报名人数已满或已到报名时间，则报名结束-->
            <!-- <el-button
              v-show="
                !isVolunteer &&
                (!volActInfo.is_overdue ||
                  volActInfo.activity_signupPeople >=
                    volActInfo.activity_needpeople)
              "
              type="primary"
              class="actButton"
              round
              disabled
              >报名结束</el-button
            > -->

            <!--是志愿者但已到活动时间或报名人数已满，则报名结束-->
            <!-- <el-button
              v-show="
                isVolunteer &&
                (!volActInfo.is_overdue ||
                  volActInfo.activity_signupPeople >=
                    volActInfo.activity_needpeople)
              "
              type="primary"
              class="actButton"
              round
              disabled
              >报名结束</el-button
            > -->

            <!--是志愿者且报名人数未满、报名时间未截止，则可以报名-->
            <!-- <el-button v-show="isVolunteer &&
              volActInfo.is_overdue &&
              volActInfo.activity_signupPeople <
              volActInfo.activity_needpeople
              " type="primary" class="actButton" round @click="goSignUp()">{{ signup }}</el-button> -->
          </div>



          <div style="margin-left: auto;margin-right:10%;margin-top: 2%;width: max-content;">
            <el-steps direction="vertical" :active="active" :space="70" process-status="finish" finish-status="success">
              <el-step title="报名进行中" />
              <el-step title="招募结束" />
              <el-step title="活动进行中" />
              <el-step title="活动结束" />
            </el-steps>
          </div>


        </el-row>
        <el-row class="toptext">活动详情</el-row>
        <el-divider />
        <div v-if="volActInfo.activity_content == null" class="text">
          暂无活动介绍
        </div>
        <div v-if="volActInfo.activity_content != null" class="text">
          {{ volActInfo.activity_content }}
        </div>
      </el-main>
      <Footer></Footer>
    </el-container>
  </div>
</template>

<script>
import api from "/src/api/index";
import { useRoute } from "vue-router";
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import InfoHeader from "@/views/Frontstage/InfoHeader.vue";
import Footer from "@/views/Frontstage/Footer.vue";
export default {
  name: "volunActInfoView",
  components: {
    InfoHeader,
    Footer,
  },
  setup() {
    const currentDate = ref(new Date());
    console.log("当前时间", currentDate);
    const route = useRoute();
    const act_id = route.query.act_id;
    console.log("接收到的志愿活动id", act_id);

    // const vol_id = 2;
    //let vol_id = ref(0);
    let user_id = ref(0);
    let signup = ref("我要报名");
    let is_applied = ref(false);
    let volActInfo = ref([]);
    //let isVolunteer = ref(true);
    let loginState = reactive(false);
    if (sessionStorage.getItem("userid") != null) {
      user_id = ref(sessionStorage.getItem("userid"));
      loginState = true;
    }
    let userType = JSON.parse(sessionStorage.getItem("useridentity")); //获取用户类型
    // if (userType == "user") {
    //   isVolunteer.value = false;
    // } else {
    //   vol_id = JSON.parse(sessionStorage.getItem("volid"));
    //   console.log("志愿者id", vol_id);
    // }

    let pic =
      "https://yixun-picture.oss-cn-shanghai.aliyuncs.com/user_head/1.jpeg";

    //console.log("志愿者", vol_id);
    //console.log("志愿活动", act_id);

    let active = ref(0)

    return {
      pic,
      //vol_id,
      user_id,
      act_id,
      is_applied,
      signup,
      currentDate,
      volActInfo,
      loginState,
      //isVolunteer,
      userType,
      active,//步骤条的激活序号
      is_overdue: false,//是否已经开始
    };
  },
  mounted() {
    // const act_id = this.$route.query.act_id;
    // console.log("mounted接收到的志愿活动id", act_id);
    //this.checkApplyState();
    //axios
    //.get("/api/volActInfo")
    api //获取单个志愿活动详细信息
      .getVolActInfo(this.act_id)
      .then((res) => {
        console.log("请求成功", res);
        //volActInfo.value = res.data.volActInfo;
        this.volActInfo = res.data.data;
        console.log("获取数据", this.volActInfo);
        var now_date = this.formatDateValue(new Date());
        console.log("当前时间" + now_date);
        console.log("开始时间" + this.volActInfo.activity_endTime);
        this.is_overdue = this.volActInfo.activity_expTime < now_date;
        if (this.volActInfo.activity_expTime > now_date)
          this.active = 0;
        else if (this.volActInfo.activity_expTime < now_date && this.volActInfo.activity_endTime > now_date)
          this.active = 2;
        else if (this.volActInfo.activity_endTime < now_date)
          this.active = 4;
        console.log("激活项：" + this.active);
      })
      .catch((err) => {
        console.log("请求失败", err);
      });

    //原来是只有志愿者可以报名志愿活动，现在改为所有用户可以报名志愿活动
    //if (loginState && userType == "volunteer") {
    if (this.loginState) {
      //获取当前用户是否已报名
      //console.log("志愿者id", vol_id);
      api //（旧）获取志愿者是否已报名当前志愿活动
        //.getApplyState(vol_id, act_id)
        .getApplyState(this.user_id, this.act_id)
        .then((res) => {
          console.log("判断成功", res);
          this.is_applied = res.data.data.is_applied;
          if (this.is_applied == "true")
            this.signup = "已报名";
        })
        .catch((err) => {
          console.log("判断失败", err);
        });
    }
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    goSignUp() {
      if (this.loginState) {
        api
          //.getSignUp(this.vol_id, this.act_id)
          .getSignUp(this.user_id, this.act_id)
          .then((res) => {
            // console.log("报名", res);
            // console.log("报名的志愿者id", this.vol_id);
            // console.log("报名的志愿活动id", this.act_id);

            if (this.is_applied == "false") {
              console.log("ApplyState", res.data.data.ApplyState);
              if (res.data.data.ApplyState) {
                //报名成功
                ElMessage({
                  message: "报名成功，请及时联系负责人",
                  type: "success",
                });
                this.signup = "已报名";
                this.is_applied = "true"; //修改报名状态
                this.volActInfo.activity_signupPeople += 1;
              }
              //报名失败
              else {
                ElMessage({
                  message: "报名失败，请稍后重试",
                  type: "warning",
                });
              }
            } else {
              //原先已报名
              if (res.data.data.ApplyState) {
                //取消报名失败
                ElMessage({
                  message: "取消报名失败，请稍后重试",
                  type: "warning",
                });
              } else {
                //取消报名成功
                ElMessage({
                  message: "取消报名成功",
                  type: "success",
                });
                this.signup = "我要报名";
                this.is_applied = "false"; //修改报名状态
                this.volActInfo.activity_signupPeople -= 1;
              }
            }
          })
          .catch((err) => {
            console.log("报名失败", err);
          });
      } else {
        ElMessage({
          message: "请先登录",
          type: "error",
        });
      }
    },
    formatDateValue(now) {
      var year = this.dateZero(now.getFullYear()); //取得4位数的年份
      var month = this.dateZero(now.getMonth() + 1); //取得日期中的月份，其中0表示1月，11表示12月
      var date = this.dateZero(now.getDate()); //返回日期月份中的天数（1到31）
      var hour = this.dateZero(now.getHours()); //返回日期中的小时数（0到23）
      var minute = this.dateZero(now.getMinutes()); //返回日期中的分钟数（0到59）
      var second = this.dateZero(now.getSeconds()); //返回日期中的秒数（0到59）
      return (
        year +
        "-" +
        month +
        "-" +
        date +
        " " +
        hour +
        ":" +
        minute +
        ":" +
        second
      );
    },
    // 日期前面加0
    dateZero(time) {
      if (time < 10) {
        time = "" + "0" + time;
      }
      return time;
    },
  },
};
</script>

<style scoped>
.el-main {
  background-color: #f4f6f9;
  position: relative;
  padding: 2% 5% 2%;
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

.InstImage {
  object-fit: contain;
  width: auto;
  height: 280px;
  margin-right: 50px;
  /*display: block;*/
}

.title {
  text-align: left;
  font-size: 30px;
  color: #2e74b6;
  line-height: 50px;
  margin-top: 5px;
  margin-bottom: 5px;
}

.actInfo {
  text-align: left;
  font-size: 14px;
  line-height: 30px;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-left: 5px;
}

.actButton {
  float: left;
  background-color: #67bbff;
  padding: 0px;
  width: 50%;
  min-width: fit-content;
  min-height: auto;
  margin-top: 10px;
  margin-bottom: 5px;
}

.toptext {
  margin-top: 15px;
  height: 30px;
  text-align: left;
  color: #2e74b6;
  font-size: 30px;
}

/*格式调整*/
.el-divider {
  background-color: #67bbff;
  /*height: 36px;*/
  margin: 20px 0;
}

.text {
  padding-left: 20px;
  padding-right: 20px;
  text-align: left;
  white-space: pre-wrap;
  /*实现换行 */
}

/*.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}*/

/*.bottom {
    line-height: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}*/
</style>