// components/courseList/courseList.js
Component({
  /**
   * 组件的属性列表
   */
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: { 
    course:{
      type:Object,
      value:{}
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
    handleDetail:function(){
    //  console.log()
      let course1 = JSON.stringify(this.properties.course) 
      wx.navigateTo({
        url: '/pages/personalTrainer/personalTrainer?course1='+course1,
      })
    }
  }
})
