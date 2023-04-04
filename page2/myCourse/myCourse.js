// page2/myCourse/myCourse.js
var app = getApp()
var api = require('../../utils/request.js')
var util = require('../../utils/util.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //分页
    pageSize: 5,
    currPage: 1,
    //（总记录数 + 每页数据大小  - 1） / 每页数据大小
    totalPages: 0,
    list: [{
      id: 1,
      value: "私教课"
    }, {
      id: 2,
      value: "团课"
    }],
    tabIndex: 0,

    myCoachList: [],
    hasContent: false,
    //团课
    leaguePackages: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let IsHidenCoachPre = parseInt(app.globalData.setOptions.IsHidenCoachPre);
    this.setData({
      navHeight: app.globalData.navHeight,
      navTop: app.globalData.navTop,
      isHideClass: IsHidenCoachPre
    });
    this.getMyCoachClassList();
    this.getGroupClassPackags();
  },
  getGroupClassPackags() {
    api.request({
      url: '/UserOrderGroupClass',
      data: {
        user_token: wx.getStorageSync('token'),
        GB_ID: wx.getStorageSync('GB_ID'),
        UI_ID: wx.getStorageSync('UI_ID') || -1
      }
    }).then(res => {
      let list = res.data.data,
        newList = [];
      var now = Date.now();
      if (list && Array.isArray(list)) {
        //次数为0或者过了有效期
        for (let i = 0; i < list.length; i++) {
          console.log(Date.parse(list[i].GO_ActiveEnd), now)
          if (Date.parse(list[i].GO_ActiveEnd) > now || list[i].GO_Have > 0) {
            console.log(list[i])
            list[i].GO_ActiveStart = util.format(list[i].GO_ActiveStart, 'yyyy-mm-dd');
            list[i].GO_ActiveEnd = util.format(list[i].GO_ActiveEnd, 'yyyy-mm-dd');
            newList.push(list[i]);
          }
        }
        this.setData({
          leaguePackages: newList
        })
      }
    })
  },
  personalAppointment: function (e) {
    let isHideClass = parseInt(app.globalData.setOptions.IsHidenCoachPre);
    if (!isHideClass) {
      let coach = JSON.stringify(e.currentTarget.dataset.coach);
      wx.navigateTo({
        url: '/pages/appointment/appointment?course=私教&coach=' + coach,
      });
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getMyCoachClassList() {
    var that = this;
    api.request({
      url: '/MyCoachClassList',
      data: {
        user_token: wx.getStorageSync('token'),
        pageSize: that.data.pageSize,
        pageIndex: that.data.currPage,
        UI_ID: wx.getStorageSync('UI_ID') || -1
      }
    }).then(res => {
      if (res.data.code == 1) {
        let {
          coachCount,
          data: privateEdu
        } = res.data,
          pages = Math.floor((coachCount + that.data.pageSize - 1) / that.data.pageSize),
          hasContent = pages == 1 && privateEdu.length == 0 ? true : false;
          if(res.data.data && Array.isArray(res.data.data)){
            that.setData({
              myCoachList: [...that.data.myCoachList, ...privateEdu],
              hasContent,
              totalPages: pages
            });
          }
      }
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
  tabItemChange(event) {
    let index = event.detail.index;
    this.setData({
      tabIndex: index
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    if (this.data.list[this.data.tabIndex].value == '私教课') {
      if (this.data.currPage < this.data.totalPages) {
        var pageSize = that.data.currPage + 1;
        that.setData({
          currPage: pageSize,
        });
        that.getMyCoachClassList();
      }
    }
  }
})