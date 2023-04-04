const app = getApp();
let api = require('../../utils/request.js');
const util = require('../../utils/util');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    stars: [0, 1, 2, 3, 4],
    score: 3,
    isbuy: false,
    coursePackges: null,
    ispoupon:false,
    GroupClassList:[],
    groupIndex:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var tclass = JSON.parse(options.tclass)
   // tclass.ClassEndTime = util.format(tclass.ClassEndTime, "yyyy-mm-dd hh:ss");
     tclass.ClassStartTime = util.format(tclass.ClassStartTime, 'yyyy-mm-dd hh:ss');
    //tclass.DeadlineTime = util.format(tclass.DeadlineTime, 'yyyy-mm-dd hh:ss');
    tclass.DeadlineTime = tclass.DeadlineTime.slice(0,tclass.DeadlineTime.length - 3)
    if(tclass.IsRegister == 1){
      tclass.RegisterTime = util.format(tclass.RegisterTime,'yyyy-mm-dd hh:ss');
    }
    this.setData({
      navHeight: app.globalData.navHeight,
      navTop: app.globalData.navTop,
      tclass
    });
    this.getLeagueById(tclass.SG_ID);
  },
  //获取用户的课程包
  getLeagueById(sg_id) {
    api.request({
      url: "/UserOrderGroupClassBySG_ID",
      data: {
        user_token: wx.getStorageSync('token'),
        UI_ID: wx.getStorageSync('UI_ID') || -1,
        GB_ID: wx.getStorageSync('GB_ID'),
        sg_id: sg_id
      }
    }).then(res => {
      let flag = res.data.data.length > 0 ? true : false;
      let list = res.data.data;
      list.forEach(item=>{
        item.GO_ActiveStart = util.format(item.GO_ActiveStart,'yyyy-mm-dd');
        item.GO_ActiveEnd = util.format(item.GO_ActiveEnd,'yyyy-mm-dd')
      });

      if (res.data.data.length == 1) {
        this.go_id = res.data.data[0].GO_ID;
      }
      
      this.setData({
        isbuy: flag,
        GroupClassList:list
      });
    })
  },
  //预约接口
  getLeagueRegister(go_id, gl_id) {
    //console.log(go_id,gl_id);
    var that = this;
    wx.showModal({
      title: '',
      content: '是否预约？',
      success(res) {
        if (res.confirm) {
          api.request({
            url: "/GroupClassRegisterUser",
            data: {
              user_token: wx.getStorageSync('token'),
              UI_ID: wx.getStorageSync('UI_ID') || -1,
              GB_ID: wx.getStorageSync('GB_ID'),
              go_id: go_id,
              gl_id: gl_id
            }
          }).then(res => {
            if (res.data.code == 1) {
              wx.redirectTo({
                url: '/page2/suceess/suceess?isShow=0',
              })
            } else {
              wx.showToast({
                title: res.data.msg,
                icon:"none"
              })
            }
          })
        } else if (res.cancel) {}
      },
      complete(){
        that.setData({
          ispoupon:false
        })
      }
    })
  },
  close(){
    this.setData({
      ispoupon:false
    })
  },
  modeChange(e) {
    this.setData({
      modeIndex: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  payOrAppoinment(e) {
    let isbuy = e.currentTarget.dataset.isbuy;
    console.log(isbuy)
    if (!isbuy) {
      //跳转到列表页面
      wx.redirectTo({
        url: '/pages/leagueDetail/leagueDetail?league='+ JSON.stringify(this.data.tclass),
      })
      // wx.redirectTo({
      //   url: 'pages/leagueList/leagueList',
      // });
    } else {
      //预约
      if(this.data.tclass.IsRegisterUser == 1){
         wx.showToast({
           icon:"none",
           title: '你已预约该课程',
         });
      }else{
        //给出一个弹窗
        var gList = this.data.GroupClassList;
        if(gList.length>1){
           this.setData({
             ispoupon:true
           });
        }else{
          this.getLeagueRegister(this.go_id, this.data.tclass.GL_ID);
        }
      }
    }
  },
  selectGroup(event){
     var gi_id = event.currentTarget.dataset.id;
     console.log(gi_id)
     this.getLeagueRegister(gi_id, this.data.tclass.GL_ID);
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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