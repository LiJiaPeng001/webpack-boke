
'use strict';
require('./index.css');
let _index      = require('service/index-service.js')
let _mm         = require('util/mm.js');
let template    = require('./index.string');

var mine = {
    init : function(){
        this.bind();
    },
    bind : function(){
        this.getAboutMe();
    },
    getAboutMe : function(){
        _index.getMine(function(res){
            var index = _mm.renderHtml(template,{res:res});
            $('.about_me').html(index);
        },function(err){
            _mm.errorTips(err);
        })
    }
};

module.exports = mine.init();