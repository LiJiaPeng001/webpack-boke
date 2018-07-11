

'use strict';
require('./index.css');
let _index = require('service/index-service.js')
let _mm    = require('util/mm.js');
let templateHead = require('./head.string');

var header = {
    //初始化
    init : function(){
        this.bind();
    },
    bind : function(){
        this.getHeaderLabel();
        this.getIphone();
    },
    //获取头部所有标签
    getHeaderLabel : function(){
        _index.getLabel(function(res){
            var head = _mm.renderHtml(templateHead,{res:res});
            $('#starlist').html(head);
        },function(err){
            _mm.error(err);
        })
    },
    //移动端操作
    getIphone : function(){
        $('#mnavh').click(function(){
            $('#starlist').toggle();
        })
    }
};

module.exports = header.init();