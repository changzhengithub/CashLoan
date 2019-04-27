export default class Url {
  // empower
  static LoginCustomer = '/Customer/LoginCustomer'
  static RegistCustomer = '/Customer/RegistCustomer'
  static ModifyCustomerPwd = '/Customer/ModifyCustomerPwd'
  static SendSMS = '/Customer/SendSMS'
  static GetBankCards = '/Customer/GetBankCards'
  static ContactsAuth = '/Customer/ContactsAuth'
  static PhoneOperatorAuthUrl = '/Customer/PhoneOperatorAuthUrl'
  static MoXieTbAuthUrl = '/Customer/MoXieTbAuthUrl'
  static Suggestion = '/Customer/Suggestion'


  // 绑定银行卡
  static bindCommit = '/xqfq-web/api/protocol/v2/bindCommit.do'
  // 短信验证码
  static bindMsg = '/xqfq-web/api/protocol/v2/bindMsg.do'

  static LogisticsDetail = '/Order/Trace'

  // 获取商品信息
  static GetBorrowCommodityList = '/home/GetBorrowCommodityList'
  // Borrow
  static CustomerProfilesV2 = '/Borrow/CustomerProfilesV2'
  static NotificationList = '/borrow/NotificationList'
  static EditNotificationStatus = '/borrow/EditNotificationStatus'
  // 确认借款信息
  static Confirm = '/Borrow/Confirm'
  // 用户确认借款
  static Apply = '/Borrow/Apply'
  // 借款记录
  static BorrowList = '/Borrow/BorrowList'
  // 借款详情
  static Detail = '/Borrow/Detail'
  // 用户还款
  static Repay = '/Borrow/Repay'
}