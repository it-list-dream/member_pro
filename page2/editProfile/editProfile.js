// page2/editProfile/editProfile.js
const app = getApp()

var util = require('../../utils/util.js')

var api = require('../../utils/request.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    endTime: null,
    heightId: 0,
    weightId: 0,
    heightList: [],
    weightList: [],
    userInfo: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHeight();
    this.getWeight();
    let date = util.formatTime(new Date());
    if (wx.getStorageSync('userInfo')) {
      this.setData({
        userInfo: JSON.parse(wx.getStorageSync('userInfo'))
      })
    }
    this.setData({
      navHeight: app.globalData.navHeight,
      endTime: date
    })
    this.getUserInfo()
  },
  changeBirthday(e) {
    console.log(e)
    this.setData({
      'myInfo.UI_Birthday': util.format(e.detail.value, 'yyyy-mm-dd')
    })
    var that = this;
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
    console.log(e.detail.value)
    this.setData({
      heightId: e.detail.value,
      'myInfo.UI_Height': this.data.heightList[e.detail.value]
    })
    api.request({
      url: '/UserInfoHeight',
      data: {
        user_token: wx.getStorageSync('token'),
        height: this.data.heightList[e.detail.value]
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
    // console.log(e.detail.value)
    this.setData({
      weightId: e.detail.value,
      'myInfo.UI_Weight': this.data.weightList[e.detail.value]
    })
    api.request({
      url: '/UserInfoWeight',
      data: {
        user_token: wx.getStorageSync('token'),
        weight: Number(this.data.weightList[e.detail.value]) * 2
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
  onReady: function () {},
  exit: function () {
    var that = this
    wx.showModal({
      title: '',
      content: '确定是否要退出？',
      success(res) {
        if (res.confirm) {
          wx.removeStorageSync('loginStatus');
          wx.removeStorageSync('phone');
          wx.removeStorageSync('UI_ID');
          wx.removeStorageSync('userInfo');
          wx.removeStorageSync('hasUserInfo');
          wx.removeStorageSync('tid');
          wx.removeStorageSync('co_id');
          wx.setStorageSync('expireTime');
          api.request({
            url: "/GetUrlBySign",
            data: {
              sign: wx.getStorageSync('UrlBySign')
            }
          }).then(res => {
            if (res.data.code == 1) {
              wx.setStorageSync('token', res.data.user_token)
              // // //保存门店名字
              wx.setStorageSync('GymName', res.data.GymName);
              console.log('退出')
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
        var u = res.data.data[0];
        if (u.UI_Birthday && u.UI_Weight) {
          u.UI_Birthday = util.format(u.UI_Birthday, 'yyyy-mm-dd')
          u.UI_Weight = u.UI_Weight / 2
          //console.log(util.format(u.UI_Birthday,'yyyy-mm-dd'))
        }
        this.setData({
          myInfo: u
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // this.getHeight();
    // this.getWeight();
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