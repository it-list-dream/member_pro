// components/modal/modal.js
var api = require('../../utils/request.js')
Component({
  /**
   * 组件的属性列表
   */
  options: {
    styleIsolation: 'shared'
  },
  properties: {
    //是否显示modal
    show: {
      type: Boolean,
      value: false
    },
    //modal的高度
    height: {
      type: String,
      value: '80%'
    }
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
    clickMask() {
      this.setData({
        show: false
      })
    },
    cancel() {
      this.setData({
        show: false
      })
      wx.navigateBack({
        delta: 1,
      })
      this.triggerEvent('cancel')
    },
    getPhoneNumber(e) {
      this.setData({
        show: false
      })
      if (e.detail.errMsg == 'getPhoneNumber:ok') {
        //登录
        wx.login({
          success: function (res) {
            let code = res.code
            api.request({
              url: "/WxUserLogin",
              data: {
                user_token: wx.getStorageSync('token'),
                code: code
              }
            }).then(res => {
              console.log(res.data.user_token)
              api.request({
                url: "/userPhoneBind",
                data: {
                  user_token: res.data.user_token,
                  encryptedDataStr: e.detail.encryptedData,
                  iv: e.detail.iv,
                }
              }).then(res => {
                console.log(res)
                wx.setStorageSync('token', res.data.user_token);
                wx.setStorageSync('loginStatus', 2)
                // 保存手机号码
                wx.setStorageSync('phone', res.data.phone)
                // 返回上一个页面
                wx.navigateBack({
                  delta: 1,
                })
              })
            })
          }
        })
      } else {
        //返回上一个页面
        wx.navigateBack({
          delta: 1,
        })
      }
      this.triggerEvent('confirm')
    }
  }
})