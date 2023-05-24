<!-- @author:陈思羽-财务管理-支出明细-->
<template>
    <el-header>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>财务管理</el-breadcrumb-item>
            <el-breadcrumb-item>支出明细</el-breadcrumb-item>
        </el-breadcrumb>
    </el-header>
    <el-main style="background-color: rgba(245, 249, 250, 1)">

        <el-row :gutter="60">
            <el-col :span="6">
                <div style="background-color: rgba(42, 130, 228, 0.17)" class="card">
                    <div class="cicon">
                        <el-icon size="60" color="#000000" class="eicon">
                            <Coin />
                        </el-icon>
                    </div>
                    <div style="padding-left:20px;">
                        <span style="font-size:large;">当年已收入<br /><br /></span>
                        <span style="font-size:xx-large;">{{ fund_in_total }}</span>
                    </div>
                </div>
            </el-col>

            <el-col :span="6">
                <div style="background-color: rgba(4, 76, 144, 1)" class="card">
                    <div class="cicon">
                        <el-icon size="60" color="#FFFFFF" class="eicon">
                            <Coin />
                        </el-icon>
                    </div>
                    <div style="padding-left:20px;">
                        <span style="color: #FFFFFF;font-size:large;">当年已支出<br /><br /></span>
                        <span style="color: #FFFFFF;font-size:xx-large;">{{ fund_out_total }}</span>
                    </div>
                </div>
            </el-col>
        </el-row>

        <!--改为筛选统计？-->

        <!-- <el-card>
            <el-row type="flex" justify="end" width="100 %"><el-button @click="selectMonth"
                    type="primary">筛选</el-button></el-row>
            <el-row>
                <div class="block">
                    <el-date-picker v-model="selectMonth" type="monthrange" unlink-panels range-separator="至"
                        start-placeholder="开始月份" end-placeholder="结束月份" :shortcuts="shortcuts" />
                </div>
            </el-row>
        </el-card> -->

        <el-card>
            <el-row type="flex" justify="end">
                <div class="block" style="padding-right: 20px;">
                    <el-date-picker v-model="select_month" type="monthrange" unlink-panels range-separator="至"
                        start-placeholder="开始月份" end-placeholder="结束月份" :shortcuts="shortcuts" />
                </div>
                <el-button @click="selectMonth" type="primary" plain>筛选</el-button>
                <el-button @click="resetMonth" type="primary" plain>重置</el-button>
                <el-button @click="fundFormVisible = true" type="primary">添加记录</el-button>
            </el-row>
            <el-table :data="tableData" style="width: 100%" header-align="center">
                <!--el-table-column type="selection" width="55" align="center"/-->
                <el-table-column prop="fund_out_id" label="支出记录编号" align="center" />
                <el-table-column prop="fund_out_amount" label="支出金额" align="center" />
                <el-table-column prop="fund_out_time" label="支出时间" align="center" />
                <el-table-column prop="fund_out_usage" label="支出用途" align="center" />
                <el-table-column prop="operation" label="操作" align="center">
                    <template v-slot="scope">
                        <!-- <el-button icon="Edit" size="small" @click="modifyFundOut(scope.row)">编辑</el-button> -->
                        <el-button type="danger" icon="DeleteFilled" size="small"
                            @click="deleteFundOut(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!--分页-->
            <el-pagination v-model:currentPage="pagenum" v-model:page-size="pagesize" :page-sizes="[1, 2, 5, 10]"
                :total="total" layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" />
        </el-card>

        <el-dialog v-model="fundFormVisible" title="添加支出记录" align-center width="30%" :before-close="dialogClose">

            <!-- <el-form ref="ruleFormRef" :model="fundOutForm" status-icon :rules="rules"> -->
            <el-form ref="fundOutForm" :model="fundOutForm" status-icon>
                <el-form-item label="支出金额" prop="amount">
                    <!-- <el-form-item label="支出金额"> -->
                    <!-- <el-input-number v-model="fundOutForm.amount" :precision="2" :step="0.1" :min="0" :max="1000000" /> -->
                    <el-input v-model="fundOutForm.amount" type="number" autocomplete="off" />
                </el-form-item>
                <el-form-item label="支出时间" prop="select_date">
                    <!-- <el-form-item label="支出时间"> -->
                    <el-date-picker v-model="select_date" type="datetime" placeholder="选择日期" :size="size" />
                </el-form-item>
                <el-form-item label="支出用途" prop="usage">
                    <!-- <el-form-item label="支出用途"> -->
                    <el-input v-model="fundOutForm.usage" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea"
                        autocomplete="off" clearable maxlength="100" show-word-limit />
                </el-form-item>
            </el-form>

            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogClose">取消</el-button>
                    <el-button type="primary" @click="addFundOut">确认</el-button>
                </span>
            </template>
        </el-dialog>
    </el-main>
</template>
 
