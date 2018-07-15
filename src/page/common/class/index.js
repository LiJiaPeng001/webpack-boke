
'use strict';
require('./index.css');
require('page/common/mine/index.js');
let _info           = require('service/info-service.js');
let _mm             = require('util/mm.js');
let templateIndex   = require('./index.string');
 
var clas = {
    init : function(){
        this.getArticleClass();
    },
    //获取文章分类
    getArticleClass : function(){
        _info.getArticleClass(function(res){
            var article = _mm.renderHtml(templateIndex,{res:res});
            $('.fen-item').html(article);
        },function(err){

        })
    }
};

module.exports = clas.init();