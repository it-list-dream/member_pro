// page2/historyAppointment/historyAppointment.js
const app = getApp()
var api = require('../../utils/request.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    historyList: ['已预约', '未完成', '已完成'],
    chooseId: 0,
    //分页的属性
    pageSize: 10,
    //当前页数
    currPage: 1,
    //1完成2进行中3未完成
    type: 2,
    //完成
    completedHistory: [],
    //已预约
    alreadyHistory: [],
    //未完成
    unfinishedHistory: [],
    flag: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMyCoachMyClass();
    this.setData({
      navHeight: app.globalData.navHeight,
      navTop: app.globalData.navTop
    })
  },
  chooseNav(e) {
    let index = e.target.dataset.index;
    console.log(index)
    if (index == 1) {
      this.setData({
        type: 3,
        //当前页数
        currPage: 1,
        flag: false
      })
      this.getMyCoachMyClass();
    } else if (index == 2) {
      this.setData({
        type: 1,
        //当前页数
        currPage: 1,
        flag: false
      })
      this.getMyCoachMyClass();
    } else {
      this.setData({
        type: 2
      })
    }
    this.setData({
      chooseId: index
    })
  },
  //历史预约
  getMyCoachMyClass: function () {
    var that = this
    if (!that.data.flag) {
      api.request({
        url: '/MyCoachMyClass',
        data: {
          user_token: wx.getStorageSync('token'),
          pageSize: that.data.pageSize,
          pageIndex: that.data.currPage,
          UI_ID: wx.getStorageSync('UI_ID'),
          type: that.data.type
        }
      }).then(res => {
        console.log(res)
        if (res.data.data.length == 0) {
          that.setData({
            flag: true
          })
          return
        }
        if (that.data.type == 1) {
          let newL1 = [...that.data.completedHistory, ...res.data.data];
          let arr1 = that.unique(newL1)
          this.setData({
            completedHistory:arr1
          })
        } else if (that.data.type == 2) {
          let newL1 = [...that.data.alreadyHistory, ...res.data.data];
          let arr1 = that.unique(newL1)
          console.log(arr1)
          this.setData({
            alreadyHistory: arr1
          })
        } else if (that.data.type == 3) {
          let newL1 = [...that.data.unfinishedHistory, ...res.data.data];
          let arr1 = that.unique(newL1)
          this.setData({
            unfinishedHistory: arr1
          })
        }
      })
    }

  },
  //团课取消
  cancelClass: function (e) {
    console.log(e.currentTarget.dataset.id)
    var that = this;
    wx.showModal({
      title: '',
      content: '确定取消该课程',
      success(res) {
        if (res.confirm) {

          //删除数据
          api.request({
            url: "/CancelCardTogether",
            data: {
              user_token: wx.getStorageSync('token'),
              UI_ID: wx.getStorageSync('UI_ID'),
              CTO_ID: e.currentTarget.dataset.id
            }
          }).then(res => {
            if (res.data.code == '1') {
              var list = that.data.alreadyHistory;
              var listIndex = list.findIndex(vlaue => {
                return vlaue.ClassID == e.currentTarget.dataset.id
              });
              list.splice(listIndex, 1)
              console.log(listIndex, list)
              that.setData({
                alreadyHistory: list
              })
              wx.showToast({
                title: '取消成功',
                icon: 'none'
              })
            }else{
              wx.showToast({
                icon:"none",
                title: res.data.msg,
              })
            }

            //console.log(res);
            // that.setData({
            //   currPage: 1,
            //   id: e.currentTarget.dataset.id
            // })
          })
        }
      }
    })


  },
  call: function (e) {
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
  //数组对象去重
  unique: function (arr) {
    var obj = {};
    arr = arr.reduce(function (item, next) {
      obj[next.ROWID] ? '' : obj[next.ROWID] = true && item.push(next);
      return item;
    }, []);
    return arr
  },
  //取消私教
  cancelPerClass: function (e) {
    var that = this;
    let id = e.currentTarget.dataset.id
    wx.showModal({
      title: '确认取消课程吗？',
      success(res) {
        if (res.confirm) {
          api.request({
            url: "/MyCoachCancelReserve",
            data: {
              user_token: wx.getStorageSync('token'),
              UI_ID: wx.getStorageSync('UI_ID'),
              ClassID: id
            }
          }).then(res => {
            if (res.data.code == '1') {
              let list = that.data.alreadyHistory;
              let listIndex = list.findIndex(vlaue => {
                return vlaue.ClassID == e.currentTarget.dataset.id
              });
              list.splice(listIndex, 1)
              console.log(listIndex, list)
              that.setData({
                alreadyHistory: list
              })
              wx.showToast({
                title: '取消成功',
                icon: 'none'
              })
            }
          })
        }
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
    //  console.log('触底反应')
    var that = this;
    var pageSize = that.data.currPage + 1; //获取当前页数并+1
    that.setData({
      currPage: pageSize, //更新当前页数
    })
    that.getMyCoachMyClass(); //重新调用请求获取下一页数据
  }
})