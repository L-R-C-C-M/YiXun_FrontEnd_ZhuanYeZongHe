<!---登录界面卡片 -->
<!-- 可封装在页面主体部分，整体高度占父容器100%，宽度占100% -->
<template>
  <div class="body">
    <el-image
      style="height: 100%;width: 50%;background-color: #000;border-top-left-radius: 20px;border-bottom-left-radius: 20px;"
      :src="require('../../../image/log-in.png')" fit="fill" />
    <div class="message-card">
      <el-image style="height: 20%; width: 100%" :src="require('../../../image/logo.png')" fit="contain" />
      <el-form ref="checkForm" :model="loginForm" label-width="80px" justify="center" style="max-width: 500px"
        :rules="rules">
        <el-form-item label="手机号" prop="inputPhonenumber">
          <el-input v-model="loginForm.inputPhonenumber" />
        </el-form-item>
        <el-form-item label="密码" prop="inputPassword">
          <el-input v-model="loginForm.inputPassword" type="password" show-password />
        </el-form-item>
      </el-form>
      <div
        style="height: 15%;margin-right: 0%;/*margin: 0% auto;/* width: 50%;display: flex;flex-direction: column;justify-content: space-between; */">
        <el-row type="flex" justify="end">
          <el-button @click="checkUser('checkForm')" type="primary" style="width:40%;">登 录</el-button>
          <el-button @click="goRegister()" type="primary" style="width: 40%;" plain>注 册</el-button>
        </el-row>
      </div>

      <div>
        <!-- <el-link>忘记密码</el-link><el-link>没有账号？立即注册</el-link> -->
        <!-- <el-row type="flex" justify="end"><router-link to="/register" class="registerLink">没有账号？立即注册</router-link></el-row> -->
        <!-- <el-row type="flex" justify="end"><router-link to="/register" class="registerLink">忘记密码</router-link></el-row> -->
        <el-row type="flex" justify="end"><el-button @click="dialogFormVisible = true"
            type="text">忘记密码</el-button></el-row>
      </div>
      <el-dialog v-model="dialogFormVisible" title="找回密码" align-center width="30%">

        <el-form ref="ruleFormRef" :model="findPasswordForm" status-icon :rules="rules">
          <el-form-item prop="userEmail">
            <el-input v-model="findPasswordForm.userEmail" type="email" placeholder="邮箱" autocomplete="off" />
          </el-form-item>
          <el-form-item prop="inputChecknum">
            <el-input v-model="inputChecknum" type="text" placeholder="邮箱验证码" autocomplete="off"> <template #append>
                <el-button @click="getChecknum" :disabled="totaltime < 60">{{ content }}</el-button>
              </template></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="findPasswordForm.password" type="password" placeholder="密码" show-password
              autocomplete="off" />
          </el-form-item>
          <el-form-item prop="confirmPassword">
            <el-input v-model="findPasswordForm.confirmPassword" type="password" placeholder="确认密码" show-password
              autocomplete="off" />
          </el-form-item>
        </el-form>

        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button type="primary" @click="findPassword">
              确认
            </el-button>
          </span>
        </template>
      </el-dialog>

      <!-- <el-dialog v-model="dialogTableVisible" title="Shipping address">
        <el-table :data="gridData">
          <el-table-column property="date" label="Date" width="150" />
          <el-table-column property="name" label="Name" width="200" />
          <el-table-column property="address" label="Address" />
        </el-table>
      </el-dialog> -->

    </div>
  </div>
</template>
 
