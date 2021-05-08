// page2/historyAppointment/historyAppointment.js
const app = getApp()
var api = require('../../utils/request.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    historyList: ['已预约', '未完成', '已完成'],
    chooseId: 0,
    //分页的属性
    pageSize: 3,
    //当前页数
    currPage: 1,
    //1完成2进行中3未完成
    type: 2,
    //完成
    completedHistory: [],
    //已预约
    alreadyHistory: [],
    //未完成
    unfinishedHistory: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMyCoachMyClass();
    this.setData({
      navHeight: app.globalData.navHeight,
      navTop: app.globalData.navTop
    })
  },
  chooseNav(e) {
    let index = e.target.dataset.index;
    console.log(index)
    if (index == 1) {
      this.setData({
        type: 3
      })
      this.getMyCoachMyClass();
    } else if (index == 2) {
      this.setData({
        type: 1
      })
      this.getMyCoachMyClass();
    }else{
      this.setData({
        type: 2
      })
    }
    this.setData({
      chooseId: index
    })
  },
  //历史预约
  getMyCoachMyClass: function () {
    var that = this
    api.request({
      url: '/MyCoachMyClass',
      data: {
        user_token: wx.getStorageSync('token'),
        pageSize: that.data.pageSize,
        pageIndex: that.data.currPage,
        UI_ID: wx.getStorageSync('UI_ID'),
        type: that.data.type
      }
    }).then(res => {
      console.log(res.data.data)
      if (that.data.type == 1) {
        this.setData({
          completedHistory: [...that.data.completedHistory,...res.data.data]
        })
      }else if(that.data.type == 2){
        console.log(res)
        this.setData({
          alreadyHistory:[...that.data.alreadyHistory,... res.data.data ]
        })
      }else if(that.data.type == 3){
        this.setData({
          unfinishedHistory:[...that.data.unfinishedHistory,...res.data.data]
        })
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  //  console.log('触底反应')
    var that = this;
    var pageSize = that.data.currPage + 1; //获取当前页数并+1
    that.setData({
      currPage: pageSize, //更新当前页数
    })
   that.getMyCoachMyClass(); //重新调用请求获取下一页数据
  }
})