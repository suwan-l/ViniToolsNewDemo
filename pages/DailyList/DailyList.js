const api = require('../../utils/api.js');
Page({
  data: {
    page:1, //页码从1开始
    limit:20, //显示数据个数
    bottomTips: 1,//用于标识是否还有更多的状态
    homeList: [],//用于渲染页面的数组
    addList: [],//用于数组的追加和暂存
  },
  
  onLoad: function (options) {
    var that = this;
    var store_id = options.store_id //门店ID
    that.setData({
      store_id:store_id
    })
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight -120;
        var clientWidth = res.windowWidth;
        var rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR;
        that.setData({
          winHeight: calc
        });
      }
    });  
    // 回调门店列表接口
    that.listData();
  },

  // 页面上拉触底事件的处理函数
  onReachBottom: function (res) {
    var that = this;  
    that.data.page = that.data.page + 1;
    that.listData();
    wx.hideLoading();
  },

  // 门店日报接口
  listData:function(res){
    var that = this;
    console.log("sss",that.data.store_id)
    api.DailyList({
      store_id: that.data.store_id, //门店ID
      page:that.data.page,
      limit:that.data.limit
    }).then(res => {
      //console.log("页面列表",res.data.list)
      if(res.data.list.length < 1){
        wx.showToast({
          title: '亲~ 没有更多数据了',
          icon:"none",
          duration: 1000,
        });
        that.setData({
          bottomTips: 0
        })
      }  
     else{
        var bottomTips1 = 1;
        //如果有数据，但小于每次期望加载的数据量（pagesize）,将state设为0，表示后面已没有数据可加载
        if (res.data.list.length < that.data.limit)
          var bottomTips1 = 0;
        //循环将结果集追加到数组后面
        for (var i = 0; i < res.data.list.length; i++) {
          that.data.addList.push(res.data.list[i]);
        }
        that.setData({
          homeList: that.data.addList,
          bottomTips: bottomTips1,
          store:res.data.store,
          total:res.data.total,
        });
      }
      // 隐藏加载框
      wx.hideLoading();
      console.log("加载后数据",that.data.homeList)

    }).catch(err => {
      // 处理出错情况
      console.log(err)
    });
  },

  // 点击日报列表跳转至 --> 日报填报
  daily_sheet:function(e){
    var that = this;
    var id = e.currentTarget.dataset.id //id
    var date = e.currentTarget.dataset.date //日期
    var status = e.currentTarget.dataset.status; //填报状态
    let role = wx.getStorageSync("role");
    console.log("身份",role)
    // 判断是否填报日报状态
    if(status == 0){
      if(role == 'area' || role == 'manager'){
        wx.showToast({
          title: '当日业绩未提报，请联系店主或代理商填报',
          icon: 'none',
          duration: 1000,
        })
      }
      else{
        wx.navigateTo({
          url: '../DailySheet/DailySheet?store_id=' + that.data.store_id+ '&&' + 'date=' + date,
        })
      } 
    }
    else if(status == 1){
      wx.navigateTo({
        url: '../DailyCheck/DailyCheck?id=' + id,
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})