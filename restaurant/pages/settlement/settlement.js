const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    payIndex:0,
    payList:[
       {
         id:0,
         name:"微信支付"
       },
       {
         id:1,
         name:"储值支付"
       }
     ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      navHeight: app.globalData.navHeight
    });
  },
  payMethods(e){
     console.log(e)
     let payIndex = e.detail.value;
     this.setData({
       payIndex
     })
  },
  finalPay(){
     wx.navigateTo({
       url: '/restaurant/pages/orderSuccess/orderSuccess',
     });
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