<template>
  <el-card class="box-card">
    <!-- 面包屑组件 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
    <el-row class="searchRow">
      <el-col :span=24>
        <el-input placeholder="请输入内容" v-model="query" class="searchInput" clearable @clear="clearQuery">
          <el-button slot="append" icon="el-icon-search" @click="queryUser()"></el-button>
        </el-input>
        <el-button type="success" @click="addUser.dialogFormVisible=true">添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%" stripe>
      <el-table-column type="index" width="50">
      </el-table-column>
      <el-table-column prop="username" label="姓名" width="100">
      </el-table-column>
      <el-table-column prop="email" label="邮箱" width="150">
      </el-table-column>
      <el-table-column prop="mobile" label="电话" width="150">
      </el-table-column>
      <el-table-column label="创建时间" width="150">
        <template slot-scope="scope">
          {{scope.row.create_time|fmDate}}
        </template>
      </el-table-column>
      <el-table-column prop="mg_state" label="用户状态" width="100">
        <template slot-scope="scope">
          <el-switch active-color="#13ce66" v-model="scope.row.mg_state" inactive-color="#ff4949" @change="editUserState(scope.row.id,scope.row.mg_state)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle size="mini" plain @click="handleEditUser(scope.row)"></el-button>
          <el-button type="success" icon="el-icon-check" circle size="mini" plain @click="handleEditRole(scope.row)"></el-button>
          <el-button type="danger" icon="el-icon-delete" circle size="mini" plain @click="handleDelUser(scope.row.id)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页功能 -->
    <div class="block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page.pagenum" :page-sizes="[2, 4, 6, 8]" :page-size="page.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="totalPage">
      </el-pagination>
    </div>
    <!-- 添加用户对话框 -->
    <el-dialog title="添加用户" :visible.sync="addUser.dialogFormVisible">
      <el-form :model="addUser.form">
        <el-form-item label="用户名" label-width="100px">
          <el-input v-model="addUser.form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密 码" label-width="100px">
          <el-input v-model="addUser.form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="100px">
          <el-input v-model="addUser.form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="100px">
          <el-input v-model="addUser.form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addUser.dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddUser">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑用户对话框 -->
    <el-dialog title="编辑用户" :visible.sync="editUser.dialogFormVisible" @close='close()'>
      <el-form :model="editUser.form">
        <el-form-item label="用户名" label-width="100px">
          <el-input v-model="editUser.form.username" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="100px">
          <el-input v-model="editUser.form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="100px">
          <el-input v-model="editUser.form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="handleEditUserSend(editUser.form.id)">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分配角色 -->
    <el-dialog title="分配角色" :visible.sync="editRole.dialogFormVisible">
      <el-form :model="editRole.form">
        <el-form-item label="用户名" label-width="100px">
          {{editRole.form.username}}
        </el-form-item>
        <el-form-item label="角色" label-width="100px">
          <el-select v-model="editRole.currRoleId" placeholder="请选择">
            <el-option :label="item.roleName" v-for="item in editRole.resData" :value="item.id" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editRole.dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEditRoleSend">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      page: { pagenum: 1, pagesize: 4 },
      totalPage: -1,
      query: "",
      //添加用户的属性
      addUser: {
        dialogFormVisible: false,
        form: {
          username: "",
          password: "",
          email: "",
          mobile: ""
        }
      },
      editUser: {
        dialogFormVisible: false,
        form: {}
      },
      editRole: {
        dialogFormVisible: false,
        resData: [],
        currRoleId:-1,
        form: {},
      }
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    //获取用户列表
    getUserList: async function() {
      // 需要授权的 API ，必须在请求头中使用 Authorization 字段提供 token 令牌
      const AUTH_TOKEN = localStorage.getItem("token");
      this.$axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      const res = await this.$axios.get(
        `users?query=${this.query}&pagenum=${this.page.pagenum}&pagesize=${
          this.page.pagesize
        }`
      );
      // console.log(res);
      var { meta: { status, msg }, data } = res.data;
      // console.log(data);
      this.tableData = data.users;
      this.totalPage = data.total;
    },
    //分页功能相关方法
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.page.pagesize = val;
      // this.page.pagenum=1;
      this.getUserList();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.page.pagenum = val;
      this.getUserList();
    },
    //搜索相关用户
    queryUser: function() {
      this.getUserList();
    },
    //清空搜索框，重新请求用户列表
    clearQuery: function() {
      this.getUserList();
    },
    //添加用户功能
    handleAddUser: async function(res) {
      var res = await this.$axios.post("users", this.addUser.form);
      var { meta: { status, msg }, data } = res.data;
      this.addUser.dialogFormVisible = false;
      //  console.log(status);
      if (status === 201) {
        this.$message.success(msg);
        this.getUserList();
        this.addUser.form = {};
      } else {
        this.$message.error(msg);
      }
    },
    //修改用户状态
    editUserState: async function(id, type) {
      const res = this.$axios.put(`users/${id}/state/${type}`);
    },
    //删除用户
    handleDelUser: function(id) {
      this.$confirm("是否删除该用户?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$axios.delete(`users/${id}`);
          const { meta: { status, msg }, data } = res.data;
          if (status === 200) {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.getUserList();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //编辑用户--显示用户信息
    handleEditUser: function(data) {
      this.editUser.form = data;
      this.editUser.dialogFormVisible = true;
    },
    //编辑用户--发送编辑请求
    handleEditUserSend: async function(id) {
      var editdata = {
        email: this.editUser.form.email,
        mobile: this.editUser.form.mobile
      };
      var res = await this.$axios.put(`users/${id}`, editdata);
      var { meta: { status, msg }, data } = res.data;
      if (status === 200) {
        this.editUser.dialogFormVisible = false;
        this.$message.success("编辑成功");
      } else {
        this.$message.error(msg);
      }
    },
    //编辑用户时点击取消的操作
    close() {
      this.editUser.dialogFormVisible = false;
      this.getUserList();
    },
    //编辑用户角色
    handleEditRole: async function(data1) {
      this.editRole.form = data1;
      this.editRole.dialogFormVisible = true;
      //获取所有角色列表，并展示
      var res = await this.$axios.get("roles");
      var {meta:{ status, msg }, data } = res.data;
      this.editRole.resData = data;
      // 获取当前用户的角色Id
      var res1=await this.$axios.get(`users/${data1.id}`);
       this.editRole.currRoleId=res1.data.data.rid;
    },
    //提交修改用户角色的请求
    handleEditRoleSend:async function(){
      var currId=this.editRole.currRoleId;
      var res=await this.$axios.put(`users/${this.editRole.form.id}/role`,{rid:currId});
      const {meta:{status,msg},data}=res.data;
      if(status===200){
        this.$message.success(msg);
        this.editRole.dialogFormVisible=false;
      }else{
        this.$message.error(msg);
      }
    }
   
  }
};
</script>

<style>
.box-card {
  height: 100%;
}
.searchInput {
  width: 300px;
}
.searchRow {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
