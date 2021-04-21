const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coachList: [{
        id: 1,
        name: '张大胖',
        img: "/static/head.png"
      },
      {
        id: 2,
        name: '张耳畔',
        img: "/static/head.png"
      },
      {
        id: 3,
        name: '张三胖',
        img: "/static/head.png"
      }, {
        id: 4,
        name: '张四胖',
        img: "/static/head.png"
      },
      {
        id: 5,
        name: '张王i胖',
        img: "/static/head.png"
      }
    ],
    number: 1
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
  countNum(e) {
    console.log(e.target.dataset.index)
    if (e.target.dataset.index == 1) {
      this.data.number++;
    } else {
      if (this.data.number < 1) {
        this.data.number = 1;
      } else {
        this.data.number--;
      }
      
    }
    this.setData({
      number:this.data.number
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