
'use strict';
var Hogan = require('hogan.js');
var _mm = {
    // 网络请求
    request : function(param){
        var _this = this;
        $.ajax({
            type        : param.method  || 'get',
            url         : param.url     || '',
            dataType    : param.type    || 'json',
            data        : param.data    || '',
            success     : function(res){
                // 请求成功
                if(0 === res.status){
                    typeof param.success === 'function' && param.success(res.data, res.msg);
                }
                // 没有登录状态，需要强制登录
                else if(10 === res.status){
                    _this.doLogin();
                }
                // 请求数据错误
                else if(1 === res.status){
                    typeof param.error === 'function' && param.error(res.msg);
                }else if(2 === res.status){
                    typeof param.error === 'function' && param.error(res.msg);
                }
            },
            error       : function(err){
                typeof param.error === 'function' && param.error(err.statusText ||  err.msg);
            }
        });
    },
    // 本地存储
    setStorage(name, data){
        let dataType = typeof data;
        // json对象
        if(dataType === 'object'){
            window.sessionStorage.setItem(name, JSON.stringify(data));
        }
        // 基础类型
        else if(['number','string','boolean'].indexOf(dataType) >= 0){
            window.sessionStorage.setItem(name, data);
        }
        // 其他不支持的类型
        else{
            alert('该类型不能用于本地存储');
        }
    },
    // 取出本地存储内容
    getStorage(name){
        let data = window.sessionStorage.getItem(name);
        if(data){
            return JSON.parse(data);
        }
        else{
            return '';
        }
    },
    // 删除本地存储
    removeStorage(name){
        window.sessionStorage.removeItem(name);
    },
    // 获取url参数
    getUrlParam : function(name){
        var reg     = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var result  = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    },
    // 渲染html模板
    renderHtml : function(htmlTemplate, data){
        var template    = Hogan.compile(htmlTemplate),
            result      = template.render(data);
        return result;
    },
    // 成功提示
    successTips : function(msg){
        alert(msg || '操作成功！');
    },
    // 错误提示
    errorTips : function(msg){
        alert(msg || '哪里不对了~');
    },
    goHome : function(){
        window.location.href = './index.html';
    }
};

module.exports = _mm;