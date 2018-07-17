
'use strict';
require('./index.css')
let _mm                 = require('util/mm.js');
let templateIndex       = require('./index.string');

var Pagination = function(){
    var _this = this;
    this.defaultOption = {
        container       : null,
        pageNum         : 1,
        pageRange       : 2,
        onSelectPage    : null
    }
    // 事件的处理
    $(document).unbind().on('click', '.pg-item', function(){
        var $this = $(this);
        // 对于active和disabled按钮点击，不做处理
        if($this.hasClass('active') || $this.hasClass('disabled')){
            return;
        }
        console.log($this.data('value'));
        typeof _this.option.onSelectPage === 'function' 
            ? _this.option.onSelectPage($this.data('value')) : null;
            
    });
}
Pagination.prototype.render = function(userOption){    
    this.option = $.extend({},this.defaultOption,userOption);
    if(!this.option.container instanceof jQuery){
        return ;
    }
    if(this.option.pages<=1){
        return ;
    }
    //渲染分页内容
    this.option.container.html(this.getPageHtml());
}
Pagination.prototype.getPageHtml = function(){
    var html        = '',
        option      = this.option,
        start       = option.pageNum-option.pageRange > 0 ? option.pageNum-option.pageRange : 1,
        end         = option.pageNum+option.pageRange < option.pages ? option.pageNum+option.pageRange : option.pages,
        pageArray   = [];
    //上一页数据
    pageArray.push({
        name : '<<',
        value : option.prePage,
        disabled : !option.hasPreviousPage
    });
    //中间数字
    for(var i = start; i<=end; i++){
        pageArray.push({
            name : i,
            value : i,
            active : i == option.pageNum,
        });
    }
    //下一页数据
    pageArray.push({
        name : '>>',
        value : option.nextPage,
        disabled : !option.hasNextPage
    });
    //开启渲染
    html = _mm.renderHtml(templateIndex,{
        pageArray : pageArray,
        pageNum   : option.pageNum,
        pages     : option.pages
    })
    return html;
}

module.exports = Pagination;