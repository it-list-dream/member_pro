const util = require('../../utils/util.js')
const app = getApp()
let api = require('../../utils/request.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //0 表示私教 1 表示团课
    showcourse: 1,
    dayStyle: [{
        month: 'current',
        day: new Date().getDate(),
        color: 'white',
        background: '#AAD4F5'
      },
      {
        month: 'current',
        day: new Date().getDate(),
        color: 'white',
        background: '#AAD4F5'
      }
    ],
    //日期的显示和隐藏
    date: false,
    SearchDate: null,
    today: null,
    num: null,
    //0 代表的私教课 1 表示的是团课
    selectClass: 0,
    courseList: ['私教', '团课'],
    weekList: [],
    //选择星期
    choosesDay: 0,
    datatime: [],
    currentCoach: null,
    //分页属性
    pageSize: 5,
    currPage: 1,
    //团课列表
    togetherClass: [],
    chooseCoach:null,
    isChoose:false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let today = util.formatTime(new Date());
    today = today.slice(0, 10).replace(/\//g, '-')
    this.setData({
      today: today,
      SearchDate: today,
      selectClass: Number(options.course),
      showcourse: Number(options.course),
    })
    this.setData({
      navHeight: app.globalData.navHeight,
      navTop: app.globalData.navTop,
    })
    //日期
    this.getWeekList();
    //教练列表
    this.getMyCoachClassList();

    //this.getMyCurrentTime();
  },
  //切换
  switchClass(e) {
    //判断
    let classes = e.currentTarget.dataset.index;
    if (classes == 1) {
      this.getCardTogether();
    }
    this.setData({
      selectClass: classes,
      showcourse: classes
    })
  },
  getWeekList: function (t) {
    let dayList = [];
    var myDate;
    if (t) {
      myDate = new Date(t)
    } else {
      myDate = new Date()
    }
    dayList.push({
      'day': myDate.getDate(),
      'month': myDate.getMonth() + 1,
      'week': util.toWeekDay(myDate),
      'year': myDate.getFullYear()
    });
    for (var i = 0; i < 4; i++) {
      myDate.setDate(myDate.getDate() + 1);
      dayList.push({
        'day': myDate.getDate(),
        'month': myDate.getMonth() + 1,
        'week': util.toWeekDay(myDate),
        'year': myDate.getFullYear()
      });
    }
    for (var i = 0; i < dayList.length; i++) {
      if (dayList[i].month < 10) {
        dayList[i].month = '0' + dayList[i].month
      }
      if (dayList[i].day < 10) {
        dayList[i].day = '0' + dayList[i].day
      }
    }
    console.log(dayList)
    this.setData({
      weekList: dayList
    })
  },
  //选择日期
  chooseDate: function (e) {
    var that = this
    var dayIndex = e.currentTarget.dataset.index;
    var da = e.currentTarget.dataset.date.replace('.', '-')
    console.log(da)
    var sdate = this.data.SearchDate;
    var year = new Date(sdate).getFullYear();
    this.setData({
      choosesDay: dayIndex,
      SearchDate: year + '-' + da,
      num: null
    })
    //所选的是团课还是私教课
    if (that.data.selectClass == 0) {
      this.getPrivateAppointment();
    } else {
      this.getCardTogether()
    }
  },
  //判断是否可以预约
  showch: function () {
    wx.showToast({
      icon: "none",
      title: '不可预约',
    })
  },
  showch1: function (e) {
    console.log(e.currentTarget.dataset.num);
    this.setData({
      num: e.currentTarget.dataset.num,
      starttime: e.currentTarget.dataset.s,
      endtime: e.currentTarget.dataset.e
    })

  },
  // 判断哪些时间已过期
  getMyCurrentTime: function () {
    var dataTime = this.data.datatime;
    for (var i = 0; i < dataTime.length; i++) {
      if (dataTime[i].StateMsg === '已预约') {
        dataTime[i].type = 1;
      } else if (dataTime[i].StateMsg === '可预约') {
        dataTime[i].type = 2;
      } else {
        //不可预约
        dataTime[i].type = 0;
      }
    }
   // console.log(dataTime)
    this.setData({
      datatime: dataTime
    })
  },
  //预约
  succssful: function () {
    var that = this
    if (!this.data.num) {
      wx.showToast({
        title: '请选择时间',
        icon: 'none'
      })
    } else {
      that.getMyCoachReserveCoachClass();
    }
  },
  //教练列表
  getMyCoachClassList: function () {
    var that = this;
    if (!that.data.currentCoach) {
      api.request({
        url: "/MyCoachClassList",
        data: {
          user_token: wx.getStorageSync('token'),
          UI_ID: wx.getStorageSync('UI_ID'),
          pageSize: that.data.pageSize,
          pageIndex: that.data.currPage
        }
      }).then(res => {
        if (res.data.code == 1 && res.data.data.length>0) {
          that.setData({
            currentCoach: res.data.data[0],
            isCanCoach:true
          })
          //预约时间
          that.getPrivateAppointment();
        }else{
          that.setData({
            isCanCoach:false
          })
         }
      })
      return;
    }
    that.getPrivateAppointment();
  },
  //跳转私教课页面
  chooseSpecilClass:function(){
      wx.navigateTo({
        url: '/pages/classList/classList',
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
    //团课
    this.getCardTogether();
  },
  //私教预约时间列表
  getPrivateAppointment() {
    var that = this
    api.request({
      url: "/MyCoachPrivateClassReservationList",
      data: {
        user_token: wx.getStorageSync('token'),
        SearchDate: that.data.SearchDate,
        FK_AL_TeachCoach_ID: that.data.currentCoach.FK_AL_TeachCoach_ID
      }
    }).then(res => {
      console.log(res)
      that.setData({
        datatime: res.data.data
      })
      that.getMyCurrentTime();
    })
  },
  //预约私教课
  getMyCoachReserveCoachClass: function () {
    var that = this
    let stime = that.data.starttime.split(':');
    let endTime = null;
    var hour, min;
    if (Number(stime[1]) + Number(that.data.currentCoach.CP_Time) >= 60) {
      hour = Number(stime[0]) + parseInt((Number(that.data.currentCoach.CP_Time) + Number(stime[1])) / 60);
      min = Number(stime[1]) + Number(that.data.currentCoach.CP_Time) - parseInt((Number(that.data.currentCoach.CP_Time) + Number(stime[1])) / 60) * 60;
      endTime = hour + ':' + (min == 0 ? min + '0' : min);
    } else {
      hour = Number(stime[0]);
      min = Number(stime[1]) + Number(that.data.currentCoach.CP_Time)
      endTime = hour + ':' + (min == 0 ? min + '0' : min);
    }
    console.log(endTime)
    that.setData({
      endtime: endTime
    })
    // 上传预约时间
    let yuyueList = that.data.datatime;
    if (Number(that.data.currentCoach.CP_Time) > 30 && Number(that.data.currentCoach.CP_Time) <= 60 && that.data.num < yuyueList.length) {
      console.log('小于60分钟')
      if (yuyueList[that.data.num].type != 2) {
        wx.showToast({
          title: '不可预约'
        })
        return
      }
    } else if (Number(that.data.currentCoach.CP_Time) > 60 && Number(that.data.currentCoach.CP_Time) <= 90 && that.data.num + 1 < yuyueList.length) {
      console.log('大于60分钟')
      if (yuyueList[that.data.num + 1].type != 2) {
        wx.showToast({
          title: '不可预约'
        })
        return
      }
    }
    //约课
    var reserveJson = {
      CO_ID: that.data.currentCoach.CO_ID,
      UI_ID: wx.getStorageSync('UI_ID') || 0,
      FK_GB_ID: wx.getStorageSync('GB_ID'),
      CP_ID: that.data.currentCoach.CP_ID,
      CoachID: that.data.currentCoach.FK_AL_TeachCoach_ID,
      StartTime: that.data.SearchDate + ' ' + that.data.starttime,
      EndTime: that.data.SearchDate + ' ' + that.data.endtime
    }
    wx.showModal({
      title: '',
      content: '确认预约该课程吗',
      success(res) {
        if (res.confirm) {
          api.request({
            url: "/MyCoachReserveCoachClass",
            data: {
              user_token: wx.getStorageSync('token'),
              reserveJson: JSON.stringify(reserveJson)
            }
          }).then(res => {
            console.log(res)
            if (res.data.code == 1) {
              that.getPrivateAppointment();
              // wx.showToast({
              //   icon: "none",
              //   title: '预约成功',
              // })
              var cs_num = "currentCoach.CS_Num";
              var num = that.data.currentCoach.CS_Num++;
              console.log(num)
              that.setData({
                num: null,
                starttime: null,
                endtime: null,
                [cs_num]: num
              })
              let coach1 = JSON.stringify(that.data.currentCoach)
              setTimeout(function (){
                wx.navigateTo({
                  url: '/page2/suceess/suceess?coach=' + coach1,
                })
              }, 1000);

            } else {
              wx.showToast({
                icon: "none",
                title: res.data.msg + ",暂时不能约课",
              })
            }
          })
        }
      }
    })

  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      date: false,
      num: null,
      starttime: null,
      endtime: null
    })
  },
  //给点击的日期设置一个背景颜色
  dayClick: function (event) {
    var that = this
    let clickDay = event.detail.day;
    let clickYear = event.detail.year;
    let clickMonth = event.detail.month;
    clickMonth < 10 ? clickMonth = "0" + clickMonth : clickMonth
    clickDay < 10 ? clickDay = "0" + clickDay : clickDay
    let changeDay = `dayStyle[1].day`;
    let changeBg = `dayStyle[1].background`;
    let chose_time = clickYear + '-' + clickMonth + "-" + clickDay
    console.log(chose_time)
    var caniclick = Date.parse(chose_time) >= Date.parse(this.data.today)
    if (caniclick) {
      this.setData({
        [changeDay]: clickDay,
        [changeBg]: "#84e7d0",
        date: false,
        SearchDate: chose_time
      })
      that.getWeekList(chose_time);
      //刷新预约时间列表
      if (this.data.selectClass == 0) {
        that.getPrivateAppointment();
      } else {
        that.getCardTogether()
      }

      that.setData({
        choosesDay: 0,
        num: null
      })
    } else {
      wx.showToast({
        title: '预约时间已过',
        icon: "none"
      })
      that.setData({
        date: false,
      })
    }
  },
  showCalendar() {
    this.setData({
      date: !this.data.date
    })
  },
  //团课预约
  getCardTogether: function () {
    var that = this
    api.request({
      url: "/CardTogether",
      data: {
        user_token: wx.getStorageSync('token'),
        SearchDate: that.data.SearchDate,
        UI_ID: wx.getStorageSync('UI_ID') || 0,
        GB_ID: wx.getStorageSync('GB_ID')
      }
    }).then(res => {
      console.log(res)
      that.setData({
        togetherClass: res.data.data
      })
    })
  },
  //预约团课
  orderTogther: function (e) {
    let tcalss = e.currentTarget.dataset.togther
    console.log(tcalss)
    //判断是否登录
    //是否购买会员卡
    let phone = wx.getStorageSync('phone')
    if (phone && phone !== '') {
      if (Number(tcalss.IsAppointment) == 0) {
        wx.navigateTo({
          url: '/pages/groupAppointment/groupAppointment?tclass=' + JSON.stringify(tcalss),
        })
      }
    } else {
      wx.navigateTo({
        url: '/page2/login/login',
      })
    }
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

})