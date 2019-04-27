<template>
  <!-- s 好友 -->
  <section class="credit">

    <HeaderTitle :headerProps="headerProps"></HeaderTitle>
    <div class="credit-title">
      <span>必填</span>
      <span>请完整填写以下信息</span>
    </div>
    <div class="credit-list">
      <div class="list-item" v-for="(item, index) in creditList" :key="index" @click="gotoPage(item.pageName, index)">
        <div class="item-img">
          <img :src="item.imgUrl">
        </div>
        <div class="item-detail">
          <div class="detail-text">
            <p class="text-title">{{item.itemTitle}}</p>
            <p class="text-tip">{{item.itemText}}</p>
          </div>
          <div class="detail-arrow">
            <p class="arrow-text" :class="{'active': item.isCredit}">{{item.isCredit ? '已认证' : '待认证'}}</p>
            <div class="arrow-img">
              <img src="../../../assets/image/icon/arrow.png">
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="list-item" @click="gotoPage('credit-contact', 1)">
        <div class="item-img">
          <img src="../../../assets/image/icon/certify_address_list.png">
        </div>
        <div class="item-detail">
          <div class="detail-text">
            <p class="text-title">上传通讯录</p>
            <p class="text-tip">个人通信录信息</p>
          </div>
          <div class="detail-arrow">
            <p class="arrow-text">{{userInfo.IsContactVerify ? '已认证' : '待认证'}}</p>
            <div class="arrow-img">
              <img src="../../../assets/image/icon/arrow.png">
            </div>
          </div>
        </div>
      </div>
      <div class="list-item" @click="gotoPage('credit-zhima', 2)">
        <div class="item-img">
          <img src="../../../assets/image/icon/certify_sesame.png">
        </div>
        <div class="item-detail">
          <div class="detail-text">
            <p class="text-title">芝麻信用认证</p>
            <p class="text-tip">芝麻分信息认证</p>
          </div>
          <div class="detail-arrow">
            <p class="arrow-text">{{userInfo.IsZhimaVerify ? '已认证' : '待认证'}}</p>
            <div class="arrow-img">
              <img src="../../../assets/image/icon/arrow.png">
            </div>
          </div>
        </div>
      </div>
      <div class="list-item" @click="gotoPage('credit-operator', 3)">
        <div class="item-img">
          <img src="../../../assets/image/icon/certify_operator.png">
        </div>
        <div class="item-detail">
          <div class="detail-text">
            <p class="text-title">运营商认证</p>
            <p class="text-tip">运营商信息认证</p>
          </div>
          <div class="detail-arrow">
            <p class="arrow-text">{{userInfo.IsMobSupplierVerify ? '已认证' : '待认证'}}</p>
            <div class="arrow-img">
              <img src="../../../assets/image/icon/arrow.png">
            </div>
          </div>
        </div>
      </div> -->
    </div>
  </section>
  <!-- e 好友 -->
</template>

<script>
import Http from '../../../class/Http.class.js'
import Storage from '../../../class/Storage.class.js'
import Encryption from '../../../class/Encryption.class.js'
import HeaderTitle from '../../common/header/header.vue'
export default {
  name: 'ClassifyComponent',
  data () {
    return {
      headerProps: {
        arrowShow: false,
        title: '资质认证'
      },
      creditList: [
        {
          imgUrl: require('../../../assets/image/icon/certify_real_name.png'),
          itemTitle: '实名认证',
          itemText: '身份信息认证',
          pageName: 'credit-identity'
        },
        {
          imgUrl: require('../../../assets/image/icon/certify_address_list.png'),
          itemTitle: '上传通讯录',
          itemText: '个人通信录信息',
          pageName: 'credit-contact'
        },
        {
          imgUrl: require('../../../assets/image/icon/taobao.png'),
          itemTitle: '淘宝认证',
          itemText: '淘宝信息认证',
          pageName: 'credit-zhima'
        },
        {
          imgUrl: require('../../../assets/image/icon/certify_operator.png'),
          itemTitle: '运营商认证',
          itemText: '运营商信息认证',
          pageName: 'credit-operator'
        }
      ],
      userInfo: {},
      isCreditList: []
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
      this.formatData(Storage.useInfo)
    },
    getData () {
      Http.send({
        url: 'CustomerProfilesV2',
        data: {
          access_token: Encryption.access_token(Storage.token),
          Customerid: Storage.customerId
        }
      }).success(data => {
        this.formatData(data)
      }).fail(data => {
        this.$toast(data.message)
      })
    },
    formatData (data) {
      this.userInfo = data.UserInfo
      // this.isCreditList = [data.UserInfo.IsIdentityVerify, data.UserInfo.IsContactVerify, data.UserInfo.IsZhimaVerify, data.UserInfo.IsMobSupplierVerify]
      this.isCreditList = [data.UserInfo.IsIdentityVerify, data.UserInfo.IsContactVerify, data.UserInfo.IsZhimaVerify, data.UserInfo.IsMobSupplierVerify]
      this.creditList.forEach((item, index) => {
        item.isCredit = this.isCreditList[index]
      })
    },
    gotoPage (page, creditIndex) {
      if (this.isCreditList[creditIndex]) return
      let toastList = ['请先进行身份认证', '请先上传通讯录信息', '请先认证淘宝信息', '请先认证运营商信息']
      let noCredit = []
      this.isCreditList.forEach((item, index) => {
        if (!item && creditIndex > index) {
          noCredit.push(index)
        }
      })
      if (noCredit.length !== 0) {
        this.$toast(toastList[noCredit[0]])
        return
      }
      this.$router.push({
        name: page
      })
    }
  }
}
</script>

<style lang="sass" scoped>
@import "./credit.scss";
</style>
