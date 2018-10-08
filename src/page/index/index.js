
'use strict';
require('./index.css');
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
let Pagination          = require('util/pagination/index.js');
let header              = require('page/common/header/index.js');

var index = {
    init : function(){
        this.bind();
        header.init({
            name : '主页'
        })
    },
    bind : function(){
        this.getQueryArticle();
    },
    data : {
        option : {
            pageNum  : 1,
            pageSize : 8
        }
    },
    //获取所有文章
    getQueryArticle : function(){
        var _this = this;
        _info.getQueryArticle(this.data.option,function(res){
            if(res.list.length>0){
            var article = _mm.renderHtml(templateArticle,{res:res.list});
            $(".main_index").html(article);
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
            $('.main_index').html(`
                    <div class='center-block no-search'>博主至今还没写博客呢，<a href='index.html'>点击返回首页</a></div>
                `);
        }
        },function(err){
            
        })
    },
    //获取分页
    loadPages : function(pageInfo){
        var that = this;
        this.pagination =  new Pagination();
        this.pagination.render($.extend(pageInfo,{
            onSelectPage : function(pageNum){
                that.data.option.pageNum = pageNum;
                that.getQueryArticle();
            }
        }))
     }
};

module.exports = index.init();