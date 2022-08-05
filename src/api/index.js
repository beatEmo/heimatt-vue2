import { login, getSmsCode } from "./user";

export const userLogin = (data) => login(data);
export const getSmsCodeApi = (data) => getSmsCode(data);
