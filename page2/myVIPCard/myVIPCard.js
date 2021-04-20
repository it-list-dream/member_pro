// page2/myVIPCard/myVIPCard.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
     cardList:[
       {
         id:1,
         name:'一年卡',
         status:1,//1表示使用中
         remainingTime:80,
         data:'2021-6-18 14:30:00'
      },
      {
        id:2,
        name:'两年卡',
        status:0,//1表示使用中
     }
     ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(app.globalData)
    this.setData({
      navHeight: app.globalData.navHeight,
      navTop: app.globalData.navTop,
      windowHeight: app.globalData.windowHeight
    })
    //this.getScrollHeight();
  },
  lookReword:function(){
     wx.navigateTo({
       url: '/page2/entrance/entrance',
     })
  },
  // getScrollHeight: function() {
  //   wx.createSelectorQuery().select('.vipCard').boundingClientRect((rect) => {
  //     this.setData({
  //       scrollHeight: rect.height
  //     })
  //     console.log(this.data.scrollHeight)
  //   }).exec()
  // },
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