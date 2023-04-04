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
    //默认
    type: "member_code",
    screenLight: 0.1,
    navBarTitle: "会员码"
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取卡信息
    var u = null;
    if (wx.getStorageSync('userInfo')) {
      u = JSON.parse(wx.getStorageSync('userInfo'))
    }
    this.setData({
      navHeight: app.globalData.navHeight,
      navTop: app.globalData.navTop,
      user: u,
      windowHeight:app.globalData.windowHeight
    });
    this.getScreenLight();
    this.getAllCard();
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
    this.setData({
      useCard: card,
      showchoose: false,
    })
    wx.setStorageSync('UI_ID', card.UI_ID);
    that.getQRCode();
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},
  getAllCard: function () {
    var that = this;
    let ui_id = wx.getStorageSync('UI_ID') || -1;
    let cardList = null,
      useCard = null;
    api.request({
      url: "/MyAllVIPCard",
      data: {
        user_token: wx.getStorageSync('token')
      }
    }).then(res => {
      if (res.data.cardCount > 0) {
        //如果没切换卡默认选中第一张卡
        cardList = res.data.data;
        if (ui_id && cardList.filter(c => c.UI_ID == ui_id).length > 0) {
          cardList.forEach(item => {
            if (item.UI_ID == ui_id) {
              useCard = item;
            }
          });
        } else {
          wx.setStorageSync('UI_ID', res.data.data[0].UI_ID)
          useCard = res.data.data[0];
        }
        let nowDate = new Date().getTime();
        cardList.forEach(item => {
          if (item.UI_FirstDate) {
            item.status = '已激活'
          } else if (item.UI_LastDate && new Date(item.UI_LastDate).getTime() < nowDate) {
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
 onReady(){
    this.getOpenWardQR();
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
        this.setData({
          navBarTitle: "",
          type: type
        });
      } else {
        this.getQRCode();
        this.setData({
          navBarTitle: "会员码",
          type: type
        });
      }
    }
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onUnload: function () {
    //设置屏幕亮度为原来亮度
    wx.setScreenBrightness({
      value: this.data.screenLight,
    })
  },
  onHide: function () {
    wx.setScreenBrightness({
      value: this.data.screenLight,
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getQRCode(() => {
      wx.stopPullDownRefresh();
    });
  },
  //开柜码
  getOpenWardQR() {
    api.request({
      url: "/OpenWardQR",
      data: {
        token: wx.getStorageSync('token')
      }
    }).then(res => {
      if (res.statusCode == 200) {
        let qrcode = new QRCode('openCode', {
          text: res.data, // 二维码内容
          width: 160, // 二维码宽度
          height: 160, // 二维码高度
          colorDark: "#000000", // 二维码颜色
          colorLight: "#ffffff", // 二维码背景色
          correctLevel: QRCode.CorrectLevel.L // 二维码容错级别
        });
      }
    })
  },
  getScreenLight() {
    var that = this;
    wx.getScreenBrightness({
      success: function (e) {
        that.setData({
          screenLight: parseFloat(e.value).toFixed(1)
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
    console.log('屏幕的亮度:', this.data.screenLight)
    //设置屏幕亮度
    wx.setScreenBrightness({
      value: 1, //屏幕亮度值，范围 0~1，0 最暗，1 最亮
    })
  }
})