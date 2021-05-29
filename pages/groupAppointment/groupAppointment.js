const app = getApp()
var api = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //是否免费
    isFree: true,
    payment: ['微信支付', '储值支付'],
    //选座
    chooseSeat: false,
    //选择座位的号码
    num: null,
    seatList: [],
    //是否预约
    isAppoinment: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      navHeight: app.globalData.navHeight,
      navTop: app.globalData.navTop,
      tclass: JSON.parse(options.tclass)
    })
    if (this.data.tclass.IsPickNumChk == 1) {
      this.getCardTogetherIsPickNum()
    }
  },
  handleSeat: function () {
    var that = this
    console.log(this.data.tclass.cantappointment)
    if (this.data.tclass.cantappointment == 0 && this.data.tclass.IsAppointment == 0) {
      wx.showToast({
        icon: "none",
        title: '报名时间未到',
      })
      return
    } else if (this.data.tclass.IsAppointment == 1) {
      wx.showToast({
        icon: "none",
        title: '你已经预约该课程',
      })
      return
    }
    //需要选座
    if (that.data.tclass.IsPickNumChk == 1) {
      this.setData({
        chooseSeat: true
      })
    } else {
      wx.showModal({
        title: '',
        content: '确定预约该课程',
        success(res) {
          if (res.confirm) {
            api.request({
              url: "/CardTogetherAppointment",
              data: {
                user_token: wx.getStorageSync('token'),
                UI_ID: wx.getStorageSync('UI_ID'),
                CTO_ID: that.data.tclass.CTO_ID,
                //座位号
                PickNum: 0
              }
            }).then(res => {
              if (res.data.code == 1) {
                that.setData({
                  'tclass.IsAppointment': 1
                })
                wx.navigateTo({
                  url: '/page2/suceess/suceess',
                })
              } else {
                wx.showToast({
                  icon: "none",
                  title: res.data.msg,
                })
              }
            })
          }
        }
      })
    }
  },
  // //条件
  // appoinmentChoose: function () {

  // },
  //关闭选座
  close: function () {
    this.setData({
      chooseSeat: false,
      num: null
    })
  },
  //选座
  getCardTogetherIsPickNum: function () {
    var that = this
    api.request({
      url: "/CardTogetherIsPickNum",
      data: {
        user_token: wx.getStorageSync('token'),
        CTO_ID: that.data.tclass.CTO_ID
      }
    }).then(res => {
      //console.log(res)
      that.setData({
        seatList: res.data.data
      })
    })
  },
  judgeSeatExist1: function () {
    wx.showToast({
      icon: "none",
      title: '该座位已被占用',
    })
  },
  judgeSeatExist2: function (e) {
    this.setData({
      num: e.currentTarget.dataset.index
    })
  },
  onconfirm: function () {
    var that = this;
    if (!that.data.num) {
      wx.showToast({
        icon: "none",
        title: '请选择座位',
      })
      return
    }
    if (that.data.tclass.CTO_Price > 0) {
      // that.payGroup();
      // console.log('付费')
      that.getCardTogetherIsPickNum();
      new Promise((resolve, reject) => {
        resolve()
      }).then(res => {
        that.payGroup();
      })
    } else {
      console.log('免费')
      wx.showModal({
        title: '',
        content: '确定预约该课程',
        success(res) {
          if (res.confirm) {
            api.request({
              url: "/CardTogetherAppointment",
              data: {
                user_token: wx.getStorageSync('token'),
                UI_ID: wx.getStorageSync('UI_ID'),
                CTO_ID: that.data.tclass.CTO_ID,
                //座位号
                PickNum: that.data.num
              }
            }).then(res => {
              console.log(res)
              if (res.data.code == 1) {
                that.setData({
                  num: null,
                  'tclass.IsAppointment': 1
                })
                wx.navigateTo({
                  url: '/page2/suceess/suceess',
                })
              } else {
                that.setData({
                  num: null,
                  chooseSeat: false
                })
                wx.showToast({
                  icon: "none",
                  title: res.data.msg,
                })
              }
            })
          }
        }
      })
    }


  },
  // 团课购买
  paygrounplesson() {
    var that = this
    if (that.data.tclass.IsAppointment == 1) {
      wx.showToast({
        icon: "none",
        title: '你已经参加过该课程',
      })
      return
    }
    if (parseInt(that.data.tclass.CTO_PeopleAttend) >= parseInt(that.data.tclass.CTO_PeopleFull)) {
      wx.showToast({
        title: '课程已售完',
        icon: 'none'
      })
    } else if (that.data.tclass.cantappointment == 0) {
      wx.showToast({
        title: '课程预约时间已过',
        icon: 'none'
      })
    } else {
      //分两种 有座和无座
      if (that.data.tclass.IsPickNumChk == 1) {
        that.setData({
          chooseSeat: true
        })
      } else {
        that.payGroup()
      }
    }
  },
  payGroup: function () {
    var that = this
    api.request({
      url: "/OrderGroupLesson",
      data: {
        user_token: wx.getStorageSync('token'),
        UI_ID: wx.getStorageSync('UI_ID') || 0,
        GB_ID: wx.getStorageSync('GB_ID'),
        CTO_ID: that.data.tclass.CTO_ID,
        PickNum: that.data.tclass.IsPickNumChk
      }
    }).then(res => {
      // console.log(res)
      if (res.data.code == 1) {
        that.getpaydata(res.data.data[0].OrderNo, res.data.businessNo, res.data.data[0].MoneyShould)
      }
    })
  },
  // 订单支付成功
  ordersuccess(num) {
    var that = this
    api.request({
      url: "/OrderGroupLessonSuccess",
      data: {
        user_token: wx.getStorageSync('token'),
        UI_ID: wx.getStorageSync('UI_ID') || 0,
        GB_ID: wx.getStorageSync('GB_ID'),
        orderNo: num
      }
    }).then(res => {
      if (res.data.code == 1) {
        api.request({
          url: "/CardTogetherAppointment",
          data: {
            user_token: wx.getStorageSync('token'),
            UI_ID: wx.getStorageSync('UI_ID'),
            CTO_ID: that.data.tclass.CTO_ID,
            //座位号
            PickNum: that.data.num || 0
          }
        }).then(res => {
          if (res.data.code == 1) {
            that.setData({
              num: null,
              chooseSeat: false,
              'tclass.IsAppointment': 1
            })
            wx.navigateTo({
              url: '/page2/suceess/suceess',
            })
          } else {
            that.setData({
              num: null,
              chooseSeat: false
            })
            wx.showToast({
              icon:"none",
              title: res.data.msg,
            })
          }
        })
        // wx.navigateTo({
        //   url: '/page2/suceess/suceess',
        // })
      } else {
        wx.showToast({
          title: res.data.msg,
        })
      }
    })
  },
  // 得到支付凭据
  getpaydata(order, businessNo, money) {
    console.log(order, businessNo, money)
    var that = this
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
              'tclass.SaleCount': Number(that.data.tclass.SaleCount) + 1
            })
          },
          'fail': function (res) {
            wx.showToast({
              title: '支付失败，请重新支付',
              icon: "none"
            })
            that.setData({
              chooseSeat: false,
              num: null
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
    this.setData({
      chooseSeat: false,
      num: null
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
})