Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: Object,
    linkUrl: String,
    leagueType: {
      type: Number,
      value: 0
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
    //预约团课
    orderTogther: function (e) {
      let tcalss = e.currentTarget.dataset.togther
      let phone = wx.getStorageSync('phone');
      console.log(this.properties.linkUrl)
      if (phone && phone !== '') {
        wx.navigateTo({
          url: this.properties.linkUrl + '?tclass=' + JSON.stringify(tcalss),
        })
      } else {
        wx.navigateTo({
          url: '/page2/login/login',
        })
      }
    },
  }
})