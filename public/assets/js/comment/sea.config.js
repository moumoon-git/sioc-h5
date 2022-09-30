// seajs.config({
//     base: _MTONS.BASE_PATH,
//     alias: {
//         'plugins': './js/plugins',
//
//         /* modules */
//         'main': './js/main',
//         'authc': './js/authc',
//         'sidebox': './js/sidebox',
//         'post': './js/post',
//         'comment': './js/comment',
//         'avatar': './js/avatar',
//         'editor': './js/editor',
//         'view': './js/view',
//         'validate': './js/validate',
//         'markdown': './js/markdown',
//
//         /* vendors */
//         'pace': './pace.min',
//         'pjax': './jquery.pjax',
//         'lazyload': './lazyload/jquery.lazyload',
//
//         'share': './share.js/js/social-share.min.js',
//         'share-css': './css/share.min.css',
//
//         'tagsinput': '.js/bootstrap-tagsinput',
//
//         'highlight':'.js/highlight.pack.js',
//         'highlight-css': '.css//github.css',
//
//         'validation': './jquery.validate.min.js',
//         'validation-additional': './additional-methods.js',
//         'validation-localization': './messages_zh.min.js',
//
//         'tinymce': 'vendors/tinymce/tinymce.min',
//         'form': 'dist/js/jquery.form.min',
//
//         'owo': 'vendors/owo/OwO.min.js',
//         'owo-css': 'vendors/owo/OwO.min.css',
//
//         'codemirror': 'vendors/codemirror/lib/codemirror.js',
//         'codemirror-markdown': 'vendors/codemirror/mode/markdown/markdown',
//         'codemirror-css': 'vendors/codemirror/lib/codemirror.css',
//         'codemirror-theme': 'vendors/codemirror/theme/idea.css',
//         'codemirror-keymap': 'vendors/codemirror/keymap/sublime',
//
//         'marked': 'vendors/marked/marked.min',
//         'app.markdown': 'dist/js/app.markdown'
//     },
//
//     // 路径配置
//     paths: {
//         'vendors': _MTONS.BASE_PATH + '/dist/vendors',
//         'dist': _MTONS.BASE_PATH + '/dist'
//     },
//
//     // 变量配置
//     vars: {
//         'locale': 'zh-cn'
//     },
//
//     charset: 'utf-8',
//
//     debug: false
// });

// var __SEAJS_FILE_VERSION = '?v=1.3';
//
// seajs.on('fetch', function(data) {
// 	if (!data.uri) {
// 		return ;
// 	}
//
// 	if (data.uri.indexOf(app.mainScript) > 0) {
// 		return ;
// 	}
//
//    if (/\:\/\/.*?\/assets\/libs\/[^(common)]/.test(data.uri)) {
//        return ;
//    }
//
//    data.requestUri = data.uri + __SEAJS_FILE_VERSION;
//
// });
//
// seajs.on('define', function(data) {
// 	if (data.uri.lastIndexOf(__SEAJS_FILE_VERSION) > 0) {
// 	    data.uri = data.uri.replace(__SEAJS_FILE_VERSION, '');
// 	}
// });
