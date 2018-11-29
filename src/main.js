// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router/index';
import MyHttpServer from '@/plugin/axios.js';
import moment from 'moment';


import '@/assets/css/reset.css';
//引入element-ui的样式文件
import ElementUI from 'element-ui';
//引入重置样式文件
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false;
//使用element-ui插件
Vue.use(ElementUI);

// 使用axios插件
Vue.use(MyHttpServer);

//全局过滤器--日期格式化
Vue.filter('fmDate',function(time){
  return moment(time).format('YYYY-MM-DD');
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
  