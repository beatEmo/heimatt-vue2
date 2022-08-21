import { getChannelsApi } from '@/api'
export default {
  namespaced: true,
  state() {
    return {
      allarcs: [],
      curarc: ''
    }
  },
  getters: {},
  mutations: {
    setArcs(state, payload) {
      state.allarcs = payload
      state.curarc = payload[0]
    }
  },
  actions: {
    async getChannels({ commit }) {
      let { data } = await getChannelsApi()
      commit('setArcs', data.data.channels)
    }
  }
}
