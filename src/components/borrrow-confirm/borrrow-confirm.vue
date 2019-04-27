<template>
  <!-- s 确认借款 -->
  <section class="borrrow-confirm">
    <HeaderTitle :headerProps="headerProps"></HeaderTitle>
    <div class="confirm-number">
      <div class="number-title"><span>借款金额(元)</span></div>
      <div class="number-num"><span>{{applyNum}}</span></div>
      <div class="number-tip"><span>本次最高可借￥<span>{{useInfo.UserInfo.BorrowLimit}}</span>，请珍惜信用，理性消费</span></div>
    </div>
    <div class="confirm-info">
      <div class="info-title"><span>借款信息</span></div>
      <ul class="info-list">
        <li class="list-item" v-for="(item, index) in borrowInfoList" :key="index" @click="selectBankCard(index)">
          <div class="item-title"><span>{{item.title}}</span></div>
          <div class="item-detail">
            <svg class="icon" aria-hidden="true">
              <use :xlink:href="'#' + bankIconJson[refundBankInfo.BankCode]"></use>
            </svg>
            <span v-if="index != 2">{{item.value }}</span>
            <span v-else-if="index == 2">{{bankJson[borrowBankInfo.BankCode] ? bankJson[borrowBankInfo.BankCode] : item.value }}</span>
            <div class="detail-arrow" v-if="index == 2">
              <img src="../../assets/image/icon/arrow.png">
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="confirm-submit">
      <button class="submit-btn" @click="applyBorrow">立即提交</button>
    </div>
    <van-popup v-model="selectBankCardShow" position="bottom" :overlay="true">
      <div class="confirm-modal">
        <div class="modal-title">
          <span>选择到账银行卡</span>
          <div class="title-close" @click="closeSelectBankCard">
            <img src="../../assets/image/icon/close.png">
          </div>
        </div>
        <div class="modal-item" v-for="(item, index) in bindBankList" :key="index" @click="selectBindCard(item)">
          <svg class="icon" aria-hidden="true">
            <use :xlink:href="'#' + bankIconJson[item.BankCode]"></use>
          </svg>
          <p class="item-text"><span>{{bankJson[item.BankCode]}}</span> <span>{{item.CardType ? '储蓄卡' : '信用卡'}}</span><span>（{{item.CardNo.substring(item.CardNo.length-4)}}）</span></p>
        </div>
        <div class="modal-item" @click="gotoPage('add-bank-card')">
          <div class="item-img">
            <img src="../../assets/image/icon/pay-card.png">
          </div>
          <p class="item-text">添加新卡</p>
          <div class="item-arrow">
            <img src="../../assets/image/icon/arrow.png">
          </div>
        </div>
        <div class="modal-tip">
          <p class="tip-text">备注：若在借款期间内未主动发起还款，则默认于还款日当天从绑定银行卡建设银行（4588）自动扣除所借款项，请保证在扣款之前帐户资金充足。</p>
        </div>
      </div>
    </van-popup>
  </section>
  <!-- e 确认借款 -->
</template>

