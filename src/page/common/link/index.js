
'use strict';
require('./index.css');
let _info           = require('service/info-service.js');
let _mm             = require('util/mm.js');
let templateIndex   = require('./index.string');

var mine = {
    init : function(){
        this.getArticleNew();
    },
    getArticleNew : function(){
        _info.getArticleNew(function(res){
            var link = _mm.renderHtml(templateIndex,{res:res});
            $('.link-new').html(link);
        },function(err){

        })
    }
};

module.exports = mine.init();