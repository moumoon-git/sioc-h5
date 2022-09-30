/*
 * @Author: liukanglin
 * @Date: 2020-09-16 09:48:24
 * @LastEditors: yaoweixin
 * @LastEditTime: 2020-12-16 10:08:47
 * @Desc: file content
 * @FilePath: \vue-cli-multiPage-master\src\pages\garbageClassification\index.js
 */
import Vue from 'vue'
import App from './index.vue'
import $ from "jquery";
import httpRequest from '@/assets/js/httpRequest'
import { Tab, Tabs, DatetimePicker, Popup, Uploader, Collapse, CollapseItem, Field, Button, Cell, CellGroup, Picker, Switch, PasswordInput, NumberKeyboard, Stepper, ActionSheet, Dialog, Toast, RadioGroup, Radio,ImagePreview,Slider,Checkbox, CheckboxGroup, Overlay} from 'vant';
import router from './router.js'
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
Vue.use(Overlay);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(DatetimePicker);
Vue.use(Popup);
Vue.use(Uploader);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Field);
Vue.use(Button);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Picker);
Vue.use(Switch);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(PasswordInput);
Vue.use(NumberKeyboard);
Vue.use(Stepper);
Vue.use(ActionSheet);
Vue.use(Dialog);
Vue.use(Toast);
Vue.use(RadioGroup);
Vue.use(Radio);
Vue.use(ImagePreview);
Vue.use(Slider);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')