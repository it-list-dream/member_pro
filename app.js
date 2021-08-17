App({
  onLaunch: function (options) {
    var that = this
    //获取胶囊的位置
    let menuButtonObject = wx.getMenuButtonBoundingClientRect();
    const systemInfo = wx.getSystemInfoSync();
    this.globalData.menuRight = systemInfo.screenWidth - menuButtonObject.right;
    //console.log(systemInfo.screenWidth - menuButtonObject.right)
    wx.getSystemInfo({
      success: res => {
       // console.log('navtar')
        //导航高度
        let statusBarHeight = res.statusBarHeight,
          navTop = menuButtonObject.top,
          navHeight = statusBarHeight + menuButtonObject.height + (menuButtonObject.top - statusBarHeight) * 2;
        this.globalData.navHeight = navHeight;
        this.globalData.navTop = navTop;
        this.globalData.windowHeight = res.windowHeight;
      }
    });
    this.autoUpdate();
  },
  //自动更新
  autoUpdate: function () {
    console.log(new Date())
    var self = this
    // 获取小程序更新机制兼容
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      //1. 检查小程序是否有新版本发布
      updateManager.onCheckForUpdate(function (res) {
        // 请求完新版本信息的回调
        if (res.hasUpdate) {
          //2. 小程序有新版本，则静默下载新版本，做好更新准备
          updateManager.onUpdateReady(function () {
            console.log(new Date())
            wx.showModal({
              title: '更新提示',
              content: '新版本已经准备好，是否重启应用？',
              success: function (res) {
                if (res.confirm) {
                  //3. 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                  updateManager.applyUpdate()
                  wx.clearStorage();
                  // wx.reLaunch({
                  //   url: 'pages/hello/hello',
                  // })
                } else if (res.cancel) {
                  //如果需要强制更新，则给出二次弹窗，如果不需要，则这里的代码都可以删掉了
                  wx.showModal({
                    title: '温馨提示~',
                    content: '本次更新可能会导致旧版本无法正常访问，请使用新版本',
                    success: function (res) {
                      self.autoUpdate()
                    }
                  })
                }
              }
            })
          })
          updateManager.onUpdateFailed(function () {
            // 新的版本下载失败
            wx.showModal({
              title: '已经有新版本了哟~',
              content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
            })
          })
        }
      })
    } else {
      // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },
  globalData: {
    isIphoneX: false,
    userInfo: null,
    share: false,
    GB_ID: 0,
    //门店信息
    store: null,
    menuRight: 0,
    //tabbar
    // isTabShow:false
  },
  onShow: function (options) {
    // 判断是否由分享进入小程序
    if (options.scene == 1007 || options.scene == 1008 || options.scene == 1044 || options.scene == 1036) {
      this.globalData.share = true
    } else {
      this.globalData.share = false
    };
  },
})