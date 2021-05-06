// pages/home/home.js
const app = getApp();
const api = require('../../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerlist: ['/static/home_pic/banner01.png', '/static/home_pic/banner01.png', '/static/home_pic/banner01.png', '/static/home_pic/banner01.png', '/static/home_pic/banner01.png'],
    coachList: [],
    recomentList: [],
    activityCard: [],
    store: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData)
    this.setData({
      navHeight: app.globalData.navHeight,
      navTop: app.globalData.navTop,
      GymName: wx.getStorageSync('GymName')
    })
  },
  recomment() {
    wx.navigateTo({
      url: '/pages/classList/classList',
    })
  },
  callPhone(e) {
    console.log()
    if (e.currentTarget.dataset.phone) {
      wx.makePhoneCall({
        phoneNumber: e.currentTarget.dataset.phone //仅为示例，并非真实的电话号码
      }).catch((e) => {
        console.log(e) //用catch(e)来捕获错误{makePhoneCall:fail cancel}
      })

    }
  },
  toShop() {
    wx.navigateTo({
      url: '/pages/shop/shop',
    })
  },
  goLeagueLecture() {
    wx.navigateTo({
      url: '/pages/appointment/appointment',
    })
  },
  allCoach() {
    wx.navigateTo({
      url: '/pages/coachList/coachList',
    })
  },
  toActive() {
    wx.navigateTo({
      url: '/pages/activeList/activeList',
    })
  },
  phone: function (e) {
    console.log(e.currentTarget.dataset.phone)
    let phoneNumber = e.currentTarget.dataset.phone
    if (phoneNumber) {
      wx.makePhoneCall({
        phoneNumber: phoneNumber
      }).catch((e) => {
        console.log(e) //用catch(e)来捕获错误{makePhoneCall:fail cancel}
      })

    } else {
      wx.showToast({
        icon:'none',
        title: '该教练没有预留手机号码',
      })
    }
  },
  memberCode() {
    wx.navigateTo({
      url: '/page2/memberCode/memberCode',
    })
  },
  //定位
  Rad: function (d) { //根据经纬度判断距离
    return d * Math.PI / 180.0;
  },
  //计算商家和用户之间的距离
  getDistance: function () {
    var that = this;
    // lat1用户的纬度  // lng1用户的经度  // lat2商家的纬度  // lng2商家的经度
    var lat1 = this.data.latitude;
    var lng1 = this.data.longitude;
    if (lat1 && lng1) {
      var list = this.data.storeList;
      for (var i = 0; i < list.length; i++) {
        var radLat1 = this.Rad(lat1);
        var radLat2 = this.Rad(list[i].lat);
        var a = radLat1 - radLat2;
        var b = this.Rad(lng1) - this.Rad(list[i].lng);
        var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
        s = s * 6378.137;
        s = Math.round(s * 10000) / 10000;
        s = s.toFixed(2) //保留两位小数
        list[i].distance = s;
      }
      app.globalData.store = list.sort(this.compare('distance'))[0];
      that.setData({
        store: app.globalData.store
      })
    } else {
      app.globalData.store = that.data.storeList[0]
      that.setData({
        store: that.data.storeList[0]
      })
    }

  },
  //获取门店信息
  getGymList() {
    var that = this;
    api.request({
      url: "/GymList",
      data: {
        user_token: wx.getStorageSync('token')
      }
    }).then(res => {
      that.setData({
        storeList: res.data.data
      })
      if (!app.globalData.store) {
        that.getDistance();
        console.log('计算距离');
        wx.setStorageSync('GB_ID', app.globalData.store.GB_ID)       
      }else{
        that.setData({
          store:app.globalData.store
        })
        wx.setStorageSync('GB_ID', app.globalData.store.GB_ID)   
      }
      //教练风采
      this.getCoachStyleList()
      //推荐课程
      this.getSuggestCoachClass()
      //活动卡推荐
      this.getSuggestActivityCard();
    })
  },
  //明星教练
  getCoachStyleList: function () {
    var that = this;
    api.request({
      url: '/CoachStyleList',
      data: {
        user_token: wx.getStorageSync('token'),
        GB_ID: that.data.store.GB_ID
      }
    }).then(res => {
      console.log(res)
      if (res.data.data.length > 3) {
        that.setData({
          coachList: res.data.data.slice(0, 3)
        })
      } else {
        that.setData({
          coachList: res.data.data
        })
      }
    })
  },
  //推荐课程
  getSuggestCoachClass: function () {
    var that = this;
    api.request({
      url: '/SuggestCoachClass',
      data: {
        user_token: wx.getStorageSync('token'),
        GB_ID: that.data.store.GB_ID
      }
    }).then(res => {
      console.log(res.data.data);
      if (res.data.data.length > 4) {
        that.setData({
          recomentList: res.data.data.slice(0, 4)
        })
      } else {
        that.setData({
          recomentList: res.data.data
        })
      }
    })
  },
  //推荐活动卡
  getSuggestActivityCard: function () {
    var that = this;
    api.request({
      url: '/SuggestActivityCard',
      data: {
        user_token: wx.getStorageSync('token'),
        GB_ID: that.data.store.GB_ID
      }
    }).then(res => {
      that.setData({
        activityCard: res.data.data.slice(0, 2)
      })
      console.log(res)

    })
  },
  //定位
  getLocation() {
    let that = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
        })
      }
    });
  },
  compare: function (prop) {
    return function (a, b) {
      return Number(a[prop]) - Number(b[prop])
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getLocation();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //获取门店信息
    this.getGymList()


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