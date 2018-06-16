//对cookie 进行验证
import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getAuthKey(){  //获取sessionId
  return Lockr.get('authKey');
}

export function removeUserInfo(){
  Lockr.rm('menus');
  Lockr.rm('authKey');
  Lockr.rm('rememberKey');
  Lockr.rm('authList');
  Lockr.rm('userInfo');
  Lockr.rm('sessionId');
}
