// pages/coachDetail/coachDetail.js
const app = getApp()
var api = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coachDetail: null,
    suggestCoach:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   //  console.log(options)
    if (options) {
      this.setData({
        coachDetail:JSON.parse(options.coach)
      })
    }
    this.getSuggestCoach();
    this.setData({
      navHeight: app.globalData.navHeight,
      navTop: app.globalData.navTop,
    })

  },
  getSuggestCoach:function(){
    var that = this
    api.request({
      url:"/SuggestCoachClass",
      data:{
        user_token:wx.getStorageSync('token'),
        GB_ID:wx.getStorageSync('GB_ID')
      }
    }).then(res=>{
       console.log(res)
      that.setData({
        suggestCoach:res.data.data
      })
    })
  },
  call:function(e){
    if (e.currentTarget.dataset.phone) {
      wx.makePhoneCall({
        phoneNumber: e.currentTarget.dataset.phone,
      }).catch(e=>{
          console.log(e)
      })
    }else{
      wx.showToast({
        icon:"none",
        title: '该教练没有预留手机号码',
      })
    }
  },
  rec_course() {
    wx.navigateTo({
      url: '/pages/personalTrainer/personalTrainer',
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