<script>
import { reactive, ref } from 'vue'
import api from "/src/api/index"
export default {
    data() {
        return {
            fundFormVisible: false,
            tableData: [],
            pagenum: 1,  //页数
            pagesize: 5, //每页的数量
            total: 100,  //总条目数
            fund_in_total: 3000,
            fund_out_total: 2000,
            select_date: [],
            select_month: [],
            fundOutForm: ref({
                amount: "",
                //time: "",
                usage: "",
            }),
            shortcuts: [
                {
                    text: '当前月份',
                    value: [new Date(), new Date()],
                },
                {
                    text: '当前年份',
                    value: () => {
                        const end = new Date()
                        const start = new Date(new Date().getFullYear(), 0)
                        return [start, end]
                    },
                },
                {
                    text: '过去六个月',
                    value: () => {
                        const end = new Date()
                        const start = new Date()
                        start.setMonth(start.getMonth() - 6)
                        return [start, end]
                    },
                },
            ],
            rules: {
                // amount: [
                //     { required: true, message: "此项不能为空", trigger: "blur" },
                // ],
                // usage: [
                //     { required: true, message: "此项不能为空", trigger: "blur" },
                // ],
                // select_date: [
                //     { required: true, message: "此项不能为空", trigger: "blur" },
                // ],
            },
            ruleFormRef: ref(),
        }
    },
    mounted() {
        this.getAllFundOut();
        this.getFundTotal();
    },
    methods: {
        dialogClose() {
            //console.log("表单", this.fundOutForm);
            this.$refs.fundOutForm.resetFields();
            this.select_date = null;
            this.fundFormVisible = false;
            //console.log("表单", this.fundOutForm);
            //done();
        },
        getAllFundOut() {
            api
                .getFundOutList(this.pagenum, this.pagesize)
                .then((res) => {
                    console.log("获取全部支出请求成功", res);
                    this.tableData = res.data.data.fund_out;
                    this.total = res.data.data.total;
                    //console.log("获取数据", this.volActList);
                })
                .catch((err) => {
                    console.log("获取全部支出请求失败", err);
                });
        },
        getFundTotal() {
            api.getFundTotal()
                .then((res) => {
                    console.log("获取全部支出请求成功", res);
                    this.fund_in_total = res.data.data.fund_in_total;
                    this.fund_out_total = res.data.data.fund_out_total;
                }).catch((err) => {
                    console.log("获取全部支出请求失败", err);
                })
        },
        selectMonth() {
            api.selectFundOut(this.formatMonthValue(this.select_month[0]), this.formatMonthValue(this.select_month[1]), this.pagenum, this.pagesize)
                .then((res) => {
                    console.log("筛选月份请求成功", res);
                    this.tableData = res.data.data.fund_out;
                    this.total = res.data.data.total;
                }).catch((err) => {
                    console.log("筛选月份请求失败", err);
                })
        },
        resetMonth() {
            this.select_month = null;
            this.getAllFundOut();
        },
        addFundOut() {
            this.fundFormVisible = false;
            console.log(typeof this.fundOutForm.amount);
            console.log("日期格式", this.select_date);
            console.log("格式化后的日期", this.formatDateValue(this.select_date));
            api.addFundOut(Number(this.fundOutForm.amount), Number(sessionStorage.getItem("administratorid")), this.fundOutForm.usage, this.formatDateValue(this.select_date))
                .then((res) => {
                    console.log("添加支出请求成功", res);
                    if (res.data.status) {
                        this.$message.success('添加成功！');
                    } else {
                        this.$message.error('添加失败！');
                    }
                }).catch((err) => {
                    console.log("添加记录请求失败", err);
                })
            this.getAllFundOut();
            this.getFundTotal();//添加支出之后，要更新一下总支出
            this.dialogClose();
        },
        async deleteFundOut(fund_out) {
            //console.log(vol_ctivity.VolActId);
            if (confirm("您确定要删除此支出记录吗？")) {
                await api.deleteFundOut(fund_out.fund_out_id)
                    .then(res => {
                        this.$message.success('删除成功！');
                        this.getAllFundOut();
                        this.getFundTotal();
                        //删除支出记录之后也要更新一下总的支出记录
                    }).catch(err => {
                        console.log(err)
                        this.$message.error('删除失败！');
                    })
            }
        },

        handleSizeChange(newSize) {
            //console.log(newSize);
            this.pagesize = newSize;//重新指定每页数据量
            this.getAllFundOut();

        },
        handleCurrentChange(newPage) {
            //console.log(newPage);
            this.pagenum = newPage;//重新指定当前页
            this.getAllFundOut();
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
        //时间处理函数，给后端发送日期格式
        formatMonthValue(month) {
            var year = this.dateZero(month.getFullYear()); //取得4位数的年份
            var month = this.dateZero(month.getMonth() + 1); //取得日期中的月份，其中0表示1月，11表示12月
            return (year + "-" + month);
        },
        // 日期前面加0
        dateZero(time) {
            if (time < 10) {
                time = "" + "0" + time;
            }
            return time;
        },

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

// .el-row {
//     background-color: rgba(255, 255, 255, 1);
//     border-radius: 4px;
//     //height: 80px;
//     align-items: center; //元素上下居中
//     margin-bottom: 20px;
// }

.el-card {
    margin-bottom: 20px; //下边距
}

.card {
    height: 160px;
    margin-bottom: 40px;
    text-align: left;
    display: flex;
    align-items: center;
}

.cicon {
    float: left;
    padding-left: 20px;
}

.eicon {
    font-size: 80px;
}
</style>
 