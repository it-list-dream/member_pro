var app = getApp()
var api = require('../../utils/request.js')
Page({
  /**IsGive 1 是赠送，2代表不是赠送
   * 页面的初始数据
   */
  data: {
    options_tab: ['全部', '赚积分', '花积分'],
    tab: 0,
    selectArray: [{
        id: 0,
        text: "全部"
      },
      {
        id: 1,
        text: "消费积分"
      },
      {
        id: 2,
        text: "行为积分"
      }
    ],
    all: [],
    //赚积分
    profitable: [],
    //花积分
    takeIntegral: [],
    //分页
    currPage: 1,
    pageSize: 10000,
    //总页数
    total: 0,
    //积分类型 0全部1消费积分2运动积分
    scoreType: 0,
    //积分消费 与取得  0全部 1获得2扣除
    useType: 0,
    vipIntegral: 0,
    actionIntegral: 0,
    //最后
    // isEnd: true,
    typing: '全部'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      navHeight: app.globalData.navHeight,
      navTop: app.globalData.navTop,
      vipIntegral: options.vipIntegral || 0,
      actionIntegral: options.actionIntegral || 0
    })
    // if (options.types == 'vip') {
    //   this.setData({
    //     typing: '消费积分'
    //   })
    //   this.getInteData(1, 0);
    // } else if (options.types == 'action') {
    //   this.setData({
    //     typing: '行为积分'
    //   })
    //   this.getInteData(2, 0);
    // } else {
    //   this.getInteData(0, 0);
    // }
    this.getInteData(0, 0);
  },
  getInteData(scoreType, useType) {
    var that = this
    api.request({
      url: "/ScoreDetailed",
      data: {
        user_token: wx.getStorageSync('token'),
        pageSize: that.data.pageSize,
        pageIndex: that.data.currPage,
        scoreType: scoreType,
        useType: useType
      }
    }).then(res => {
      that.setData({
        all: res.data.data
      })
    })
  },
  //tab
  optionsTab: function (e) {
    var that = this
    let index = e.currentTarget.dataset.index;
    console.log(e)
    if (that.data.tab == e.currentTarget.dataset.index) {
      return
    }
    this.setData({
      tab: index,
      // currPage: 1,
      // isEnd: true
    })
    //0全部 1获得2扣除
    if (index == 1) {
      that.setData({
        useType: 1,
        profitable:[]
      })
      console.log('赚积分')
     // that.data.profitable = [];
      that.getScoreDetailed();
    } else if (index == 2) {
      that.setData({
        useType: 2,
        takeIntegral:[]
      })
     // that.data.takeIntegral = [];
      console.log('花积分')
      that.getScoreDetailed()
    } else {
      //that.data.all = []
      that.setData({
        useType: 0,
        all:[]
      })
      console.log('所有的积分');
      that.getScoreDetailed()
    }
  },
  //切片
  getDate: function (e) {
    console.log(e)
    let id = e.detail.id;
    let selectText = e.detail.selectText
    if (id == this.data.scoreType) {
      return
    }
    this.setData({
      scoreType: id,
      typing: selectText
    })
    this.getScoreDetailed2();
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},
  //分页
  getScoreDetailed: function () {
    var that = this
    api.request({
      url: "/ScoreDetailed",
      data: {
        user_token: wx.getStorageSync('token'),
        pageSize: that.data.pageSize,
        pageIndex: that.data.currPage,
        scoreType: that.data.scoreType,
        useType: that.data.useType
      }
    }).then(res => {
      if (res.data.code == 1) {
        if (that.data.tab == 0 && res.data.data.length > 0) {
          // let n = that.unique([...that.data.all, ...res.data.data])
          that.setData({
            all: res.data.data,
          })
           console.log('all')
        } else if (that.data.tab == 1 && res.data.data.length > 0) {
          /// let n = that.unique([...that.data.profitable, ...res.data.data])
          that.setData({
            profitable: res.data.data,
          })
          console.log('zhuang')
        } else if (that.data.tab == 2 && res.data.data.length > 0) {
          //   let n = that.unique([...that.data.takeIntegral, ...res.data.data])
          that.setData({
            takeIntegral: res.data.data,
          })
          console.log('hua')
        }
      }
    })
  },
  //右边的切片
  getScoreDetailed2: function () {
    var that = this
    that.setData({
      currPage: 1
    })
    api.request({
      url: "/ScoreDetailed",
      data: {
        user_token: wx.getStorageSync('token'),
        pageSize: that.data.pageSize,
        pageIndex: that.data.currPage,
        scoreType: that.data.scoreType,
        useType: that.data.useType
      }
    }).then(res => {
      if (that.data.tab == 0) {
        //console.log(0)
        that.setData({
          all: res.data.data
        })
      } else if (that.data.tab == 1) {
        //console.log(1)
        this.setData({
          profitable: res.data.data
        })
      } else if (that.data.tab == 2) {
        //console.log(2)
        this.setData({
          takeIntegral: res.data.data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  loadMore: function () {
    console.log('触底了');
    // var that = this;
    // if (that.data.isEnd) {
    //   var pageSize = that.data.currPage + 1; //获取当前页数并+1
    //   that.setData({
    //     currPage: pageSize, //更新当前页数
    //   })
    //   that.getScoreDetailed();
    // }
    //重新调用请求获取下一页数据
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