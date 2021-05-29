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
    endDate: '2020/01/08'
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
      let eDate = new Date(this.data.endDate);
      let sMonth = sDate.getMonth()+1;

      // console.log(sDate,eDate)
    } else {
      //周
    }
    this.setData({
      isSelected: this.isSelected
    })
  },
  bindYearChange(e) {
    console.log(e.detail.value);
    this.setData({
      date: e.detail.value
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
    console.log(22222)
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
      let y = fristDate.getFullYear();
      let y1 = lastDate.getFullYear();
      let m = fristDate.getMonth();
      let m1 = lastDate.getMonth();
      let day = new Date(y, m, 0).getDate();
      let day1 = new Date(y1, m1, 0).getDate();
      that.setData({
        startDate: util.formatTime1(new Date(fristDate.setDate(fristDate.getDate() - day))),
        endDate: util.formatTime1(new Date(lastDate.setDate(lastDate.getDate() - day1))),
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
      let newDate = util.formatTime1(new Date(fristDate.setDate(fristDate.getDate() + 7)));
      let newDate1 = util.formatTime1(new Date(lastDate.setDate(lastDate.getDate() + 7)));
      that.setData({
        startDate: newDate,
        endDate: newDate1,
      })
    } else {
      let y = fristDate.getFullYear();
      let y1 = lastDate.getFullYear();
      let m = fristDate.getMonth();
      let m1 = lastDate.getMonth();
      let day = new Date(y, m, 0).getDate();
      let day1 = new Date(y1, m1, 0).getDate();
      that.setData({
        startDate: util.formatTime1(new Date(fristDate.setDate(fristDate.getDate() + day))),
        endDate: util.formatTime1(new Date(lastDate.setDate(lastDate.getDate() + day1))),
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