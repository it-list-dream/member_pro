const app = getApp()
var api = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    storedTab: ['全部', '充值', '消费'],
    tabIndex: 0,
    pageSize: 12,
    storedList: {
      allMoney: {
        //当前页数
        pageIndex: 1,
        list: [],
        flag: true
      },
      //充值
      rechangeMoney: {
        //当前页数
        pageIndex: 1,
        list: [],
        flag: true
      },
      consumeMoney: {
        //当前页数
        pageIndex: 1,
        list: [],
        flag: true
      }
    },
    //当前选中的元素
    currentType: 'allMoney'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      navHeight: app.globalData.navHeight,
      navTop: app.globalData.navTop,
      reMoney: options.reMoney,
      giveMoney: options.giveMoney
    })
    this.getUserMoneyTranRecord('allMoney', 0);
    this.getUserMoneyTranRecord('rechangeMoney', 1);
    this.getUserMoneyTranRecord('consumeMoney', 2);
  },
  tabStored(e) {
    var idx = e.target.dataset.idx;
    console.log(idx)
    if (idx == this.data.tabIndex) {
      return;
    }

    let currentType = ''
    switch (idx) {
      case 0:
        currentType = 'allMoney';
        break
      case 1:
        currentType = 'rechangeMoney';
        break
      case 2:
        currentType = 'consumeMoney'
        break
    }
    this.setData({
      tabIndex: idx,
      currentType: currentType
    })
  },
  //我的储值
  getUserMoneyTranRecord: function (currentType, type) {
    var that = this;
    var newStoredList = this.data.storedList;
    var page_size = newStoredList[currentType].pageIndex
    var that = this;
    api.request({
      url: "/UserMoneyTranRecord",
      data: {
        user_token: wx.getStorageSync('token'),
        pageSize: that.data.pageSize,
        pageIndex: page_size,
        UI_ID: wx.getStorageSync('UI_ID') || 0,
        type: type
      }
    }).then(res => {
      //所有
      if (res.data.code == 1) {
        if (res.data.data.length > 0) {
          newStoredList[currentType].list.push(...res.data.data)
          this.setData({
            storedList: newStoredList
          })
        } else {
          newStoredList[currentType].flag = false;
          this.setData({
            storedList: newStoredList
          })
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
    console.log('下拉加载更多');
    var that = this;
    let storedList = this.data.storedList;
    let type = this.data.currentType;
    let tabIndex = this.data.tabIndex;
    if (storedList[type].flag) {
      storedList[type].pageIndex += 1; //获取当前页数并+1
      this.setData({
        storedList: storedList
      })
      this.getUserMoneyTranRecord(type, tabIndex)
      // console.log('加载更多数据');
    }
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
  }
})