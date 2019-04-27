<template>
  <!-- s  首页-->
  <section class="index">
    <header class="index-header">
      <img src="../../../assets/image/index/index-bg.png" alt="banner">
      <div class="header-service" @click="openService">
        <img src="../../../assets/image/icon/kefu.png">
      </div>
    </header>
    <main class="index-main">
      <div class="main-content">
        <div class="content-slider" v-if="true">
          <div class="slider-show">
            <div class="show-bg">
              <img src="../../../assets/image/index/slider-bg.png">
            </div>
            <div class="show-detail">
              <div class="detail-sign">
                <span>￥</span>
              </div>
              <div class="detail-num">
                <span>{{applyNum}}</span>
              </div>
              <p class="detail-title">请选择额度</p>
            </div>
          </div>
          <div class="slider-bar">
            <div class="bar-container" ref="contanier">
              <div class="bar" ref="bar"></div>
              <div class="bar-btn" ref="slide" @touchstart="handleTouchStart($event)" @touchmove="handleTouchMove($event)" @touchend="handleTouchEnd($event)">
                <img src="../../../assets/image/index/slider.png">
                <span class="btn-tip" v-if="tipNumShow">{{userInfo.BorrowLimit}}</span>
              </div>
            </div>
            <div class="bar-item" ref="navSlide">
              <div class="item" v-for="(item, index) in choiceLimit" :key="index" @click="selectNavSlider(index)">
                <span>{{item}}</span>
              </div>
            </div>
          </div>
          <div class="slider-apply">
            <button class="apply-btn" @click="applyBorrow">立即申请</button>
          </div>
        </div>
        <div class="content-credit" v-if="false">
          <div class="credit-title"><span>众人花</span>-<span>{{creditTipText}}</span></div>
          <div class="credit-step">
            <div class="step-item" v-for="(item, index) in creditList" :key="index">
              <div class="item-img">
                <img v-if="!item.isCredit && waitCredit != index" :src="item.imgCreditUrl">
                <img v-else-if="!item.isCredit && waitCredit == index" :src="item.imgWaitCreditUrl">
                <img v-else-if="item.isCredit" src="../../../assets/image/icon/five.png">
              </div>
              <p class="item-text">{{item.itemTitle}}</p>
            </div>
          </div>
           <div class="credit-apply">
            <button class="apply-btn" @click="gotoPage('credit')">继续申请</button>
          </div>
        </div>
        <div class="content-already" v-if="false">
          <div class="already-title"><span>众人花</span>-<span>{{alreadyTipText}}</span></div>
          <div class="already-container" v-if="userInfo.BorrowLimit && userInfo.LastBorrow">
            <div class="container-tip">
              <span>借款金额(元)</span>
              <span>到期日: {{userInfo.LastBorrow.BorrowTime}}</span>
            </div>
            <div class="container-detail">
              <div class="detail-num"><span>{{userInfo.LastBorrow.BorrowAmount}}</span></div>
              <div class="detail-apply">
                <button class="apply-btn" @click="gotoDetail('record-detail', userInfo.LastBorrow.BorrowNo)">查看详情</button>
              </div>
            </div>
          </div>
          <div class="already-none" v-else-if="!userInfo.BorrowLimit">
            <p class="none-text"><span>今日可申请额度(元)</span><span>0.00</span></p>
          </div>
        </div>
        <div class="content-tips" @click="gotoPage('message')">
          <div class="tips-content">
            <div class="content-item">
              <div class="item-title">
                <div class="title-img">
                  <img src="../../../assets/image/icon/system.png">
                </div>
                <p class="title-text">{{systemNotification.Title}}</p>
              </div>
              <div class="item-time"><span>{{systemNotification.CreateTime}}</span></div>
            </div>
            <div class="content-item">
              <div class="item-title">
                <div class="title-img">
                  <img src="../../../assets/image/icon/personal.png">
                </div>
                <p class="title-text">{{custNotification.Title}}</p>
              </div>
              <div class="item-time"><span>{{custNotification.CreateTime}}</span></div>
            </div>
          </div>
          <div class="tips-arrow">
            <img src="../../../assets/image/icon/arrow.png">
          </div>
        </div>
      </div>
      <div class="main-banner">
        <swiper class="banner-swiper" :options="swiperOption" ref="mySwiper" @someSwiperEvent="swiperCallBack">
          <swiper-slide v-for="(item, index) in bannerList" :key="index">
            <img :src="item.Url">
          </swiper-slide>
          <div class="swiper-pagination"  slot="pagination"></div>
        </swiper>
      </div>
    </main>
    <section class="modal" v-if="serviceShow" @click="closeService">
      <div class="index-modal" v-if="!telToastShow">
        <div class="modal-item" @click.stop="onlineService">
          <div class="item-img">
            <img src="../../../assets/image/icon/service.png">
          </div>
          <div class="item-text">
            <a :href="'mqqwpa://im/chat?chat_type=wpa&uin=' + userInfo.CustomerServiceQQ + '&version=1&src_type=web&web_src=bjhuli.com'">在线客服</a>
          </div>
        </div>
        <div class="modal-item">
          <div class="item-img">
            <img src="../../../assets/image/icon/service.png">
          </div>
          <div class="item-text" @click.stop="telService">
            <span>电话客服</span>
          </div>
        </div>
      </div>
      <div class="modal-teltoast" v-else-if="telToastShow">
        <div class="teltoast-content"><span>呼叫</span></div>
        <div class="teltoast-btn">
          <button class="btn-cancle" @click="cancelTel">取消</button>
          <div class="btn-sure" @click="sureTel">
            <a :href="'tel:' + userInfo.CustomerServiceTel">呼叫</a>
          </div>
        </div>
      </div>
    </section>
  </section>
  <!-- e  首页-->
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import Http from '../../../class/Http.class.js'
import Encryption from '../../../class/Encryption.class.js'
import Record from '../../../class/record.json.js'
import Storage from '../../../class/Storage.class.js'
export default {
  name: 'IndexComponent',
  data () {
    return {
      swiperOption: {
        loop:true,
        autoplayDisableOnInteraction: true,
        observer:true,//修改swiper自己或子元素时，自动初始化swiper
        observeParents:true,//修改swiper的父元素时，自动初始化swiper
        autoplay : {
          delay:3000
        },
        observer:true,
        speed:300,
        pagination: {
          el: '.swiper-pagination',
          bulletClass: 'index-pagination-bullet',
          bulletActiveClass: 'index-pagination-bullet-active'
        }
      },
      tipNumShow: false,
      applyNum: '0',
      navList: ['0', '200', '1000', '2000', '3000'],
      pageX: 0,
      pageY: 0,
      slideLeft: 0,
      slideHeight: 0,
      slideWidth: 0,
      containerWidth: 0,
      beforePageX: 0,
      mixLeft: 0,
      maxLeft: 0,
      onOff: false,
      centerPoint: [],
      itemCenterPoint: [],
      serviceShow: false,
      bannerList: [],
      systemNotification: {},
      custNotification: {},
      userInfo: {},
      choiceLimit: [],
      isCreditList: [],
      isCreditAll: false,
      waitCredit: null,
      creditTipText: '',
      alreadyTipText: '',
      recordJson: {},
      creditIsShow: false,
      sliderIsShow: false,
      alreadyIsShow: false,
      telToastShow: false,
      creditList: [
        {
          itemTitle: '实名认证',
          imgWaitCreditUrl: require('../../../assets/image/icon/one01.png'),
          imgCreditUrl: require('../../../assets/image/icon/one.png'),
          isCredit: null
        },
        {
          itemTitle: '通讯录认证',
          imgWaitCreditUrl: require('../../../assets/image/icon/two01.png'),
          imgCreditUrl: require('../../../assets/image/icon/two.png'),
          isCredit: null
        },
        {
          itemTitle: '芝麻信用',
          imgWaitCreditUrl: require('../../../assets/image/icon/three01.png'),
          imgCreditUrl: require('../../../assets/image/icon/three.png'),
          isCredit: null
        },
        {
          itemTitle: '运营商认证',
          imgWaitCreditUrl: require('../../../assets/image/icon/four01.png'),
          imgCreditUrl: require('../../../assets/image/icon/four.png'),
          isCredit: null
        }
      ],
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  created () {
    this.init()
    this.getData()
  },
  mounted () {
    
  },
  methods: {
    init () {
      this.recordJson = Record
    },
    getData () {
      Http.send({
        access_token: Encryption.access_token(Storage.token),
        url: 'CustomerProfilesV2',
        data: {
          Customerid: Storage.customerId
        }
      }).success(data => {
        Storage.useInfo = data
        this.formatData(data)
        this.formatIsCredit(data)
        this.formatIsShow(data)
        this.formatTipText()
      }).fail(data => {
        this.$toast(data.message)
      })
    },
    formatData (data) {
      this.bannerList = data.BannerList
      this.systemNotification = data.SystemNotification
      this.custNotification = data.CustNotification
      this.userInfo = data.UserInfo
      this.choiceLimit = data.ChoiceLimit
      this.choiceLimit = [...this.choiceLimit]
      this.choiceLimit.unshift(0)
    },
    formatIsShow () {
      if (this.isCreditAll && this.userInfo.BorrowLimit && this.userInfo.LastBorrow.Status === 10 || this.userInfo.LastBorrow.Status === 11) this.sliderIsShow = true
      if (!this.isCreditAll) this.creditIsShow = true
      if (this.isCreditAll) this.alreadyIsShow = true
    },
    formatTipText () {
      if (!this.userInfo.BorrowLimit) {
        this.alreadyTipText = '今日可申请额度已发完'
        return
      }
      if (this.userInfo.LastBorrow.Status) {
        this.alreadyTipText = this.recordJson[this.userInfo.LastBorrow.Status]
      }
    },
    formatIsCredit (data) {
      console.log(data)
      this.isCreditList = [data.UserInfo.IsIdentityVerify, data.UserInfo.IsContactVerify, data.UserInfo.IsZhimaVerify, data.UserInfo.IsMobSupplierVerify]
      // this.isCreditList = [true, true, true, true]
      let creditTipText = ['基本信息待认证', '请上传通讯录信息', '芝麻信用待认证', '运营商信息待认证']
      let noCredit = []
      this.isCreditList.forEach((item, index) => {
        this.creditList[index].isCredit = item
        if (!item) {
          noCredit.push(index)
        }
      })
      this.creditList = [...this.creditList]
      this.waitCredit = noCredit[0]
      this.creditTipText = creditTipText[noCredit[0]]
      if (noCredit.length === 0) {
        this.isCreditAll = true
        Storage.isCreditAll = this.isCreditAll
        this.$nextTick(() => {
          if (!this.$refs.slide) return
          this.getCenterPoint()
          this.$refs.slide.style.left = this.itemCenterPoint[0] + 'px'
          this.$refs.bar.style.width = this.itemCenterPoint[0] + this.slideWidth / 2 + 'px'
          this.beforePageX = this.itemCenterPoint[0]
        })
      }
    },
    swiperCallBack () {
      console.log(111111)
    },
    getCenterPoint () {
      this.slideWidth = this.$refs.slide.offsetWidth
      this.containerWidth = this.$refs.contanier.offsetWidth
      this.mixLeft = this.$refs.contanier.offsetLeft * 2 + this.slideWidth
      this.maxLeft = this.containerWidth + this.slideWidth
      this.slideHeight = this.$refs.slide.offsetHeight
      this.slideLeft = this.$refs.slide.offsetLeft
      let navItem = this.$refs.navSlide.children
      Array.prototype.forEach.call(navItem, (item, index) => {
        if (index === 0) {
          this.itemCenterPoint.push(-navItem[0].offsetWidth / 2)
          this.centerPoint[0] = (navItem[0].offsetLeft + navItem[0].offsetWidth / 2 + navItem[1].offsetLeft + navItem[1].offsetWidth / 2) / 2
        } else {
          this.itemCenterPoint.push(item.offsetLeft + item.offsetWidth / 2 - this.slideWidth / 2)
          this.centerPoint[index] = (navItem[index].offsetLeft + navItem[index].offsetWidth / 2 + navItem[index - 1].offsetLeft + navItem[index - 1].offsetWidth / 2) / 2
        }
      })
      this.itemCenterPoint[this.itemCenterPoint.length - 1] = this.$refs.contanier.offsetWidth - this.slideWidth
    },

    handleTouchStart (event) {
      event.preventDefault()
      this.onOff = false
      this.pageY = event.targetTouches[0].pageY
      this.pageX = event.targetTouches[0].pageX
      this.tipNumShow = true
      this.$toast(`本次最高可借${this.userInfo.BorrowLimit}`)
    },
    handleTouchMove (event) {
      if (Math.abs(event.targetTouches[0].pageY - this.pageY) > this.slideHeight * 2) this.onOff = true
      if (event.targetTouches[0].pageX > this.mixLeft && event.targetTouches[0].pageX < this.maxLeft && !this.onOff) {
        this.$refs.slide.style.left = (event.targetTouches[0].pageX  - this.pageX) + this.beforePageX + 'px'
        this.$refs.bar.style.width = (event.targetTouches[0].pageX  - this.pageX) + this.beforePageX + this.slideWidth / 2 + 'px'
      }
    },
    handleTouchEnd (event) {
      let currentPoint = parseInt(this.$refs.slide.style.left) + this.slideWidth / 2
      let slideIndex = null

      this.centerPoint.forEach((item, index) => {
        if (currentPoint > item) {
          slideIndex = index
        }
      })
      this.choiceLimit.forEach((item, index) => {
        if (this.userInfo.BorrowLimit == item) {
          slideIndex = index
        }
      })
      if (currentPoint < this.centerPoint[0]) slideIndex = 0
      this.$refs.slide.style.left = this.itemCenterPoint[slideIndex] + 'px'
      this.$refs.bar.style.width = this.itemCenterPoint[slideIndex] + this.slideWidth / 2 + 'px'
      this.applyNum = this.choiceLimit[slideIndex]
      this.beforePageX = parseInt(this.$refs.slide.style.left)
      this.tipNumShow = false
    },
    selectNavSlider (index) {
      this.$toast(`本次最高可借${this.userInfo.BorrowLimit}`)
      let slideIndex = null
      let isIndex = index
      this.choiceLimit.forEach((item, index) => {
        if (this.userInfo.BorrowLimit == item) {
          slideIndex = index
        }
      })
      if (slideIndex < isIndex) isIndex = slideIndex
      this.applyNum = this.choiceLimit[isIndex]
      this.$refs.slide.style.left = this.itemCenterPoint[isIndex] + 'px'
      this.$refs.bar.style.width = this.itemCenterPoint[isIndex] + this.slideWidth / 2 + 'px'
    },
     // 立即申请贷款
    applyBorrow () {
      if (this.applyNum == 0) return
      this.$router.push({
        name: 'borrrow-confirm',
        params: {
          applyNum: this.applyNum
        }
      })
    },
    openService () {
      this.serviceShow = true
    },
    closeService () {
      this.serviceShow = false
      this.telToastShow = false
    },
    telService () {
      this.telToastShow = true
    },
    onlineService () {
      this.serviceShow = false
    },
    cancelTel () {
      this.telToastShow = false
      this.serviceShow = false
    },
    sureTel () {
      this.telToastShow = false
      this.serviceShow = false
    },
    gotoPage (page) {
      this.$router.push({
        name: page
      })
    },
    gotoDetail (page, BorrowNo) {
      Storage.borrowNo = BorrowNo
      this.$router.push({
        name: page
      })
    }
  },
  computed: {  
    swiper() {  
      return this.$refs.mySwiper.swiper;  
    }  
  }
}
</script>

<style lang="sass">
@import "./index.scss";
</style>
