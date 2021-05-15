// page2/integralMall/integralMall.js
var app = getApp()
var api = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // cardType: 1,
    // entityType: 1,
    type: 1,
    inteType: 1,
    //教练
    chooseCoach: 0,
    //课程数量
    courseNum: 1,
    takeMethods: ['门店自取', '快递上门（到付）'],
    take_index: -1,
    //
    reward: null,
    coachList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    let t = options.type;
    console.log(t)
    if (t == 1) {
      this.getScoreRewardActContent(options.se_id, options.price_type);
      // //所有的教练
      // if (options.price_type == 2) {
      //   this.getAllCoach();
      // }
    } else if (t == 2) {
      this.getScoreRewardPayContent(options.se_id, options.price_type);
      //所有的教练
      // if (options.price_type == 2) {
      //   this.getAllCoach();
      // }
    }
    //所有的教练
    if (options.price_type == 2) {
      this.getAllCoach();
    }
    this.setData({
      navHeight: app.globalData.navHeight,
      navTop: app.globalData.navTop,
      inteType: options.type,
      type: options.price_type
    })
  },
  calculate: function (e) {
    var operator = e.target.dataset.operator;
    var total = this.data.courseNum;
    if (operator == '+') {
      total++;
    } else if (operator == '-') {
      if (total > 1) {
        total--;
      }
    }
    this.setData({
      courseNum: total
    })
  },
  takeWay: function (e) {
    console.log(e.target.dataset);
    var idx = e.target.dataset.index;
    this.setData({
      take_index: idx
    })
    // if (idx == 1) {
    //   wx.navigateTo({
    //     url: '/page2/address/address',
    //   })
    // }

  },
  //行为
  getScoreRewardActContent: function (se_id, prizeType) {
    var that = this
    api.request({
      url: "/ScoreRewardActContent",
      data: {
        user_token: wx.getStorageSync('token'),
        se_id: se_id,
        prizeType: prizeType,
        GB_ID: wx.getStorageSync('GB_ID')
      }
    }).then(res => {
      console.log(res);
      if (res.data.code == 1) {
        that.setData({
          reward: res.data.data
        })
      }
    })
  },
  //消费
  getScoreRewardPayContent: function (se_id, prizeType) {
    var that = this
    api.request({
      url: "/ScoreRewardPayContent",
      data: {
        user_token: wx.getStorageSync('token'),
        se_id: se_id,
        prizeType: prizeType,
        GB_ID: wx.getStorageSync('GB_ID')
      }
    }).then(res => {
      console.log(res);
      if (res.data.code == 1) {
        that.setData({
          reward: res.data.data
        })
      }
    })
  },
  getAllCoach: function () {
    var that = this;
    api.request({
      url: "/CoachStyleList",
      data: {
        user_token: wx.getStorageSync('token'),
        GB_ID: wx.getStorageSync('GB_ID')
      }
    }).then(res => {
      console.log(res)
      if (res.data.code == 1) {
        that.setData({
          coachList: res.data.data
        })
      }
    })
  },
  coach_choose: function (e) {
    console.log(e.currentTarget.dataset.index)
    let index = e.currentTarget.dataset.index
    this.setData({
      chooseCoach: index
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