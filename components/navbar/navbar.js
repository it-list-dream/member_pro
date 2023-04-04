// components/navbar/navbar.js
const app = getApp();

Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  externalClasses: ['custom-class'],
  /**
   * 组件的属性列表
   */
  properties: {
    pageName: String,
    showNav: {
      type: Boolean,
      value: true
    },
    bgColor: {
      type: String,
      value: '#fff'
    },
    titleColor: {
      type: String,
      value: "#000000"
    },
    icon: {
      type: Boolean,
      value: false
    },
    icon1: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  lifetimes: {
    attached: function () {
      this.setData({
        share: app.globalData.share,
        navHeight: app.globalData.navHeight,
        navTop: app.globalData.navTop
      })
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //回退
    _navBack: function () {
      wx.navigateBack({
        delta: 1
      })
    },
    //回主页
    _toIndex: function () {
      if(app.globalData.share){
        app.globalData.share = false;
      }
      wx.switchTab({
        url: '/pages/tabbar/home/home'
      })
    },
  }
})