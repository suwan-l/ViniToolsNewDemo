import request from './request.js';
import config from './config.js';

const host = config.baseUrl;
module.exports = {
  // 获取手机号
  MobileDecrypt: function (data) {
    return request.postRequest(
      host + 'tool/user/decrypt_mobile',
      data,
      false,
    );
  },
  // 注册接口
  Register: function (data) {
    return request.postRequest(
      host + 'tool/user/register',
      data,
      false,
    );
  },
  // 基础业绩选项
  SetBasicsales: function(data){
    return request.getRequest(
      host + 'tool/basic_sales/set',
      data,
      true,
    );
  },
  // 基础业绩数据
  DetailBasicsales: function (data) {
    return request.getRequest(
      host + 'tool/basic_sales/detail',
      data,
      true,
    );
  },
  // 关键指标选项
  SetKeySales: function(data) {
    return request.getRequest(
      host + 'tool/key_sales/set',
      data,
      true,
    );
  },
  // 关键指标数据
  DetailKeySales: function (data) {
    return request.getRequest(
      host + 'tool/key_sales/detail',
      data,
      true,
    );
  },
  // 代理商评估列表
  ListAgent: function (data) {
    return request.getRequest(
      host + 'tool/appraise/agent_list',
      data,
      true,
    );
  },
  // 代理商提交评估照片
  PicSubmit: function (data) {
    return request.postRequest(
      host + 'tool/appraise/submit_pic',
      data,
      true,
    );
  },
  //客户经理搜索项
  SearchManager: function (data) {
    return request.getRequest(
      host + 'tool/appraise/manager_search',
      data,
      true,
    );
  },
  //客户经理评估列表
  ListManager: function (data) {
    return request.getRequest(
      host + 'tool/appraise/manager_list',
      data,
      true,
    );
  },
  //评估记录详情
  Detail: function (data) {
    return request.getRequest(
      host + 'tool/appraise/detail',
      data,
      true,
    );
  },
  //客户经理审核照片
  PicStatus: function (data) {
    return request.postRequest(
      host + 'tool/appraise/status_pic',
      data,
      true,
    );
  },
  //客户经理提交评估
  Submit: function (data) {
    return request.postRequest(
      host + 'tool/appraise/submit',
      data,
      true,
    );
  },
  //用户信息
  Info: function (data) {
    return request.getRequest(
      host + 'tool/user/info',
      data,
      true,
    );
  },
  // 门店提报 - 门店列表
  DailyStores: function (data) {
    return request.getRequest(
      host + '/tool/daily/stores',
      data,
      true,
    );
  },
  // 门店提报 - 日报列表
  DailyList: function (data) {
    return request.getRequest(
      host + '/tool/daily/list',
      data,
      true,
    );
  },
  // 门店详情
  StoreDetail: function (data) {
    return request.getRequest(
      host + '/tool/store/detail',
      data,
      true,
    );
  },
  //门店初始业绩
  DailyInitSale: function (data) {
    return request.getRequest(
      host + '/tool/daily/init_sale',
      data,
      true,
    );
  },
  // 日报提交
  DailyUpdate: function (data) {
    return request.postRequest(
      host + '/tool/daily/update',
      data,
      true,
    );
  },
  // 日报查看
  DailyDetail: function (data) {
    return request.getRequest(
      host + '/tool/daily/detail',
      data,
      true,
    );
  },
  // 大区列表
  AreaList: function (data) {
    return request.getRequest(
      host + '/tool/daily/area_list',
      data,
      true,
    );
  },
  // 大区门店
  DailyArea: function (data) {
    return request.getRequest(
      host + '/tool/daily/area',
      data,
      true,
    );
  },
  // 菜单
  Menu: function (data) {
    return request.getRequest(
      host + '/tool/setting/menu',
      data,
      true,
    );
  },
  // 日报设置
  Setting: function (data) {
    return request.getRequest(
      host + '/tool/daily/setting',
      data,
      true,
    );
  },
}