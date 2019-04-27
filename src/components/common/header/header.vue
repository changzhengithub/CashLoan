<template>
  <section class="header">
    <div class="header-content">
      <div class="content-arrow" v-if="headerProps.arrowShow" @click="back">
        <img src="../../../assets/image/icon/title_back.png">
      </div>
      <span>{{headerProps.title}}</span>
      <div class="content-btn" v-if="headerProps.rightText" @click="rightBtn"><span>{{headerProps.rightText}}</span></div>
    </div>
  </section>
</template>

<script>
export default {
  props:['headerProps'],
  data() {
    return{}
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    rightBtn () {
      this.$emit('HEADER_RIGHT_EVENT')
    }
  }
}
</script>
<style scoped lang="scss">
@import './header.scss';
</style>

