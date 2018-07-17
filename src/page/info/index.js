
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
let Pagination          = require('util/pagination/index.js');

var info = {
    data : {},
    init : function(){
        this.bind();
    },
    bind : function(){
        this.getParams();
    },
    data : {
        option : {
            pageNum  : 1,
            pageSize : 6
        }
    },
    //获取导航栏参数
    getParams:function(){
        if(_mm.getUrlParam('aid')){
            this.data.aid = _mm.getUrlParam('aid');
            //如果有aid获取文章参数
            this.getArticleItem($.extend({},this.data.option,{'aid':this.data.aid}));
        }else if(_mm.getUrlParam('categoryId')){
            //如果是分类，获取该分类下的所有内容
            this.data.categoryId = _mm.getUrlParam('categoryId');
            this.getArticleItem($.extend({},this.data.option,{'categoryId':this.data.categoryId}));
        }else if(_mm.getUrlParam('like')){
            this.data.like = _mm.getUrlParam('like');
            this.getArticleItem($.extend({},this.data.option,{'like':this.data.like}));
        }else{
            $('.newsview').html('<h1>我永远喜欢新垣结衣</h1>');
        }
    },
    getArticleItem : function(data){
        var _this = this;
        _info.getQueryArticle(data,function(res){
            if(data.aid){
                var aid = _mm.renderHtml(templateArticle,{res:res.list});
                $('.newsview').html(aid);
            }else if(data.like){
                var cate = _mm.renderHtml(templateClass,{res:res.list});
                $('.newsview').html(cate);
                _this.loadPages({
                    hasPreviousPage : res.hasPreviousPage,
                    prePage         : res.prePage,
                    hasNextPage     : res.hasNextPage,
                    nextPage        : res.nextPage,
                    pageNum         : res.pageNum,
                    pages           : res.pages,
                    container       : $('#pagination')
                })
            }else{
                var cate = _mm.renderHtml(templateClass,{res:res.list});
                $('.newsview').html(cate);
                _this.loadPages({
                    hasPreviousPage : res.hasPreviousPage,
                    prePage         : res.prePage,
                    hasNextPage     : res.hasNextPage,
                    nextPage        : res.nextPage,
                    pageNum         : res.pageNum,
                    pages           : res.pages,
                    container       : $('#pagination')
                })
            }
        },function(err){

        })
    },
    //获取分页
    loadPages : function(pageInfo){
        var _this = this;
        this.pagination ? '' : this.pagination =  new Pagination();
        this.pagination.render($.extend(pageInfo,{
            onSelectPage : function(pageNum){
                _this.data.option.pageNum = pageNum;
                _this.bind();
            }
        }))
     }
};

module.exports = info.init();