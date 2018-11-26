import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login.vue'
//在这个webpack模板中，@会自动指向项目中的src目录
Vue.use(Router)

export default new Router({
  routes: [
    {name:'Login',path:'/login',component:Login}
  ]
})
