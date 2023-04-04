// pages/coachList/coachList.js
const app = getApp()
var api = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coachList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      navHeight: app.globalData.navHeight,
      navTop: app.globalData.navTop,
      setOptions:app.globalData.setOptions
    })
    if (options.sign && options.sign !== '') {
      Promise.all([Promise.resolve(this.getGetUrlBySign(options.sign))]).then(res => {
        this.getCoachList();
      })
    } else {
      this.getCoachList()
    }
  },
  getCoach: function (e) {
    let coach = e.currentTarget.dataset.coach;
    //console.log(coach)
    wx.navigateTo({
      url: '/pages/coachDetail/coachDetail?coach=' + JSON.stringify(coach),
    })
  },
  //教练列表
  getCoachList: function () {
    var that = this
    api.request({
      url: "/CoachStyleList",
      data: {
        user_token: wx.getStorageSync('token'),
        GB_ID: wx.getStorageSync('GB_ID')
      }
    }).then(res => {
      console.log(res)
      that.setData({
        coachList: res.data.data
      })
    })
  },
  //call
  call: function (e) {
    let phone = e.currentTarget.dataset.phone
    console.log(app.globalData.setOptions.IsHidenCoachPhone)
    if(app.globalData.setOptions.IsHidenCoachPhone == 1){
          phone = app.globalData.gymPhone;
    }
    if (phone) {
      wx.makePhoneCall({
        phoneNumber: phone,
      }).catch(e => {})
    } else {
      wx.showToast({
        icon: "none",
        title: '该教练没有预留手机号码',
      })
    }

  },
  //获取标识
  getGetUrlBySign: function (sign) {
    // var that = this;
    api.request({
      url: "/GetUrlBySign",
      data: {
        sign: sign
      }
    }).then(res => {
      if (res.data.code == 1) {
        let u_token = wx.getStorageSync('token');
        if (!u_token && u_token == '') {
          wx.setStorageSync('token', res.data.user_token)
          //保存品牌名
          wx.setStorageSync('GymName', res.data.GymName);
          //保存门店的id
          wx.setStorageSync('GB_ID', options.GB_ID);
        }
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