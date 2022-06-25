<script setup lang="ts">
import { reactive, ref } from "vue";
import { ElMessage, FormInstance } from "element-plus";
import { login, register } from "./laf-api/user";

const formRef = ref<FormInstance>();

const form = reactive({
  username: "",
  password: "",
});

const submitForm = async (type: "register" | "login") => {
  if (type == "register") {
    const res = await register(form.username, form.password);
    if (res.error === "username already existed") {
      ElMessage({ type: "warning", message: "您已注册过该用户" });
    } else if (res.data) {
      ElMessage({ type: "success", message: "注册成功" });
    } else {
      ElMessage({ type: "error", message: "注册失败，请在控制台查看报错信息" });
    }
  } else {
    const res = await login(form.username, form.password);
    if (res.access_token) {
      ElMessage("登录成功");
    } else if (res.error === "invalid username or password") {
      ElMessage({ type: "error", message: "用户名或密码错误，请重新输入" });
    } else {
      ElMessage({ type: "error", message: "登录失败，请在控制台查看报错信息" });
    }
  }
};
</script>

<template>
  <div style="margin: 100px auto; width: 600px">
    <h1>laf登录注册测试案例</h1>
    <el-form ref="formRef" :model="form" status-icon label-width="120px">
      <el-form-item label="用户" prop="username">
        <el-input v-model="form.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('login')">登录</el-button>
        <el-button @click="submitForm('register')">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style></style>
