<template>
  <!-- s 我要投诉 -->
  <section class="complain">
    <HeaderTitle :headerProps="headerProps"></HeaderTitle>
    <p class="complain-title"><span>*</span>请描述你遇到的问题</p>
    <div class="complain-detail">
      <textarea name="detail" v-model="opinion" maxlength="200" placeholder="描述你的问题"></textarea>
      <div class="detail-num">{{opinion.length}}/200</div>
    </div>
    <div class="complain-upload">
      <p class="upload-suggest"><span>上传凭证</span><span> (建议添加相关问题截图，不超过3张)</span></p>
      <div class="upload-photo">
        <div class="photo-default" v-for="(item, index) in imgArr" :key="index">
          <!-- <img src="../../assets/image/icon/pratriat.png"> -->
          <img :src="item">
          <div class="default-close" @click="deleteCurrentImg(index)">
            <i class="iconfont icon-delete"></i>
          </div>
        </div>
        <van-uploader :after-read="onRead" accept="image/gif, image/jpeg" multiple>
          <div class="photo-add" v-if="imgArr.length != 3">
            <i class="iconfont icon-tianjiatupianjiahao"></i>
          </div>
        </van-uploader>
      </div>
    </div>
    <div class="complain-contact">
      <input type="text" v-model="contactWay" placeholder="手机号/邮箱(选填,方便我们联系您)">
    </div>
    <div class="complain-submit">
      <button class="submit-btn" @click="complainSubmit">立即提交</button>
    </div>
  </section>
  <!-- e 投诉建议 -->
</template>

<script>
import Check from '../../class/Check.class.js'
import Http from '../../class/Http.class.js'
import Encryption from '../../class/Encryption.class.js'
import Storage from '../../class/Storage.class.js'
import HeaderTitle from '../common/header/header.vue'
export default {
  name: 'ComplainComponent',
  data () {
    return {
      headerProps: {
        arrowShow: true,
        title: '投诉建议'
      },
      contactWay: '',
      opinion: '',
      imgArr: []
    }
  },
  components: {
    HeaderTitle
  },
  methods: {
    onRead(file) {
      if (file) this.imgArr.push(file.content)
    },
    deleteCurrentImg (index) {
      this.imgArr.splice(index, 1)
    },
    complainSubmit () {
      if (!this.opinion) {
        this.$toast('请输入内容')
        return
      }
      if (!this.contactWay) {
        this.$toast('请输入手机号或者邮箱')
        return
      } else {
        let reg = new RegExp(/^(?:13|14|15|17|18)[0-9]{9}$/)
        let reg1 = new RegExp(/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/)
        if (!reg.test(this.contactWay) && !reg1.test(this.contactWay)) {
          this.$toast('输入手机号或邮箱格式错误')
          return
        }
      }
      Http.send({
        url: 'Suggestion',
        data: {
          CustomerId: Storage.customerId,
          contact: this.contactWay,
          Content: this.opinion
        }
      }).success(data => {
        console.log(data)
        this.$toast('投诉成功')
      }).fail(data => {
         this.$toast(data)
      })
    }
  }
}
</script>

<style lang="sass" scoped>
@import "./complain.scss";
</style>
