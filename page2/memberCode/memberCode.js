// var server = require("../../utils/server.js")
var QRCode = require('../../utils/weapp-qrcode.js')
const app = getApp()
const api = require('../../utils/request.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    card_list: [],
    showchoose: false,
    useCard: null,
    // 存储定时器
    setInter: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取卡信息
    this.getAllCard();
    var u = null;
    if (wx.getStorageSync('userInfo')) {
      u = JSON.parse(wx.getStorageSync('userInfo'))
    }
    this.setData({
      navHeight: app.globalData.navHeight,
      navTop: app.globalData.navTop,
      user: u
    })
  },

  close() {
    this.setData({
      showchoose: false
    })
  },
  //返回
  _navBack() {
    wx.navigateBack({
      delta: 1
    })
  },
  showModel: function () {
    this.setData({
      showchoose: !this.data.showchoose
    })
  },
  chooseCard: function (e) {
    var that = this
    // console.log(e.currentTarget.dataset.choose)
    let card = e.currentTarget.dataset.choose
    this.setData({
      useCard: card,
      showchoose: false
    })
    //console.log('换卡')
    wx.setStorageSync('UI_ID', card.UI_ID)
    that.getQRCode();
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getAllCard: function () {
    var that = this
    api.request({
      url: "/MyAllVIPCard",
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        user_token: wx.getStorageSync('token')
      }
    }).then(res => {
      console.log(res)
      //如果没卡就不显示任何数据
      if (res.data.cardCount > 0) {
        //如果没切换卡默认选中第一张卡
        if (!that.data.useCard) {
          this.setData({
            cardCount: res.data.cardCount,
            card_list: res.data.data,
            useCard: res.data.data[0]
          })
          wx.setStorageSync('UI_ID', res.data.data[0].UI_ID)
        }
        that.getQRCode();
      }

    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  //二维码
  getQRCode: function () {
    api.request({
      url: '/GenerateQRCode',
      data: {
        user_token: wx.getStorageSync('token'),
        UI_ID: this.data.useCard.UI_ID
      }
    }).then(res => {
     // console.log(res)
      if (res.data.code == '1') {
        new QRCode('canvas', {
          text: res.data.data[0].QRCode,
          width: 160,
          height: 160,
          colorDark: "#000000",
          colorLight: "#ffffff",
          correctLevel: QRCode.CorrectLevel.H,
        });
      }
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.onLoad();
    wx.stopPullDownRefresh()
  },
})