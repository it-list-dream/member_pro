var app = getApp()
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    endDate:'',
    firstDate:'2020-01',
    lastDate:'2021-02'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   var time = util.formatTime(new Date());
   time = time.slice(0,10).replace(/\/+/g,'-');
    this.setData({
      navHeight: app.globalData.navHeight,
      navTop: app.globalData.navTop,
      windowHeight: app.globalData.windowHeight,
      endDate:time
    })
  },
  bindDateChange: function(e) {
    this.setData({
      firstDate: e.detail.value.slice(0,7)
    })
  },
  bindDateChange1: function(e) {
    this.setData({
      lastDate: e.detail.value.slice(0,7)
    })
  },
  testBody:function(){
 wx.navigateTo({
   url: '/page2/deviceDetail/deviceDetail',
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