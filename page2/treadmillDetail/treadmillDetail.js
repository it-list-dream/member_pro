// page2/treadmillDetail/treadmillDetail.js
var app = getApp()
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
   detailList:[
     {
       count:6,
       img:'./images/sport_runing6.png',
       title:'消耗（kcal)'
     },
     {
      count:3.99,
      img:'./images/sport_runing5.png',
      title:'平均速度（km/h)'
    },
    {
      count:62,
      img:'./images/sport_runing1.png',
      title:'步数'
    },{
      count:57.0,
      img:'./images/sport_runing3.png',
      title:'步频（pace/min)'
    },{
      count:1.16,
      img:'./images/sport_runing2.png',
      title:'步长（M)'
    },{
      count:116,
      img:'./images/sport_runing8.png',
      title:'平均心率'
    },{
      count:1,
      img:'./images/sport_runing4.png',
      title:'最高坡度'
    },{
      count:6,
      img:'./images/sport_runing7.png',
      title:'消耗（kcal)'
    }
   ]
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