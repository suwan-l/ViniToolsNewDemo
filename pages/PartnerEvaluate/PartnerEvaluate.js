const api = require('../../utils/api.js');
Page({
  data: {
  },
  //店效输入的值
  keyword_1: function(e) {
    var kword1 = Number(e.detail.value);
    if (kword1 != "") {
      this.setData({
        kword1: kword1
      });
    } else {
      this.setData({
        kword1: null
      });
    }  
  },
  //店数输入的值
  keyword_2: function (e) {
    var kword2 = e.detail.value;
    if (kword2 != "") {
      this.setData({
        kword2: kword2
      });
    } else {
      this.setData({
        kword2: null
      });
    }  
  },
  //3万以下店数输入的值
  keyword_3: function (e) {
    var kword3 = e.detail.value;
    if (kword3 != "") {
      this.setData({
        kword3: kword3
      });
    } else {
      this.setData({
        kword3: null
      });
    }  
  },
  //周期内开店数输入的值
  keyword_4: function (e) {
    var kword4 = e.detail.value;
    if (kword4 != "") {
      this.setData({
        kword4: kword4
      });
    } else {
      this.setData({
        kword4: null
      });
    }  
  },
  //周期内关店数输入的值
  keyword_5: function (e) {
    var kword5 = e.detail.value;
    if (kword5 != "") {
      this.setData({
        kword5: kword5
      });
    } else {
      this.setData({
        kword5: null
      });
    }  
  },
  //运营经理数量输入的值
  keyword_7: function (e) {
    var kword7 = e.detail.value;
    if (kword7 != "") {
      this.setData({
        kword7: kword7
      });
    } else {
      this.setData({
        kword7: null
      });
    }  
  },

  // 点击提交跳转
  submitBtn: function (e) {
    var that = this;
    if (this.data.kword1 == null || this.data.kword2 == null || this.data.kword3 == null || this.data.kword4 == null || this.data.kword5 == null || this.data.kword7 == null ) {
      wx.showToast({ //显示消息提示框  此处是提升用户体验的作用
        title: '输入不能为空',
        icon: 'loading',
        mask: true,
        duration: 500,
      });
    } else {
      // 客户经理提交评估 接口调用
      api.Submit({
        id: that.data.id,
        sale: this.data.kword1,//总绩效
        total_num: this.data.kword2,//总门店数量
        min_num: this.data.kword3,//业绩低于3万的门店数量
        quarter_open_num: this.data.kword4,//周期内开店数量
        quarter_close_num: this.data.kword5,//	周期内关店数量
        operate_num: this.data.kword7,//	运营经理人数
      }).then(res => {
        console.log('提交审核',res)
        wx.showToast({
          title: '已提交',
          icon: 'success',
          duration: 1000,
          success: function () {
            setTimeout(function () {
              //要延时执行的代码
              wx.redirectTo({
                url: '../PartnerDetail/PartnerDetail?id=' + that.data.id
              });
            }, 1000) //延迟时间
          }
        })
      }).catch(err => {
        console.log(err)
      });   
    } 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {  
    var that = this;
    var id = options.id
    console.log("id",id)
    // 评估记录详情接口调用
    api.Detail({
      id: id,
    }).then(res => {
      console.log("会议次数",res.data.meeting_num)
      that.setData({
        id:id,
        meeting_num: '组织会议次数：' + res.data.meeting_num + '次'
      })
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