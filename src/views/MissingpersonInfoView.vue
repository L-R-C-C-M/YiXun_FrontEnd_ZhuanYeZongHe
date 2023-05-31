<template>
  <div>
    <!--class="common-layout"-->
    <el-container style="height: fit-content">
      <el-header style="padding: 0">
        <InfoHeader />
      </el-header>
      <el-main>
        <el-row>
          <el-button @click="goBack()" type="text" class="return">&lt;&lt;返回</el-button>
          <!--el-button @click="prev()">返回</!--el-button-->
        </el-row>

        <el-row min-windth="500px">
          <el-image v-if="this.MissInfo.search_photo" :src="this.MissInfo.search_photo"
            style="width: 200px; height: 200px" class="image" fit="cover" />
          <el-image style="width: 200px; height: 200px" v-else :src="require('../../image/txiang.jpg')" class="image"
            fit="cover" />
          <!-- <el-image style="width: 200px; height: 200px"  :src="require('../../image/txiang.jpg')" class="image" :fit="fill"/> -->

          <div>
            <div class="info">
              <div>| 失踪人姓名：{{ MissInfo.search_name }}</div>
              <div>| 性别：{{ MissInfo.search_gender }}</div>
              <div>| 出生日期：{{ MissInfo.search_birthday }}</div>
              <div>| 详细地址：{{ address }} {{ MissInfo.search_address }}</div>
              <div style="padding: 20px 0px 15px 5px" v-if="this.loginState">
                <!-- <el-button v-if="!this.isFollow" @click="follow" round
                  >关注寻人信息</el-button
                >
                <el-button v-else @click="follow" round>取 消 关 注</el-button> -->

                <el-button v-if="!this.isFollow" @click="follow" round>关注寻人信息</el-button>
                <el-button v-else @click="follow" round>取 消 关 注</el-button>
              </div>
              <div style="padding: 20px 0px 15px 5px" v-else>
                <el-button round disabled>关注寻人信息</el-button>
              </div>
            </div>
          </div>
          <div>
            <!-- <el-button type="primary" v-if="MisReason" @click="SubmitMisReason(MisReason)">确 定</el-button>
            <el-button type="primary" disabled v-else>确 定</el-button> -->
          </div>
        </el-row>

        <el-col class="toptext">特征描述</el-col>
        <div class="text">{{ MissInfo.search_detail }}</div>

        <el-col class="toptext">寻人线索</el-col>
        <el-row v-for="clue in this.MissInfo.search_clue" :key="clue.ClueContent">
          <div class="text">| {{ clue.ClueContent }} <sup style="font-size:12px;color:crimson">{{
            clueForm.report_state }}</sup></div>

          <div style="padding: 9px">
            <el-button type="primary" class="actButton" round size="small"
              @click="upClueReport(clue.ClueId)">举报</el-button>
            <el-button type="primary" class="actButton" round size="small"
              @click="openClueDetail(clue.ClueId)">查看详情</el-button>
          </div>
          <!-- {{线索描述字段}}
            时间：{{data字段}}+{{detailTime字段}}
            地点：{{area}}+{{ 详细地址字段}} 
          按钮：查看图片}}-->
        </el-row>

        <el-col class="toptext">跟进工作人员</el-col>

        <el-row v-for="vol in this.MissInfo.search_vols" :key="vol">
          <el-col>
            <div class="text">姓名：{{ vol.Name }}</div>
            <div class="text">联系电话：{{ vol.PhoneNum }}</div>
          </el-col>
        </el-row>

        <!-- 上传线索，举报寻人信息按钮 -->
        <div style="padding: 50px 0px 15px 75px">
          <el-form :model="clueForm" label-width="100px" style="max-width: 1500px">
            <!-- <el-form-item label="线索描述 ">
              <el-input v-model="clueForm.report_content" :autosize="{ minRows: 10, maxRows: 12 }" type="textarea" />
            </el-form-item> -->

            <el-button type="primary" class="actButton" round @click="toOpenUpclueDialog">发布线索</el-button>

            <!-- <el-button type="primary" class="actButton" round @click="goReport(index)">举 报</el-button> -->
            <el-button type="primary" class="actButton" round @click="misReport">举 报</el-button>
          </el-form>
        </div>

        <!-- 上传线索对话框 郭静静5-12 -->
        <div>
          <el-dialog title="线索发布" v-model="upclueDialogVisible" class="upclueDialog">

            <el-form :model="upclueform">
              <el-form-item label="线索发现日期">
                <el-date-picker v-model="upclueform.date" type="date" placeholder="请选择日期" :disabled-date="disabledDate"
                  :shortcuts="shortcuts" :size="size" />
              </el-form-item>

              <el-form-item label="具体时间">
                <el-input v-model="upclueform.detailTime" placeholder="请输入发现线索的具体时间点，例：“上午8点左右” " />
              </el-form-item>

              <el-form-item label="线索发现地点">
                <!-- <el-input></el-input> -->
                <el-cascader placeholder="请选择地区" size="default" :options="areaOptions" v-model="upclueform.selectedArea"
                  @change="handleChange">
                </el-cascader>
              </el-form-item>

              <el-form-item label="详细地点">
                <el-input v-model="upclueform.detailAddress" placeholder="请输入发现线索的详细地点，例：“XX街道天福超市” " />
              </el-form-item>

              <el-form-item label="线索描述">
                <el-input v-model="upclueform.clueText" placeholder="请输入发现的线索信息，包括但不限：被寻人衣着，是否有同行者，形态动作 " />

              </el-form-item>

              <el-form-item label="上传图片">
                <!-- <el-input></el-input> -->
                <el-upload action="#" list-type="picture-card" :auto-upload="false" :on-change="handleImgChange">
                  <el-icon>
                    <Plus />
                  </el-icon>
                  <template #file="{ file }">
                    <div>
                      <img class="el-upload-list__item-thumbnail" :src="file.url" :fit="contain" alt="" />
                      <span class="el-upload-list__item-actions">
                        <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file.url)">
                          <el-icon><zoom-in /></el-icon>
                        </span>
                      </span>
                    </div>
                  </template>
                </el-upload>

              </el-form-item>
              <el-dialog v-model="imgDialogVisible" style="width: 80%;">
                <img :src="dialogImageUrl" alt="Preview Image" style="width: 100%;" />
              </el-dialog>

            </el-form>

            <div slot="footer" class="dialog-footer" style="padding: 10px">
              <!-- <el-button @click="(upclueDialogVisible = false), (MisReason = '')">
                取 消</el-button> -->
              <el-button @click="upclueDialogVisible = false">
                取 消</el-button>
              <el-button type="primary" @click="upClueClick">确 定</el-button>
              <!-- <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button> -->
            </div>
          </el-dialog>
        </div>

        <!-- 线索举报对话框 -->
        <div>
          <el-dialog title="线索举报" v-model="dialogFormVisible2">
            <el-input v-model="clueReason" autocomplete="off" :autosize="{ minRows: 10, maxRows: 12 }" type="textarea"
              placeholder="点击输入举报理由" />

            <div slot="footer" class="dialog-footer" style="padding: 10px">
              <el-button @click="(dialogFormVisible2 = false), (clueReason = '')">取 消</el-button>

              <el-button type="primary" v-if="clueReason" @click="SubmitClueReason(clueReason)">确 定</el-button>
              <el-button type="primary" disabled v-else>确 定</el-button>

              <!-- <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button> -->
            </div>
          </el-dialog>
        </div>

        <!-- 寻人信息举报对话框 -->
        <div>
          <el-dialog title="寻人信息举报" v-model="dialogFormVisible">
            <el-input v-model="MisReason" autocomplete="off" :autosize="{ minRows: 10, maxRows: 12 }" type="textarea"
              placeholder="点击输入举报理由" />

            <div slot="footer" class="dialog-footer" style="padding: 10px">
              <el-button @click="(dialogFormVisible = false), (MisReason = '')">
                取 消</el-button>

              <el-button type="primary" v-if="MisReason" @click="SubmitMisReason(MisReason)">确 定</el-button>
              <el-button type="primary" disabled v-else>确 定</el-button>

              <!-- <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button> -->
            </div>
          </el-dialog>
        </div>
        <!-- 查看线索详情对话框 -->
        <div>
          <el-dialog title="线索详情" v-model="clueDetailDialogFormVisible">
            <div>
              <el-descriptions class="margin-top" :column="1" border>
                <el-descriptions-item>
                  <template #label>
                    <div class="cell-item">
                      <el-icon :style="iconStyle">
                        <Calendar />
                      </el-icon>
                      发现日期
                    </div>
                  </template>
                  {{ clueInfo.clueInfoDate }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template #label>
                    <div class="cell-item">
                      <el-icon :style="iconStyle">
                        <Watch />
                      </el-icon>
                      发现时间
                    </div>
                  </template>
                  {{ clueInfo.clueInfoTime }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template #label>
                    <div class="cell-item">
                      <el-icon :style="iconStyle">
                        <MapLocation />
                      </el-icon>
                      发现地区
                    </div>
                  </template>
                  {{ clueInfo.clueInfoArea }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template #label>
                    <div class="cell-item">
                      <el-icon :style="iconStyle">
                        <Guide />
                      </el-icon>
                      具体地点
                    </div>
                  </template>
                  {{ clueInfo.clutInfoAdr }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template #label>
                    <div class="cell-item">
                      <el-icon :style="iconStyle">
                        <Tickets />
                      </el-icon>
                      线索描述
                    </div>
                  </template>
                  {{ clueInfo.clueInfoText }}
                </el-descriptions-item>
              </el-descriptions>
              <div class="demo-image__lazy">
                <el-image v-for="url in urls" :key="url" :src="url" lazy />
              </div>
            </div>

            <div slot="footer" class="dialog-footer" style="padding: 10px">
              <!-- <el-button @click="(dialogFormVisible = false), (MisReason = '')">
                取 消</el-button> -->

              <el-button type="primary" @click="clueDetailDialogFormVisible = false">确 定</el-button>
              <!-- <el-button type="primary" disabled v-else>确 定</el-button> -->

              <!-- <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button> -->
            </div>
          </el-dialog>


        </div>


      </el-main>
      <Footer></Footer>
    </el-container>
  </div>
</template>

<script>
import { ref } from "vue";
import InfoHeader from "@/views/Frontstage/InfoHeader.vue";
import Footer from "@/views/Frontstage/Footer.vue";
import api from "/src/api/index";
import { reactive } from "vue";
import { thisTypeAnnotation } from "@babel/types";
import { useRoute } from "vue-router";
import { ElMessage } from "element-plus";
import { regionData, CodeToText } from "element-china-area-data";
import { Plus, ZoomIn, Calendar, Watch, MapLocation, Guide, Tickets } from '@element-plus/icons-vue';
import { UploadFile } from 'element-plus'



// do not use same name with ref

export default {
  name: "ref",
  data() {
    return {
      urls:[],
      clueInfo:reactive({
        clueInfoDate:"",
        clueInfoTime:"",
        clueInfoArea:"",
        clutInfoAdr:"",
        clueInfoText:"",
        clueInfoImgUrl:[],
      }),
      areaOptions: regionData,
      MissInfo: [],
      //对话框显示与隐藏
      dialogFormVisible: false,
      dialogFormVisible2: false,
      upclueDialogVisible: false,
      clueDetailDialogFormVisible: false,
      MisReason: "",
      clueReason: "",
      clueID: "",
      address: "",
      isFollow: "",
      upclueform: reactive({
        detailTime: '',
        detailAddress: '',
        clueText: '',
        date: '',
        selectedArea: [],
      }),
      imgUrlList: [],
      imgUrlListNum: 0,
    };
  },
  components: {
    InfoHeader,
    Footer,
  },
  setup() {
    const dialogImageUrl = ref('');
    const imgDialogVisible = ref(false);

    const currentDate = ref(new Date());
    const route = useRoute();

    const MissID = route.query.SearchInfo;
    let user_id = reactive();
    let loginState = reactive(false);
    // if (sessionStorage.getItem("userid") != null) {
    //   user_id = sessionStorage.getItem("userid");
    //   loginState = true;
    // }

    const clueForm = reactive({
      report_content: "",
      report_state: "待核实",
    });

    // 线索上传相关数据
    const shortcuts = [
      {
        text: '今天',
        value: new Date(),
      },
      {
        text: '昨天',
        value: () => {
          const date = new Date()
          date.setTime(date.getTime() - 3600 * 1000 * 24)
          return date
        },
      },
      {
        text: '一周前',
        value: () => {
          const date = new Date()
          date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
          return date
        },
      },
    ];

    //以下为方法定义
    const disabledDate = (time) => {
      return time.getTime() > Date.now()
    };

    const handlePictureCardPreview = (imgUrl) => {
      console.log("图片的url", imgUrl);
      if (imgUrl) {
        dialogImageUrl.value = imgUrl;
      }
      imgDialogVisible.value = true;
    };

    // const handleImgChange=(uploadFile, uploadFiles) => {
    //   console.log(uploadFile);
    //   console.log(uploadFiles);
    //   var reader = new FileReader(); 
    //   reader.readAsDataURL(uploadFile.raw); 
    //   reader.onload = (e) => { 
    //     console.log("有没有执行");
    //     console.log(e);
    //     var imageurl = e.target.result; 
    //     // console.log("图片的base64数据",imageurl); //图片的base64数据 
    //     console.log('目前数组的内容',imgUrlList);
    //     this.imgUrlList.push(imageurl);
    //     console.log('目前数组的内容',this.imgUrlList);
    //   }; 
    // };


    return {
      
      user_id,
      loginState,
      currentDate,
      clueForm,
      MissID,
      shortcuts,
      disabledDate,//时间选择器中不能选择的时间
      dialogImageUrl,//查看图片大图的图片url
      imgDialogVisible,//查看大图的dialog
      handlePictureCardPreview,
      // handleImgChange,

    };
  },

  mounted() {
    if ((sessionStorage.getItem("userid") != null)) {
      this.loginState = true;
      this.user_id = sessionStorage.getItem("userid");
      console.log("this.user_id", this.user_id);
    }
    api
      .getMissingpersonInfo(this.MissID)
      .then((res) => {
        console.log("接收到的数据", res);
        this.MissInfo = res.data.data;
        console.log("志愿者长度", this.MissInfo.search_vols.length);
        this.address =
          CodeToText[this.MissInfo.search_province] +
          CodeToText[this.MissInfo.search_city] +
          CodeToText[this.MissInfo.search_area];
      })
      .catch((err) => {
        console.log(err);
      });
    if (!this.loginState) {
      return;
    }
    api
      .followMis(this.user_id, this.MissID)
      .then((res) => {
        console.log("关注按钮接收的数据", res.data);
        this.isFollow = res.data.data.state;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    // goReport() {
    //   this.$router.push({ path: "/report", query: {} });
    //   api
    //     .upMisReport(608, 1, "This is a test!")
    //     .then(function (response) {
    //       console.log("发布寻人信息举报", response);
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     });
    // },
    goBack() {
      this.$router.back();
    },
    //线索发布按钮
    upClueClick() {
      if (!this.loginState) {
        ElMessage({
          message: "请先登录",
          type: "warning",
        });
        return;
      }
      // console.log("发布线索内容", clueText);
      console.log("寻人信息ID", this.MissID);
      this.upclueform.date = this.formatLongDate(this.upclueform.date);

      api
        .upClue(parseInt(this.user_id), parseInt(this.MissID), this.upclueform.clueText, this.upclueform.date, this.upclueform.detailTime, this.upclueform.selectedArea[0], this.upclueform.selectedArea[1], this.upclueform.selectedArea[2], this.upclueform.detailAddress, this.imgUrlList.length, this.imgUrlList)
        .then(function (response) {
          console.log("发布线索", response);
          // this.getMissInfo();
          ElMessage({
            message: "线索发布成功",
            type: "success",
          });

        })
        .catch(function (error) {
          console.log(error);
        });

    },
    //点击举报[寻人信息]按钮
    misReport() {
      if (!this.loginState) {
        ElMessage({
          message: "请先登录",
          type: "warning",
        });
        return;
      }
      //显示对话框
      this.dialogFormVisible = true;
    },
    //确认提交寻人信息举报理由按钮
    SubmitMisReason(text) {
      api
        .upMisReport(parseInt(this.user_id), parseInt(this.MissID), text)
        .then(function (response) {
          console.log("发布寻人信息举报", response);
          ElMessage({
            message: "提交成功",
            type: "success",
          });
        })
        .catch(function (error) {
          console.log(error);
        });

      this.dialogFormVisible = false;
    },
    //点击举报线索按钮
    upClueReport(id) {
      if (!this.loginState) {
        ElMessage({
          message: "请先登录",
          type: "warning",
        });
        return;
      }
      this.dialogFormVisible2 = true;
      this.clueID = id;
    },
    //确认提交线索举报按钮
    SubmitClueReason(text) {
      api
        .upClueReport(parseInt(this.user_id), parseInt(this.clueID), text)
        .then(function (response) {
          console.log("发布线索举报", response);
          ElMessage({
            message: "提交成功",
            type: "success",
          });
        })
        .catch(function (error) {
          console.log(error);
        });
      this.dialogFormVisible2 = false;
    },
    //关注寻人信息按钮
    follow() {
      console.log("用户id", this.user_id);
      console.log("丢失者的id", this.MissID);
      api
        .followMis(this.user_id, this.MissID)
        .then((res) => {
          console.log("关注按钮接收的数据", res);
          this.isFollow = res.data.data.state;
          if (this.isFollow) {
            ElMessage({
              message: "已关注",
              type: "success",
            });
          } else {
            ElMessage({
              message: "已取消关注",
              type: "success",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //图片URL获取
    handleImgChange(uploadFile, uploadFiles) {
      console.log(uploadFile);
      console.log(uploadFiles);
      var reader = new FileReader();
      reader.readAsDataURL(uploadFile.raw);
      reader.onload = (e) => {
        console.log("有没有执行");
        console.log(e);
        var imageurl = e.target.result;
        // console.log("图片的base64数据",imageurl); //图片的base64数据 
        console.log('目前数组的内容', this.imgUrlList);
        this.imgUrlList.push(imageurl);
        console.log('目前数组的内容', this.imgUrlList);
      };
    },
    //时间转化封装 
    formatLongDate(date) {
      let myyear = date.getFullYear();
      let mymonth = date.getMonth() + 1;
      let myweekday = date.getDate();
      let myHour = date.getHours();
      let myMin = date.getMinutes();
      let mySec = date.getSeconds();

      if (mymonth < 10) {
        mymonth = "0" + mymonth;
      }
      if (myweekday < 10) {
        myweekday = "0" + myweekday;
      }
      if (myHour < 10) {
        myHour = "0" + myHour;
      }
      if (myMin < 10) {
        myMin = "0" + myMin;
      }
      if (mySec < 10) {
        mySec = "0" + mySec;
      }
      return myyear + "-" + mymonth + "-" + myweekday;
    },
    //点击发布线索按钮，已登录的可以打开表单填写对话框，未登录提示登录
    toOpenUpclueDialog() {
      if (!this.loginState) {
        ElMessage({
          message: "请先登录",
          type: "warning",
        });
        return;
      }
      this.upclueDialogVisible = true;
    },
    //打开寻人线索详情
    openClueDetail(clueID) {
      this.clueID = clueID;
      api
      .getClueDetail(this.clueID)
      .then((res) => {
        console.log("clueDetail接收到的数据", res);
        var theClueInfo=res.data.data;
        console.log(theClueInfo);
        // this.MissInfo = res.data.data;
        // console.log("志愿者长度", this.MissInfo.search_vols.length);
        // this.address =
        //   CodeToText[this.MissInfo.search_province] +
        //   CodeToText[this.MissInfo.search_city] +
        //   CodeToText[this.MissInfo.search_area];
        this.clueInfo.clueInfoArea=CodeToText[theClueInfo.province]+CodeToText[theClueInfo.city]+CodeToText[theClueInfo.area];
        console.log(this.clueInfo.clueInfoArea);
        this.clueInfo.clueInfoDate=theClueInfo.clue_day;
        this.clueInfo.clueInfoTime=theClueInfo.detail_time;
        this.clueInfo.clutInfoAdr=theClueInfo.detail_address;
        this.clueInfo.clueInfoText=theClueInfo.clue_content;
        this.urls=theClueInfo.pic_list;
      })
      .catch((err) => {
        console.log(err);
      });
      this.clueDetailDialogFormVisible = true;


    }
  },
};
</script>

<style scoped>
.upclueDialog {
  width: 70%;
}

/*.el-header.myHeader {
    position: relative;
    height: 50px;
    width: 100%;
    text-align: center;
    line-height: 60px;
    background-image: none;
    background-color:#32495E;
}*/

/* .detail-view .el-header {
  background-color: #202741;
  color: #ffffff;
  align-items: center;
  display: flex;
  justify-content: center;
  position: relative;
}

.up-menu {
  height: 55px;
  width: 100%;
  align-items: center;
}

.flex-grow {
  flex-grow: 1;
} */

.el-main {
  background-color: #f4f6f9;
  position: relative;
  padding: 2% 5% 2%;
  width: 100%;
  min-width: 800px;
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

.return {
  float: left;
  color: grey;
  font-size: 15px;
  margin-bottom: 30px;
  margin-left: 100px;
}

.image {
  object-fit: contain;
  width: 20%;
  height: 250px;
  margin-right: 50px;
  margin-left: 300px;
}

.info {
  padding: 14px;
  text-align: left;
  font-size: 16px;
  line-height: 30px;
  margin-top: 5px;
  margin-bottom: 5px;
  font-weight: bold;
}

.toptext {
  margin-top: 50px;
  height: 30px;
  text-align: left;
  color: #2e74b6;
  font-size: 25px;
  margin-left: 100px;
  font-weight: bold;
}

.el-divider {
  background-color: #67bbff;
  margin: 20px 0;
}

.text {
  padding-left: 20px;
  padding-right: 20px;
  text-align: left;
  margin-top: 10px;
  margin-left: 100px;
}

.cell-item {
  display: flex;
  align-items: center;
  /* width: 20%; */
}

.margin-top {
  margin-top: 20px;
}

.demo-image__lazy {
  height: 400px;
  overflow-y: auto;
}
.demo-image__lazy .el-image {
  display: block;
  min-height: 200px;
  margin-bottom: 10px;
}
.demo-image__lazy .el-image:last-child {
  margin-bottom: 0;
}
</style>