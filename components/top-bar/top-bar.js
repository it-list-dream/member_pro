// components/top-bar/top-bar.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  options: {
    /** 启用多slot支持 */
    multipleSlots: true
  },
  properties: {
    bgColor: {
      type: String,
      value: '#ffffff'
    },
  },
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      //console.log('component中的函数执行',app.globalData)
      this.setData({
        navHeight:app.globalData.navHeight,
        navTop:app.globalData.navTop,
        menuRight:app.globalData.menuRight
      })
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})