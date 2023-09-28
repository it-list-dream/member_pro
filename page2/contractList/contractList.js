const app = getApp();
const api = require('../../utils/request.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    selected: 0,
    tabList: ['会员卡', '私教课'],
    memberCard: [],
    personalTrain: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      navHeight: app.globalData.navHeight,
      navTop: app.globalData.navTop
    });
    this.getUserCardList();
    this.getPersonalTrainList();
  },
  handleTabs(event) {
    var index = event.currentTarget.dataset.index;
    if (index == this.data.selected) return;
    this.setData({
      selected: index
    });
  },
  getUserCardList() {
    api.request({
      url: "/MyContractListByUserCard",
      data: {
        user_token: wx.getStorageSync('token'),
        UI_ID: wx.getStorageSync('UI_ID') || -1
      }
    }).then(res => {
      if (res.data.code == 1) {
        this.setData({
          memberCard: res.data.data
        })
      }
    })
  },
  getPersonalTrainList() {
    api.request({
      url: "/MyContractListByUserCardCoach",
      data: {
        user_token: wx.getStorageSync('token'),
        UI_ID: wx.getStorageSync('UI_ID') || -1
      }
    }).then(res => {
      if (res.data.code == 1) {
        this.setData({
          personalTrain: res.data.data
        })
      }
    })
  },
  //预览
  previewContract(event) {
    var contract = event.currentTarget.dataset.contract,
      conType = event.currentTarget.dataset.type,
      that = this;
    if (contract.eSignStatus == '已签署') {
      wx.request({
        url: 'https://user.360ruyu.cn/eSignCore.asmx/eSignFileDownloadRrlByuuid',
        data: {
          uuid: contract.UUID,
          key: "BD687B66ECDBED4E12C4320B0ABB3BB111"
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        timeout: 10000,
        success(res) {
          if (res.data.code != 0) {
            wx.showToast({
              title: res.data.msg || res.data.message,
              icon: "none"
            });
          } else {
            wx.showLoading({
              title: '加载中...',
              mask: true
            });
            wx.downloadFile({
              // 示例 url，并非真实存在
              url: res.data.url,
              success: function (res) {
                const filePath = res.tempFilePath;
                wx.openDocument({
                  filePath: filePath,
                  success: function (res) {},
                  complete: function () {
                    wx.hideLoading();
                  }
                })
              },
              fail: function (error) {
                console.log(error)
              }
            })
          }
        }
      })
    } else if (contract.eSignStatus == '未签署' || contract.eSignStatus == '签署中') {
      var jsonStr = JSON.stringify({
        sign: contract.sign,
        gymid: contract.gymid,
        AdminID: contract.AdminID,
        uuid: contract.UUID,
        up_id: contract.PayMoneyID,
        userId: contract.userId,
        eSignType: contract.eSignType
      });
      wx.request({
        url: 'https://user.360ruyu.cn/GymManage.asmx/eSginUserPayContract',
        method: "POST",
        data: {
          json: jsonStr,
          key: "D3069A3F7C5E262F83ACEE108C4F309D"
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success(res) {
          if (res.data.code == 1) {
            wx.redirectTo({
              url: '/page2/authorize/authorize?sign=' + res.data.data[0].signMd5 + '&type=' + conType,
            });
          }
        }
      })
    }
  },
  // goContractDetail(e){
  //   // let payMoneyId = e.currentTarget.dataset.contract.PayMoneyID,
  //   // signDate = e.currentTarget.dataset.contract.Createdate,
  //   // signWriteUrl = e.currentTarget.dataset.contract.Signurl;
  //   const {PayMoneyID:payMoneyId,Createdate:signDate,Signurl:signWriteUrl,SC_ID:isSigning} = e.currentTarget.dataset.contract;
  //   //合同id
  //   if(payMoneyId){
  //     app.globalData.PayMoneyID = payMoneyId;
  //     app.globalData.isSigning = isSigning;
  //     wx.navigateTo({
  //       url: `/page2/contractDetail/contractDetail?signDate=${signDate}&signWriteUrl=${signWriteUrl}`,
  //     });
  //   }
  // },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getUserCardList();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  }
})