import request from '@/utils/request'

export const getAticle = (params) => {
  return request({
    method: 'GET',
    url: '/V1_0/articles',
    params
  })
}

/**
 * 获取频道的文章列表
 */
export const getArticleById = (articleId) => {
  return request({
    method: 'GET',
    url: '/v1_0/articles/' + articleId
  })
}

/**
 * 添加关注
 */
export const addFollow = (target) => {
  return request({
    method: 'POST',
    url: '/v1_0/user/followings',
    data: {
      target
    }
  })
}

/**
 * 取消关注
 */
export const deleteFollow = (userId) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/followings/${userId}`
  })
}

/**
 * 收藏文章
 */
export const addCollect = (target) => {
  console.log(target)
  return request({
    method: 'POST',
    url: '/v1_0/article/collections',
    data: {
      target
    }
  })
}

/**
 * 取消收藏文章
 */
export const deleteCollect = (target) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/collections/${target}`
  })
}

/**
 * 点赞
 */
export const addLike = (articleId) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/likings',
    data: {
      target: articleId
    }
  })
}

/**
 * 取消点赞
 */
export const deleteLike = (articleId) => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/likings/${articleId}`
  })
}
