<template>
  <!-- s 联系人认证 -->
  <section class="credit-contact">
    <HeaderTitle :headerProps="headerProps"></HeaderTitle>
    <div class="contact-main">
      <div class="main-title">
        <span>联系人1</span>
      </div>
      <div class="main-list">
        <div class="list-item">
          <span class="item-title">与本人关系</span>
          <div class="item-arrow" @click="openRelationOne">
            <span>{{firstRelation}}</span>
            <div class="arrow-img">
              <img src="../../assets/image/icon/arrow.png">
            </div>
          </div>
        </div>
        <div class="list-item">
          <div class="item-name">姓名</div>
          <div class="item-detail">
            <input type="text" v-model="firstName" placeholder="请输入紧急联系人姓名">
            <div class="detail-icon">
              <img src="../../assets/image/icon/certify_contact_people.png">
            </div>
          </div>
        </div>
        <div class="list-item">
          <div class="item-name">手机号</div>
          <div class="item-detail">
            <input type="number" v-model="firstPhone" placeholder="请输入手机号码">
            <div class="detail-icon">
              <img src="../../assets/image/icon/certify_contact_people.png">
            </div>
          </div>
        </div>
      </div>
      <div class="main-title">
        <span>联系人1</span>
      </div>
      <div class="main-list">
        <div class="list-item">
          <span class="item-title">与本人关系</span>
          <div class="item-arrow" @click="openRelationTwo">
            <span>{{seconRelation}}</span>
            <div class="arrow-img">
              <img src="../../assets/image/icon/arrow.png">
            </div>
          </div>
        </div>
        <div class="list-item">
          <div class="item-name">姓名</div>
          <div class="item-detail">
            <input type="text" v-model="secondName" placeholder="请输入紧急联系人姓名">
            <div class="detail-icon">
              <img src="../../assets/image/icon/certify_contact_people.png">
            </div>
          </div>
        </div>
        <div class="list-item">
          <div class="item-name">手机号</div>
          <div class="item-detail">
            <input type="number" v-model="secondPhone" placeholder="请输入手机号码">
            <div class="detail-icon">
              <img src="../../assets/image/icon/certify_contact_people.png">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="contact-tip"><span>我们承诺严密保障您的个人信息安全，请放心认证</span></div>
    <div class="contact-submit">
      <button class="submit-btn" @click="rightSubmit">立即提交</button>
    </div>
    <van-popup v-model="relationShow" position="bottom" :overlay="true">
      <van-picker show-toolbar :columns="relationList" :item-height="36" defaultIndex="2" :visible-item-count="3" @cancel="cancelRelation" @confirm="relationConfirm" />
    </van-popup>
  </section>
  <!-- e 联系人认证 -->
</template>

<script>
import Check from '../../class/Check.class.js'
import Storage from '../../class/Storage.class.js'
import Encryption from '../../class/Encryption.class.js'
import Http from '../../class/Http.class.js'
import HeaderTitle from '../common/header/header.vue'
export default {
  name: 'CreditContactComponent',
  data () {
    return {
      headerProps: {
        arrowShow: true,
        title: '联系人认证'
      },
      isCredit: false,
      relationShow: false,
      firstRelation: '请选择',
      seconRelation: '请选择',
      relationListOne: ['父亲', '母亲', '配偶'],
      relationListTwo: ['父亲', '母亲', '配偶', '亲戚', '朋友'],
      relationList: [],
      firstName: '常磊',
      firstPhone: '18018321212',
      secondPhone: '17768321235',
      secondName: '周帅',
      isSlect: false
    }
  },
  components: {
    HeaderTitle
  },
  created () {
  },
  methods: {
    openRelationOne () {
      this.relationList = this.relationListOne
      this.isSlect = false
      this.relationShow = true
    },
    openRelationTwo () {
      this.relationList = this.relationListTwo
      this.isSlect = true
      this.relationShow = true
    },
    rightSubmit () {
      if (!Check.name(this.firstName) && !Check.phone(this.firstPhone)) {
        this.$toast('请检查第一个联系人的姓名与电话号码')
        return
      }
      if (!Check.name(this.secondName) && !Check.phone(this.secondPhone)) {
        this.$toast('请检查第二个联系人的姓名与电话号码')
        return
      }
      Http.send({
        url: 'ContactsAuth',
        data: {
          access_token: Encryption.access_token(Storage.token),
          phone: Storage.phone,
          contactList: JSON.stringify([
            {
              ContactPhone: this.firstPhone,
              ContactName: this.firstName,
              Relationship: this.firstRelation
            },
            {
              ContactPhone: this.secondPhone,
              ContactName: this.secondName,
              Relationship: this.seconRelation
            }
          ]),
          telList: '[]'
        }
      }).success(data => {
        console.log(data)
        this.$router.push({
          name: 'credit'
        })
      }).fail(data => {
        console.log(data)
      })
    },
    relationConfirm(value, index) {
      if (!this.isSlect) {
        this.firstRelation = value
      } else {
        this.seconRelation = value
      }
      this.relationShow = false
    },
    cancelRelation() {
      this.relationShow = false
    }
  }
}
</script>

<style lang="sass" scoped>
@import "./credit-contact.scss";
</style>
