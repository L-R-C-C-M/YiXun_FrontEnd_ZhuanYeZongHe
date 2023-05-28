<template>
  <el-header>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>主页</el-breadcrumb-item>
    </el-breadcrumb>
  </el-header>
  <el-main style="background-color: rgba(245, 249, 250, 1)">
    <!-- 我发布的寻人信息 -->
    <el-card style="height: max-content; margin-bottom: 2%">
      <div style="text-align: left; margin-left: 3%">
        <h3>我发布的寻人信息</h3>
        <div class="containerFlex" style="margin-bottom: 10px">
          <!-- 使用flex布局 -->
          <div class="PhotoContainer" v-for="item in searchInfo_list" :key="item.search_info_id">
            <div class="PhotoOnly" @click="clickPhoto(item.search_info_id)">
              <el-row class="myRow">
                <el-col :span="8">
                  <div class="thePhoto" style="margin-left: 10%">
                    <img fit="cover" style="
                          width: 100%;
                          height: 100%;
                          border-radius: 10px 10px 0 0;
                          box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
                            rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
                        " :src="item.search_info_photourl" />
                  </div>
                </el-col>
                <el-col :span="16">
                  <div class="informationBlock">
                    <div class="line">
                      <h class="tableTitle">类型:</h>
                      <h>{{ item.search_type }}</h>
                    </div>
                    <div class="line">
                      <h class="tableTitle">姓名:</h>
                      <h>{{ item.sought_people_name }}</h>
                    </div>
                    <div class="line">
                      <h class="tableTitle">性别:</h>
                      <h>{{ item.sought_people_gender }}</h>
                    </div>
                    <div class="line">
                      <h class="tableTitle">出生日期:</h>
                      <h>{{ item.sought_people_birthday }}</h>
                    </div>
                    <div class="line">
                      <h class="tableTitle">失散日期:</h>
                      <h>{{ item.search_info_lostdate }}</h>
                    </div>
                    <div class="line">
                      <h class="tableTitle">失散地点/被寻人所在地:</h>
                      <h>{{
                        codeToText(
                          item.province_id,
                          item.city_id,
                          item.area_id,
                          item.detail
                        )
                      }}</h>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
            <div style="margin-top: 15px; text-align: center">
              <el-button type="primary" size="small" @click="changeInfo(item.search_info_id)">修 改</el-button>
              <el-button type="danger" size="small" @click="deleteInfo(item.search_info_id)">删 除</el-button>
            </div>
          </div>
        </div>
        <div class="Parent">
          <!--分页-->
          <el-pagination v-model:page-size="pagesize_info" :current-page.sync="currentPage_info" :total="total_info"
            layout="total,prev, pager, next, jumper" @current-change="handleCurrentChange_info" />
        </div>
      </div>
    </el-card>
    <!-- 我发布的寻人线索 -->
    <el-card style="margin-bottom: 2%">
      <div style="text-align: left; margin-left: 3%; margin-right: 3%">
        <h3>我发布的寻人线索</h3>
        <el-card>
          <el-table :data="clue_list" style="width: 100%" header-align="center">
            <el-table-column prop="ClueDate" label="发布时间" width="200" align="center" />
            <el-table-column prop="ClueContent" label="线索内容" align="center" />
            <el-table-column fixed="right" label="操作" width="120">
              <template #default="scope">
                <el-button link type="primary" size="small" @click.prevent="deleteClue(scope.$index)">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="Parent">
            <!--分页-->
            <el-pagination v-model:page-size="pagesize" :current-page.sync="currentPage" :total="total"
              layout="total,prev, pager, next, jumper" @current-change="handleCurrentChange" />
          </div>
        </el-card>
      </div>
    </el-card>

    <!-- 我报名的志愿活动 -->
    <el-card style="height: auto; margin-bottom: 2%">
      <div style="text-align: left; margin-left: 3%">
        <h3>我报名的志愿活动</h3>

        <el-row
          style="min-height: 300px"
          type="flex"
          justify-content="flex-start"
        >
          <!--el-card的背景图片还未更改使用变量-->
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
                活动地址：{{
                  codeToText(
                    actitem.Province,
                    actitem.City,
                    actitem.Area,
                    actitem.Detail
                  )
                }}
              </div>
              <div>志愿时间：{{ actitem.ExpTime }}</div>
              <div>人数：{{ actitem.Needpeople }}人</div>
              <div>
                <el-button type="primary" class="button" round
                  >了解详情</el-button
                >
              </div>
            </div>
          </el-card>
        </el-row>
        <div class="Parent">
          <!--分页-->
          <el-pagination
            align="center"
            v-model:page-size="pagesize_act"
            :current-page.sync="currentPage_act"
            :total="total_act"
            layout="total,prev, pager, next, jumper"
            @current-change="handleCurrentChange_act"
          />
        </div>
      </div>
    </el-card>

    <!-- 我关注的寻人信息 -->
    <el-card style="height: max-content; margin-bottom: 2%">
      <div style="text-align: left; margin-left: 3%">
        <h3>我关注的寻人信息</h3>
        <div class="containerFlex" style="margin-bottom: 2%">
          <div class="PhotoContainer" v-for="item in follow_list" :key="item.search_info_id">
            <div class="PhotoOnly" @click="clickPhoto(item.search_info_id)">
              <el-row class="myRow">
                <el-col :span="8">
                  <div class="thePhoto" style="margin-left: 10%">
                    <img fit="cover" style="
                          width: 100%;
                          height: 100%;
                          border-radius: 10px 10px 0 0;
                        " :src="item.search_info_photourl" />
                  </div>
                </el-col>
                <el-col :span="16">
                  <div class="informationBlock">
                    <div class="line">
                      <h class="tableTitle">类型:</h>
                      <h>{{ item.search_type }}</h>
                    </div>
                    <div class="line">
                      <h class="tableTitle">姓名:</h>
                      <h>{{ item.sought_people_name }}</h>
                    </div>
                    <div class="line">
                      <h class="tableTitle">性别:</h>
                      <h>{{ item.sought_people_gender }}</h>
                    </div>
                    <div class="line">
                      <h class="tableTitle">出生日期:</h>
                      <h>{{ item.sought_people_birthday }}</h>
                    </div>
                    <div class="line">
                      <h class="tableTitle">失散日期:</h>
                      <h>{{ item.search_info_lostdate }}</h>
                    </div>
                    <div class="line">
                      <h class="tableTitle">失散地点/被寻人所在地:</h>
                      <h>{{
                        codeToText(
                          item.province_id,
                          item.city_id,
                          item.area_id,
                          item.detail
                        )
                      }}</h>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
        <div class="Parent">
          <!--分页-->
          <el-pagination v-model:page-size="pagesize_follow" :current-page.sync="currentPage_follow" :total="total_follow"
            layout="total,prev, pager, next, jumper" @current-change="handleCurrentChange_follow" />
        </div>
      </div>
    </el-card>
  </el-main>
