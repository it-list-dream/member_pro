const app = getApp()
let api = require('../../utils/request.js');
var util = require('../../utils/util.js');
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
    this.setData({
      navHeight: app.globalData.navHeight,
      navTop: app.globalData.navTop,
    });
    this.getMyStoreList();
  },
  getMyStoreList() {
      api.request({
        url: "/GymList",
        data: {
          user_token: wx.getStorageSync('token')
        },
      }).then(res => {
        this.setData({
          storeList: res.data.data,
          gymCount: res.data.gymCount
        });
      })
  },
  //获取用户的经纬度
  findXy() {
    let that = this;
    wx.getSetting({
      success: (res) => {
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
        } else {
          //选择位置，需要用户授权
          that.location();
        }
      }
    })
  },
  //获取位置
  location: function () {
    var that = this;
    if (this.isRefresh) {
      that.calculateDistance(this.lat,this.lng);
    }else{
      util.getLocation().then(res => {
        this.lat = res.latitude;
        this.lng = res.longitude;
        that.calculateDistance(res.latitude,res.longitude);
     });
    }
  },
  calculateDistance(latitude,longitude) {
    let gymList = this.data.storeList,
      myList = [],
      otherList = [];
    for (let i = 0; i < gymList.length; i++) {
      gymList[i].distance = util.getDistance(latitude, longitude, gymList[i].lat, gymList[i].lng);
      if (gymList[i].IsMyGym == 1) {
        myList.push(gymList[i]);
      } else {
        otherList.push(gymList[i])
      }
    }
    otherList.sort(this.compare('distance'));
    otherList.unshift(...myList);
    this.setData({
      storeList: otherList
    });
  },
  //比较
  compare: function (prop) {
    return function (a, b) {
      return Number(a[prop]) - Number(b[prop])
    }
  },
  chooseStore: function (e) {
    let store = e.currentTarget.dataset.location;
    wx.setStorageSync('GB_ID', store.GB_ID);
    if(store.UI_ID){
      wx.setStorageSync('UI_ID', store.UI_ID);
    }
    wx.setStorageSync('expireTime',Date.now());
    wx.setStorageSync('GymName', store.GB_Name);
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    prevPage.getCoachStyleList();
    prevPage.getSuggestCoachClass();
    prevPage.getSuggestActivityCard();
    prevPage.getSearchGymQR();
    prevPage.getBannerList();
    prevPage.getOtherSet();
    prevPage.getSuggestLeague();
    prevPage.setData({
      store: store
    });
    wx.navigateBack({
      delta: 1,
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //this.getMyStoreList();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},
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
    // this.isRefresh = true;
    // this.getMyStoreList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  }
})