// pages/sport/sport.js
const app = getApp();
const util = require('../../../utils/util.js')
const api = require('../../../utils/request.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    integral_list: [],
    weekList: [],
    changebg: 0,
    chooseCourse: false,
    motionList: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let phoneNumber = wx.getStorageSync('phone');
    
    if(!phoneNumber && phoneNumber==''){
      wx.navigateTo({
        url: '/page2/login/login',
      })
    }

    this.getWeekList();
    //sport
    this.getMotionCalendar()
    //
    this.getScoreRewardActList()
    this.setData({
      navHeight: app.globalData.navHeight,
      navTop: app.globalData.navTop,
      menuRight:app.globalData.menuRight
    })
    console.log(app.globalData.menuRight)
  },
  changeDate(e) {
    // console.log(e.target)
    console.log(e.currentTarget.dataset.num)
    let changebg = e.currentTarget.dataset.num
    this.setData({
      changebg: changebg
    })
    this.getMotionCalendar()
  },
  runing: function () {
    wx.navigateTo({
      url: '/pages/movementData/movementData',
    })
  },
  fitness: function () {
    wx.navigateTo({
      url: '/page2/instrument/instrument',
    })
  },
  appointment: function () {
    this.setData({
      chooseCourse: true
    })
  },
  close() {
    this.setData({
      chooseCourse: false
    })
  },
  groupCourse: function () {
    wx.navigateTo({
      url: '/pages/appointment/appointment?course=1',
    })
    this.setData({
      chooseCourse: false
    })
  },
  personalCourse: function () {
    wx.navigateTo({
      url: '/pages/appointment/appointment?course=0',
    })
    this.setData({
      chooseCourse: false
    })
  },
  getWeekList: function () {
    let dayList = [];
    //获取当前时间
    let startDate = new Date();
    let endDate = new Date();
    endDate.setDate(startDate.getDate() + 6);
    while ((endDate.getTime() - startDate.getTime()) >= 0) {
      let month = (startDate.getMonth() + 1).toString().length === 1 ? "0" + (startDate.getMonth() + 1).toString() : (startDate.getMonth() + 1);
      let day = startDate.getDate().toString().length === 1 ? "0" + startDate.getDate() : startDate.getDate();
      dayList.push(month + "-" + day);
      startDate.setDate(startDate.getDate() + 1);
    }
    this.setData({
      weekList: dayList,
      year: new Date().getFullYear()
    })
    //console.log(dayList)
  },
  //运动日历
  getMotionCalendar: function () {
    var that = this
    api.request({
      url: "/MotionCalendar",
      data: {
        user_token: wx.getStorageSync('token'),
        GB_ID: wx.getStorageSync('GB_ID'),
        searchData: that.data.year + '-' + that.data.weekList[that.data.changebg],
        UI_ID: wx.getStorageSync('UI_ID') || 0
      }
    }).then(res => {
      if (res.data.code == 1) {
        that.setData({
          motionList: res.data.data
        })
      }
    })
  },
  //行为积分
  getScoreRewardActList: function () {
    var that = this
    api.request({
      url: "/ScoreRewardActList",
      data: {
        user_token: wx.getStorageSync('token'),
        score: 0,
        GB_ID: wx.getStorageSync('GB_ID')
      }
    }).then(res => {
      //console.log(res)
      if (res.data.code == 1) {
        that.setData({
          integral_list:res.data.data.slice(0,3)
        })
      }
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