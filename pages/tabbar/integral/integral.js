// pages/integral/integral.js
const app = getApp();
var api = require('../../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bg: '/static/h_bg.png',
    inte_list: ['fd', 'dfsfs', 'dsf'],
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
    vipIntegral: 0,
    actionIntegral: 0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(app.globalData)
    this.getScoreTotalByPhone()
    this.setData({
      navHeight: app.globalData.navHeight,
      navTop: app.globalData.navTop,
    })
  },
  //获取积分
  getScoreTotalByPhone: function () {
    var that = this
    api.request({
      url: "/ScoreTotalByPhone",
      data: {
        user_token: wx.getStorageSync('token')
      }
    }).then(res => {
      console.log(res)
      if (res.data.code == '1') {
        that.setData({
          vipIntegral: res.data.data[0].UI_Score,
          actionIntegral: res.data.data[0].UI_ActionScore
        })
      }
    })
  },
  //积分账单
  pointsBill: function () {
    let phone = wx.getStorageSync('phone')
    if (phone && phone !== '') {
      wx.navigateTo({
        url: '/page2/myIntegral/myIntegral?vipIntegral=' + this.data.vipIntegral + '&actionIntegral=' + this.data.actionIntegral,
      })
    }
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