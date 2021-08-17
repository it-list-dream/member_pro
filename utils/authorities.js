export const checkLogin = pageUrl => {
  let phone = wx.getStorageSync('phone')
  if (phone && phone !== '') {
    wx.navigateTo({
      url: pageUrl,
    })
  } else {
    wx.navigateTo({
      url: '/page2/login/login',
    })
  }
}