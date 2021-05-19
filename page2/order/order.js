// page2/order/order.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderTitle: ['支付', '积分'],
    chooseId: 0,
    orderList: [{
        storeName: '如鱼店',
        order_id: '42182021051787131',
        card_year: '一年卡',
        inte_num: 1400,
        buy_course: 1,
        money: 1700,
        state: 0
      },
      {
        storeName: '体验店',
        order_id: '4512202105167811',
        card_year:'三年卡',
        inte_num: 10000,
        buy_course: 1,
        money: 2700,
        state: 1
      },
      {
        storeName: '如鱼店',
        order_id: '线下消费',
        card_year: '一年卡',
        inte_num: 1400,
        buy_course: 1,
        money: 2800,
        state: 1
      }
    ],
    otherList: [
      {
        storeName: '如鱼店',
        order_id: '42182021051787131',
        orderName: '一年卡',
        inte_num: 1,
        type:1,
        money: 1700
      },
      {
        storeName: '体验店',
        order_id: '6086816569005598',
        orderName: '瑜伽课',
        inte_num: 1,
        type:2,
        money: 2100
      }
    ]
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
  choose(e) {
    let index = e.target.dataset.index
    console.log(e)
    this.setData({
      chooseId: index
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