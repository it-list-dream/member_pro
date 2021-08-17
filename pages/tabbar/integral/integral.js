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
    typeValue: '',
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
  getValue: function (e) {
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
      if (res.data.code == 1 && res.data.data.length>0) {
        that.setData({
          vipIntegral: res.data.data[0].UI_Score,
          actionIntegral: res.data.data[0].UI_ActionScore
        })
        // app.globalData.UI_Score = res.data.data[0].UI_Score;
        // app.globalData.UI_ActionScore = res.data.data[0].UI_ActionScore
      }
    })
  },
  //积分账单
  // pointsBill: function () {
  //   let phone = wx.getStorageSync('phone')
  //   if (phone && phone !== '') {
  //     wx.navigateTo({
  //       url: '/page2/myIntegral/myIntegral?vipIntegral=' + this.data.vipIntegral + '&actionIntegral=' + this.data.actionIntegral,
  //     })
  //   }
  // },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},
  choosebg: function (e) {
    this.setData({
      choose: e.currentTarget.dataset.index
    })
  },
  onPopup: function () {
    this.setData({
      isScreen: !this.data.isScreen
    })
  },
  preventTouchMove: function () {
    return;
  },
  onreset: function () {
    let inteList = this.data.inteTypeList;
    //清空
    for (var j = 0; j < inteList.length; j++) {
      inteList[j].checked = false
    }
    this.setData({
      typeValue: '',
      inteTypeList: inteList
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
    if (newList.includes('VIP奖励') && newList.length == 1) {
     // console.log(1)
      this.getScoreRewardPayList(scores)
      let selfReword = [];
      this.setData({
        selfReword: selfReword
      })
    } else if (newList.includes('自律奖励') && newList.length == 1) {
      //console.log(2)
      this.getScoreRewardActList(scores);
      let VIPReword = []
      this.setData({
        VIPReword: VIPReword
      })
    } else if (newList.includes('自律奖励') && newList.includes('VIP奖励')) {
      //console.log(3)
      this.getScoreRewardPayList(scores)
      this.getScoreRewardActList(scores)
    } else {
     // console.log('请至少选择一个');
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
  //关闭
  close: function () {
    this.setData({
      isScreen: false
    })
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
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  }
})