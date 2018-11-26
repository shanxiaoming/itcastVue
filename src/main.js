// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router/index';
import ElementUI from 'element-ui';
//引入element-ui的样式文件
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false;
//使用element-ui插件
Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
  