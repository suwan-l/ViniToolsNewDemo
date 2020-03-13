//登录授权
import config from './config.js';

//登录
function login (){
  // 返回一个Promise实例对象
  return new Promise((resolve, reject) => {
    if (wx.getStorageSync('user_login')) {
      resolve('已在登录中');
      return
    } else {
      wx.setStorageSync('user_login', true);
    }

    wx.login({
      success: res => {
        if (res.code) {
          wx.showLoading({ title: '登陆中...', icon: 'none', mask: true });
          // 登录接口地址
          wx.request({
            url: config.baseUrl + 'tool/user/login',
            data: {
              code: res.code,
            },
            method: 'POST',
            header: {
              "content-type": "application/x-www-form-urlencoded"
            },
            success: res => {
              console.log("登录信息",res)
              wx.hideLoading();
              resolve(res)
              wx.setStorageSync('user_login', false);
              // 如果未注册跳转到注册页
              if (res.data.data.status!=1) {
                wx.redirectTo({
                  url: '../register/register',
                })
                return;
              }
              wx.setStorageSync('user_info', res.data.data)
              if (getCurrentPages().length != 0) {
                //刷新当前页面的数据
                getCurrentPages()[getCurrentPages().length - 1].onLoad()
              }
              else{
                wx.redirectTo({
                  url: '../index/index',
                })   
              }
              // console.log("登录身份+++",res.data.data.info.role)
              // wx.setStorageSync('role', res.data.data.info.role)    
            }
          })
        }
      }
    })
  })
}
module.exports = {
  login: login,
}