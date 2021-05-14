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
    pageSize: 16,
    type: 0,
    //所有
    userMoney: [],
    //充值
    rechangeMoney: [],
    //消费
    consumeMoney: [],
    flag: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserMoneyTranRecord();
    this.setData({
      navHeight: app.globalData.navHeight,
      navTop: app.globalData.navTop,
      reMoney:options.reMoney,
      giveMoney:options.giveMoney
    })
  },
  tabStored(e) {
    console.log(e.target.dataset)
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
      })
    }
    this.setData({
      tabIndex: idx
    })
  },
  // swiperTab:function(e){
  //   let current = e.detail.current;
  //   this.setData({
  //     tabIndex:current
  //   })
  // },
  getUserMoneyTranRecord: function () {
    var that = this
    if (!that.data.flag) {
      api.request({
        url: "/UserMoneyTranRecord",
        data: {
          user_token: wx.getStorageSync('token'),
          pageSize: that.data.pageSize,
          pageIndex: that.data.currPage,
          UI_ID: wx.getStorageSync('UI_ID')||0,
          type: that.data.type
        }
      }).then(res => {
        console.log(res)
        if (res.data.data.length == 0) {
          that.setData({
            flag: true
          })
        }
        if (that.data.type == 0) {
          that.setData({
            userMoney: [...that.data.userMoney, ...res.data.data]
          })
        } else if (that.data.type == 1) {
        //  console.log(res.data.data)
        let newL1 = [...that.data.rechangeMoney, ...res.data.data];
        let arr1 = that.unique(newL1)
          if (res.data.data.length > 0) {
            that.setData({
              rechangeMoney:arr1
            })
          }
        } else if (that.data.type == 2) {
          let newL1 = [...that.data.consumeMoney, ...res.data.data];
        let arr1 = that.unique(newL1)
          if (res.data.data.length > 0) {
            that.setData({
              consumeMoney:arr1
            })
          }
        }

      })
    }

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
    console.log('触底了');
    var that = this;
    var pageSize = that.data.currPage + 1; //获取当前页数并+1
    that.setData({
      currPage: pageSize, //更新当前页数
    })
    that.getUserMoneyTranRecord(); //重新调用请求获取下一页数据
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})