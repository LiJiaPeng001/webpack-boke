'use strict';

var _mm = require('util/mm.js');

var _index = {
    //获取顶部标签
    getLabel : function (resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/admin/label'),
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    //获取我的个人信息
    getMine : function (resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/admin/user'),
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    }
}
module.exports = _index;