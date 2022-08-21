import request from '@/utils/request'
// import store from "@/store";
/**
 * 用户登录
 */
export const getSearchSuggestions = (data) => {
  return request({
    method: 'GET',
    url: '/v1_0/suggestion',
    params: {
      q: data
    }
  })
}

export const getSearchResults = (params) => {
  return request({
    method: 'GET',
    url: '/v1_0/search',
    params
  })
}
