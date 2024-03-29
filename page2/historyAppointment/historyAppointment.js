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
    // //完成
    // completedHistory: [],
    // //已预约
    // alreadyHistory: [],
    // //未完成
    // unfinishedHistory: [],
    histories: [],
    flag: true,
    isRefreshing: false,
    isLoadingMoreData: false,
    isLoadingMoreData: false
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
    if (index == this.data.chooseId) {
      return
    }
    // console.log(index)
    if (index == 1) {
      this.setData({
        type: 3,
        //当前页数
        currPage: 1,
        flag: true,
        histories: []
      })
      this.getMyCoachMyClass();
    } else if (index == 2) {
      this.setData({
        type: 1,
        //当前页数
        currPage: 1,
        flag: true,
        histories: []
      })
      this.getMyCoachMyClass();
    } else {
      this.setData({
        type: 2,
        flag: true,
        currPage: 1,
        histories: []
      })
      this.getMyCoachMyClass();
    }
    this.setData({
      chooseId: index
    })
  },
  //历史预约
  getMyCoachMyClass: function () {
    console.log('重新加载数据！')
    var that = this;
    api.request({
      url: '/MyCoachMyClass',
      data: {
        user_token: wx.getStorageSync('token'),
        pageSize: that.data.pageSize,
        pageIndex: that.data.currPage,
        UI_ID: wx.getStorageSync('UI_ID') || -1,
        type: that.data.type
      }
    }).then(res => {
      //  console.log(res)
      if (res.data.data.length == 0) {
        that.setData({
          //  histories: res.data.data,
          flag: false,
          isLoadingMoreData: false,
        })
        return
      } else {
        //  console.log(res)
        let newL1 = [...that.data.histories, ...res.data.data];
        let arr1 = that.unique(newL1)
        // console.log(arr1)
        that.setData({
          //flag: false
          histories: arr1,
          isLoadingMoreData: false,
        })
      }
    })
  },
  //团课取消
  cancelClass: function (e) {
   // console.log(e.currentTarget.dataset.id)
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
            if (res.data.code == 1) {
              var list = that.data.histories;
              var listIndex = list.findIndex(vlaue => {
                return vlaue.ClassID == e.currentTarget.dataset.id
              });
              list.splice(listIndex, 1)
             // console.log(listIndex, list)
              that.setData({
                histories: list
              })
              wx.showToast({
                title: '取消成功',
                icon: 'none'
              })
            } else {
              wx.showToast({
                icon: "none",
                title: res.data.msg,
                duration: 3000
              })
            }
          })
        }
      }
    })
  },
  newGroupCancel(event){
     let groupId = event.currentTarget.dataset.groupid,
     that = this;
     wx.showModal({
      title: '',
      content: '确定取消该课程',
      success(res) {
        if (res.confirm) {
          //删除数据
          api.request({
            url: "/GroupClassCancel",
            data: {
              user_token: wx.getStorageSync('token'),
              UI_ID: wx.getStorageSync('UI_ID'),
              CTO_ID: groupId
            }
          }).then(res => {
            if (res.data.code == 1) {
              var list = that.data.histories;
              var listIndex = list.findIndex(vlaue => {
                return vlaue.ClassID == groupId
              });
              list.splice(listIndex, 1)
              that.setData({
                histories: list
              })
              wx.showToast({
                title: '取消成功',
                icon: 'none'
              })
            } else {
              wx.showToast({
                icon: "none",
                title: res.data.msg,
                duration: 3000
              })
            }
          })
        }
      }
    })
  },
  call: function (e) {
    let phoneNumber = e.currentTarget.dataset.phone
    if (app.globalData.setOptions.IsHidenCoachPhone == 1) {
      phoneNumber = app.globalData.gymPhone;
    }
    if (phoneNumber) {
      wx.makePhoneCall({
        phoneNumber: phoneNumber
      }).catch((e) => {})
    } else {
      wx.showToast({
        icon: 'none',
        title: '该教练没有预留手机号码',
      })
    }
  },
  successClass: function (e) {
    var that = this
    wx.showModal({
      title: '',
      content: '是否完成此课程',
      success(res) {
        if (res.confirm) {
          api.request({
            url: '/UserCoachClassConfirm',
            data: {
              user_token: wx.getStorageSync('token'),
              CS_ID: e.currentTarget.dataset.cs_id
            }
          }).then(res => {
            if (res.data.code == 1) {
              let list = that.data.histories;
              let listIndex = list.findIndex(vlaue => {
                return vlaue.ClassID == e.currentTarget.dataset.cs_id
              });
              list.splice(listIndex, 1)
              that.setData({
                histories: list
              })
            } else {
              wx.showToast({
                icon: "none",
                title: res.data.msg,
                duration: 3000
              })
            }
          })
        }
      }
    })

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
            if (res.data.code == 1) {
              let list = that.data.histories;
              let listIndex = list.findIndex(vlaue => {
                return vlaue.ClassID == e.currentTarget.dataset.id
              });
              list.splice(listIndex, 1)
              //console.log(listIndex, list)
              that.setData({
                histories: list
              })
              wx.showToast({
                title: '取消成功',
                icon: 'none'
              })
            } else {
              wx.showToast({
                icon: "none",
                title: res.data.msg,
                duration: 3000
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
    if (this.data.flag) {
      var pageSize = that.data.currPage + 1; //获取当前页数并+1
      that.setData({
        currPage: pageSize, //更新当前页数
        isLoadingMoreData: true
      })
      that.getMyCoachMyClass(); //重新调用请求获取下一页数据
    }
  }
})