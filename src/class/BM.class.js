import { Toast } from 'vant'
import axios from 'axios'
import Url from './url.class.js'
export default class Http {
  successCallback = null
  failCallback = null
  defaultCallback = null
  static send(args) {
    let instance = new Http()
    let headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    // let headers = {
    //   'Access-Control-Allow-Origin': '*'
    // }
    args.data = args.data ? args.data : {}
    axios({
      url: Url[args.url],
      method: 'post',
      baseURL: 'http://pay.ahoushun.com:8099',
      // baseURL: 'http://hhdsapi.jietiaodashi.com',
      headers: headers,
      params: args.data
    }).then(response => {
      console.log(response)
      let data = JSON.parse(response.data)
      switch (data.RESPONSECODE) {
        case '0000':
          if (instance.successCallback) instance.successCallback(data)
          break
        default:
          // Toast(data.RESPONSEMSG)
          if (instance.failCallback) instance.failCallback(data)
      }
    }).catch((response) => {
      if (instance.failCallback) instance.failCallback(response)
    })
    return instance
  }
  success(callback) {
    this.successCallback = callback
    return this
  }
  fail(callback) {
    this.failCallback = callback
    return this
  }
  default (callback) {
    this.defaultCallback = callback
    return this
  }
}