<script>
// @ is an alias to /src
//import axios from "axios";
import api from "/src/api/index";
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.findPasswordForm.confirmPassword !== "") {
          console.log("这个值到底存在吗", this.$refs.ruleFormRef.validateField(registForm.confirmPassword))
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.findPasswordForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    }
    return {
      dialogFormVisible: false,
      totaltime: 60,
      content: "获取验证码",
      emailcheck: "",
      inputChecknum: "",
      identity: "",
      user_id: "",
      vol_id: "",
      loginForm: reactive({
        inputPassword: "",
        inputPhonenumber: "",
      }),
      findPasswordForm: reactive({
        userEmail: "",
        password: "",
        confirmPassword: "",
      }),
      // phonenumber: "手机号",
      // password: "密码",
      checkForm: ref(),
      rules: {
        inputPhonenumber: [
          { required: true, message: "此项不能为空", trigger: "blur" },
          {
            required: true,
            pattern: /^1[3456789]\d{9}$/,
            message: "手机号格式不正确",
            trigger: "blur",
          },
        ],
        inputPassword: [
          { required: true, message: "此项不能为空", trigger: "blur" },
        ],

        userEmail: [
          {
            required: true,
            message: "请输入邮箱",
            trigger: "blur",
          },
          {
            required: true,
            pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
            message: "邮箱格式不正确",
            trigger: "blur",
          },
        ],
        password: [
          {
            min: 6,
            max: 18,
            message: "密码长度需在6-18个字符之间", trigger: "blur"
          },
          { validator: validatePass, trigger: "blur" }
        ],
        confirmPassword: [
          {
            min: 6,
            max: 18,
            message: "密码长度需在6-18个字符之间", trigger: "blur"
          },
          { validator: validatePass2, trigger: "blur", required: true },],
      },
      ruleFormRef: ref(),
    };
  },
  methods: {
    checkUser(formEl) {
      //console.log(this.loginForm.inputPhonenumber);
      this.$refs[formEl].validate((valid) => {
        if (!valid) {
          //console.log("valid", valid);
          // alert('submit!');
          console.log("error submit!");
          return false;
        } else {
          api
            .login(
              Number(this.loginForm.inputPhonenumber),
              this.loginForm.inputPassword
            )
            .then((res) => {
              console.log("登录请求成功", res.data);
              if (res.data.status) {
                ElMessage({
                  message: "登陆成功!",
                  type: "success",
                });
                //保存登录后的信息在sessionStorage中

                // this.identity = res.data.data.identity;
                // this.user_id = res.data.data.user_id;
                window.sessionStorage.setItem(
                  "useridentity",
                  JSON.stringify(res.data.data.identity)
                ); //保存用户类型

                //保存token
                window.sessionStorage.setItem(
                  "token",
                  JSON.stringify(res.data.data.user_token)
                ); //保存用户id
                if (res.data.data.identity == "user") {
                  window.sessionStorage.setItem(
                    "userid",
                    JSON.stringify(res.data.data.id)
                  ); //保存用户id


                  // this.$router.push({
                  //   //登陆成功跳转到普通用户后台
                  //   path: "/UserBackstage/UserHomePage",
                  // });

                  this.$router.push({
                    //登陆成功跳转到寻人首页
                    path: "/",
                  });
                } else if (res.data.data.identity == "volunteer") {
                  //判定用户是志愿者
                  //this.vol_id = res.data.data.vol_id;
                  window.sessionStorage.setItem(
                    "volid",
                    JSON.stringify(res.data.data.vol_id)
                  ); //保存志愿者id
                  window.sessionStorage.setItem(
                    "userid",
                    JSON.stringify(res.data.data.user_id)
                  ); //保存用户id
                  //保存token
                  window.sessionStorage.setItem(
                    "token",
                    JSON.stringify(res.data.data.user_token)
                  );
                  this.$router.push({
                    //登陆成功跳转到寻人首页
                    path: "/",
                  });

                } else if (res.data.data.identity == "administrator") {
                  window.sessionStorage.setItem(
                    "administratorid",
                    JSON.stringify(res.data.data.id)
                  ); //保存管理员id
                  //保存token
                  window.sessionStorage.setItem(
                    "token",
                    JSON.stringify(res.data.data.user_token)
                  );
                  this.$router.push({
                    //管理员登陆成功跳转到管理员后台
                    path: "/backstage",
                  });
                }
              } else {
                // this.$message({
                //   type: "error",
                //   message: "登录失败",
                // });

                ElMessage({
                  message: "用户不存在或密码错误",
                  type: "error",
                });
              }
            })
            .catch((err) => {
              console.log("登录请求失败", err.data);
            });
        }
      });
    },
    goRegister() {
      this.$router.push({
        path: "/register",
      });
    },
    getChecknum() {
      api.getpwChangeEmailCheckNum(this.findPasswordForm.userEmail).then((res) => {
        console.log("验证码返回", res);
        if (res.data.status) {
          if (res.data.data.isRegisted == "false") {
            ElMessage({
              message: "当前邮箱未注册",
              type: "error",
            });
          }
          else {
            console.log("获取验证码成功")
            ElMessage({
              message: "验证码已发送",
              type: "success",
            });
            this.user_id = res.data.data.user_id;
            this.emailcheck = res.data.data.verification;
            //this.isDisposed = true;
            //this.handleTimeChange;
            const clock = window.setInterval(() => {
              this.content = '已发送(' + this.totaltime + 's)'
              this.totaltime--
              if (this.totaltime < 0) {
                this.totaltime = 60
                this.content = "重新发送验证码"
                //this.emailcheck = ''
                window.clearInterval(clock)
              }
            }, 1000)
          }
        }
        else {
          ElMessage({
            message: "验证码发送失败，请稍后重试",
            type: "error",
          });
          console.log("获取验证码失败")
        }
      })
    },
    findPassword() {
      if (this.emailcheck == this.inputChecknum) {
        api.findPassword(this.user_id, this.findPasswordForm.password).then((res) => {
          console.log("修改密码返回", res);
          if (res.data.status) {
            console.log("修改密码成功")
            this.dialogFormVisible = false;
            ElMessage({
              message: "密码已修改！",
              type: "success",
            });
            this.$router.push({
              path: "/login",
            });
          }
          else {
            ElMessage({
              message: "修改失败，请稍后重试！",
              type: "error",
            });
          }
        })
      }
      else {
        ElMessage({
          message: "验证码错误!",
          type: "error",
        });
      }

    }
  },
  //注释掉的代码是获取数据用的，加载界面的同时会获取数据
  // mounted(){
  //     axios({
  //         method:"get",
  //         url:"http://8.130.101.207:1827/Login/GetHello"
  //     }).then(res=>{
  //         console.log(res.data);
  //     })
  // }
};
</script>

<!-- css -->
<style scoped>
.body {
  height: 100%;
  width: 100%;
  background-color: #fff;
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.message-card {
  height: 100%;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 15%;
  padding-bottom: 15%;
  padding-left: 5%;
  padding-right: 5%;
  box-sizing: border-box;
}

.registerLink {
  font-size: 10px;
}

/* .tip {
  text-align: right;
  padding-right: 0%;
} */
</style>
 
