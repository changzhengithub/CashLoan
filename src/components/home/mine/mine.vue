<template>
  <!-- s 我的 -->
  <section class="mine">
    <header class="mine-header">
      <div class="header-bg">
        <img src="../../../assets/image/icon/mine-bg.png">
      </div>
      <div class="header-content">
        <div class="content-portrait">
          <img src="../../../assets/image/icon/pratriat.png">
        </div>
        <p class="content-name">{{usePhone}}</p>
      </div>
      <div class="content-set" @click="gotoPage('set')">
        <img src="../../../assets/image/icon/set.png">
      </div>
    </header>
    <div class="mine-template">
      <div class="template-item">
        <p class="item-number">{{userInfo.RefundToday}}</p>
        <p class="item-title">今日应还</p>
      </div>
      <div class="template-item">
        <p class="item-number">{{userInfo.BorrowLimit}}</p>
        <p class="item-title">剩余额度</p>
      </div>
    </div>
    <div class="mine-order">
      <ul class="order-list">
        <li class="list-item" v-for="(item, index) in orderList" :key="index" @click="gotoPage(item.pageName, index)">
          <div class="item-icon">
            <img :src="item.iconUrl">
            <p class="item-text">{{item.title}}</p>
          </div>
          <a class="item-tel" v-if="index == 2" :href="'mqqwpa://im/chat?chat_type=wpa&uin=3286421839&version=1&src_type=web&web_src=bjhuli.com'"></a>
          <div class="item-arrow"><img src="../../../assets/image/icon/arrow.png"></div>
        </li>
      </ul>
    </div>
  </section>
  <!-- e 我的 -->
</template>

<script>
import Http from '../../../class/Http.class.js'
import Encryption from '../../../class/Encryption.class.js'
import Storage from '../../../class/Storage.class.js'
export default {
  name: 'MineComponent',
  data () {
    return {
      orderList: [
        // {
        //   iconUrl: require('../../../assets/image/icon/buy.png'),
        //   title: '购买记录',
        //   pageName: 'mine-buy-record'
        // },
        {
          iconUrl: require('../../../assets/image/icon/bank.png'),
          title: '银行卡',
          pageName: 'mine-bank-card'
        },
        {
          iconUrl: require('../../../assets/image/icon/record.png'),
          title: '借款记录',
          pageName: 'borrow-record'
        },
        {
          iconUrl: require('../../../assets/image/icon/service.png'),
          title: '我的客服',
          pageName: 'mine-service'
        },
        {
          iconUrl: require('../../../assets/image/icon/advise.png'),
          title: '投诉建议',
          pageName: 'complain'
        }
      ],
      userInfo: {},
      isCreditAll: null
    }
  },
  components: {
    // TabComponent
    // include components
  },
  created () {
    this.init()
    this.getData()
  },
  methods: {
    init () {
      this.isCreditAll = Storage.isCreditAll
      this.userInfo = Storage.useInfo.UserInfo
      this.usePhone = Storage.phone
      console.log(this.userInfo)
    },
    getData () {

    },
    gotoQQ () {
      console.log(11222)
      window.location.href="mqqwpa://im/chat?chat_type=wpa&uin=1979250385&version=1&src_type=web&web_src=oicqzone.com";
    },
    gotoPage (page, index) {
      if (index === 1 && !this.isCreditAll) {
        this.$router.push({
          name: 'credit'
        })
        return
      }
      if (index === 2)  return
      this.$router.push({
        name: page
      })
    }
  }
}
</script>

<style lang="sass" scoped>
@import "./mine.scss";
</style>
