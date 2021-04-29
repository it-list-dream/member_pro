// page2/address/address.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList: [{
        id: 1,
        name: '张三',
        phoneNmuber: '13111458912',
        address: '上海市徐汇区中山西路2025',
        defaultAddress: false
      },
      {
        id: 2,
        name: '李四',
        phoneNmuber: '13111458912',
        address: '上海市虹口区afdf',
        defaultAddress: false
      },
      {
        id: 3,
        name: '王五',
        phoneNmuber: '19927823283',
        address: '上海市浦东新区祖冲之路',
        defaultAddress: false
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
  // radioChange() {
  //   let default_value = this.data.defValue;
  //   this.setData({
  //     defValue: !default_value
  //   })
  // },
  add_address() {
    wx.navigateTo({
      url: '/page2/addAdress/addAdress',
    })
  },
  edit() {
    wx.navigateTo({
      url: '/page2/addAdress/addAdress',
    })
  },
  isDefault: function (e) {
    let id = e.currentTarget.dataset.id;
    //let ad = `addressList[${id}].defaultAddress`;
    //console.log(e)
    // this.setData({
    //   [ad]: !this.data.addressList[id].defaultAddress
    // })
    for (var i = 0; i < this.data.addressList.length; i++) {
      if (i !== id) {
        this.data.addressList[i].defaultAddress = false;
      } else {
        this.data.addressList[i].defaultAddress = true;
      }
    }
    this.setData({
      addressList: this.data.addressList
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