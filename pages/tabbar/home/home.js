// pages/home/home.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerlist: ['/static/home_pic/banner01.png', '/static/home_pic/banner01.png', '/static/home_pic/banner01.png', '/static/home_pic/banner01.png', '/static/home_pic/banner01.png'],
    coachList: [{
        coachName: '张三',
        coachClass: 220,
        coachFun: '减脂 | 增肌',
      },
      {
        coachName: '李四',
        coachClass: 220,
        coachFun: '减脂 | 增肌',
      },
      {
        coachName: '王五',
        coachClass: 220,
        coachFun: '减脂 | 增肌',
      }
    ],
    recomentList: [{
        r_pic: '/static/home_pic/coach2.png',
        course: '拉伸课',
        number: 21
      },
      {
        r_pic: '/static/home_pic/coach2.png',
        course: '拉伸课',
        number: 21
      },
      {
        r_pic: '/static/home_pic/coach3.png',
        course: '拉伸课',
        number: 21
      }, {
        r_pic: '/static/home_pic/coach3.png',
        course: '拉伸课',
        number: 21
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData)
    this.setData({
      navHeight: app.globalData.navHeight,
      navTop: app.globalData.navTop,
      windowHeight: app.globalData.windowHeight
    })
  },
  recomment() {
    wx.navigateTo({
      url: '/pages/classList/classList',
    })
  },
  callPhone(e) {
    // console.log(e.target.dataset.phone)
    wx.makePhoneCall({
      phoneNumber: '1340000' //仅为示例，并非真实的电话号码
    })
  },
  toShop() {
    wx.navigateTo({
      url: '/pages/shop/shop',
    })
  },
  goLeagueLecture() {
    wx.navigateTo({
      url: '/pages/appointment/appointment',
    })
  },
  allCoach() {
    wx.navigateTo({
      url: '/pages/coachList/coachList',
    })
  },
  toActive() {
    wx.navigateTo({
      url: '/pages/activeList/activeList',
    })
  },
  code() {

  },
  memberCode() {
wx.navigateTo({
  url: '/page2/memberCode/memberCode',
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