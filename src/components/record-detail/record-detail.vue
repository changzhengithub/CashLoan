<template>
  <!-- s 借款详情 -->
  <section class="record-detail">
    <HeaderTitle :headerProps="headerProps"></HeaderTitle>
    <div class="detail-title">
      <span>借款详情</span>
    </div>
    <div class="detail-step">
      <!-- <div class="step-item ">
        <div class="item-img fail">
          <i class="iconfont icon-delete fail-color"></i>
        </div>
        <div class="item-title">
          <p class="title-name">审核不通过</p>
          <p class="title-text">很遗憾，您的申请未通过审核</p>
        </div>
      </div>
      <div class="step-item ">
        <div class="item-img succus">
          <i class="iconfont icon-danxuankuangyixuanzhong active-color"></i>
        </div>
        <div class="item-title">
          <p class="title-name">待审核</p>
          <p class="title-text">您的申请正在等待审核，请稍后</p>
        </div>
      </div>
      <div class="step-item">
        <div class="item-img">
          <i class="iconfont icon-danxuankuangyixuanzhong succus-color"></i>
        </div>
        <div class="item-title succus-color">
          <p class="title-name">申请提交成功</p>
          <p class="title-text">申请借款1500元，期限10天</p>
        </div>
      </div>
      <div class="step-item">
        <div class="item-img">
          <i class="iconfont icon-danxuankuangyixuanzhong succus-color"></i>
        </div>
        <div class="item-title succus-color">
          <p class="title-name">申请提交成功</p>
          <p class="title-text">申请借款1500元，期限10天</p>
        </div>
      </div> -->
      <div class="step-item" v-for="(item, index) in detailTrace" :key="index">
        <div class="item-img">
          <i class="iconfont icon-danxuankuangyixuanzhong succus-color"></i>
        </div>
        <div class="item-title succus-color">
          <p class="title-name">{{item.Summary}}</p>
          <p class="title-text">{{item.Detail}}</p>
        </div>
      </div>
    </div>
    <ul class="detail-borrow">
      <li class="borrow-item">
        <div class="item-title"><span>借款金额</span></div>
        <div class="item-content">
          <span class="content-info">{{borrowInfoList.BorrowAmount}}元</span>
        </div>
      </li>
      <li class="borrow-item">
        <div class="item-title"><span>实际到账</span></div>
        <div class="item-content">
          <span class="content-info">{{borrowInfoList.IncomeAmount}}元</span>
        </div>
      </li>
      <li class="borrow-item">
        <div class="item-title"><span>服务费用</span></div>
        <div class="item-content">
          <span class="content-info">{{borrowInfoList.ServiceFee}}元</span>
        </div>
      </li>
      <li class="borrow-item">
        <div class="item-title"><span>利息</span></div>
        <div class="item-content">
          <span class="content-info">{{borrowInfoList.RateFee}}元</span>
        </div>
      </li>
      <li class="borrow-item">
        <div class="item-title"><span>优惠券抵扣金额</span></div>
        <div class="item-content">
          <span class="content-info">{{borrowInfoList.CouponFee}}元</span>
        </div>
      </li>
      <li class="borrow-item">
        <div class="item-title"><span>借款期限</span></div>
        <div class="item-content">
          <span class="content-info">{{borrowInfoList.LoanPeriod}}天</span>
        </div>
      </li>
      <li class="borrow-item">
        <div class="item-title"><span>申请日期</span></div>
        <div class="item-content">
          <span class="content-info">{{borrowInfoList.BorrowTime}}</span>
        </div>
      </li>
      <li class="borrow-item">
        <div class="item-title"><span>收款银行</span></div>
        <div class="item-content">
          <span class="content-info">{{bankJson[borrowInfoList.BankCode]}}</span>
          <span class="content-info">({{subBankCardNo}})</span>
        </div>
      </li>
      <li class="borrow-item">
        <div class="item-title"><span>协议说明</span></div>
        <div class="item-content">
          <span>《借款协议》</span>
          <span>《平台服务协议》</span>
        </div>
      </li>
    </ul>
    <ul class="detail-refund">
      <li class="refund-item">
        <div class="item-title"><span>还款总金额</span></div>
        <div class="item-content">
          <span class="content-info">{{refundInfoList.RepayAmount}}元</span>
        </div>
      </li>
      <li class="refund-item">
        <div class="item-title"><span>待还金额</span></div>
        <div class="item-content">
          <span class="content-info">{{refundInfoList.RemainAmount}}元</span>
        </div>
      </li>
      <li class="refund-item">
        <div class="item-title"><span>已还金额</span></div>
        <div class="item-content">
          <span class="content-info">{{refundInfoList.Repayed}}元</span>
        </div>
      </li>
      <li class="refund-item">
        <div class="item-title"><span>最迟还款日期</span></div>
        <div class="item-content">
          <span class="content-info">{{refundInfoList.ExpireTime}}</span>
        </div>
      </li>
      <li class="refund-item">
        <div class="item-title"><span>实际还款日期</span></div>
        <div class="item-content">
          <span class="content-info">{{refundInfoList.LastRepayTime}}</span>
        </div>
      </li>
    </ul>
    <div class="detail-submit" v-if="borrowInfoList.IsShowDelay || borrowInfoList.IsShowRepayment">
      <div class="submit-title">
        <span>待还款</span>
        <span>￥{{refundInfoList.RemainAmount}}</span>
      </div>
      <div class="submit-button" v-if="borrowInfoList.IsShowDelay">
        <button class="button-apply" @click="applyStep('refund-step')">申请续期</button>
      </div>
      <div class="submit-button" v-if="borrowInfoList.IsShowRepayment">
        <button class="button-right" @click="rightRepay('wanna-refund', refundInfoList.RemainAmount)">立刻还款</button>
      </div>
    </div>
  </section>
  <!-- e 借款详情 -->
</template>

<script>
import Record from '../../class/record.json.js'
import Bank from '../../class/bank.json.js'
import Check from '../../class/Check.class.js'
import Http from '../../class/Http.class.js'
import Encryption from '../../class/Encryption.class.js'
import Storage from '../../class/Storage.class.js'
import HeaderTitle from '../common/header/header.vue'
export default {
  name: 'BorrowRecordComponent',
  data () {
    return {
      headerProps: {
        arrowShow: true,
        title: '借款详情'
      },
      borrowInfoList: {},
      refundInfoList: {},
      detailTrace: {},
      bankJson: {},
      subBankCardNo: ''
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
      this.getData()
    },
    getData () {
      Http.send({
        url: 'Detail',
        data: {
          access_token: Encryption.access_token(Storage.token),
          borrowNo: Storage.borrowNo
        }
      }).success(data => {
        console.log(data)
        this.formatData(data)
      }).fail(data => {
        this.$toast(data.message)
      })
    },
    formatData (data) {
      Storage.recordDetailInfo = data
      this.borrowInfoList = data.BorrowInfo
      this.refundInfoList = data.RepayInfo
      this.detailTrace = data.Trace
      this.subBankCardNo = this.borrowInfoList.BankCardNo.substring(this.borrowInfoList.BankCardNo.length - 4)
    },
    // 立刻还款
    rightRepay (page, RemainAmount) {
      console.log(RemainAmount)
      this.$router.push({
        name: page
      })
    },
    // 申请展期
    applyStep (page) {
      this.$router.push({
        name: page
      })
    }
  }
}
</script>

<style lang="sass" scoped>
@import "./record-detail.scss";
</style>
