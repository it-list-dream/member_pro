const app = getApp()
var api = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coachList: [],
    number: 1,
    personal:null,
    chooseNum:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  //  console.log(JSON.parse(options.course1))
    this.getCoachStyleList()
    if(options.course1){
      this.setData({
        personal:JSON.parse(options.course1)
      })
    }
    this.setData({
      navHeight: app.globalData.navHeight,
      navTop: app.globalData.navTop
    })
  },
  countNum(e) {
    console.log(e.target.dataset.index)
    if (e.target.dataset.index == 1) {
      this.data.number++;
    } else {
      if (this.data.number <= 1) {
        this.data.number = 1;
      } else {
        this.data.number--;
      }
    }
    this.setData({
      number:this.data.number
    })
  },
  getCoachStyleList:function(){
    var that = this
    api.request({
      url:"/CoachStyleList",
      data:{
        user_token:wx.getStorageSync('token'),
        GB_ID:wx.getStorageSync('GB_ID')
      }
    }).then(res=>{
      console.log(res)
      that.setData({
        coachList:res.data.data
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  chooseCoach:function(e){
      this.setData({
        chooseNum:e.currentTarget.dataset.index
      })
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