// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    serviceList: [{
        id: 1,
        name: '预约日程',
        img: '/static/my/app_info.png'
      },
      {
        id: 2,
        name: '我的订单',
        img: '/static/my/order.png'
      },
      {
        id: 3,
        name: '积分商城',
        img: '/static/my/integral.png'
      },
      {
        id: 4,
        name: '运动记录',
        img: '/static/my/recod.png'
      },
      {
        id: 5,
        name: '会员体测',
        img: '/static/my/test.png'
      },
      {
        id: 6,
        name: '收货地址',
        img: '/static/my/location.png'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.tranfromImage();
  },
  tranfromImage(e) {
    wx.chooseImage({
      //  count: parseInt(e.currentTarget.dataset.num),
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log('data:image/jpg;base64,' + wx.getFileSystemManager().readFileSync(res.tempFilePaths[0], "base64"))
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  lookRecord(e) {
    console.log(e.target.dataset.index)
    let index = e.target.dataset.index
    console.log(index);
    //return;
    let path = '';
    switch (index) {
      case 0:
        path = '/page2/historyAppointment/historyAppointment'
        break;
      case 1:
        path = '/page2/order/order'
        break;
        case 5:
          path = '/page2/address/address'
          break
    }
    wx.navigateTo({
      url: path,
    })
  },
  edit(){
     wx.navigateTo({
       url: '/page2/editProfile/editProfile',
     })
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