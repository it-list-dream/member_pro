// page2/myStored/myStored.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
        storedTab:['全部','充值','消费'],
        tabIndex:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  tabStored(e){
          console.log(e.target.dataset)
      let idx = e.target.dataset.idx;
      this.setData({
        tabIndex:idx
      })
  },
  swiperTab:function(e){
    let current = e.detail.current;
    this.setData({
      tabIndex:current
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