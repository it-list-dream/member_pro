// pages/classList/classList.js
const app = getApp()
var api = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCoachClassList();
    this.setData({
      navHeight: app.globalData.navHeight,
      navTop: app.globalData.navTop,
    })
  },
  getclass() {
    wx.navigateTo({
      url: '/pages/personalTrainer/personalTrainer',
    })
  },
  getCoachClassList:function(){
    var that = this;
     api.request({
       url:"/CoachClassList",
       data:{
        user_token:wx.getStorageSync('token'),
        GB_ID:app.globalData.GB_ID
       }
     }).then(res=>{
       console.log(res);
       that.setData({
         classList:res.data.data
       })
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

  }
})