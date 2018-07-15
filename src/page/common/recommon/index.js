
'use strict';
require('./index.css');
let _info           = require('service/info-service.js');
let _mm             = require('util/mm.js');
let templateIndex   = require('./index.string');

var mine = {
    init : function(){
        this.getRecommonArticle();  
    },
    //获取最新博客
    getRecommonArticle : function(){
        _info.getArticleRecommon(function(res){
            var recommon = _mm.renderHtml(templateIndex,{res:res});
            $('.recommon').html(recommon);
        },function(err){

        })
    }
};

module.exports = mine.init();