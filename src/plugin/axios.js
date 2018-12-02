import axios from 'axios';
const MyHttpServer={};
MyHttpServer.install=function(Vue){
    axios.defaults.baseURL="http://localhost:8888/api/private/v1/";
    
    // const AUTH_TOKEN=localStorage.getItem('token');
    // axios.defaults.headers.common['Authorization']=AUTH_TOKEN;

    axios.interceptors.request.use(function (config) {
        console.log('拦截器被触发')
    
        // console.log(config.url)
        if (config.url !== 'login') {
          const AUTH_TOKEN = localStorage.getItem('token')
          config.headers['Authorization'] = AUTH_TOKEN
        }
    
    
        // 在发送请求之前做些什么
        return config;
      }, function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
      });
    
      // 添加响应拦截器
      axios.interceptors.response.use(function (response) {
        // 对响应数据做点什么
        return response;
      }, function (error) {
        // 对响应错误做点什么
        return Promise.reject(error);
      });
    
  //  添加实例方法
      Vue.prototype.$axios=axios;
};
export default MyHttpServer;