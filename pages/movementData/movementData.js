import * as echarts from '../../components/ec-canvas/echarts.min';
var api = require('../../utils/request.js')
let chart = null;

function initChart(canvas, width, height, dpr) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  //console.log(width, height, dpr)
  canvas.setChart(chart);
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
      left: '2%',
      right: '2%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [{
      show: true, //---是否显示
      type: 'category',
      data: ['03.08', '03.09', '03.10', '03.11', '03.12', '03.13', '03.14'],
      axisTick: {
        alignWithLabel: true,
        show: false,
        inside: false,
      },
      axisLine: {
        lineStyle: {
          type: 'solid',
          color: '#03c986', //左边线的颜色
          width: '1' //坐标线的宽度
        }
      },
      axisLabel: {
        color: "#333333"
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
      data: [100, 152, 200, 334, 390, 330, 220, 120],
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
          padding: [5, 15, 5, 15],
          borderWidth: 0,
          color: "#333333",
          fontSize: 14,
          fontFamily: 'PingFang SC',
        },
        itemStyle: {
          color: '#12D58B'
        }
      }
    }],
  };
  chart.setOption(option);
  return chart;
}

const app = getApp()
const util = require('../../utils/util.js')
const watch = require('../../utils/watch.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date_info: ['周', '月'],
    isSelected: 0,
    date: '2018',
    ec: {
      onInit: initChart
    },
    endTime: '',
    sportDesc: null,
    //日期
    startDate: '2020/01/01',
    endDate: '2020/01/07'
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var nowDate = util.formatTime(new Date());
    this.setData({
      navHeight: app.globalData.navHeight,
      navTop: app.globalData.navTop,
      endTime: nowDate
    })
    this.getClassCountByuserId()
  },
  watch: {
    date: function () {
      console.log('发生改变了')
    }
  },
  changeDate(e) {
    this.isSelected = e.target.dataset.index;
    if (e.target.dataset.index == 1) {
      //月
      let sDate = new Date(this.data.startDate);
      let Y = sDate.getFullYear();
      let M = sDate.getMonth() + 1 < 10 ? +'0' + (sDate.getMonth() + 1) : sDate.getMonth() + 1;
      let D = '01';
      let next_month = Number(M + 1) < 10 ? +'0' + Number(M + 1) : Number(M + 1);
      let next_day = null;
      if (next_month > 12) {
        next_month = '01';
        next_day = new Date(Y + '/' + next_month + '/' + D).setDate(0);
        // next_day = new Date(next_day);
        let mm = new Date(next_day).getMonth();
        mm = mm + 1 < 10 ? +'0' + (mm + 1) : mm + 1;
        let dd = new Date(next_day).getDate();
        dd = dd < 10 ? +'0' + dd : dd
        next_day = new Date(Y + '/' + mm + '/' + dd)
      } else {
        next_day = new Date(Y + '/' + next_month + '/' + D).setDate(0);
      }
      // console.log(next_day)
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
  },
  //运动天数
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
      console.log(res)
      if (res.data.code == 1) {
        that.setData({
          sportDesc: res.data.data
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
    let fristDate = new Date(that.data.startDate)
    let lastDate = new Date(that.data.endDate)
    let isWeek = that.data.isSelected == 0 ? true : false;
    if (isWeek) {
      let newDate = util.formatTime1(new Date(fristDate.setDate(fristDate.getDate() - 7)));
      let newDate1 = util.formatTime1(new Date(lastDate.setDate(lastDate.getDate() - 7)));
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
  },
  //下一个
  nextClick: function () {
    var that = this
    let fristDate = new Date(that.data.startDate)
    let lastDate = new Date(that.data.endDate)
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
      // let day_count1 = new Date(e_y, e_m, 0).getDate();
      // console.log(day_count)
      // let ss2 = new Date(eTime.setDate(day_count1));
      // console.log(util.formatTime1(ss2))
      // let n_m = ss1.getMonth() + 2;
      // n_m = n_m < 10 ? '0' + n_m : n_m;
      // let n_d = ss1.getDate();
      // n_d = n_d < 10 ? '0' + n_d : n_d;
      //日期
      // let next_date = null;
      // if (Number(n_m)> 12) {
      //   n_m = '01';
      //   s_y = s_y + 1;
      //   next_date = new Date(s_y + '/' + n_m + '/' + n_d);
      //   return;
      // let d_count = new Date(next_date.getFullYear(), next_date.getMonth(), 0).getDate();
      // next_date = next_date.setDate(next_date.getDate() + d_count)
      //获取当前月份的最后一天
      // let mm1 = new Date(next_date).getMonth();
      // mm1 = mm1 + 1 < 10 ? +'0' + (mm1 + 1) : mm1 + 1;
      // let dd1 = new Date(next_date).getDate();
      // dd1 = dd1 < 10 ? +'0' + dd1 : dd1
      // next_date = new Date((s_y +1) + '/' + mm1 + '/' + dd1)
      // } else {
      //   next_date = new Date(s_y + '/' + n_m + '/' + n_d);
      // }
      // console.log(next_date)
      // let e_t = new Date(next_date).setDate(0)
      that.setData({
        startDate: util.formatTime1(ss1),
        endDate: util.formatTime1(next_date),
      })
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

  }
})