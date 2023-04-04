// components/tabs/tabs.js
Component({
  /**
   * 组件的属性列表
   */
  // externalClasses: ['f-class'],
  properties: {                                        
    tabList: Object,
    tabIndex: {
      type: Number,
      value: 0
    },
    color: {
      type: String,
      value: '#9999'
    },
    activeColor: {
      type: String,
      value: '#222222'
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
    tabsChange(e) {
      const {
        index
      } = e.currentTarget.dataset;
      this.triggerEvent("tabsChange", {
        index
      })
    }
  }
})