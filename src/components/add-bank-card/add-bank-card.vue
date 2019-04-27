<template>
  <!-- s 新增银行卡 -->
  <section class="add-bank-card">
    <HeaderTitle :headerProps="headerProps"></HeaderTitle>
    <div class="card-title">
      <div class="title-img">
        <img src="../../assets/image/icon/notice_icon.png">
      </div>
      <div class="title-text">
        <p>为保障账户安全，新增银行卡需用本人银行卡预留手机号</p>
      </div>
    </div>
    <section class="card-form">
      <div class="form-item">
        <div class="item-title">持证人</div>
        <div class="item-detail">
          <input class="detail-input" type="text" v-model="cardName" placeholder="请输入姓名">
        </div>
      </div>
      <div class="form-item">
        <div class="item-title">开户银行</div>
        <div class="item-detail" @click="openSelectBank">
          <input class="detail-input" type="text" v-model="bankName" disabled placeholder="请选择银行">
          <i class="iconfont icon-arrow-right"></i>
        </div>
      </div>
      <div class="form-item">
        <div class="item-title">银行卡号</div>
        <div class="item-detail">
          <input class="detail-input" type="text" v-model="cardNo" placeholder="填写本人银行卡号">
        </div>
      </div>
      <div class="form-item">
        <div class="item-title">手机号</div>
        <div class="item-detail">
          <input class="detail-input" type="text" v-model="phone" placeholder="请输入银行预留手机号">
        </div>
      </div>
      <div class="form-item">
        <div class="item-title">验证码</div>
        <div class="item-detail">
          <input class="detail-input" type="number" placeholder="验证码" maxlength="6" v-model="code" @change="checkInput('code')">
          <div class="detail-code">
            <button class="code-btn" :disabled="codeDisabled" :class="{'code-active':codeDisabled}" @click="getCode">{{codeText}}</button>
          </div>
        </div>
      </div>
    </section>
    <div class="card-tip"><span>我们承诺严密保障您的个人信息安全，请放心认证</span></div>
    <div class="card-submit">
      <button class="submit-btn" @click="submit">立即提交</button>
    </div>
    <!-- 银行下拉选项 -->
    <van-actionsheet v-model="bankNameListShow" title="请选择银行">
      <div class="select-tip"><span>请选择您的开户银行</span></div>
      <ul class="card-select">
        <li class="select-item" v-for="(item, index) in bankNameList" :key="index" @click="onSelectBank(item)"><span>{{item}}</span></li>
      </ul>
    </van-actionsheet>
    <!-- <van-actionsheet v-model="bankNameListShow" :actions="bankNameList" @select="onSelectBank" /> -->
  </section>
  <!-- e 新增银行卡 -->
</template>

<script>
import bank from '../../class/bank.json.js'
import Check from '../../class/Check.class.js'
import Http from '../../class/Http.class.js'
import BM from '../../class/BM.class.js'
import HeaderTitle from '../common/header/header.vue'
import Encryption from '../../class/Encryption.class.js'
import Storage from '../../class/Storage.class.js'
export default {
  name: 'MineBankCardComponent',
  data () {
    return {
      headerProps: {
        arrowShow: true,
        title: '新增银行卡'
      },
      codeDisabled: false,
      codeText: '发送验证码',
      code: '',
      cardName: '常振',
      cardNo: '6217001650006530955',
      phone: '17768327110',
      bankName: '',
      bankNameListShow: false,
      mchntssn: '',
      bankNameList: ['中国银行', '中国工商银行', '中国农业银行', '中国银行', '中国建设银行', '交通银行', '中信银行', '中国光大银行', '华夏银行', '中国民生银行', '广东发展银行', '平安银行', '招商银行', '兴业银行', '浦发银行', '中国邮政储蓄银行', '上海银行', '北京银行']
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
      console.log(bank)
    },
    bankCardKeyup () {
      this.cardNo = this.cardNo.replace(/\s/g,'').replace(/[^\d]/g,'').replace(/(\d{4})(?=\d)/g,'$1 ')
    },
    getCode () {
      if (!Check.phone(this.phone)) return
      BM.send({
        url: 'bindMsg',
        data: {
          userPhone: Storage.phone,
          bankPhone: this.phone,
          cardNo: this.cardNo
        }
      }).success((data) => {
        this.$toast(data.RESPONSEMSG)
        this.codeDisabled = true
        this.codeText = '剩余60秒'
        this.waitOneMinute()
        this.mchntssn = data.RETURNDATA
      }).fail(data => {
        this.$toast(data.RESPONSEMSG)
      })
    },
    waitOneMinute () {
      let time = 60
      let animation = setInterval(() => {
        time--
        if (time > 0) {
          this.codeText = `剩余${time}秒`
        } else {
          this.codeText = `获取验证码`
          clearInterval(animation)
          this.codeDisabled = false
        }
      }, 1000)
    },
    openSelectBank () {
      this.bankNameListShow = true
    },
    onSelectBank(item) {
      this.bankNameListShow = false
      this.bankName = item
      console.log(bank[this.bankName])
    },
    submit () {
      if (!Check.name(this.cardName)) return
      if (!this.bankName) {
        this.$toast('请选择所属银行')
        return
      }
      if (!Check.card(this.cardNo)) return
      if (!Check.phone(this.phone)) return
      if (!Check.code(this.code)) return
      BM.send({
        url: 'bindCommit',
        data: {
          userPhone: Storage.phone,
          cardNo: this.cardNo, // 银行卡号
          bankCode: bank[this.bankName], // 银行代码
          bankPhone: this.phone, // 预留手机号
          msgCode: this.code, // 验证码
          mchntssn: this.mchntssn // 短信流水号
        }
      }).success(data => {
        // 保存银行卡绑定信息
        Storage.bindBankInfo = data.RETURNDATA
        this.$toast(data.RESPONSEMSG)
        this.$router.push({
          name: 'mine-bank-card'
        })
        console.log(data)
      }).fail(data => {
        this.$toast(data.RESPONSEMSG)
        console.log(data)
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
  }
}
</script>

<style lang="sass" scoped>
@import "./add-bank-card.scss";
</style>
