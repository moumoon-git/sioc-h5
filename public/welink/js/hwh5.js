!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("hwh5",[],t):"object"==typeof exports?exports.hwh5=t():e.hwh5=t()}(this,function(){return function(e){function t(a){if(n[a])return n[a].exports;var o=n[a]={i:a,l:!1,exports:{}};return e[a].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,a){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:a})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=5)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=function(){return new Date-0+""+Math.floor(1e4*Math.random())},o={},r=function(e){e=JSON.parse(e),o[e.callbackId](e)},i=function(e,t){var n="cb"+a();return new Promise(function(a,r){o[n]=function(e){if(e.data&&"string"==typeof e.data&&(e.data=decodeURIComponent(escape(atob(e.data)))),"error"===e.type){if("getCache"===t.funcName)return void a(null);r(e.data)}else if("fetch"===t.funcName)a({text:function(){return new Promise(function(t,n){t(e.data)})},json:function(){return new Promise(function(t,n){try{e.data=JSON.parse(e.data)}catch(t){e.data=t}t(e.data)})}});else if("fetchInternet"===t.funcName){var n=JSON.parse(e.data),o=n.statusCode,i=n.header,c=n.body;a({status:o,headers:i,text:function(){return new Promise(function(e,t){e(c)})},json:function(){return new Promise(function(e,t){e(c)})}})}else if("getCache"===t.funcName&&"string"==typeof e.data&&"undefine"===e.data)a(null);else{if("string"==typeof e.data)try{e.data=JSON.parse(e.data)}catch(e){console.log(e)}a(e.data)}},e(n)})};t.callbackNative=r,t.callNativeFunction=i},function(e,t,n){(function(t){var n;n="undefined"!=typeof window?window:void 0!==t?t:"undefined"!=typeof self?self:{},e.exports=n}).call(t,n(7))},function(e,t,n){"use strict";e.exports=[{apiName:"deviceInfo",nativeName:"getDeviceInfo"},{apiName:"appInfo",nativeName:"getAppInfo"},{apiName:"userInfo",nativeName:"getUserInfo"},{apiName:"fetch",nativeName:"fetch"},{apiName:"fetchInternet",nativeName:"fetchInternet"},{apiName:"networkStatus",nativeName:"getNetworkStatus"},{apiName:"navTitle",nativeName:"setNavTitle"},{apiName:"goBack",nativeName:"goBack"},{apiName:"close",nativeName:"close"},{apiName:"imagePicker",nativeName:"imagePicker"},{apiName:"hwa",nativeName:"hwa"},{apiName:"selectContact",nativeName:"selectContact"},{apiName:"cache",nativeName:"cache"},{apiName:"showNavBar",nativeName:"showNavBar"},{apiName:"close",schema:""},{apiName:"log",nativeName:"log"},{apiName:"downloadToMDM",nativeName:"downloadToMDM"},{apiName:"existInMDM",nativeName:"existInMDM"},{apiName:"openFileInMDM",nativeName:"openFileInMDM"},{apiName:"preventScreenshots",nativeName:"preventScreenshots"},{apiName:"emitEvent",nativeName:"emitEvent"},{apiName:"encryptFile",nativeName:"encryptFile"},{apiName:"getMDMRootPath",nativeName:"getMDMRootPath"}]},function(e,t,n){"use strict";e.exports=[{apiName:"viewContactInfo",schema:"ui://welink.contacts/userDetailController"},{apiName:"openEmail",schema:"ui://welink.mail/newMail"},{apiName:"openWebview",schema:""},{apiName:"contactInfo",schema:"method://welink.contacts/getUserDetail"},{apiName:"refreshTodo",schema:"method://welink.todo/h5RefreshTodo"},{apiName:"getIMGroupList",schema:"method://welink.im/getGroupDetailList"},{apiName:"createIMGroupChat",schema:"ui://welink.im/imCreateGroupChat"},{apiName:"sendIMCard",schema:"ui://welink.im/shareCardMessage"},{apiName:"openIMChat",schema:"ui://welink.im/gotoChatController"}]},function(e,t,n){"use strict";e.exports=[{apiName:"toast"},{apiName:"loading"},{apiName:"exceptionTip"},{apiName:"addEventListener"}]},function(e,t,n){"use strict";var a=n(6),o=function(e){return e&&e.__esModule?e:{default:e}}(a);n(16),(0,o.default)(),e.exports=HWH5},function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}var o=n(1),r=a(o),i=n(2),c=a(i),u=n(3),s=a(u),f=n(4),l=a(f),d=n(8),p=a(d),m=n(9),h=a(m),v=n(14),g=a(v),y=n(15),N=a(y),w=n(0),b=function(e,t){for(var n=0;n<e.length;n++)!function(n){var a=e[n].apiName;t[a]=function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return new Promise(function(e,n){var o=p.default.subscribe("hwh5ready",function(){HWH5[a].apply(r.default,t).then(function(t){e(t)}).catch(function(e){n(e)}),o.remove()})})}}(n)},x=function(){(0,h.default)(),(0,g.default)(),(0,N.default)(),r.default.HWH5.callbackNative=w.callbackNative},I=function(){"undefined"!=typeof HWH5&&HWH5.callMethod?x():(r.default.HWH5={},b(c.default,r.default.HWH5),b(s.default,r.default.HWH5),b(l.default,r.default.HWH5),r.default._HWH5Init=function(){x(),p.default.publish("hwh5ready")})};e.exports=I},function(e,t){var n;n=function(){return this}();try{n=n||Function("return this")()||(0,eval)("this")}catch(e){"object"==typeof window&&(n=window)}e.exports=n},function(e,t,n){"use strict";var a=function(){var e={},t=e.hasOwnProperty;return{subscribe:function(n,a){t.call(e,n)||(e[n]=[]);var o=e[n].push(a)-1;return{remove:function(){delete e[n][o]}}},publish:function(n,a){t.call(e,n)&&e[n].forEach(function(e){e(void 0!==a?a:{})})}}}();e.exports=a},function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}var o=n(0),r=n(10),i=a(r),c=n(3),u=a(c),s=function(e){return(0,o.callNativeFunction)(function(t){var n=JSON.stringify({url:e.uri||e.url||e.schema+(e.data?"?"+i.default.stringify(e.data):""),callbackId:t});HWH5.openURI(n)},e)},f={viewContactInfo:["w3account","employeeNumber","personMail"],contactInfo:["w3accounts","employeeNumbers","personMails"],refreshTodo:[{name:"isRefresh",default:1},"reserve1","reserve2"]},l=function(e,t){HWH5[e]=function(n,a){if("openWebview"===e)t=n.url||n.uri,n=null;else if(e in f)for(var o=f[e],r=0;r<o.length;r++){var i=o[r];"string"==typeof i?n[i]=n[i]||"":n[i.name]=n[i.name]||i.default}return s({schema:t,data:n})}},d=function(){for(var e=0;e<u.default.length;e++){var t=u.default[e];l(t.apiName,t.schema)}};e.exports=d},function(e,t,n){"use strict";function a(e){switch(e.arrayFormat){case"index":return function(t,n,a){return null===n?[r(t,e),"[",a,"]"].join(""):[r(t,e),"[",r(a,e),"]=",r(n,e)].join("")};case"bracket":return function(t,n){return null===n?r(t,e):[r(t,e),"[]=",r(n,e)].join("")};default:return function(t,n){return null===n?r(t,e):[r(t,e),"=",r(n,e)].join("")}}}function o(e){var t;switch(e.arrayFormat){case"index":return function(e,n,a){if(t=/\[(\d*)\]$/.exec(e),e=e.replace(/\[\d*\]$/,""),!t)return void(a[e]=n);void 0===a[e]&&(a[e]={}),a[e][t[1]]=n};case"bracket":return function(e,n,a){return t=/(\[\])$/.exec(e),e=e.replace(/\[\]$/,""),t?void 0===a[e]?void(a[e]=[n]):void(a[e]=[].concat(a[e],n)):void(a[e]=n)};default:return function(e,t,n){if(void 0===n[e])return void(n[e]=t);n[e]=[].concat(n[e],t)}}}function r(e,t){return t.encode?t.strict?c(e):encodeURIComponent(e):e}function i(e){return Array.isArray(e)?e.sort():"object"==typeof e?i(Object.keys(e)).sort(function(e,t){return Number(e)-Number(t)}).map(function(t){return e[t]}):e}var c=n(11),u=n(12),s=n(13);t.extract=function(e){return e.split("?")[1]||""},t.parse=function(e,t){t=u({arrayFormat:"none"},t);var n=o(t),a=Object.create(null);return"string"!=typeof e?a:(e=e.trim().replace(/^(\?|#|&)/,""))?(e.split("&").forEach(function(e){var t=e.replace(/\+/g," ").split("="),o=t.shift(),r=t.length>0?t.join("="):void 0;r=void 0===r?null:s(r),n(s(o),r,a)}),Object.keys(a).sort().reduce(function(e,t){var n=a[t];return Boolean(n)&&"object"==typeof n&&!Array.isArray(n)?e[t]=i(n):e[t]=n,e},Object.create(null))):a},t.stringify=function(e,t){t=u({encode:!0,strict:!0,arrayFormat:"none"},t);var n=a(t);return e?Object.keys(e).sort().map(function(a){var o=e[a];if(void 0===o)return"";if(null===o)return r(a,t);if(Array.isArray(o)){var i=[];return o.slice().forEach(function(e){void 0!==e&&i.push(n(a,e,i.length))}),i.join("&")}return r(a,t)+"="+r(o,t)}).filter(function(e){return e.length>0}).join("&"):""}},function(e,t,n){"use strict";e.exports=function(e){return encodeURIComponent(e).replace(/[!'()*]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}},function(e,t,n){"use strict";function a(e){if(null===e||void 0===e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var o=Object.getOwnPropertySymbols,r=Object.prototype.hasOwnProperty,i=Object.prototype.propertyIsEnumerable;e.exports=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},n=0;n<10;n++)t["_"+String.fromCharCode(n)]=n;if("0123456789"!==Object.getOwnPropertyNames(t).map(function(e){return t[e]}).join(""))return!1;var a={};return"abcdefghijklmnopqrst".split("").forEach(function(e){a[e]=e}),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},a)).join("")}catch(e){return!1}}()?Object.assign:function(e,t){for(var n,c,u=a(e),s=1;s<arguments.length;s++){n=Object(arguments[s]);for(var f in n)r.call(n,f)&&(u[f]=n[f]);if(o){c=o(n);for(var l=0;l<c.length;l++)i.call(n,c[l])&&(u[c[l]]=n[c[l]])}}return u}},function(e,t,n){"use strict";function a(e,t){try{return decodeURIComponent(e.join(""))}catch(e){}if(1===e.length)return e;t=t||1;var n=e.slice(0,t),o=e.slice(t);return Array.prototype.concat.call([],a(n),a(o))}function o(e){try{return decodeURIComponent(e)}catch(o){for(var t=e.match(i),n=1;n<t.length;n++)e=a(t,n).join(""),t=e.match(i);return e}}function r(e){for(var t={"%FE%FF":"��","%FF%FE":"��"},n=c.exec(e);n;){try{t[n[0]]=decodeURIComponent(n[0])}catch(e){var a=o(n[0]);a!==n[0]&&(t[n[0]]=a)}n=c.exec(e)}t["%C2"]="�";for(var r=Object.keys(t),i=0;i<r.length;i++){var u=r[i];e=e.replace(new RegExp(u,"g"),t[u])}return e}var i=new RegExp("%[a-f0-9]{2}","gi"),c=new RegExp("(%[a-f0-9]{2})+","gi");e.exports=function(e){if("string"!=typeof e)throw new TypeError("Expected `encodedURI` to be of type `string`, got `"+typeof e+"`");try{return e=e.replace(/\+/g," "),decodeURIComponent(e)}catch(t){return r(e)}}},function(e,t,n){"use strict";var a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},o=n(0),r=n(2),i=function(e){return e&&e.__esModule?e:{default:e}}(r),c=function(e){return(0,o.callNativeFunction)(function(t){var n=JSON.stringify({funcName:e.funcName,data:e.data,callbackId:t});HWH5.callMethod(n)},e)},u=function(e,t){HWH5[e]||(HWH5[e]=function(n,o){return"fetch"!==e&&"fetchInternet"!==e||(n={url:n,method:o&&o.method||"get"},n=a(n,o)),"cache"===e&&(t=n&&n.key?"setCache":"getCache"),c({funcName:t,data:n})})},s=function(){for(var e=0;e<i.default.length;e++){var t=i.default[e];u(t.apiName,t.nativeName)}};e.exports=s},function(e,t,n){"use strict";var a=n(4),o=function(e){return e&&e.__esModule?e:{default:e}}(a),r=function(e){return function(t){return new Promise(function(n,a){e(t,n,a)})}},i=void 0,c=function(e){if(!i){var t=document,n=e.time||2e3,a=t.createElement("div"),o=t.createElement("span");a.className="weui-toast",o.className="txt",a.insertAdjacentHTML("beforeend",'<div class="weui-toast-wrapper"><span class="icon"></span></div>'),a.querySelector(".weui-toast-wrapper").insertAdjacentElement("beforeend",o),t.body.appendChild(a),i={show:function(e){i.isshowing||(i.isshowing=!0,o.innerText=e,setTimeout(function(){a.classList.add("show"),setTimeout(function(){a.classList.remove("show"),i.isshowing=!1},n)},200))},destroy:function(){i=null,t.body.removeChild(a)}}}return i},u={};u.toast=r(function(e,t,n){if(e&&"undefined"!==e){c(e).show(e.msg),void 0!==e.msg?t():n()}});var s=void 0,f=function(){if(!s){var e=document,t=e.createElement("div");t.className="h5-page-loadding",t.insertAdjacentHTML("beforeend",'<div class="loadding-wrapper"><div class="loadding-logo"></div><div class="loadding-logo-turn"></div></div>'),e.body.appendChild(t),s={show:function(){t.style.display="block"},close:function(){t.style.display="none"},destroy:function(){e.body.removeChild(t)}}}return s};u.loading=r(function(e,t,n){if(e&&"undefined"!==e){var a=f();e.status?a.show():a.close(),void 0!==e.status?t():n()}}),u.exceptionTip=r(function(e,t,n){if(e&&"undefined"!==e){if(e instanceof String)try{e=JSON.parse(e)}catch(e){console.log("data error: ",e)}var a=["noresource","nopermission","nopermission","noresource","noresource","noresource","noresource","resourcedelete"],o=document,r=o.createElement("div"),i="icon-big icon-big-"+a[e.flag],c=void 0;r.className="weui-popedom-box",r.insertAdjacentHTML("beforeend",'<div class="con"><i class="'+i+'"></i><p class="tip guide">'+e.msg+"</p></div>"),e.dom?(c=e.dom,c.appendChild(r)):o.body.appendChild(r),o.body.style.height=window.innerHeight||screen.height+"px",o.body.style.overflow="hidden",void 0!==e.flag&&void 0!==e.msg?t(!0):n(!1)}});var l={};u.addEventListener=r(function(e,t,n){e&&"undefined"!==e&&"undefined"!==e.type&&"undefined"!==e.func?(l[e.type]||(l[e.type]=[]),l[e.type].push(e.func),HWH5.eventListener[e.type]||(HWH5.eventListener[e.type]=function(){for(var t=0;t<l[e.type].length;t++){if(!1===l[e.type][t]())break}return!1}),t()):n()});var d=function(){for(var e=0;e<o.default.length;e++){var t=o.default[e].apiName;HWH5[t]=u[t]}HWH5.eventListener=[]};e.exports=d},function(e,t,n){"use strict";var a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o=n(1),r=function(e){return e&&e.__esModule?e:{default:e}}(o);r.default.HWH5={fetch:function(e,t){return"undefined"==typeof window?new Promise(function(t,n){t({json:function(){return new Promise(function(t,n){t({url:e})})}})}):(t=t||{},t.credentials="include",t.headers=t.headers||{Accepts:"application/json","Content-Type":"application/json"},r.default.fetch.call(r.default,e,t))},fetchInternet:function(e,t){return"undefined"==typeof window?new Promise(function(t,n){t({json:function(){return new Promise(function(t,n){t({url:e})})}})}):(t=t||{},t.credentials="include",t.headers=t.headers||{Accepts:"application/json","Content-Type":"application/json"},r.default.fetch.call(r.default,e,t))},callMethod:function(e){e=JSON.parse(e);var t=e,n=t.funcName,o=t.callbackId,i=t.data;if(o){var c={},u=void 0;if("setCache"===n||"getCache"===n){if("object"!==("undefined"==typeof localStorage?"undefined":a(localStorage)))throw new Error("Local Storage not available");u=localStorage}"getAppInfo"===n?c={versionCode:"18",versionName:"1.0.18",environment:"PRODUCTION",appName:"WeLink",language:"zh",fontSize:17}:"fetch"===e.funcName?c=i:"getUserInfo"===n?c={userType:"HWE",employeeNumber:"00288308",uid:"l00288308",userNameEN:"luoyiming",userNameZH:"罗一鸣"}:"getNetworkStatus"===n?c={status:!0,type:1}:"setNavTitle"===n?c={status:!0}:"goBack"===n?c={status:!0}:"imagePicker"===n?c=1===i.flag?{url:"本地上传后的临时路径"}:2===i.flag?{url:"拍照上传后的临时路径"}:{info:"未定义"}:"hwa"===n?c={status:!0}:"log"===n?c={status:!0}:"setCache"===n?(i.data=btoa(unescape(encodeURIComponent(i.data))),u.setItem(i.key,i.data)):"getCache"===n?c=u.getItem(i):"downloadToMDM"===n?c={status:1}:"existInMDM"===n?c={status:1}:"openFileInMDM"===n?c={status:1}:"preventScreenshots"===n?c={status:1}:"emitEvent"===n?c={status:1}:"encryptFile"===n?c={filePath:"xxx.yyy"}:"getMDMRootPath"===n?c={rootPath:"/welink/data/"}:"getDeviceInfo"===n&&(c={deviceID:"123456",deviceName:"414",osType:"ios",osVersion:"ios 11"}),r.default.HWH5.callbackNative(JSON.stringify({callbackId:o,type:"ok",data:c}))}},openURI:function(e){if(e=JSON.parse(e),e.callbackId){var t=void 0;e.url&&(e.url.indexOf("method://welink.contacts/getPersonInfo")>-1||e.url.indexOf("method://welink.contacts/getUserDetail")>-1?t={w3id:"l00288308"}:e.url.indexOf("method://welink.im/getGroupDetailList")>-1?t={data:[{groupID:"10010",groupName:"华为第一群组",groupState:1,groupType:0,lastMessage:{body:"我是中国人我爱中国",timeStamp:"1511429272522",senderid:"l00288308"},headPath:"/welink/xx/xx",headMembers:"00288308,00172071,00209912"},{groupID:"10011",groupName:"华为第二群组",groupState:1,groupType:0,lastMessage:{body:"我是华为人我爱华为",timeStamp:"1511429272522",senderid:"l00288308"},headPath:"/welink/xx/xx",headMembers:"00288308,00172071,00209912"}]}:e.url.indexOf("ui://welink.im/imCreateGroupChat")>-1?t={status:1}:e.url.indexOf("ui://welink.im/shareCardMessage")>-1?t={status:1}:e.url.indexOf("ui://welink.im/gotoChatController")>-1&&(t={status:1})),r.default.HWH5.callbackNative(JSON.stringify({callbackId:e.callbackId,type:"ok",data:t}))}}}}])});