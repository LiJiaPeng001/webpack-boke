
'use strict';
require('./index.css');

let _info               = require('service/info-service.js');
var mine = {
    init : function(){
        //点击进行模糊查询
        this.onQuerySelect();
    },
    onQuerySelect : function(){
        var _this = this;
        $('.input_submit').click(function(){
            var like = $.trim($('#keyboard').val());
            window.location.href = 'info.html?like='+like;
        })
        // 输入会车后，做搜索提交
        $('#search-input').keyup(function(e){
            // 13是回车键的keyCode
            if(e.keyCode === 13){
                var like = $.trim($('#keyboard').val());
                window.location.href = 'info.html?like='+like;
            }
        });
    }
};

module.exports = mine.init();