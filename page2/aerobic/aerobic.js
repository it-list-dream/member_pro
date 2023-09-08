const app = getApp();
const util = require('../../utils/util.js')
const api = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startdate: "2021/01/01",
    enddate: "2023/07/31",
    nowdate: "",
    aerobicList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var date = new Date();
    date.setMonth(date.getMonth() + 1);
    date.setDate(0);
    this.setData({
      navHeight: app.globalData.navHeight,
      navTop: app.globalData.navTop,
      nowdate: util.format(new Date(), 'yyyy/mm/dd'),
      enddate: util.format(date, 'yyyy/mm/dd')
    });
    this.getAerobicList();
  },
  getAerobicList() {
    api.request({
      url: "/AerobicList",
      data: {
        token: wx.getStorageSync('token'),
        dateFrom: this.data.startdate,
        dateTo: this.data.enddate
      }
    }).then(res => {
     // console.log(res)
      var list = res.data.data;
      list.forEach(item => {
        item.startTime = util.format(item.startTime, 'yyyy/mm/dd hh:mm');
        item.endTime = util.format(item.endTime, 'yyyy/mm/dd hh:mm')
      })
      this.setData({
        aerobicList: list
      });
    });
  },
  handleDetail(e) {
    var aerobic = e.currentTarget.dataset.aerobic;
    wx.navigateTo({
      url: '/page2/aerobicDetail/aerobicDetail?aerobic=' + JSON.stringify(aerobic),
    });
  },
  startPickerChange(e) {
    this.setData({
      startdate: util.format( e.detail.value, 'yyyy/mm/dd')
    });
    this.getAerobicList();
  },
  endPickerChange(e) {
    this.setData({
      enddate: util.format( e.detail.value, 'yyyy/mm/dd')
    });
    this.getAerobicList();
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