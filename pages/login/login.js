Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [
      {
        id: 'area',
        name: '区总'
      },
      {
        id: 'shop_keeper',
        name: '店主'
      },
      {
        id: 'manager',
        name: '客户经理'
      },
      {
        id: 'agent',
        name: '代理商'
      },
      {
        id:'own',
        name:'自己'
      }
    ],
  },
  bindPickerChange: function(e) {
    var that = this;
    var debug_role = this.data.array[e.detail.value].id
    console.log(debug_role)
    this.setData({
      index: e.detail.value,
      debug_role:debug_role
    })
    
    wx.login({
      success: res => {
        if (res.code) {
          console.log("aaa",res.code)
          // 登录接口地址
          wx.request({
            url: 'https://activity.vinistyle.cn/tool/user/login',
            data: {
              code: res.code,
              debug_role:debug_role
            },
            method: 'POST',
            header: {
              "content-type": "application/x-www-form-urlencoded"
            },
            success: function (res) {
              console.log(res)  
              wx.redirectTo({
                url: '../index/index',
              })
              wx.setStorageSync('debug_role', debug_role)
            }
          })
        }
      }
    })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
  onShareAppMessage: function () {

  }
})