import request from "@/utils/request";

export const getAticle = (params) => {
  return request({
    method: "GET",
    url: "/V1_0/articles",
    params,
  });
};
