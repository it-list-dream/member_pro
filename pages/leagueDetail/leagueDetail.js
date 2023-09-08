const util = require("../../utils/util");

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stars: [0, 1, 2, 3, 4],
    score: 3,
    // modeList: ['包次(30次)', '包月(30天内不限次数)'],
    modeIndex: 0,
    saleList: [],
    leaguePrice: 0,
    isModel:false,
    gymPhone:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var league = JSON.parse(options.league),
      currDate = Date.now();
    var {
      priceList
    } = league;
    let unitPrice = priceList[this.data.modeIndex].SP_Price
    priceList.forEach(item => {
      item.modeinfo = item.SP_Type == 1 ? (item.SP_Days + '' + item.SP_DayType) : (item.SP_Num + '次');
      if (item.SP_DayType == '年') {
        item.lifespan =util.format( currDate + parseInt(item.SP_Days) *365*24*60*60*1000,'yyyy-mm-dd');
      } else if (item.SP_DayType == '月') {
        item.lifespan = util.format(currDate + parseInt(item.SP_Days) *30*24*60*60*1000,'yyyy-mm-dd')
      } else {
        item.lifespan = util.format( currDate + parseInt(item.SP_Days) *24*60*60*1000,'yyyy-mm-dd')
      }
    });
    //console.log(priceList)
    this.setData({
      navHeight: app.globalData.navHeight,
      navTop: app.globalData.navTop,
      league,
      saleList: priceList,
      leaguePrice: unitPrice,
      gymPhone:app.globalData.gymPhone
    })
  },
  closeModel(){
     this.setData({
       isModel:false
     })
  },
  buyClass(){
     this.setData({
       isModel:true
     })
  },
  modeChange(event) {
    let saleList = this.data.saleList,
      unitPrice = 0;
    let value = event.detail.value;
    unitPrice = saleList[event.detail.value].SP_Price;
    this.setData({
      modeIndex: value,
      leaguePrice: unitPrice
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  handleAppoinment() {
    // let isCanCoach = Number(app.globalData.setOptions.IsHidenCoachPre);
    wx.navigateTo({
      url: `/pages/appointment/appointment?course=普拉提`,
    });
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

  }
})