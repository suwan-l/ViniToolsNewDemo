const api = require('../../utils/api.js');
Page({
  data: {},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var user_info = wx.getStorageSync('user_info');

    // 基础业绩选项接口
    api.SetBasicsales().then(res => {
      console.log(res)
      that.setData({
        quarters: res.data.quarters,
        stores: res.data.stores
      })
    }).catch(err => {
      // 处理出错情况
      console.log(err)
    });
  },
  // 选择门店
  bindPickerChange: function(e) {
    console.log('门店', this.data.stores[e.detail.value].id)
    this.setData({
      arrayIdx: e.detail.value,
      store_id: this.data.stores[e.detail.value].id
    })
  },
  // 考核日期
  bindDateChange: function(e) {
    console.log('日期', this.data.quarters[e.detail.value])
    this.setData({
      dataIdx: e.detail.value,
      date_quarter: this.data.quarters[e.detail.value]
    })
  },
  // 点击查询跳转
  enquiryBtn: function(e) {
    if (this.data.arrayIdx == null || this.data.dataIdx == null) {
      wx.showToast({ //显示消息提示框  此处是提升用户体验的作用
        title: '输入不能为空',
        icon: 'loading',
        mask: true,
        duration: 500,
      });
    } else {
      wx.navigateTo({
        url: "../SingleDetail/SingleDetail"
      })
    }
    wx.setStorage({
      key: 'detailInfo',
      data: {
        store_id: this.data.store_id,
        date_quarter: this.data.date_quarter,
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})