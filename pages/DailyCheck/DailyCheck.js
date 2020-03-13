const api = require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    community_show:false,//累计社群新客、老客人数显示状态
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 日报设置
    api.Setting().then(res => {
      console.log("日报状态",res.data.show_community)
      if(res.data.show_community == "1"){
        that.setData({
          community_show:true
        }) 
      }
      else{
        that.setData({
          community_show:false
        })
      }
    }).catch(err => {
      // 处理出错情况
      console.log(err)
    });

    var id = options.id // id
    // 日报查看接口
    api.DailyDetail({
      id: id, //门店ID
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

  // 点击返回
  back_btn:function(e){
    wx.navigateBack({
      complete: (res) => {
        console.log(res)
      },
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