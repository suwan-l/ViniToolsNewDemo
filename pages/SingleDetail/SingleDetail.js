const api = require('../../utils/api.js');

Page({
  /* 页面的初始数据 */
  data: {
    isShow1: false,//基础业绩数据页
    isShow2:false,//暂无数据页
    block:true,
    none:false,
  },
  /* 生命周期函数--监听页面加载 */
  onLoad: function(options) {
    var that = this;
    var detailInfo = wx.getStorageSync('detailInfo');
    that.setData({
      store_id: detailInfo.store_id,
      date_quarter: detailInfo.date_quarter
    })
    // 基础业绩数据接口
    api.DetailBasicsales({
      store_id: that.data.store_id,
      date_quarter: that.data.date_quarter
    }).then(res => {
      console.log("333",res)
      that.setData({
        item: res.data,
        isShow1: true,//显示基础业绩数据
      })
    }).catch(err => {
      // 处理出错情况
      console.log(err)
      that.setData({
        isShow2: true,//显示暂无数据页
      })
    });
  },

  /* 生命周期函数--监听页面初次渲染完成 */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

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