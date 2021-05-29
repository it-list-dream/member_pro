// components/tabbar/tabbar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    selected: {
      type: Number,
      value: 0
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    color: "#C0BEC9",
    selectedColor: "#52495B",
    borderStyle: "white",
    list: [{
        "pagePath": "/pages/tabbar/home/home",
        "text": "首页",
        "iconPath": "/static/tabbar/home.png",
        "selectedIconPath": "/static/tabbar/home-h.png"
      },
      {
        "pagePath": "/pages/tabbar/sport/sport",
        "text": "运动",
        "iconPath": "/static/tabbar/sport.png",
        "selectedIconPath": "/static/tabbar/sport-h.png"
      },
      {
        "pagePath": "/pages/tabbar/integral/integral",
        "text": "积分",
        "iconPath": "/static/tabbar/integral.png",
        "selectedIconPath": "/static/tabbar/integral-h.png"
      },
      {
        "pagePath": "/pages/tabbar/my/my",
        "text": "我的",
        "iconPath": "/static/tabbar/my.png",
        "selectedIconPath": "/static/tabbar/my-h.png"
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset;
      const url = data.path;
      const phone = wx.getStorageSync('phone');
      if (url === '/pages/tabbar/sport/sport' && !phone && phone == '') {
        wx.navigateTo({
          url: '/page2/login/login' //可以带参数，在登录页面接收
        })
        return;
      }
      wx.switchTab({
        url
      })
    }
  }
})