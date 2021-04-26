// components/navbar/navbar.js
const app = getApp();

Component({
  options: {
    addGlobalClass: true,
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
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  lifetimes: {
    attached: function () {
      // console.log(App);
      this.setData({
        share: app.globalData.share
      })
     
      this.setData({
        navHeight: app.globalData.navHeight,
        navTop: app.globalData.navTop
      })
      console.log(app)
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //回退
    _navBack: function () {
      // console.log(111)
      wx.navigateBack({
        delta: 1
      })
    },
    //回主页
    _toIndex: function () {
      wx.switchTab({
        url: '/pages/home/home'
      })
    },
  }
})