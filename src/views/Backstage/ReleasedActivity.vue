<!-- @author:陈思羽-志愿活动管理-已发布志愿活动 -->
<template>
    <el-header>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>志愿活动管理</el-breadcrumb-item>
            <el-breadcrumb-item>已发布志愿活动</el-breadcrumb-item>
        </el-breadcrumb>
    </el-header>
    <el-main style="background-color: rgba(245, 249, 250, 1)">


        <el-card>
            <el-row :gutter="20">
                <el-col :span="1">
                    <span style="text-align: center">搜索</span>
                </el-col>
                <el-col :span="7">
                    <el-input></el-input>
                </el-col>
                <el-col :span="2">
                    <el-button type="primary" icon="Search"></el-button>
                </el-col>
            </el-row>
        </el-card>
        <el-card>
            <el-table :data="tableData" style="width: 100%" header-align="center">
                <!--el-table-column type="selection" width="55" align="center"/-->
                <el-table-column prop="VolActId" label="志愿活动编号" align="center" />
                <el-table-column prop="VolActName" label="志愿活动标题" align="center" />
                <el-table-column prop="ReleaseTime" label="发布时间" align="center" />
                <!-- <el-table-column prop= "administrator_id" label="管理员编号" align="center"/> -->
                <!-- <el-table-column prop="need_people" label="所需人数" align="center"/> -->
                <el-table-column prop="operation" label="操作" align="center">
                    <template v-slot="scope">
                        <el-button icon="User" size="small" @click="dialog(scope.row)" style="margin-right: 10px;">查看招募人员</el-button>
                        <el-dialog v-model="dialogTableVisible" title="已报名用户信息">
                            <el-table :data="gridData">
                            <el-table-column property="userId" label="用户编号" width="150" />
                            <el-table-column property="userName" label="姓名" width="200" />
                            <el-table-column property="phoneNum" label="联系方式" />
                            <el-table-column property="mailboxNum" label="邮箱" />
                            </el-table>
                            <!--分页-->
                            <div class="Parent">
                            <el-pagination v-model:currentPage="pagenum_table" v-model:page-size="pagesize_table"
                                :total="total_table" layout="total, prev, pager, next, jumper"
                                @current-change="handleCurrentChange_table" />
                            </div>
                        </el-dialog>
                        <el-button type="primary" icon="Edit" size="small" @click="modifyAct(scope.row)">编辑</el-button>
                        <el-button type="danger" icon="DeleteFilled" size="small"
                            @click="deleteAct(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!--分页-->
            <div class="Parent">
            <el-pagination v-model:currentPage="pagenum" v-model:page-size="pagesize" :page-sizes="[1, 2, 5, 10]"
                :total="total" layout="total, prev, pager, next, jumper" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" />
            </div>
        </el-card>

    </el-main>
</template>
 
<script>
import { ref } from 'vue'
import api from "/src/api/index"
const value1 = ref(true)
export default {
    data() {
        return {
            tableData: [],
            pagenum: 1,  //页数
            pagesize: 5, //每页的数量
            total: 100,  //总条目数
            volId:0, //工作人员ID
            dialogTableVisible: false, //是否展示对话框

            gridData:[],
            pagenum_table: 1,  //页数
            pagesize_table: 5, //每页的数量
            total_table:0,

        }
    },
    mounted() {
        this.volId=JSON.parse(sessionStorage.getItem("volid"));
        this.getAllActivities();
    },
    methods: {
        dialog(vol_ctivity){
            this.dialogTableVisible=true;
            api.showAllRecruited(vol_ctivity.VolActId,this.pagenum_table, this.pagesize_table)
            .then((res) => {
                    console.log("请求成功", res);
                    this.gridData = res.data.data.users_list;
                    this.total_table = res.data.data.total;
            })
        },
        handleSizeChange_table(newSize) {
            //console.log(newSize);
            this.pagesize_table = newSize;//重新指定每页数据量
            this.dialog();//带着新的分页请求获取数据
        },
        getAllActivities() {
            api
                .getVolActList(this.volId,this.pagenum, this.pagesize)
                .then((res) => {
                    console.log("请求成功", res);
                    this.tableData = res.data.data.activity_list;
                    this.total = res.data.data.total;
                    //console.log("获取数据", this.volActList);
                })
                .catch((err) => {
                    console.log("请求失败", err);
                });

            // api
            //     //.getActSearch(this.inputAct, this.pagenum, this.pagesize)
            //     .getActSearch("", this.pagenum, this.pagesize)
            //     .then((res) => {
            //         console.log("搜索成功", res);
            //         this.tableData = res.data.data.activity_list;
            //         this.total = res.data.data.total;
            //     })
            //     .catch((err) => {
            //         console.log("请求失败", err);
            //     });

            // api.getAllNews(this.pagenum, this.pagesize).then(res => {
            //     console.log(res.data);
            //     this.tableData = res.data.data.news_info;
            //     this.total = res.data.data.total;
            // })
        },
        modifyAct(vol_ctivity) {
            //跳转至活动详情发布同款界面
            this.$router.push({
                path: "/backstage/modifyActivity",
                //params: {  }, path和params不能同时使用，会使params失效，要用params需要将path替代为name(router名)
                query: { act_id: vol_ctivity.VolActId },
            });

        },
        async deleteAct(vol_ctivity) {
            console.log(vol_ctivity.VolActId);
            if (confirm("您确定要删除此志愿活动吗？")) {
                await api.deleteVolActivity(vol_ctivity.VolActId).then(res => {
                    this.$message.success('删除成功！');
                    this.getAllActivities();
                }).catch(err => {
                    console.log(err)
                    this.$message.error('删除失败！');
                })
            }
        },

        handleSizeChange(newSize) {
            //console.log(newSize);
            this.pagesize = newSize;//重新指定每页数据量
            this.getAllActivities();//带着新的分页请求获取数据
        },
        handleCurrentChange(newPage) {
            //console.log(newPage);
            this.pagenum = newPage;//重新指定当前页
            this.getAllActivities();
        }
    }
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
}

.Parent {
  display: flex;
}

.el-pagination {
  margin: auto;
}
</style>
 