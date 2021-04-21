// page2/integralMall/integralMall.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardType: 1,
    entityType: 1,
    type: 3,
    courseNum: 1,
    takeMethods: ['门店自取', '快递上门（到付）'],
    take_index: -1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      navHeight: app.globalData.navHeight,
      navTop: app.globalData.navTop,
      windowHeight: app.globalData.windowHeight
    })
  },
  calculate: function (e) {
    var operator = e.target.dataset.operator;
    var total = this.data.courseNum;
    if (operator == '+') {
      total++;
    } else if (operator == '-') {
      if (total > 1) {
        total--;
      }
    }
    this.setData({
      courseNum: total
    })
  },
  takeWay: function (e) {
    console.log(e.target.dataset);
    var idx = e.target.dataset.index;
    this.setData({
      take_index: idx
    })
    if (idx == 1) {
      wx.navigateTo({
        url: '/page2/address/address',
      })
    }

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