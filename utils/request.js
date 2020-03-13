//http网络请求封装
import auth from './auth.js';

/**
 * 网络请求
 */
function request(url, data = {}, method = "GET", needToken = false, config = {}) {
  let showToast = true,
    showLoading = true,
    loadingTitle = "加载中...";
  // 默认显示toast
  if (config['showToast'] != undefined && config['showToast'] == false) {
    showToast = false;
  }
  // 默认显示loading
  if (config['showLoading'] != undefined && config['showLoading'] == false) {
    showLoading = false;
  }
  if (config['loadingTitle']) {
    loadingTitle = config['loadingTitle'];
  }

  return new Promise((resolve, reject) => {
    // header
    let _header = {
      "content-type": "application/x-www-form-urlencoded"
    };
    let user_info = wx.getStorageSync("user_info");
    let token = user_info.token;
    if (!token) {
      if (needToken){
        auth.login();
        reject('未登录')
        return;
      }else{
        token = '';
      }
    }
    _header = Object.assign({}, _header, {
      'Authorization': token
    });
    // 是否显示loading
    if (showLoading) {
      wx.showLoading({ title: loadingTitle, icon: 'none', mask: true });
    }
    wx.request({
      url: url,
      data: data,
      header: _header,
      method: method,
      success: (res => {
        if (showLoading) {
          wx.hideLoading();
        }
        // 服务器 非200 错误
        if (res.statusCode && res.statusCode != 200) {
          wx.showToast({ title: '服务器 ' + res.statusCode + ' 错误', icon: 'none' });
          reject(res);
          return;
        }

        if (res.data && res.data.code != 0) {
          if (res.data.code >= 30000 && res.data.code < 40000) {
            //授权过期或无效，重新登录
            auth.login();
            reject(res.msg)
            return;
          } else {
            // 业务状态非0 是否提示
            if (showToast) {
              wx.showToast({ title: res.data.msg, icon: 'none' });
            }
          }

          reject(res);
          return;
        }
        resolve(res.data);
      }),
      fail: (err => {
        if (showLoading) {
          wx.hideLoading();
        }

        if (err.errMsg.indexOf('url not in domain list') > -1) {
          wx.showToast({ title: '请求url不在合法域名中，请打开调试模式', icon: 'none' });
        }

        reject(err);
      })
    });
  });

}

/**
 * get 网络请求
 */
function getRequest(url, data = {}, needToken = false, config = {}) {
  return request(url, data, "GET", needToken, config);
}

/**
 * post 网络请求
 */
function postRequest(url, data = {}, needToken = false, config = {}) {
  return request(url, data, "POST", needToken, config);
}

module.exports = {
  getRequest: getRequest,
  postRequest: postRequest,
}