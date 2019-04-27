<template>
  <!-- s 淘宝认证 -->
  <section class="credit-taobao">
    <!-- <HeaderTitle :headerProps="headerProps"></HeaderTitle> -->
    <iframe ref="iframe" :src="url" @load="listener"></iframe>
  </section>
  <!-- e 淘宝认证 -->
</template>

<script>
import Http from '../../class/Http.class.js'
import Storage from '../../class/Storage.class.js'
import HeaderTitle from '../common/header/header.vue'
import Encryption from '../../class/Encryption.class.js'
export default {
  name: 'CreditTaobaoComponent',
  data () {
    return {
      url: '',
      index: 0,
      headerProps: {
        arrowShow: true,
        title: '淘宝认证'
      }
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
      Http.send({
        url: 'MoXieTbAuthUrl',
        data: {
          access_token: Encryption.access_token(Storage.token),
          phone: Storage.phone
        }
      }).success(data => {
        console.log(data)
        this.url = data
      }).fail(data => {
        console.log(data)
      })
    },
    listener () {
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
            console.log(data.UserInfo.IsZhimaVerify)
            if (data.UserInfo.IsZhimaVerify) {
              this.$router.push({
                name: 'credit'
              })
            } else {
              this.$toast('芝麻分认证失败')
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
@import "./credit-taobao.scss";
</style>
