// components/body-item/body-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    isShow:true,
    analyzeList:[
      {},
      {},
      {}
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showBody(){
      //console.log(111)
       this.setData({
        isShow:!this.data.isShow
       })
    }
  }
})
