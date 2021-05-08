// pages/my/my.js
const app = getApp();
var api = require('../../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    serviceList: [{
        id: 1,
        name: '预约日程',
        img: '/static/my/app_info.png',
        unreadyNum:1
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
    ],
    //0表示既未绑定手机号码又未获取用户信息
    //1表示授权了用户信息，但未绑定手机号码
    //2 完成了登录流程
    loginStatus: 0,
    myVipCardCount:0,
    myCoachCount:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMyAllCrad()
    this.setData({
      navHeight: app.globalData.navHeight,
      navTop: app.globalData.navTop,
    })
   // this.tranfromImage()

  },
  tranfromImage(e) {
    wx.chooseImage({
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
    console.log(e.currentTarget.dataset.index)
    let index = e.currentTarget.dataset.index
    let path = '';
    switch (index) {
      case 0:
        path = '/page2/historyAppointment/historyAppointment'
        break;
      case 1:
        path = '/page2/order/order'
        break;
      case 2:
        path = '/pages/tabbar/integral/integral'
        break;
      case 3:
        path = "/pages/movementData/movementData"
        break;
      case 4:
        path = '/page2/smartDevice/smartDevice'
        break;
      case 5:
        path = '/page2/address/address'
        break
    }
    //console.log(path)
    if (path.trim()) {
      if (index == 2) {
        wx.switchTab({
          url: path,
        })
      } else {
        wx.navigateTo({
          url: path,
        })
      }

    }
  },
  edit: function () {
    wx.navigateTo({
      url: '/page2/editProfile/editProfile',
    })
  },
  vipCard: function () {
    //判断
    wx.navigateTo({
      url: '/page2/myVIPCard/myVIPCard',
    })
  },
  perCourse: function () {
    //判断
    wx.navigateTo({
      url: '/page2/myCourse/myCourse',
    })
  },
  message: function () {
    //判断
    wx.navigateTo({
      url: '/page2/inform/inform',
    })
  },
  storedMoney: function () {
    //判断
    wx.navigateTo({
      url: '/page2/myStored/myStored',
    })
  },
  inteAwrad: function () {
    wx.navigateTo({
      url: '/page2/myIntegral/myIntegral',
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //用户状态
    var status = wx.getStorageSync('loginStatus') || 0;
    console.log(status)
    //获取用户信息
    var info = wx.getStorageSync('userInfo');
    //获取用户的手机号码
    var phone = wx.getStorageSync('phone')|| '';
    console.log(status)
    if (status == 1 || status ==2) {
      this.setData({
        loginStatus: status,
        info:JSON.parse(info),
        phone:phone
      })
    }else{
      this.setData({
        loginStatus: status
      })
    }
  },
  getMyAllCrad:function(){
    var that = this;
    api.request({
      url:"/MyAllVIPCard",
      data:{
        user_token:wx.getStorageSync('token')
      }
    }).then(res=>{
    //  res.data.data
      console.log(res)
      that.setData({
        myVipCardCount:res.data.cardCount
      })
    })
  },
  getAllPersonalCourse:function(){
    var that = this;
    api.request({
      url:"/MyCoachClassList",
      data:{
        user_token:wx.getStorageSync('token'),
      }
    }).then(res=>{
    //  res.data.data
      console.log(res)
      that.setData({
        myVipCardCount:res.data.cardCount
      })
    })
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