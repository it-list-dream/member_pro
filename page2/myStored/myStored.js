const app = getApp()
var api = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    storedTab: ['全部', '充值', '消费'],
    tabIndex: 0,
    currPage: 1,
    pageSize: 10000,
    type: 0,
    //所有
    userMoney: [],
    //充值
    rechangeMoney: [],
    //消费
    consumeMoney: [],
    //flag: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserMoneyTranRecord();
    this.setData({
      navHeight: app.globalData.navHeight,
      navTop: app.globalData.navTop,
      reMoney: options.reMoney,
      giveMoney: options.giveMoney
    })
  },
  tabStored(e) {
    //console.log(e.target.dataset)
    let idx = e.target.dataset.idx;
    if (idx == 1) {
      this.setData({
        type: 1,
        currPage: 1
      })
      this.getUserMoneyTranRecord();
    } else if (idx == 2) {
      this.setData({
        type: 2,
        currPage: 1
      })
      this.getUserMoneyTranRecord();
    } else {
      this.setData({
        type: 0,
        currPage: 1
      })
      this.getUserMoneyTranRecord();
    }
    this.setData({
      tabIndex: idx
    })
  },
  //我的储值
  getUserMoneyTranRecord: function () {
    var that = this;
    api.request({
      url: "/UserMoneyTranRecord",
      data: {
        user_token: wx.getStorageSync('token'),
        pageSize: that.data.pageSize,
        pageIndex: that.data.currPage,
        UI_ID: wx.getStorageSync('UI_ID') || 0,
        type: that.data.type
      }
    }).then(res => {
      //所有
      if (this.data.tabIndex == 0) {
        if (res.data.data.length > 0) {
          // let originUserMoney = this.data.userMoney;
          // let newUserList = originUserMoney.concat(res.data.data)
          this.setData({
            userMoney: res.data.data
          })
         // console.log('所有的数据')
        } 
      } else if (this.data.tabIndex == 1) {
        //   //充值
        if (res.data.data.length > 0) {
          // let originRechange = this.data.rechangeMoney;
          // let newRechange = originRechange.concat(res.data.data)
          this.setData({
            rechangeMoney: res.data.data
          })
         // console.log('充值的数据')
        }
      } else if (this.data.tabIndex == 2) {
        //consumeMoney
        if (res.data.data.length > 0) {
          //let originConsume = this.data.rechangeMoney;
          // let newConsume = originConsume.concat(res.data.data)
          this.setData({
            consumeMoney: res.data.data
          })
        //  console.log('消费的数据')
        } 
      }
    });
  },
  //数组对象去重
  unique: function (arr) {
    var obj = {};
    arr = arr.reduce(function (item, next) {
      obj[next.ROWID] ? '' : obj[next.ROWID] = true && item.push(next);
      return item;
    }, []);
    return arr
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
    // console.log('触底了')
  },
  loadMore: function () {
    // var that = this;
    // if (this.data.flag) {
    //   var pageSize = that.data.currPage + 1; //获取当前页数并+1
    //   that.setData({
    //     currPage: pageSize, //更新当前页数
    //   })
    //   that.getUserMoneyTranRecord(); //重新调用请求获取下一页数据
    // } else {
    //   wx.showToast({
    //     icon: 'none',
    //     title: "已经到底了..."
    //   })
    // }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})