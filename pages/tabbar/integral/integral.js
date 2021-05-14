// pages/integral/integral.js
const app = getApp();
var api = require('../../../utils/request.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    vipIntegral: 0,
    actionIntegral: 0,
    //筛选
    isScreen: false,
    inteTypeList: [{
      id: 1,
      inteName: '自律奖励',
      checked: false
    }, {
      id: 2,
      inteName: 'VIP奖励',
      checked: false
    }],
    // choose: -1,
    selfReword: [],
    VIPReword: [],
    typeValue: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getScoreTotalByPhone()
    //消费积分
    this.getScoreRewardPayList()
    //行为积分
    this.getScoreRewardActList()
    this.setData({
      navHeight: app.globalData.navHeight,
      navTop: app.globalData.navTop,
      menuRight:app.globalData.menuRight
    })
  },
  getValue: function (e) {
    // console.log(e,1)
    this.setData({
      typeValue: e.detail.value
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
  onReady: function () {},
  choosebg: function (e) {
    this.setData({
      choose: e.currentTarget.dataset.index
    })
  },
  filtrateData: function () {
    this.setData({
      isScreen: !this.data.isScreen
    })
  },
  preventTouchMove: function () {
    return;
  },
  onreset: function () {
    //清空
    for (var j = 0; j < inteList.length; j++) {
      inteList[j].checked = false
    }
    this.setData({
      isScreen: false,
      typeValue: '',
    })
  },
  onconfrim: function () {
    let inteList = this.data.inteTypeList;
    let newList = []
    for (let i = 0; i < inteList.length; i++) {
      if (inteList[i].checked) {
        newList.push(inteList[i].inteName)
      }
    }
    let scores = this.data.typeValue
    if (!scores && !scores.trim()) {
      scores = 0;
    }
    if (newList.includes('VIP奖励')) {
      this.getScoreRewardPayList(scores)
      let selfReword = [];
      this.setData({
        selfReword: selfReword
      })
    } else if (newList.includes('自律奖励')) {
      this.getScoreRewardActList(scores);
      let VIPReword = []
      this.setData({
        VIPReword: VIPReword
      })
    } else if (newList.includes('自律奖励') && newList.includes('VIP奖励')) {
      this.getScoreRewardPayList(scores)
      this.getScoreRewardActList(scores)
    } else {
      console.log('请至少选择一个');
      this.getScoreRewardPayList(scores)
      this.getScoreRewardActList(scores)
    }
    //消费积分
    // this.getScoreRewardPayList()
    //行为积分
    // this.getScoreRewardActList()
    //清空
    for (var j = 0; j < inteList.length; j++) {
      inteList[j].checked = false
    }
    this.setData({
      isScreen: false,
      typeValue: '',
      inteTypeList: inteList
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
      //console.log(res)
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
      console.log(res)

      //   let list = [];
      //   for(var i =0;i<list.length;i++){
      //      list.push({
      //   "SE_Name": "常规课。",
      //   "ActScore": "500",
      //   "SE_Logo": "http://47.111.150.151:8011/file/584/Card/2021/1620887280pgxqc584.jpg",
      //   "SE_ID": "3",
      //   "PrizeType": "2"
      // })
      // }
      that.setData({
        selfReword: res.data.data
      })
    })
  },
  //checkbox
  serviceValChange: function (e) {
    let list = this.data.inteTypeList
    let values = e.detail.value;
    for (let i = 0; i < list.length; i++) {
      list[i].checked = false
      for (let j = 0; j < values.length; j++) {
        if (list[i].inteName === values[j]) {
          list[i].checked = true
          break
        }
      }
    }
    this.setData({
      inteTypeList: list
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  //关闭
  close: function () {
    this.setData({
      isScreen: false
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