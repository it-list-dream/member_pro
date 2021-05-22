// page2/integralMall/integralMall.js
var app = getApp()
var api = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 1,
    inteType: 1,
    //教练
    chooseCoach: 0,
    //课程数量
    courseNum: 1,
    takeMethods: ['门店自取', '快递上门（到付）'],
    take_index: 0,
    //
    reward: null,
    coachList: [],
    //总积分
    allTotal: 0,
    //收货地址
    address: '',
    detailAddress: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(app)
    let t = options.type;
    if (t == 1) {
      this.getScoreRewardActContent(options.se_id, options.price_type);
    } else if (t == 2) {
      this.getScoreRewardPayContent(options.se_id, options.price_type);
    }
    //所有的教练
    if (options.price_type == 2) {
      this.getAllCoach();
    }
    this.setData({
      navHeight: app.globalData.navHeight,
      navTop: app.globalData.navTop,
      inteType: options.type,
      type: options.price_type,
      se_id: options.se_id
    })
  },
  //计算数量
  calculate: function (e) {
    var operator = e.target.dataset.operator;
    var total = this.data.courseNum;
    if (operator == '+') {
      total++;
    } else if (operator == '-') {
      if (total > 1) {
        total--;
      }
    }
    this.setData({
      courseNum: total,
    })
  },
  //快递方式
  takeWay: function (e) {
    // console.log(e.target.dataset);
    var idx = e.target.dataset.index;
    this.setData({
      take_index: idx
    })

  },
  //行为
  getScoreRewardActContent: function (se_id, prizeType) {
    var that = this
    api.request({
      url: "/ScoreRewardActContent",
      data: {
        user_token: wx.getStorageSync('token'),
        se_id: se_id,
        prizeType: prizeType,
        GB_ID: wx.getStorageSync('GB_ID')
      }
    }).then(res => {
      console.log(res);
      if (res.data.code == 1) {
        that.setData({
          reward: res.data.data
        })
      }
    }) 
  },
  //消费
  getScoreRewardPayContent: function (se_id, prizeType) {
    var that = this
    api.request({
      url: "/ScoreRewardPayContent",
      data: {
        user_token: wx.getStorageSync('token'),
        se_id: se_id,
        prizeType: prizeType,
        GB_ID: wx.getStorageSync('GB_ID')
      }
    }).then(res => {
      console.log(res);
      if (res.data.code == 1) {
        that.setData({
          reward: res.data.data
        })
      }
    })
  },
  //兑换周卡
  exchange: function () {
    var that = this
    //判断是行为积分还是消费积分兑换
    if (this.data.inteType == 1) {
      wx.showModal({
        title: '',
        content: '确定兑换该物品',
        success(res) {
          if (res.confirm) {
            that.exchangeActScoreProEx();
          }
        }
      })
    } else if (this.data.inteType == 2) {
      wx.showModal({
        title: '',
        content: '确定兑换该物品',
        success(res) {
          if (res.confirm) {
            that.exchangePayScoreProEx()
          }
        }
      })
    } else {
      wx.showToast({
        icon: 'none',
        title: '您的积分不够兑换此商品',
      })
    }
  },
  //兑换体验课
  exchange1: function () {
    var that = this
    //判断是行为积分还是消费积分兑换
    if (this.data.inteType == 1) {
      //获取教练的ID , 获取兑换课程的节数
      let coachID1 = that.data.coachList[that.data.chooseCoach].FK_AL_TeachCoach_ID;
      console.log(coachID1, num1)
      let num1 = that.data.courseNum;
      let address1 = ""
      wx.showModal({
        title: '',
        content: '确定兑换该物品',
        success(res) {
          if (res.confirm) {
            that.exchangeActScoreProEx(coachID1, num1, address1);
          }
        }
      })
    } else if (this.data.inteType == 2) {
      //获取教练的ID , 获取兑换课程的节数
      let coachID1 = that.data.coachList[that.data.chooseCoach].FK_AL_TeachCoach_ID;
      console.log(coachID1, num1)
      let num1 = that.data.courseNum;
      let address1 = ""
      wx.showModal({
        title: '',
        content: '确定兑换该物品',
        success(res) {
          if (res.confirm) {
            that.exchangePayScoreProEx(coachID1, num1, address1)
          }
        }
      })
    } else {
      wx.showToast({
        icon: 'none',
        title: '您的积分不够兑换此商品',
      })
    }
  },
  //兑换实物
  exchange2: function () {
    // var that = this
    // let coachId = 0;
    // let num = 0;
    // let address = this.data.address;
    // //判断是行为积分还是消费积分兑换
    // if (this.data.inteType == 1) {
    //   wx.showModal({
    //     title: '',
    //     content: '确定兑换该物品',
    //     success(res) {
    //       if (res.confirm) {
    //         that.exchangeActScoreProEx();
    //       }
    //     }
    //   })
    // } else if (this.data.inteType == 2) {
    //   wx.showModal({
    //     title: '',
    //     content: '确定兑换该物品',
    //     success(res) {
    //       if (res.confirm) {
    //         that.exchangePayScoreProEx(coachID, num)
    //       }
    //     }
    //   })
    // }
  },
  //兑换实物

  //教练列表
  getAllCoach: function () {
    var that = this;
    api.request({
      url: "/CoachStyleList",
      data: {
        user_token: wx.getStorageSync('token'),
        GB_ID: wx.getStorageSync('GB_ID')
      }
    }).then(res => {
      console.log(res)
      if (res.data.code == 1) {
        that.setData({
          coachList: res.data.data
        })
      }
    })
  },
  //选择教练
  coach_choose: function (e) {
    // console.log(e.currentTarget.dataset.index)
    let index = e.currentTarget.dataset.index
    this.setData({
      chooseCoach: index
    })
  },
  //xx行为积分兑换
  exchangeActScoreProEx: function (coachId = 0, num = 0, address = '') {
    var that = this
    api.request({
      url: "/ActScoreProEx",
      data: {
        user_token: wx.getStorageSync('token'),
        UI_ID: wx.getStorageSync('UI_ID'),
        GB_ID: wx.getStorageSync('GB_ID'),
        se_id: that.data.se_id,
        prizeType: that.data.type,
        coachId: coachId,
        num: num,
        address: address
      }
    }).then(res => {
      if (res.data.code == 1) {
        let CashCount = CashCount ? CashCount : 0
        // console.log(CashCount)
        that.setData({
          CashCount: ++CashCount
        })
        let inte1 = 0;
        if (that.data.type == 2) {
          app.globalData.UI_ActionScore = app.globalData.UI_ActionScore - that.data.reward.ActScore * that.data.courseNum;
          inte1 = that.data.reward.ActScore * that.data.courseNum;
        } else {
          app.globalData.UI_ActionScore = app.globalData.UI_ActionScore - that.data.reward.ActScore;
          inte1 = that.data.reward.ActScore
        }
        //console.log(app)
        // wx.showToast({
        //   icon: "none",
        //   title: '兑换成功',
        // })
        setTimeout(function () {
          wx.navigateTo({
            url: '/page2/suceess/suceess?costPoints=' + inte1 + '&isShow=4',
          })
        }, 1000)
      } else {
        wx.showToast({
          icon: "none",
          title: res.data.msg,
        })
      }
    })
  },
  //消费积分兑换
  exchangePayScoreProEx: function (coachId = 0, num = 0, address = '') {
    let that = this
    api.request({
      url: "/PayScoreProEx",
      data: {
        user_token: wx.getStorageSync('token'),
        UI_ID: wx.getStorageSync('UI_ID'),
        GB_ID: wx.getStorageSync('GB_ID'),
        se_id: that.data.se_id,
        prizeType: that.data.type,
        coachId: coachId,
        num: num,
        address: address
      }
    }).then(res => {
      if (res.data.code == 1) {
        let CashCount = CashCount ? CashCount : 0
        that.setData({
          CashCount: ++CashCount
        })
        // app.globalData.UI_Score = app.globalData.UI_Score - that.data.reward.ActScore;
        // console.log(app)
        let inte1 = 0;
        if (that.data.type == 2) {
          app.globalData.UI_ActionScore = app.globalData.UI_ActionScore - that.data.reward.ActScore * that.data.courseNum;
          inte1 = that.data.reward.ActScore * that.data.courseNum;
        } else {
          app.globalData.UI_ActionScore = app.globalData.UI_ActionScore - that.data.reward.ActScore;
          inte1 = that.data.reward.ActScore
        }
        // wx.showToast({
        //   icon: "none",
        //   title: '兑换成功',
        // })
        setTimeout(function () {
          wx.navigateTo({
            url: '/page2/suceess/suceess?costPoints=' + inte1 + '&isShow=4',
          })
        }, 1000)
      } else {
        wx.showToast({
          icon: "none",
          title: res.data.msg,
        })
      }
    })
  },
  getWechatAddress: function () {
    var that = this
    //1.获取用户当前设置
    wx.getSetting({
      success(res) {
        //2.res.authSetting:返回的授权结果
        if (res.authSetting['scope.address']) {
          wx.chooseAddress({
            success(data) {
              that.data.isWechat = true
              that.data.concatPerson = data.userName //收货人姓名
              that.data.phone = data.telNumber //收货人手机号码
              that.data.address = data.detailInfo //详细收货地址信息
              let provinceName = data.provinceName //国标收货地址第一级地址
              let cityName = data.cityName //国标收货地址第二级地址
              let countyName = data.countyName //国标收货地址第三级地址
              console.log(provinceName, cityName, countyName)
              that.setData({
                detailAddress: provinceName + cityName + countyName + that.data.address
              })
            }
          })
        } else {
          //4.取消过收货地址授权，调用wx.openSetting(),调起客户端小程序设置界面让用户去打开授权
          if (res.authSetting['scope.address'] == false) {
            wx.openSetting({
              success(data) {
                console.log('openSetting', data)
                //打开授权， 用wx.chooseAddress()，获取用户收货地址
                wx.chooseAddress({
                  success(res) {
                    console.log('5.chooseAddress', res)
                    that.data.isWechat = true
                    that.data.concatPerson = res.userName //收货人姓名
                    that.data.phone = res.telNumber //收货人手机号码
                    that.data.address = res.detailInfo //详细收货地址信息
                    let provinceName = res.provinceName //国标收货地址第一级地址
                    let cityName = res.cityName //国标收货地址第二级地址
                    let countyName = res.countyName //国标收货地址第三级地址
                    console.log(provinceName, cityName, countyName)
                  }
                })
              }
            })
          } else {
            //4.2用户当前设置不包含收货地址授权（说明是第一次打开获取用户收货地址信息的授权），
            wx.chooseAddress({
              success(data) {
                console.log('4.2chooseAddress', data)
                that.data.isWechat = true
                that.data.concatPerson = data.userName //收货人姓名
                that.data.phone = data.telNumber //收货人手机号码
                that.data.address = data.detailInfo //详细收货地址信息
                let provinceName = data.provinceName //国标收货地址第一级地址
                let cityName = data.cityName //国标收货地址第二级地址
                let countyName = data.countyName //国标收货地址第三级地址
                console.log(provinceName, cityName, countyName)
              }
            })
          }
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})