<!-- @author:陈思羽-志愿活动管理-修改志愿活动 -->
<template>
  <el-header>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>修改志愿活动</el-breadcrumb-item>
    </el-breadcrumb>
  </el-header>
  <el-main style="background-color: rgba(245, 249, 250, 1)">
    <el-card style="height: max-content; width: 100%">
      <div style="margin-left: 3%; margin-top: 3%; margin-right: 5%">

        <el-form-item label="活动名称" style="margin-bottom: 3%; width: 500px">
          <!--不修改则禁止输入-->
          <el-input v-if="!isEdit" v-model="act_info.activity_name" :autosize="{ minRows: 1 }" type="textarea"
            placeholder="请输入活动名称" autocomplete="off" disabled></el-input>

          <!--选择修改且还没修改时-->
          <el-input v-if="!isChange[0] && isEdit" @change="changeBorderColor(0)" v-model="act_info.activity_name"
            :autosize="{ minRows: 1 }" type="textarea" placeholder="请输入活动名称" autocomplete="off"></el-input>

          <!--选择修改且已经修改-->
          <el-input v-if="isChange[0] && isEdit" v-model="act_info.activity_name" :autosize="{ minRows: 1 }"
            type="textarea" placeholder="请输入活动名称" class="input-highlight" autocomplete="off"></el-input>

        </el-form-item>

        <!--图片直接上传可以覆盖吗？-->

        <el-form-item label="活动图片">

          <div style="text-align: left">
            <CropperImageUpload :img_url="act_info.activity_pic" @uploadImgSuccess="uploadImgSuccessHandler" />
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件
            </div>
          </div>
          <!-- <div style="text-align: left">
            <el-upload v-if="!isEdit" class="avatar-uploader" action :auto-upload="false" ref="upload" disabled
              :show-file-list="false" :on-change="onUploadChange">
              <img v-if="this.act_info.activity_pic" :src="act_info.activity_pic" class="avatar" />
              <el-icon v-else class="avatar-uploader-icon">
                <Plus />
              </el-icon>
            </el-upload>

            <el-upload v-if="isEdit" class="avatar-uploader" action :auto-upload="false" ref="upload"
              :show-file-list="false" :on-change="onUploadChange">
              <img v-if="this.act_info.activity_pic" :src="act_info.activity_pic" class="avatar" />
              <el-icon v-else class="avatar-uploader-icon">
                <Plus />
              </el-icon>
            </el-upload>
            <div v-if="isEdit" slot="tip" class="el-upload__tip">
              点击图片上传新图（只能上传jpg/png文件，且不超过5M）
            </div>
          </div> -->
        </el-form-item>


        <el-form-item label="活动内容" style="margin-bottom: 3%; margin-top: 2%">
          <!--不修改则禁止输入-->
          <el-input v-if="!isEdit" v-model="act_info.activity_content" :autosize="{ minRows: 10 }" type="textarea"
            placeholder="请输入活动内容" autocomplete="off" disabled></el-input>

          <!--选择修改且还没修改时-->
          <el-input v-if="!isChange[1] && isEdit" v-model="act_info.activity_content" :autosize="{ minRows: 10 }"
            type="textarea" placeholder="请输入活动内容" @change="changeBorderColor(1)" autocomplete="off"></el-input>

          <!--选择修改且已经修改-->
          <el-input v-if="isChange[1] && isEdit" v-model="act_info.activity_content" :autosize="{ minRows: 10 }"
            type="textarea" placeholder="请输入活动内容" class="input-highlight" autocomplete="off"></el-input>

        </el-form-item>

        <el-form-item label="活动人数" style="margin-bottom: 3%; width: 300px">
          <!--不修改则禁止输入-->
          <el-input v-if="!isEdit" v-model="act_info.activity_needpeople" type="number" placeholder="请输入活动人数"
            autocomplete="off" disabled></el-input>

          <!--选择修改且还没修改时-->
          <el-input v-if="!isChange[2] && isEdit" v-model="act_info.activity_needpeople" type="number"
            placeholder="请输入活动人数" @change="changeBorderColor(2)" autocomplete="off"></el-input>

          <!--选择修改且已经修改-->
          <el-input v-if="isChange[2] && isEdit" v-model="act_info.activity_needpeople" type="number"
            placeholder="请输入活动人数" class="input-highlight" autocomplete="off"></el-input>

        </el-form-item>

        <el-form-item label="活动时间" style="margin-bottom: 3%">
          <!--当前设置时间禁止输入-->
          <el-input v-model="act_info.activity_expTime" placeholder="活动时间" autocomplete="off" disabled></el-input>

          <!-- 不修改则禁止输入
          <el-date-picker v-if="!isEdit" v-model="dateValue" type="datetimerange" range-separator="至"
            start-placeholder="开始日期" end-placeholder="结束日期" disabled>
                                    </el-date-picker> -->

          <!--选择修改且还没修改时-->
          <el-date-picker v-if="!isChange[3] && isEdit" @change="changeBorderColor(3)" v-model="dateValue"
            type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>

          <!--选择修改且已经修改-->
          <el-date-picker v-if="isChange[3] && isEdit" v-model="dateValue" type="datetimerange" range-separator="至"
            start-placeholder="开始日期" end-placeholder="结束日期" class="input-highlight">
          </el-date-picker>

        </el-form-item>

        <el-form-item label="活动地址" style="margin-bottom: 3%">
          <!--不修改则禁止输入-->
          <el-cascader v-if="!isEdit" size="default" :options="options" v-model="selectedOptions" placeholder="省-市-区"
            @change="handleChange" disabled>
          </el-cascader>

          <!--选择修改且还没修改时-->
          <el-cascader v-if="!isChange[4] && isEdit" size="default" :options="options" v-model="selectedOptions"
            placeholder="省-市-区" @change="handleChange">
          </el-cascader>

          <!--选择修改且已经修改-->
          <el-cascader v-if="isChange[4] && isEdit" class="cascader-highlight" size="default" :options="options"
            v-model="selectedOptions" placeholder="省-市-区" @change="handleChange">
          </el-cascader>

          <!--详细地址-->
          <!--不修改则禁止输入-->
          <el-input v-if="!isEdit" style="width: auto" v-model="act_info.activity_address" autocomplete="off"
            placeholder="详细地址" disabled></el-input>

          <!--选择修改且还没修改时-->
          <el-input v-if="!isChange[5] && isEdit" style="width: auto" v-model="act_info.activity_address"
            autocomplete="off" placeholder="详细地址" @change="changeBorderColor(5)"></el-input>

          <!--选择修改且已经修改-->
          <el-input v-if="isChange[5] && isEdit" style="width: auto" v-model="act_info.activity_address"
            autocomplete="off" placeholder="详细地址" class="input-highlight"></el-input>

        </el-form-item>

        <el-form-item label="联系方式" style="margin-bottom: 3%; width: 300px">
          <!--不修改则禁止输入-->
          <el-input v-if="!isEdit" v-model="act_info.activity_contactMethod" placeholder="请输入联系方式" autocomplete="off"
            disabled></el-input>

          <!--选择修改且还没修改时-->
          <el-input v-if="!isChange[6] && isEdit" v-model="act_info.activity_contactMethod" @change="changeBorderColor(6)"
            placeholder="请输入联系方式" autocomplete="off"></el-input>

          <!--选择修改且已经修改-->
          <el-input v-if="isChange[6] && isEdit" v-model="act_info.activity_contactMethod" class="input-highlight"
            placeholder="请输入联系方式" autocomplete="off"></el-input>

        </el-form-item>

        <!--放弃修改怎么处理-->
        <!-- <div>
          <el-button type="primary" @click="save">确认修改</el-button>
          <el-button type="primary" @click="">放弃修改</el-button>
                                                                                                                                                </div> -->
        <div v-if="isEdit" class="buttoncom" style="text-align: center">
          <el-button type="primary" @click="save">确 定</el-button>
          <el-button type="info" @click="resetData">重 置</el-button>
        </div>
        <div v-else class="buttoncom" style="text-align: center">
          <el-button type="primary" @click="edit">修 改</el-button>
        </div>
      </div>

    </el-card>
  </el-main>
