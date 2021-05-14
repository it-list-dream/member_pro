// page2/suceess/suceess.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isShow: 1,
    coach: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if (options.coach) {
      this.setData({
        coach: JSON.parse(options.coach)
      })
    }
    this.setData({
      navHeight: app.globalData.navHeight,
      navTop: app.globalData.navTop,
    })
  },
  backHome: function () {
    wx.reLaunch({
      url: '/pages/tabbar/home/home',
    })
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
    console.log('分享')
    return {
      title: '弹出分享时显示的分享标题',
      desc: '分享页面的内容',
      path: '/pages/coachDetail?coach=' + this.data.coach // 路径，传递参数到指定页面。
    }
  }
})