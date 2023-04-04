const app = getApp()
var api = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let storeSign = options.sign,
      UrlBySign = wx.getStorageSync('UrlBySign'),
      phoneNumber = wx.getStorageSync('phone')
    //是从公众号或者是扫描二维码进入的
    if (app.globalData.isChange) {
      if (storeSign == UrlBySign) {
        //说明一定是第二次进入
        if (phoneNumber) {
          wx.switchTab({
            url: '/pages/tabbar/home/home',
          })
        } else {
          this.getStoreSign(storeSign);
        }
      } else {
        ///清除之前的所有缓存
        wx.clearStorageSync();
        this.getStoreSign(storeSign);
      }
    } else {
      if (phoneNumber) {
        //console.log('手机号码:')
        wx.switchTab({
          url: '/pages/tabbar/home/home',
        })
      } else {
        console.log('未授权')
        this.getStoreSign(storeSign);
      }
    }
  },
  getStoreSign(sign) {
    var mySign = sign || wx.getStorageSync('UrlBySign');
    api.request({
      url: "/GetUrlBySign",
      data: {
        sign: mySign || "ruyu"
      }
    }).then(res => {
      wx.setStorageSync('UrlBySign', mySign || "ruyu")
      wx.setStorageSync('token', res.data.user_token)
      //保存品牌名
      wx.setStorageSync('GymName', res.data.GymName)
      wx.switchTab({
        url: '/pages/tabbar/home/home',
      })
    })
  },
  onShow: function () {},
})