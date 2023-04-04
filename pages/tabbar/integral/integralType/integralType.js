const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isDlog: {
      type: Boolean,
      value: false
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    inteTypeList: [{
      id: 1,
      inteName: '自律奖励',
      checked: false
    }, {
      id: 2,
      inteName: 'VIP奖励',
      checked: false
    }],
    searchValue: '',
    values:[]
  },
  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
      this.setData({
        navHeight:app.globalData.navHeight
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    _serviceValChange(e) {
      console.log(e.detail.value)
      var values = e.detail.value;
      this.setData({
        values
      })
    },
    handleInput(e) {
      this.setData({
        searchValue: e.detail.value
      })
    },
    reset() {
      var inteList = this.data.inteTypeList;
      //清空
      for (var j = 0; j < inteList.length; j++) {
        inteList[j].checked = false
      }
      this.setData({
        searchValue: '',
        inteTypeList: inteList,
        values:[]
      })
    },
    confirm() {
      var serach = {
        type: this.data.values,
        scrores: this.data.searchValue
      }
      this.reset();
      this.triggerEvent('confirm', serach)
    },
    close() {
      this.reset()
      this.triggerEvent('close')
    },
    checkbox(e) {
      var index = e.currentTarget.dataset.index; //获取当前点击的下标
      var checkboxArr = this.data.inteTypeList; //选项集合
      checkboxArr[index].checked = !checkboxArr[index].checked; //改变当前选中的checked值
      this.setData({
        inteTypeList: checkboxArr
      });
    }
  }
})