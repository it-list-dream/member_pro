// pages/home/home.js
const app = getApp();
const api = require('../../../utils/request.js');
const util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList: [],
    bannerList1: ['http://user.360ruyu.cn/images/userBanner/banner2.png', 'http://user.360ruyu.cn/images/userBanner/banner3.png'],
    coachList: [],
    recomentList: [],
    activityCard: [],
    store: null,
    GymLogo: null,
    //我的会员卡
    myCard: null
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //定位信息
    this.getLocation();
    this.getSearchGymQR();
    //获取会员卡
    this.getMyAllVIPCard();
    this.setData({
      navHeight: app.globalData.navHeight,
      navTop: app.globalData.navTop,
      //  GymName: wx.getStorageSync('GymName'),
      menuRight: app.globalData.menuRight
    })
  },
  callPhone(e) {
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
        icon: 'none',
        title: '该教练没有预留手机号码',
      })
    }
  },
  toShop() {
    wx.navigateTo({
      url: '/pages/shop/shop',
    })
  },
  code: function () {
    wx.scanCode({
      success(res) {
        console.log(res)
      }
    })
  },
  //私教预约
  goLeagueLecture() {
    //判断用户是否登录
    let phone = wx.getStorageSync('phone')
    if (phone && phone !== '') {
      wx.navigateTo({
        url: '/pages/appointment/appointment?course=0',
      })
    } else {
      wx.navigateTo({
        url: '/page2/login/login',
      })
    }
  },
  recomment() {
    wx.navigateTo({
      url: '/pages/classList/classList',
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
  memberCode() {
    let phone = wx.getStorageSync('phone')
    if (phone && phone !== '') {
      //未登录
      wx.navigateTo({
        url: '/page2/memberCode/memberCode',
      })
    } else {
      wx.navigateTo({
        url: '/page2/login/login',
      })
    }
  },
  //获取我的会员卡
  getMyAllVIPCard: function () {
    var that = this;
    api.request({
      url: "/MyAllVIPCard",
      data: {
        user_token: wx.getStorageSync('token')
      }
    }).then(res => {
      //有卡优先到有卡的门店
      if (res.data.code == 1) {
        console.log(res.data.data)
        that.setData({
          myCard: res.data.data
        })
      }
    })
  },
  //定位
  Rad: function (d) { //根据经纬度判断距离
    return d * Math.PI / 180.0;
  },
  //计算商家和用户之间的距离
  getDistance: function () {
    var that = this;
    let locationList = this.data.storeList;
    let cardList = this.data.myCard;
    // lat1用户的纬度  // lng1用户的经度  // lat2商家的纬度  // lng2商家的经度
    var lat1 = this.data.latitude;
    var lng1 = this.data.longitude;
    if (lat1 && lng1) {
      for (let i = 0; i < locationList.length; i++) {
        var radLat1 = this.Rad(lat1);
        var radLat2 = this.Rad(locationList[i].lat);
        var a = radLat1 - radLat2;
        var b = this.Rad(lng1) - this.Rad(locationList[i].lng);
        var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
        s = s * 6378.137;
        s = Math.round(s * 10000) / 10000;
        s = s.toFixed(2) //保留两位小数
        locationList[i].distance = s;
      }

      locationList.sort(this.compare('distance'))
      //console.log(locationList)
      //有卡
      if (that.data.myCard) {
        for (let j = 0; j < locationList.length; j++) {
          for (let k = 0; k < cardList.length; k++) {
            if (locationList[j].GB_ID == cardList[k].FK_GB_ID) {
              that.setData({
                store: locationList[j]
              })
              // console.log(locationList[j])
              //  app.globalData.store = locationList[j]
              wx.setStorageSync('GB_ID', that.data.store.GB_ID)
              break;
            }
          }
        }
        console.log('定位且有卡')
      } else {
        //没卡就定位
        //  app.globalData.store = locationList[0];
        that.setData({
          store: locationList[0]
        })
        wx.setStorageSync('GB_ID', that.data.store.GB_ID)
        console.log('定位且没有卡')
      }
      // console.log(locationList.sort(this.compare('distance')))
    } else {
      //没定位
      if (that.data.myCard) {
        var newList = that.data.myCard.map(item => item.CheckInDate)
        let slist = that.data.storeList;
        let latest = util.closestToCurrentTime(newList);
        for (let i = 0; i < slist.length; i++) {
          if (slist[i].GB_ID == cardList[latest].FK_GB_ID) {
            that.setData({
              store: slist[i]
            })
            wx.setStorageSync('GB_ID', that.data.store.GB_ID)
            // app.globalData.store = slist[i]
          }
        }
        console.log('没定位有卡，以最后一次离场')
      } else {
        that.setData({
          store: that.data.storeList[0]
        })
        wx.setStorageSync('GB_ID', that.data.store.GB_ID)
        //  app.globalData.store = that.data.storeList[0];
        console.log('没定位且没有卡')
      }
    }
  },
  getDistance1() {
    var that = this;
    let list1 = that.data.storeList;
    // lat1用户的纬度  // lng1用户的经度  // lat2商家的纬度  // lng2商家的经度
    var lat1 = this.data.latitude;
    var lng1 = this.data.longitude;
    if (lat1 && lng1) {
      for (let i = 0; i < list1.length; i++) {
        var radLat1 = this.Rad(lat1);
        var radLat2 = this.Rad(list1[i].lat);
        var a = radLat1 - radLat2;
        var b = this.Rad(lng1) - this.Rad(list1[i].lng);
        var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
        s = s * 6378.137;
        s = Math.round(s * 10000) / 10000;
        s = s.toFixed(2) //保留两位小数
        list1[i].distance = s;
      }
      list1.sort(this.compare('distance'))
      that.setData({
        store: list1[0]
      })
      wx.setStorageSync('GB_ID', that.data.store.GB_ID)
      // app.globalData.store = list1[0];
    } else {
      that.setData({
        store: that.data.storeList[0]
      })
      // app.globalData.store = that.data.storeList[0];
      wx.setStorageSync('GB_ID', that.data.store.GB_ID)
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
      //未登录
      let phone = wx.getStorageSync('phone');
      let gb_id = wx.getStorageSync('GB_ID');
      let my_store = null;
      if (phone && phone !== '') {
        //登录
        // console.log('登录')
        if (!wx.getStorageSync('GB_ID') || wx.getStorageSync('GB_ID') == ' ') {
          console.log('第一次进入 登录')
          that.getDistance();
        } else {
          //加载门店的信息
          my_store = that.data.storeList.filter(item => item.GB_ID == gb_id)
          // console.log(my_store)
          if (my_store.length > 0) {
            that.setData({
              store: my_store[0]
            })
          }
        }

        // if (!app.globalData.store || !wx.getStorageSync('GB_ID') || wx.getStorageSync('GB_ID'=='')) {
        //   that.getDistance();
        // } else {
        //   that.setData({
        //     store: app.globalData.store
        //   })
        //   wx.setStorageSync('GB_ID', app.globalData.store.GB_ID)
        // }

      } else {
        //未登录
        // console.log('登录')
        if (!wx.getStorageSync('GB_ID') || wx.getStorageSync('GB_ID' == '')) {
          that.getDistance1()
          console.log('第一次进入 未登录')
        } else {
           //加载门店的信息
           my_store = that.data.storeList.filter(item => item.GB_ID == gb_id)
           // console.log(my_store)
           if (my_store.length > 0) {
             that.setData({
               store: my_store[0]
             })
           }
        }
        //   // that.setData({
        //   //   store: app.globalData.store
        //   // })
        //   wx.setStorageSync('GB_ID', app.globalData.store.GB_ID)
        // }
      }
      //教练风采
      this.getCoachStyleList()
      //推荐课程
      this.getSuggestCoachClass()
      //活动卡推荐
      this.getSuggestActivityCard();
      //轮播图
      this.getBannerList();
    })
  },
  //明星教练
  getCoachStyleList: function () {
    var that = this;
    api.request({
      url: '/CoachStyleList',
      data: {
        user_token: wx.getStorageSync('token'),
        // GB_ID: that.data.store.GB_ID
        GB_ID: wx.getStorageSync('GB_ID')
      }
    }).then(res => {
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
  //轮播图
  getBannerList: function () {
    var that = this
    api.request({
      url: "/BannerList",
      data: {
        user_token: wx.getStorageSync('token'),
        GB_ID: wx.getStorageSync('GB_ID')
      }
    }).then(res => {
      if (res.data.code == 1) {
        if (res.data.data.length > 0) {
          that.setData({
            bannerList: res.data.data
          })
        } else {
          that.setData({
            bannerList: that.data.bannerList1
          })
        }

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
        //  GB_ID: that.data.store.GB_ID
        GB_ID: wx.getStorageSync('GB_ID')
      }
    }).then(res => {
      if (res.data.data.length > 2) {
        that.setData({
          recomentList: res.data.data.slice(0, 2)
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
        //   GB_ID: that.data.store.GB_ID
        GB_ID: wx.getStorageSync('GB_ID')
      }
    }).then(res => {
      that.setData({
        activityCard: res.data.data.slice(0, 2)
      })
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
  //
  getSearchGymQR: function () {
    var that = this
    api.request({
      url: "/SearchGymQR",
      data: {
        user_token: wx.getStorageSync('token')
      }
    }).then(res => {
      if (res.data.code == 1) {
        that.setData({
          GymLogo: res.data.data[0].GymLogo
        })
        // if (wx.getStorageSync('GymLog')) {
        //  wx.setStorageSync('GymLogo', res.data.data[0].GymLogo)
        // } else {
        wx.setStorageSync('GymLogo', res.data.data[0].GymLogo)
        //  }
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
    //获取门店信息
    this.getGymList()
  },
  //查看教练详情
  lookCoachDetail: function (e) {
    // console.log(e.currentTarget.dataset.coach);
    let coach = JSON.stringify(e.currentTarget.dataset.coach)
    wx.navigateTo({
      url: '/pages/coachDetail/coachDetail?coach=' + coach,
    })
  },
  //课程详情
  lookSuggClass: function (e) {
    let sclass = JSON.stringify(e.currentTarget.dataset.sclass)
    wx.navigateTo({
      url: '/pages/personalTrainer/personalTrainer?course1=' + sclass,
    })
  },
  //查看会员卡列表
  suggestCard: function (e) {
    //console.log(e.currentTarget.dataset.card)
    let card = JSON.stringify(e.currentTarget.dataset.card);
    wx.navigateTo({
      url: '/pages/activeDetail/activeDetail?card=' + card,
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  }
})