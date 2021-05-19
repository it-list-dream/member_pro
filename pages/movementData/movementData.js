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
          opacity: 0,
          color:'red'
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
        inside:false,
      },
      axisLine: {
        lineStyle: {
          type: 'solid',
          color: '#03c986', //左边线的颜色
          width: '1' //坐标线的宽度
        }
      },
      axisLabel:{
        color:"#333333"
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
          // label: {
          //   show: true, //开启显示
          //   position: 'top', //在上方显示
          //   color: '#AEEAD6'
          // },
          color: '#B7F2DC',
        },

      },
      emphasis: { // 鼠标经过时：
        color: '#FFD117',
        // borderColor: 'rgba(251,251,251,1)',   
        label: {
          show: true,
          position: 'top',
          padding: [5, 15, 5, 15],
          borderWidth: 0,
          // borderRadius: 4,
          // backgroundColor: '#AEEAD6',
          color: "#333333",
          fontSize:14,
          fontFamily:'PingFang SC',
          // backgroundColor:'#12D58B'
        },
      }
    }],
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
    endTime: '',
    sportDesc:null
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
      endTime: nowDate
    })
    this.getClassCountByuserId()
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
  //运动天数
  getClassCountByuserId:function(){
    var that = this
    api.request({
      url:'/ClassCountByuserId',
      data:{
        user_token:wx.getStorageSync('token'),
        GB_ID:wx.getStorageSync('GB_ID'),
        UI_ID:wx.getStorageSync('UI_ID')
      }
    }).then(res=>{
      console.log(res)
      if(res.data.code == 1){
         that.setData({
          sportDesc:res.data.data
         })
      }
    })
  },
  _navBack:function(){
     wx.navigateBack({
       delta: 1,
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