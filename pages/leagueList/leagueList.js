var app = getApp()
var api = require('../../utils/request.js')
var api = require('../../utils/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navHeight:0,
    navTop:0,
    leagueList:[],
    stars: [0, 1, 2, 3, 4],
    score: 3
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      navHeight: app.globalData.navHeight,
      navTop: app.globalData.navTop,
    });
    this.getMoreLeagueList();
  },
  getMoreLeagueList(){
    api.request({
      url: "/GroupClassList",
      data: {
        user_token: wx.getStorageSync('token'),
        GB_ID: wx.getStorageSync('GB_ID'),
      }
    }).then(res => {
      this.setData({
        leagueList:res.data.data
      })
    })
  },
  handleDetail(event){
    var league = JSON.stringify(event.currentTarget.dataset.league);
    wx.navigateTo({
      url: '/pages/leagueDetail/leagueDetail?league='+league,
    })
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