

'use strict';
require('./index.css');
let _index = require('service/index-service.js')
let _mm    = require('util/mm.js');
let templateHead = require('./head.string');

var header = {
    option : {
        name : '',
        navList : []
    },
    //初始化
    init : function(option){
        this.getIphone();
        this.getHeaderLabel(option);
    },
    //获取头部所有标签
    getHeaderLabel : function(option){
        var _this = this
            _index.getLabel(function(res){
                _this.option.navList = res
                $.extend(_this.option, option);
                for(var i = 0, iLength = _this.option.navList.length; i < iLength; i++){
                    if(_this.option.navList[i].label === _this.option.name){
                        _this.option.navList[i].isActive = true;
                    }
                };
                var head = _mm.renderHtml(templateHead,{res:_this.option});
                $('#starlist').html(head);
            },function(err){
                _mm.errorTips(err);
            })
    },
    //移动端操作
    getIphone : function(){
        $('#mnavh').click(function(){
            $('#starlist').toggle();
        })
    }
};

module.exports = header