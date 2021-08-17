// components/my-capsule/my-capsule.js
import {
  checkLogin
} from '../../utils/authorities.js'
Component({
  /**
   * 组件的属性列表
   */
  externalClasses: ['my-class'],
  properties: {

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
    qrCode(){
      checkLogin('/page2/memberCode/memberCode')
    }
  }
})
