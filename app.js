
App({
  onLaunch: function() {
    var that = this
    // 版本更新
    const updateManager = wx.getUpdateManager()
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
    })
    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function (res) {
          if (res.confirm) {
            updateManager.applyUpdate()
            wx.clearStorage()
            wx.reLaunch({
              url: "/logs/login/login",
            })
          }
        }
      })
    })
    updateManager.onUpdateFailed(function () {
      // 新版本下载失败
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              this.globalData.userInfo = res.userInfo
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    });
       //获取胶囊的位置
       let menuButtonObject = wx.getMenuButtonBoundingClientRect();
       wx.getSystemInfo({
         success: res => {
   
           //导航高度
           let statusBarHeight = res.statusBarHeight,
             navTop = menuButtonObject.top,
             navHeight = statusBarHeight + menuButtonObject.height + (menuButtonObject.top - statusBarHeight) * 2;
           this.globalData.navHeight = navHeight;
           this.globalData.navTop = navTop;
           this.globalData.windowHeight = res.windowHeight;
         },
         fail(err) {
           console.log(err);
         }
       });
  },
  globalData: {
    isIphoneX: false, 
    userInfo: null,
    menuTop: wx.getMenuButtonBoundingClientRect().top,
    menuHeight: wx.getMenuButtonBoundingClientRect().height,
  },
  onShow: function() {
    let that = this;
    wx.getSystemInfo({
      success: function(res) {
        let h = 750 * res.windowHeight / res.windowWidth
        if (res.model == 'iPhone X') {
          that.globalData.isIphoneX = true;
        }
      }
    })
  },
})
