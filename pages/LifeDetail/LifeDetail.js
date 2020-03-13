Page({
  data: {
  },

  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'textArray',
      success: function (res) { 
        that.setData({
          step7: res.data.step7.toFixed(2),
          step9_month: res.data.step9_month.toFixed(2),
          step9_year: res.data.step9_year.toFixed(2),
          step10: parseInt(res.data.step10)
        })
      }
    })
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