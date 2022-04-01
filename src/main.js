/*
 * @Description:
 * @Author:
 * @Date: 2022-03-31 16:38:17
 * @LastEditTime: 2022-04-01 14:47:30
 * @LastEditors: PengHeyan
 * @Usage:
 */
import { createApp } from "vue";
import { createPinia } from "pinia";
import _ from "lodash";
import moment from "moment";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.config.globalProperties._ = _;
app.config.globalProperties.moment = moment;
app.mount("#app");
