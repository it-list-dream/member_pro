const toWeekDay = (weekDay)=> { // 传入数据  讲一周的某一天返回成中文状态下的字符
  switch (weekDay) {
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
// 得到日期前几天的数据
const getNextDate  =  function getNextDate(date, day) {
  var dd = new Date(date);
  dd.setDate(dd.getDate() + day);
  var y = dd.getFullYear();
  var m = dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
  var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
  return m + "-" + d;
};
// 判断时间是不是在一个区间内
 const timeIsinarea =   function isTimes(newdate, startdate, enddate) {
  var newdate = new Date(newdate);
  var startdate = new Date(startdate);
  var enddate = new Date(enddate);
  var a = newdate.getTime() - startdate.getTime();
  var b = newdate.getTime() - enddate.getTime();
  if (a < 0 || b > 0) {
    return false;
  } else {
    return true;
  }
}
module.exports = {
  toWeekDay,
  getNextDate,
  timeIsinarea
}