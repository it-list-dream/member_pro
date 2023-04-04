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
        img: '/static/my/appointment.png',
        serviceUrl: '/page2/historyAppointment/historyAppointment',
        unreadyNum: 1
      },
      {
        id: 2,
        name: '我的订单',
        img: '/static/my/order.png',
        serviceUrl: '/page2/order/order',
      },
      {
        id: 3,
        name: '积分商城',
        img: '/static/my/jifen.png',
        serviceUrl: '/pages/tabbar/integral/integral'
      },
      {
        id: 4,
        name: '运动记录',
        img: '/static/my/record.png',
        serviceUrl: '/pages/movementData/movementData'
      },
      {
        id: 5,
        name: '会员体测',
        img: '/static/my/test.png',
        serviceUrl: "/page2/smartDevice/smartDevice"
      },
      {
        id: 6,
        name: '电子合同',
        img: '/static/my/contract.png',
        serviceUrl: "/page2/contractList/contractList"
      }
    ],
    //0 1 2 
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
    actionIntegral: 0,
    unLoginUrl:'https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      navHeight: app.globalData.navHeight,
      navTop: app.globalData.navTop,
      menuRight: app.globalData.menuRight,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  lookRecord(e) {
    let phoneNumber = wx.getStorageSync('phone')
    let path = e.currentTarget.dataset.path;
    let index = e.currentTarget.dataset.index
    if (!phoneNumber && phoneNumber == '' && index !== 2) {
      wx.navigateTo({
        url: '/page2/login/login',
      })
      return
    }
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
    } else {
      wx.showToast({
        icon: "none",
        title: '你还未登录，请先登录！',
      })
    }
  },
  login(){
     wx.navigateTo({
       url: '/page2/login/login',
     })
  },
  vipCard: function () {
    let phone = wx.getStorageSync('phone')
    if (phone && phone !== '') {
      //判断
      wx.navigateTo({
        url: '/page2/myVIPCard/myVIPCard',
      })
    } else {
      wx.navigateTo({
        url: '/page2/login/login',
      })
    }
  },
  perCourse: function () {
    let phone = wx.getStorageSync('phone')
    if (phone && phone !== '') {
      //判断
      wx.navigateTo({
        url: '/page2/myCourse/myCourse',
      })
    } else {
      wx.navigateTo({
        url: '/page2/login/login',
      })
    }
  },
  // message: function () {
  //   //判断
  //   wx.navigateTo({
  //     url: '/page2/inform/inform',
  //   })
  // },
  storedMoney: function () {
    let phone = wx.getStorageSync('phone')
    if (phone && phone !== '') {
      wx.navigateTo({
        url: '/page2/myStored/myStored?reMoney=' + this.data.rechargeMoney + '&giveMoney=' + this.data.giveMoney,
      })
    } else {
      wx.navigateTo({
        url: '/page2/login/login',
      })
    }
  },
  inteAwrad: function (e) {
    //console.log(e.currentTarget.dataset.index)
    // let index = e.currentTarget.dataset.index;
    // let types = '';
    let phone = wx.getStorageSync('phone')
    if (!phone && phone == '') {
      wx.navigateTo({
        url: '/page2/login/login',
      })
      return
    }
    //vip action
    // if (index == 0) {
    //   types = 'vip'
    // } else {
    //   types = 'action'
    // }
    wx.navigateTo({
      url: '/page2/myIntegral/myIntegral?vipIntegral=' + this.data.vipIntegral + '&actionIntegral=' + this.data.actionIntegral,
    })
    // + '&types=' + types
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
    //获取用户信息
    var info = wx.getStorageSync('userInfo') || '';
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
        loginStatus: status,
        info: null,
        phone: ''
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
      if (res.data.code == 1) {
        that.setData({
          myVipCardCount: res.data.cardCount
        })
      } else {
        that.setData({
          myVipCardCount: 0
        })
      }

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
      if (res.data.code == 1) {
        that.setData({
          myCoachCount: res.data.coachCount
        })
      } else {
        that.setData({
          myCoachCount: 0
        })
      }
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
      // console.log(res)
      if (res.data.code == 1 && res.data.data.length > 0) {
        that.setData({
          rechargeMoney: res.data.data[0].UI_Money,
          giveMoney: res.data.data[0].UI_SendMoney
        })
      } else {
        that.setData({
          rechargeMoney: 0,
          giveMoney: 0
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
      if (res.data.code == 1 && res.data.data.length > 0) {
        that.setData({
          vipIntegral: res.data.data[0].UI_Score,
          actionIntegral: res.data.data[0].UI_ActionScore
        })
      } else {
        that.setData({
          vipIntegral: 0,
          actionIntegral: 0
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
})