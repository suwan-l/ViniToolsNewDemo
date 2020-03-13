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
    var that=this;
    var id = options.id;
    that.setData({
      id:id
    })
    // 评估记录详情接口调用
    api.Detail({
      id: id,
    }).then(res => {
      // 会议照片
      var meeting_imgs = res.data.meeting_imgs;
      if (meeting_imgs != ""){
        var meetingArry = meeting_imgs[0].split(",");
      }
      else{
        var meetingArry = meeting_imgs;
      }
      that.setData({
        item:res.data,
        meetingArry:meetingArry
      })
    }).catch(err => {
      console.log(err)
    });
  },

  //输入会议次数
  meeting_num:function(e){
    var meeting_num = e.detail.value;
    if (meeting_num != "") {
      this.setData({
        meeting_num: meeting_num
      });
    } else {
      this.setData({
        meeting_num: null
      });
    }  
    console.log(meeting_num)
  },

  // 点击审核按钮 审核照片
  reviewBtn:function(e){
    var that = this;
    // 客户经理审核照片接口调用
    if (that.data.meeting_num == null) {
      wx.showToast({
        title: '会议次数不能空',
        icon: 'none',
        duration: 1000,
      })
    }
    else{
      api.PicStatus({
        id: that.data.id,
        meeting_num: that.data.meeting_num
      }).then(res => {
        console.log(res)
        wx.showToast({
          title: '已审核',
          icon: 'success',
          duration: 1000,
          success: function () {
            setTimeout(function () {
              //要延时执行的代码
              wx.redirectTo({
                url: "../PartnerEvaluate/PartnerEvaluate?meeting_num=" + that.data.meeting_num + "&&" + "id=" + that.data.id
              })
            }, 1000) //延迟时间
          }
        })
      }).catch(err => {
        console.log(err)
      });
    }
    
  },

  // 客户经理审核照片接口调用

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