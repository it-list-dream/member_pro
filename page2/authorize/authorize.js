const app = getApp();
var api = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navHeight: 0,
    navTop: 0,
    isRealname: true,
    authFlowId: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.sign = options.sign;
    this.type = options.type;
    //console.log(options.sign)
    this.setData({
      navHeight: app.globalData.navHeight,
      navTop: app.globalData.navTop,
    });
    this.getEsignIdentity();
  },
  getEsignIdentity() {
    api.request({
      url: "/eSignWxMiniUserIdentity",
      data: {
        user_token: wx.getStorageSync('token')
      }
    }).then(res => {
      //console.log(res.data.data)
      console.log(res.data.data.authFlowId)
      if (res.data.data.authorizeUserInfo) {
        this.setData({
          isRealname: true
        });
      } else {
        this.setData({
          isRealname: false,
          authFlowId: res.data.data.authFlowId
        });
      }
    })
  },
  goIdentify() {
    const accountInfo = wx.getAccountInfoSync(),
      env = accountInfo.miniProgram.envVersion == 'release' ? 'prod' : 'sml'
    console.log('env:', env);
    wx.navigateToMiniProgram({
      appId: 'wx1cf2708c2de46337', // 公证签小程序APPID
      path: '/pages/index/index', // webview页面地址
      extraData: {
        // 入参
        requestObj: {
          flowId: this.data.authFlowId, // 签署：signFlowId，认证授权：authFlowId
          accountId: "", // 个人账号ID（即：psnId ，仅签署需要）
          type: "AUTH", // 业务类型：签署 SIGN（默认）, 认证授权 AUTH  //REALNAME
          env, // 环境，沙箱环境为：sml，正式环境为：prod
        },
        // 回传数据：签署/授权认证完成后会将此数据完整回传
        callbackObj: {
          from: 'esign',
          flag: this.sign, //flag中保存sign
          type: this.type
        },
      },
      // envVersion: 'release', // 仅针对开发或体验版有效，线上无效
      success(res) {
        // 根据客户自身需要
        console.log('res:', res)
      },
      fail(res) {
        // 根据客户自身需要
      },
      complete(res) {
        // 根据客户自身需要
      },
    })
  },
  handleEsign() {
    wx.navigateTo({
      url: '/page2/previewContract/previewContract?t=' + Date.now() + '&sign=' + this.sign + '&type=' + this.type,
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  }
})