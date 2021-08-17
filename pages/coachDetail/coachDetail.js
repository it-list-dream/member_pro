// pages/coachDetail/coachDetail.js
const app = getApp()
var api = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coachDetail: null,
    suggestCoach: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(options)
    if (options.coach) {
      this.setData({
        coachDetail: JSON.parse(options.coach),
      })
    }
    this.setData({
      navHeight: app.globalData.navHeight,
      navTop: app.globalData.navTop,
    })
    if (options.sign && options.sign !== '') {
      api.request({
        url: "/GetUrlBySign",
        data: {
          sign: options.sign
        }
      }).then(res => {
        if (res.data.code == 1) {
          if (!wx.getStorageSync('token')) {
            console.log(111111111111)
            wx.setStorageSync('token', res.data.user_token)
            //保存品牌名
            wx.setStorageSync('GymName', res.data.GymName);
            //保存门店的id
            wx.setStorageSync('GB_ID', options.GB_ID);
          }
          that.getSuggestCoach(options.GB_ID);
          that.getMyCoachRecommendPersonalInformation(options.teacherid);
        }
      })
    } else {
      that.getSuggestCoach();
    }
  },
  //私教课详情
  getMyCoachRecommendPersonalInformation: function (teacherid) {
    var that = this
    api.request({
      url: "/MyCoachRecommendPersonalInformation",
      data: {
        user_token: wx.getStorageSync('token'),
        FK_AL_TeachCoach_ID: teacherid
      }
    }).then(res => {
      if (res.data.code == 1) {
        that.setData({
          coachDetail: res.data.data[0]
        })
      }
    })
  },
  //推荐课程
  getSuggestCoach: function (id) {
    var that = this
    api.request({
      url: "/SuggestCoachClass",
      data: {
        user_token: wx.getStorageSync('token'),
        GB_ID: wx.getStorageSync('GB_ID') || id
      }
    }).then(res => {
      //console.log(res)
      that.setData({
        suggestCoach: res.data.data
      })
    })
  },
  call: function (e) {
    if (e.currentTarget.dataset.phone) {
      wx.makePhoneCall({
        phoneNumber: e.currentTarget.dataset.phone,
      }).catch(e => {
        console.log(e)
      })
    } else {
      wx.showToast({
        icon: "none",
        title: '该教练没有预留手机号码',
      })
    }
  },
  rec_course() {
    wx.navigateTo({
      url: '/pages/personalTrainer/personalTrainer',
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
  // onShareAppMessage: function () {

  // }
})