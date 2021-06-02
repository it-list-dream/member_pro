// pages/selectCourse/selectCourse.js
var app = getApp()
var api = require('../../utils/request.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    cardImg: '/static/selectCourse.png',
    //每页显示的数量
    pageSize: 10,
    //当前页数
    currPage: 1,
    //教练列表
    coachClassList: [],
    flag: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMyCoachClassList();
    this.setData({
      navHeight: app.globalData.navHeight,
      navTop: app.globalData.navTop,
    })
  },
  getMyCoachClassList: function () {
    var that = this;
    api.request({
      url: "/MyCoachClassList",
      data: {
        user_token: wx.getStorageSync('token'),
        UI_ID: wx.getStorageSync('UI_ID'),
        pageSize: that.data.pageSize,
        pageIndex: that.data.currPage
      }
    }).then(res => {
      //console.log(res.data.data);
      //触底
      if (res.data.code == 1) {
        if (res.data.data.length>0) {
          that.setData({
            coachClassList: [...that.data.coachClassList, ...res.data.data]
          })
        }
      } else {
        that.setData({
          flag: false
        })
      }
    })
  },
  orderCourse: function (e) {
    var pages = getCurrentPages(); //当前页面
    console.log(e)
    var prevPage = pages[pages.length - 2]; //上一页面
    prevPage.setData({
      currentCoach: e.currentTarget.dataset.coach,
      chooseCoach: e.currentTarget.dataset.coach
    })
    //刷新
    prevPage.getPrivateAppointment()
    wx.setStorageSync('myCoach', e.currentTarget.dataset.coach)
    wx.navigateBack({
      delta: 1,
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('触底反应')
    var that = this;
    if (this.data.flag) {
      var pageSize = that.data.currPage + 1; //获取当前页数并+1
      that.setData({
        currPage: pageSize, //更新当前页数
      })
      that.getMyCoachClassList(); //重新调用请求获取下一页数据
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})