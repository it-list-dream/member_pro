// pages/my/my.js
const app = getApp();
var api = require('../../../utils/request.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    serviceList: [{
        id: 1,
        name: '预约日程',
        img: '/static/my/app_info.png',
        unreadyNum: 1
      },
      {
        id: 2,
        name: '我的订单',
        img: '/static/my/order.png'
      },
      {
        id: 3,
        name: '积分商城',
        img: '/static/my/integral.png'
      },
      {
        id: 4,
        name: '运动记录',
        img: '/static/my/recod.png'
      },
      {
        id: 5,
        name: '会员体测',
        img: '/static/my/test.png'
      },
      {
        id: 6,
        name: '收货地址',
        img: '/static/my/location.png'
      }
    ],
    //0表示既未绑定手机号码又未获取用户信息
    //1表示授权了用户信息，但未绑定手机号码
    //2 完成了登录流程
    loginStatus: 0,
    //会员卡数量
    myVipCardCount: 0,
    //私教课数量
    myCoachCount: 0,
    //充值金额
    rechargeMoney: 0,
    giveMoney: 0,
    //vip积分
    vipIntegral: 0,
    //行为积分
    actionIntegral: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      navHeight: app.globalData.navHeight,
      navTop: app.globalData.navTop,
    })
    // this.tranfromImage()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  lookRecord(e) {
    console.log(e.currentTarget.dataset.index)
    let index = e.currentTarget.dataset.index
    let path = '';
    switch (index) {
      case 0:
        path = '/page2/historyAppointment/historyAppointment'
        break;
      case 1:
        path = '/page2/order/order'
        break;
      case 2:
        path = '/pages/tabbar/integral/integral'
        break;
      case 3:
        path = "/pages/movementData/movementData"
        break;
      case 4:
        path = '/page2/smartDevice/smartDevice'
        break;
      case 5:
        path = '/page2/address/address'
        break
    }
    //console.log(path)
    if (path.trim()) {
      if (index == 2) {
        wx.switchTab({
          url: path,
        })
      } else {
        wx.navigateTo({
          url: path,
        })
      }
    }
  },
  edit: function () {
    let phone = wx.getStorageSync('phone');
    if (phone && phone !== '') {
      wx.navigateTo({
        url: '/page2/editProfile/editProfile',
      })
    }
  },
  vipCard: function () {
    //判断
    wx.navigateTo({
      url: '/page2/myVIPCard/myVIPCard',
    })
  },
  perCourse: function () {
    //判断
    wx.navigateTo({
      url: '/page2/myCourse/myCourse',
    })
  },
  message: function () {
    //判断
    wx.navigateTo({
      url: '/page2/inform/inform',
    })
  },
  storedMoney: function () {
    //判断
    wx.navigateTo({
      url: '/page2/myStored/myStored?reMoney=' + this.data.rechargeMoney + '&giveMoney=' + this.data.giveMoney,
    })
  },
  inteAwrad: function () {
    wx.navigateTo({
      url: '/page2/myIntegral/myIntegral?vipIntegral=' + this.data.vipIntegral + '&actionIntegral=' + this.data.actionIntegral,
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //用户状态
    this.getUserStatus();
    //
    //会员卡数量
    this.getMyAllCrad()
    //私教课数量
    this.getPersonalCount()
    //储值
    this.getMyUserMoney()
    //积分
    this.getScoreTotalByPhone();
  },
  getUserStatus: function () {
    //用户状态
    var status = wx.getStorageSync('loginStatus') || 0;
    console.log(status)
    //获取用户信息
    var info = wx.getStorageSync('userInfo');
    //获取用户的手机号码
    var phone = wx.getStorageSync('phone') || '';
    if (status == 1 || status == 2) {
      this.setData({
        loginStatus: status,
        info: JSON.parse(info),
        phone: phone
      })
    } else {
      this.setData({
        loginStatus: status
      })
    }
  },
  //会员卡的数量
  getMyAllCrad: function () {
    var that = this;
    api.request({
      url: "/MyAllVIPCard",
      data: {
        user_token: wx.getStorageSync('token')
      }
    }).then(res => {
      console.log(res)
      that.setData({
        myVipCardCount: res.data.cardCount
      })
    })
  },
  //私教课数量
  getPersonalCount: function () {
    var that = this
    api.request({
      url: "/MyCoachClassList",
      data: {
        user_token: wx.getStorageSync('token'),
        pageSize: 10,
        pageIndex: 1,
        UI_ID: wx.getStorageSync('UI_ID') || 0
      }
    }).then(res => {
      console.log(res)
      that.setData({
        myCoachCount: res.data.coachCount
      })
    })
  },
  //我的储值金额
  getMyUserMoney: function () {
    var that = this
    api.request({
      url: "/MyUserMoney",
      data: {
        user_token: wx.getStorageSync('token'),
        UI_ID: wx.getStorageSync('UI_ID') || 0
      }
    }).then(res => {
      console.log(res)
      if (res.data.code == 1) {
        that.setData({
          rechargeMoney: res.data.data[0].UI_Money,
          giveMoney: res.data.data[0].UI_SendMoney
        })
      }
    })
  },
  //我的积分
  getScoreTotalByPhone: function () {
    var that = this;
    api.request({
      url: "/ScoreTotalByPhone",
      data: {
        user_token: wx.getStorageSync('token')
      }
    }).then(res => {
      if (res.data.code == '1') {
        that.setData({
          vipIntegral: res.data.data[0].UI_Score,
          actionIntegral: res.data.data[0].UI_ActionScore
        })
      }
    })
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