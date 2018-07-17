
'use strict';
require('./index.css');
let _info           = require('service/info-service.js');
let _mm             = require('util/mm.js');
let templateIndex   = require('./index.string');

var mine = {
    init : function(){
        this.getArticleNew();
    },
    data : {
        option : {
            pageNum  : 1,
            pageSize : 5,
            new      : '123'
        }
    },
    getArticleNew : function(){
        _info.getQueryArticle(this.data.option,function(res){
            var link = _mm.renderHtml(templateIndex,{res:res.list});
            $('.link-new').html(link);
        },function(err){

        })
    }
};

module.exports = mine.init();