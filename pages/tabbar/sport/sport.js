// pages/sport/sport.js
const app = getApp();
const util = require('../../../utils/util.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    integral_list: [{
        id: 1,
        cardType: '一周卡',
        inteNumber: 1000,
        img: '/static/sport/jifen01.png'
      },
      {
        id: 2,
        cardType: '体验课',
        inteNumber: 500,
        img: '/static/sport/jifen02.png'
      },
      {
        id: 3,
        cardType: '拳击手套',
        inteNumber: 3500,
        img: '/static/sport/jifen03.png'
      },
      {
        id: 4,
        cardType: '蛋白粉',
        inteNumber: 2000,
        img: '/static/sport/jifen04.png'
      },
      {
        id: 5,
        cardType: '游泳衣',
        inteNumber: 4500,
        img: '/static/sport/jifen05.png'
      },
      {
        id: 6,
        cardType: '游泳眼镜',
        inteNumber: 4500,
        img: '/static/sport/jifen06.png'
      }
    ],
    //weekday: ['21', '22', '23', '24', '25', '26', '27'],
    weekList: [],
    changebg: 0,
    isShow: false,
    chooseCourse: false,
    bg: '/static/h_bg.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(app.globalData)
    this.getWeekList();
    this.setData({
      navHeight: app.globalData.navHeight,
      navTop: app.globalData.navTop,
      windowHeight: app.globalData.windowHeight
    })
  },
  changeDate(e) {
    // console.log(e.target)
    console.log(e.currentTarget.dataset.num)
    let changebg = e.currentTarget.dataset.num
    this.setData({
      changebg: changebg
    })
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