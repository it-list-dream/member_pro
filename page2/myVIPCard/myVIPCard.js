// page2/myVIPCard/myVIPCard.js
const app = getApp()
var api = require('../../utils/request.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    cardList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      navHeight: app.globalData.navHeight,
      navTop: app.globalData.navTop,
    })
    this.getMyAllCard();
  },
  lookReword: function (e) {
    let date = e.currentTarget.dataset.date;
    let ui_id = e.currentTarget.dataset.ui_id;
    //console.log(ui_id)
     if(date && date!==''){
      wx.navigateTo({
        url: '/page2/entrance/entrance?UI_ID='+ui_id,
      })
     }
  },
  getMyAllCard: function () {
    var that = this;
    api.request({
      url: "/MyAllVIPCard",
      data: {
        user_token: wx.getStorageSync('token')
      }
    }).then(res => {
      console.log(res)
      if (res.data.code == 1) {
        let cardList = res.data.data;
        let nowDate = new Date().getDate();
        let lastDate = new Date().getDate();
        console.log(nowDate,lastDate)
        cardList.forEach(item => {
           if(item.UI_FirstDate){
               item.status = '已激活'
           }else if(lastDate < nowDate){
              item.status = '已过期'
           }else{
             item.status = '未激活'
           }
        });
        that.setData({
          cardList: res.data.data
        })
      }
    })
  },
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
  // onShareAppMessage: function () {
  // }
})