const api = require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 关键指标数据接口
    api.ListAgent({
      
    }).then(res => {
      console.log(res.data)
      that.setData({
        item:res.data
      })
    }).catch(err => {
      // 处理出错情况
      console.log(err)
      
    });
  },

  // 点击列表跳转
  listBtn:function(e){
    var indexId = e.currentTarget.dataset.index;
    var date_quarter = e.currentTarget.dataset.time;
    var status = e.currentTarget.dataset.status;
    var id = e.currentTarget.dataset.id;
    console.log("状态",status)
    console.log("id", id)
    if(status == 0){
      wx.navigateTo({
        url: "../UploadPic/UploadPic?date_quarter=" + date_quarter,
      })
    }
    else if(status == 1){
      wx.showToast({
        title: '审核中~',
        icon: 'none',
        duration:1000
      });
    }
    else if (status == 2) {
      wx.showToast({
        title: '照片已审核，待提交~',
        icon: 'none',
        duration: 1000
      });
    }
    else if(status == 3){
      wx.navigateTo({
        url: '../PartnerDetail/PartnerDetail?id=' + id,
      })
    }
    else if (status == 4) {
      wx.navigateTo({
        url: "../UploadPic/UploadPic?date_quarter=" + date_quarter + "&&" + "id=" + id,
      })
    }
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