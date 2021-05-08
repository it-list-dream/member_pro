// pages/selectCourse/selectCourse.js
var app = getApp()
var api = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardImg: '/static/selectCourse.png',
    //每页显示的数量
    pageSize: 5,
    //当前页数
    currPage: 1,
    //教练列表
    coachClassList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMyCoachClassList();
    this.setData({
      navHeight: app.globalData.navHeight,
      navTop: app.globalData.navTop,
    })
  },
  getMyCoachClassList: function () {
    var that = this;
    api.request({
      url: "/MyCoachClassList",
      data: {
        user_token: wx.getStorageSync('token'),
        UI_ID: wx.getStorageSync('UI_ID'),
        pageSize: that.data.pageSize,
        pageIndex: that.data.currPage
      }
    }).then(res => {
      console.log(res.data.data);
      //触底
      if (that.data.coachClassList.length > 0) {
        // var data1 = [];
        // for(var i =0;i<8;i++){
        //     data1.push( {
        //       "ROWID": "1",
        //       "CO_ID": "1343",
        //       "AI_Name": "教练",
        //       "AI_Sex": "女",
        //       "AI_Face": "http://47.111.150.151:8011/image/88/admin_face/2020/2020101217581805586.jpg",
        //       "CO_Have": "9",
        //       "FK_AL_TeachCoach_ID": "586",
        //       "CO_ActiveEnd": "2022-05-06",
        //       "CP_Name": "dc常规课",
        //       "CP_Time": "60",
        //       "ClassLogo": ""
        //     })
        // }
        that.setData({
          coachClassList: [...that.data.coachClassList, ...res.data.data]
        })
      } else {
        that.setData({
          coachClassList: res.data.data
        })
      }

    })
  },
  orderCourse: function (e) {
    var pages = getCurrentPages(); //当前页面
    console.log(e)
    var prevPage = pages[pages.length - 2]; //上一页面
    prevPage.setData({
      currentCoach: e.currentTarget.dataset.coach
    })
    wx.navigateBack({
      delta: 1,
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
    console.log('触底反应')
    var that = this;
    var pageSize = that.data.currPage + 1; //获取当前页数并+1
    that.setData({
      currPage: pageSize, //更新当前页数
    })
    that.getMyCoachClassList(); //重新调用请求获取下一页数据
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})