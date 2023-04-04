// pages/selectCourse/selectCourse.js
var app = getApp()
var api = require('../../utils/request.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    cardImg: '/static/selectCourse.png',
    //每页显示的数量
    pageSize: 10,
    //当前页数
    currPage: 1,
    //教练列表
    coachClassList: [],
    coachList: [],
    flag: true,
    selectedCourse: 0,
    //选择的教练
    chooseIndex: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.CO_ID && options.tid) {
      this.getCoachTeacherList(options.CO_ID);
      this.co_id = options.CO_ID;
      this.tid = options.tid;
    }
    this.getMyCoachClassList();
    this.setData({
      navHeight: app.globalData.navHeight,
      navTop: app.globalData.navTop,
    })
  },
  getMyCoachClassList: function () {
    var that = this;
    api.request({
      url: "/MyCoachClassList",
      data: {
        user_token: wx.getStorageSync('token'),
        UI_ID: wx.getStorageSync('UI_ID') || -1,
        pageSize: that.data.pageSize,
        pageIndex: that.data.currPage
      }
    }).then(res => {
      //触底
      if (res.data.code == 1) {
        if (res.data.data.length > 0) {
          let newList1 = [...that.data.coachClassList, ...res.data.data];
          let cIndex = -1;
          cIndex = newList1.findIndex(item => {
            return item.CO_ID == this.co_id
          })
          //debugger;
          that.setData({
            coachClassList: newList1,
            selectedCourse: cIndex >= 0 ? cIndex : 0
          })
        }
      } else {
        that.setData({
          flag: false
        })
      }
    })
  },
  orderCourse: function (e) {
    // console.log(e.currentTarget.dataset)
    if (e.currentTarget.dataset.idx == this.data.selectedCourse) {
      return;
    }
    //console.log(e.currentTarget.dataset)

    this.setData({
      selectedCourse: e.currentTarget.dataset.idx,
      chooseIndex: 0
    })
    this.selectedId = e.currentTarget.dataset.coach.FK_AL_TeachCoach_ID;
    this.getCoachTeacherList(e.currentTarget.dataset.coach.CO_ID);
  },
  bindPickerChange(e) {
    // console.log(e.detail)
    this.setData({
      chooseIndex: e.detail.value
    })
  },
  getCoachTeacherList(co_id) {
    api.request({
      url: "/CoachTeacherList",
      data: {
        user_token: wx.getStorageSync('token'),
        GB_ID: wx.getStorageSync('GB_ID'),
        co_id: co_id
      }
    }).then(res => {
      if (res.data.code == 1) {
        let newCoachList = res.data.data;
        // for(let i =0;i<10;i++){
        //     newCoachList.unshift({
        //         "AI_ID": "76"+i,
        //         "TeachName": "教练"+i,
        //         "AI_Tel": "15677777777",
        //         "AI_Face": ""
        //     })
        // }
        let tIndex = -1;
        if(this.selectedId){
          //console.log(this.selectedId)
          tIndex =  newCoachList.findIndex(item=>item.AI_ID == this.selectedId)
          console.log(tIndex)
        }else{
           tIndex = newCoachList.findIndex(item=>item.AI_ID == this.tid)
        }
        this.setData({
          coachList: res.data.data,
          chooseIndex:tIndex>=0?tIndex:0
        })        
      }
    })
  },
  onConfrim() {
    var currCoach = this.data.coachList[this.data.chooseIndex];
    var currCourse = this.data.coachClassList[this.data.selectedCourse];
    //console.log(this.data.chooseIndex)
    // console.log(currCourse,currCoach)
    var pages = getCurrentPages(); //当前页面
    var prevPage = pages[pages.length - 2]; //上一页面
    prevPage.setData({
      currentCoach: currCoach,
      currentClasses: currCourse
    });
    console.log(currCoach.AI_ID,prevPage.data.SearchDate);
    //刷新
    prevPage.getPrivateAppointment(currCoach.AI_ID,prevPage.data.SearchDate)
    wx.navigateBack({
      delta: 1,
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('触底反应')
    var that = this;
    if (this.data.flag) {
      var pageSize = that.data.currPage + 1; //获取当前页数并+1
      that.setData({
        currPage: pageSize, //更新当前页数
      })
      that.getMyCoachClassList(); //重新调用请求获取下一页数据
    }
  }
})