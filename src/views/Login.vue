<script setup name="Login">
import { UserFilled, Lock } from '@element-plus/icons-vue'
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted, getCurrentInstance, reactive } from 'vue';
const router = useRouter();
const state = reactive({
  userName: '',
  passsWord: ''
})
const login = ()=>{
    router.push({
    path: '/home'
  }) 
}
</script>

<template>
  <div class="login-wrap">
    <section class="login-content">
      <div>
        <user-filled class="icon-style" />
        <input type="text"
               v-model="state.userName"
               placeholder="请输入用户名">
      </div>
      <div>
        <lock class="icon-style" />
        <input type="password"
               v-model="state.passsWord"
               placeholder="请输入密码">
      </div>
      <button @click="login">登录</button>
    </section>
  </div>
</template>
<style scoped lang="scss">
.login-wrap {
  width: 100%;
  height: 100%;
  .login-content {
    width: 30vw;
    height: 50vh;
    margin: 20vh auto;
    border: 1px solid rgb(168, 197, 255);
    @include flex-column();
    align-items: center;
    justify-content: center;
    div {
      width: 15vw;
      height: 4vh;
      border: 1px solid rgb(168, 197, 255);
      @include flex-row();
      margin-top: 5vh;
      align-items: center;
      justify-content: center;
      .icon-style {
        width: 2vh;
        height: 2vh;
        margin: 0 0.5vw;
      }
      input {
        width: 100%;
        border: none;
        outline: none;
      }
    }
    button {
      width: 15vw;
      height: 4vh;
      cursor: pointer;
      margin-top: 5vh;
    }
  }
}
</style>
