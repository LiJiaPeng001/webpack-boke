'use strict';

var _mm = require('util/mm.js');

var _index = {
    //获取所有文章
    getQueryArticle : function (resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/admin/article/getQueryArticle'),
            success : resolve,
            error   : reject
        });
    },
}
module.exports = _index;