const app = getApp()
var api = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coachList: [],
    payNum: 1,
    priceTotal: 0,
    personal: null,
    chooseNum: 0,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //  console.log(JSON.parse(options.course1))
    this.getCoachStyleList()
    let o = JSON.parse(options.course1);
    if (options.course1) {
      this.setData({
        personal: o,
        priceTotal: o.OnlinePrice
      })
    }
    this.setData({
      navHeight: app.globalData.navHeight,
      navTop: app.globalData.navTop
    })
  },
  reduce() {
    var num = this.data.payNum > 0 ? this.data.payNum - 1 : 0;
    num = num == 0 ? 1 : num;
    //每节课的单价
    var price = this.data.personal.OnlinePrice;
    var total = num * price
    this.setData({
      payNum: num,
      priceTotal: total
    })
  },
  addnum() {
    var num = this.data.payNum + 1
    var price = this.data.personal.OnlinePrice;
    var total = num * price
    this.setData({
      payNum: num,
      priceTotal: total
    })
  },
  getCoachStyleList: function () {
    var that = this
    api.request({
      url: "/CoachStyleList",
      data: {
        user_token: wx.getStorageSync('token'),
        GB_ID: wx.getStorageSync('GB_ID')
      }
    }).then(res => {
      console.log(res)
      that.setData({
        coachList: res.data.data
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  chooseCoach: function (e) {
    this.setData({
      chooseNum: e.currentTarget.dataset.index
    })
  },
  // 购买下单
   // 购买下单
   paysuccess() {
    var that = this
    //判断是否买了会员卡 是否手登录
    let ui_id = Number(wx.getStorageSync('UI_ID'));
    let phone = wx.getStorageSync('phone')
    if (ui_id > 0 && phone && phone !== '') {
      api.request({
        url: "/OrderCoachLesson",
        data: {
          user_token: wx.getStorageSync('token'),
          UI_ID: ui_id,
          GB_ID: wx.getStorageSync('GB_ID'),
          CP_ID: that.data.personal.CP_ID,
          Num: that.data.payNum,
          CoachID: that.data.coachList[that.data.chooseNum].FK_AL_TeachCoach_ID
        }
      }).then(res => {
        console.log(res)
        if (res.data.code == 1) {
          that.getpaydata(res.data.data[0].OrderNo, res.data.businessNo, res.data.data[0].MoneyShould)
          console.log(res)
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      })
    } else {
      wx.showToast({
        icon:'none',
        title: '您还未登录或您还没有买卡',
      })
      
    }
  },
  getpaydata(order, businessNo, money) {
    var that = this
    console.log(order,businessNo,money)
    wx.request({
      url: "https://shop.360ruyu.cn/api/gym/gym.asmx/GetPayDataAppletV2",
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
        total_fee: money * 100
      },
      method: 'POST',
      success: function (res) {
        // 微信支付接口
        wx.requestPayment({
          'timeStamp': res.data.data[0].timeStamp,
          'nonceStr': res.data.data[0].nonceStr,
          'package': res.data.data[0].package,
          'signType': 'MD5',
          'paySign': res.data.data[0].paySign,
          'success': function (res) {
            that.ordersuccess(order)
            that.setData({
              'personal.SaleCount': that.data.personal.SaleCount + 1
            })
          },
          'fail': function (res) {
            wx.showToast({
              title: '支付失败，请重新支付',
              icon: 'none'
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
  ordersuccess: function (orderNo) {
    var that = this
    api.request({
      url: "/OrderCoachLessonSuccess",
      data: {
        UI_ID: wx.getStorageSync('UI_ID'),
        GB_ID: wx.getStorageSync('GB_ID'),
        user_token: wx.getStorageSync('token'),
        orderNo: orderNo
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