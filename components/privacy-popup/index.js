Component({
  data: {
    innerShow: false,
  },
  lifetimes: {
    attached: function () {
      if (wx.getPrivacySetting) {
        wx.getPrivacySetting({
          success: res => {
            console.log("是否需要授权：", res.needAuthorization, "隐私协议的名称为：", res.privacyContractName)
            if (res.needAuthorization) {
              this.popUp()
            } else {
              this.triggerEvent("agree")
            }
          },
          fail: () => {},
          complete: () => {},
        })
      } else {
        console.log('版本过低....')
        // 低版本基础库不支持 wx.getPrivacySetting 接口，隐私接口可以直接调用
        this.triggerEvent("agree")
      }
    },
  },
  methods: {
    handleDisagree(e) {
      this.triggerEvent("disagree")
      this.disPopUp()
    },
    handleAgree(e) {
      console.log(1111)
      this.triggerEvent("agree")
      this.disPopUp()
    },
    popUp() {
      this.setData({
        innerShow: true
      })
    },
    disPopUp() {
      this.setData({
        innerShow: false
      })
    },
    openPrivacyContract() {
      wx.openPrivacyContract({
        success: res => {
          console.log('openPrivacyContract success')
        },
        fail: res => {
          console.error('openPrivacyContract fail', res)
        }
      })
    }
  }
})