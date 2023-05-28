<!-- @author:何懿励-后台志愿者管理-普通用户 -->
<template>
  <el-header>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>工作人员信息</el-breadcrumb-item>
    </el-breadcrumb>
  </el-header>
  <el-main style="background-color: rgba(245, 249, 250, 1)">
    <el-card>
      <el-row :gutter="20">
        <el-col :span="3">
          <span style="text-align: center;">按姓名搜索</span>
        </el-col>
        <el-col :span="5">
          <el-input></el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" :icon="Search">搜索</el-button>
        </el-col>
        <el-col :span="5">
          <span style="text-align: center">按地区搜索</span>
        </el-col>
        <el-col :span="5">
          <el-cascader size="default" :options="options" v-model="selectedOptions" placeholder="省-市"
            @change="handleRegionChange">
          </el-cascader>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" :icon="Search" @click="searchVolByDistinct">搜索</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card>
      <el-table :data="tableData" style="width: 100%" header-align="center">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column prop="vol_id" label="工作人员编号" align="center" />
        <el-table-column prop="user_name" label="用户昵称" align="center" />
        <el-table-column prop="phone_num" label="电话" align="center" />
        <el-table-column prop="mail_num" label="邮箱" align="center" />
        <el-table-column prop="user_id" label="用户ID" align="center" />
        <el-table-column
          label="地址"
          align="center"
          :formatter="codeToText"
        />
        <!-- <el-table-column prop= "inst_name" label="志愿机构名" align="center"/> -->
        <el-table-column
          prop="info_followup_num"
          label="当前跟进寻人信息数量"
          align="center"
        />
        <el-table-column prop="act_num" label="当前负责志愿活动数量" align="center" />
      </el-table>

      <div class="Parent">
      <!--分页-->
      <el-pagination
        v-model:currentPage="pagenum"
        v-model:page-size="pagesize"
        :page-sizes="[1, 2, 5, 10]"
        :total="total"
        layout="total,prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    </el-card>
  </el-main>
</template>
 
<script>
import { ref } from "vue";
import api from "/src/api/index";
import { CodeToText } from "element-china-area-data";
import { provinceAndCityData } from "element-china-area-data";


const value1 = ref(true);
export default {
  data() {
    return {
      tableData: [],
      pagenum: 1, //页数
      pagesize: 5, //每页的数量
      total: 0, //总条目数
      options: provinceAndCityData,
      selectedOptions: [],
      byDistinct: false,
    };
  },
  mounted() {
    this.getAllVol();
  },
  methods: {
    searchVolByDistinct(){
      api
        .searchVolByDistinct(this.selectedOptions[1],this.pagenum,this.pagesize).then((res) => {
          this.byDistinct=true;
          this.tableData = res.data.data.volList;
          this.total = res.data.data.total;
        });

    },
    getAllVol() {
      api.getAllVol(this.pagenum, this.pagesize).then((res) => {
        //console.log(res.data);
        this.tableData = res.data.data.vol_info;
        this.total = res.data.data.total;
      });
    },
    handleSizeChange(newSize) {
      //console.log(newSize);
      this.pagesize = newSize; //重新指定每页数据量
      if(this.byDistinct){
        this.searchVolByDistinct();
      }
      else{
        this.getAllVol(); //带着新的分页请求获取数据
      }
    },
    handleCurrentChange(newPage) {
      //console.log(newPage);
      this.pagenum = newPage; //重新指定当前页
      this.getAllVol();
    },
    codeToText(row) {
      if (row.detail != null) {
        return `${CodeToText[row.province_id]} ${CodeToText[row.city_id]} ${CodeToText[row.area_id]} ${row.detail}`;
      } else {
        return `${CodeToText[row.province_id]} ${CodeToText[row.city_id]} ${CodeToText[row.area_id]}`;
      }
    },
    handleRegionChange(value){

    }
  },
};
</script>

<style lang="less" scoped>
.el-header {
  background-color: rgba(255, 255, 255, 1);
  height: 60px;
  display: flex; //设置显示为flex布局
  justify-content: space-between; //设置为flex左右布局
  padding-left: 30; //左内边距为20（Logo贴左边）
  align-items: center; //元素上下居中
}
.el-row {
  background-color: rgba(255, 255, 255, 1);
  border-radius: 4px;
  height: 80px;
  align-items: center; //元素上下居中
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-card {
  margin-bottom: 20px; //下边距
  width: 100%;
}
.el-pagination {
  margin: auto;
}
.Parent {
  display: flex;
}

</style>
 