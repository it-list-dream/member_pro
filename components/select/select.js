Component({
  /**
   * 组件的属性列表
   */
  options: {
    addGlobalClass: true,
  },
  properties: {
    propArray: {
      type: Array,
      value: []
    },
    selectText: {
      type: String,
      value: '全部'
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    selectShow: false, //初始option不显示
    // nowText: "", //初始内容
    chooseBg: null
  },
  /**
   * 组件的方法列表
   */

  lifetimes: {

  },
  methods: {
    //option的显示与否
    selectToggle: function () {
      var nowShow = this.data.selectShow; //获取当前option显示的状态
      this.setData({
        selectShow: !nowShow
      })
    },
    //设置内容
    setText: function (e) {
      var nowData = this.properties.propArray; //当前option的数据是引入组件的页面传过来的，所以这里获取数据只有通过this.properties
      var nowIdx = e.target.dataset.index; //当前点击的索引
      var nowText = nowData[nowIdx].text; //当前点击的内容
      this.setData({
        selectShow: false,
       // nowText: nowText,
        chooseBg: nowIdx
      })
      var nowDate = {
        id: nowIdx,
        selectText: nowText
      }
      this.triggerEvent('myget', nowDate)
    }
  }
})