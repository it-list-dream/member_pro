// page2/editProfile/editProfile.js
const app = getApp()
let util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: '',
    sex: ['男', '女'],
    heightList:[],
    phone: '15111428921',
    sexId: null,
    birthday: null,
    endTime: null,
    heightId:null,
    weightId:null,
    weightList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let date = util.formatTime(new Date());
    this.setData({
      endTime: date
    })
  },
  changeSex(e) {
    //console.log(e)
    wx.setStorageSync('sex', e.detail.value)
    this.setData({
      sexId: e.detail.value
    })
  },
  changePhone(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  changeBirthday(e) {
    this.setData({
      birthday: e.detail.value
    })
  },
  changeHeight(e){
    this.setData({
      heightId: e.detail.value
    })
  },
  changeWeight(e){
    this.setData({
      weightId: e.detail.value
    })
  },
  getHeight(){
    let height = this.data.heightList;
    for(let i = 120;i<=230;i++){
    //  console.log(i)
         height.push(i)
    }
    this.setData({
      heightList:height
    })
  },
  getWeight(){
    let weight = this.data.weightList;
     for(let i = 30;i<=160;i++){
        weight.push(i);
        weight.push(i+0.5);
     }
     this.setData({
        weightList:weight
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
    this.getHeight();
    this.getWeight();
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