var app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isPopup: {
      type: Boolean,
      value: false
    },
    isHideCoachPr:{
      type:[String,Number],
      value:0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  lifetimes: {
  },
  /**
   * 组件的方法列表
   */
  methods: {
    close() {
      this.triggerEvent('close')
    },
    groupCourse: function () {
      this.triggerEvent('close');
      let type = "";
      if(app.globalData.leagueType == 1){
          type = "普拉提团课"
      }else{
          type = "团课"
      }
      wx.navigateTo({
        url: '/pages/appointment/appointment?course='+type
      })
    },
    personalCourse: function () {
      this.triggerEvent('close')
      wx.navigateTo({
        url: '/pages/appointment/appointment?course=私教',
      })
    },
  }
})