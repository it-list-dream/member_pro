const app = getApp()
var api = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //是否免费
    isFree: true,
    payment: ['微信支付', '储值支付'],
    //选座
    chooseSeat: false,
    //选择座位的号码
    num: -1,
    seatList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      navHeight: app.globalData.navHeight,
      navTop: app.globalData.navTop,
      tclass: JSON.parse(options.tclass)
    })
  },
  handleSeat: function () {
    //that.data.tclass.IsPickNumChk == 0
    var that = this
    //需要选座
    if (that.data.tclass.IsPickNumChk == 1) {
      this.setData({
        chooseSeat: true
      })
      that.getCardTogetherIsPickNum();
    } else {
      api.request({
        url: "/CardTogetherAppointment",
        data: {
          user_token: wx.getStorageSync('token'),
          UI_ID: wx.getStorageSync('UI_ID'),
          CTO_ID: that.data.tclass.CTO_ID,
          //座位号
          PickNum: 0
        }
      }).then(res => {
        console.log(res)
        if (res.data.code == 1) {
          wx.navigateTo({
            url: '/page2/suceess/suceess',
          })
        } else {
          wx.showToast({
            icon: "none",
            title: res.data.msg,
          })
        }
      })
    }



  },
  close: function () {
    this.setData({
      chooseSeat: false,
      num:null
    })
  },
  //选座
  getCardTogetherIsPickNum: function () {
    var that = this
    api.request({
      url: "/CardTogetherIsPickNum",
      data: {
        user_token: wx.getStorageSync('token'),
        CTO_ID: that.data.tclass.CTO_ID
      }
    }).then(res => {
      console.log(res)
      that.setData({
        seatList: res.data.data
      })
    })
  },
  judgeSeatExist1:function(){
     wx.showToast({
       icon:"none",
       title: '该座位已被占用',
     })
  },
  judgeSeatExist2:function(e){
    this.setData({
      num:e.currentTarget.dataset.index
    })
  },
  onconfirm:function(){
    var that = this
     api.request({
       url:"/CardTogetherAppointment",
        data: {
          user_token: wx.getStorageSync('token'),
          UI_ID: wx.getStorageSync('UI_ID'),
          CTO_ID: that.data.tclass.CTO_ID,
          //座位号
          PickNum: that.data.num
        }
     }).then(res=>{
       console.log(res)
       that.setData({
         num:null
       })
       if (res.data.code == 1) {
        wx.navigateTo({
          url: '/page2/suceess/suceess',
        })
      } else {
        wx.showToast({
          icon: "none",
          title: res.data.msg,
        })
      }
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

  },
})