</template>
    
<script>
import { ref } from "vue";
import { useRoute } from "vue-router";
import api from "/src/api/index";
import { regionData } from "element-china-area-data";
import CropperImageUpload from '@/components/CropperImage.vue'

export default {
  name: "modifyActivity-vue",
  components: {
    CropperImageUpload
  },
  data() {
    return {
      admin_id: JSON.parse(sessionStorage.getItem("administratorid")),
      options: regionData,
      selectedOptions: [],
      act_info: {},
      act_id: "",
      // activity: {
      //   act_id: "",
      //   act_name: "",
      //   act_content: "",
      //   act_time: "",
      //   need_people: "",
      //   act_province: "",
      //   act_city: "",
      //   act_area: "",
      //   act_address: "",
      //   contact_method: "",
      //   imageurl: "",
      //   //volAct_id: "",
      // },
      //volInstOptions: [],
      //value1: [],
      dateValue: [],
      isEdit: false,
      isChange: [false, false, false, false, false, false, false]
    };
  },
  setup() {
    let imgData = ref()
    let picEdit = ref(false)
    const uploadImgSuccessHandler = function (state) {
      //console.log("图片数据：", state)
      // emit('update:imgUrl', state)
      imgData.value = state;
      picEdit.value = true;
      // console.log("图片数据", imgData);
      console.log("图片修改状态", picEdit.value)
    }
    return {
      picEdit,
      imgData,
      uploadImgSuccessHandler
    }
  },
  mounted() {
    // api.getAllVolInst().then((res) => {
    //   console.log(res.data);
    //   this.volInstOptions = res.data.data.clue_list;
    // });
    const route = useRoute();
    this.act_id = route.query.act_id;
    console.log("接收到的志愿活动id", this.act_id);

    //获取单个志愿活动详情
    api
      .getVolActInfo(this.act_id)
      .then((res) => {
        console.log("请求成功", res);
        this.act_info = res.data.data;
        this.selectedOptions = [
          this.act_info.activity_province,
          this.act_info.activity_city,
          this.act_info.activity_area,
        ]
        console.log("获取数据", this.act_info);
      })
      .catch((err) => {
        console.log("请求失败", err);
      });

  },
  methods: {
    //修改状态
    edit() {
      this.isEdit = true;
    },
    //三级省市区修改
    handleChange(value) {
      this.act_info.activity_province = value[0],
        this.act_info.activity_city = value[1],
        this.act_info.activity_area = value[2],
        this.isChange[4] = true;
    },
    //保存
    save() {
      console.log(this.act_info);

      console.log("图片是否修改", this.picEdit)
      if (this.picEdit) {
        //修改图片的api
        // api.addVolActivityPic(this.act_info.activity_id, this.act_info.activity_pic).then((res) => {
        //   console.log(res.data);
        // });
        // console.log("上传的图片数据", this.imgData)
        api.addVolActivityPic(this.act_info.activity_id, this.imgData).then((res) => {
          console.log(res.data);
        });
      }

      if (this.isChange[3]) {
        this.act_info.activity_expTime = this.formatDateValue(this.dateValue[0]);
        this.act_info.activity_endTime = this.formatDateValue(this.dateValue[1]);
      }
      console.log(this.act_info.activity_expTime);

      修改志愿活动的api
      api
        .modifyVolActivity(
          this.act_info.activity_id,
          this.act_info.activity_name,
          this.act_info.activity_content,
          //this.formatDateValue(this.dateValue[0]),
          this.act_info.activity_endTime,
          this.act_info.activity_expTime,
          Number(this.act_info.activity_needpeople),
          this.act_info.activity_province,
          this.act_info.activity_city,
          this.act_info.activity_area,
          this.act_info.activity_address,
          this.act_info.activity_contactMethod,
          //this.activity.volInst_Id
        )
        .then((res) => {
          console.log(res.data);
          //this.activity.volAct_id = res.data.data.volAct_id;
          if (res.data.status == true) {
            // api.addVolActivityPic(
            //   this.act_info.activity_id,
            //   this.act_info.activity_pic,
            // );
            this.$message({
              type: "success",
              message: "修改成功！",
            });
          } else {
            this.$message({
              type: "error",
              message: "修改失败！",
            });
          }
        });


      /*复原*/
      this.isChange = [false, false, false, false, false, false, false];
      this.isEdit = false;
    },

    //时间处理函数
    // 给后端发送日期格式
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
        "T" +
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

    //选择上传图片
    // onUploadChange(file) {
    //   const isIMAGE =
    //     file.raw.type === "image/jpeg" ||
    //     file.raw.type === "image/png" ||
    //     file.raw.type === "image/gif";
    //   const isLt1M = file.size / 1024 / 1024 < 5;

    //   if (!isIMAGE) {
    //     this.$message.error("上传文件只能是图片格式!");
    //     return false;
    //   }
    //   if (!isLt1M) {
    //     this.$message.error("上传文件大小不能超过 5MB!");
    //     return false;
    //   }
    //   var reader = new FileReader();
    //   reader.readAsDataURL(file.raw);
    //   reader.onload = (e) => {
    //     this.activity.imageurl = e.target.result;
    //     console.log(this.activity.imageurl); //图片的base64数据
    //   };
    // },

    //修改输入框边框颜色
    changeBorderColor(index) {
      this.isChange[index] = true;
    },

    // 重置
    resetData() {
      //Object.assign(this.$options.data());
      Object.assign(this.$options.data.call(this));
      //Object.assign(this.$data, this.$options.data.call(this));
      console.log("志愿活动编号", this.act_info);
      api.getVolActInfo(this.act_id).then((res) => {
        console.log("请求成功", res);
        this.act_info = res.data.data;
        this.selectedOptions = [
          this.act_info.activity_province,
          this.act_info.activity_city,
          this.act_info.activity_area,
        ];
        this.isEdit = true;
      });
      // .catch((err) => {
      //   console.log("请求失败", err);
      // });
    },
  },
};
</script>
    
<style  scoped>
h6 {
  color: rgb(184, 184, 184);
}

.el-header {
  background-color: rgba(255, 255, 255, 1);
  height: 60px;
  display: flex;
  justify-content: space-between;
  padding-left: 30;
  align-items: center;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.input-highlight {
  --el-input-border-color: #409eff;
  --el-input-focus-border-color: var(--el-input-border-color);
  --el-input-hover-border-color: var(--el-input-border-color);
}

.buttoncom {
  text-align: center;
  display: flex;
  justify-content: space-around;
  padding-left: 25%;
  padding-right: 25%;
}
</style>