<script>
import BankIcon from '../../class/banIcon.json.js'
import Http from '../../class/Http.class.js'
import Encryption from '../../class/Encryption.class.js'
import Storage from '../../class/Storage.class.js'
import Bank from '../../class/bank.json.js'
import HeaderTitle from '../common/header/header.vue'
export default {
  name: 'BorrowRecordComponent',
  data () {
    return {
      headerProps: {
        arrowShow: true,
        title: '确认借款'
      },
      selectBankCardShow: false,
      borrowInfoList: [
        {
          title: '借款期限',
          value: ''
        },
        {
          title: '到账金额',
          value: ''
        },
        {
          title: '到账银行卡',
          icon: 'icon-zhongguoyinhang',
          value: '添加银行卡'
        },
        {
          title: '还款日期',
          value: ''
        },
        {
          title: '到期应还',
          value: ''
        }
      ],
      applyNum: null,
      useInfo: null,
      bindBankList: [],
      bankJson: null,
      bankIconJson: {},
      borrowBankInfo: {}, // 确认借款银行code
      commodityInfo: []
    }
  },
  components: {
    HeaderTitle
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.useInfo = Storage.useInfo
      this.bankJson = Bank
      this.bankIconJson = BankIcon
      this.applyNum = this.$route.params.applyNum
       // 收集借款信息
      let userBorrowInfo = {}
      userBorrowInfo.access_token = Encryption.access_token(Storage.token),
      userBorrowInfo.Customerid = Storage.customerId
      userBorrowInfo.Period = this.useInfo.UserInfo.Config[0].Period
      userBorrowInfo.Money = this.applyNum
      userBorrowInfo.BorrowReason = ''
      this.getData(userBorrowInfo)
      this.getbindBankData()
      this.getBorrowCommodityData()
    },
    getData (userBorrowInfo) {
      Http.send({
        url: 'Confirm',
        data: userBorrowInfo
      }).success(data => {
        console.log(data)
        this.formatConfirmData(data)
      }).fail(data => {
        console.log(data)
        this.$toast(data.message)
      })
    },
    getbindBankData () {
      Http.send({
        url: 'GetBankCards',
        data: {
          access_token: Encryption.access_token(Storage.token),
          Customerid: Storage.customerId
        }
      }).success(data => {
        this.bindBankList = data
        console.log(data)
      }).fail(data => {
        console.log(data)
        this.$toast(data.message)
      })
    },
    getBorrowCommodityData () {
      Http.send({
        url: 'GetBorrowCommodityList',
        data: {
          access_token: Encryption.access_token(Storage.token),
          lendMoney: this.applyNum,
          period: this.useInfo.UserInfo.Config[0].Period
        }
      }).success(data => {
        this.commodityInfo = data
        console.log(data)
      }).fail(data => {
        console.log(data)
        this.$toast(data.message)
      })
    },
    formatConfirmData (data) {
      this.borrowInfoList[0].value = data.BorrowInfo.Period
      this.borrowInfoList[1].value = data.BorrowInfo.AccountMonney
      this.borrowInfoList[3].value = data.RepayInfo.ExpireDate
      this.borrowInfoList[4].value = data.RepayInfo.RepayAmount
      if (data.BorrowInfo.BankCode) {
        this.borrowBankInfo.BankCode = data.BorrowInfo.BankCode
        this.borrowBankInfo.BankCardId = data.BorrowInfo.BankCardId
        this.borrowBankInfo.BankCardNo = data.BorrowInfo.BankCardNo
      }
    },
    selectBankCard (index) {
      if (index === 2) this.selectBankCardShow = true
    },
    selectBindCard (item) {
      this.borrowBankInfo.BankCode = item.BankCode
      this.borrowBankInfo.BankCardId = item.Id
      this.borrowBankInfo.BankCardNo = item.CardNo
      this.selectBankCardShow = false
    },
    // 确认借款
    applyBorrow () {
      let params = {
        access_token: Encryption.access_token(Storage.token),
        Customerid: Storage.customerId,
        Period: this.borrowInfoList[0].value,
        Money: this.applyNum,
        BankCardId: this.borrowBankInfo.BankCardId,
        CouponId: 0,
        BorrowReason: '申请借款',
        commodityId: this.commodityInfo[0].Id,
        ReceiverAddress: '',
        ReceiverName: '',
        ReceiverPhone: ''
      }
      Http.send({
        url: 'Apply',
        data: params
      }).success(data => {
        console.log(data)
        this.$toast(data)
        this.$router.push({
          name: 'borrow-record'
        })
      }).fail(data => {
        this.$toast(data.message)
      })
    },
    closeSelectBankCard () {
      this.selectBankCardShow = false
    },
    gotoPage (page) {
      this.$router.push({
        name: page
      })
    }
  }
}
</script>

<style lang="sass" scoped>
@import "./borrrow-confirm.scss";
</style>
