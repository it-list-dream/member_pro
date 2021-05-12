const app = getApp()
var api = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    membership: ['张三'],
    m_index: 0,
    //支持门店
    supportStoreInfo: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      navHeight: app.globalData.navHeight,
      navTop: app.globalData.navTop,
      cardDetail: JSON.parse(options.card)
    })
    //console.log(111)
    this.getSupportStore();
    this.getAdviserListByBuy();
  },
  bindPickerChange(e) {
    console.log(e)
    this.setData({
      m_index: e.detail.value
    })
  },
  //支持的们门店
  getSupportStore: function () {
    var that = this;
    api.request({
      url: "/CardShareGymList",
      data: {
        user_token: wx.getStorageSync('token'),
        SC_ID: that.data.cardDetail.SC_ID
      }
    }).then(res => {
      console.log(res)
      let supportStore = res.data.data;
      let storeInfo = '';
      for (var i = 0; i < supportStore.length; i++) {
        storeInfo += supportStore[i].GB_Name;
        storeInfo += '  '
      }
      that.setData({
        supportStoreInfo: storeInfo
      })
    })
  },
  //会籍顾问
  getAdviserListByBuy: function () {
    var that = this;
    api.request({
      url: "/AdviserListByBuy",
      data: {
        user_token: wx.getStorageSync('token'),
        GB_ID: wx.getStorageSync('GB_ID')
      }
    }).then(res => {
      console.log(res)
      that.setData({
        membership: res.data.data
      })
    })
  },
  //购买
  paysuceess: function () {
    var that = this
    let phoneNumber = wx.getStorageSync('phone')
    if (phoneNumber && phoneNumber !== '') {
      api.request({
        url: "/OrderVipCard",
        data: {
          user_token: wx.getStorageSync('token'),
          GB_ID: wx.getStorageSync('GB_ID'),
          SC_ID: that.data.cardDetail.SC_ID,
          AdviserId: that.data.membership[that.data.m_index].AI_ID,
          UI_ID: wx.getStorageSync('UI_ID') || 0
        }
      }).then(res => {
        let businessNo = res.data.businessNo;
        console.log(businessNo)
        if (res.data.code == 1) {
          console.log(res)
          that.getpaydata(res.data.data[0].OrderNo, businessNo, res.data.data[0].MoneyShould)
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      })
    } else {
      wx.navigateTo({
        url: '/page2/login/login',
      })
    }

  },
  // 得到支付凭据
  getpaydata(order, businessNo, money) {
    var that = this
    wx.request({
      url: "https://shop.360ruyu.cn/api/gym/gym.asmx/GetPayDataApplet",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data: {
        UserOpenId: wx.getStorageSync("userOpenid"),
        out_trade_no: order,
        productId: "aa",
        body: "ss",
        attach: "df",
        sub_mch_id: businessNo,
        total_fee: money * 1
      },
      method: 'POST',
      success: function (res) {
        // 微信支付接口
        console.log(res)
        wx.requestPayment({
          'timeStamp': res.data.data[0].timeStamp,
          'nonceStr': res.data.data[0].nonceStr,
          'package': res.data.data[0].package,
          'signType': 'MD5',
          'paySign': res.data.data[0].paySign,
          'success': function (res) {
            that.ordersuccess(order)
            that.setData({
              'cardDetail.SaleCount': that.data.cardDetail.SaleCount + 1
            })
          },
          'fail': function (res) {
            wx.showToast({
              title: '支付失败，请重新支付',
              icon: "none"
            })
          },
          'complete': function (res) {}
        })
      },
      fail: function (res) {
        wx.showToast({
          title: '加载失败，请重试',
          icon: 'none'
        })
      },
    })
  },
  // 订单支付成功
  ordersuccess(orderNo) {
    var user = JSON.parse(wx.getStorageSync('userInfo'));
    var userInfo = {};
    userInfo.name = user.nickName;
    userInfo.sex = user.gender == 2 ? '女' : '男'
    console.log(userInfo)
    var that = this
    api.request({
      url: "/OrderVipCardSuccess",
      data: {
        user_token: wx.getStorageSync('token'),
        orderNo: orderNo,
        GB_ID: wx.getStorageSync('GB_ID'),
        userInfo: JSON.stringify(userInfo),
        UI_ID: wx.getStorageSync('UI_ID') || 0
      }
    }).then(res => {
      if (res.data.code == 1) {
        wx.showToast({
          title: '支付成功',
        })
      } else {
        wx.showToast({
          title: res.data.msg,
        })
      }
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})