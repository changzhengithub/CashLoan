<template>
  <!-- s 我的银行卡 -->
  <section class="mine-bank-card">
    <HeaderTitle :headerProps="headerProps" @HEADER_RIGHT_EVENT="gotoPage('add-bank-card')"></HeaderTitle>
    <div class="card-content" >
      <ul class="content-list" v-if="myBankList.length != 0" v-cloak>
        <li class="list-item" v-for="(item, index) in myBankList" :key="index">
          <div class="item-detail">
            <svg class="icon" aria-hidden="true">
              <use :xlink:href="'#' + bankIconJson[item.BankCode]"></use>
            </svg>
            <div class="detail-name color-black">
              <p class="font-33">{{bankJson[item.BankCode]}}</p>
              <p class="font-27">{{item.CardType == 1 ? '储蓄卡' : '信用卡'}}</p>
            </div>
          </div>
          <p class="item-card">{{item.CardNo}}</p>
        </li>
      </ul>
      <div class="content-without" v-if="myBankList.length == 0" v-cloak>
        <p class="without-text">暂无银行卡</p>
        <div class="without-add">
          <button class="add-btn" @click="gotoPage('add-bank-card')">添加银行卡</button>
        </div>
      </div>
    </div>
  </section>
  <!-- e 我的银行卡 -->
</template>

<script>
import Http from '../../class/Http.class.js'
import Bank from '../../class/bank.json.js'
import BankIcon from '../../class/banIcon.json.js'
import Encryption from '../../class/Encryption.class.js'
import Storage from '../../class/Storage.class.js'
import HeaderTitle from '../common/header/header.vue'
export default {
  name: 'MineBankCardComponent',
  data () {
    return {
      headerProps: {
        arrowShow: true,
        title: '我的银行卡',
        rightText: '新增'
      },
      bankIconJson: {},
      myBankList: []
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
      this.getData()
    },
    getData () {
      Http.send({
        url: 'GetBankCards',
        data: {
          access_token: Encryption.access_token(Storage.token),
          Customerid: Storage.customerId
        }
      }).success(data => {
        this.formatData(data)
        this.myBankList = data
        console.log(data)
      }).fail(data => {
        this.$toast(data.message)
      })
    },
    formatData (data) {
      data.forEach(item => {
        item.CardNo = this.maskCard(item.CardNo, 0, item.CardNo.length - 3, '*')
      })
      this.myBankList = data
    },
    maskCard (str, start, length, mask) {
      let replace = ''
      for (let i = 0; i < length; i++) {
        replace += mask
      }
      let newArr = str.replace(str.substr(start, length), replace).split('')
      for (let i = 0; i < newArr.length; i++) {
        if (i % 5 === 0) {
          newArr.splice(i, 0, ' ')
        }
      }
      return newArr.join('')
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
@import "./mine-bank-card.scss";
</style>
