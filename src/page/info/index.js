
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
let templateClass       = require('./list.string');
let Pagination          = require('util/pagination/index.js');
let header              = require('page/common/header/index.js');

var info = {
    data : {},
    init : function(){
        this.bind();
        header.init({
            name : '内容'
        })
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
    onAddReadCount : function(id){
        _info.onAddReadCount({aid : id},function(res){

        },function(err){
            
        })
    },
    //获取导航栏参数
    getParams:function(){
        if(_mm.getUrlParam('aid')){
            this.data.aid = _mm.getUrlParam('aid');
            //如果有aid获取文章参数
            this.getArticleItem($.extend({},this.data.option,{'aid':this.data.aid}));
            this.onAddReadCount(this.data.aid);
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
            if(res.list.length>0){
                if(data.aid){
                    var aid = _mm.renderHtml(templateArticle,{res:res.list,next:res.next,prev:res.prev});
                    $('.newsview').html(aid);
                }else if(data.like){
                    if(res.list.length>0){
                        var cate = _mm.renderHtml(templateClass,{res:res.list,like:data.like});
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
                }else{
                    var cate = _mm.renderHtml(templateClass,{res:res.list,cate:res.list[0].category});
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
            }else{
                $('.newsview').html(`
                    <div class='center-block no-search'>当前东西空空喔，<a href='index.html'>点击返回首页</a></div>
                `);
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