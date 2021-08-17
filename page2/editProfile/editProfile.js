// page2/editProfile/editProfile.js
const app = getApp()

var util = require('../../utils/util.js')

var api = require('../../utils/request.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // userInfo: '',
    heightList: [],
    phone: '',
    sexId: null,
    birthday: null,
    endTime: null,
    heightId: null,
    weightId: null,
    weightList: [],
    allInfo: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let date = util.formatTime(new Date());
    if (wx.getStorageSync('userInfo')) {
      this.setData({
        userInfo: JSON.parse(wx.getStorageSync('userInfo'))
      })
    }
    this.setData({
      navHeight: app.globalData.navHeight,
      navTop: app.globalData.navTop,
      endTime: date,
      GB_ID: wx.getStorageSync('GB_ID'),
      UrlBySign: wx.getStorageSync('UrlBySign'),
      GymLogo: wx.getStorageSync('GymLogo'),
      phone: wx.getStorageSync('phone')
    })
    this.getUserInfo()
  },
  changePhone(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  changeBirthday(e) {
    console.log(111)
    var that = this;
    this.setData({
      birthday: e.detail.value
    })
    api.request({
      url: '/UserInfoBirthday',
      data: {
        user_token: wx.getStorageSync('token'),
        birthday: e.detail.value
      }
    }).then(res => {
      if (res.data.code == 1) {
        wx.showToast({
          icon: "none",
          title: '修改成功',
        })
      }
    })
  },
  changeHeight(e) {
    this.setData({
      heightId: e.detail.value
    })
    api.request({
      url: '/UserInfoHeight',
      data: {
        user_token: wx.getStorageSync('token'),
        height: e.detail.value
      }
    }).then(res => {
      if (res.data.code == 1) {
        wx.showToast({
          icon: "none",
          title: '修改成功',
        })
      }
    })
  },
  changeWeight(e) {
    this.setData({
      weightId: e.detail.value
    })
    api.request({
      url: '/UserInfoWeight',
      data: {
        user_token: wx.getStorageSync('token'),
        weight: e.detail.value
      }
    }).then(res => {
      if (res.data.code == 1) {
        wx.showToast({
          icon: "none",
          title: '修改成功',
        })
      }
    })
  },
  getHeight() {
    let height = this.data.heightList;
    for (let i = 120; i <= 230; i++) {
      //  console.log(i)
      height.push(i)
    }
    this.setData({
      heightList: height
    })
  },
  getWeight() {
    let weight = this.data.weightList;
    for (let i = 30; i <= 160; i++) {
      weight.push(i);
      weight.push(i + 0.5);
    }
    this.setData({
      weightList: weight
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let userInfo = wx.getStorageSync('userInfo');
    this.setData({
      userInfo: JSON.parse(userInfo)
    })
  },
  exit: function () {
    var that = this
    wx.showModal({
      title: '',
      content: '确定是否要退出？',
      success(res) {
        if (res.confirm) {
          wx.clearStorageSync();
          api.request({
            url: "/GetUrlBySign",
            data: {
              sign: that.data.UrlBySign
            }
          }).then(res => {
            if (res.data.code == 1) {
              wx.setStorageSync('token', res.data.user_token)
              //保存门店名字
              wx.setStorageSync('GymName', res.data.GymName);
              wx.setStorageSync('GB_ID', that.data.GB_ID)
              //重新设置标识
              wx.setStorageSync('UrlBySign', that.data.UrlBySign)
              wx.setStorageSync('GymLogo', that.data.GymLogo)
              wx.navigateBack({
                delta: 1,
              })
            }
          })
        }
      }
    })

  },
  getUserInfo: function () {
    var that = this
    api.request({
      url: '/UserInfo',
      data: {
        user_token: wx.getStorageSync('token')
      }
    }).then(res => {
      if (res.data.data.length > 0) {
        let {
          UI_Birthday,
          UI_Weight,
          UI_Height
        } = res.data.data[0];
        if (UI_Birthday) {
          UI_Birthday = UI_Birthday.slice(0, 10)
        }
        that.setData({
          birthday: UI_Birthday,
          heightId: UI_Weight,
          weightId: UI_Height
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getHeight();
    this.getWeight();
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

  }
})