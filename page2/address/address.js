// page2/address/address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     defValue:false,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  radioChange(){
   let default_value = this.data.defValue;
    this.setData({
      defValue:!default_value
    })
  },
  add_address(){
    wx.navigateTo({
      url: '/page2/addAdress/addAdress',
    })
  },
  edit(){
    wx.navigateTo({
      url: '/page2/addAdress/addAdress',
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