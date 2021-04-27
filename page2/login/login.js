// page2/login/login.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModal: false,
    hasUserInfo: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let hasUserInfo = wx.getStorageSync('hasUserInfo');
    this.setData({
      navHeight: app.globalData.navHeight,
      navTop: app.globalData.navTop,
      windowHeight: app.globalData.windowHeight
    })
    this.setData({
      hasUserInfo: hasUserInfo
    })
  },
  onCancel() {
    wx.navigateBack({
      delta: 1,
    })
  },
  modalCancel() {
    console.log('取消');
    wx.showToast({
      title: '拒绝授权',
      icon: 'none',
      duration: 2000
    })
  },
  modalConfirm() {
    console.log('确定')
    this.getPhoneNumber();
    // let code = '';
    // wx.login({
    //     success:(res) => {
    //         code = res.code;
    //     },
    // });
    // let appInfo = {
    //   serret:'6bf15bee19dfb8937a7cb2f2adee924d',
    //   appId:'wx31644a3c951aa4ac'
    // }
    // wx.request({
    //   url: `https://api.weixin.qq.com/sns/jscode2session?appid=${appInfo.appId}&secret=${appInfo.serret}&js_code=${code}&grant_type=authorization_code`,
    // })
  },
  getUserProfile(e) {
    var that = this;
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res.userInfo)
        that.setData({
          userInfo: res.userInfo,
          showModal: true,
          hasUserInfo: true
        })
        wx.setStorageSync('hasUserInfo', true)
        wx.setStorageSync('userInfo', JSON.stringify(res.userInfo))
      },
      fail: function () {
        console.log('用户拒绝获取头像信息');
        wx.navigateBack({
          delta: 1,
        })
      }
    })
  },
  //通过绑定手机号登录
  getPhoneNumber: function (e) {
    // var ivObj = e.detail.iv
    // var telObj = e.detail.encryptedData
    var codeObj = "";
    var that = this;
    //------执行Login---------
    wx.login({
      success: res => {
        console.log('code转换', res.code);

        //用code传给服务器调换session_key
        // wx.request({
        //  url: 'https://你的接口文件路径', //接口地址
        //  data: {
        //   appid: "你的小程序APPID",
        //   secret: "你的小程序appsecret",
        //   code: res.code,
        //   encryptedData: telObj,
        //   iv: ivObj
        //  },
        //  success: function (res) {
        //   phoneObj = res.data.phoneNumber;
        //   console.log("手机号=", phoneObj)
        //   wx.setStorage({  //存储数据并准备发送给下一页使用
        //    key: "phoneObj",
        //    data: res.data.phoneNumber,
        //   })
        //  }
      }
    });

    //-----------------是否授权，授权通过进入主页面，授权拒绝则停留在登陆界面
    //   if (e.detail.errMsg == 'getPhoneNumber:user deny') { //用户点击拒绝
    //    wx.navigateTo({
    //     url: '../index/index',
    //    })
    //   } else { //允许授权执行跳转
    //    wx.navigateTo({
    //     url: '../test/test',
    //    })
    //   }
    //  }
    // });
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})