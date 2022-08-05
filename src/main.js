import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 全局样式
import "@/styles/index.scss";
// 引入vant
import Vant from "vant";
import "vant/lib/index.css";
// import "vant/lib/index.less";
// 动态加载rem基础值
import "amfe-flexible";
import { Object } from "core-js";
// import "postcss-pxtorem";

console.log(Object.prototype.toString.call({}));
Vue.use(Vant);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
