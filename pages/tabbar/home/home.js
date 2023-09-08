// pages/home/home.js
const app = getApp();
const api = require('../../../utils/request.js');
const util = require('../../../utils/util.js');
import {
  checkLogin
} from '../../../utils/authorities.js'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    bannerList: [],
    coachList: [],
    recomentList: [],
    activityCard: [],
    //切换门店
    GymLogo: null,
    store: null,
    //加载
    loading: true,
    //轮播图
    hideBanner: false,
    //门店
    hideStore: false,
    hideCategory: false,
    //导航
    hideNav: false,
    //教练列表
    hideCoachList: false,
    hideOthers: true,
    //设置
    setOptions: {},
    isFresh: false,
    leagueList: [],
    //onlineCount: 0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      navHeight: app.globalData.navHeight,
      navTop: app.globalData.navTop,
      menuRight: app.globalData.menuRight
    });
    this.getSearchGymQR();
    this.getAllStore();
    // this.getLocation();
  },
  getAllStore() {
    api.request({
      url: "/GymList",
      data: {
        user_token: wx.getStorageSync('token')
      },
    }).then(res => {
      //wx.setStorageSync('storeList', res.data.data);
      this.getRecentlyStore(res.data.data, () => {
        this.getBannerList();
        this.getCoachStyleList();
        this.getSuggestCoachClass();
        this.getSuggestActivityCard();
        this.getSuggestLeague();
        //设置
        this.getOtherSet();
      });
    })
  },
  getRecentlyStore(recentStore, callback) {
    var reacentCheckIn = null,
      GB_ID = wx.getStorageSync('GB_ID');
    api.request({
      url: "/MyAllVIPCard",
      data: {
        user_token: wx.getStorageSync('token')
      }
    }).then(res => {
      if (res.data.code == 1) {
        var cardList = res.data.data,
          //开过卡的卡
          CheckInCards = [],
          currentStore = null;
        const expireTime = wx.getStorageSync('expireTime')
        //自动切换到最近一次进场的会员卡和门店
        if (cardList.length > 0) {
          for (let i = 0; i < cardList.length; i++) {
            if (cardList[i].CheckInDate) {
              cardList[i].timestamp = Date.parse(cardList[i].CheckInDate);
              CheckInCards.push(cardList[i]);
            }
          }
          reacentCheckIn = CheckInCards.sort(this.compare('timestamp'));
          if (expireTime && expireTime > reacentCheckIn[0].timestamp) {
            currentStore = recentStore.filter(item => item.GB_ID == GB_ID)[0];
            wx.setStorageSync('UI_ID', currentStore.UI_ID);
          } else {
            if (reacentCheckIn.length > 0) {
              currentStore = recentStore.filter(item => item.GB_ID == reacentCheckIn[0].FK_GB_ID)[0];
              wx.setStorageSync('UI_ID', reacentCheckIn[0].UI_ID);
              console.log('有最近进场记录', currentStore)
            } else {
              currentStore = recentStore.filter(item => item.GB_ID == cardList[0].FK_GB_ID)[0];
              wx.setStorageSync('UI_ID', cardList[0].UI_ID)
              console.log('没有进场记录', currentStore)
            }
            wx.setStorageSync('GB_ID', currentStore.GB_ID);
          }
        } else {
          currentStore = recentStore[0];
        }
        callback && callback();
        app.globalData.gymPhone = currentStore.GymTel;
        this.setData({
          store: currentStore,
          hideBanner: true,
          hideCategory: true,
          hideStore: true,
          hideNav: true,
          hideCoachList: true,
          loading: false,
          hideOthers: false
        });
      } else if (res.data.code == -2) {
        wx.setStorageSync('GB_ID', recentStore[0].GB_ID);
        //表示未登录
        callback && callback();
        app.globalData.gymPhone = recentStore[0].GymTel;
        this.setData({
          store: recentStore[0],
          hideBanner: true,
          hideCategory: true,
          hideStore: true,
          hideNav: true,
          hideCoachList: true,
          loading: false,
          hideOthers: false
        });
      }
    })
  },
  callPhone(e) {
    let phoneNumber = e.currentTarget.dataset.phone;
    if (this.data.setOptions.IsHidenCoachPhone == 1) {
      phoneNumber = this.data.store.GymTel
    }
    if (phoneNumber) {
      wx.makePhoneCall({
        phoneNumber: phoneNumber
      }).catch((e) => {
        console.log(e)
      })
    } else {
      wx.showToast({
        icon: 'none',
        title: '该教练没有预留手机号码',
      })
    }
  },
  //私教预约
  goLeagueLecture() {
    checkLogin('/pages/appointment/appointment?course=私教')
  },
  //运动记录
  sportRecord() {
    checkLogin('/pages/movementData/movementData')
  },
  //明星教练
  getCoachStyleList: function () {
    var that = this;
    api.request({
      url: '/CoachStyleList',
      data: {
        user_token: wx.getStorageSync('token'),
        GB_ID: wx.getStorageSync('GB_ID')
      }
    }).then(res => {
      that.setData({
        coachList: res.data.data
      })
    })
  },
  //轮播图
  getBannerList: function () {
    api.request({
      url: "/BannerList",
      data: {
        user_token: wx.getStorageSync('token'),
        GB_ID: wx.getStorageSync('GB_ID')
      }
    }).then(res => {
      var defaultBanner = ['http://user.360ruyu.cn/images/userBanner/banner2.png', 'http://user.360ruyu.cn/images/userBanner/banner3.png'],
        bannerList = [];
      if (res.data.data && res.data.data.length > 0) {
        bannerList = res.data.data;
      } else {
        bannerList = defaultBanner;
      }
      this.setData({
        bannerList,
        onlineCount: res.data.checkInCount
      })
    })
  },
  //其他设置
  getOtherSet() {
    var that = this;
    api.request({
      url: "/OtherSet",
      data: {
        user_token: wx.getStorageSync('token'),
        GB_ID: wx.getStorageSync('GB_ID')
      }
    }).then(res => {
      if (res.statusCode == 200) {
        //console.log(res.data.data)
        that.setData({
          setOptions: res.data.data[0]
        })
        app.globalData.setOptions = res.data.data[0];
      } else if (res.statusCode == 500) {
        let options = {
          IsHidenCoachPhone: 0,
          IsHidenNum: 0,
          IsHidenCoachPre: 0
        };
        that.setData({
          setOptions: options
        })
        app.globalData.setOptions = options;
      }
    })
  },
  toLeague() {
    let type = "";
    if (app.globalData.leagueType == 1) {
      type = "普拉提团课"
    } else {
      type = "团课"
    }
    wx.navigateTo({
      url: '/pages/appointment/appointment?course=' + type,
    })
  },
  //推荐课程
  getSuggestCoachClass: function () {
    var that = this;
    api.request({
      url: '/SuggestCoachClass',
      data: {
        user_token: wx.getStorageSync('token'),
        GB_ID: wx.getStorageSync('GB_ID')
      }
    }).then(res => {
      if (res.data.code == 1) {
        this.setData({
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
        GB_ID: wx.getStorageSync('GB_ID')
      }
    }).then(res => {
      that.setData({
        activityCard: res.data.data
      })
    })
  },
  getSuggestLeague() {
    var that = this;
    api.request({
      url: '/GroupClassSuggest',
      data: {
        user_token: wx.getStorageSync('token'),
        GB_ID: wx.getStorageSync('GB_ID')
      }
    }).then(res => {
      console.log("leagueList:", res.data.data);
      if (res.data.data && Array.isArray(res.data.data)) {
        app.globalData.leagueType = 1;
        that.setData({
          leagueList: res.data.data
        })
      }
    })
  },
  compare: function (prop) {
    return function (a, b) {
      return Number(b[prop]) - Number(a[prop])
    }
  },
  //加载门店logo
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
        wx.setStorageSync('GymLogo', res.data.data[0].GymLogo)
      }
    })
  },
  //查看教练详情
  lookCoachDetail: function (e) {
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
    let card = JSON.stringify(e.currentTarget.dataset.card);
    wx.navigateTo({
      url: '/pages/activeDetail/activeDetail?card=' + card,
    })
  },
  leagueDetail(event) {
    var league = JSON.stringify(event.currentTarget.dataset.league);
    wx.navigateTo({
      url: '/pages/leagueDetail/leagueDetail?league=' + league,
    });
  },
  //显示地图
  showMap() {
    //31.252159, 121.521873, 15, "上海市杨浦区大连路地铁站"
    var {
      lat,
      lng,
      GB_Address
    } = this.data.store;
    this.openLocationFun(lat, lng, 15, GB_Address, "");
  },
  /**  
   * 使用微信内置地图查看位置  
   * 1、latitude：     纬度，范围为-90~90，负数表示南纬 必填  
   * 2、longitude：    经度，范围为-180~180，负数表示西经 必填  
   * 3、scale：        缩放比例，范围1~28，默认为28 选填  
   * 4、name：         位置名 选填  
   * 5、address：      地址的详细说明 选填  
   * 6、cbSuccessFun： 接口调用成功的回调函数 选填  
   * 7、cbFailFun：    接口调用失败的回调函数 选填  
   * 8、cbCompleteFun：接口调用结束的回调函数（调用成功、失败都会执行） 选填  
   */
  openLocationFun: function (latitude, longitude, scale, name, address, cbSuccessFun, cbFailFun, cbCompleteFun) {
    var openObj = {};
    if (latitude && longitude) {
      openObj.latitude = latitude;
      openObj.longitude = longitude;
    } else {
      return;
    }
    if (scale > 0 && scale < 29) {
      openObj.scale = scale;
    } else {
      openObj.scale = 15;
    }
    if (name && address) {
      openObj.name = name;
      openObj.address = address;
    }
    openObj.success = function (res) {
      if (cbSuccessFun) {
        cbSuccessFun();
      }
    }
    openObj.fail = function (res) {
      if (cbFailFun) {
        cbFailFun();
      } else {
        console.log("openLocation fail:" + res.errMsg);
      }
    }
    openObj.complete = function (res) {
      if (cbCompleteFun) {
        cbCompleteFun();
      }
    }
    wx.openLocation(openObj);
  },
  onShow() {
    this.timer = setInterval(this.getBannerList, 30 * 1000);
  },
  onReady() {
  },
  onPullDownRefresh() {
    this.getBannerList();
    setTimeout(() => {
      wx.stopPullDownRefresh();
    }, 500);
  },
  onHide() {
    if (this.timer) {
      console.log('onhide...')
      clearInterval(this.timer)
    }
  }
})