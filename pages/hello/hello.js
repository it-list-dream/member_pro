// pages/hello/hello.js
const app = getApp()
var api = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getStoreInfo(options)
  },
  //获取门店信息
  getStoreInfo: function (d) {
    let phone = wx.getStorageSync('phone');
    wx.setStorageSync('UrlBySign', d.sign || 'ruyu')
    if (!phone) {
      //console.log('info')
      api.request({
        url: "/GetUrlBySign",
        data: {
          sign: d.sign || 'ruyu'
        }
      }).then(res => {
        // if (!wx.getStorageSync('token')) {
        wx.setStorageSync('token', res.data.user_token)
        //保存品牌名
        wx.setStorageSync('GymName', res.data.GymName)
        //  }
        wx.switchTab({
          url: '/pages/tabbar/home/home',
        })
      })
    } else {
      wx.switchTab({
        url: '/pages/tabbar/home/home',
      })
    }
  },
  onShow: function () {

  },
})