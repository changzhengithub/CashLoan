<template>
  <!-- s 借款记录 -->
  <section class="borrow-record">
    <HeaderTitle :headerProps="headerProps"></HeaderTitle>
    <section class="record-tab">
      <div class="tab-nav">
        <li class="nav-list" :class="{'active': isIndex == -1}" @click="checkTabNav(-1)">全部</li>
        <li class="nav-list" :class="{'active': isIndex == 4}" @click="checkTabNav(4)">待还款</li>
        <li class="nav-list" :class="{'active': isIndex == 10}" @click="checkTabNav(10)">已还款</li>
        <li class="nav-list" :class="{'active': isIndex == 5}" @click="checkTabNav(5)">已逾期</li>
      </div>
      <div class="tab-content">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <div class="content-without" v-if="recordList.length == 0">
            <p class="without-text">暂无数据</p>
          </div>
          <ul class="content-list" v-else-if="recordList.length != 0">
            <li class="list-item list-payment" v-for="(item, index) in recordList" :key="index" @click="gotoPage('record-detail', index)">
              <div class="item-top">
                <div class="top-amount">
                  <img src="../../assets/image/icon/pay_back_wait.png">
                  <span>金额(元)</span>
                </div>
                <div class="top-title">
                  <span>{{recordJson[item.Status]}}</span>
                  <div class="title-icon">
                    <img src="../../assets/image/icon/arrow.png">
                  </div>
                </div>
              </div>
              <div class="item-bottom">
                <span class="bottom-money">借款<span>{{item.BorrowAmount}}</span>元</span>
                <span class="bottom-time">{{item.ExpireTime}}</span>
              </div>
            </li>
            <!-- <li class="list-item list-wait">
              <div class="item-top">
                <div class="top-amount">
                  <img src="../../assets/image/icon/pay_back_wait.png">
                  <span>金额(元)</span>
                </div>
                <div class="top-title">
                  <span>待还款</span>
                  <div class="title-icon">
                    <img src="../../assets/image/icon/arrow.png">
                  </div>
                </div>
              </div>
              <div class="item-bottom">
                <span class="bottom-money">借款1500.00元</span>
                <span class="bottom-time">2018-12-30 14:08</span>
              </div>
            </li>
            <li class="list-item list-overdue">
              <div class="item-top">
                <div class="top-amount">
                  <img src="../../assets/image/icon/pay_back_wait.png">
                  <span>金额(元)</span>
                </div>
                <div class="top-title">
                  <span>已逾期</span>
                  <div class="title-icon">
                    <img src="../../assets/image/icon/arrow.png">
                  </div>
                </div>
              </div>
              <div class="item-bottom">
                <span class="bottom-money">借款1500.00元</span>
                <span class="bottom-time">2018-12-30 14:08</span>
              </div>
            </li> -->
          </ul>
        </van-pull-refresh>
      </div>
    </section>
  </section>
  <!-- e 借款记录 -->
</template>

<script>
import Record from '../../class/record.json.js'
import Check from '../../class/Check.class.js'
import Http from '../../class/Http.class.js'
import HeaderTitle from '../common/header/header.vue'
import Encryption from '../../class/Encryption.class.js'
import Storage from '../../class/Storage.class.js'
export default {
  name: 'BorrowRecordComponent',
  data () {
    return {
      headerProps: {
        arrowShow: true,
        title: '借款记录'
      },
      isIndex: -1,
      tabNavList: ['全部', '待还款', '已还款', '已逾期'],
      isLoading: false,
      page: 1,
      recordJson: {},
      status: -1,
      recordList: []
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
      this.recordJson = Record
      this.getData()
    },
    getData () {
      Http.send({
        url: 'BorrowList',
        data: {
          access_token: Encryption.access_token(Storage.token),
          customerId: Storage.customerId,
          status: this.status,
          pageSize: 5,
          pageIndex: this.page
        }
      }).success(data => {
        console.log(data)
        this.recordList = data
      }).fail(data => {
        this.$toast(data.message)
      })
    },
    checkTabNav (index) {
      if (this.isIndex === index) return
      this.page = 1
      this.isIndex = index
      this.status = index
      this.getData()
    },
    onRefresh() {
      this.page++
      Http.send({
        url: 'BorrowList',
        data: {
          access_token: Encryption.access_token(Storage.token),
          customerId: Storage.customerId,
          status: this.status,
          pageSize: 5,
          pageIndex: this.page
        }
      }).success(data => {
        setTimeout(() => {
          this.isLoading = false
        }, 500)
        if (data.length === 0) return
        this.recordList = this.recordList.contact(data)
      }).fail(data => {
        this.$toast(data.message)
      })
    },
    gotoPage (page, index) {
      Storage.borrowNo = this.recordList[index].BorrowNo
      this.$router.push({
        name: page
      })
    }
  }
}
</script>

<style lang="sass" scoped>
@import "./borrow-record.scss";
</style>
