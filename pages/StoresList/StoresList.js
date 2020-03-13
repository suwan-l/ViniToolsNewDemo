const api = require('../../utils/api.js');
Page({
  data: {
    date: '', //默认当前时间
    start_date:'2020-02-15', //开始时间
    end_date:'' //结束时间
  },
  // 格式化时间
  formatTime(date) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1, month = month < 10 ? '0' + month : month;
    var day = date.getDate(), day = day < 10 ? '0' + day : day;
    return year + '-' + month + '-' + day;
  },
  // 日期选择
  bindDateChange: function (e) {
    var that = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
    // 回调门店列表接口
    that.DailyStores();
  },
  // 门店列表接口
  DailyStores:function(res){
    var that = this;
    api.DailyStores({
      date: that.data.date,
    }).then(res => {
      console.log(res)
      that.setData({
        StoreList:res.data.list,
        item:res.data.total
      })
    }).catch(err => {
      // 处理出错情况
      console.log(err)
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //回调时间函数
    let now = new Date();
    let nowdate = this.formatTime(now);
    that.setData({
      end_date: nowdate,
      date:nowdate
    });
    // 回调门店列表接口
    that.DailyStores();
  },

  // 点击门店列表跳转至 --> 日报列表
  daily_list:function(e){
    var that = this;
    var store_id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../DailyList/DailyList?store_id=' + store_id,
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