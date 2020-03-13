Page({
  data: {
    
  },
  //面积输入的值
  keyword_1: function (e) {
    var kword1 = e.detail.value;
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
  //租金输入的值
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
  //进货金额输入的值
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
  //流动资金输入的值
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
  //促销杂费输入的值
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
  //员工数量输入的值
  keyword_6: function (e) {
    var kword6 = e.detail.value;
    if (kword6 != "") {
      this.setData({
        kword6: kword6
      });

    } else {
      this.setData({
        kword6: null
      });
    }  
  },
  //期望投资回报率输入的值
  keyword_7: function (e) {
    var kword7 = parseFloat(e.detail.value);
    if (kword7 >= 1 && kword7 <= 100){
      this.setData({
        kword7: kword7
      });
      
    }else{
      this.setData({
        kword7: null
      });
    }  
  },

  // 点击提交跳转
  submitBtn: function (e) {
    var mj = this.data.kword1;//面积
    var zj = this.data.kword2;//租金
    var jhje = this.data.kword3;//进货金额
    var ldzj = this.data.kword4;//流动资金
    var cxzf = this.data.kword5;//促销杂费
    var ygsl = this.data.kword6;//员工数量
    var tzhbl = this.data.kword7;//期望投资回报率

    // step1：装修及设备费用=２５００×面积
    var step1 = parseFloat(2500 * mj);
    
    // step2：初始投资=租金×１２+装修及设备费用+进货金额+流动资金
    var rent = parseFloat(zj * 12);
    var step2 = parseFloat(rent) + parseFloat(step1) + parseFloat(jhje) + parseFloat(ldzj);
    
    // step3：毛利率=５０％
    var step3 = 0.5
    
    // step4：装修及设备摊销=装修及设备费用/３６
    var step4 = parseFloat(step1 / 36)
    
    // step5：水电费=面积×３０
    var step5 = parseFloat(mj *30)

    // step6：人员工资=员工数量×３０００
    var step6 = parseFloat(ygsl * 3000)

    // step7：盈亏平衡点=（租金+人员工资+促销杂费+装修及设备摊销+水电费）/毛利率
    var step7num = parseFloat(zj) + parseFloat(step6) + parseFloat(cxzf) + parseFloat(step4) + parseFloat(step5)
    var step7 = parseFloat(step7num / 0.5)

    // step8：年度利润=初始投资×期望投资回报率
    var tzhblnum = parseFloat(tzhbl / 100)
    var step8 = parseFloat(step2 * tzhblnum)

    // step9：月销售额=年度利润/１２+盈亏平衡点，
    //        年销售额=月销售额×１２
    var step9_month = parseFloat(step8 / 12) + parseFloat(step7)
    var step9_year = parseFloat(step9_month *12)

    // step10：年度会员人数=年销售额/预估年度人均消费金额
    var step10 = parseFloat(step9_year / 900)

    if (mj == null || zj == null || jhje == null || ldzj == null || cxzf == null || ygsl == null || tzhbl == null) {
      if (tzhbl == null){
        wx.showToast({
          title: '期望投资回报率请填写1-100内的任意一个数字',
          icon: 'none',
          mask: true,
          duration: 500,
        });
      }else{
        wx.showToast({ 
          title: '输入不能为空',
          icon: 'none',
          mask: true,
          duration: 500,
        });
      }  
    } 
    else{
      wx.navigateTo({
        url: '../LifeDetail/LifeDetail',
      });

      // 本地储存盈亏平衡点、月销售额、年销售额、年度会员人数
      wx.setStorage({
        key: 'textArray',
        data: {
          step7: step7,
          step9_month: step9_month,
          step9_year: step9_year,
          step10: step10
        },
      })  
    }  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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