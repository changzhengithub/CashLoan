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
      baseURL: 'http://hhdsapi.jietiaodashi.com',
      headers: headers,
      params: args.data
    }).then(response => {
      console.log(response)
      instance.dispense(response.data)
      if (instance.defaultCallback) instance.defaultCallback()
    }).catch(() => {
      if (instance.defaultCallback) instance.defaultCallback()
    })
    return instance
  }
  dispense(response) {
    switch (response.code) {
      case 200:
        if (this.successCallback) this.successCallback(response.data)
        break
      case 401:
        console.log(response)
        Toast(response.message)
        break
      default:
        console.log(response)
        Toast(response.message)
      if (this.failCallback) this.failCallback(response)
    }
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