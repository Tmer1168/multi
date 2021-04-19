// 在http.js中引入axios
import axios from 'axios';
// 引入qs模块，用来序列化post类型的数据
import Qs from 'qs';

//request
axios.defaults.headers.post ['Access-Control-Allow-Origin'] ='*'; 

// axios.defaults.headers.post['language'] = localStorage.getItem('locale')||'en';
// axios.defaults.headers.get['language'] = localStorage.getItem('locale')||'en';

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
 export function get(url, params){
    return new Promise((resolve, reject) =>{
        axios.get(url, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err =>{
            reject(err.data)
    })
  });
  }
  
  /**
   * post方法，对应post请求
   * @param {String} url [请求的url地址]
   * @param {Object} params [请求时携带的参数]
   */
  export function post(url, params) {
    return new Promise((resolve, reject) => {
         axios.post(url, Qs.stringify(params))
        .then(res => {
            resolve(res.data);
        })
        .catch(err =>{
            reject(err.data)
        })
    });
  }


  /**
   * 原始值
   */
  export function postJson(url, params) {
    return new Promise((resolve, reject) => {
         axios.post(url, params)
        .then(res => {
            resolve(res.data);
        })
        .catch(err =>{
            reject(err.data)
        })
    });
  }