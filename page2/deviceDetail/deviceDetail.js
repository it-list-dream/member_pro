var app = getApp()
var api = require('../../utils/request.js')
let tranfromBodyList = [{
    key: 'weight',
    value: '体重',
    monad: 'kg'
  },
  {
    key: 'fat',
    value: '脂肪量',
    monad: 'kg'
  },
  {
    key: 'ffm',
    value: '去脂体重',
    monad: 'kg'
  },
  {
    key: 'mineral',
    value: '无机盐',
    monad: 'kg'
  },
  {
    key: 'muscle',
    value: '肌肉量',
    monad: 'kg'
  },
  {
    key: 'protein',
    value: '蛋白质',
    monad: 'kg'
  },
  {
    key: 'tbw',
    value: '身体总水分',
    monad: 'kg'
  },
  {
    key: 'segmental_muscle',
    value: '节段肌肉量'
  },
  {
    key: 'segmental_fat',
    value: '节段脂肪量'
  },
  {
    key: 'whfr',
    value: '腰臀脂肪比',
    monad: '%'
  },
  {
    key: 'pbf',
    value: '体脂率',
    monad: '%'
  },
  {
    key: 'smm',
    value: '骨骼肌',
    monad: 'kg'
  },
  {
    key: 'vfi',
    value: '内脏脂肪指数'
  },
  {
    key: 'strong_index',
    value: '健壮指数'
  },
  {
    key: 'bmr',
    value: '基础代谢',
    monad: 'kcal'
  },
  {
    key: 'tee',
    value: '总能量消耗',
    monad: 'kcal'
  },
  {
    key: 'bmi',
    value: '身体质量指数'
  },
  {
    key: 'body_age_offset',
    value: '身体年龄偏移量'
  },
  {
    key: 'figure',
    value: '体型评估'
  },
  {
    key: 'evaluation',
    value: '风险评估'
  },
  {
    key: 'fat_control',
    value: '体脂肪调节量',
    monad: 'kg'
  },
  {
    key: 'muscle_control',
    value: '肌肉调节量',
    monad: 'kg'
  },
  {
    key: 'calcium',
    value: '钙质',
    monad: 'kg'
  },
  {
    key: 'body_score',
    value: '身体评估总分'
  },
  {
    key: 'score',
    value: '综合评估'
  }
];
let compositions = [{
    key: 'weight',
    value: '体重',
    monad: 'kg'
  },
  {
    key: 'fat',
    value: '脂肪量',
    monad: 'kg'
  },
  {
    key: 'protein',
    value: '蛋白质',
    monad: 'kg'
  },
  {
    key: 'tbw',
    value: '身体总水分',
    monad: 'kg'
  },
  {
    key: 'smm',
    value: '骨骼肌',
    monad: 'kg'
  }
]
let fitness = [{
    key: 'bmi',
    value: '身体质量指数',
    hasAssess: true,

  },
  {
    key: 'pbf',
    value: '体脂率',
    hasAssess: true,
    monad: '%'
  },
  {
    key: 'whfr',
    value: '腰臀脂肪比',
    hasAssess: true,
  },
  {
    key: 'bmr',
    value: '基础代谢',
    hasAssess: true,
    monad: 'kcal'
  },
  {
    key: 'evaluation',
    value: '风险评估',
    hasAssess: false
  },
  {
    key: 'fat_control',
    value: '体脂肪调节量',
    hasAssess: false,
    monad: 'kg'
  }
];
let list = [{
    key: 'Weight',
    value: '体重',
    monad: 'kg'
  }, {
    key: 'Fat',
    value: '脂肪量',
    monad: 'kg'
  },
  {
    key: 'SMM',
    value: '骨骼肌',
    monad: 'kg'
  },
  {
    key: 'Protein',
    value: '蛋白质',
    monad: 'kg'
  },
  {
    key: 'Water',
    value: '身体水分',
    monad: 'kg'
  },
  {
    key: 'BMI',
    value: 'BMI',
    monad: ''
  }, {
    key: 'PBF',
    value: '体脂率',
    monad: '%'
  }, {
    key: "Muscle",
    value: "肌肉量",
    monad: "kg"
  },
  {
    key: "WHR",
    value: "腰臀比",
    monad: ""
  },
  {
    key: "BMR",
    value: "基础代谢",
    monad: "kcal"
  },
  {
    key: "LiverRisk",
    value: "脂肪肝风险系数",
    monad: ""
  }
]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    normShow: false,
    bodyShow: false,
    fatShow: false,
    //警示指标
    cautionList: [],
    //身体成分分析
    bodyCompositionList: [],
    //肥胖分析
    fatList: [],
    segmental_muscle: null,
    segmental_fat: null,
    //动画
    animationData: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let sbody = JSON.parse(options.body)
    this.setData({
      navHeight: app.globalData.navHeight,
      navTop: app.globalData.navTop,
      sbody: sbody
    })
    this.getMyBodyTestListById();
  },
  hidenNorm: function () {
    // this.setData({
    //   normShow: !this.data.normShow
    // })
    this.showAnimation('normShow', !this.data.normShow)
  },
  hidenBody: function () {
    // this.setData({
    //   bodyShow: !this.data.bodyShow
    // })
    this.showAnimation('bodyShow', !this.data.bodyShow)
  },
  hidenFat: function () {
    // this.setData({
    //   fatShow: !this.data.fatShow
    // })
    this.showAnimation('fatShow', !this.data.fatShow)
  },
  //体侧
  getMyBodyTestListById() {
    var that = this;
    api.request({
      url: "/MyBodyTestListById",
      data: {
        user_token: wx.getStorageSync('token'),
        rb_Id: that.data.sbody.BR_ID
      }
    }).then(res => {
      if (res.data.deviceType == "清华同方") {
        let testPhysical = res.data.data[0],
          cautionList2 = [],
          compositionList = [],
          fatList2 = [];
        for (let i = 0; i < list.length; i++) {
          for (var item in testPhysical) {
            // key, value, min, max, monad
            if (list[i].key == item) {
              compositionList
                .push(this.compareAandB(list[i].value, testPhysical[list[i].key], testPhysical[list[i].key + 'Min'], testPhysical[list[i].key + 'Max'], list[i].monad));
            }
          }
        }
        cautionList2 = compositionList.filter(item => item.body_health && item.body_health !== "正常");
        let exmpleList2 = ["BMI", "体脂率", "腰臀比", "基础代谢", "脂肪肝风险系数"];
        for (let j = 0; j < exmpleList2.length; j++) {
          for (let k = 0; k < compositionList.length; k++) {
            if (exmpleList2[j] == compositionList[k].key) {
              fatList2.push(compositionList[k])
            }
          }
        }
        let segmental_fat2 = {},
          segmental_muscle2 = {};
        segmental_fat2.LA_fat = res.data.data[0]['LA_fat'];
        segmental_fat2.RA_fat = res.data.data[0]['RA_fat'];
        segmental_fat2.LL_fat = res.data.data[0]['LL_fat'];
        segmental_fat2.RL_fat = res.data.data[0]['RL_fat'];
        segmental_fat2.TR_fat = res.data.data[0]['TR_fat'];
        segmental_muscle2.LA_muscle = res.data.data[0]['LA_muscle'];
        segmental_muscle2.RA_muscle = res.data.data[0]['RA_muscle'];
        segmental_muscle2.LL_muscle = res.data.data[0]['LL_muscle'];
        segmental_muscle2.RL_muscle = res.data.data[0]['RL_muscle'];
        segmental_muscle2.TR_muscle = res.data.data[0]['TR_muscle'];
        this.setData({
          cautionList2,
          compositionList,
          fatList2,
          segmental_fat2,
          segmental_muscle2
        })
      } else {
        let caution = this.data.cautionList;
        let bodyComposition = this.data.bodyCompositionList;
        let fat = this.data.fatList;
        //警示指标
        let map1 = new Map();
        let physicalMap = new Map();
        let composition = res.data.data.composition;
        for (var o in composition) {
          for (var o1 in composition[o]) {
            if (o1 == 'grade' && composition[o][o1] == 3) {
              map1.set(o, composition[o]);
            }
          }
        }
        map1.forEach((value, key) => {
          for (var i = 0; i < tranfromBodyList.length; i++) {
            if (key == tranfromBodyList[i].key) {
              caution.push({
                body_key: tranfromBodyList[i].value,
                body_value: value,
                monad: tranfromBodyList[i].monad
              })
            }
          }
        })
        //身体成分分析
        for (var b in composition) {
          for (var b1 in composition[b]) {
            physicalMap.set(b, composition[b])
          }
        }
        //console.log('身体成分', physicalMap)
        physicalMap.forEach((value, key) => {
          for (let j = 0; j < compositions.length; j++) {
            if (key == compositions[j].key) {
              if (value.grade == 1) {
                bodyComposition.push({
                  body_key: compositions[j].value,
                  body_value: value,
                  body_health: '偏低',
                  health_color: '#EC7B87',
                  monad: compositions[j].monad
                })
              } else if (value.grade == 2) {
                bodyComposition.push({
                  body_key: compositions[j].value,
                  body_value: value,
                  body_health: '正常',
                  health_color: '#F4C06D',
                  monad: compositions[j].monad
                })
              } else if (value.grade == 3) {
                bodyComposition.push({
                  body_key: compositions[j].value,
                  body_value: value,
                  body_health: '偏高',
                  health_color: '#60CAB7',
                  monad: compositions[j].monad
                })
              }
            }
          }
        })
        //肥胖分析
        physicalMap.forEach((value, key) => {
          for (let k = 0; k < fitness.length; k++) {
            if (key == fitness[k].key) {
              if (value.grade == 1 && fitness[k].hasAssess) {
                fat.push({
                  body_key: fitness[k].value,
                  body_value: value,
                  body_health: '偏低',
                  health_color: '#EC7B87',
                  hasNeed: true,
                  monad: fitness[k].monad
                })
              } else if (value.grade == 2 && fitness[k].hasAssess) {
                fat.push({
                  body_key: fitness[k].value,
                  body_value: value,
                  body_health: '正常',
                  health_color: '#F4C06D',
                  hasNeed: true,
                  monad: fitness[k].monad
                })
              } else if (value.grade == 3 && fitness[k].hasAssess) {
                fat.push({
                  body_key: fitness[k].value,
                  body_value: value,
                  body_health: '偏高',
                  health_color: '#60CAB7',
                  hasNeed: true,
                  monad: fitness[k].monad
                })
              } else {
                fat.push({
                  body_key: fitness[k].value,
                  body_value: value,
                  health_color: '#60CAB7',
                  hasNeed: false,
                  monad: fitness[k].monad
                })
              }
            }
          }
        })
        //console.log('fat',fat)
        that.setData({
          cautionList: caution.slice(0, 6),
          bodyCompositionList: bodyComposition,
          fatList: fat,
          segmental_muscle: physicalMap.get('segmental_muscle'),
          segmental_fat: physicalMap.get('segmental_fat')
        })
      }
      this.setData({
        deviceType: res.data.deviceType
      })
    })
  },
  compareAandB(key, value, min, max, monad) {
    var obj = {};
    obj.key = key;
    obj.value = value;
    obj.monad = monad;
    obj.min = min;
    obj.max = max;
    if (key == '脂肪肝风险系数') {
      if (value < 5) {
        obj.body_health = "正常";
        obj.health_color = "#FF9A11";
      } else if (value >= 5 && value <= 10) {
        obj.body_health = "轻度";
        obj.health_color = "#FF384C";
      } else if (value > 10 && value <= 25) {
        obj.body_health = "中度";
        obj.health_color = "#FF384C";
      } else {
        obj.body_health = "重度";
        obj.health_color = "red";
      }
    }
    if (min == "" && max == "") {
      obj.health_color = "";
      obj.body_health = "";
    } else if (Number(value) < Number(min)) {
      obj.health_color = "#0AE399";
      obj.body_health = "偏低";
    } else if (Number(value) >= Number(min) && Number(value) <= Number(max)) {
      obj.health_color = "#FF9A11";
      obj.body_health = "正常";
    } else if (Number(value) > Number(max)) {
      obj.health_color = "#FF384C";
      obj.body_health = "偏高";
    }
    return obj;
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    if (wx.getStorageSync('userInfo')) {
      this.setData({
        userInfo: JSON.parse(wx.getStorageSync('userInfo'))
      })
    }
  },
  //显示动画效果
  showAnimation: function (ele, bool) {
    //创建一个动画实例animation。调用实例的方法来描述动画。
    var animation = wx.createAnimation({
      duration: 500, //动画持续时间500ms
      timingFunction: "ease", //动画以低速开始，然后加快，在结束前变慢
      delay: 0 //动画延迟时间0ms
    })
    this.animation = animation;
    animation.translateY(500).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        [ele]: bool
      })
    }.bind(this), 200)
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

  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // }
})