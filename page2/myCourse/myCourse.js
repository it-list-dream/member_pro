// page2/myCourse/myCourse.js
var app = getApp()
var api = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myCoachList: [],
    //分页
    pageSize: 5,
    currPage: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMyCoachClassList()
    this.setData({
      navHeight: app.globalData.navHeight,
      navTop: app.globalData.navTop,
    })
  },
  personalAppointment: function () {
    wx.navigateTo({
      url: '/pages/appointment/appointment?course=1',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getMyCoachClassList: function () {
    var that = this
    api.request({
      url: '/MyCoachClassList',
      data: {
        user_token: wx.getStorageSync('token'),
        pageSize: that.data.pageSize,
        pageIndex: that.data.currPage,
        UI_ID: wx.getStorageSync('UI_ID')
      }
    }).then(res => {
      console.log(res)
      that.setData({
        myCoachList: [...that.data.myCoachList, ...res.data.data]
      })
    })
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
    var that = this;
    var pageSize = that.data.currPage + 1; //获取当前页数并+1
    that.setData({
      currPage: pageSize, //更新当前页数
    })
    that.getMyCoachClassList(); //重新调用请求获取下一页数据
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})