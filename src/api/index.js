import { login, getSmsCode, getUserInfo, getUserChannels } from './user'
import {
  getAticle,
  getArticleById,
  addFollow,
  deleteFollow,
  addCollect,
  deleteCollect,
  addLike,
  deleteLike
} from './article'
import { getChannels, addUserChannel, removeUserChannel } from './channel'
import { getSearchSuggestions, getSearchResults } from './search.js'
import {
  getComments,
  addCommentLike,
  deleteCommentLike,
  addComment
} from './comments.js'

export { getUserProfile, updateUserName,updateUserAvatar } from './user'

export const userLogin = (data) => login(data)
export const getSmsCodeApi = (data) => getSmsCode(data)
export const getUserInfoApi = () => getUserInfo()
export const getUserChannelsApi = () => getUserChannels()
export const getAticleApi = (data) => getAticle(data)
export const getChannelsApi = () => getChannels()
export const addUserChannelApi = (data) => addUserChannel(data)
export const removeUserChannelApi = (data) => removeUserChannel(data)
export const getSearchSuggestionsApi = (data) => getSearchSuggestions(data)
export const getSearchResultsApi = (data) => getSearchResults(data)
export const getArticleByIdApi = (data) => getArticleById(data)
export const addFollowApi = (data) => addFollow(data)
export const deleteFollowApi = (data) => deleteFollow(data)
export const addCollectionApi = (data) => addCollect(data)
export const deleteCollectionApi = (data) => deleteCollect(data)
export const getCommentsApi = (data) => getComments(data)
export const addCommentLikeApi = (data) => addCommentLike(data)
export const deleteCommentLikeApi = (data) => deleteCommentLike(data)
export const addCommentApi = (data) => addComment(data)
export const addLikeApi = (data) => addLike(data)
export const deleteLikeApi = (data) => deleteLike(data)
