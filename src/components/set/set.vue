<template>
  <!-- s 设置 -->
  <section class="set">
    <HeaderTitle :headerProps="headerProps"></HeaderTitle>
    <div class="set-main">
      <ul class="main-list">
        <li class="list-item" v-for="(item, index) in setList" :key="index" @click="setItem()">
          <div class="item-title"><span>{{item.title}}</span></div>
          <div class="item-arrow">
            <img src="../../assets/image/icon/arrow.png">
          </div>
        </li>
      </ul>
    </div>
    <div class="set-submit">
      <button class="submit-btn" @click="safeSignOut">退出</button>
    </div>
  </section>
  <!-- e 设置 -->
</template>

<script>
import Storage from '../../class/Storage.class.js'
import HeaderTitle from '../common/header/header.vue'
export default {
  name: 'BorrowRecordComponent',
  data () {
    return {
      headerProps: {
        arrowShow: true,
        title: '设置'
      },
      setList: [
        {
          title: '账号管理'
        },
        {
          title: '管理收货地址'
        },
        {
          title: '账号与绑定设置'
        },
        {
          title: '帮助中心'
        },
        {
          title: '缓存管理'
        }
      ]
    }
  },
  components: {
    HeaderTitle
  },
  created () {
  },
  methods: {
    setItem () {
      this.$toast('敬请期待')
    },
    safeSignOut () {
      Storage.clear()
      this.$router.push({
        name: 'empower'
      })
    }
  }
}
</script>

<style lang="sass" scoped>
@import "./set.scss";
</style>
