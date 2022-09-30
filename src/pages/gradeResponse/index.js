import Vue from 'vue'
import App from './index.vue'
import $ from "jquery";
import httpRequest from '@/assets/js/httpRequest'
import { Tab, Tabs, DatetimePicker, Popup, Uploader, ActionSheet, Checkbox, CheckboxGroup, Search, Collapse, CollapseItem, Dialog, Field, Toast, Overlay, Notify, Loading, ImagePreview } from 'vant';
import router from './router.js'



Vue.prototype.$ = $;
Vue.prototype.$http = httpRequest
Vue.prototype.$getQueryString = function getQueryString(name) {
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
// Vue.use(Icon);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(DatetimePicker);
Vue.use(Popup);
Vue.use(Uploader);
Vue.use(ActionSheet);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Search);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Dialog);
Vue.use(Field);
Vue.use(Toast);
Vue.use(Overlay);
Vue.use(Notify);
Vue.use(Loading);
Vue.use(ImagePreview);


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')