const getters = {
  /*
   * 在组件中获取的getters是state计算过的数据
   * 可以接受两个参数 第一个是state，第二个是getters
   * 可以让getters返回一个函数进行传参来进行查询
  */ 

  multiplyCount: state => {
    return state.count + 1
  },
  
  doneCount: (state, getters) => {
    return getters.multiplyCount - 1
  },

  transferCount: (state) => (num) => {
    return state.count * num
  }
}
export default getters