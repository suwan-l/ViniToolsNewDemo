const config = require('../../utils/config.js');
const api = require('../../utils/api.js');
const log = require('../../utils/log.js');
const imgUrl = config.imgUrl; //图片地址
Page({
  data: {
    isShow:false,
    // banne图片轮播
    bannerImg: [{
        img: imgUrl + '201912/20191227092012305.jpg'
      },
      {
        img: imgUrl + '201912/20191227092012582.jpg'
      },
      {
        img: imgUrl + '201912/20191227092012305.jpg'
      },
      {
        img: imgUrl + '201912/20191227092012582.jpg'
      }
    ],
  },
  onLoad: function(options) {
    var that = this;
    var debug_role = wx.getStorageSync('debug_role');
    wx.login({
      success: res => {
        if (res.code) {
          console.log("aaa",res.code)
          // 登录接口地址
          wx.request({
            url: 'https://activity.vinistyle.cn/tool/user/login',
            data: {
              code: res.code,
              debug_role:debug_role
            },
            method: 'POST',
            header: {
              "content-type": "application/x-www-form-urlencoded"
            },
            success: function (res) {
              console.log(res)   
              let status = res.data.data.status
              if(status == "1"){    
                that.setData({
                  role:res.data.data.info.role,
                  isShow:false
                })
                // 回调菜单接口 
                that.menu_list(); 
              }
              else{
                that.setData({
                  isShow:true
                })
              }  
            }
          })
        }
      }  
    })
    log.setFilterMsg('filterkeyword')
  },
  // 菜单接口
  menu_list:function(res){
    var that = this;
    console.log("菜单接口身份",that.data.role)
    api.Menu().then(res => {
      that.setData({
        appraise:res.data.appraise,//市场评估
        basic_sales:res.data.basic_sales,//360健康测评
        key_sales:res.data.key_sales,//关键指标测评
        profit_assess:res.data.profit_assess,//盈利状况测评
        daily:res.data.daily,//门店提报
        analog_login:res.data.analog_login,//模拟登录
        role:that.data.role // 用户身份
      }) 
    }).catch(err => {
      // 处理出错情况
      console.log(err)
    });
  },
  // 点击去注册
  RegBtn:function(e){
    wx.redirectTo({
      url: '../register/register',
    })   
  },
  // 市场评估
  appraise: function(e) {
    var role = this.data.role;
    console.log("身份",role)
    if(role == 'manager'){
      wx.navigateTo({
        url: '../ManagerList/ManagerList',
      })
    }
    else if(role == 'agent'){
      wx.navigateTo({
        url: '../AgentList/AgentList',
      })
    }
    else{
      wx.showToast({
        title: '您没有查看资格~',
        icon: 'none',
        duration: 1000,
      })
    }
  },
  // 360健康测评
  basic_sales: function(e) {
    var role = this.data.role;
    console.log("身份",role)
    if(role == 'own' || role == 'visitor'){
      wx.showToast({
        title: '您没有查看资格~',
        icon: 'none',
        duration: 1000,
      })
    }
    else{
      wx.navigateTo({
        url: '../SingleEvaluate/SingleEvaluate',
      })
    }
  },
  // 关键指标测评
  key_sales: function(e) {
    var role = this.data.role;
    console.log("关键指标身份",role)
    if(role == 'own' || role == 'visitor'){
      wx.showToast({
        title: '您没有查看资格~',
        icon: 'none',
        duration: 1000,
      })
    }
    else{
      wx.navigateTo({
        url: '../Checking/Checking',
      })   
    }
    
  },
  // 盈利状况测评
  profit_assess: function(e) {
    wx.navigateTo({
      url: '../LifeCycle/LifeCycle',
    })
  },
  // 门店提报
  daily: function(e) {
    var role = this.data.role;
    console.log("shenffffff",role)
    if(role == 'area'){
      wx.navigateTo({
        url: '../AreaList/AreaList',
      })
    }
    else if(role == 'shop_keeper' || role == 'manager' || role == 'agent'){
      wx.navigateTo({
        url: '../StoresList/StoresList',
      })
    }
    else{
      wx.showToast({
        title: '您没有查看资格~',
        icon: 'none',
        duration: 1000,
      })
    }
    console.log("ffff",role)
    wx.setStorageSync('role', this.data.role)
  },
  // 模拟登录
  analog_login: function(e) {
    wx.redirectTo({
      url: '../login/login',
    })
  },
  // MORE
  more: function(e) {
    wx.showToast({
      title: '更多功能即将发布~',
      icon: 'none',
      duration: 1000,
    })
  },
  onShow: function () {
    // 日志会和当前打开的页面关联，建议在页面的onHide、onShow等生命周期里面打
    log.warn('warn')
    log.error('error')
    log.setFilterMsg('filterkeyword')
    log.setFilterMsg('addfilterkeyword')
  },
})