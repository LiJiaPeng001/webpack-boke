
'use strict';
require('./index.css');
require('page/common/header/index.js');
require('page/common/mine/index.js');
require('page/common/search/index.js');
require('page/common/class/index.js');
require('page/common/recommon/index.js');
require('page/common/link/index.js');
let _index = require('service/index-service.js');
let _info  = require('service/info-service.js')

var index = {
    init : function(){
        
    },
    bind : function(){
        this.getQueryArticle();
    },
    //获取所有文章
    getQueryArticle : function(){
        _info.getQueryArticle(function(res){

        },function(err){
            _mm.errorTips(err);
        })
    }
};

module.exports = index.init();