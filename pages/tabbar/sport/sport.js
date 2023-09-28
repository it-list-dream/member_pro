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
    motionList: [],
    sportDays: 0,
    score: 0,
    isHideCoachPre:0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      navHeight: app.globalData.navHeight,
      navTop: app.globalData.navTop,
      menuRight: app.globalData.menuRight
    });
    console.log(app.globalData.selected)
  },
  changeDate(e) {
    let changebg = e.currentTarget.dataset.num
    if(changebg == this.data.changebg){
       return;
    }
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
  onClose(){
    this.setData({
      chooseCourse:false
    })
  },
  appointment(){
    this.setData({
      chooseCourse:true
    })
  },
  getWeekList: function () {
    let dayList = [];
    //获取当前时间
    let startDate = new Date();
    let endDate = new Date();
    let isHideCoachPre = parseInt(app.globalData.setOptions.IsHidenCoachPre);
    endDate.setDate(startDate.getDate() + 4);
    while ((endDate.getTime() - startDate.getTime()) >= 0) {
      let month = (startDate.getMonth() + 1).toString().length === 1 ? "0" + (startDate.getMonth() + 1).toString() : (startDate.getMonth() + 1);
      let day = startDate.getDate().toString().length === 1 ? "0" + startDate.getDate() : startDate.getDate();
      dayList.push({
        date: month + "-" + day,
        week: util.toWeek(startDate)
      })
      startDate.setDate(startDate.getDate() + 1);
    }
    this.setData({
      weekList: dayList,
      year: new Date().getFullYear(),
      isHideCoachPre:isHideCoachPre
    })
  },
  //运动日历
  getMotionCalendar: function () {
    var that = this
    api.request({
      url: "/MotionCalendar",
      data: {
        user_token: wx.getStorageSync('token'),
        GB_ID: wx.getStorageSync('GB_ID'),
        searchData: that.data.year + '-' + that.data.weekList[that.data.changebg].date,
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
          integral_list: res.data.data.slice(0, 6)
        })
      }
    })
  },
  selfRewordInte: function (e) {
    console.log(e)
    let se_id = e.currentTarget.dataset.id;
    let price_type = e.currentTarget.dataset.prizetype
    wx.navigateTo({
      url: '/page2/integralMall/integralMall?se_id=' + se_id + '&price_type=' + price_type + '&type=1',
    })
  },
  getClassCountByuserId: function () {
    var that = this
    api.request({
      url: '/ClassCountByuserId',
      data: {
        user_token: wx.getStorageSync('token'),
        GB_ID: wx.getStorageSync('GB_ID'),
        UI_ID: wx.getStorageSync('UI_ID') || -1
      }
    }).then(res => {
      if (res.data.code == 1) {    
        that.setData({
          sportDays: res.data.data.CheckInNum,
          score: res.data.score
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
    this.getWeekList();
    this.getMotionCalendar()
    this.getScoreRewardActList()
    this.getClassCountByuserId();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

})