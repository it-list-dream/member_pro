var app = getApp()
var api = require('../../utils/request.js')
Page({

  /**
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
    pageSize: 16,
    //总页数
    total: 0,
    //积分类型 0全部1消费积分2运动积分
    scoreType: 0,
    //积分消费 与取得  0全部 1获得2扣除
    useType: 0,
    vipIntegral: 0,
    actionIntegral: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      navHeight: app.globalData.navHeight,
      navTop: app.globalData.navTop,
      vipIntegral: options.vipIntegral,
      actionIntegral: options.actionIntegral
    })
    // this.getScoreDetailed()
    // console.log(options)
  },
  optionsTab: function (e) {
    var that = this
    console.log(e.currentTarget.dataset.index);
    var index = e.currentTarget.dataset.index;
    //0全部 1获得2扣除
    if (index == 1) {
      that.setData({
        useType: 1,
        currPage: 1
      })
      console.log('赚积分')
      that.getScoreDetailed()
    } else if (index == 2) {
      that.setData({
        useType: 2,
        currPage: 1
      })
      console.log('花积分')
      that.getScoreDetailed()
    } else {
      that.setData({
        useType: 0
      })
      console.log('所有的积分');
      that.getScoreDetailed()
    }
    this.setData({
      tab: index
    })
  },
  //切片
  getDate: function (e) {
    var that = this
    let id = e.detail.id
    that.setData({
      scoreType: id
    })
    that.getScoreDetailed2();
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    api.request({
      url: "/ScoreDetailed",
      data: {
        user_token: wx.getStorageSync('token'),
        pageSize: that.data.pageSize,
        pageIndex: that.data.currPage,
        scoreType: 0,
        useType: 0
      }
    }).then(res => {
      that.setData({
        all: res.data.data
      })
    })
  },
  getScoreDetailed: function () {
    var that = this
    if (that.data.currPage > that.data.total && that.data.currPage > 0 && that.data.total > 0) {
      that.setData({
        currPage: that.data.total
      })
      console.log('hahhaha')
    } else {
      console.log('hello')
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
          if (res.data.code == 1 && res.data.data.length > 0) {
            var t = Math.ceil(res.data.recordCount / that.data.pageSize);
            let newArr1 = [...that.data.all, ...res.data.data];
            var n = that.unique(newArr1)
            that.setData({
              all: n,
              total: t
            })
            console.log('tab ==0')
          }

        } else if (that.data.tab == 1) {
          if (res.data.code == 1 && res.data.data.length > 0) {
            var t = Math.ceil(res.data.recordCount / that.data.pageSize);
          //   let newArr1 = [...that.data.profitable, ...res.data.data];
          //   var n = that.unique(newArr1) 
            that.setData({
              profitable : [],
              total: t
            })
            console.log('tab ==1')
            that.setData({
              profitable:res.data.data
            })
          }
        } else if (that.data.tab == 2) {
          if (res.data.code == 1 && res.data.data.length > 0) {
            var t = Math.ceil(res.data.recordCount / that.data.pageSize);
            let newArr1 = [...that.data.takeIntegral, ...res.data.data];
            var n = that.unique(newArr1)
            that.setData({
              takeIntegral: n,
              total: t
            })
            console.log('tab ==2')
          }

        }
      })
    }
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
        //   console.log(that.data.currPage)
        that.setData({
          all: res.data.data
        })
      } else if (that.data.tab == 1) {
        this.setData({
          profitable: res.data.data
        })
      } else if (that.data.tab == 2) {
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
    var that = this;
    var pageSize = that.data.currPage + 1; //获取当前页数并+1
    that.setData({
      currPage: pageSize, //更新当前页数
    })
    //that.getScoreDetailed(); //重新调用请求获取下一页数据
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