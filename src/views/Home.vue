<!--
 * @Description: 
 * @Author: 
 * @Date: 2022-03-31 14:45:16
 * @LastEditTime: 2022-03-31 17:45:47
 * @LastEditors: PengHeyan
 * @Usage: 
-->
<template>
  <div class="home-wrap">
    <Map></Map>
    <MapController></MapController>
    <NaviBar></NaviBar>
    <RouterView />
    <!-- </ScreenAdapter> -->
  </div>
</template>
<script setup name="Home">
import { RouterLink, RouterView } from "vue-router";
import Map from "@components/map/Map.vue";
import MapController from "@components/map/MapController.vue";
import NaviBar from "@components/navi/NaviBar.vue";
// // import ScreenAdapter from '@components/screenAdapter/ScreenAdapter'
import { requestTest } from "@http/modules/home.js";
import { onMounted, getCurrentInstance, ref, reactive } from "vue";
const title = ref("vue3.x 地图框架");
const state = reactive({
  username: "测试用户名",
  password: "测试密码",
});
//获取当前组件实例
let { proxy } = getCurrentInstance();
onMounted(() => {
  testMethod();
});
const testMethod = async () => {
  let result = await requestTest();
  console.log("1111", result);
};
</script>
<style scoped lang="scss">
.home-wrap {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
