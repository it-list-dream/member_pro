import * as echarts from '../../components/ec-canvas/echarts.min.js';
import {
  format
} from '../../utils/util.js';
var api = require('../../utils/request.js');
//let chart = null;
const app = getApp()
const util = require('../../utils/util.js')

function getOption(xdata, ydata) {
  var option = {
    clickable: true,
    triggerEvent: true,
    tooltip: {
      show: true,
      showContent: false,
      trigger: 'axis',
      triggerOn: 'click',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'shadow',
        shadowStyle: {
          opacity: 0
        },
      },
    },
    grid: {
      top: '22%',
      left: '5%',
      right: '5%',
      bottom: '4%',
      containLabel: true
    },
    xAxis: [{
      show: true, //---是否显示
      type: 'category',
      data: xdata,
      axisTick: {
        alignWithLabel: true,
        // show: false,
        inside: true,
      },
      axisLine: {
        lineStyle: {
          type: 'solid',
          color: '#03c986', //左边线的颜色
          width: '1' //坐标线的宽度
        },
      },
      axisLabel: {
        color: "#333333",
        // interval:0,
        // rotate:40
      }
    }],
    yAxis: [{
      show: false,
      type: 'value',
      splitLine: {
        show: false
      },
      axisLabel: {
        show: false
      }
    }],
    series: [{
      name: '分钟',
      type: 'bar',
      barWidth: '50%',
      data: ydata,
      itemStyle: {
        normal: {
          color: "#AEEAD6"
        },
      },
      emphasis: { // 鼠标经过时：
        color: '#FFD117',
        label: {
          show: true,
          position: 'top',
          padding: [4, 15, 5, 15],
          borderWidth: 0,
          color: "#333333",
          fontSize: 12,
          fontFamily: 'PingFang SC',
          formatter: params => params.value + "分钟"
        },
        itemStyle: {
          color: '#12D58B'
        }
      }
    }],
  };
  return option
}


