//app.js
App({
  onLaunch: function () {
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(function (res) {
        if (res.hasUpdate) {
          updateManager.onUpdateReady(function () {
            wx.showModal({
              title: '更新提示',
              content: '新版本已经准备好，是否重启应用？',
              success: function (res) {
                if (res.confirm) {
                  updateManager.applyUpdate()
                }
              }
            })
          })
          updateManager.onUpdateFailed(function () {
            wx.showModal({
              title: '已经有新版本了哟~',
              content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
            })
          })
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
    // 登录
    // wx.login({
    //   success: res => {
    //     if (res.code) {
    //       // 登录接口地址
    //       wx.request({
    //         url: 'https://activity.vinistyle.cn/tool/user/login',
    //         data: {
    //           code: res.code
    //         },
    //         method: 'POST',
    //         header: {
    //           "content-type": "application/x-www-form-urlencoded"
    //         },
    //         success: function (res) {
    //           // 本地储存登录后数据
    //           wx.setStorageSync('user_info', res.data.data)
    //           // 如果未注册跳转到注册页
    //           if (res.data.data.status!=1) {
    //             wx.redirectTo({
    //               url: '../register/register',
    //             })
    //           }
    //         }
    //       })
    //     }
    //   }
    // })


    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  },
  globalData: {
    // address:"http://activity.vn.com/",//测试地址
    address: "https://activity.vinistyle.cn/",//线上地址
    userInfo: null,
  }
})