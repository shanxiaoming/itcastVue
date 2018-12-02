<template>
    <el-container>
        <el-header>
            <el-row>
                <el-col :span="3">
                    <div class="grid-content bg-purple">
                        <img src="@/assets/img/logo.png" alt="">
                    </div>
                </el-col>
                <el-col :span="19" class="middle">
                    <!-- <div class="grid-content bg-purple-light"></div> -->
                    <h3>电商后台管理系统</h3>
                </el-col>
                <el-col :span="2" class="loginOut">
                    <!-- <div class="grid-content bg-purple"></div> -->
                    <a href="#" @click.prevent="handleSignOut">退出</a>
                </el-col>
            </el-row>
        </el-header>
        <el-container>
            <el-aside width="220px">
                <el-menu   :router='true' :unique-opened='true'>
                    <!-- 第一个 -->
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>用户管理</span>
                        </template>
                        <el-menu-item index="user">
                            <i class="el-icon-menu"></i>
                            <span>用户列表</span>
                        </el-menu-item>
                    </el-submenu>
                    <!-- 第二个 -->
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>权限管理</span>
                        </template>
                        <el-menu-item index="role">
                            <i class="el-icon-menu"></i>
                            角色列表
                        </el-menu-item>
                        <el-menu-item index="right">
                            <i class="el-icon-menu"></i>
                            权限列表
                        </el-menu-item>
                    </el-submenu>
                    <!-- 第三个 -->
                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>商品管理</span>
                        </template>
                        <el-menu-item index="1-4">
                            <i class="el-icon-menu"></i>
                            商品列表
                        </el-menu-item>
                        <el-menu-item index="1-4">
                            <i class="el-icon-menu"></i>
                            分类参数
                        </el-menu-item>
                        <el-menu-item index="1-4">
                            <i class="el-icon-menu"></i>
                            商品分类
                        </el-menu-item>
                    </el-submenu>
                    <!-- 第四个 -->
                    <el-submenu index="4">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>订单管理</span>
                        </template>
                        <el-menu-item index="1-4">
                            <i class="el-icon-menu"></i>
                            订单列表
                        </el-menu-item>
                    </el-submenu>
                    <!-- 第五个 -->
                    <el-submenu index="5">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>数据统计</span>
                        </template>
                        <el-menu-item index="1-4">
                            <i class="el-icon-menu"></i>
                            数据报表
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
    beforeCreate() {
        const token=localStorage.getItem('token');
        if(!token){
            this.$router.push({name:'Login'})
        }
    },
    methods:{
        handleSignOut:function(){
            localStorage.clear();
            this.$message.success('退出成功！');
            this.$router.push({name:'Login'});
        }
    }
   
};
</script>

<style>
.el-container {
  height: 100%;
}

.el-header {
  background-color: #b3c0d1;
}
.el-header .middle {
  text-align: center;
}
.el-header .loginOut {
  line-height: 62px;
}
.el-header .loginOut a{
    text-decoration: none;
}

.el-container .el-aside{
    background-color: #d3dce6;
    
}
.el-container .el-main{
    background-color: #e9eef3;
}
</style>
