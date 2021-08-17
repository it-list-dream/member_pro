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
    //  takeMethods: ['门店自取', '快递上门（到付）'],
    //take_index: 0,
    //
    takeMethods: [{
        id: 1,
        name: '门店自取',
        checked: true
      },
      {
        id: 2,
        name: '快递上门（到付）'
      }
    ],
    //收货方式， 1到店自取，2快递
    take_index: 1,
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
    var that = this
    //type是区分行为积分还是消费积分的
    let t = options.type;
   // console.log(options)
    if (options.sign && options.sign !== '') {
      api.request({
        url: "/GetUrlBySign",
        data: {
          sign: options.sign
        }
      }).then(res => {
        if (res.data.code == 1) {
          if (!wx.getStorageSync('token')) {
            wx.setStorageSync('token', res.data.user_token)
            //保存品牌名
            wx.setStorageSync('GymName', res.data.GymName);
            //保存门店的id
            wx.setStorageSync('GB_ID', options.GB_ID);
          }
          //行为积分和消费积分
          if (t == 1) {
            this.getScoreRewardActContent(options.se_id, options.price_type, options.GB_ID);
          } else if (t == 2) {
            this.getScoreRewardPayContent(options.se_id, options.price_type, options.GB_ID);
          }
        }
      })
    } else {
      if (t == 1) {
        this.getScoreRewardActContent(options.se_id, options.price_type);
      } else if (t == 2) {
        this.getScoreRewardPayContent(options.se_id, options.price_type);
      }
    }
    //所有的教练
    if (options.price_type == 2) {
      this.getAllCoach();
    }


    this.setData({
      navHeight: app.globalData.navHeight,
      navTop: app.globalData.navTop,
      //判断是行为积分还是消费积分
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
  //行为积分
  getScoreRewardActContent: function (se_id, prizeType, id) {
    var that = this
    api.request({
      url: "/ScoreRewardActContent",
      data: {
        user_token: wx.getStorageSync('token'),
        se_id: se_id,
        prizeType: prizeType,
        GB_ID: wx.getStorageSync('GB_ID') || id
      }
    }).then(res => {
      //console.log(res);
      if (res.data.code == 1) {
        that.setData({
          reward: res.data.data
        })
      }
    })
  },
  //消费积分
  getScoreRewardPayContent: function (se_id, prizeType, id) {
    var that = this
    api.request({
      url: "/ScoreRewardPayContent",
      data: {
        user_token: wx.getStorageSync('token'),
        se_id: se_id,
        prizeType: prizeType,
        GB_ID: wx.getStorageSync('GB_ID') || id
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

      let num1 = that.data.courseNum;
      let address1 = "";
      console.log(coachID1, num1)
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
    var that = this
    let coachId = 0;
    let num = 0;
    let address = {
      name: that.data.concatPerson || '',
      phone: that.data.phone || '',
      recType: Number(that.data.take_index)
    };
    if (!that.data.detailAddress && that.data.take_index == 2) {
      wx.showToast({
        icon: "none",
        title: '请填写收货地址',
      })
      return
    } else {
      address.address = that.data.detailAddress
    }
    //判断是行为积分还是消费积分兑换
    if (this.data.inteType == 1) {
      wx.showModal({
        title: '',
        content: '确定兑换该物品',
        success(res) {
          if (res.confirm) {
            that.exchangeActScoreProEx(coachId, num, JSON.stringify(address));
          }
        }
      })
    } else if (this.data.inteType == 2) {
      wx.showModal({
        title: '',
        content: '确定兑换该物品',
        success(res) {
          if (res.confirm) {
            that.exchangePayScoreProEx(coachId, num, JSON.stringify(address))
          }
        }
      })
    }
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
      console.log(res)
      if (res.data.code == 1) {
        console.log(res.data)
        let inte2 = 0;
        //type 
        //周卡1 体验课2  实物 3
        if (that.data.type == 1) {
          inte2 = that.data.reward.ActScore
        } else if (that.data.type == 2) {
          inte2 = Number(that.data.reward.ActScore) * Number(that.data.courseNum)
        } else {
          inte2 = that.data.reward.ActScore
        }
        let cashCount = that.data.reward.CashCount ? that.data.reward.CashCount : 0;
        cashCount += 1;
        console.log(cashCount)
        that.setData({
          ['reward.CashCount']: cashCount++
        })
        //setTimeout(function () {
        //prizeType = 兑换类型 //消费还是行为积分 inteType
        wx.navigateTo({
          url: '/page2/suceess/suceess?costPoints=' + inte2 + '&isShow=4&se_id=' + that.data.reward.SE_ID + '&inteType=' + that.data.inteType + '&prizeType=' + that.data.type,
        })
        //  }, 1000)
      } else {
        wx.showToast({
          icon: "none",
          title: res.data.msg || '兑换失败',
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
        let inte2 = 0;
        //周卡1 体验课2  实物 3
        if (that.data.type == 1) {
          inte2 = that.data.reward.PayScore
        } else if (that.data.type == 2) {
          inte2 = Number(that.data.reward.PayScore) * Number(that.data.courseNum)
        } else {
          inte2 = that.data.reward.PayScore
        }
        console.log(inte2)
        // wx.showToast({
        //   icon: "none",
        //   title: '兑换成功',
        // })
        let cashCount = that.data.reward.CashCount ? that.data.reward.CashCount : 0;
        cashCount += 1;
        console.log(cashCount)
        that.setData({
          ['reward.CashCount']: cashCount
        })
        //   setTimeout(function () {
        wx.navigateTo({
          url: '/page2/suceess/suceess?costPoints=' + inte2 + '&isShow=4&se_id=' + that.data.reward.SE_ID + '&inteType=' + that.data.inteType + '&prizeType=' + that.data.type
        })
        //   }, 1000)
      } else {
        wx.showToast({
          icon: "none",
          title: res.data.msg || '兑换失败',
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
                //console.log('4.2chooseAddress', data)
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
  radioChange: function (e) {
    this.choose(e.detail.value);
    this.setData({
      take_index: e.detail.value
    })
  },
  choose: function (m) {
    if (m == 1) {
      console.log('自取')
    } else if (m == 2) {
      this.getWechatAddress();
    }
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