<template>
  <!-- s 运营商认证 -->
  <section class="credit-operator">
    <HeaderTitle :headerProps="headerProps"></HeaderTitle>
    <iframe :src="url" @load="listener"></iframe>
  </section>
  <!-- e 运营商认证 -->
</template>

<script>
import Http from '../../class/Http.class.js'
import Storage from '../../class/Storage.class.js'
import HeaderTitle from '../common/header/header.vue'
import Encryption from '../../class/Encryption.class.js'
export default {
  name: 'CreditOperatorComponent',
  data () {
    return {
      headerProps: {
        arrowShow: true,
        title: '运营商认证'
      },
      index: 0,
      url: ''
    }
  },
  components: {
    HeaderTitle
    // include components
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      Http.send({
        url: 'PhoneOperatorAuthUrl',
        data: {
          access_token: Encryption.access_token(Storage.token),
          phone: Storage.phone
        }
      }).success(data => {
        console.log(data)
        this.url = data
      }).fail(data => {
      })
    },
    listener () {
      this.index++
      console.log(this.index)
      if (this.index > 2) {
        // 获取是否认证 认证完成进行下一项认证
        setTimeout(() => {
          Http.send({
            url: 'CustomerProfilesV2',
            data: {
              Customerid: Storage.customerId
            }
          }).success(data => {
            if (data.UserInfo.IsMobSupplierVerify) {
              this.$router.push({
                name: 'credit'
              })
            } else {
              this.$toast('运营商认证失败')
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
@import "./credit-operator.scss";
</style>
