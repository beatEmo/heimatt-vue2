/**
 * 封装 axios 请求模块
 */
import axios from "axios";
import store from "@/store";

const request = axios.create({
  // baseURL: "http://geek.itheima.net/", // 基础路径
  baseURL: "http://toutiao.itheima.net/",
});

// 请求拦截器
request.interceptors.request.use(
  function (config) {
    // 请求发起时都经过这
    // config ：本次请求的配置对象
    // config 里面有一个属性：headers
    const userToken = store?.state?.user?.token;
    if (userToken) {
      config.headers.Authorization = `Bearer ${userToken}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
// 响应拦截器

export default request;
