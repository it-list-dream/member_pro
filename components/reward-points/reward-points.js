// components/reward-points/reward-points.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    rewardsList: {
      type:Array,
      value:[]
    },
    rewardType:{
      type:Number,
      value:0
    }
  },
  lifetimes:{
   attached:function(){
     //console.log(this.properties.rewardsList)
   }
  },
  pageLifetimes: {
    show: function() {
      // 页面被展示
      console.log(this.properties.rewardsList)
    },
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
    _selfRewordInte(e){
      let se_id = e.currentTarget.dataset.id;
      let price_type = e.currentTarget.dataset.prizetype
      wx.navigateTo({
        url: '/page2/integralMall/integralMall?se_id=' + se_id + '&price_type=' + price_type + '&type='+this.properties.rewardType,
      })
    }
  }
})