</template>

<script  scoped>
import api from "/src/api/index";
import { CodeToText } from "element-china-area-data";

export default {
  data() {
    return {
      user_id: JSON.parse(sessionStorage.getItem("userid")),
      searchInfo_list: [],
      pagesize_info: 3, ///每页数量
      currentPage_info: 1, //页码
      total_info: 0, //总条目数
      clue_list: [],
      currentPage: 1, //页码
      pagesize: 3, //每页的数量
      total: 0, //总条目数
      follow_list: [],
      currentPage_follow: 1, //页码
      pagesize_follow: 3, //每页的数量
      total_follow: 0, //总条目数
      
      pic: "https://yixun-picture.oss-cn-shanghai.aliyuncs.com/user_head/1.jpeg",
      volActAll: [],
      currentPage_act: 1, //页码
      pagesize_act: 3, //每页的数量
      total_act: 0, //总条目数
    };
  },
  mounted() {
    this.getAllCLuesPublished();
    this.getAllSearchInfo();
    this.getFollowInfo();
    this.getVolApplyAct();
  },
  methods: {
 //点击跳转
 goActInfo(actID) {
      console.log("志愿活动id:", actID);
      //跳转至活动详情页面
      this.$router.push({
        path: "/volunActInfo",
        query: { act_id: actID },
      });
    },
    //获取志愿活动信息
    getVolApplyAct() {
      console.log(this.user_id);
      api
        .getVolApplyAct(this.user_id, this.currentPage, this.pagesize)
        .then((res) => {
          console.log("请求成功", res.data);
          //volActInfo.value = res.data.volActInfo;
          this.volActAll = res.data.data.vol_act_info;
          this.total_act = res.data.data.total;
          console.log("获取数据", this.volActAll);
        })
        .catch((err) => {
          console.log("请求失败", err);
        });
    },

    //更新分页
    handleCurrentChange_act(newPage) {
      console.log(newPage);
      this.currentPage_act = newPage; //重新指定当前页
      this.getVolApplyAct();
    },

    //删除线索
    deleteClue(index) {
      console.log(index);
      api
        .userDeleteClue(this.user_id, this.clue_list[index].ClueId)
        .then((res) => {
          console.log(res.data);
          this.getAllCLuesPublished();
          this.getAllSearchInfo();
          this.getFollowInfo();
          if (res.data.status == true) {
            Object.assign(this.$data, this.$options.data.call(this));
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          } else {
            this.$message({
              type: "error",
              message: "删除失败",
            });
          }
        });
    },
    //修改寻人信息
    changeInfo(info_id){
      console.log("info_id:");
      console.log(info_id);
      this.$router.push({ path: "/change_missingperson", query: {SearchInfo: info_id,} });
    },
    //删除寻人信息
    deleteInfo(info_id) {
      console.log(info_id);
      console.log("info_id");
      api.userDeleteInfo(this.user_id, info_id).then((res) => {
        console.log(res.data);
        this.getAllCLuesPublished();
        this.getAllSearchInfo();
        this.getFollowInfo();
        if (res.data.status == true) {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          Object.assign(this.$data, this.$options.data.call(this));
        } else {
          this.$message({
            type: "error",
            message: "删除失败",
          });
        }
      });
    },
    //处理返回时间中的T
    handleTimeString(clue_list) {
      for (let i in clue_list) {
        clue_list[i].ClueDate = clue_list[i].ClueDate.replace(/T/, "  ");
      }
    },

    //区域码转地址
    codeToText(province, city, area, detail) {
      if (detail != null)
        return (
          CodeToText[province] + CodeToText[city] + CodeToText[area] + detail
        );
      else return CodeToText[province] + CodeToText[city] + CodeToText[area];
    },

    //寻人信息跳转
    clickPhoto(SearchinfoId) {
      console.log(SearchinfoId);
      //点击跳转到寻人信息的详情页
      this.$router.push({
        path: "/missingpersonInfo",
        query: {
          SearchInfo: SearchinfoId,
        },
      });
    },
    //发布的寻人信息
    getAllSearchInfo() {
      api
        .getAllSearchInfoPublished(
          this.user_id,
          this.currentPage_info,
          this.pagesize_info
        )
        .then((res) => {
          console.log(res.data);
          this.searchInfo_list = res.data.data.searchInfo_list;
          this.total_info = res.data.data.total;
        });
    },
    handleCurrentChange_info(newPage) {
      this.currentPage_info = newPage; //重新指定当前页
      this.getAllSearchInfo();
    },
    //发布的寻人线索
    getAllCLuesPublished() {
      let temp_list = [];
      api
        .getAllCLuesPublished(this.user_id, this.currentPage, this.pagesize)
        .then((res) => {
          console.log(res.data);
          temp_list = res.data.data.clue_list;
          this.handleTimeString(temp_list);
          console.log(temp_list);
          this.clue_list = temp_list;
          this.total = res.data.data.total;
        });
    },
    handleCurrentChange(newPage) {
      console.log(newPage);
      this.currentPage = newPage; //重新指定当前页
      this.getAllCLuesPublished();
    },
    //关注的寻人信息
    getFollowInfo() {
      api
        .getFollowInfo(
          this.user_id,
          this.currentPage_follow,
          this.pagesize_follow
        )
        .then((res) => {
          console.log(res.data);
          this.follow_list = res.data.data.follow_info;
          this.total_follow = res.data.data.total;
        });
    },
    handleCurrentChange_follow(newPage) {
      console.log(newPage);
      this.currentPage_follow = newPage; //重新指定当前页
      this.getFollowInfo();
    },
  },
};
</script>

