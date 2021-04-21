// pages/sport/sport.js
const app = getApp();
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
    weekday: ['21', '22', '23', '24', '25', '26', '27'],
    changebg: 1,
    isShow: false,
    chooseCourse: false,
    bg: '/static/sport/bg.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(app.globalData)
    this.setData({
      navHeight: app.globalData.navHeight,
      navTop: app.globalData.navTop,
      windowHeight: app.globalData.windowHeight
    })
  },
  changeDate(e) {
    // console.log(e.target)
    console.log(e.target.dataset.num)
    let changebg = e.target.dataset.num
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

  },
  appointment: function () {
    console.log('约课')
    this.setData({
      chooseCourse: true
    })
    // wx.navigateTo({
    //   url: 'url',
    // })
  },
  close() {
    this.setData({
      chooseCourse: false
    })
  },
  groupCourse: function () {
    wx.navigateTo({
      url: '/pages/appointment/appointment',
    })
    this.setData({
      chooseCourse: false
    })
  },
  personalCourse: function () {
    wx.navigateTo({
      url: '/pages/appointment/appointment',
    })
    this.setData({
      chooseCourse: false
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