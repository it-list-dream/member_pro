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
    clickable: true,
    triggerEvent: true,
    tooltip: {
      trigger: 'axis',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
      },
      triggerOn: 'click',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'shadow',
        shadowStyle: {
          color: '#12D58B'
        },
      },
    },
    grid: {
      left: '1%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [{
      show: true, //---是否显示
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisTick: {
        alignWithLabel: true
      },
      axisTick: {
        show: false
      },
      axisLine: {
        lineStyle: {
          type: 'solid',
          color: '#52495B', //左边线的颜色
          width: '2' //坐标线的宽度
        }
      },
    }],
    axisLabel: { //---坐标轴 标签
      //  margin: 5,					//---刻度标签与轴线之间的距离
      color: '#333333', //---默认取轴线的颜色
    },
    yAxis: [{
      show: false,
      type: 'value',
      splitLine: {
        show: false
      }
    }],
    series: [{
      name: '分钟',
      type: 'bar',
      legendHoverLink: true,
      barWidth: '80%',
      data: [100, 152, 200, 334, 390, 330, 220],
      itemStyle: {
        color: '#AEEAD6',
        normal: {
          label: {
            show: true, //开启显示
            position: 'top', //在上方显示
            textStyle: { //数值样式
              color: '#333333',
              fontSize: 10,
            }
          }
        }
      },
    }]
  }
  chart.setOption(option);
  chart.on('mouserover', function (params) {
    console.log(params)
    //window.open('https://www.baidu.com/s?wd=' + encodeURIComponent(params.name));
  });
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