const util = require('../../utils/util.js')
const app = getApp()
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
    datatime: []
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
      datatime:util.createEveryday(),
      selectClass: Number(options.course),
      showcourse: Number(options.course),
    })
    this.setData({
      navHeight: app.globalData.navHeight,
      navTop: app.globalData.navTop,
      windowHeight: app.globalData.windowHeight
    })
    this.getWeekList();
    this.getMyCurrentTime();
  },
  switchClass(e) {
    this.data.selectClass = e.currentTarget.dataset.index;
    this.setData({
      selectClass: this.data.selectClass,
      showcourse: this.data.selectClass
    })
  },
  order() {
    wx.navigateTo({
      url: '/pages/selectCourse/selectCourse',
    })
  },
  getWeekList: function (t) {
    let dayList;
    if (t) {
      dayList = util.days(t);
    } else {
      dayList = util.days();
    }
    //  let newDate =  dayList.map(item =>{
    //    var month = item.substr(0,2);
    //   if(Number(month)<10){
    //      item.substr(0,1)
    //   }
    //   return  item.replace('月','.')
    //  }) 
    for (let i = 0; i < dayList.length; i++) {
      var month = dayList[i].substr(0, 2);
      if (Number(month) < 10) {
        dayList[i] = dayList[i].substr(1, dayList.length - 1)
      }
      dayList[i] = dayList[i].replace(/[\u4e00-\u9fa5]+/g, function ($) {
        return $ == '月' ? '.' : ''
      })
    }
    this.setData({
      weekList: dayList.slice(0, 5)
    })
    //console.log(dayList)
  },
  chooseDate: function (e) {
    var dayIndex = e.currentTarget.dataset.index;
    var da = e.currentTarget.dataset.date.replace('.', '-')
    da = Number(da.split('-')[0]) > 10 ? da : '0' + da
    var sdate = this.data.SearchDate;
    var year = new Date(sdate).getFullYear();
    this.setData({
      choosesDay: dayIndex,
      SearchDate: year + '-' + da
    })
  },
  hanleDate: function (e) {
    console.log(e.currentTarget.dataset.id);
    this.setData({
      num: e.currentTarget.dataset.id
    })
  },
  // 判断哪些时间已过期
  getMyCurrentTime:function(){
      var cTime = this.data.datatime;
      var d = new Date();
      //获取当前时间
      var passTime = util.formatTime(d);
      console.log(passTime)
      for(var i = 0;i<cTime.length;i++){
      // console.log( cTime[i].starttime.split(':'))
      //   var cHour = cTime[i].starttime.split(':')[0];
      //   var cMin =cTime[i].starttime.split(':')[1];
      //   console.log(Number(d.getHours()),Number(cHour))
      //  if(Number(d.getHours()) = Number(cHour) && cMin >= d.getMinutes()){    
      //     break;
      //  }else{
      //   cTime[i].type = 0;
      //  }
      //cTime[i].starttime = this.data.SearchDate + ' ' +  cTime[i].starttime;
      cTime[i].type = 0;
        //  if(Date.parse(passTime) > new Date(cTime[i].starttime ).getTime() ){
        //   cTime[i].type = 1;
        //     //  break;
        //  }else{
        //   cTime[i].type = 0;
        //  }
       
      }
      console.log(cTime)
     this.setData({
      datatime: cTime
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
        SearchDate: clickYear + '-' + clickMonth + "-" + clickDay
      })
      that.getWeekList(that.data.SearchDate);
      that.setData({
        choosesDay: 0
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
      date: true
    })
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})