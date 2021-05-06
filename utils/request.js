var baseURL = 'https://user.360ruyu.cn/MobileUserV2.asmx';
var fixtion = {}
var request = (options) => {
  if (options.url == '/GetUrlBySign' || options.url == '/WxUserLogin' || options.url == '/userPhoneBind' || options.url =='/GymList') {
    fixtion = {
      key: "BD687B66ECDBED4E12C4320B0ABB3BB111",
    }
  }
  return new Promise((resolve, reject) => {
    let header = {
      'content-type': 'application/x-www-form-urlencoded'
    };
    // wx.showLoading({
    //   title: '加载中...',
    // })
    wx.request({
      url: baseURL + options.url || '',
      data: {
        ...fixtion,
        ...options.data
      },
      method: options.method || 'POST',
      header: options.header || header,
      timeout: 15000,
      success(res) {
        resolve(res);
      },
      fail(res) {
        // wx.showToast({
        //   title: '网络断开了',
        //   icon: 'error',
        //   duration: 2000
        // })
        reject(res);
      },
      complete: function () {
        //wx.hideLoading()
      }
    })
  })
};
module.exports = {
  request: request
};