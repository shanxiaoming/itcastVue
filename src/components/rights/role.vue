<template>
    <el-card>
        <my-bread lev1="权限管理" lev2="角色列表"></my-bread>
        <el-button class="addRole">添加角色</el-button>
        <!-- 显示角色列表 -->
        <el-table :data="RoleList" style="width: 100%" stripe>
            <el-table-column type="expand" width="150">
                <template slot-scope="scope">
                    <el-row v-for="(item1,i) in scope.row.children" :key="i">
                        <el-col :span="6">
                            <el-tag closable @close="delRight(scope.row,item1.id)">{{item1.authName}}</el-tag>
                            <i class="el-icon-arrow-right"></i>

                        </el-col>
                        <el-col :span="18">
                            <el-row v-for="(item2,i) in item1.children" :key="i">
                                <el-col :span="6">
                                    <el-tag type="info" closable @close="delRight(scope.row,item2.id)">{{item2.authName}}</el-tag>
                                    <i class="el-icon-arrow-right"></i>
                                </el-col>
                                <el-col :span="18">
                                    <el-tag type="warning" closable v-for="(item3,i) in item2.children" :key="i" @close="delRight(scope.row,item3.id)">
                                        {{item3.authName}}
                                    </el-tag>
                                </el-col>
                            </el-row>

                        </el-col>

                    </el-row>
                    <p v-if="scope.row.children.length==0" style="text-align:center;line-height:0px">未分配权限</p>
                </template>
            </el-table-column>
            <el-table-column type="index" width="100">
            </el-table-column>
            <el-table-column prop="roleName" label="角色名称" width="150">
            </el-table-column>
            <el-table-column prop="roleDesc" label="角色描述" width="150">
            </el-table-column>
            <el-table-column label="操作" width="200">
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" circle size="mini" plain></el-button>
                    <el-button type="success" icon="el-icon-check" circle size="mini" plain @click="eidtCurrRight(scope.row)"></el-button>
                    <el-button type="danger" icon="el-icon-delete" circle size="mini" plain>
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 角色权限编辑对话框 -->
        <el-dialog title="修改权限" :visible.sync="EditRole.dialogFormVisible">
            <el-tree 
                ref="tree"
                :data="EditRole.form" 
                show-checkbox 
                default-expand-all
                node-key="id" 
                :default-checked-keys="EditRole.checkedList" 
                :props="EditRole.defaultProps">
            </el-tree>
            <div slot="footer" class="dialog-footer">
                <el-button @click="EditRole.dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="EditRightSend">确 定</el-button>
            </div>
        </el-dialog>
    </el-card>
</template>

<script>
export default {
  data() {
    return {
      RoleList: [],
      EditRole: {
        checkedList:[],
        dialogFormVisible: false,
        form: [],
        defaultProps:{children: 'children',label: 'authName'},
        currRoleId:-1,
      }
    };
  },
  //获取角色列表
  created() {
    this.getRoleList();
  },
  methods: {
    //获取角色列表方法
    getRoleList: async function() {
      var res = await this.$axios.get("roles");
      var { meta: { status, msg }, data } = res.data;
      if (status == 200) {
        this.RoleList = data;
      }
    },
    //删除角色权限方法
    delRight: async function(role, rightId) {
      var res = await this.$axios.delete(`roles/${role.id}/rights/${rightId}`);
      var { meta: { status, msg }, data } = res.data;
      console.log(res);
      if (status == 200) {
        role.children = data;
      }
    },
    //修改角色权限方法
    eidtRole: async function() {
      this.EditRole.dialogFormVisible = true;
    },
    //获取当前角色的所有权限的树型结构
    eidtCurrRight:async function(role){
        this.EditRole.currRoleId=role.id;
        var res=await this.$axios.get(`rights/tree`);
        // console.log(res);
        var {meta:{status,msg},data}=res.data;
        this.EditRole.form=data;
       
        console.log(role);
        var arr=[];
        role.children.forEach(function(item1){
           
            item1.children.forEach(function(item2){
                
                item2.children.forEach(function(item3){
                    arr.push(item3.id);
                })
            })
        });
        this.EditRole.checkedList=arr;
        console.log(this.EditRole.checkedList);
         this.EditRole.dialogFormVisible=true;
    },
    //发送修改权限请求的方法
    EditRightSend:async function(){
        let arr1=this.$refs.tree.getCheckedKeys();
        let arr2=this.$refs.tree.getHalfCheckedKeys();
        let arr=[...arr1,...arr2];
        var res=await this.$axios.post(`roles/${this.EditRole.currRoleId}/rights`,{rids:arr.join(',')})
        this.getRoleList();
        this.EditRole.dialogFormVisible=false;
    }
  }
};
</script>

<style>
.addRole {
  margin: 10px 0;
}
</style>
