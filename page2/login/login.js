// page2/login/login.js
var api = require('../../utils/request')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModal: false,
    hasUserInfo: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let hasUserInfo = wx.getStorageSync('hasUserInfo');
    this.setData({
      navHeight: app.globalData.navHeight,
      navTop: app.globalData.navTop,
      windowHeight: app.globalData.windowHeight
    })
    this.setData({
      hasUserInfo: hasUserInfo
    })
  },
  onCancel() {
    wx.navigateBack({
      delta: 1,
    })
  },
  modalCancel() {
    console.log('取消');
    wx.showToast({
      title: '拒绝授权',
      icon: 'none',
      duration: 2000
    })
  },
  modalConfirm() {
    console.log('确定')
  },
  getUserProfile(e) {
    var that = this;
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res.userInfo)
        that.setData({
          userInfo: res.userInfo,
          showModal: true,
          hasUserInfo: true
        })
        wx.setStorageSync('hasUserInfo', true)
        wx.setStorageSync('userInfo', JSON.stringify(res.userInfo))
        //登录
        wx.login({
          success: function (res) {
            let code = res.code
            console.log(code)
            api.request({
              url: "/WxUserLogin",
              method: "POST",
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              data: {
                user_token: wx.getStorageSync('token'),
                code: code
              }
            }).then(res => {
              console.log(res)
              wx.setStorageSync('token', res.data.user_token)
            })
          }
        })
      },
      fail: function () {
        console.log('用户拒绝获取头像信息');
        wx.navigateBack({
          delta: 1,
        })
      }
    })
  },
  //通过绑定手机号登录
  getPhoneNumber: function (e) {
    api.request({
      url: "/userPhoneBind",
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        user_token: wx.getStorageSync('token'),
        encryptedDataStr: e.detail.encryptedData,
        iv: e.detail.iv,
      }
    }).then(res => {
      console.log(res)
      wx.setStorageSync('token', res.data.user_token)
    })
  },
  getStoreInfo: function () {
    api.request({
      url: "/GetUrlBySign",
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        sign: "ruyu"
      }
    }).then(res => {
      console.log(res)
      wx.setStorageSync('token', res.data.user_token)
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getStoreInfo();
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