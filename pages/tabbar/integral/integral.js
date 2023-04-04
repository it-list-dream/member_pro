// pages/integral/integral.js
const app = getApp();
var api = require('../../../utils/request.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //筛选
    isScreen: false,
    selfReword: [],
    VIPReword: [],
    // typeValue: '',
    //轮播图
    inteBannerList: [],
    inteBannerList1: ['http://user.360ruyu.cn/images/userBanner/score1.png', 'http://user.360ruyu.cn/images/userBanner/score2.png'],
    vipIntegral: 0,
    actionIntegral: 0,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      navHeight: app.globalData.navHeight,
      navTop: app.globalData.navTop,
      menuRight: app.globalData.menuRight
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
      if (res.data.code == 1 && res.data.data.length > 0) {
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
    }else{
      wx.navigateTo({
        url: '/page2/login/login',
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onPopup: function () {
    this.setData({
      isScreen: !this.data.isScreen
    })
  },
  //消费积分
  getScoreRewardPayList: function (score) {
    var that = this;
    api.request({
      url: "/ScoreRewardPayList",
      data: {
        GB_ID: wx.getStorageSync('GB_ID'),
        user_token: wx.getStorageSync('token'),
        score: score || 0
      }
    }).then(res => {
      that.setData({
        VIPReword: res.data.data
      })
    })
  },
  //行为积分
  getScoreRewardActList: function (score) {
    var that = this
    api.request({
      url: "/ScoreRewardActList",
      data: {
        GB_ID: wx.getStorageSync('GB_ID'),
        user_token: wx.getStorageSync('token'),
        score: score || 0
      }
    }).then(res => {
      that.setData({
        selfReword: res.data.data
      })
    })
  },
  //轮播图
  getScoreBannerList: function () {
    var that = this
    api.request({
      url: "/ScoreBannerList",
      data: {
        user_token: wx.getStorageSync('token'),
        GB_ID: wx.getStorageSync('GB_ID')
      }
    }).then(res => {
      if (res.data.code == 1) {
        if (res.data.data.length == 0) {
          that.setData({
            inteBannerList: that.data.inteBannerList1
          })
        } else {
          that.setData({
            inteBannerList: res.data.data
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getScoreTotalByPhone()
    //消费积分
    this.getScoreRewardPayList()
    //行为积分
    this.getScoreRewardActList()
    //轮播图
    this.getScoreBannerList();
  },
  //自律奖励
  selfRewordInte: function (e) {
    console.log(e)
    let se_id = e.currentTarget.dataset.id;
    let price_type = e.currentTarget.dataset.prizetype
    wx.navigateTo({
      url: '/page2/integralMall/integralMall?se_id=' + se_id + '&price_type=' + price_type + '&type=1',
    })
  },
  VIPRewards: function (e) {
    console.log(e)
    let se_id = e.currentTarget.dataset.id;
    let price_type = e.currentTarget.dataset.prizetype;
    wx.navigateTo({
      url: '/page2/integralMall/integralMall?se_id=' + se_id + '&price_type=' + price_type + '&type=2',
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      isScreen: false
    })
  },
  onClose() {
    this.setData({
      isScreen: false
    })
  },
  onConform(e) {
    var serach = e.detail;
    var scores = serach.scrores;
    console.log(serach)
    if (Number(serach.scrores) == 0) {
      scores = 0;
    }
  
    if (serach.type.includes('VIP奖励') && serach.type.length == 1) {
      this.getScoreRewardPayList(scores)
      let selfReword = [];
      this.setData({
        selfReword: selfReword
      })
    } else if (serach.type.includes('自律奖励') && serach.type.length == 1) {
      this.getScoreRewardActList(scores);
      let VIPReword = []
      this.setData({
        VIPReword: VIPReword
      })
    } else if (serach.type.includes('自律奖励') && serach.type.includes('VIP奖励')) {
      this.getScoreRewardPayList(scores)
      this.getScoreRewardActList(scores)
    } else {
      this.getScoreRewardPayList(scores)
      this.getScoreRewardActList(scores)
    }
    this.setData({
      isScreen:false
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  }
})