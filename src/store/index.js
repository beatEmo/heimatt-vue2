import Vue from "vue";
import Vuex from "vuex";
import { getlocalStorage, setlocalStorage } from "@/utils/storage";

Vue.use(Vuex);

const TOKEN_DATA = "HMTOUTIAO_USER";

export default new Vuex.Store({
  state() {
    return {
      user: getlocalStorage(TOKEN_DATA),
    };
  },
  getters: {},
  mutations: {
    getUser(state, payload) {
      state.user = payload;
      // 本地化
      setlocalStorage(TOKEN_DATA, payload);
    },
  },
  actions: {},
  modules: {},
});
