// pages/shop/shop.js
const app = getApp()
let api = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    storeList: [],
    gymCount: 0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(app.globalData)
    this.setData({
      navHeight: app.globalData.navHeight,
      navTop: app.globalData.navTop,
    })
  },
  getMyStoreList() {
    // let storeList = wx.getStorageSync('storeList');
    // if (storeList && storeList !== '') {
    //   this.setData({
    //     storeList: storeList,
    //     gymCount: storeList.length
    //   })
    //   this.findXy();
    // } else {
      api.request({
        url: "/GymList",
        data: {
          user_token: wx.getStorageSync('token')
        },
      }).then(res => {
        this.setData({
          storeList: res.data.data,
          gymCount: res.data.gymCount
        })
        this.findXy();
      })
  //  }
  },
  //获取用户的经纬度
  findXy() {
    let that = this;
    wx.getSetting({
      success: (res) => {
        console.log(res)
        // res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
        // res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
        // res.authSetting['scope.userLocation'] == true    表示 地理位置授权
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
          //未授权
          wx.showModal({
            title: '请求授权当前位置',
            content: '需要获取您的地理位置，请确认授权',
            success: function (res) {
              if (res.cancel) {
                //取消授权
                wx.showToast({
                  title: '拒绝授权',
                  icon: 'none',
                  duration: 1000
                })
              } else if (res.confirm) {
                //确定授权，通过wx.openSetting发起授权请求
                wx.openSetting({
                  success: function (res) {
                    if (res.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      //选择位置，需要用户授权
                      that.location();
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'none',
                        duration: 1000
                      })
                    }
                  }
                })
              }
            }
          })
        } else if (res.authSetting['scope.userLocation'] == undefined) {
          //用户首次进入页面,调用wx.getLocation的API  //选择位置，需要用户授权
          that.location();
        } else {
          //选择位置，需要用户授权
          that.location();
        }
      }
    })
  },
  //获取位置
  location: function () {
    var that = this
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        console.log(res.latitude, res.longitude)
        that.getDistance(res.latitude, res.longitude)
      }
    })
  },
  Rad: function (d) { //根据经纬度判断距离
    return d * Math.PI / 180.0;
  },
  //计算商家和用户之间的距离
  getDistance: function (lat1, lng1) {
    // lat1用户的纬度  // lng1用户的经度  // lat2商家的纬度  // lng2商家的经度
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
      if (!isNaN(s)) {
        list[i].distance = s;
      }
    }
    //排序
    list.sort(this.compare('distance'))
    this.setData({
      storeList: list
    })
  },
  //比较
  compare: function (prop) {
    return function (a, b) {
      return Number(a[prop]) - Number(b[prop])
    }
  },
  chooseStore: function (e) {
    // console.log(e.currentTarget.dataset.location)
    let store = e.currentTarget.dataset.location;
    wx.setStorageSync('GB_ID', store.GB_ID)
    // app.globalData.store = e.currentTarget.dataset.location;
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
    this.getMyStoreList();
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