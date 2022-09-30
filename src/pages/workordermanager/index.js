import Vue from 'vue'
import App from './index.vue'
import $ from "jquery";
import httpRequest from '@/assets/js/httpRequest'
import router from './router.js'
import 'vant/lib/index.css';
import store from './store'
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad,{
     preLoad: 1.3,
     error: require('../../assets/img/unShowPicture.jpg'),
     loading: 'https://s1.ax1x.com/2020/08/03/aambDJ.th.gif',
     attempt: 1
})
import { Button,Search,Icon,Col, Row,Field,Checkbox, CheckboxGroup,Popup , List,Uploader, Dialog, DatetimePicker,Notify,Overlay, Pagination, Toast, RadioGroup, Radio, Step, Steps, Loading, ActionSheet } from 'vant';
Vue.prototype.$ = $;
Vue.prototype.$http = httpRequest 
Vue.prototype.$window = window 
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
Vue.use(Toast)
Vue.use( Pagination )
Vue.use(Overlay);
Vue.use(Notify);
Vue.use(DatetimePicker)
Vue.use(Dialog)
Vue.use(Uploader)
Vue.use(List)
Vue.use(Popup);
Vue.use(Field);
Vue.use(Button);
Vue.use(Search);
Vue.use(Icon);
Vue.use(Col);
Vue.use(Row);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Step);
Vue.use(Steps);
Vue.use(Loading);
Vue.use(ActionSheet);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')