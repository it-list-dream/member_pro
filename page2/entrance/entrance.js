// page2/entrance/entrance.js
const app = getApp()
var api = require('../../utils/request.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    entrancdList: [],
    //分页
    pageSize:17,
    currPage:1,
   // UI_ID:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  //  console.log(options)
    this.getUserCheckInList(options.UI_ID)
    this.setData({
      navHeight: app.globalData.navHeight,
      navTop: app.globalData.navTop,
    })
  },
  getUserCheckInList:function(id){
    var that = this
     api.request({
       url:"/UserCheckInList",
       data:{
        user_token:wx.getStorageSync('token'),
        UI_ID:id,
        pageSize:that.data.pageSize,
        pageIndex:that.data.currPage
       }
     }).then(res=>{
        that.setData({
          entrancdList:[...that.data.entrancdList,...res.data.data ]
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    var pageSize = that.data.currPage + 1; //获取当前页数并+1
    that.setData({
      currPage: pageSize, //更新当前页数
    })
   that.getUserCheckInList(); //重新调用请求获取下一页数据
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})