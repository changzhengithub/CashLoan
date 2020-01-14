<template>
  <!-- s 授权 -->
  <section class="empower">
    <!-- s header -->
    <header class="empower-header">
      <div class="header-left" v-show="state.show.theme" @click="toggleState('login-by-password')">
        <i class="iconfont icon-arrow-left"></i>
      </div>
      <p class="header-item" v-show="!state.show.theme" @click="toggleState(null)">{{state.text.title}}</p>
      <p class="header-title" v-show="state.show.theme">{{state.text.title}}</p>
    </header>
    <!-- s logo -->
    <div class="empower-logo" v-show="state.show.logo">
      <div class="logo">
        <img src="../../assets/image/login/bg.png">
      </div>
      <div class="logo-tip">
        <img src="../../assets/image/login/tip.png">
      </div>
    </div>
    <div class="empower-tip-title" v-show="state.show.forget">
      <div class="title-cover"></div>
      <p>请输入要修改密码的账号</p>
    </div>
    <!-- e logo -->

    <!-- s 登录 -->
    <ul class="empower-input-list" :class="{active: state.show.forget}">
      <li class="list-item">
        <input type="text" placeholder="请输入手机号" maxlength="11" v-model="phone" @change="checkInput('phone')">
      </li>
      <li class="list-item" v-show="state.show.code">
        <input class="item-input" type="number" placeholder="请输入短信验证码" maxlength="6" v-model="code" @change="checkInput('code')">
        <div class="item-code-gain">
          <button class="gain-btn" :disabled="codeDisabled" :class="{'code-active':codeDisabled}" @click="getCode">
            <div>{{state.text.code}}</div>
          </button>
          <!-- <button class="gain-countdown">60秒</button> -->
        </div>
      </li>
      <li class="list-item" v-show="state.show.password">
        <input class="item-input" :type="secrecy ? 'password' : 'text'" :placeholder="state.text.placeholder" maxlength="16" v-model="password" @change="checkInput('password')">
        <div class="item-password-switch" @click="toggleSecrecy">
          <i class="iconfont" :class="{'icon-close-eye': secrecy, 'icon-zhengyan': !secrecy}"></i>
        </div>
      </li>
    </ul>
    <!-- e 登录 -->
    <!-- s 协议 -->
    <div class="empower-protocol" v-show="state.show.register">
      <span>注册即表示您同意</span>
      <span>《众人花注册条款》</span>
    </div>
    <!-- e 协议 -->
    <!-- s 按钮 -->
    <div class="empower-btn" :class="{'far-away': state.class}">
      <button :disabled="submitDisabled" @click="submit">
        <div>{{state.text.btn}}</div>
      </button>
    </div>
    <!-- e 按钮 -->
    <div class="empower-operation" v-show="state.tip.exist">
      <p class="operation-item" v-show="state.tip.login" @click="toggleState('login-by-code')">验证码登录</p>
      <p class="operation-item forget" v-show="state.tip.code" @click="toggleState('login-by-password')">密码登录</p>
      <p class="operation-item" v-show="state.tip.login" @click="toggleState('forget-password')">忘记密码?</p>
    </div>
  </section>
  <!-- e 授权 -->
</template>

