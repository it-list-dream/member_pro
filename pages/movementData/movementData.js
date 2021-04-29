import * as echarts from '../../components/ec-canvas/echarts.min';

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
    //triggerEvent: true,
    tooltip: {
      trigger: 'axis',
      triggerOn: 'click',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'none',
        shadowStyle: {
          color: '#12D58B',
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
        show:false
      },
      axisLine: {
        lineStyle: {
          type: 'solid',
          color: '#52495B', //左边线的颜色
          width: '2' //坐标线的宽度
        }
      },
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
      legendHoverLink: true,
      barWidth: '50%',
      data: [100, 152, 200, 334, 390, 330, 220, 120],
      itemStyle: {
        normal: {
          label: {
            show: true, //开启显示
            position: 'top', //在上方显示
            color: '#AEEAD6'
          },
          color: '#AEEAD6',
          emphasis: {
            color: 'red'
          }
        },
        formatter: '{b0}: {c0}<br />{b1}: {c1}',
      },
    }]
  };
  chart.setOption(option);
  return chart;
}
const app = getApp()
const util = require('../../utils/util.js')
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
    endTime: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var nowDate = util.formatTime(new Date());
    console.log(nowDate)
    this.setData({
      navHeight: app.globalData.navHeight,
      navTop: app.globalData.navTop,
      windowHeight: app.globalData.windowHeight,
      endTime: nowDate
    })
  },
  changeDate(e) {
    this.isSelected = e.target.dataset.index;
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})