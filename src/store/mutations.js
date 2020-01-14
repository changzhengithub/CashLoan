const mutations = {

  doneStateCount(state, num) {
    state.count = state.count + num
  },

  saveToken (state, token) {
    state.token = token
  },
  savePhone (state, phone) {
    state.phone = phone
  },
  saveIdCard (state, idCard) {
    state.idCard = idCard
  },
  saveCustomerId (state, customerId) {
    state.customerId = customerId
  },
  saveTrueName (state, trueName) {
    state.trueName = trueName
  },
  saveUdKey (state, udKey) {
    state.udKey = udKey
  },
  saveUseInfo (state, useInfo) {
    state.useInfo = useInfo
  },
  saveSystemNotification (state, systemNotification) {
    state.systemNotification = systemNotification
  },
  saveBindBankInfo (state, bindBankInfo) {
    state.bindBankInfo = bindBankInfo
  },
  saveIsCreditAll(state, isCreditAll) {
    state.isCreditAll = isCreditAll
  },
  saveBorrowNo(state, borrowNo) {
    state.borrowNo = borrowNo
  },
  saveRecordDetailInfo(state, recordDetailInfo) {
    state.recordDetailInfo = recordDetailInfo
  },
  saveMessageId(state, messageId) {
    state.messageId = messageId
  },
  saveMessageDetail(state, messageDetail) {
    state.messageDetail = messageDetail
  }
}
export default mutations
