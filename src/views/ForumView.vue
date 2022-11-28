<!-- @author:刘筱科-寻人论坛主页面 -->
<template>
    <div class="common-layout">
      <el-container style="height: fit-content;">
        <el-header class="myHeader5">
          <MainHeader />
          <div style="margin-top: 100px; font-size: 30px; color: white">
            寻人论坛
          </div>
        </el-header>
  
        <!-- 这是页面主体 -->
        <el-container style="background-color: rgba(244, 246, 249, 1); display: flex; ">
            <!-- 左侧边栏 -->
            <el-aside width="300px" style="padding-left: 100px;margin-top: 100px">
                 <el-menu 
                    default-active="成功案例分享"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    background-color="#202741"
                    text-color='#FFFFFF'
                    >
                    <div class="aside-title">
                        <p>论坛分区</p>
                    </div>
                    <el-menu-item index="成功案例分享">
                        <el-icon><Finished /></el-icon>
                        <span slot="title">成功案例分享</span>
                    </el-menu-item>
                    <el-menu-item index="寻人杂谈">
                        <el-icon><ChatDotRound /></el-icon>
                        <span slot="title">寻人杂谈</span>
                    </el-menu-item>
                    <el-menu-item index="志愿者指南">
                        <el-icon><Aim /></el-icon>
                        <span slot="title">志愿者指南</span>
                    </el-menu-item>
                    <el-menu-item index="爱心支持">
                        <el-icon><Connection /></el-icon>
                        <span slot="title">爱心支持</span>
                    </el-menu-item>
                    </el-menu>
            </el-aside>
        <el-main  style="margin-left: 8%; margin-right:8%;width: 100%;flex: auto; ">
          <!-- 这是搜索框 -->
              <div
                style="margin-top: 40px;"
              >
                        <el-input
                            type="text"
                            v-model="search_info"
                            placeholder="搜索论坛内容..."
                            clearable
                            @keyup.enter="getSearch"
                            >
                            <template #append>
                                <el-button @click="getSearch" icon="Search"/>
                            </template>
                        </el-input>
              </div>
          <!-- 这是筛选按钮 -->
        <div >
            <el-radio-group v-model="search_type" 
                    class="search_type_button"
                    @change="searchTypeChange"
                    > 
                <el-radio-button label="综合" />
                <el-radio-button label="热度"/>
                <el-radio-button label="最新" />
                </el-radio-group>
         </div>
          <!-- 这是帖子内容 -->
          <div>
            <div
              class="box1"
              v-for="(item, index) in post_list"
              :key="index"
              @click="goNewsInfo(post_list[index].id)"
            >
            <!-- 有封面 -->
            <el-row 
                v-if="post_list[index].cover!=null"
                :gutter="40">
                <el-col :span="10">
                <div>
                    <el-image
                    style="width: 250px; height: 140px; margin-left: 30px;"
                    :src="post_list[index].cover"
                    fit="cover"
                    ></el-image>
                </div>
                </el-col>
                <el-col :span="14">
                <div class="title">{{ post_list[index].title }}</div>
                <div class="text">
                    {{ post_list[index].content.substring(0, 135) }}......
                </div>
                </el-col>
             </el-row>
            <!-- 无封面 -->
            <el-row 
                v-else
                style="margin-left: 40px;">
                <div class="title">{{ post_list[index].title }}</div>
                <div class="text">
                    {{ post_list[index].content.substring(0, 250) }}......
                </div>
             </el-row>

        <el-row  style="margin-right: 30px; margin-top: 10px; margin-left: 30px;">
            <el-col :span="3">
                <el-avatar
                    v-if="post_list[index].user_url != null"
                    shape="circle"
                    style="width: 50px; height: 50px"
                    :src="post_list[index].user_url "
                    ></el-avatar>
                <el-avatar
                    v-if="post_list[index].user_url== null"
                    shape="circle"
                    style="width: 50px; height: 50px"
                    src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                    ></el-avatar>
            </el-col>
            <el-col :span="9" style="text-align: left; margin-top: 5px">
                    <div class="note"> {{ post_list[index].user_name}} </div>
                    <div class="note"> {{ post_list[index].time}} </div>
                    </el-col> 
            <el-col :span="6" :offset="6" >   
                <div  style="width: 200px;display: flex; justify-content:space-around; margin-top: 25px;">
                    <div class="note"> {{ post_list[index].likes}} 赞</div>
                    <div class="note"> {{ post_list[index].comment}} 条评论</div>
                </div>
            </el-col>
         </el-row>

            </div>
          </div>
  
          <!-- 这是页数选择 -->
          <div
            class="example-pagination-block"
            style="display: flex; justify-content: center"
          >
            <el-pagination
              v-model:page-size="pagesize"
              :current-page="currentPage"
              layout="prev, pager, next"
              :total="total"
              @current-change="handleCurrentChange"
            />
          </div>
        </el-main>
        <el-aside width="300px" style="padding-right: 200px;margin-top: 70px">
            <el-button type="primary" size="default">发布帖子</el-button>
        </el-aside>
    </el-container>
        <Footer></Footer>
      </el-container>
    </div>
  </template>
  
  <script>
  import { ref } from "vue";
  import api from "/src/api/index";
  import MainHeader from "@/views/Frontstage/MainHeader.vue";
  import Footer from "@/views/Frontstage/Footer.vue";
  export default {
    components: {
      MainHeader,
      Footer,
    },
    data () {
      return {
        post_list: [
    {
        "title": "登记完失踪信息后要注意什么",
        "id": 1,
        "content": "武汉悟空游人工智能应用软件有限公司成立于2018年10月，是一家提供功能强大、世界领先的人工智能服务的高科技企业。公司设立专门的研发部门，目前共有技术人员10余人，其中，博士4人，致力于成为全球领先的人工智能龙头企业。本公司通过API、SDK以及面向用户自主研发产品的形式，提供世界领先的语音、图像、智能机器人等多项人工智能技术服务，为用户提供领域最新的应用场景和解决方案。目前公司主要有图像处理，语音处理和自然语言处理三方面的产品，包括图像、视频高清修复，腰椎间盘突出自动诊断，骨龄检测，以及大规模知识图谱构建服务等。是一家提供功能强大，世界领先的人工智能服务的高科技企业。公司设立专门的研发部门，目前共有技术人员10余人，其中，博士4人，致力于成为全球领先的人工智能龙头企业。本公司通过API、SDK以及面向用户自主研发产品的形式，提供世界领先的语音、图像、智能机器人等多项人工智能技术服务，为用户提供领域最新的应用场景和解决方案。目前公司主要有图像处理，语音处理和自然语言处理三方面的产品，包括图像、视频高清修复，腰椎间盘突出自动诊断，骨龄检测，以及大规模知识图谱构建服务等。",
        "cover": "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
	"comment":"120",
	"likes":"12",
	"user_url":"https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
	"user_name":"利益",
	"time":"12-12",
    },
      {
        "title": "登记完失踪信息后要注意什么",
        "id": 1,
        "content": "武汉悟空游人工智能应用软件有限公司成立于2018年10月，是一家提供功能强大、世界领先的人工智能服务的高科技企业。公司设立专门的研发部门，目前共有技术人员10余人，其中，博士4人，致力于成为全球领先的人工智能龙头企业。本公司通过API、SDK以及面向用户自主研发产品的形式，提供世界领先的语音、图像、智能机器人等多项人工智能技术服务，为用户提供领域最新的应用场景和解决方案。目前公司主要有图像处理，语音处理和自然语言处理三方面的产品，包括图像、视频高清修复，腰椎间盘突出自动诊断，骨龄检测，以及大规模知识图谱构建服务等。是一家提供功能强大，世界领先的人工智能服务的高科技企业。公司设立专门的研发部门，目前共有技术人员10余人，其中，博士4人，致力于成为全球领先的人工智能龙头企业。本公司通过API、SDK以及面向用户自主研发产品的形式，提供世界领先的语音、图像、智能机器人等多项人工智能技术服务，为用户提供领域最新的应用场景和解决方案。目前公司主要有图像处理，语音处理和自然语言处理三方面的产品，包括图像、视频高清修复，腰椎间盘突出自动诊断，骨龄检测，以及大规模知识图谱构建服务等。",
        "cover": null,
	"comment":"120",
	"likes":"12",
	"user_url":"https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
	"user_name":"利益",
	"time":"12-12",
    }
    ], //帖子列表
        currentPage: 1, //页码
        pagesize: 2, //每页的数量
        total: 2, //总条目数
        search_type: '综合', //搜索类型
        group: "成功案例分享", //论坛分区
        search_info: "", //搜索框内容
        search: "", //传给api的搜索参数
      };
    },
  
    mounted () {
      this.getBeforePage();
    },
  
    methods: {
        handleOpen(key, keyPath) {
            this.group=key;
            sessionStorage.setItem("group", key);
            console.log(key);
      },
      //点击跳转
      goNewsInfo (news_id) {
        console.log("资讯id:", news_id);
        //跳转至资讯详情页面
        this.$router.push({
          path: "/newsInfo",
          query: { NewsId: news_id },
        });
      },
      searchTypeChange(key)
      {
        this.search_type=key
        sessionStorage.setItem("search_type", this.search_type);
        console.log(key)
      },
      //获取之前存储的页码，便于详情页跳转返回原页面、原类型
      getBeforePage () {
        //如果有页码就读取缓存里面的数据，没有的话当前页码设为1
        if (sessionStorage.getItem("currentPage")) {
          this.currentPage = Number(sessionStorage.getItem("currentPage"));
        } else {
          this.currentPage = 1;
        }
        //如果有寻人类型就读取缓存里面的数据，没有的话当前类型设为"全部"
        if (sessionStorage.getItem("search_type")) {
          this.search_type = sessionStorage.getItem("search_type");
        } else {
          this.search_type = "综合";
        }
        //清掉缓存里面的数据，防止对其他页面存的currentpage造成影响
        // sessionStorage.removeItem("currentPage");
        // sessionStorage.removeItem("newsType");
  
        //这是我获取资讯卡片信息的函数
        this.getNewsCard();
      },
  
      //获取寻人资讯卡片信息
      getNewsCard () {
        api
          .newsCard(this.news_type, this.currentPage, this.pagesize)
          .then((res) => {
            console.log("请求成功", res.data);
            this.post_list = res.data.data.post_list;
            this.total = res.data.data.total;
            console.log("获取数据", this.post_list);
          })
          .catch((err) => {
            console.log("请求失败", err);
          });
      },
      //搜索寻人资讯
      searchNewsInfo () {
        api
          .searchNews(this.search, this.currentPage, this.pagesize)
  
          .then((res) => {
            console.log("输入参数：", this.search);
            console.log("请求成功", res.data);
            this.post_list = res.data.data.post_list;
            this.total = res.data.data.total;
            console.log("获取数据", this.post_list);
          })
          .catch((err) => {
            console.log("请求失败", err);
          });
      },
      //获取搜索框信息
      getSearch () {
        this.search = this.search_info;
        this.searchNewsInfo();
      },
  
      //分页
      handleCurrentChange (newPage) {
        console.log(newPage);
        this.currentPage = newPage; //重新指定当前页
        this.getNewsCard();
        //页码保存进sessionstorage
        sessionStorage.setItem("currentPage", newPage);
      },
    },
  };
  </script>
  
  <style lang="less" scoped>
  .el-menu-vertical-demo
  {
    border-radius: 10px;
  }

  .aside-title
  {
    font-size: 23px;
    font-weight: 700;
    padding-top: 3px;
    text-align: center;
    color: #ffffff;
  }
  .el-button--primary{
    --el-button-bg-color: #202741;
    --el-button-border-color: #202741;
    --el-button-hover-bg-color:#589EF8;
    --el-button-active-bg-color: #589EF8;
  }

  .search_type_button
  {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px; 
    margin-bottom:20px;
  }

  .title {
    text-align: left;
    font-size: 23px;
    font-weight: 700;
    margin-bottom: 10px;
    margin-right: 30px;
  }
  .text {
    font-size: 13px;
    text-align: left;
    margin-right: 30px;
  }
 
  .box1 {
    width: 100%;
    height: 200px;
    background: #ffffff;
    border-radius: 10px;
    margin-bottom: 15px;
    padding-top:20px;
    padding-bottom:20px;
  }

  .note{
    font-size: 13px;
    color:dimgrey;
  }
  .example-pagination-block + .example-pagination-block {
    margin-top: 10px;
  }
  .example-pagination-block .example-demonstration {
    margin-bottom: 16px;
  }
  /* 把页面切换的背景色设置为和主背景颜色相同 */
  /deep/.el-pager li {
    background: #f4f6f9;
  }
  
  /deep/.el-pagination .btn-next,
  /deep/.el-pagination .btn-prev {
    background-color: #f4f6f9;
  }
  
  /deep/.el-pagination button:disabled {
    background-color: #f4f6f9;
  }
  
  .myHeader5 {
    height: 300px;
    background-image: url(../../image/forum.png);
    background-size: cover;
  }
  .el-main {
    background-color: #f4f6f9;
  }
  </style>