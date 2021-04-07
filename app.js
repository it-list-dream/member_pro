
App({
  onLaunch: function() {
    var that = this
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
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
    })
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
