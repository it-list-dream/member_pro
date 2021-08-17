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
    supportStoreInfo: '',
    //支付
    // checkPay: true
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('19', options)
    var that = this
    if (options.card && options.card !== '') {
      this.setData({
        cardDetail: JSON.parse(options.card)
      })
    }
    this.setData({
      navHeight: app.globalData.navHeight,
      navTop: app.globalData.navTop,
    });
    if (options.sign && options.GB_ID && options.SC_ID) {
      console.log('31------', options.sign)
      console.log('通过分享页面进来的')
      var user_token = wx.getStorageSync('token');
      //别人通过分享的链接进去
      api.request({
        url: "/GetUrlBySign",
        data: {
          sign: options.sign
        }
      }).then(res => {
        if (res.data.code == 1) {
          console.log('47', res)
          if (user_token) {
            //门店信息
            that.getCardInfoByID(options.GB_ID, options.SC_ID);
            //获取会籍信息
            that.getAdviserListByBuy(options.SC_ID);
          } else {
            wx.setStorageSync('token', res.data.user_token)
            //保存品牌名
            wx.setStorageSync('GymName', res.data.GymName);
            //保存门店的id
            wx.setStorageSync('GB_ID', options.GB_ID);
            //门店信息
            that.getCardInfoByID(options.GB_ID, options.SC_ID);
            //获取会籍信息
            that.getAdviserListByBuy(options.SC_ID);
          }
        }
      })
    } else {
      console.log('不是通过分享页面进来的')
      //获取支持的门店
      this.getSupportStore();
      this.getAdviserListByBuy();
    }
  },
  //活动卡详情
  getCardInfoByID: function (gb_id, sc_id) {
    console.log('60-----', gb_id, sc_id)
    var that = this
    api.request({
      url: "/CardInfoByID",
      data: {
        user_token: wx.getStorageSync('token'),
        GB_ID: gb_id,
        SC_ID: sc_id
      }
    }).then(res => {
      if (res.data.code == 1) {
        console.log('71' + res)
        that.setData({
          cardDetail: res.data.data[0],
          supportStoreInfo: res.data.data[0].GB_Name
        })
      }
    })
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
      console.log('95' + res)
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
  getAdviserListByBuy: function (id) {
    console.log('109-------', id)
    var gb_id = wx.getStorageSync('GB_ID') || id;
    api.request({
      url: "/AdviserListByBuy",
      data: {
        user_token: wx.getStorageSync('token'),
        GB_ID: gb_id 
      }
    }).then(res => {
       console.log('123', res)
      if (res.data.code == 1) {
        this.setData({
          membership: res.data.data
        })
      }
    })
  },
  //购买
  paysuceess: function () {
    var that = this
    let phoneNumber = wx.getStorageSync('phone')
    if (phoneNumber && phoneNumber !== '') {
      wx.showLoading({
        title: '加载中...',
        mask: true
      })
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
        if (res.data.code == 1) {
          //  console.log(res)
          that.getpaydata(res.data.data[0].OrderNo, businessNo, res.data.data[0].WxPrice)
        } else {
          wx.hideLoading()
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
            that.ordersuccess(order)
            that.setData({
              'cardDetail.SaleCount': Number(that.data.cardDetail.SaleCount) + 1
            })
          },
          'fail': function (res) {
            wx.hideLoading()
            wx.showToast({
              title: '支付失败，请重新支付',
              icon: "none"
            })
          },
          'complete': function (res) {}
        })
      },
      fail: function (res) {
        wx.hideLoading()
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
        wx.hideLoading()
        wx.navigateTo({
          url: '/page2/suceess/suceess?isShow=3&sc_id=' + that.data.cardDetail.SC_ID,
        })
      } else {
        wx.hideLoading()
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
  onShareAppMessage: function (res) {
    // wx.showShareMenu({
    //   withShareTicket: true,
    //   menu: ['shareAppMessage', 'shareTimeline']
    // })
    var GB_ID = wx.getStorageSync('GB_ID');
    var SC_ID = this.data.cardDetail.SC_ID;
    var sign = wx.getStorageSync('UrlBySign')
    var pathUrl = '/pages/activeDetail/activeDetail?sign=' + sign + '&GB_ID=' + GB_ID + '&SC_ID=' + SC_ID
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '活动卡详情',
      path: pathUrl,
    }
  }
})