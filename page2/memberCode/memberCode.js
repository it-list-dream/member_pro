// var server = require("../../utils/server.js")
var QRCode = require('../../utils/weapp-qrcode.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    card_list: [{
        card_name: '一年卡',
        card_state: '使用中',
        card_store: '如鱼科技',
        code: 0
      },
      {
        card_name: '二年卡',
        card_state: '未激活',
        card_store: '体验店',
        code: 1
      },
      {
        card_name: '三年卡',
        card_state: '已激活',
        card_store: '全店通',
        code: 2
      }, {
        card_name: '三年卡',
        card_state: '已激活',
        card_store: '全店通',
        code: 2
      }
    ],
    showchoose: false,
    // 存储定时器
    setInter: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let qrcode = new QRCode('canvas', {
      text: "code=0000000000000",
      width: 150,
      height: 150,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H,
    });
    this.setData({
      navHeight: app.globalData.navHeight,
      navTop: app.globalData.navTop,
      windowHeight: app.globalData.windowHeight,
      userInfo: app.globalData.userInfo
    })
  },
  close() {
    this.setData({
      showchoose: false
    })
  },
  _navBack() {
    wx.navigateBack({
      delta: 1
    })
  },
  chooseCard: function () {
    this.setData({
      showchoose: !this.data.showchoose
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
    // qrcode.clear(); // 清除代码.clear();
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