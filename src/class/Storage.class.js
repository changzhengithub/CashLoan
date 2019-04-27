export default class Storage {
  
  static set token (token) {
    this.save('token', token)
  }

  static get token () {
    return this.getOut('token')
  }

  static set phone (phone) {
    this.save('phone', phone)
  }

  static get phone () {
    return this.getOut('phone')
  }

  static set idCard (idCard) {
    this.save('idCard', idCard)
  }

  static get idCard () {
    return this.getOut('idCard')
  }

  static set customerId (customerId) {
    this.save('customerId', customerId)
  }

  static get customerId () {
    return this.getOut('customerId')
  }

  static set trueName (trueName) {
    this.save('trueName', trueName)
  }

  static get trueName () {
    return this.getOut('trueName')
  }
  
  static set udKey (udKey) {
    this.save('udKey', udKey)
  }

  static get udKey () {
    return this.getOut('udKey')
  }

  static set useInfo (useInfo) {
    this.save('useInfo', useInfo)
  }

  static get useInfo () {
    return this.getOut('useInfo')
  }

  // 绑定银行卡信息
  static set bindBankInfo (bindBankInfo) {
    this.save('bindBankInfo', bindBankInfo)
  }

  static get bindBankInfo () {
    return this.getOut('bindBankInfo')
  }

  // 借款记录详情
  static set isCreditAll (isCreditAll) {
    this.save('isCreditAll', isCreditAll)
  }

  static get isCreditAll () {
    return this.getOut('isCreditAll')
  }

  // 借款单号
  static set borrowNo (borrowNo) {
    this.save('borrowNo', borrowNo)
  }

  static get borrowNo () {
    return this.getOut('borrowNo')
  }

  // 记录详情
  static set recordDetailInfo (recordDetailInfo) {
    this.save('recordDetailInfo', recordDetailInfo)
  }

  static get recordDetailInfo () {
    return this.getOut('recordDetailInfo')
  }

  // 消息id
  static set messageId (messageId) {
    this.save('messageId', messageId)
  }

  static get messageId () {
    return this.getOut('messageId')
  }

  // 消息详情
  static set messageDetail (messageDetail) {
    this.save('messageDetail', messageDetail)
  }

  static get messageDetail () {
    return this.getOut('messageDetail')
  }
  
// 清理缓存

  static clear () {
    for (const item in window.app.$store.mutations) window.app.$store.commit(item, null)
    try {
      for (const item in localStorage) localStorage[item] = ''
    } catch (error) {}
  }

  static getsaveInLocalStorage (name) {
    try {
      localStorage.getItem(name)
    } catch (error) {}
  }

  static save (name, content) {
    window.app.$store.commit('save' + name.substring(0, 1).toUpperCase() + name.substring(1), content)
    try {
      let result = content
      if (typeof content === 'object') result = JSON.stringify(content)
      localStorage.setItem(name, result)
    } catch (error) {}
  }

  static getOut (name) {
    let result = null
    try {
      result = localStorage.getItem(name)
      if (typeof JSON.parse(result) === 'object') result = JSON.parse(result)
    } catch (error) {}
    if (window.app.$store.state[name] !== null) {
      result = window.app.$store.state[name]
    } else if (result !== null) {
      this.save(name, result)
    }
    return result
  }
}
