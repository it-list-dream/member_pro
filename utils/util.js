const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}
 function compare(prop) {
  return function (a, b) {
    return Number(a[prop]) - Number(b[prop])
  }
}

const formatTime1 = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${[year, month, day].map(formatNumber).join('/')}`
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}
// 
//之后30天的日期
const days = (d) => {
  var timestamp, date;
  if (d) {
    date = new Date(d)
  } else {
    timestamp = Date.parse(new Date());
    date = new Date(timestamp);
  }

  // console.log(date)
  //获取年份  
  var Y = date.getFullYear();
  //获取月份  
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
  //获取当日日期 
  var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  var time = []
  var DD = ""
  var length = 30
  for (var i = 0; i < length; i++) {
    if (M == "01" || M == "03" || M == "05" || M == "07" || M == "08" || M == "10" || M == "12") {
      if (DD == "31" || D == "31") {
        if (M == "12") {
          M = "01"
        } else if (M == "01" || M == "03" || M == "05" || M == "08") {
          M = Number(M) + Number(1)
          M = "0" + M
        } else if (M == "07") {
          M = Number(M) + Number(1)
          M = "0" + M
        } else {
          M = Number(M) + Number(1)
        }
        DD = "01"
        D = "01 "
        length = length - i
        i = 0
        var date = M + "月" + DD + "日"
      } else {
        DD = Number(D) + Number(i)
        DD = DD < 10 ? "0" + DD : DD
        var date = M + "月" + DD + "日"
      }
    } else if (M == "04" || M == "06" || M == "09" || M == "11") {
      if (DD == "30" || D == "30") {
        M = Number(M) + Number(1)
        if (M == "05" || M == "07") {
          M = "0" + M
        }
        DD = "01"
        D = "01"
        length = length - i
        i = 0
        var date = M + "月" + DD + "日"
      } else {
        DD = Number(D) + Number(i)
        DD = DD < 10 ? "0" + DD : DD
        var date = M + "月" + DD + "日"

      }
    } else if (M == "02") {
      if (Y % 4 == 0 && Y % 100 != 0 || Y % 400 == 0) {
        if (DD == "28" || D == "28") {
          M = Number(M) + Number(1)
          M = "0" + M
          D = "01"
          DD = "01"
          length = length - i
          i = 0
          var date = M + "月" + DD + "日"
        } else {
          DD = Number(D) + Number(i)
          DD = DD < 10 ? "0" + DD : DD
          var date = M + "月" + DD + "日"
        }
      } else {
        if (DD == "29" || D == "29") {
          M = Number(M) + Number(1)
          D = "01"
          DD = "01"
          length = length - i
          i = 0
          var date = M + "月" + DD + "日"
        } else {
          DD = Number(D) + Number(i)
          DD = DD < 10 ? "0" + DD : DD
          var date = M + "月" + DD + "日"
        }
      }
    }

    time.push(date)
  }
  return time
}
const toWeek = (date) => { // 传入数据  讲一周的某一天返回成中文状态下的字符
  var today = new Date();
  var currTime = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  var nextDay = new Date(date)
  var nextTime = nextDay.getFullYear() + '-' + (nextDay.getMonth() + 1) + '-' + nextDay.getDate();
  if (currTime == nextTime) {
    return '今日'
  }
  switch (date.getDay()) {
    case 1:
      return '一';
      break;
    case 2:
      return '二';
      break;
    case 3:
      return '三';
      break;
    case 4:
      return '四';
      break;
    case 5:
      return '五';
      break;
    case 6:
      return '六';
      break;
    case 0:
      return '日';
      break;
    default:
      break;
  }
}

function toWeekDay(date) { // 传入数据  讲一周的某一天返回成中文状态下的字符
  //console.log(date)
  var today = new Date();
  var currTime = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  var nextDay = new Date(date)
  var nextTime = nextDay.getFullYear() + '-' + (nextDay.getMonth() + 1) + '-' + nextDay.getDate();
  if (currTime == nextTime) {
    return '今天'
  }
  switch (date.getDay()) {
    case 1:
      return '周一';
      break;
    case 2:
      return '周二';
      break;
    case 3:
      return '周三';
      break;
    case 4:
      return '周四';
      break;
    case 5:
      return '周五';
      break;
    case 6:
      return '周六';
      break;
    case 0:
      return '周日';
      break;
    default:
      break;
  }
  return '传入未知参数';
}
//var res = createEveryday();
function closestToCurrentTime(timeArr) {
  var timestamp = Date.now();
  var min;
  var index = 0;
  timeArr.forEach(function (item, i) {
    var itemStamp = new Date(item).getTime();
    var interVal = Math.abs(timestamp - itemStamp);
    if (min == void 0) {
      min = interVal
    } else {
      if (min > interVal) {
        min = interVal;
        index = i;
      }
    }
  })
  return index
}

function format(date, fmt) {
  let d = new Date(date)
  var o = {
    "M+": d.getMonth() + 1, //月份
    "d+": d.getDate(), //日
    "h+": d.getHours(), //小时
    "m+": d.getMinutes(), //分
    "s+": d.getSeconds(), //秒
    "q+": Math.floor((d.getMonth() + 3) / 3), //季度
    "S": d.getMilliseconds() //毫秒
  };
  //  获取年份 
  if (/(y+)/i.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
  }

  for (var k in o) {
    if (new RegExp("(" + k + ")", "i").test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
}

const Rad = d => {
  //根据经纬度判断距离
  return d * Math.PI / 180.0;
}

const getDistance = (lat1, lng1, lat2, lng2) => {
  // lat1用户的纬度    // lng1用户的经度      // lat2商家的纬度   // lng2商家的经度
  if (lat1 && lng1 && lat2 && lng2) {
    var radLat1 = Rad(lat1);
    var radLat2 = Rad(lat2);
    var a = radLat1 - radLat2;
    var b = Rad(lng1) - Rad(lng2);
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378.137;
    s = Math.round(s * 10000) / 10000;
    s = s.toFixed(1) //保留两位小数
    return s
  } else {
    return ""
  }
}
const getLocation = () => {
  return new Promise((resolve, reject) => {
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        resolve(res)
      },
      fail: function (err) {
        reject(err)
      }
    });
  })
}

const uploadImage = (url, fileUrl, imageName, formData = {}) => {
  return new Promise((resolve, reject) => {
    wx.showLoading({
      title: '图片上传中...',
    })
    wx.uploadFile({
      url: "https://user.360ruyu.cn/MobileUserV2.asmx" + url,
      filePath: fileUrl,
      name: imageName,
      formData: {
        user_token: wx.getStorageSync('token'),
        ...formData
      },
      header: {
        "Content-Type": "multipart/form-data"
      },
      success: function (res) {
        resolve(JSON.parse(res.data));
      },
      fail: function (error) {
        reject(error);
      },
      complete: function () {
        wx.hideLoading();
      }
    })
  })
}

var isNavigating = false; // 记录是否正在跳转

// 监听跳转事件
function handleNavigateTo(url) {
  var isNavigating = false; // 记录是否正在跳转
  if (!isNavigating) {
    isNavigating = true;
    wx.navigateTo({
      url: url,
      complete: function () {
        isNavigating = false; // 跳转完成后将变量置为 false
      }
    });
  }
}

module.exports = {
  formatTime: formatTime,
  formatTime1: formatTime1,
  days,
  toWeek: toWeek,
  toWeekDay: toWeekDay,
  closestToCurrentTime: closestToCurrentTime,
  format: format,
  getLocation: getLocation,
  getDistance: getDistance,
  compare:compare,
  uploadImage,
  handleNavigateTo,
}