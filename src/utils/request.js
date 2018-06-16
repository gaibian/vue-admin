import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken,getAuthKey,removeUserInfo} from '@/utils/auth'
let cancel ,promiseArr = {}
const CancelToken = axios.CancelToken;
// 创建axios实例
const service = axios.create({
  //baseURL: process.env.BASE_API, // api的base_url
  baseURL: `http://js.upingou.com/`,
  timeout: 15000 // 请求超时时间
});

// request拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.authKey) {  //根据判断token  //一刷新token值会为空
      config.headers['X-AuthKey'] = getAuthKey() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
}, error => {
  // Do something with request error
    Promise.reject(error)
});

// respone拦截器
service.interceptors.response.use(
  response => {
  /**
  * code为非200是抛错 可结合自己业务进行修改
  */
    const res = response.data;  //先获取到数据
    if (res.code !== 200) {
      Message({
        message: res.error,
        type: 'error',
        duration: 5 * 1000
      })
      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      // 101:登录已经失效
      if (res.code === 101 || res.code === 50012 || res.code === 50014) {
        MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //删除存在浏览器上的用户信息
          removeUserInfo();
          setTimeout(()=>{
            router.push({path:'/login'})
          });
          // store.dispatch('FedLogOut').then(() => {
          //   location.reload()// 为了重新实例化vue-router对象 避免bug
          // })
        }).catch(()=>{
          console.log('留在当前页面了')
        })
      }
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    // 400
    console.log(error)// for debug
    Message({
      message: '网络请求超时,请检查网络',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default {
  //get 请求
  get (url,param){
    return new Promise((resolve,reject)=>{
      service.get(url,param).then(res =>{
        resolve(res);
      },(response)=>{
        resolve(response);
        // bus.$message({
        //   message: '请求超时，请检查网络',
        //   type: 'warning'
        // })
      })
    })
  },
  //post请求
  post (url,param){
    return new Promise((resolve,reject)=>{
      service({
        method:'post',
        url,
        data:param,
        cancelToken:new CancelToken(c=>{
          cancel = c
        })
      }).then(res=>{
        resolve(res);
      },(response)=>{
        resolve(response);
        // bus.$message({
        //   message: '请求超时，请检查网络',
        //   type: 'warning'
        // })
      })
    })
  },
  delete (url,id){
    return new Promise((resolve,reject) =>{
      service.delete(url + id).then(res=>{
        resolve(res)
      },res=>{
        reject(res);
        _g.closeGlobalLoading()
        // bus.$message({
        //   message: '请求超时，请检查网络',
        //   type: 'warning'
        // })
      })
    })
  },
  put(url,id,data){
    return new Promise((resolve,reject)=>{
      service.put(url + id,data).then(res=>{
        resolve(res)
      },res=>{
        _g.closeGlobalLoading()
        // bus.$message({
        //   message: '请求超时，请检查网络',
        //   type: 'warning'
        // })
        reject(res);
      })
    })
  }
}
