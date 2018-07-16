'use strict';

var _mm = require('util/mm.js');

var _index = {
    //获取所有文章
    getQueryArticle : function (resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/admin/getQueryArticle'),
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    //获取文章分类
    getArticleClass : function (resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/admin/getArticleClass'),
            success : resolve,
            error   : reject
        });
    },
    //获取推荐博客
    getArticleRecommon:function (resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/admin/getArticleRecommon'),
            success : resolve,
            error   : reject
        });
    },
    //获取最新博客
    getArticleNew : function (resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/admin/getArticleNew'),
            success : resolve,
            error   : reject
        });
    },
    //通过aid获取置顶博客所有内容
    getArticleItem : function (data,resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/admin/getArticleItem'),
            data    : data,
            success : resolve,
            error   : reject
        });
    },
}
module.exports = _index;