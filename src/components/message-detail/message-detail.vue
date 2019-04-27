<template>
  <!-- s 消息详情 -->
  <section class="message-detail">
    <HeaderTitle :headerProps="headerProps"></HeaderTitle>
    <section class="detail-content">
      <ul class="content-list">
        <li class="list-item">
          <div class="item-title">
            <p class="title-text">{{messageDetail.Title}}</p>
            <p class="title-time">{{messageDetail.CreateTime}}</p>
          </div>
          <div class="item-img" v-if="messageDetail.Icon">
            <img :src="messageDetail.Icon" alt="消息">
          </div>
          <div class="item-tip">
            <span>{{messageDetail.Detail}}</span>
          </div>
        </li>
      </ul>
    </section>
  </section>
  <!-- e 消息详情 -->
</template>

<script>
import Storage from '../../class/Storage.class.js'
import Encryption from '../../class/Encryption.class.js'
import Http from '../../class/Http.class.js'
import HeaderTitle from "../common/header/header.vue";
export default {
  name: "MessageDetailComponent",
  data() {
    return {
      headerProps: {
        arrowShow: true,
        title: "消息详情"
      },
      messageDetail: {}
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
      this.messageDetail = Storage.messageDetail
      if (Storage.messageId.includes(this.messageDetail.Id)) return
      this.getData(this.messageDetail)
      let messageIdList = Storage.messageId
      messageIdList.push(this.messageDetail.Id)
      console.log(messageIdList)
      Storage.messageId = messageIdList
    },
    getData (data) {
      Http.send({
        url: 'EditNotificationStatus',
        data: {
          access_token: Encryption.access_token(Storage.token),
          Id: data.Id
        }
      }).success(data => {
        console.log(data)
        this.$toast(data)
      }).fail(data => {
        console.log(data)
        this.$toast(data.message)
      })
    }
  }
}
</script>

<style lang="sass" scoped>
@import "./message-detail.scss";
</style>