Page({

  /**
   * 页面的初始数据
   */
  data: {
    date_info: ['周', '月'],
    isSelected: 0,
    date: '2018',
    // ec: {
    //   onInit: initChart
    // },
    ec: {
      lazyLoad: true
    },
    endTime: '',
    sportDesc: null,
    //日期
    startDate: '',
    endDate: '',
    runTotalList: [],
    //echarts中的数据
    dateList: [],
    myRunList: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取echarts
    this.ecComponent = this.selectComponent('#mychart-dom-bar');
    var nowDate = util.format(new Date(), 'YYYY-MM-DD')
    var Year = new Date().getFullYear();
    this.setData({
      navHeight: app.globalData.navHeight,
      navTop: app.globalData.navTop,
      endTime: nowDate,
      date: Year
    })
    this.initCurrentDate();
    this.getClassCountByuserId();
    this.getRunRecordByDays();
    this.getRunRecordByTotal();
  },
  initCurrentDate() {
    let start_date = new Date();
    start_date.setDate(1);
    let last_date = new Date(start_date);
    last_date = last_date.setDate(7);
    this.setData({
      startDate: util.format(start_date, 'yyyy/mm/dd'),
      endDate: util.format(last_date, 'yyyy/mm/dd')
    })
  },
  changeDate(e) {
    this.isSelected = e.target.dataset.index;
    if (e.target.dataset.index == 1) {
      //月
      let sDate = new Date(this.data.startDate);
      let Y = sDate.getFullYear();
      let M = (sDate.getMonth() + 1) < 10 ? '0' + (sDate.getMonth() + 1) : sDate.getMonth() + 1;
      let D = '01';
      let next_month = Number(M) + 1 < 10 ? '0' + (Number(M) + 1) : Number(M) + 1;
      console.log(M, next_month)
      let next_day = null;
      if (next_month > 12) {
        next_month = '01';
        next_day = new Date(Y + '/' + next_month + '/' + D).setDate(0);
        let mm = new Date(next_day).getMonth();
        mm = mm + 1 < 10 ? '0' + (mm + 1) : mm + 1;
        let dd = new Date(next_day).getDate();
        dd = dd < 10 ? '0' + dd : dd
        next_day = new Date(Y + '/' + mm + '/' + dd)
      } else {
        next_day = new Date(Y + '/' + next_month + '/' + D).setDate(0);
      }
      this.setData({
        startDate: Y + '/' + M + '/' + D,
        endDate: util.formatTime1(new Date(next_day))
      })
    } else {
      //周
      //开始时间
      let sDate = new Date(this.data.startDate);
      let eDate = sDate.setDate(sDate.getDate() + 6);
      this.setData({
        endDate: util.formatTime1(new Date(eDate))
      })
    }
    this.setData({
      isSelected: this.isSelected
    })
    this.getRunRecordByDays()
    this.getRunRecordByTotal();
  },
  bindYearChange(e) {
    //  console.log(e.detail.value);
    let start_time = this.data.startDate;
    let end_time = this.data.endDate;
    start_time = start_time.replace(start_time.split('/')[0], e.detail.value);
    end_time = end_time.replace(end_time.split('/')[0], e.detail.value);
    //console.log(start_time, end_time)
    this.setData({
      date: e.detail.value,
      startDate: start_time,
      endDate: end_time
    })
    this.getRunRecordByDays()
    this.getRunRecordByTotal();
  },
  //累计运动天数
  getClassCountByuserId: function () {
    var that = this
    api.request({
      url: '/ClassCountByuserId',
      data: {
        user_token: wx.getStorageSync('token'),
        GB_ID: wx.getStorageSync('GB_ID'),
        UI_ID: wx.getStorageSync('UI_ID')
      }
    }).then(res => {
      if (res.data.code == 1) {
        let s1 = res.data.data;
        s1.runtime = Math.ceil(s1.runtime / 60)
        that.setData({
          sportDesc: s1
        })
      }
    })
  },
  _navBack: function () {
    wx.navigateBack({
      delta: 1,
    })
  },
  //上一个
  pervClick: function () {
    var that = this
    let fristDate = new Date(that.data.startDate);
    let lastDate = that.data.startDate;
    // let lastDate = new Date(that.)
    //console.log(fristDate,lastDate)
    let isWeek = that.data.isSelected == 0 ? true : false;
    if (isWeek) {
      let newDate = util.formatTime1(new Date(fristDate.setDate(fristDate.getDate() - 6)));
      let newDate1 = util.format(lastDate, 'yyyy-mm-dd');
      that.setData({
        startDate: newDate,
        endDate: newDate1,
      })
    } else {
      let sTime = new Date(this.data.startDate);
      let eTime = new Date(this.data.endDate);
      //获取到当前的月份减1
      let s_t = new Date(sTime.setDate(0))
      let s_y = s_t.getFullYear();
      let s_m = s_t.getMonth() + 1;
      s_m = s_m < 10 ? '0' + s_m : s_m;
      let s_d = '01';
      // console.log(s_m)
      let start_date = new Date(s_y + '/' + s_m + '/' + s_d);
      // console.log(start_date)
      //结束日期
      let e_t = new Date(eTime.setDate(0))
      that.setData({
        startDate: util.formatTime1(start_date),
        endDate: util.formatTime1(new Date(e_t)),
      })
    }
    this.getRunRecordByDays()
    this.getRunRecordByTotal();
  },
  //下一个
  nextClick: function () {
    var that = this
    let fristDate = new Date(that.data.startDate)
    let lastDate = new Date(that.data.endDate);
    let now = util.formatTime1(new Date());
    if (lastDate.getTime() > new Date(now).getTime()) {
      // console.log('不能超过当前时间')
      return;
    }
    //console.log(now)
    //获取当前的日期
    let isWeek = that.data.isSelected == 0 ? true : false;
    if (isWeek) {
      let newDate = util.formatTime1(new Date(fristDate.setDate(fristDate.getDate() + 6)));
      let newDate1 = util.formatTime1(new Date(lastDate.setDate(lastDate.getDate() + 6)));
      that.setData({
        startDate: newDate,
        endDate: newDate1,
      })
    } else {
      let sTime = new Date(this.data.startDate);
      let eTime = new Date(this.data.endDate);
      //获取到当前的月份加1
      let s_y = sTime.getFullYear();
      let s_m = sTime.getMonth() + 1;
      s_m = s_m < 10 ? '0' + s_m : s_m;
      let day_count = new Date(s_y, s_m, 0).getDate();
      let ss1 = new Date(sTime.setDate(sTime.getDate() + day_count));
      // //结束日期
      let e_y = eTime.getFullYear();
      let e_m = eTime.getMonth() + 2;
      e_m = e_m < 10 ? '0' + e_m : e_m;
      let day_count1 = null;
      let next_date = null;
      //获取下一个月的日期的天数
      if (Number(e_m) > 12) {
        e_m = '01';
        e_y = e_y + 1;
        day_count1 = new Date(e_y, e_m, 0).getDate();
        next_date = new Date(eTime.setDate(eTime.getDate() + day_count1))
      } else {
        day_count1 = new Date(e_y, e_m, 0).getDate();
        next_date = new Date(eTime.setDate(eTime.getDate() + day_count1))
      }

      that.setData({
        startDate: util.formatTime1(ss1),
        endDate: util.formatTime1(next_date),
      })
    }
    this.getRunRecordByDays();
    this.getRunRecordByTotal();
  },
  //运动次数
  getRunRecordByDays() {
    api.request({
      url: "/RunRecordByDays",
      data: {
        token: wx.getStorageSync('token'),
        dateFrom: this.data.startDate,
        dateTo: this.data.endDate
      }
    }).then(res => {
      if (res.data.code == 1) {
        let runDays = res.data.data;
        let dateList = runDays.map(item => util.format(item.createdate, 'MM.DD'))
        let myRunList = runDays.map(item => Number(Math.ceil(item.runtime / 60)))
        this.setData({
          dateList,
          myRunList
        })
        this.init(dateList, myRunList)
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  //初始化echarts中的数据
  onReady: function () {

  },
  //初始化init
  init: function (xdata, ydata) {
    this.ecComponent.init((canvas, width, height, dpr) => {
      // 获取组件的 canvas、width、height 后的回调函数
      // 在这里初始化图表
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr // new
      });
      //xdata ydata 
      let option = getOption(xdata, ydata);
      // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
      this.chart = chart;
      chart.setOption(option)
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return chart;
    });
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  //数据总和
  getRunRecordByTotal() {
    let totleList = [];
    //测试
    api.request({
      url: "/RunRecordByTotal",
      data: {
        token: wx.getStorageSync('token'),
        dateFrom: this.data.startDate,
        dateTo: this.data.endDate
      }
    }).then(res => {
      console.log(res)
      if (res.data.code == 1) {
        totleList = res.data.data;
        totleList.forEach(item => {
          item.runtime = Math.ceil(item.runtime / 60)
        })
        this.setData({
          runTotalList: totleList
        })
      }
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  // compare: function (prop) {
  //   return function (a, b) {
  //     return Number(a[prop]) - Number(b[prop])
  //   }
  // },
})