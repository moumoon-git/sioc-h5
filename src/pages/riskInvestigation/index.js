/*
 * @Author: liukanglin
 * @Date: 2020-07-21 08:40:21
 * @LastEditors: yaoweixin
 * @LastEditTime: 2020-12-11 17:52:08
 * @Desc: file content
 * @FilePath: \vue-cli-multiPage-master\src\pages\riskInvestigation\index.js
 */
import Vue from 'vue'
import App from './index.vue'
import $ from "jquery";
import httpRequest from '@/assets/js/httpRequest'
import { Tab,Tabs,Uploader,Calendar,Field,Toast,Pagination,RadioGroup, Radio,Checkbox, CheckboxGroup, Overlay} from 'vant';
import router from './router.js'
import store from './store'


router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
      document.title = to.meta.title
  }else{
    document.title = ""
  }
  next()
})
Vue.prototype.$ = $;
Vue.prototype.$http = httpRequest 
Vue.prototype.$getQueryString=function getQueryString(name) {                    
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var reg_rewrite = new RegExp("(^|/)" + name + "/([^/]*)(/|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  var q = window.location.pathname.substr(1).match(reg_rewrite);
  if (r != null) {
    return unescape(r[2]);
  } else if (q != null) {
    return unescape(q[2]);
  } else {
    return null;
  }
}


Vue.use(Overlay);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Uploader);
Vue.use(Calendar);
Vue.use(Field);
Vue.use(Toast);
Vue.use(Pagination); 
Vue.use(RadioGroup);
Vue.use(Radio);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')