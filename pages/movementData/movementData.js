import * as echarts from '../../components/ec-canvas/echarts.min';

let chart = null;

function initChart(canvas, width, height, dpr) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);
  var option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [120, {
        value: 200,
        itemStyle: {
          color: '#a90000'
        }
      }, 150, 80, 70, 110, 130],
      type: 'bar'
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
    endTime:''
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
      endTime:nowDate
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