<style scoped>
.Parent {
  display: flex;
}

.el-header {
  background-color: rgba(255, 255, 255, 1);
  height: 60px;
  display: flex;
  justify-content: space-between;
  padding-left: 30;
  align-items: center;
}

.myRow {
  border-radius: 4px;
  box-shadow: 1px 1px 5px#e2e1e1, 1px -1px 5px#e2e1e1, -1px 1px 5px#e2e1e1,
    -1px -1px 5px#e2e1e1;
  align-items: center;
}

.el-row:last-child {
  margin-bottom: 0;
}

.el-card {
  margin-bottom: 20px;
}

.el-pagination {
  margin: auto;
}

.thePhoto {
  height: 100%;
}

.informationBlock {
  padding-left: 5%;
  padding-top: 5%;
  padding-bottom: 8%;
  display: inline-block;
}

.informationBlock .line {
  padding-top: 10px;
  float: inline-start;
}

.informationBlock .tableTitle {
  color: #2e74b6;
  font-weight: 700;
}

h {
  font-size: 12px;
}

.mycard {
  border-radius: 10%;
  background-color: #ffffff;
  /* background-image: url(../assets/hands.png); */
  background-repeat: no-repeat;
  background-size: 100%;
  margin: 30px;
  width: 310px;
}

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
.button {
  float: right;
  background-color: #67bbff;
  padding: 0px;
  width: 40%;
  min-height: fit-content;
  font-size: 10px;
  margin-bottom: 5px;
}

.containerFlex {
  display: flex;
  flex-direction: row;
  /*容器内成员的排列方式为从左到右*/
  flex-wrap: wrap;
  /*换行方式，放不下就换行*/
  justify-content: flex-start;
  /*项目在主轴上的对齐方式*/
  align-content: flex-start;
}

.PhotoContainer {
  width: 360px;
  height: 100%;
  margin-bottom: 20px;
  margin-right: 1.5%;
}

.PhotoOnly {
  width: 95%;
  height: 100%;
  margin: 0 auto;
  margin-top: 5px;
  border-radius: 10px !important;
  /* box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px,
      rgba(0, 0, 0, 0.04) 0px 10px 10px -5px !important; */
  background-color: #ffffff;
  cursor: pointer;
}
</style>