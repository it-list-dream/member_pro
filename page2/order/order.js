// page2/order/order.js
var app = getApp()
var api = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderTitle: ['支付', '积分'],
    chooseId: 0,
    orderList: [],
    otherList: [],
    currPage: 1,
    pageSize: 10,
    flag: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      navHeight: app.globalData.navHeight,
      navTop: app.globalData.navTop,
    })
   this.getMyOrderListByPay();
   this.getMyOrderListByScore()
  },
  choose(e) {
    let index = e.target.dataset.index
    if(index == this.data.chooseId){
      return
    }
    if (index == 1) {
      this.setData({
        currPage: 1,
        flag:true
      })
    } else {
      this.setData({
        currPage: 1
      })
    }
    this.setData({
      chooseId: index
    })
  },
  //金额
  getMyOrderListByPay: function () {
    var that = this
    api.request({
      url: "/MyOrderListByPay",
      data: {
        user_token: wx.getStorageSync('token'),
        pageSize: that.data.pageSize,
        pageIndex: that.data.currPage
      }
    }).then(res => {
      console.log(res.data)
      if (res.data.code == 1) {
        if (res.data.data.length > 0) {
          that.setData({
            orderList: [...that.data.orderList, ...res.data.data]
          })
        } else {
          that.data.flag = false;
        }
      }
    })
  },
  //积分
  getMyOrderListByScore: function () {
    var that = this
    api.request({
      url: "/MyOrderListByScore",
      data: {
        user_token: wx.getStorageSync('token'),
        pageSize: that.data.pageSize,
        pageIndex: that.data.currPage
      }
    }).then(res => {
      if (res.data.code == 1) {
        if (res.data.data.length > 0) {
          that.setData({
            otherList: [...that.data.otherList, ...res.data.data]
          })
        } else {
          that.data.flag = false;
        }
      }
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
    var that = this;
    console.log('触底了')
    if (this.data.flag) {
      var pageSize = that.data.currPage + 1; //获取当前页数并+1
      that.setData({
        currPage: pageSize, //更新当前页数
      })
      if(that.data.chooseId==1){
        that.getMyOrderListByScore()
      }else{
        that.getMyOrderListByPay()
      }
     // that.getMyCoachMyClass(); //重新调用请求获取下一页数据
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})