/*
 * @Author: yaoweixin
 * @Date: 2020-07-13 15:59:20
 * @LastEditors: yaoweixin
 * @LastEditTime: 2020-09-27 20:52:47
 * @Description: file content
 * @FilePath: \vue-cli-multiPage-master\vue.config.js
 */
let glob = require('glob')
let path = require('path')

function resolve (dir) {
    return path.join(__dirname, '.', dir)
}

//配置pages多页面获取当前文件夹下的html和js
function getEntry(globPath) {
    let entries = {}, tmp, htmls = {};

    // 读取src/pages/**/底下所有的html文件
    glob.sync(globPath+'html').forEach(function(entry) {
        tmp = entry.split('/').splice(-3);
        htmls[tmp[1]] = entry
    })

    // 读取src/pages/**/底下所有的js文件
    glob.sync(globPath+'js').forEach(function(entry) {
        
        tmp = entry.split('/').splice(-3);
        entries[tmp[1]] = {
            entry:entry.substr(0,entry.lastIndexOf('/'))+'/index.js',
            template: htmls[tmp[1]] ? htmls[tmp[1]] : 'index.html', //  当前目录没有有html则以共用的public/index.html作为模板
            filename:tmp[1] + '.html'   //  以文件夹名称.html作为访问地址
        };
    });
    return entries;
}
let htmls = getEntry('./src/pages/**/*.');

module.exports = {
    pages:htmls,
    publicPath: './',           //  解决打包之后静态文件路径404的问题
    outputDir: 'output',        //  打包后的文件夹名称，默认dist
    configureWebpack: {
        resolve: {
            extensions:['.js','.vue','.json','.less'],
            alias: {
                '@': resolve('src')
            }
        },
        externals: {
            'AMap': 'AMap' // 高德地图配置
        }
    },
    // chainWebpack: config => {
    //     config
    //         .plugin('define')
    //         .tap(args => { 
    //             args[0].NODE_ENV = JSON.stringify('ABC')
    //             return args
    //         })
    // },
    devServer: {
        open: true,             //  npm run serve 自动打开浏览器
        disableHostCheck: true,
        index: '/home.html',    //  默认启动页面
        overlay: {
            warnings: false,
            errors: false
        }
    }
}