import axios from 'axios'
import Url from './url.class.js'

export default  function Http(params) {
  let headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  params.data = params.data ? params.data : {}
  let baseURL = 'http://192.168.0.103:8088'
  axios({
    url: Url[params.url],
    method: 'post',
    baseURL: baseURL,
    headers: headers, 
    params: params.data
  }).then(response => {
    console.log(response)
  }).catch((err) => {
    console.log(err)
  })
}
