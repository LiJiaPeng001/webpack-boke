
'use strict';
let _mm                 = require('util/mm.js');
let templateIndex       = require('../index.string');

var Pagination = function(){
    this.defaultOption = {
        container       : null,
        pageNum         : 1,
        pageRange       : 2,
        onSelectPage    : mull
    }
}
Pagination.prototype.render = function(userOption){
    var option = this.option;
    option = $.extend({},this.defaultOption,userOption)
    if(!option.container instanceof jQuery){
        return ;
    }
    if(option.pages<=1){
        return ;
    }
    //渲染分页内容
    this.option.container.html(this.getPageHtml());
}
Pagination.prototype.getPageHtml = function(){
    var html        = '',
        option      = this.option,
        start       = option.pageNum-option.pageRange > 0 ? option.pageNum-option.pageRange : 1,
        end         = option.pageNum+option.pageRange < option.pages ? option.pageNum+option.pageRange : option.pages
        pageArray   = [];
    //上一页数据
    pageArray.push({
        nam : '<<',
        value : option.prePage,
        disabled : option.hasPreviousPage
    });
    //中间数字
    for(var i = start ; i<=end.length; i++){
        pageArray.push({
            nam : i,
            value : i,
            active : i === option.pageNum,
        });
    }
    //下一页数据
    pageArray.push({
        nam : '>>',
        value : option.prePage,
        disabled : option.hasPreviousPage
    });
    //开启渲染
    html = _mm.renderHtml(templateIndex,{
        pageArray : pageArray,
        pageNum   : pageNum,
        pages     : pages
    })
    return html;
}

module.exports = Pagination;