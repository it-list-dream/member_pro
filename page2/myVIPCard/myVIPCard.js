// page2/myVIPCard/myVIPCard.js
const app = getApp()
var api = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
     cardList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(app.globalData)
    this.getMyAllCard();
    this.setData({
      navHeight: app.globalData.navHeight,
      navTop: app.globalData.navTop,
    })
    //this.getScrollHeight();
  },
  lookReword:function(){
     wx.navigateTo({
       url: '/page2/entrance/entrance',
     })
  },
  getMyAllCard:function(){
    var that = this;
    api.request({
      url:"/MyAllVIPCard",
      data:{
        user_token:wx.getStorageSync('token')
      }
    }).then(res=>{
      console.log(res)
      that.setData({
        cardList:res.data.data
      })
    })
  },
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