// 获取本地存储数据
export const getlocalStorage = (localStorageName) => {
  const lcoalData = localStorage.getItem(localStorageName);
  try {
    return JSON.parse(lcoalData);
  } catch (e) {
    return lcoalData;
  }
};

// 存储本地数据
export const setlocalStorage = (localStorageName, payload) => {
  if (Object.prototype.toString.call(payload).includes("Null")) {
    alert("不可传入null");
    return;
  }
  if (typeof payload === "object") {
    payload = JSON.stringify(payload);
  }
  localStorage.setItem(localStorageName, payload);
};

/**
 * 1、前端向后台 发送用户名和密码 后台校验成功 向前端返回 token refreshtoken
 * 2、前端 需要将 token refreshtoken 保存到本地
 * 3、token过期后 前端需要将refreshtoken发送往后台 获取新的token值
 * tip：refreshtoken去后台换取token值优点：让前端频繁的更换token提高安全性
 */
