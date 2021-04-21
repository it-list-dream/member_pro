// page2/historyAppointment/historyAppointment.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    historyList: ['已预约', '未完成', '已完成'],
    chooseId: 0,
    history_con: [{
        date: '2021-4-21',
        coach_img: './images/histroy.png',
        courseNmae: '动感单车',
        coach: '张三',
        time: '18:00-19:00',
        address: '徐家汇',
        seat: 21,
        isLeague: true,
        //1 已预约 0 未完成 2 已完成
        status: 1
      },
      {
        date: '2021-4-2',
        coach_img: './images/histroy.png',
        courseNmae: '拳击',
        coach: '李四',
        time: '12:00-13:00',
        // address:'徐家汇',
        // seat:null,
        isLeague: false,
        status: 0
      },
      {
        date: '2021-4-22',
        coach_img: './images/histroy.png',
        courseNmae: '拳击',
        coach: '王五',
        time: '12:00-13:00',
        // address:'徐家汇',
        // seat:null,
        isLeague: false,
        status: 0
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
  chooseNav(e) {
    let index = e.target.dataset.index;
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