const api = require('../../utils/api.js');
Page({
  data: {
    stateText:"",
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var id = options.id;
    // var id=18;
    // 评估记录详情接口调用
    api.Detail({
      id: id,
      need_score:1
    }).then(res => {
      console.log("计算结果", res)
      var rankSum = res.data.total_score
      // 健康状态
      if (rankSum > 8.5) {
        this.data.stateText = '优秀'
      }
      else if (rankSum >= 7 && rankSum <= 8.5) {
        this.data.stateText = '健康'
      }
      else if (rankSum >= 6 && rankSum < 7) {
        this.data.stateText = '亚健康'
      }
      else if (rankSum >= 4 && rankSum < 6) {
        this.data.stateText = '不健康'
      }
      else if (rankSum < 4) {
        this.data.stateText = '危险'
      }
      that.setData({
        item:res.data,
        rankSum:rankSum,
        stateText:this.data.stateText
      });
     
    }).catch(err => {
      console.log(err)
    }); 
    
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