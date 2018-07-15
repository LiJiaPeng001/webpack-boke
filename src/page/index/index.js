
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

var index = {
    init : function(){
        this.bind();
    },
    bind : function(){
        this.getQueryArticle();
    },
    //获取所有文章
    getQueryArticle : function(){
        _info.getQueryArticle(function(res){
            var article = _mm.renderHtml(templateArticle,{res:res});
            $(".main_index").html(article);
        },function(err){
            
        })
    },
    
};

module.exports = index.init();