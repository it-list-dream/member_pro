import {
    storeBindingsBehavior
} from "mobx-miniprogram-bindings";
import {
    store
} from "../../utils/store.js";

Component({
  /**
   * 组件的属性列表
   */
  options: {
    addGlobalClass: true,
    multipleSlots: true,
    styleIsolation: 'isolated'
  },
  externalClasses: ['custom-class'],
  properties: {
    showCart:{
       type:Boolean,
       value:true
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
     payMoney(){
        wx.navigateTo({
          url: '/restaurant/pages/settlement/settlement',
        })
     },
     isShowCart(){
        this.triggerEvent('cartShow')
     }
  }
})
