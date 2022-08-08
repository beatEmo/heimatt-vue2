import { login, getSmsCode, getUserInfo, getUserChannels } from "./user";

export const userLogin = (data) => login(data);
export const getSmsCodeApi = (data) => getSmsCode(data);
export const getUserInfoApi = () => getUserInfo();
export const getUserChannelsApi = () => getUserChannels();
