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
      this.triggerEvent('cancel')
    },
    getPhoneNumber(e) {
      this.setData({
        show: false
      })
      // console.log(" encryptedData:" + e.detail.encryptedData)
      // console.log("iv: " + e.detail.iv)
      // console.log("token",wx.getStorageSync('token'))
      api.request({
        url: "/userPhoneBind",
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          user_token: wx.getStorageSync('token'),
          encryptedDataStr: e.detail.encryptedData,
          iv: e.detail.iv,
        }
      }).then(res => {
        console.log(res)
        wx.setStorageSync('token', res.data.user_token)
      })
      this.triggerEvent('confirm')
    }
  }
})