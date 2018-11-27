<template>
  <div class="login-wrap">
  
  
  
    <el-form :label-position="labelPosition" :model="formData" class="login-form">
  
      <h3>用户登录</h3>
  
      <el-form-item label="用户名">
  
  
  
        <el-input v-model="formData.username"></el-input>
  
  
  
      </el-form-item>
  
  
  
      <el-form-item label="密码">
  
  
  
        <el-input v-model="formData.password"></el-input>
  
  
  
      </el-form-item>
  
      <el-button type="primary" class="login-btn" @click.prevent="handleLogin">登录</el-button>
  
  
  
    </el-form>
  
  
  
  </div>
</template>

<script>

  export default {
  
    data() {
  
      return {
  
        labelPosition: 'top',
  
        formData: {
  
          username: '',
  
          password: ''
  
        }
  
      };
  
    },
    methods:{
      handleLogin:function(){
        this.$axios.post('/login',this.formData)
        .then((res)=>{
          console.log(res);
          const{data,
          meta:{msg,status}
          }=res.data;
          // console.log(msg);
          
          if(status==200){
            //登录成功
            //保存token
            localStorage.setItem('token',data.token);
            this.$router.push({name:'Home'});
            this.$message.success(msg);
          }else{
            this.$message.error(msg);
          }
        })
        .catch((err)=>{
          console.log(err)
        })
      }
    }
  
  };
</script>
 
<style>
  .login-wrap {
  
    height: 100%;
  
    background-color: #324152;
  
    /* 弹性盒子布局 */
  
    display: flex;
  
    justify-content: center;
  
    align-items: center;
  
  }
  
  
  
  .login-wrap .login-form {
  
    width: 400px;
  
    background-color: #fff;
  
    border-radius: 5px;
  
    padding: 30px;
  
  }
  
  
  
  .login-wrap .login-btn {
  
    width: 100%;
  
  }
</style>
