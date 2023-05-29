<!-- @author:刘筱科-资讯管理-发布资讯 -->
<template>
  <el-header>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>志愿活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>发布志愿活动</el-breadcrumb-item>
    </el-breadcrumb>
  </el-header>
  <el-main style="background-color: rgba(245, 249, 250, 1)">
    <el-card style="height: max-content; width: 100%">
      <div style="margin-left: 3%; margin-top: 3%; margin-right: 5%">
        <el-form-item label="活动名称" style="margin-bottom: 3%; width: 500px">
          <el-input v-model="this.activity.act_name" :autosize="{ minRows: 1 }" type="textarea"
            placeholder="请输入活动名称"></el-input>
        </el-form-item>

        <el-form-item label="活动图片">
          <div style="text-align: left">
            <CropperImageUpload @uploadImgSuccess="uploadImgSuccessHandler" />
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件
            </div>
          </div>
        </el-form-item>

        <el-form-item label="活动内容" style="margin-bottom: 3%; margin-top: 2%">
          <el-input v-model="activity.act_content" :autosize="{ minRows: 10 }" type="textarea"
            placeholder="请输入活动内容"></el-input>
        </el-form-item>

        <!-- <el-form-item
          label="志愿机构"
          style="margin-bottom: 3%; margin-top: 2%"
        >
          <el-select
            v-model="activity.volInst_Id"
            filterable
            placeholder="志愿机构"
          >
            <el-option
              v-for="item in volInstOptions"
              :key="item.VolInstId"
              :label="item.InstName"
              :value="item.VolInstId"
            >
            </el-option>
          </el-select>
              </el-form-item> -->

        <el-form-item label="活动人数" style="margin-bottom: 3%; width: 300px">
          <el-input v-model="activity.need_people" type="number" placeholder="请输入活动人数"></el-input>
        </el-form-item>

        <el-form-item label="活动时间" style="margin-bottom: 3%">
          <el-date-picker v-model="value1" type="datetimerange" range-separator="至" start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="活动地址" style="margin-bottom: 3%">
          <el-cascader size="default" :options="options" v-model="selectedOptions" placeholder="省-市-区"
            @change="handleChange">
          </el-cascader>
          <el-input style="width: auto" v-model="activity.act_address" autocomplete="off" placeholder="详细地址"></el-input>
        </el-form-item>

        <el-form-item label="联系方式" style="margin-bottom: 3%; width: 300px">
          <el-input v-model="activity.contact_method" placeholder="请输入联系方式"></el-input>
        </el-form-item>

        <div>
          <el-button type="primary" @click="save">发 布</el-button>
        </div>
      </div>
    </el-card>
  </el-main>
</template>
    
<script>
import { toRefs, toRef, ref } from 'vue'
import CropperImageUpload from '@/components/CropperImage.vue'
import api from "/src/api/index";
import { regionData } from "element-china-area-data";

export default {
  name: "ActivityRelease",
  components: {
    CropperImageUpload
  },
  props: {
    searchId: {
      // 定义接收的类型 还可以定义多种类型 [String, Undefined, Number]
      // 如果required为true,尽量type允许undefined类型，因为传递过来的参数是异步的。或者设置默认值。
      type: Number,
      // 定义是否必须传
      required: false,
      // 定义默认值
      //default: ""
    },
    contact: {
      // 定义接收的类型 还可以定义多种类型 [String, Undefined, Number]
      // 如果required为true,尽量type允许undefined类型，因为传递过来的参数是异步的。或者设置默认值。
      type: Number,
      // 定义是否必须传
      required: false,
      // 定义默认值
      //default: ""
    }
  },
  data() {
    return {
      admin_id: JSON.parse(sessionStorage.getItem("administratorid")),
      options: regionData,
      selectedOptions: [],
      // activity: {
      //   act_name: "",
      //   act_content: "",
      //   act_time: "",
      //   need_people: "",
      //   act_province: "",
      //   act_city: "",
      //   act_area: "",
      //   act_address: "",
      //   contact_method: "",
      //   //volInst_Id: "",
      //   imageurl: "",
      //   volAct_id: "",
      // },
      volInstOptions: [],
      value1: [],
      // volImg: ""
    };
  },
  setup() {
    let activity = ref({
      act_name: "",
      act_content: "",
      act_time: "",
      need_people: "",
      act_province: "",
      act_city: "",
      act_area: "",
      act_address: "",
      contact_method: "",
      //volInst_Id: "",
      imageurl: "",
      volAct_id: "",
    })
    let user_id = ref(0)
    let vol_id = ref(0)
    let admin_id = ref(0)
    let volImg = ref()

    let userType = JSON.parse(sessionStorage.getItem("useridentity")); //获取用户类型
    if (userType == "user") {
      user_id = ref(sessionStorage.getItem("userid"));
    }
    else if (userType == "volunteer") {
      vol_id = JSON.parse(sessionStorage.getItem("volid"));
    }
    else {
      admin_id = JSON.parse(sessionStorage.getItem("administratorid"))
    }

    // const { imgUrl } = toRefs(attrs)
    //const imgUrl = ref("");
    const uploadImgSuccessHandler = function (state) {
      //console.log("图片数据：", state)
      // emit('update:imgUrl', state)
      activity.imageurl = state;
      volImg.value = state;
      // console.log("上传的图片数据", activity.imageurl);
    }

    return {
      volImg,
      user_id,
      vol_id,
      admin_id,
      activity,
      uploadImgSuccessHandler
    }
  },
  mounted() {
    if (this.searchId != null)
      this.activity.act_name = "寻人线索核实志愿活动";
    console.log("父组件传参：", this.searchId, this.contact);
    if (this.contact != null)
      this.activity.contact_method = this.contact;
  },
  methods: {
    //三级省市区修改
    handleChange(value) {
      this.activity.act_province = value[0];
      this.activity.act_city = value[1];
      this.activity.act_area = value[2];
    },

    save() {
      console.log("志愿活动数据", this.activity);
      this.activity.act_time = this.formatDateValue(this.value1[0]);
      console.log("开始时间：", this.activity.act_time);
      this.activity.endTime = this.formatDateValue(this.value1[1]);
      console.log("结束时间：", this.activity.endTime);
      // if (this.activity.imageurl == "")
      //   console.log("无图片数据")
      // console.log("图片数据", this.activity.imageurl);
      // console.log("图片", this.volImg);
      api
        .releaseVolActivity(
          this.activity.act_name,
          this.activity.act_content,
          this.formatDateValue(this.value1[0]),
          this.formatDateValue(this.value1[1]),
          Number(this.activity.need_people),
          this.activity.act_province,
          this.activity.act_city,
          this.activity.act_area,
          this.activity.act_address,
          this.activity.contact_method,
          this.vol_id
          //this.activity.volInst_Id
        )
        .then((res) => {
          console.log(res.data);
          this.activity.volAct_id = res.data.data.volAct_id;
          console.log("上传图片数据", this.activity.imageurl);
          if (res.data.status == true) {
            api.addVolActivityPic(
              this.activity.volAct_id,
              this.volImg
            );
            this.$message({
              type: "success",
              message: "发布成功!",
            });
          } else {
            this.$message({
              type: "error",
              message: "发布失败",
            });
          }
        });
    },

    //时间处理函数，给后端发送日期格式
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
  },
};
</script>
    
<style scoped>
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

/* .avatar-uploader .el-upload {
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
} */
</style>