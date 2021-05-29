// page2/smartTreadmill/smartTreadmill.js
const app = getApp()
const api = require('../../utils/request.js')
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    endDate: '',
    firstDate: '2020-01',
    lastDate: '2021-02'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      navHeight: app.globalData.navHeight,
      navTop: app.globalData.navTop,
    })
  },
  treadmillDetail:function(){
      wx.navigateTo({
        url: '/page2/treadmillDetail/treadmillDetail',
      })
  },
  // 日期
  bindDateChange:function(e){
   // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      firstDate: e.detail.value
    })
  },
  bindDateChange1:function(e){
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      lastDate: e.detail.value
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