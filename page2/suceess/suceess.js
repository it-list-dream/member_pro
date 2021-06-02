
// page2/suceess/suceess.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isShow: 1,
    coach: null,
    //花费的积分
    costInte: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     console.log(options)
    // if (options.coach) {
    //   this.setData({
    //     coach: JSON.parse(options.coach)
    //   })
    // }
    if (options.isShow) {
      this.setData({
        isShow: options.isShow,
        //积分
        costInte: options.costPoints,
        se_id: options.se_id,
        prizeType: options.prizeType,
         //vip 还是普通
        inteType: options.inteType,
        //vip 还是普通
        //type: options.inteType,
        //教练id
        teacherid: options.teacherid,
        //卡ID
        sc_id: options.sc_id,
        //团课
        cto_id:options.CTO_ID
      })
    }
    this.setData({
      navHeight: app.globalData.navHeight,
      navTop: app.globalData.navTop,
    })
  },
  backHome: function () {
    wx.reLaunch({
      url: '/pages/tabbar/home/home',
    })
  },
  lookCoachList: function () {
    //教练列表
    wx.navigateTo({
      url: '/pages/coachList/coachList',
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
  onShareAppMessage: function (options) {
    console.log(options)
    var that = this
    let type = this.data.isShow;
    let imageUrl = 'http://user.360ruyu.cn/images/share2.jpg';
    let title = '唯有健康身体是属于自己的';
    let path_url = '';
    //标识
    let sign = wx.getStorageSync('UrlBySign');
    //门店id
    let GB_ID = wx.getStorageSync('GB_ID');
    if (type == 0) {
      console.log('团课分享');
      path_url = '/pages/groupAppointment/groupAppointment?sign='+sign+'&CTO_ID='+that.data.cto_id
      console.log(sign,that.data.cto_id)
    } else if (type == 1) {
      console.log('私教分享');
      path_url = '/pages/coachList/coachList?sign=' + sign + '&GB_ID=' + GB_ID;
      //到首页
    } else if (type == 2) {
      console.log('会员卡分享');
      path_url = '/pages/activeDetail/activeDetail?SC_ID=' + that.data.sc_id + '&sign=' + sign + '&GB_ID=' + GB_ID;
    } else if (type == 3) {
      console.log('购买私教课分享');
      path_url = '/pages/coachDetail/coachDetail?teacherid=' + that.data.teacherid + '&sign=' + sign + '&GB_ID=' + GB_ID;
      console.log(that.data.teacherid, sign, GB_ID);
    } else if (type == 4) {
      console.log('积分兑换');
      title = '自律的人才能拥有回报';
      imageUrl = 'http://user.360ruyu.cn/images/share1.jpg';
      //se_id:	 prizeType
      path_url = '/page2/integralMall/integralMall?sign=' + sign + '&GB_ID=' + GB_ID + '&se_id=' + that.data.se_id + '&price_type=' + that.data.prizeType + '&type=' + that.data.inteType
      console.log(sign, GB_ID, that.data.se_id,that.data.prizeType, that.data.inteType)
    }
    return {
      title: title,
      imageUrl: imageUrl,
      path: path_url
    }
  }
})