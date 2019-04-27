<template>
  <!-- s 身份认证 -->
  <section class="credit-identity">
    <HeaderTitle :headerProps="headerProps"></HeaderTitle>
    <!-- <div class="identity-title">
      <div class="title-img">
        <img src="../../assets/image/icon/notice_icon.png">
      </div>
      <span>为保障账户安全，请使用本人身份证认证</span>
    </div>
    <div class="identity-main">
      <div class="main-upload">
        <div class="upload-item">
          <div class="item-img">
            <img src="../../assets/image/icon/identify_id_card_front.png">
          </div>
          <p class="item-text">身份证人像面</p>
        </div>
        <div class="upload-item">
          <div class="item-img">
            <img src="../../assets/image/icon/identify_id_card_back.png">
          </div>
          <p class="item-text">身份证国徽面</p>
        </div>
        <div class="upload-item">
          <div class="item-img">
            <img src="../../assets/image/icon/identify_face.png">
          </div>
          <p class="item-text">人脸识别</p>
        </div>
      </div>
      <ul class="main-list">
        <li class="list-item">
          <span>持证人姓名</span>
          <span>阿合力</span>
        </li>
        <li class="list-item">
          <span>身份证号</span>
          <span>340856**********58</span>
        </li>
        <li class="list-item">
          <span>有效期</span>
          <span>214-05-05_2034-05-05</span>
        </li>
      </ul>
    </div>
    <div class="identity-tip"><span>我们承诺严密保障您的个人信息安全，请放心认证</span></div>
    <div class="identity-submit">
      <button class="submit-btn">立即提交</button>
    </div> -->
    <iframe class="identity-iframe" :src="url" @load="loadListener"></iframe>
  </section>
  <!-- e 身份认证 -->
</template>

<script>
import axios from 'axios'
import Storage from '../../class/Storage.class.js'
import Http from '../../class/Http.class.js'
import HeaderTitle from '../common/header/header.vue'
export default {
  name: 'ClassifyComponent',
  data () {
    return {
      url: '',
      index: 0,
      headerProps: {
        arrowShow: true,
        title: '身份认证'
      },
      isCredit: false
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
      axios({
        url: '/api',
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        params: {
          phone: Storage.phone
        }
      }).then(response => {
        console.log(response)
        response = JSON.parse(response.data)
        if (response.RESPONSECODE === '0000') {
          this.url = response.RESPONSEMSG
        }
      }).catch((fail) => {
        console.log(fail)
      })
    },
    loadListener () {
      this.index++
      console.log(this.index)
      if (this.index > 2) {
        setTimeout(() => {
          Http.send({
            url: 'CustomerProfilesV2',
            data: {
              Customerid: Storage.customerId
            }
          }).success(data => {
            if (data.UserInfo.IsIdentityVerify) {
              this.$router.push({
                name: 'credit'
              })
            } else {
              this.$toast('身份认证认证失败')
              this.$router.push({
                name: 'credit'
              })
            }
          }).fail(data => {
            this.$toast(data.message)
          })
        }, 3000)
      }
    }
  }
}
</script>

<style lang="sass" scoped>
@import "./credit-identity.scss";
</style>
