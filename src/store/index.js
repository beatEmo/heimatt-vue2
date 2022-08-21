import Vue from 'vue'
import Vuex from 'vuex'
import { getlocalStorage, setlocalStorage } from '@/utils/storage'
import channels from './channels'
import articles from './articles'

Vue.use(Vuex)

const TOKEN_DATA = 'HMTOUTIAO_USER'

export default new Vuex.Store({
  state() {
    return {
      user: getlocalStorage(TOKEN_DATA),
      //
      isReplyBounced: false,
      replyComment: {}
    }
  },
  getters: {},
  mutations: {
    changeReply(state, payload) {
      state.isReplyBounced = payload.flag
      if (payload?.comment) {
        state.replyComment = payload.comment
      }
    },
    getUser(state, payload) {
      state.user = payload
      // 本地化
      setlocalStorage(TOKEN_DATA, payload)
    }
  },
  actions: {},
  modules: {
    channels,
    articles
  }
})
