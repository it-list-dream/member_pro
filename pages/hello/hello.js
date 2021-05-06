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
    api.request({
      url: "/GetUrlBySign",
      data: {
        sign: d.sign || 'ruyu'
      }
    }).then(res => {
      // console.log(res)
      var t = wx.getStorageSync('token')
      if (!t) {
        wx.setStorageSync('token', res.data.user_token)
        //保存门店名字
        wx.setStorageSync('GymName', res.data.GymName)
      }
      wx.switchTab({
        url: '/pages/tabbar/home/home',
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})