// components/my-capsule/my-capsule.js
import {
  checkLogin
} from '../../utils/authorities.js'
import {
  request
} from '../../utils/request'
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  externalClasses: ['my-class'],
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    isShowModel: false,
    chooseCard: null,
    num: 0,
    allCradList: []
  },

  /**
   * 组件的方法列表
   */
  attached: function () {
    // 在组件实例进入页面节点树时执行
    this.setData({
      navHeight: app.globalData.navHeight,
      windowHeight: app.globalData.windowHeight
    })
  },
  methods: {
    qrCode() {
      checkLogin('/page2/memberCode/memberCode')
    },
    handleScan() {
      var that = this;
      let isLogin = wx.getStorageSync('phone')
      if (isLogin) {
        // 只允许从相机扫码
        request({
          url: "/MyAllVIPCard",
          data: {
            user_token: wx.getStorageSync('token'),
          }
        }).then(res => {
          this.setData({
            allCradList: res.data.data
          })
          wx.scanCode({
            onlyFromCamera: true,
            success(res) {
              let queryParams = JSON.parse(res.result);
              let jsonStr = '';
              that.queryParams = queryParams;
              that.setData({
                allCradList: that.data.allCradList.filter(item => item.FK_GB_ID == queryParams.gymid)
              })
              console.log('that.data.allCradList', that.data.allCradList)
              request({
                url: "/ScanResult",
                data: {
                  user_token: wx.getStorageSync('token'),
                  json: JSON.stringify(queryParams)
                }
              }).then(res => {
                if (res.data.code !== 1) {
                  wx.showToast({
                    icon: "none",
                    title: res.data.msg || res.data.errmsg,
                  })
                  return;
                }
                if (that.data.allCradList.length > 1) {
                  that.setData({
                    isShowModel: true,
                    chooseCard: that.data.allCradList[0]
                  })
                } else {
                  if (that.data.allCradList.length == 0) {
                    wx.showToast({
                      icon: "none",
                      title: '你还未办理会员卡',
                    })
                    return;
                  }
                  jsonStr = {
                    ...that.queryParams,
                    UI_ID: that.data.allCradList[0].UI_ID,
                    UI_No: that.data.allCradList[0].UI_No,
                  }
                  that.scanQR(jsonStr)
                }
              })
            }
          })
        })
      } else {
        wx.showToast({
          icon: "none",
          title: '请先登录！',
        })
      }
    },
    //选卡
    onConfrim() {
      var that = this
      var jsonStr = {
        ...this.queryParams,
        UI_ID: this.data.chooseCard.UI_ID,
        UI_No: this.data.chooseCard.UI_No,
      }
      wx.showModal({
        title: "",
        content: '确定选择此卡',
        success(res) {
          that.scanQR(jsonStr)
        }
      })
    },
    choose(event) {
      this.setData({
        num: event.currentTarget.dataset.index,
        chooseCard: event.currentTarget.dataset.card
      })
    },
    scanQR(jsonStr) {
      request({
        url: "/ScanResult",
        data: {
          user_token: wx.getStorageSync('token'),
          json: JSON.stringify(jsonStr)
        }
      }).then(res => {
        if (res.data.code !== 1) {
          wx.showToast({
            icon: "none",
            title: res.data.msg || res.data.errmsg,
          })
        }
        this.setData({
          isShowModel: false
        })
      })
    },
    close() {
      this.setData({
        isShowModel: false
      })
    }
  }
})