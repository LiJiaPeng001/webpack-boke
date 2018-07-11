'use strict';

var _mm = require('util/mm.js');

var _index = {
    //获取顶部标签
    getLabel : function (resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/admin/label'),
            success : resolve,
            error   : reject
        });
    },
    getMine : function (resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/admin/user'),
            success : resolve,
            error   : reject
        });
    }
}
module.exports = _index;