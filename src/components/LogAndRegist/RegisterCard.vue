<!-- 注册界面卡片 -->
<!-- 可封装在页面主体部分，整体高度占父容器100%，宽度占100% -->
<template>
  <div class="body">
    <el-image class="left-image" :src="require('../../../image/log-in.png')" fit="fill" />
    <div class="message-card">
      <el-image style="height: 15%; width: 100%" :src="require('../../../image/logo.png')" fit="contain" />
      <div class="input">
        <!--           ref="ruleFormRef" -->
        <el-form ref="ruleFormRef" :model="registForm" status-icon :rules="rules">
          <el-form-item prop="userEmail">
            <el-input v-model="registForm.userEmail" type="email" placeholder="邮箱" autocomplete="off" />
          </el-form-item>
          <el-form-item prop="inputChecknum">
            <el-input v-model="inputChecknum" type="text" placeholder="邮箱验证码" autocomplete="off"> <template #append>
                <el-button @click="getChecknum" :disabled="totaltime < 60">{{ content }}</el-button>
              </template></el-input>
          </el-form-item>
          <el-form-item prop="userName">
            <el-input v-model="registForm.userName" type="text" placeholder="用户名" autocomplete="off" />
          </el-form-item>

          <el-form-item prop="phoneNumber">
            <el-input v-model="registForm.phoneNumber" placeholder="手机号" show-word-limit autocomplete="off" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="registForm.password" type="password" placeholder="密码" show-password autocomplete="off" />
          </el-form-item>
          <el-form-item prop="confirmPassword">
            <el-input v-model="registForm.confirmPassword" type="password" placeholder="确认密码" show-password
              autocomplete="off" />
          </el-form-item>

          <div>
            <el-button @click="goRegister" type="primary" style="width:40%">注册</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
 
<script>
// @ is an alias to /src
import { reactive, ref } from "vue";
// import { FormInstance, FormRules } from "element-plus";
import api from "/src/api/index";
import { ElMessage } from "element-plus";
import { escapeRegExp } from "lodash";
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        // console.log("这个值到底存在吗", this.$refs.ruleFormRef.validateField(1234567))
        if (this.registForm.confirmPassword !== "") {
          console.log("这个值到底存在吗", this.$refs.ruleFormRef.validateField(registForm.confirmPassword))
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    }

    return {
      totaltime: 60,
      content: "获取验证码",
      emailcheck: "",
      inputChecknum: "",
      registForm: reactive({
        userName: "",
        userEmail: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
      }),
      userId: 0,
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 4,
            max: 16,
            message: "用户名长度需在4-16个字符之间",
            trigger: "blur",
          },
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
        phoneNumber: [
          {
            required: true,
            message: "请输入手机号",
            trigger: "blur",
          },
          {
            required: true,
            pattern: /^1[3456789]\d{9}$/,
            message: "手机号格式不正确",
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
  // setup() {
  //   const handleTimeChange = () => {
  //     //console.log("显示", isDisposed.value)
  //     if (time.value <= 0) {
  //       isDisposed = false;
  //       time.value = 10;
  //     } else {
  //       setTimeout(() => {
  //         time.value--;
  //         handleTimeChange();
  //       }, 1000);
  //     }
  //   };

  //   const time = ref(10);
  //   const isDisposed = false;
  //   return { time, isDisposed }
  // },
  methods: {
    getChecknum() {
      api.getEmailCheckNum(this.registForm.userEmail).then((res) => {
        console.log("验证码返回", res);
        if (res.status == 200) {
          if (res.data == false) {
            ElMessage({
              message: "当前邮箱已注册",
              type: "error",
            });
          }
          else {
            console.log("获取验证码成功")
            ElMessage({
              message: "验证码已发送",
              type: "success",
            });
            this.emailcheck = res.data;
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
    goRegister() {
      // console.log("emailcheck", this.emailcheck);
      // console.log("inputcheck", this.inputChecknum);
      if (this.emailcheck == this.inputChecknum) {
        api
          .Regist(
            this.registForm.userName,
            Number(this.registForm.phoneNumber),
            this.registForm.userEmail,
            this.registForm.password
          )
          .then((res) => {
            if (res.data.status) {
              console.log('注册成功', res.data)
              ElMessage({
                message: "注册成功!",
                type: "success",
              });
              this.userId = res.data.data.user_id;
              console.log(this.userId);
              window.sessionStorage.setItem(
                "userid",
                JSON.stringify(res.data.data.user_id)
              );
              //路径跳转
              this.$router.push({
                path: "/addInfo",
                query: { user_id: this.userId },
              });
            }
            else {
              console.log("注册失败", res.data)
              ElMessage({
                message: "注册失败!",
                type: "error",
              });
            }

          })
          .catch((err) => {
            console.log("注册失败", err.data);
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
};
const text = ref("");
const input = ref("");
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

.left-image {
  height: 100%;
  width: 50%;
  background-color: #000;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
}

.message-card {
  height: 100%;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 10%;
  padding-bottom: 10%;
  padding-left: 5%;
  padding-right: 5%;
  box-sizing: border-box;
}

.input {
  width: 100%;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.el-link {
  font-size: 10px;
}

.tip {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>