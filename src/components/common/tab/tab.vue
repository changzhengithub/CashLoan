<template>
  <section class="tab">
    <!-- s 底部导航 -->
    <nav class="tab">
      <div class="tab-item" @click="gotoPage('index')">
        <img class="item-img" src="../../../assets/image/icon/index.png" v-if="path == '/index' || path == '/'">
        <img class="item-img" src="../../../assets/image/icon/index-back.png" v-if="path !== '/index' && path !== '/'">
        <p class="item-name" :class="{'active' : path == '/index' || path === '/'}">取现</p>
      </div>
      <!-- <div class="tab-item" @click="gotoPage('shop')">
        <img class="item-img" src="../../../assets/image/icon/shop.png" v-if="path == '/shop'">
        <img class="item-img" src="../../../assets/image/icon/shop-back.png" v-if="path != '/shop'">
        <p class="item-name" :class="{'active' : path == '/shop'}">商城</p>
      </div> -->
      <div class="tab-item" @click="gotoPage('credit')">
        <img class="item-img" src="../../../assets/image/icon/classify.png" v-if="path == '/credit'">
        <img class="item-img" src="../../../assets/image/icon/classify-back.png" v-if="path != '/credit'">
        <p class="item-name" :class="{'active' : path == '/credit'}">认证</p>
      </div>
      <div class="tab-item" @click="gotoPage('mine')">
        <img class="item-img" src="../../../assets/image/icon/mine.png" v-if="path == '/mine'">
        <img class="item-img" src="../../../assets/image/icon/mine-back.png" v-if="path != '/mine'">
        <p class="item-name" :class="{'active' : path == '/mine'}">我的</p>
      </div>
    </nav>
    <!-- e 底部导航 -->
  </section>
</template>

<script>
export default {
  name: 'TabComponent',
  props: ['path'],
  data () {
    return {
      // tabPath: '/index'
    }
  },
  methods: {
    gotoPage (page) {
      this.$router.push({
        name: page
      })
    }
  }
}

</script>

<style lang="sass" scoped>
  @import "./tab.scss";

</style>
