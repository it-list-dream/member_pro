// pages/tabbar/home/childCpns/nav.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    navTitle: {
      type: String,
      value: ''
    },
    navPath: {
      type: String,
      value: ''
    },
    content: {
      type: String,
      value: ''
    },
    show:{
      type:Boolean,
      value:true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    pathUrl: ''
  },
  lifetimes: {
    // attached: function () { 
    //  // console.log(this.properties.navPath)
    //    this.setData({
    //     pathUrl:this.properties.navPath
    //    })
    // },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    _hanldeNav() {
      //var path = this.data.pathUrl;
      var path = this.properties.navPath;
      //console.log(path)
      if (path == '') {
        return
      }
      if (path == '/pages/tabbar/integral/integral') {
        wx.switchTab({
          url: path,
        })
      } else {
        wx.navigateTo({
          url: path,
        })
      }
    }
  }
})