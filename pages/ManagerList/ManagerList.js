const api = require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showview1: true,   //日期显隐
    showview2: true,   //姓名显隐
    showview3: true,   //状态显隐

    date_quarters:'',
    agents:"",
    statusName:"",
    agent_mobile:"", // 代理商手机号
    statusId:"", //状态id

    listShow:true,//默认显示列表
    listHidden:false,//提示无数据


    page:1, //页码从1开始
    limit:10, //显示数据个数
    bottomTips: 1,//用于标识是否还有更多的状态
    homeList: [],//用于渲染页面的数组
    addList: [],//用于数组的追加和暂存
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
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

    // 客户经理搜索项
    api.SearchManager().then(res => {
      console.log(res.data)
      that.setData({
        item: res.data
      })
    }).catch(err => {
      console.log(err)
    });
    // 调用客户经理评估列表
    that.listData();
  },

  /* 页面上拉触底事件的处理函数*/
  onReachBottom: function (res) {
    var that = this;  
    that.data.page = that.data.page + 1;
    that.listData();
    wx.hideLoading();
  },

  // 客户经理评估列表
  listData:function(res){
    var that = this;
    api.ListManager({
      page:that.data.page,
      limit:that.data.limit
    }).then(res => {
      console.log("页面列表",res.data.list)
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
          bottomTips: bottomTips1
        });
      }
      // 隐藏加载框
      wx.hideLoading();
      console.log("加载后数据",that.data.homeList)
    }).catch(err => {
      console.log(err)
    });
  },

  // 日期筛选
  filterTab1:function(e){
    var that = this;
    that.setData({
      showview1: that.data.showview1 ? false : true,
      showview2: true, 
      showview3: true,
    })
  },
  DataSift: function (e) {
    var that = this;
    var date_quarter= e.currentTarget.dataset.name;
    that.setData({
      date_quarters: date_quarter,
      showview1: true,
    })
    // 调用筛选渲染方法
    that.siftList();
  },

  // 姓名筛选
  filterTab2: function (e) {
    var that = this;
    that.setData({
      showview2: that.data.showview2 ? false : true,
      showview1: true, 
      showview3: true,
    })
  },
  AgentsSift: function (e) {
    var that = this;
    var agents = e.currentTarget.dataset.name
    var agent_mobile = e.currentTarget.dataset.mobile
    that.setData({
      agents: agents,
      agent_mobile: agent_mobile,
      showview2: true,
    })
    // 调用筛选渲染方法
    that.siftList();
  },

  // 状态筛选
  filterTab3: function (e) {
    var that = this;
    that.setData({
      showview3: that.data.showview3 ? false : true,
      showview1: true, 
      showview2: true,
    })
  },
  StatusSift: function (e) {
    var that = this;
    var statusName = e.currentTarget.dataset.name
    var statusId = e.currentTarget.dataset.id
    that.setData({
      statusName: statusName,
      statusId: statusId,
      showview3: true,
    })
    // 调用筛选渲染方法
    that.siftList();
  },

  //列表筛选渲染
  siftList: function (res) {
    var that = this;
    api.ListManager({
      date_quarter: that.data.date_quarters,
      agent_mobile: that.data.agent_mobile,
      status: that.data.statusId
    }).then(res => {
      console.log("筛选数据", res.data)
      if (res.data.count != 0) {
        that.setData({
          homeList: res.data.list,
          listHidden: false,
          listShow: true
        })
      }
      else {
        that.setData({
          listHidden: true,
          listShow: false
        })
      }
    }).catch(err => {
      console.log(err)
    });
  },

  // 点击列表跳转
  listBtn:function(e){
    var listId = e.currentTarget.dataset.id;
    var status = e.currentTarget.dataset.status;
    console.log("status", status)
    if (status == 1){
      wx.navigateTo({
        url: "../ReviewPic/ReviewPic?id=" + listId
      })
    }
    else if (status == 2) {
      wx.navigateTo({
        url: "../PartnerEvaluate/PartnerEvaluate?id=" + listId
      })
    }
    else if (status == 3){
     wx.navigateTo({
       url: "../PartnerDetail/PartnerDetail?id=" + listId
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
    // if (getCurrentPages().length != 0) {
    //   //刷新当前页面的数据
    //   getCurrentPages()[getCurrentPages().length - 1].listData()
    // }    
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