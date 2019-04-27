<template>
  <!-- s 我要还款 -->
  <section class="refund-step">
    <HeaderTitle :headerProps="headerProps"></HeaderTitle>
    <div class="step-main">
      <div class="main-exhibit">
        <div class="exhibit-tip">
          <div class="tip-img">
            <img src="../../assets/image/icon/pay_back_wait.png">
          </div>
          <p class="tip-text">待还金额(元)</p>
        </div>
        <p class="exhibit-num">{{refundNum}}</p>
      </div>
      <!-- <div class="main-coupon">
        <p class="coupon-title">1000.58</p>
        <div class="coupon-arrow">
          <p class="arrow-text">暂无可用券</p>
          <div class="arrow-icon">
            <img src="../../assets/image/icon/arrow-bold.png">
          </div>
        </div>
      </div> -->
      <div class="main-pay">
        <div class="pay-title">
          <span>支付方式</span>
          <span>在线支付</span>
        </div>
        <ul class="pay-list">
          <!-- <li class="list-item" @click="seclecPayWay(0)">
            <div class="item-detail">
              <div class="detail-img">
                <img src="../../assets/image/icon/pay_back_ali.png">
              </div>
              <div class="detail-text">
                <span>支付宝支付</span>
              </div>
            </div>
            <div class="item-select">
              <img v-if="payIndex == 0" src="../../assets/image/icon/borrow-select.png">
              <img v-if="payIndex != 0" src="../../assets/image/icon/borrow-none.png">
            </div>
          </li>
          <li class="list-item" @click="seclecPayWay(1)">
            <div class="item-detail">
              <div class="detail-img">
                <img src="../../assets/image/icon/pay-wechat.png">
              </div>
              <div class="detail-text">
                <span>微信支付</span>
              </div>
              <div class="detail-recommend">
                <img src="../../assets/image/icon/pay-push.png">
              </div>
            </div>
            <div class="item-select">
              <img v-if="payIndex == 1" src="../../assets/image/icon/borrow-select.png">
              <img v-if="payIndex != 1" src="../../assets/image/icon/borrow-none.png">
            </div>
          </li> -->
          <li class="list-item" @click="seclecPayWay">
            <div class="item-detail">
              <svg class="icon" aria-hidden="true">
                <use :xlink:href="'#' + bankIconJson[refundBankInfo.BankCode]"></use>
              </svg>
              <div class="detail-text">
                <span>{{bankJson[refundBankInfo.BankCode]}}</span>
                <span>{{refundBankInfo.CardType == 1 ? '储蓄卡' : '信用卡'}}</span>
                <span>（{{cardSliceNo}}）</span>
              </div>
            </div>
            <div class="item-select">
              <img src="../../assets/image/icon/borrow-select.png">
            </div>
          </li>
          <li class="list-item" @click="gotoPage('add-bank-card')">
            <div class="item-detail">
              <div class="detail-img">
                <img src="../../assets/image/icon/pay-card.png">
              </div>
              <div class="detail-text">
                <span>添加新卡支付</span>
              </div>
            </div>
            <div class="item-arrow">
              <img src="../../assets/image/icon/arrow-bold.png">
            </div>
          </li>
        </ul>
      </div>
      <div class="main-submit">
        <button class="submit-btn" @click="rightRepay">去支付</button>
      </div>
    </div>
    <van-popup v-model="selectOtherBank" :close-on-click-overlay="false" :overlay="true">
      <div class="step-modal">
        <div class="modal-title">
          <div class="title-text"><span>选择其他银行卡</span></div>
          <div class="title-icon" @click="closeSelectOtherBank">
            <img src="../../assets/image/icon/close.png">
          </div>
        </div>
        <div class="modal-item" v-for="(item, index) in bindBankList" :key="index" @click="selecPayBank(item, index)">
          <svg class="icon" aria-hidden="true">
            <use :xlink:href="'#' + bankIconJson[item.BankCode]"></use>
          </svg>
          <div class="item-text"><span>{{bankJson[item.BankCode]}}</span><span>{{item.CardType == 1 ? '储蓄卡' : '信用卡'}}</span><span>（{{item.CardNo.substring(item.CardNo.length-4)}}）</span></div>
          <div class="item-icon">
            <img v-if="isIndex == index" src="../../assets/image/icon/borrow-select.png">
            <img v-else-if="isIndex != index" src="../../assets/image/icon/borrow-none.png">
          </div>
        </div>
        <div class="modal-item" @click="gotoPage('add-bank-card')">
          <div class="item-img">
            <img src="../../assets/image/icon/add.png">
          </div>
          <div class="item-text"><span>添加银行卡</span></div>
        </div>
      </div>
    </van-popup>
  </section>
  <!-- e 我要还款 -->
</template>

<script>
import Record from '../../class/record.json.js'
import Bank from '../../class/bank.json.js'
import BankIcon from '../../class/banIcon.json.js'
import Check from '../../class/Check.class.js'
import Http from '../../class/Http.class.js'
import Encryption from '../../class/Encryption.class.js'
import Storage from '../../class/Storage.class.js'
import HeaderTitle from '../common/header/header.vue'
export default {
  name: 'RefundStepComponent',
  data () {
    return {
      headerProps: {
        arrowShow: true,
        title: '我要还款'
      },
      selectOtherBank: false,
      payIndex: 0,
      bindBankList: [],
      refundNum: '',
      bankJson: {},
      bankIconJson: {},
      refundBankInfo: {},
      cardSliceNo: '',
      payType: 4,
      isIndex: 0
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
      this.bankJson = Bank
      this.bankIconJson = BankIcon
      this.refundNum = Storage.recordDetailInfo.RepayInfo.RemainAmount
      this.getbindBankData()
    },
    getbindBankData () {
      Http.send({
        url: 'GetBankCards',
        data: {
          access_token: Encryption.access_token(Storage.token),
          Customerid: Storage.customerId
        }
      }).success(data => {
        this.refundBankInfo = data[0]
        this.cardSliceNo = this.refundBankInfo.CardNo.substring(this.refundBankInfo.CardNo.length-4)
        this.bindBankList = data
        console.log(data)
      }).fail(data => {
        console.log(data)
        this.$toast(data.message)
      })
    },
    // 还款
    rightRepay () {
      Http.send({
        url: 'Repay',
        data: {
          access_token: Encryption.access_token(Storage.token),
          Customerid: Storage.customerId,
          borrowNo: Storage.borrowNo,
          payType: this.payType,
          cardNo: this.refundBankInfo.CardNo,
          SmsCode: this.SmsCode
        }
      }).success(data => {
        console.log(data)
      }).fail(data => {
        this.$toast(data.message)
      })
    },
    selecPayBank (item, index) {
      this.isIndex = index
      this.refundBankInfo = item
      this.cardSliceNo = this.refundBankInfo.CardNo.substring(this.refundBankInfo.CardNo.length-4)
      this.selectOtherBank = false
    },
    gotoPage (page) {
      this.$router.push({
        name: page
      })
    },
    closeSelectOtherBank () {
      this.selectOtherBank = false
    },
    seclecPayWay () {
      this.selectOtherBank = true
    }
  }
}
</script>

<style lang="sass" scoped>
@import "./refund-step.scss";
</style>
