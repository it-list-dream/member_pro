var app = getApp()
var util = require('../../utils/util.js')
const api = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    endDate: '',
    firstDate: '2020-01',
    lastDate: null,
    bodyList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var time = util.formatTime(new Date());
    time = time.slice(0, 10).replace(/\/+/g, '-');
    this.setData({
      navHeight: app.globalData.navHeight,
      navTop: app.globalData.navTop,
      endDate: time,
      lastDate:util.format(new Date(),'yyyy-mm-dd').slice(0,7)
    })
     this.getMyBodyTestList();
     this.ChooseLastDate()
  },
  bindDateChange: function (e) {
    this.setData({
      firstDate: e.detail.value.slice(0, 7)
    })
    this.getMyBodyTestList()
  },
  bindDateChange1: function (e) {
    this.setData({
      lastDate: e.detail.value.slice(0, 7)
    })
    this.getMyBodyTestList()
  },
  testBody: function (e) {
    let body = e.currentTarget.dataset.body;
    console.log(body)
    let sbody = JSON.stringify(body)
    wx.navigateTo({
      url: '/page2/deviceDetail/deviceDetail?body='+sbody,
    })
  },
  //体测数据
  getMyBodyTestList() {
    var that = this
    let firstTime = this.data.firstDate;
    firstTime = firstTime + '-' + '01';
    let lastTime = this.ChooseLastDate();
    api.request({
      url: "/MyBodyTestList",
      data: {
        user_token: wx.getStorageSync('token'),
        dateFrom: firstTime,
        dateTo: lastTime
      }
    }).then(res => {
      // console.log(res)
      if (res.data.code == 1) {
        //console.log(res.data.data)
        let newList = res.data.data;
        newList.forEach(item=>{
          item.Createdate = util.formatTime1(new Date(item.Createdate)).replace(/\//g,'-')
        });
        that.setData({
          bodyList: res.data.data
        })
      }
    })
  },
  ChooseLastDate() {
    //选择日期
    let lastTime = this.data.lastDate;
    lastTime = lastTime + '-' + '01';
    var now = new Date(lastTime); //当前日期 
    var nowMonth = now.getMonth(); //当前月 
    var nowYear = now.getFullYear(); //当前年 
    //本月的结束时间
    var monthEndDate = new Date(nowYear, nowMonth + 1, 0);
    return util.format(monthEndDate,'YYYY-MM-DD')
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