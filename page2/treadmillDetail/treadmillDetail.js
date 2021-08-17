// page2/treadmillDetail/treadmillDetail.js
var app = getApp()
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let detail = JSON.parse(options.run)
    this.setData({
      navHeight: app.globalData.navHeight,
      navTop: app.globalData.navTop,
      runDeatil: detail
    })
    this.handleDetailData();
  },
  handleDetailData() {
    var details = this.data.runDeatil
    let dList = [{
      run_key: details.burncal,
        img: './images/sport_runing6.png',
        title: '消耗（kcal)'
      },
      {
        run_key: details.avgspeed,
        img: './images/sport_runing5.png',
        title: '平均速度（km/h)'
      }, {
        run_key: details.heartrate,
        img: './images/sport_runing8.png',
        title: '平均心率'
      }, {
        run_key: details.gradient,
        img: './images/sport_runing4.png',
        title: '最高坡度'
      }
    ]
    this.setData({
      detailList:dList
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