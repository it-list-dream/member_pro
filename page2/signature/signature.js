import SignaturePad from '../../utils/signature_pad.js'
let signaturePad = {};
let pix = 7;
let penColor = 'black';
let lineWidth = 1.4;
const app = getApp();
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    penColor: 'black',
    lineWidth: 0.6,
    isEmpty: true
  },

  onLoad: function (options) {
    var ctx = wx.createCanvasContext('handWriting');
    const data = {
      devicePixelRatio: app.globalData.pixelRatio,
    };
    signaturePad = new SignaturePad(ctx, data);
    // console.info(ctx, SignaturePad);
    this.setData({
      navHeight: app.globalData.navHeight,
      canvasWidth: app.globalData.windowWidth,
      canvasHeight: app.globalData.windowHeight
    })
  },
  uploadScaleStart(e) {
    const item = {
      penColor: penColor,
      lineWidth: lineWidth
    };
    signaturePad._handleTouchStart(e, item);
  },
  uploadScaleMove(e) {
    signaturePad._handleTouchMove(e);
  },
  uploadScaleEnd: function (e) {
    signaturePad._handleTouchEnd(e);
    const isEmpty = signaturePad.isEmpty();
    this.setData({
      isEmpty: isEmpty
    })
  },
  retDraw: function () {
    signaturePad.clear();
    const isEmpty = signaturePad.isEmpty();
    this.setData({
      isEmpty: isEmpty
    })
  },
  //保存canvas图像
  subCanvas: function () {
    var that = this;
    if (this.data.isEmpty) {
      wx.showToast({
        icon: "none",
        title: "签字是空白的,没有签字"
      })
      return false
    }
    wx.canvasToTempFilePath({
      canvasId: 'handWriting',
      destWidth: that.data.width * app.globalData.pixelRatio,
      destHeight: that.data.height * app.globalData.pixelRatio,
      success: function (result) {
        //console.log(result.tempFilePath)
        util.uploadImage('/ReceiveFiles', result.tempFilePath, 'sign', {
          'GB_ID': wx.getStorageSync('GB_ID')
        }).then(res => {
          wx.redirectTo({
            url: `/page2/contractDetail/contractDetail?signUrl=${result.tempFilePath}&signingState=1&fileId=${res.filesid}`,
          });
        });
        // wx.redirectTo({
        //   url: `/page2/contractDetail/contractDetail?signUrl=${result.tempFilePath}&signingState=1&fileId=257`,
        // });
      },
      fail: function (res) {
        // console.log(res)
        wx.showToast({
          icon: "none",
          title: '图片保存失败'
        })
      }
    })
  }
})