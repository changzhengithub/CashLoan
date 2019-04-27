<template>
  <!-- s 消息 -->
  <section class="message">
    <HeaderTitle :headerProps="headerProps"></HeaderTitle>
    <section class="message-tab">
      <div class="tab-nav">
        <li class="nav-list" :class="{'active': isIndex == index}" v-for="(item, index) in tabNavList" :key="index" @click="checkTabNav(index)">{{item}}</li>
      </div>
      <div class="tab-content">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <ul class="content-list">
            <li class="list-item" v-for="(item, index) in notification" :key="index" @click="gotoPage('message-detail', item)">
              <div class="item-title">
                <p class="title-text">{{item.Title}}</p>
                <p class="title-time">{{item.CreateTime}}</p>
              </div>
              <div class="item-img"  v-if="item.Icon">
                <img :src="item.Icon" alt="消息">
              </div>
              <div class="item-tip"><span>{{item.Detail}}</span></div>
              <div class="item-arrow">
                <span>查看详情</span>
                <i class="iconfont icon-arrow-right"></i>
              </div>
            </li>
          </ul>
        </van-pull-refresh>
      </div>
    </section>
  </section>
  <!-- e 消息 -->
</template>

<script>
import Storage from '../../class/Storage.class.js'
import Encryption from '../../class/Encryption.class.js'
import Http from '../../class/Http.class.js'
import HeaderTitle from '../common/header/header.vue'
export default {
  name: 'MessageComponent',
  data () {
    return {
      headerProps: {
        arrowShow: true,
        title: '消息'
      },
      isIndex: 0,
      tabNavList: ['活动消息', '个人消息'],
      isLoading: false,
      notification: [],
      page: 1,
      notifyType: 1
    }
  },
  components: {
    HeaderTitle
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      Http.send({
        url: 'NotificationList',
        data: {
          access_token: Encryption.access_token(Storage.token),
          Customerid: Storage.customerId,
          NotifyType: this.notifyType,
          pageCurrent: this.page,
          pageSize: 5
        }
      }).success(data => {
        this.notification = data
      }).fail(data => {
        this.$toast(data.message)
      })
    },
    checkTabNav (index) {
      if (this.isIndex === index) return
      this.page = 1
      this.isIndex = index
      this.notifyType = index + 1
      Http.send({
        url: 'NotificationList',
        data: {
          access_token: Encryption.access_token(Storage.token),
          customerId: Storage.customerId,
          NotifyType: this.notifyType,
          pageCurrent: this.page,
          pageSize: 5
        }
      }).success(data => {
        this.notification = data
      }).fail(data => {
        this.$toast(data.message)
      })
    },
    onRefresh() {
      this.page++
      Http.send({
        url: 'NotificationList',
        data: {
          access_token: Encryption.access_token(Storage.token),
          Customerid: Storage.customerId,
          NotifyType: this.notifyType,
          pageCurrent: this.page,
          pageSize: 5
        }
      }).success(data => {
        setTimeout(() => {
          this.$toast('刷新成功')
          this.isLoading = false
        }, 500)
        if (data.length === 0) return
        this.notification = this.notification.contact(data)
      }).fail(data => {
        this.$toast(data.message)
      })
    },
    gotoPage (page, item) {
      Storage.messageDetail = item
      this.$router.push({
        name: page
      })
    }
  }
}
</script>

<style lang="sass" scoped>
@import "./message.scss";
</style>
