import crypto from 'crypto'
export default class Encryption {
  static access_token (token) {
    let md5key = '1qaz@WSX'
    let ticks = Date.now()
    return {
      c: this.getmd5(ticks + token + md5key),
      t: `/Date(${ticks})/`,
      token: token
    }
  }
  static getmd5 (hexData) {
    let md5 = crypto.createHash('md5')
    md5.update(hexData)
    let hex = md5.digest('hex')
    return hex
  } 
}
