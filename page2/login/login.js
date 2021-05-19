// page2/login/login.js
var api = require('../../utils/request')
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    showModal: false,
    hasUserInfo: false,
    //门店名
    GymName:wx.getStorageSync('GymName') ||'如渔科技',
    //门店logo
    GymLogo:wx.getStorageSync('GymLogo')

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(wx.getStorageSync('GymLogo'))
    let hasUserInfo = wx.getStorageSync('hasUserInfo');
    this.setData({
      navHeight: app.globalData.navHeight,
      navTop: app.globalData.navTop,
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
    wx.showToast({
      title: '拒绝授权',
      icon: 'none',
      duration: 2000
    })
    wx.navigateBack({
      delta: 1,
    })
  },
  getUserProfile(e) {
    var that = this;
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res.userInfo)
        wx.setStorageSync('hasUserInfo', true)
        wx.setStorageSync('userInfo', JSON.stringify(res.userInfo))
        //登录状态
        wx.setStorageSync('loginStatus', 1)
        that.setData({
          userInfo: res.userInfo,
          showModal: true,
          hasUserInfo: true
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
    var that = this
    if (e.detail.errMsg == 'getPhoneNumber:ok') {
      //登录
      wx.login({
        success: function (res) {
          let code = res.code
          api.request({
            url: "/WxUserLogin",
            data: {
              user_token: wx.getStorageSync('token'),
              code: code
            }
          }).then(res => {
            wx.setStorageSync('userOpenid', res.data.openid)
            api.request({
              url: "/userPhoneBind",
              data: {
                user_token: res.data.user_token,
                encryptedDataStr: e.detail.encryptedData,
                iv: e.detail.iv,
              }
            }).then(res => {
              //保存token 
              if (res.data.code == 1) {
                wx.setStorageSync('token', res.data.user_token);
                that.getMyAllCrad();
                wx.setStorageSync('loginStatus', 2);
                // 保存手机号码
                wx.setStorageSync('phone', res.data.phone);
                //返回上一个页面
                wx.navigateBack({
                  delta: 1,
                })
              } else {
                wx.navigateBack({
                  delta: 1,
                })
              }
            })
          })
        }
      })
    } else {
      //返回上一个页面
      wx.navigateBack({
        delta: 1,
      })
    }

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},
  //获取已有的会员信息
  getMyAllCrad: function () {
    var that = this;
    api.request({
      url: "/MyAllVIPCard",
      data: {
        user_token: wx.getStorageSync('token')
      }
    }).then(res => {
      if (res.data.data.length > 0) {
        wx.setStorageSync('UI_ID', res.data.data[0].UI_ID);
      } else {
        wx.setStorageSync('UI_ID', 0);
      }
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
})