<script>
import Storage from '../../class/Storage.class.js'
import Http from '../../class/Http.class.js'
import Check from '../../class/Check.class.js'
import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'Empower',
  data () {
    return {
      phone: '17730127131',
      code: null,
      password: '123456',
      codeDisabled: false,
      submitDisabled: false,
      dialogShow: false,
      type: 'login-by-password',
      SMSType: null,
      previous: null,
      secrecy: true,
      status: new Map([
        ['login-by-password', {
          type: 'login-by-password',
          tip: {
            exist: true,
            login: true
          },
          text: {
            title: '注册',
            placeholder: '请输入密码',
            btn: '登录'
          },
          show: {
            logo: true,
            login: true,
            password: true
          },
          SMSType: null,
          operation: 'loginByPwd'
        }],
        ['login-by-code', {
          type: 'login-by-code',
          tip: {
            exist: true,
            code: true
          },
          text: {
            title: '注册',
            placeholder: '请输入密码',
            btn: '登录',
            code: '获取验证码'
          },
          show: {
            code: true,
            logo: true,
            login: true
          },
          SMSType: 3,
          operation: 'loginByCode'
        }],
        ['register', {
          type: 'register',
          tip: {},
          text: {
            title: '登录',
            placeholder: '请输入密码',
            btn: '注册',
            code: '获取验证码'
          },
          show: {
            code: true,
            logo: true,
            login: true,
            password: true,
            register: true
          },
          class: true,
          SMSType: 1,
          operation: 'register'
        }],
        ['forget-password', {
          type: 'forget-password',
          tip: {},
          text: {
            title: '修改登录密码',
            placeholder: '设置6-18位新密码',
            btn: '重设密码',
            code: '获取验证码'
          },
          show: {
            code: true,
            login: true,
            theme: true,
            forget: true,
            password: true
          },
          SMSType: 2,
          operation: 'forgetPassword'
        }]
      ]),
      state: null,
      passwordType: 'password'
    }
  },
  computed: {
    // 直接获取state数据
    phoneCopy () {
      return this.$store.state.phone
    },
    // 通过mapState获取state数据
    ...mapState(['idCard']),

    // 和获取state数据一样，使用mapGetters
    ...mapGetters(['doneCount', 'multiplyCount', 'transferCount']),
  },
  created () {
    // 使用commit提交mutations
    this.$store.commit('doneStateCount', 3);
    // 通过mapMutations修改state数据
    this.doneStateCount(3)
    
    // 获取state数据
    console.log(this.phoneCopy)
    console.log(this.idCard)
    // 获取getters数据
    console.log(this.$store.getters.multiplyCount)
    console.log(this.$store.getters.doneCount)
    console.log(this.$store.getters.transferCount(20))
    // 通过mapGetters调用getters
    console.log(this.doneCount)
    console.log(this.multiplyCount)
    console.log(this.transferCount(33))
    // console.log(this.$route.query)
    this.state = this.status.get(this.type)
    this.submit = this.loginByPwd
  },
  methods: {
    // 通过mapMutations修改state数据
    ...mapMutations(['doneStateCount']),
    getCode () {
      if (!Check.phone(this.phone)) return
      this.codeDisabled = true
      this.state.text.code = '剩余60秒'
      this.waitOneMinute()
      Http.send({
        url: 'SendSMS',
        data: {
          phone: this.phone,
          type: this.SMSType
        }
      }).fail(data => {
         this.$toast(data)
      })
    },
    waitOneMinute () {
      let time = 60
      let animation = setInterval(() => {
        time--
        if (time > 0) {
          this.state.text.code = `剩余${time}秒`
        } else {
          this.state.text.code = `获取验证码`
          clearInterval(animation)
          this.codeDisabled = false
        }
      }, 1000)
    },
    toggleState (type) {
      if (type) {
        this.type = type
      } else if (this.state.type !== 'register') {
        this.previous = this.type
        this.type = 'register'
      } else {
        this.type = this.previous
      }
      this.state = this.status.get(this.type)
      this.SMSType = this.state.SMSType
      this.submit = this[this.state.operation]
    },
    // 
    submit () {},
    // 登录
    loginByPwd () {
      if (!Check.phone(this.phone) || !Check.password(this.password)) return
      this.submitDisabled = true
      Http.send({
        url: 'LoginCustomer',
        data: {
          phoneNo: this.phone,
          loginPwd: this.password
        }
      }).success(data => {
        console.log(data)
        // 报存登录信息
        Storage.token = data.Access_Token
        Storage.idCard = data.IdCard
        Storage.trueName = data.TrueName
        Storage.customerId = data.customerId
        Storage.phone = this.phone
        if (window.localStorage) {
          localStorage.setItem('token', data.access_token)
          localStorage.setItem('idCard', data.IdCard)
          localStorage.setItem('trueName', data.TrueName)
          localStorage.setItem('customerId', data.customerId)
          localStorage.setItem('phone', this.phone)
        }
        this.$router.push({
          name: 'home'
        })
        this.$toast('登录成功')
      }).fail(data => {
        this.$toast(data.message)
      }).default(() => {
        this.submitDisabled = false
      })
    },
    // 验证码登录
    loginByCode () {
      if (!Check.phone(this.phone) || !Check.code(this.code)) return
      this.submitDisabled = true
      Http.send({
        url: 'LoginCustomer',
        data: {
          phoneNo: this.phone,
          validateCode: this.code
        }
      }).success(data => {
        console.log(data)
        // 报存登录信息
        Storage.token = data.Access_Token
        Storage.idCard = data.IdCard
        Storage.trueName = data.TrueName
        Storage.customerId = data.customerId
        Storage.phone = this.phone
        // UDkey
        Storage.udKey = data.UDkey
        if (window.localStorage) {
          localStorage.setItem('token', data.access_token)
          localStorage.setItem('idCard', data.IdCard)
          localStorage.setItem('trueName', data.TrueName)
          localStorage.setItem('customerId', data.customerId)
          localStorage.setItem('phone', this.phone)
          localStorage.setItem('customerId', data.UDkey)
        }
        this.$toast('登录成功')
        this.$router.push({
          name: 'home'
        })
      }).fail(data => {
        this.$toast(data.message)
      }).default(() => {
        this.submitDisabled = false
      })
    },
    // 注册
    register () {
      if (!Check.phone(this.phone) || !Check.code(this.code) || !Check.password(this.password)) return
      this.submitDisabled = true
      Http.send({
        url: 'RegistCustomer',
        data: {
          PhoneNo: this.phone,
          loginPwd: this.password,
          validateCode: this.code
        }
      }).success(data => {
        // console.log(data)
        this.$toast(data)
        this.toggleState('login-by-password')
      }).fail(data => {
        this.$toast(data.message)
      }).default(() => {
        this.submitDisabled = false
      })
    },
    forgetPassword () {
      if (!Check.phone(this.phone) || !Check.code(this.code) || !Check.password(this.password)) return
      this.submitDisabled = true
      Http.send({
        url: 'ModifyCustomerPwd',
        data: {
          phoneNo: this.phone,
          newPwd: this.password,
          validateCode: this.code
        }
      }).success(data => {
        this.$toast('修改成功')
        this.toggleState('login-by-password')
      }).fail(data => {
        this.$toast(data.message)
      }).default(() => {
        this.submitDisabled = false
      })
    },
    checkInput (type) {
      let numberPat = new RegExp(/^[0-9]$/)
      let passwordPat = new RegExp(/^[a-zA-Z0-9]$/)
      switch (type) {
        case 'phone':
          if (!numberPat.test(this.phone)) {
            this.phone.substr(0, this.phone.length - 1)
          }
          break
        case 'code':
          if (!numberPat.test(this.code)) {
            this.code.substr(0, this.code.length - 1)
          }
          break
        case 'password':
          if (!passwordPat.test(this.password)) {
            this.password.substr(0, this.password.length - 1)
          }
          break
      }
    },
    toggleSecrecy () {
      this.secrecy = !this.secrecy
    },
    closeModal () {
      this.dialogShow = false
    }
  }
}
</script>

<style lang="sass" scoped>
@import "./empower.scss";
</style>
