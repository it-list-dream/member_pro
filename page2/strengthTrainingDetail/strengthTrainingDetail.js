const app = getApp();
import * as echarts from '../../components/ec-canvas/echarts.min.js';

function getOption(xdata, ydata) {
  var option = {
    clickable: true,
    triggerEvent: true,
    title: {
      text: '重量分布情况',
      textStyle: {
        fontWeight: "500",
        fontSize: 14,
      },
      left: '50%',
      textAlign: 'center',
      padding: [24, 0, 10, 0]
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      top: '22%',
      left: '4%',
      right: '12%',
      bottom: '4%',
      containLabel: true
    },
    xAxis: [{
      name:"kg",
      nameTextStyle: {
        color: "#9BA6AE",
        fontSize: 12,
       // padding: [0, 0, 0, 0], //name文字位置 对应 上右下左
      },
      boundaryGap: [0, 0.01],
      splitLine: {
        show: false
      },
      axisTick: {
       // alignWithLabel: true,
         show: false,
       //  inside: true,
      },
      axisLine: {
        lineStyle: {
          type: 'solid',
          color: '#ffffff', //左边线的颜色
          width: '1' //坐标线的宽度
        },
      },
      axisLabel: {
        color: "#9BA6AE",
      }
    }],
    yAxis: [{
      name:"次数",
      nameTextStyle: {
        color: "#9BA6AE",
        fontSize: 12,
       // padding: [0, 0, 0, 0], //name文字位置 对应 上右下左
      },
      type: 'category',
      splitLine: {
        show: false
      },
      axisTick: {
        alignWithLabel: true,
         show: false,
         inside: true,
      },
      axisLine: {
        lineStyle: {
          type: 'solid',
          color: '#ffffff', //左边线的颜色
          width: '1' //坐标线的宽度
        },
      },
      axisLabel: {
        color: "#9BA6AE",
      },
      data:xdata
    }],
    series: [{
      name: '重量',
      type: 'bar',
      barWidth: '50%',
      data: ydata,
      itemStyle: {
        normal: {
          color: "#3AA0FF"
        },
      }
    }],
  };
  return option
};
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ec: {
      lazyLoad: true
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var power = JSON.parse(options.power),
        weight = power.trainingList.map(item=>item.counterWeight),
        count = power.trainingList.map(item=>item.times);
    this.ecComponent = this.selectComponent('#mychart-dom-bar');
    this.setData({
      navHeight: app.globalData.navHeight,
      navTop: app.globalData.navTop,
      power
    });
    console.log('weight:',weight)
    console.log('count:',count)
    this.init(count,weight)
  },
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})