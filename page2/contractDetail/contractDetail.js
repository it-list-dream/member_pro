const app = getApp();
const api = require('../../utils/request.js')
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    contract: null,
    //签字的状态
    signingState: 0,
    //签字的内容
    signWriteUrl: "",
    fileId: "",
    signDate: '',
    //确定签署
    isSigning: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var signWriteUrl = "",
      signingState = 0,
      fileId = '',
      signDate = '';
    if (options.signDate && options.signWriteUrl) {
      signDate = util.format(options.signDate, 'yyyy-mm-dd');
      signWriteUrl = options.signWriteUrl
    }
    if (options.signingState && options.signUrl && options.fileId) {
      signWriteUrl = options.signUrl;
      signingState = options.signingState;
      fileId = options.fileId;
    }
    //isSigning
    this.setData({
      navHeight: app.globalData.navHeight,
      navTop: app.globalData.navTop,
      signWriteUrl,
      signingState,
      fileId,
      signDate,
      isSigning: app.globalData.isSigning
    });
    this.getContract();
  },
  getContract() {
    console.log('合同编号:',app.globalData.PayMoneyID)
    api.request({
      url: "/SearchContractByID",
      data: {
        user_token: wx.getStorageSync('token'),
        GB_ID: wx.getStorageSync('GB_ID'),
        PayMoneyID: app.globalData.PayMoneyID
      }
    }).then(res => {
      //console.log(typeof res.data.data.UP_EndDate,typeof res.data.data.UP_StartDate)
      this.setData({
        contract: res.data.data
      })
    });
  },
  onlineSign() {
    // wx.navigateTo({
    //   url: '/page2/contractSign/contractSign',
    // })
    wx.navigateTo({
      url: '/page2/signature/signature',
    });
  },
  submitSign() {
    //会员签署合同JSON1:{"SC_ID":5,"PayMoneyID":4567,"UserSignId":5}
    var jsonStr = {
      SC_ID: this.data.contract.SC_ID,
      PayMoneyID: app.globalData.PayMoneyID,
      UserSignId: this.data.fileId
    };
    api.request({
      url: "/ContractSign",
      data: {
        user_token: wx.getStorageSync('token'),
        json1: JSON.stringify(jsonStr)
      }
    }).then(res => {
      //完成
      if (res.data.code == 1) {
        wx.showToast({
          title: '签署成功',
          icon: "none"
        });
      }
      setTimeout(() => {
        wx.navigateBack({
          delta: 2
        });
      }, 1500)
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  }
})