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
      let phone = wx.getStorageSync('phone')
      if (!phone && phone == '') {
        wx.login({
          success: function (res) {
            if (res.code) {
              //发起网络请求
              console.log(res.code)
            } else {
              console.log('获取用户登录态失败！' + res.errMsg)
            }
          }
        })
      }

      this.setData({
        share: app.globalData.share
      })

      this.setData({
        navHeight: app.globalData.navHeight,
        navTop: app.globalData.navTop
      })
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
        url: '/pages/tabbar/home/home'
      })
    },
  }
})