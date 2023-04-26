<!-- @author:郭静静-用户后台-修改密码 -->
<template>
    <!-- <el-header>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>修改密码</el-breadcrumb-item>
        </el-breadcrumb>
        </el-header> -->
    <el-main style="background-color: rgba(245, 249, 250, 1)">
    <!-- <el-form v-if="display" class="form"
                    label-position="top"
                    label-width="100px"
                    style="margin-top:63px;"
                            > -->
        <el-form label-position="top" label-width="100px" style="margin-top:63px;" >  

        <!-- <el-form-item label="邮箱&emsp;" :label-width="formLabelWidth">
                        <el-input v-model="findPWD.email" autocomplete="off" />
                                </el-form-item> -->
        <!-- <el-form-item class="input" label="验证码">
                        <el-input
                            v-model="confirmCaptcha"
                            class="input-with-select"
                            @change="isCaptcha"
                        >
                            <template #append>
                                <el-button type="primary" color="#444076" @click="getfindPWDCaptcha">获取验证码</el-button>
                            </template>
                        </el-input>
                                </el-form-item> -->

            <el-form-item label="旧密码" :label-width="formLabelWidth">
                <el-input v-model="password" autocomplete="off" show-password />
            </el-form-item>

            <el-form-item label="新密码" :label-width="formLabelWidth">
                <el-input v-model="newpassword" autocomplete="off" show-password />
            </el-form-item>

            <el-form-item label="确认密码" :label-width="formLabelWidth">
                <el-input v-model="newpassword2" autocomplete="off" show-password />
            </el-form-item>



            <el-form-item>
                <el-button class="btn1" type="primary" color="#444076" @click="tochange">确认</el-button>
                <!-- <el-button  class="btn2" color="#444076" @click="display=false">取消</el-button> -->
            </el-form-item>
        </el-form>
    </el-main>
</template>
    
<script>
import { ref } from "vue";
import api from "/src/api/index";
import { ElMessage } from "element-plus";

export default {
    name: "changePassword",
    data() {
        return {
            userid: sessionStorage.getItem("userid"),
            password: null,
            newpassword: null,
            newpassword2: null,
        }
    },
    methods: {
        tochange() {
            console.log(this.userid);
            console.log(this.password);
            console.log(this.newpassword);
            console.log(this.newpassword2);
            // if(!this.newpassword==this.newpassword2)
            // {
            //     ElMessage({
            //             message: "两次新密码输入不一致",
            //             type: "error",
            //         });
            // return;
            // }
            this.userid=Number(this.userid);

            api
                .changePassword(this.userid, this.password, this.newpassword)
                .then((res) => {
                    console.log("data")
                    console.log(res);
                    ElMessage({
                        message: "密码修改成功",
                        type: "success",
                    });
                });
        }
    }
}
</script>
