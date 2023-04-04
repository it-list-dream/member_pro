const util = require('../../utils/util.js')
const app = getApp()
let api = require('../../utils/request.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //0 表示私教 1 表示团课
    tabIndex: 1,
    dayStyle: [{
        month: 'current',
        day: new Date().getDate(),
        color: 'white',
        background: '#12D58B'
      },
      {
        month: 'current',
        day: new Date().getDate(),
        color: 'white',
        background: '#12D58B'
      }
    ],
    //日期的显示和隐藏
    date: false,
    SearchDate: null,
    today: null,
    num: null,
    courseList: [],
    weekList: [],
    //选择星期
    choosesDay: 0,
    datatime: [],
    //当前的教练
    currentCoach: {},
    //当前的课程
    currentClasses: {},
    //分页属性
    // pageSize: 5,
    // currPage: 1,
    //团课列表
    togetherClass: [],
    //是否有私教课
    isCanCoach: false,
    speicalClassList: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var today = util.format(new Date(), 'yyyy-mm-dd')
    this.getWeekList();
    let {
      course,
      coach
    } = options;
    var isHideClass = app.globalData.setOptions.IsHidenCoachPre,
      tabList = [],
      leagueList = [],
      index = 0,
      currentCoach = null,
      that = this;
    //判断是否有团课
    api.request({
      url: "/CardTogether",
      data: {
        user_token: wx.getStorageSync('token'),
        SearchDate: today,
        UI_ID: wx.getStorageSync('UI_ID') || 0,
        GB_ID: wx.getStorageSync('GB_ID')
      }
    }).then(res => {
      //普通团课
      let flag = res.data.isHiden,
        specialLeague = app.globalData.leagueType;
      //是否隐藏私教
      //console.log(typeof isHideClass ,app.globalData)
      if (isHideClass != 1) {
        tabList.push('私教');
        //我的课程切换过来的
        if (coach) {
          currentCoach = JSON.parse(coach);
          this.getPrivateAppointment(currentCoach.FK_AL_TeachCoach_ID, today);
        } else {
          this.getMyCoachClassList();
        }
      }
        if( flag == undefined || Number(flag) > 0){
          tabList.push('团课');
          leagueList = res.data.data;
        }
      if (specialLeague == 1) {
        tabList.push('普拉提团课');
        this.getSpecilLeague(today)
      }
      index = tabList.findIndex(item => item == course) == -1 ? 0 : tabList.findIndex(item => item == course);
      this.setData({
        navHeight: app.globalData.navHeight,
        navTop: app.globalData.navTop,
        today: today,
        SearchDate: today,
        tabIndex: index,
        courseList: tabList,
        togetherClass: leagueList,
        currentClasses: currentCoach,
        isCanCoach: currentCoach ? true : false
      });
    });
  },
  //切换
  switchClass(e) {
    //判断
    let idx = e.currentTarget.dataset.index;
    if (idx != this.data.tabIndex) {
      if (this.data.courseList[idx] == '团课') {
        this.getCardTogether();
      }
      this.setData({
        tabIndex: idx
      })
    }
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
    //console.log(dayList)
    this.setData({
      weekList: dayList
    })
  },
  //选择日期
  chooseDate: function (e) {
    var dayIndex = e.currentTarget.dataset.index,
      idx = this.data.tabIndex;
    var da = e.currentTarget.dataset.date.replace('.', '-');
    if (this.data.choosesDay == dayIndex) {
      return;
    }
    var sdate = this.data.SearchDate;
    var year = new Date(sdate).getFullYear();
    this.setData({
      choosesDay: dayIndex,
      SearchDate: year + '-' + da,
      num: null,
      date: false
    })
    //所选的是团课还是私教课
    if (this.data.courseList[idx] == '私教') {
      let tid = this.data.currentCoach.AI_ID || this.data.currentClasses.FK_AL_TeachCoach_ID;
      this.getPrivateAppointment(tid, this.data.SearchDate);
    } else if (this.data.courseList[idx] == '团课') {
      this.getCardTogether()
    } else if (this.data.courseList[idx] == '普拉提团课') {
      this.getSpecilLeague(this.data.SearchDate);
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
    this.setData({
      num: e.currentTarget.dataset.num,
      starttime: e.currentTarget.dataset.s,
      endtime: e.currentTarget.dataset.e
    })
  },
  getSpecilLeague(date) {
    api.request({
      url: "/GroupClassReleaseList",
      data: {
        user_token: wx.getStorageSync('token'),
        UI_ID: wx.getStorageSync('UI_ID') || -1,
        GB_ID: wx.getStorageSync('GB_ID'),
        startdate: date
      }
    }).then(res => {
      let list = res.data.data,
        appoinenments = [],
        nowing = Date.now();
        if(list && Array.isArray(list)){
          list.forEach(item => {
            item.ClassEndTime = util.format(item.ClassEndTime, 'yyyy-mm-dd hh:mm');
            item.ClassStartTime = util.format(item.ClassStartTime, 'yyyy-mm-dd HH:mm');
            item.timestamp = Date.parse(item.ClassEndTime)
            if (item.IsRegister == 1 && Date.parse(item.DeadlineTime) < nowing) {
            //  noAppoinments.push(item);
            } else {
              appoinenments.push(item)
            }
          });
          //noAppoinments = noAppoinments.sort(util.compare('timestamp'));
          appoinenments = appoinenments.sort(util.compare('timestamp'));
          //console.log(noAppoinments,appoinenments)
          //[...appoinenments,...noAppoinments]
          this.setData({
            speicalClassList: appoinenments
          });
        }
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
    var teacherId = wx.getStorageSync('tid');
    var co_id = wx.getStorageSync('co_id');
    let classes = [];
    //第一次进入，没有预约
    api.request({
      url: "/MyCoachClassList",
      data: {
        user_token: wx.getStorageSync('token'),
        UI_ID: wx.getStorageSync('UI_ID') || 0,
        pageIndex: 1,
        pageSize: 20
      }
    }).then(res => {
      if (res.data.data && res.data.data.length > 0) {
        if (co_id && teacherId) {
          classes = res.data.data.filter(item => item.CO_ID == co_id);
          if (classes instanceof Array && classes.length > 0) {
            this.setData({
              currentClasses: classes[0],
            })
            that.getTeacherInfo(teacherId);
          } else {
            this.setData({
              currentClasses: res.data.data[0],
            })
            that.getPrivateAppointment(res.data.data[0].FK_AL_TeachCoach_ID, that.data.SearchDate);
          }
        } else {
          classes = res.data.data[0];
          this.setData({
            currentClasses: classes,
          })
          that.getPrivateAppointment(classes.FK_AL_TeachCoach_ID, that.data.SearchDate);
        }
        this.setData({
          isCanCoach: true,
        })
      } else {
        this.setData({
          isCanCoach: false
        })
      }
    })
  },
  //根据id查询当前教练
  getTeacherInfo(ai_id) {
    api.request({
      url: "/TeacherInfo",
      data: {
        user_token: wx.getStorageSync('token'),
        AI_ID: ai_id
      }
    }).then(res => {
      if (res.data.code == 1) {
        //console.log(res)
        this.setData({
          currentCoach: res.data.data[0]
        })
        this.getPrivateAppointment(ai_id, this.data.SearchDate);
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
  onShow: function () {},
  //私教预约时间列表
  getPrivateAppointment(co_id, searchDate) {
    var that = this
    api.request({
      url: "/MyCoachPrivateClassReservationList",
      data: {
        user_token: wx.getStorageSync('token'),
        SearchDate: searchDate,
        //跟ai_id一样
        FK_AL_TeachCoach_ID: co_id
      }
    }).then(res => {
      let datatimeList = res.data.data;
      datatimeList.forEach(item => {
        if (item.StateMsg == '已预约') {
          item.type = 1;
        } else if (item.StateMsg === '可预约') {
          item.type = 2;
        } else {
          item.type = 0;
        }
      });
      that.setData({
        datatime: datatimeList
      })
    })
  },
  //预约私教课
  getMyCoachReserveCoachClass: function () {
    var that = this
    let stime = that.data.starttime.split(':');
    let endTime = null;
    let teacher_id = null;
    var hour, min;
    if (Number(stime[1]) + Number(that.data.currentClasses.CP_Time) >= 60) {
      hour = Number(stime[0]) + parseInt((Number(that.data.currentClasses.CP_Time) + Number(stime[1])) / 60);
      min = Number(stime[1]) + Number(that.data.currentClasses.CP_Time) - parseInt((Number(that.data.currentClasses.CP_Time) + Number(stime[1])) / 60) * 60;
      endTime = hour + ':' + (min == 0 ? min + '0' : min);
    } else {
      hour = Number(stime[0]);
      min = Number(stime[1]) + Number(that.data.currentClasses.CP_Time)
      endTime = hour + ':' + (min == 0 ? min + '0' : min);
    }
    // console.log(endTime)
    that.setData({
      endtime: endTime
    })
    // 上传预约时间
    let yuyueList = that.data.datatime;
    if (Number(that.data.currentClasses.CP_Time) > 30 && Number(that.data.currentClasses.CP_Time) <= 60 && that.data.num < yuyueList.length) {
      //console.log('小于等于60分钟')
      if (yuyueList[that.data.num].type != 2) {
        wx.showToast({
          title: '不可预约'
        })
        return
      }
    } else if (Number(that.data.currentClasses.CP_Time) > 60 && Number(that.data.currentClasses.CP_Time) <= 90 && that.data.num + 1 < yuyueList.length) {
      // console.log('大于60分钟')
      if (yuyueList[that.data.num + 1].type != 2) {
        wx.showToast({
          title: '不可预约'
        })
        return
      }
    }

    if (this.data.currentCoach.AI_ID) {
      teacher_id = this.data.currentCoach.AI_ID;
    } else {
      teacher_id = that.data.currentClasses.FK_AL_TeachCoach_ID;
    }
    //约课
    var reserveJson = {
      CO_ID: that.data.currentClasses.CO_ID,
      UI_ID: wx.getStorageSync('UI_ID') || 0,
      FK_GB_ID: wx.getStorageSync('GB_ID'),
      CP_ID: that.data.currentClasses.CP_ID,
      //教练ID
      CoachID: teacher_id,
      StartTime: that.data.SearchDate + ' ' + that.data.starttime,
      EndTime: that.data.SearchDate + ' ' + that.data.endtime,
      CP_Name: that.data.currentClasses.CP_Name
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
            if (res.data.code == 1) {
              let tid = that.data.currentCoach.AI_ID || that.data.currentClasses.FK_AL_TeachCoach_ID;
              that.getPrivateAppointment(tid, that.data.SearchDate);
              var num = that.data.currentClasses.CS_Num + 1;
              that.setData({
                num: null,
                starttime: null,
                endtime: null,
                'currentClasses.CS_Num': num
              });
              //保存teacherid 和 CP_ID
              wx.setStorageSync('tid', teacher_id);
              wx.setStorageSync('co_id', that.data.currentClasses.CO_ID)
              wx.navigateTo({
                url: '/page2/suceess/suceess?isShow=1',
              })
            } else {
              wx.showToast({
                icon: "none",
                title: res.data.msg,
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
    let chose_time = clickYear + '-' + clickMonth + "-" + clickDay;
    let idx = this.data.tabIndex;
    //console.log(chose_time)
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
      if (this.data.courseList[idx] == '私教') {
        //TeachName
        let tid = this.data.currentCoach.AI_ID || this.data.currentClasses.FK_AL_TeachCoach_ID;
        that.getPrivateAppointment(tid, this.data.SearchDate);
      } else if (this.data.courseList[idx] == '团课') {
        that.getCardTogether()
      } else if (this.data.courseList[idx] == '普拉提团课') {
        that.getSpecilLeague(this.data.SearchDate);
      }
      that.setData({
        choosesDay: 0,
        num: null
      });
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
    var that = this;
    api.request({
      url: "/CardTogether",
      data: {
        user_token: wx.getStorageSync('token'),
        SearchDate: that.data.SearchDate,
        UI_ID: wx.getStorageSync('UI_ID') || 0,
        GB_ID: wx.getStorageSync('GB_ID')
      }
    }).then(res => {
      if (res.data.code == 1) {
        let tuanke = res.data.data
        tuanke.sort((a, b) => Date.parse(a.CTO_DateStart) - Date.parse(b.CTO_DateStart))
        that.setData({
          togetherClass: tuanke
        })
      }
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

})