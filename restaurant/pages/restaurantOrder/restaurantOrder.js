const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
     list:[
       {
         id:1322,
         orderNo:"1238363749227",
         orderStatus:"进行中",
         tableNumber:"9",
         children:[
            {
              id:1322,
              menuUrl:"",
              menuName:"牛排",
              remarks:"常规糖、辣味、多葱",
              goodNumber:3,
              price:"19.8",
              total:"100"
            },
            {
              id:1322,
              menuUrl:"",
              menuName:"牛排",
              remarks:"常规糖、辣味、多葱",
              goodNumber:3,
              price:"19.8",
              total:"100"
            },
            {
              id:1322,
              menuUrl:"",
              menuName:"牛排",
              remarks:"常规糖、辣味、多葱",
              goodNumber:3,
              price:"19.8",
              total:"100"
            }
         ]
       },
       {
        id:1322,
        orderNo:"1238363749227",
        orderStatus:"进行中",
        tableNumber:"9",
        talalPrice:"9999",
        children:[
           {
             id:1322,
             menuUrl:"",
             menuName:"牛排",
             remarks:"常规糖、辣味、多葱",
             goodNumber:3,
             price:"19.8",
             total:"100"
           },
           {
             id:1322,
             menuUrl:"",
             menuName:"牛排",
             remarks:"常规糖、辣味、多葱",
             goodNumber:3,
             price:"19.8",
             total:"100"
           },
           {
             id:1322,
             menuUrl:"",
             menuName:"牛排",
             remarks:"常规糖、辣味、多葱",
             goodNumber:3,
             price:"19.8",
             total:"100"
           }
        ]
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