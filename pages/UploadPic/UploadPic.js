const app = getApp();
const api = require('../../utils/api.js');

Page({
  data: {
    imgs: [], //本地图片
    images: [],// 先上图片
    
  },
  
  // 上传图片
  chooseImg: function (e) {
    var that = this;
    var imgs = this.data.imgs;
    if (imgs.length >= 9) {
      this.setData({
        lenMore: 1
      });
      setTimeout(function () {
        that.setData({
          lenMore: 0
        });
      }, 2500);
      return false;
    }
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: res =>{
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        var imgs = that.data.imgs;
        for (var i = 0; i < tempFilePaths.length; i++) {
          if (imgs.length >= 9) {
            return false;
          } else {
            imgs.push(tempFilePaths[i]);
          }
        }
        wx.showLoading({
          title: '图片上传中',
        })
        //上传图片接口
        wx.uploadFile({
          url: app.globalData.address + 'tool/upload/image',
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'user': 'test'
          },
          header: {
            "content-type": "application/x-www-form-urlencoded",
            "Authorization": that.data.token
          },
          success:res=> {
            var pic_tips = JSON.parse(res.data).msg
            wx.hideLoading();
            var images = JSON.parse(res.data).data.src;
            console.log("上传成功图片", images)
            var imageArray = that.data.images
            imageArray.push(images)
            that.setData({
              images: imageArray,
            })    
          },
          fail: function () {
            console.log(JSON.parse(res.data).data)
          },
        })
      }
    });
  },
  // 删除图片
  deleteImg: function (e) {
    var images = this.data.images;
    var imgs = this.data.imgs;
    var index = e.currentTarget.dataset.index;
    images.splice(index, 1);
    imgs.splice(index, 1);
    this.setData({
      images: images,
      imgs: imgs
    });
  },
  // 预览图片
  previewImg: function (e) {
    //获取当前图片的下标
    var index = e.currentTarget.dataset.index;
    //所有图片
    var images = this.data.images;
    wx.previewImage({
      //当前显示图片
      current: images[index],
      //所有图片
      urls: images
    })
  },

  // 点击提交
  submitBtn: function (e) {
    var that = this;
    console.log("zhaop", that.data.images)
    if (that.data.images == ""){
      wx.showToast({
        title: '请选择要上传的图片',
        icon: 'none',
        duration: 1000,
      })
    }
    else{
      // 代理商提交评估照片
      api.PicSubmit({
        date_quarter: that.data.date_quarter,
        meeting_imgs: that.data.images,
      }).then(res => {
        wx.showToast({
          title: '已提交',
          icon: 'success',
          duration: 1000,
          success: function () {
            setTimeout(function () {
              //要延时执行的代码
              wx.redirectTo({
                url: "../AgentList/AgentList"
              })
            }, 1000) //延迟时间
          }
        })
      }).catch(err => {
        // 处理出错情况
        console.log(err)
        console.log("22", err.data.msg)
      });
    }
  },

  // 无照片提交
  noimg: function (e) {
    var that = this;
    // 代理商提交评估无照片
    api.PicSubmit({
      date_quarter: that.data.date_quarter,
      no_img: 1,
    }).then(res => {
      wx.showToast({
        title: '无照片提交成功',
        icon: 'success',
        duration: 1000,
        success: function () {
          console.log('haha');
          setTimeout(function () {
            //要延时执行的代码
            wx.redirectTo({
              url: "../AgentList/AgentList"
            })
          }, 1000) //延迟时间
        }
      })
    }).catch(err => {
      // 处理出错情况
      console.log(err)
      console.log("22", err.data.msg)
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var user_info = wx.getStorageSync('user_info');
    var date_quarter = options.date_quarter;
 
    this.setData({
      token: user_info.token,
      date_quarter: date_quarter
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