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
    isAppoinment: true,
    //是否禁用
    isDisabled: true
    //支付
    // checkPay: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(9999,options.tclass)
    if (options.tclass && options.tclass !== '') {
      var tclass = JSON.parse(options.tclass)
      console.log(tclass)
      this.setData({
        tclass: tclass
      })
    }
    this.setData({
      navHeight: app.globalData.navHeight,
      navTop: app.globalData.navTop,
    })
    if (options.sign && options.sign !== '') {
      api.request({
        url: "/GetUrlBySign",
        data: {
          sign: options.sign
        }
      }).then(res => {
        if (res.data.code == 1) {
          if (!wx.getStorageSync('token')) {
            wx.setStorageSync('token', res.data.user_token);
            //保存品牌名
            wx.setStorageSync('GymName', res.data.GymName);
            //保存门店的id
            wx.setStorageSync('GB_ID', options.GB_ID);
          }
          var that = this
          api.request({
            url: "/CardTogetherById",
            data: {
              user_token: wx.getStorageSync('token'),
              CTO_ID: options.CTO_ID
            }
          }).then(res => {
            //  console.log(res)
            if (res.data.code == 1 && res.data.data.length > 0) {
              let tuanke = res.data.data[0];
              that.setData({
                tclass: tuanke
              })
              //判断当前的团课是否已经过期
              //  let time1 = Date.parse(tuanke.CTO_SignUpEndDate);
              let time1 = new Date(tuanke.CTO_SignUpEndDate).getTime();
              let nowTime = new Date().getTime();
              // console.log(tim1>nowTime)
              if (time1 > nowTime) {
                that.setData({
                  'tclass.cantappointment': 1
                })
              } else {
                that.setData({
                  'tclass.cantappointment': 0
                })
              }
              if (this.data.tclass.IsPickNumChk == 1) {
                this.getCardTogetherIsPickNum()
              }
            } else {
              wx.switchTab({
                url: '/pages/tabbar/home/home'
              })
            }
          })
        }
      })
    } else {
      if (this.data.tclass.IsPickNumChk == 1) {
        this.getCardTogetherIsPickNum()
      }
    }
    //倒计时
    if (this.data.tclass.CTO_SignUpStart) {
      //console.log('111')
      this.countTime();
    } else {
      this.setData({
        isDisabled: false
      })
    }
  },
  countTime() {
    var that = this;
    var now = new Date().getTime();
    console.log(new Date())
    var endDate = new Date(that.data.tclass.CTO_SignUpStart.replace(/-/g, '/')); //设置截止时间
    var end = endDate.getTime();
    var leftTime = end - now; //时间差      
    var s;
    if (leftTime >= 0) {
      s = Math.floor(leftTime / 1000);
      s = s < 10 ? "0" + s : s;
      if (s <= 60) {
        that.setData({
          countdown: s,
          isDisabled: false
        })
      }
      this.timer = setTimeout(that.countTime, 1000);
    } else {
      // console.log('已开始')
      that.setData({
        isDisabled: false
      })
    }

  },
  handleSeat: function () {
    var that = this
    if (this.data.countdown && parseInt(this.data.countdown) > 0) {
      return;
    }
    // console.log(this.data.tclass.cantappointment)
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
    } else if (this.data.tclass.CTO_PeopleAttend == this.data.tclass.CTO_PeopleFull) {
      wx.showToast({
        icon: "none",
        title: '该团课报名人数已满',
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
                  'tclass.IsAppointment': 1,
                  'tclass.CTO_PeopleAttend': Number(that.data.tclass.CTO_PeopleAttend) + 1
                })
                wx.navigateTo({
                  url: '/page2/suceess/suceess?CTO_ID=' + that.data.tclass.CTO_ID,
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
  //关闭选座
  close: function () {
    this.setData({
      chooseSeat: false,
      num: null
    })
  },
  //选座
  getCardTogetherIsPickNum: function (res) {
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
      // console.log(typeof res)
      // if(res && typeof res == 'function'){
      //   res();
      // }
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
      // that.getCardTogetherIsPickNum();
      // new Promise((resolve, reject) => {
      //   resolve()
      // }).then(res => {

      // })
      that.payGroup();
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
              // console.log(res)
              if (res.data.code == 1) {
                that.setData({
                  num: null,
                  'tclass.IsAppointment': 1,
                  'tclass.CTO_PeopleAttend': Number(that.data.tclass.CTO_PeopleAttend) + 1
                })
                wx.navigateTo({
                  url: '/page2/suceess/suceess?CTO_ID=' + that.data.tclass.CTO_ID + '&isShow=0',
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
    if (this.data.countdown && parseInt(this.data.countdown) > 0) {
      return;
    }
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
      });
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
        console.log('wuzuo')
        that.payGroup()
      }
    }
  },
  payGroup: function () {
    var that = this
    wx.showLoading({
      title: '支付中...',
      mask: true
    });
    api.request({
      url: "/OrderGroupLesson",
      data: {
        user_token: wx.getStorageSync('token'),
        UI_ID: wx.getStorageSync('UI_ID') || 0,
        GB_ID: wx.getStorageSync('GB_ID'),
        CTO_ID: that.data.tclass.CTO_ID,
        PickNum: that.data.num || 0
      }
    }).then(res => {
      if (res.data.code == 1) {
        that.getpaydata(res.data.data[0].OrderNo, res.data.businessNo, res.data.data[0].WxPrice)
      } else {
        wx.hideLoading()
        wx.showToast({
          icon: 'none',
          title: res.data.msg,
        })
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
        wx.hideLoading();
        //支付成功，预约成功
        that.setData({
          'tclass.IsAppointment': 1,
          'tclass.CTO_PeopleAttend': Number(that.data.tclass.CTO_PeopleAttend) + 1
        })
        wx.navigateTo({
          url: '/page2/suceess/suceess?CTO_ID=' + that.data.tclass.CTO_ID + '&isShow=0',
        })
      } else {
        wx.hideLoading();
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
        total_fee: money
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
            console.log('支付成功')
            that.ordersuccess(order)
            that.setData({
              'tclass.SaleCount': Number(that.data.tclass.SaleCount) + 1
            })
          },
          'fail': function (res) {
            wx.hideLoading();
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
        wx.hideLoading();
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
    clearTimeout(this.timer);
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
})