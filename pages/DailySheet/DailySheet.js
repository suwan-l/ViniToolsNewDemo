const api = require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sale_show:true,//初始业绩输入框显示状态
    community_show:false,//累计社群新客、老客人数显示状态
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var date = options.date //日期
    var store_id = options.store_id //门店ID
    var that = this;
    // 门店详情接口
    api.StoreDetail({
      store_id: store_id, //门店ID
    }).then(res => {
      console.log(res)
      that.setData({
        item:res.data,
        date:date,
        store_id:store_id
      })
    }).catch(err => {
      // 处理出错情况
      console.log(err)
    });

    // 门店初始业绩接口
    api.DailyInitSale({
      store_id: store_id, //门店ID
    }).then(res => {
      console.log(res)
      if(res.code ==0){
        that.setData({
          init_sale:res.data.sale,
          sale_show:false
        })  
      }
      else{
        that.setData({
          sale_show:true
        }) 
      }
    }).catch(err => {
      // 处理出错情况
      console.log(err)
    });

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
  },
  //初始业绩输入值
  init_sale: function (e) {
    var init_sale = e.detail.value;
    if (init_sale != "") {
      this.setData({
        init_sale: init_sale
      });
    } else {
      this.setData({
        init_sale: null
      });
    }  
  },
  //当日业绩输入值
  sale: function (e) {
    var sale = e.detail.value;
    if (sale != "") {
      this.setData({
        sale: sale
      });

    } else {
      this.setData({
        sale: null
      });
    }  
  },
  //新增会员人数输入值
  new_member_count: function (e) {
    var new_member_count = e.detail.value;
    if (new_member_count != "") {
      this.setData({
        new_member_count: new_member_count
      });
    } else {
      this.setData({
        new_member_count: null
      });
    }  
  },
  //新增会员单笔输入值
  new_member_sale: function (e) {
    var new_member_sale = e.detail.value;
    if (new_member_sale != "") {
      this.setData({
        new_member_sale: new_member_sale
      });
    } else {
      this.setData({
        new_member_sale: null
      });
    }  
  },
  //老会员人数输入值
  old_member_count: function (e) {
    var old_member_count = e.detail.value;
    if (old_member_count != "") {
      this.setData({
        old_member_count: old_member_count
      });
    } else {
      this.setData({
        old_member_count: null
      });
    }  
  },
  //老会员单笔输入值
  old_member_sale: function (e) {
    var old_member_sale = e.detail.value;
    if (old_member_sale != "") {
      this.setData({
        old_member_sale: old_member_sale
      });
    } else {
      this.setData({
        old_member_sale: null
      });
    }  
  },
  //今日工作输入值
  today_work: function (e) {
    var today_work = e.detail.value;
    if (today_work != "") {
      this.setData({
        today_work: today_work
      });
    } else {
      this.setData({
        today_work: null
      });
    }  
  },
  //累计社群新客人数输入值
  community_new_count:function(e){
    var community_new_count = e.detail.value;
    if (community_new_count != "") {
      this.setData({
        community_new_count: community_new_count
      });
    } else {
      this.setData({
        community_new_count: null
      });
    }  
  },
  //累计社群老客人数输入值
  community_old_count:function(e){
    var community_old_count = e.detail.value;
    if (community_old_count != "") {
      this.setData({
        community_old_count: community_old_count
      });
    } else {
      this.setData({
        community_old_count: null
      });
    }  
  },

  //明日业绩目标输入值
  tomorrow_sale: function (e) {
    var tomorrow_sale = e.detail.value;
    if (tomorrow_sale != "") {
      this.setData({
        tomorrow_sale: tomorrow_sale
      });
    } else {
      this.setData({
        tomorrow_sale: null
      });
    }  
  },
  //明日计划输入值
  tomorrow_plan: function (e) {
    var tomorrow_plan = e.detail.value;
    if (tomorrow_plan != "") {
      this.setData({
        tomorrow_plan: tomorrow_plan
      });
    } else {
      this.setData({
        tomorrow_plan: null
      });
    }  
  },

  // 日报提交
  submitBtn:function(e){
    var that = this;
    var sale = that.data.sale;//当日业绩
    var init_sale = that.data.init_sale; //初始业绩（首次提交日报时必填）
    var new_member_count = that.data.new_member_count;//新增会员人数
    var new_member_sale = that.data.new_member_sale;//新增会员单笔
    var old_member_count = that.data.old_member_count;//老会员人数
    var old_member_sale = that.data.old_member_sale;//老会员单笔
    var today_work = that.data.today_work;//今日工作
    var community_new_count = that.data.community_new_count;//累计社群新客人数
    var community_old_count = that.data.community_old_count;//累计社群老客人数
    var tomorrow_sale = that.data.tomorrow_sale;//明日业绩目标
    var tomorrow_plan = that.data.tomorrow_plan;//明日计划

    if (sale == null || init_sale == null ||new_member_count == null || new_member_sale == null || old_member_count == null || old_member_sale == null || today_work == null || tomorrow_sale == null || tomorrow_plan == null || community_new_count == null || community_old_count == null) {
      wx.showToast({ 
        title: '输入不能为空',
        icon: 'none',
        mask: true,
        duration: 500,
      });
    }  
    else{
      api.DailyUpdate({
        date: that.data.date,//da日期
        store_id:that.data.store_id,//门店ID
        sale:sale,//当日业绩
        init_sale:init_sale,// 业绩初始值
        new_member_count:new_member_count,//新会员人数
        new_member_sale:new_member_sale,//新会员单笔
        old_member_count:old_member_count,//老会员人数
        old_member_sale:old_member_sale,//老会员单笔
        community_new_count:community_new_count,//累计社群新客人数
        community_old_count:community_old_count,//累计社群老客人数
        today_work:today_work,//今日工作
        tomorrow_plan:tomorrow_plan,//明日计划
        tomorrow_sale:tomorrow_sale//	明日业绩目标

      }).then(res => {
        console.log(res)
        wx.showToast({
          title: '已提交',
          icon: 'success',
          duration: 1000,
          success: function () {
            setTimeout(function () {
              //要延时执行的代码
              wx.redirectTo({
                 url: '../DailyList/DailyList?store_id=' + that.data.store_id,
              })
              wx.setStorageSync('store_id', that.data.store_id);
            }, 1000) //延迟时间
          }
        })
      }).catch(err => {
        // 处理出错情况
        console.log(err)
      });
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