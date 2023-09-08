const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: ""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var webSrc = "";
    if (options.sign && options.type == '私教') {
      webSrc = `https://user.360ruyu.cn/eSign/#/preview/personalTrain?sign=${options.sign}` 
    }else{
      webSrc = `https://user.360ruyu.cn/eSign/#/preview/membership?sign=${options.sign}`
    }
    this.setData({
      navHeight: app.globalData.navHeight,
      navTop: app.globalData.navTop,
      src: webSrc
    });
  },
  handleGetMessage: function (e) {
    console.log('ddd', e)
    if (e.detail.data[0].result == 'success') {
      console.log('返回小程序成功')
    }
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})