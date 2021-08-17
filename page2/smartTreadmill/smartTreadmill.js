// page2/smartTreadmill/smartTreadmill.js
const app = getApp()
const api = require('../../utils/request.js')
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    endDate: '',
    firstDate: '2020-01',
    lastDate: null,
    runRewordList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var date1 = util.format(new Date(), 'YYYY-MM-DD')
    this.setData({
      navHeight: app.globalData.navHeight,
      navTop: app.globalData.navTop,
      endDate: date1,
      lastDate: util.format(new Date(), 'YYYY-MM-DD').slice(0, 7)
    })
    this.getRunRecord();
  },
  treadmillDetail: function (e) {
    //  console.log(e.currentTarget.dataset.treadmill)
    let treadmill = JSON.stringify(e.currentTarget.dataset.treadmill)
    wx.navigateTo({
      url: '/page2/treadmillDetail/treadmillDetail?run=' + treadmill,
    })
  },
  // 日期
  bindDateChange: function (e) {
    this.setData({
      firstDate: e.detail.value
    })
    this.getRunRecord()
    //console.log(e.detail.value)
  },
  bindDateChange1: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      lastDate: e.detail.value
    })
    this.getRunRecord()
    // console.log(e.detail.value)
  },
  getRunRecord() {
    let startDate = this.data.firstDate;
    startDate += '-01';
    let endDate = this.ChooseLastDate();
    api.request({
      url: "/RunRecord",
      data: {
        token: wx.getStorageSync('token'),
        dateFrom: startDate,
        dateTo: endDate
      }
    }).then(res => {
      if (res.data.code == 1) {
        let newList = this.handleRunData(res.data.data);
        //console.log('-----------------', newList)
        this.setData({
          runRewordList: newList
        })
      }
    })
  },

  //运动数据的处理
  handleRunData(list) {
    let speed;
    if (list instanceof Array) {
      list.forEach((item, index) => {
        speed = item.avgspeed / item.runtime * 3.6;
        item.startTime = util.format(item.startTime, 'YYYY-MM-DD');
        item.runDistance = item.runDistance / 1000
        item.avgspeed = speed.toFixed(2);
        item.runtime = this.formatSeconds(item.runtime)
      })
      return list
    } else {
      return []
    }
  },
  formatSeconds(value) {
    var theTime = parseInt(value); // 秒
    var theTime1 = 0; // 分
    if (theTime > 60) {
      theTime1 = parseInt(theTime / 60);
      theTime = parseInt(theTime % 60);
      if (theTime1 > 60) {
        theTime1 = parseInt(theTime1 % 60);
      }
    }
    var result = "" + parseInt(theTime) + "秒";
    if (theTime1 > 0) {
      result = "" + parseInt(theTime1) + "分" + result;
    }
    return result;
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
    return util.format(monthEndDate, 'YYYY-MM-DD')
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