const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}
// 
//之后30天的日期
const days = (d) => {
  var timestamp,date;
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
function createEveryday() {
  var arr = ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00",
      "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
      "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00",
      "22:30", "23:00"
  ];
  var starttime, endtime, index, sort = 0;
  var str = '',
      start = '',
      end = '';
  var dateArr = [];
  for (var i = 0; i < arr.length; i++) {
      str = arr[i];
      start = str.substring(0, 2);
      end = str.substr(str.length - 2, 2)
      starttime = arr[i];
      if (parseInt(start) < 9) {
          endtime = '0' + (parseInt(start) + 1) + ':' + end;
      } else {
          endtime = parseInt(start) + 1 + ':' + end;
      }
      if (parseInt(end) == 0) {
          index = parseInt(start);
      } else {
          index = parseInt(start) + 0.5
      }
      sort = index - 5;
      dateArr.push({
          starttime: starttime,
          endtime: endtime,
          index: index,
          sort: sort,
          type: 1,
      })
  }
  return dateArr
}
//var res = createEveryday();
module.exports = {
  formatTime,
  days,
  createEveryday
}