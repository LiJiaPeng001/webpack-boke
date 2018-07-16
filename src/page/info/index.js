
'use strict';
require('./index.css');
require('page/index/index.css');
require('page/common/header/index.js');
require('page/common/mine/index.js');
require('page/common/search/index.js');
require('page/common/class/index.js');
require('page/common/recommon/index.js');
require('page/common/link/index.js');
let _index              = require('service/index-service.js');
let _info               = require('service/info-service.js');
let templateArticle     = require('./article.string');
let _mm                 = require('util/mm.js');
let templateClass       = require('../index/article.string');

var info = {
    data : {},
    init : function(){
        this.bind();
    },
    bind : function(){
        this.getParams();
    },
    //获取导航栏参数
    getParams:function(){
        if(_mm.getUrlParam('aid')){
            this.data.aid = _mm.getUrlParam('aid');
            //如果有aid获取文章参数
            this.getArticleItem({'aid':this.data.aid});
        }else if(_mm.getUrlParam('categoryId')){
            //如果是分类，获取该分类下的所有内容
            this.data.categoryId = _mm.getUrlParam('categoryId');
            this.getArticleItem({'categoryId':this.data.categoryId});
        }else{
            $('.newsview').html('我永远喜欢新垣结衣');
        }
    },
    getArticleItem : function(data){
        _info.getArticleItem(data,function(res){
            if(data.aid){
                var aid = _mm.renderHtml(templateArticle,{res:res});
                $('.newsview').html(aid);
            }else{
                var cate = _mm.renderHtml(templateClass,{res:res});
                $('.newsview').html(cate);
            }
        },function(err){

        })
    },
    //获取分页
    loadPages : function(pageInfo){
        this.pagination =  new Pagination();
         this.pagination.render($.extends({},pageInfo,{
             container : $('.pagination')
         }))
     }
};

module.exports = info.init();