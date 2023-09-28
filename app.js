var util = require('./utils/util.js');
import EventBus from './utils/eventBus.js'
// wx.$bus = new EventBus()
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
        //导航高度
        let statusBarHeight = res.statusBarHeight,
          navTop = menuButtonObject.top,
          navHeight = statusBarHeight + menuButtonObject.height + (menuButtonObject.top - statusBarHeight) * 2;
        this.globalData.navHeight = navHeight;
        this.globalData.navTop = navTop;
        this.globalData.windowHeight = res.windowHeight;
        this.globalData.windowWidth = res.windowWidth;
        this.globalData.pixelRatio = res.pixelRatio
      }
    });
    this.autoUpdate();
  },
  autoUpdate: function () {
    var self = this
    // 获取小程序更新机制兼容
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      //1. 检查小程序是否有新版本发布
      updateManager.onCheckForUpdate(function (res) {
        // 请求完新版本信息的回调
        if (res.hasUpdate) {
          //检测到新版本，需要更新，给出提示
          wx.showModal({
            title: '更新提示',
            content: '检测到新版本，是否下载新版本并重启小程序？',
            success: function (res) {
              if (res.confirm) {
                //2. 用户确定下载更新小程序，小程序下载及更新静默进行
                wx.removeStorageSync('expireTime')
                self.downLoadAndUpdate(updateManager)
              } else if (res.cancel) {
                //用户点击取消按钮的处理，如果需要强制更新，则给出二次弹窗，如果不需要，则这里的代码都可以删掉了
                wx.showModal({
                  title: '温馨提示~',
                  content: '本次版本更新涉及到新的功能添加，旧版本无法正常访问的哦~',
                  showCancel: false, //隐藏取消按钮
                  confirmText: "确定更新", //只保留确定更新按钮
                  success: function (res) {
                    if (res.confirm) {
                      //下载新版本，并重新应用
                      self.downLoadAndUpdate(updateManager)
                    }
                  }
                })
              }
            }
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
  downLoadAndUpdate: function (updateManager) {
    var self = this
    wx.showLoading();
    //静默下载更新小程序新版本
    updateManager.onUpdateReady(function () {
      wx.hideLoading()
      //新的版本已经下载好，调用 applyUpdate 应用新版本并重启
      updateManager.applyUpdate()
    })
    updateManager.onUpdateFailed(function () {
      // 新的版本下载失败
      wx.showModal({
        title: '已经有新版本了哟~',
        content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
      })
    })
  },
  // autoUpdate: function () {
  //   var self = this
  //   // 获取小程序更新机制兼容
  //   if (wx.canIUse('getUpdateManager')) {
  //     console.log(1111)
  //     const updateManager = wx.getUpdateManager()
  //     //1. 检查小程序是否有新版本发布
  //     updateManager.onCheckForUpdate(function (res) {
  //       // 请求完新版本信息的回调
  //       if (res.hasUpdate) {
  //         //2. 小程序有新版本，则静默下载新版本，做好更新准备
  //         updateManager.onUpdateReady(function () {
  //           console.log(new Date())
  //           wx.showModal({
  //             title: '更新提示',
  //             content: '新版本已经准备好，是否重启应用？',
  //             success: function (res) {
  //               if (res.confirm) {
  //                 //3. 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
  //                 updateManager.applyUpdate()
  //                 wx.removeStorageSync('expireTime')
  //                 //wx.clearStorage();
  //               } else if (res.cancel) {
  //                 //如果需要强制更新，则给出二次弹窗，如果不需要，则这里的代码都可以删掉了
  //                 wx.showModal({
  //                   title: '温馨提示~',
  //                   content: '本次更新可能会导致旧版本无法正常访问，请使用新版本',
  //                   success: function (res) {
  //                     self.autoUpdate()
  //                   }
  //                 })
  //               }
  //             }
  //           })
  //         })
  //         updateManager.onUpdateFailed(function () {
  //           // 新的版本下载失败
  //           wx.showModal({
  //             title: '已经有新版本了哟~',
  //             content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
  //           })
  //         })
  //       }
  //     })
  //   } else {
  //     // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
  //     wx.showModal({
  //       title: '提示',
  //       content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
  //     })
  //   }
  // },
  //重新获取sign
  seceneInfo(options) {
    //console.log('options:', options)
    //判断场景值
    if (options.scene == 1011 || options.scene == 1035 || options.scene == 1047 || options.scene == 1048 || options.scene == 1049 || options.scene == 1012) {
      this.globalData.isChange = true
    } else {
      this.globalData.isChange = false
    };
  },
  globalData: {
    isIphoneX: false,
    isChange: false,
    share: false,
    //门店信息
    store: null,
    menuRight: 0,
    gymPhone: '',
    setOptions: {},
    //1 表示特殊团课
    leagueType: 0,
    suggestLeague: [],
    PayMoneyID: '',
    isSigning: '',
    navHeight: 0,
    navTop: 0
  },
  onShow: function (options) {
    // 判断是否由分享进入小程序
    if (options.scene == 1007 || options.scene == 1008 || options.scene == 1044 || options.scene == 1036) {
      this.globalData.share = true
    } else {
      this.globalData.share = false
    };
    // console.log(options, 'options');
    let result = '';
    let flag = '',
      type = '';
    // 接收 公证签小程序 返回的数据
    if (typeof options.referrerInfo.extraData != 'undefined') {
      result = options.referrerInfo.extraData.isSuccess;
      if (options.referrerInfo.extraData.callbackObj != undefined &&
        options.referrerInfo.extraData.callbackObj.from != 'undefined' &&
        options.referrerInfo.extraData.callbackObj.from == 'esign') {
        flag = options.referrerInfo.extraData.callbackObj.flag;
        type = options.referrerInfo.extraData.callbackObj.type;
        console.log('options:', options)
        if (flag && flag != '') {
          wx.navigateTo({
            url: '/page2/previewContract/previewContract?t=' + Date.now() + '&sign=' + flag + '&type=' + type,
          })
        }
      }
    }
    this.seceneInfo(options);
  },
})