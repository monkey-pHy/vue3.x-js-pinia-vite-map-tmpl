/*
 * @Description:
 * @Author:
 * @Date: 2022-03-31 16:38:17
 * @LastEditTime: 2022-03-31 17:00:01
 * @LastEditors: PengHeyan
 * @Usage:
 */
import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
