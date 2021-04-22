var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    options_tab: ['全部', '赚积分', '花积分'],
    tab: 0,
    selectArray: [{
        id: 1,
        text: "全部"
      },
      {
        id: 2,
        text: "行为积分"
      },
      {
        id: 3,
        text: "消费积分"
      }
    ],
    all: [
      { 
        id:1,
        name:'进场签到',
        date:'2021-4-21 12:00',
        num:'+5000'
      },{
        id:2,
        name:'生日积分',
        date:'2021-4-1 11:00',
        num:'+2000'
      },{ 
        id:1,
        name:'进场签到',
        date:'2021-4-21 12:00',
        num:'+5000'
      },{
        id:2,
        name:'生日积分',
        date:'2021-4-1 11:00',
        num:'+2000'
      },
      { 
        id:1,
        name:'进场签到',
        date:'2021-4-21 12:00',
        num:'+5000'
      },{
        id:2,
        name:'生日积分',
        date:'2021-4-1 11:00',
        num:'+2000'
      },
      { 
        id:1,
        name:'进场签到',
        date:'2021-4-21 12:00',
        num:'+5000'
      },{
        id:2,
        name:'生日积分',
        date:'2021-4-1 11:00',
        num:'+2000'
      },
      { 
        id:1,
        name:'进场签到',
        date:'2021-4-21 12:00',
        num:'+5000'
      },{
        id:2,
        name:'生日积分',
        date:'2021-4-1 11:00',
        num:'+2000'
      },
      { 
        id:1,
        name:'进场签到',
        date:'2021-4-21 12:00',
        num:'+5000'
      },{
        id:2,
        name:'生日积分',
        date:'2021-4-1 11:00',
        num:'+2000'
      }
    ],
    profitable: [ {
      id:3,
      name:'签到',
      date:'2021-1-21 12:00',
      num:'+5000'
    },{
      id:4,
      name:'生日积分',
      date:'2021-4-1 11:00',
      num:'+2000'
    }],
    takeIntegral: [ {
      id:11,
      name:'进场签到',
      date:'2021-4-21 12:00',
      num:'-5000'
    },{
      id:12,
      name:'生日积分',
      date:'2021-4-1 11:00',
      num:'-2000'
    }]
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
  optionsTab: function (e) {
    console.log(e.target);
    var index = e.target.dataset.index;
    this.setData({
      tab: index
    })
  },
  getDate: function (e) {
    console.log(e)
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