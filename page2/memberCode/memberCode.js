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
    //卡数量
    cardCount: 0,
    //刷新
    // isRefreshing: true,
    //动画
    // pull: {
    //   isLoading: false,
    //   loading: '/static/animation.gif',
    //   pullText: '正在刷新'
    // },
    //显示二维码
    // showCode: false,
    //默认
    type: "member_code"
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取卡信息
    // this.getAllCard();
    var u = null;
    if (wx.getStorageSync('userInfo')) {
      u = JSON.parse(wx.getStorageSync('userInfo'))
    }
    this.setData({
      navHeight: app.globalData.navHeight,
      navTop: app.globalData.navTop,
      user: u
    })
    this.getScreenLight()
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
    let card = e.currentTarget.dataset.choose
    // console.log(card)
    this.setData({
      useCard: card,
      showchoose: false,
      // showCode: false
    })
    wx.setStorageSync('UI_ID', card.UI_ID)
    that.getQRCode();
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getAllCard: function () {
    var that = this;
    let ui_id = wx.getStorageSync('UI_ID');
    let cardList = null;
    let useCard = null;
    api.request({
      url: "/MyAllVIPCard",
      method: 'POST',
      data: {
        user_token: wx.getStorageSync('token')
      }
    }).then(res => {
      if (res.data.cardCount > 0) {
        //如果没切换卡默认选中第一张卡
        cardList = res.data.data;
        if (ui_id) {
          cardList.forEach(item => {
            if (item.UI_ID == ui_id) {
              useCard = item;
            }
          })
        } else {
          wx.setStorageSync('UI_ID', res.data.data[0].UI_ID)
          useCard = res.data.data[0];
        }
        let nowDate = new Date().getDate();
        cardList.forEach(item => {
          if (item.UI_FirstDate) {
            item.status = '已激活'
          } else if (item.UI_LastDate && new Date(item.UI_LastDate).getDate()  < nowDate) {
            item.status = '已过期'
          } else {
            item.status = '未激活'
          }
        })
        this.setData({
          cardCount: res.data.cardCount,
          card_list: cardList,
          useCard: useCard
        })
        that.getQRCode();
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getAllCard();
  },
  //二维码
  getQRCode: function (fn) {
    var that = this
    let UI_ID = this.data.useCard ? this.data.useCard.UI_ID : 0;
    api.request({
      url: '/GenerateQRCode',
      data: {
        user_token: wx.getStorageSync('token'),
        UI_ID: UI_ID
      }
    }).then(res => {
      if (res.data.code == 1) {
        console.log('二维码已经刷新了!')
        if (!this.qrcode) {
          this.qrcode = new QRCode('canvas', {
            text: res.data.data[0].QRCode,
            width: 160,
            height: 160,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H,
          });
        } else {
          //this.qrcode.clear();
          this.qrcode.makeCode(res.data.data[0].QRCode)
        }
      }
      if (fn && typeof fn == 'function') {
        fn()
      }
    })
  },
  cutCode(e) {
    let type = e.currentTarget.dataset.type
    if (type == this.data.type) {
      return;
    } else {
      if (type == 'unlocking') {
        this.getOpenWardQR();
      } else {
        this.getQRCode();
      }
      this.setData({
        type: type
      })
    }
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onUnload: function () {
    this.setScreenLight(this.data.screenLight);
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getQRCode(() => {
      wx.stopPullDownRefresh();
    });
    // this.onLoad();
  },
  //开柜码
  getOpenWardQR() {
    api.request({
      url: "/OpenWardQR",
      data: {
        token: wx.getStorageSync('token')
      }
    }).then(res => {
      if (!this.lockingCode) {
        this.lockingCode = new QRCode('canvas_code', {
          text: res.data,
          width: 160,
          height: 160,
          colorDark: "#000000",
          colorLight: "#ffffff",
          correctLevel: QRCode.CorrectLevel.H,
        });
      } else {
        // console.log('再次刷新二维码了')
        this.lockingCode.makeCode(res.data)
      }
    })

  },
  getScreenLight() {
    var that = this;
    wx.getScreenBrightness({
      success: function (e) {
        that.setData({
          screenLight: e.value
        })
        that.setScreenLight(1);
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  setScreenLight(value) {
    wx.setScreenBrightness({
      value: value
    })
  }
})