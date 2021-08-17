Component({
  /**
   * 组件的属性列表
   */
  properties: {
    actionIntegral: {
      type: Number,
      value: 0
    },
    vipIntegral: {
      type: Number,
      value: 0
    },
    isDlog:{
      type:Boolean,
      value:false
    }
  },
  /**
   * 组件的初始数据
   */
  data: {

  }, 
  /**
   * 组件的方法列表
   */
  methods: {
    //积分查询
    pointsBill: function () {
     // console.log(this.properties.vipIntegral,this.properties.actionIntegral)
      let phone = wx.getStorageSync('phone')
      if (phone && phone !== '') {
        wx.navigateTo({
          url: '/page2/myIntegral/myIntegral?vipIntegral=' + this.properties.vipIntegral + '&actionIntegral=' + this.properties.actionIntegral,
        })
      }else{
        wx.navigateTo({
          url: '/page2/login/login',
        })
      }
    },
    //积分赛选
    filtrateData: function () {
      //console.log('弹窗');
      this.triggerEvent('popup');
    }
  }
})