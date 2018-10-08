
'use strict';
require('./index.css');
require('page/index/index.css');
require('page/common/header/index.js');
require('page/common/mine/index.js');
let header              = require('page/common/header/index.js');

var about = {
    init : function(){
        header.init({
            name : '关于我'
        })
    }
};

module.exports = about.init();