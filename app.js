
App({
  onLaunch: function(options) {
     // 判断是否由分享进入小程序
     if (options.scene == 1007 || options.scene == 1008) {
      this.globalData.share = true
    } else {
      this.globalData.share = false
    };
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
              url: "/page2/login/login",
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
    share:false,
    GB_ID:88,
    store:null,
    token1:'AacZ4cBOgDvYt7obOHUJDF/nN6av3kx7GPkz+8fOv0xEMkE9n8D4THxEx2bqEMs6rEzlxW5U8fyMydDj93RTTtb5FYwb7Ipb41ptbYB8E6/+BRct4v3RXC2MNCb9YtS0yd77SLS5E8FOhEI/qiiE2Aos4/UqBYFolrBdJSQG2dqexPY/tYgmC2es6xMyffZk1Db1/FJtF7fytBf2A5QBMIObGXbboV78jNSUzw1T+X1qsNEx0kjysynvH2atBk1TrbxOgR54YKZtRa26LaSCP73vtVEVSe0j5OtN/fYn2fw='
  },
  onShow: function() {
    
  },
})
