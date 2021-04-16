//引入城市JSON数据文件
var tcity = require("../../utils/citys-select.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    concatPerson: "", //联系人
    phone: "", //手机号
    address: "", //详细地址
    multiCityArray: ['', '', ''], //picker  multiSelector 城市数据
    multiIndex: [0, 0, 0], //picker  multiSelector 当前选中的第几项
    cityData: [],
    visible: true,
    is_setting: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initCityData()
  },
  bindinputblur: function (e) {
    //console.log(e)
    let type = e.currentTarget.dataset.type
    if (type == "concatPerson") {
      this.data.concatPerson = e.detail.value
    } else if (type == "phone") {
      this.data.phone = e.detail.value
    } else if (type == "address") {
      this.data.address = e.detail.value
    }
  },
  //获取JSON 城市数据，进行 picker  multiSelector 所需数据
  initCityData: function () {
    var that = this
    //一、获取城市JSON数据
    tcity.init(that)
    var cityData = that.data.cityData
    this.data.cityData = cityData

    //二、组装multiCityArray 数据数组
    var multiCityArray = [
      [],
      [],
      []
    ]
    //1.遍历城市JSON数据，组装 省级 数据数组
    for (var i = 0; i < cityData.length; i++) {
      multiCityArray[0].push(cityData[i].name)
    }
    //2.遍历第一个省份的数据，组装 该省级下的城市 数据数组
    for (var i = 0; i < cityData[0].sub.length; i++) {
      multiCityArray[1].push(cityData[0].sub[i].name)
    }
    //3.遍历第一个省份下的第一个城市的数据，组装 该市级下的区县 数据数组
    for (var i = 0; i < cityData[0].sub[0].sub.length; i++) {
      multiCityArray[2].push(cityData[0].sub[0].sub[i].name)
    }

    //设置data中的multiCityArray数据,并渲染页面
    this.setData({
      'multiCityArray': multiCityArray
    })
  },
  //picker change回调
  _multiPickerChange: function (e) {
    console.log("调用父组件的事件")
    console.log("调用父组件的事件", e)
    this.data.multiIndex = e.detail.multiIndex
    this.data.multiCityArray = e.detail.multiCityArray
  },
  //保存
  save: function () {
    let concatPerson = this.data.concatPerson
    let phone = this.data.phone
    if (!concatPerson) {
      wx.showToast({
        title: "请输入联系人姓名",
        icon: 'none' //success、loading、none 
      })
      return
    }
    var phonetel = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (!phone) {
      wx.showToast({
        title: "请输入手机号",
        icon: 'none' //success、loading、none 
      })
      return
    } else {
      if (!phonetel.test(phone)) {
        wx.showToast({
          title: "请输入合法的手机号",
          icon: 'none' //success、loading、none 
        })
        return
      }
    }
    //处理省份、城市、区县  中文名称
    let province = this.data.multiCityArray[0][this.data.multiIndex[0]]
    let city = this.data.multiCityArray[1][this.data.multiIndex[1]]
    let district = this.data.multiCityArray[2][this.data.multiIndex[2]]
    // console.log("province", province)
    // console.log("city", city)
    // console.log("district", district)
    //处理省份、城市、区县
    // let provinceObject = this.data.cityData[this.data.multiIndex[0]]
    // let cityObject = this.data.cityData[this.data.multiIndex[0]].sub[this.data.multiIndex[1]]
    // let districtObject = this.data.cityData[this.data.multiIndex[0]].sub[this.data.multiIndex[1]].sub[this.data.multiIndex[2]]
    // console.log("provinceObject", provinceObject)
    // console.log("cityObject", cityObject)
    // console.log("districtObject", districtObject)

  },
  changeSetting(){
    //console.log(11);
    let setting = this.data.is_setting
    this.setData({
      is_setting:!setting
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