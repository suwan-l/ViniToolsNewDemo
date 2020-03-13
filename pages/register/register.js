const api = require('../../utils/api.js');
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    tipsHidden: true, //提示获取头像、名称 
    avatarUrl: "", //微信头像
    nickName: "", //微信名
    phoneHidden: true, //提示获取手机号
    mobile: '', // 手机号

    code: '', // code
    userinfo: '', // 用户信息
    phoneinfo: '', // 手机信息
  },

  onLoad: function() {
    var that = this;
    // wx.login获取code
    wx.login({
      success: res => {
        that.setData({
          code: res.code
        })
      }
    });
  },

  //点击自动授权获取个人信息
  bindGetUserInfo: function(e) {
    var that = this;
    wx.getUserInfo({
      withCredentials: true,
      success: function(res_user) {
        console.log("个人信息", res_user.userInfo)
        that.setData({
          userinfo: res_user,
          avatarUrl: res_user.userInfo.avatarUrl,
          nickName: res_user.userInfo.nickName,
          tipsHidden: false
        })
      },
      fail: function() {
        //用户按了拒绝按钮
        wx.showModal({
          title: '警告',
          content: '您点击了拒绝授权，将无法获取到测肤报告，请授权之后再获取!!!',
          showCancel: false,
          confirmText: '返回授权',
          success: function(res) {
            // 用户没有授权成功，不需要改变 isHide 的值
            if (res.confirm) {
              console.log('用户点击了“返回授权”');
            }
          }
        });
      },
      complete: function(res) {}
    })
  },

  // 获取手机号
  getPhoneNumber: function(e) {
    var that = this;
    console.log("手机号信息++", e.detail)
    if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '未授权',
        success: function(res) {}
      })
    } else {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '同意授权',
        success: function(res) {
          that.setData({
            phoneinfo: e.detail,
          })
          // 手机号接口地址
          api.MobileDecrypt({
            // data
            code: that.data.code,
            encrypted_data: e.detail.encryptedData,
            iv: e.detail.iv,
          }).then(res => {
            console.log("获取手机号", res)
            if (res.code === 0) {
              that.setData({
                mobile: res.data.mobile,
                phoneHidden: false
              })
            } else {
              wx.showToast({
                title: res.msg,
              })
            }
          }).catch(err => {
            // 处理出错情况
            console.log(err)
          });
        }
      })
    }
  },

  // 点击注册
  registerBtn: function(e) {
    wx.login({
      success: res => {
        console.log("注册code", res.code);
        if (res.code) {
          // 注册接口地址
          api.Register({
            // data
            code: res.code,
            info_data: this.data.userinfo.encryptedData,
            info_iv: this.data.userinfo.iv,
            mobile_data: this.data.phoneinfo.encryptedData,
            mobile_iv: this.data.phoneinfo.iv,
          }).then(res => {
            console.log("注册", res)
            if (res.code == 0) {
              wx.redirectTo({
                url: '../index/index'
              })
              wx.setStorageSync('reg_code', res.code)
            } else {
              wx.showToast({
                title: res.msg,
                duration: 1000,
                mask: true
              })
            }
          }).catch(err => {
            // 处理出错情况
            console.log(err)
          });
        }
      }
    });
  },
})