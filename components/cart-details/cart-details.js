// components/cart-details/cart-details.js
Component({
  /**
   * 组件的属性列表
   */
  options: {
    addGlobalClass: true,
    multipleSlots: true,
    styleIsolation: 'isolated'
  },
  properties: {
    show: {
      type: Boolean,
      value: false
    },
    list: {
      type: Array,
      value: () => ([])
    },
    isTabbar:{
      type:{
        type:Boolean,
        value:false
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    cartCounts: 1,
    safeArea: 0
  },
  lifetimes: {
    attached() {
      const systemInfo = wx.getSystemInfoSync();
      var safeArea = systemInfo.screenHeight - systemInfo.safeArea.bottom;
      this.setData({
        safeArea
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    cartCountChange(e) {
      let operation = e.currentTarget.dataset.operation;
      let goodsNumber = this.data.cartCounts;
      if (operation == '-') {
        if (goodsNumber == 1) {
          //找到该数组删除该商品
          return;
        }
        goodsNumber--;
      } else {
        goodsNumber++;
      }
      this.setData({
        cartCounts: goodsNumber
      })
    }
  }
})