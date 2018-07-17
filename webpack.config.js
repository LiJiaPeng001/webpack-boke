
const path                  = require('path');
const webpack               = require('webpack')
const uglify                = require('uglifyjs-webpack-plugin');
const htmlPlugin            = require('html-webpack-plugin');
const extractTextPlugin     = require("extract-text-webpack-plugin");

//配置环境变量   env==开发环境   online 生产环境
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'env';
console.log(WEBPACK_ENV);

var getHtml = function (name, title) {
    return {
        template    : './src/view/' + name + '.html',
        filename    : 'view/'+name + '.html',
        favicon     : './favicon.ico',
        title       : title,
        inject      : true,
        hash        : true,
        chunks      : ['common',name]  //chunks 默认会在生成的 html 文件中引用所有的 js 文件，当然你也可以指定引入哪些特定的文件。
    };
};
var webpackConfig = {
    entry: {
        'common' : path.resolve(__dirname,'./src/page/common/index.js'),
        'index'  : path.resolve(__dirname,'./src/page/index/index.js'),
        'info'   : path.resolve(__dirname,'./src/page/info/index.js'),
        'about'  : path.resolve(__dirname,'./src/page/about/index.js'),
    },
    output: {
        path        : __dirname + '/dist/',
        publicPath  : '/dist/',
        // publicPath  : 'http://mcljp.com/dist/',
        filename    : 'js/[name].js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use : extractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: 'css-loader' },
                    ]
                })
            },
            {
                test: /\.(png|jpg|gif)/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 5000,
                        outputPath: 'resource/'
                    }
                }]
            },
            {
                test: /\.(js|jsx)$/,
                use: [
                    { loader: "babel-loader" },
                ],
                exclude: /node_modules/
            },
            // 字体图标的配置
            {
                test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'resource/[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.string$/, 
                loader: 'html-loader',
                query : {
                    minimize : true,
                    removeAttributeQuotes : false
                }
            } 
        ]
    },
    resolve : {
        alias : {
            node_modules    : path.resolve(__dirname, './node_modules'),
            util            : path.resolve(__dirname, './src/util'),
            page            : path.resolve(__dirname, './src/page'),
            service         : path.resolve(__dirname, './src/service'),
            image           : path.resolve(__dirname, './src/image'),
        }
    },
    plugins: [
        //压缩js
        new uglify(),
        // 独立通用模块到js/base.js
        new webpack.optimize.CommonsChunkPlugin({
            name : 'common',
            filename : 'js/base.js'
        }),
        new htmlPlugin(getHtml('index', '主页')),
        new htmlPlugin(getHtml('info', '内容')),
        new htmlPlugin(getHtml('about', '关于我')),
        //单独打包css
        new extractTextPlugin('css/[name].css'),
        new webpack.BannerPlugin('买菜的家朋版权所有'),
    ],
    devServer: {
        port: '8181',
        proxy : [{
            context: ['/admin'],
            target: "http://mcljp.com",
            changeOrigin : true
        }]
    }
}

module.exports = webpackConfig;