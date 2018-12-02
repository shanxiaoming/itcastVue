<template>
    <el-card>
        <my-bread lev1="权限管理" lev2="权限列表"></my-bread>
        <!-- 权限列表 -->
        <el-table :data="rightList" style="width: 100%" stripe height="400px">
            <el-table-column type="index" width="100">
            </el-table-column>
            <el-table-column prop="authName" label="权限名称" width="150">
            </el-table-column>
            <el-table-column prop="path" label="路径" width="150">
            </el-table-column>
            <template >
                <el-table-column  label="层级" width="150">
                    <template slot-scope='scope'>
                        <span v-if="scope.row.level==0">一级</span>
                        <span v-if="scope.row.level==1">二级</span>
                        <span v-if="scope.row.level==2">三级</span>
                    </template>
                </el-table-column>
            </template>
        </el-table>
    </el-card>
</template>

<script>
export default {
  data() {
    return {
      rightList: []
    };
  },

  //获取权限列表
  created() {
    this.getRightList();
  },
  methods: {
    getRightList: async function() {
      var res = await this.$axios.get(`rights/list`);
      var { meta: { status, msg }, data } = res.data;
      console.log(res);
      this.rightList = data;
    }
  }
};
</script>

<style>
</style>
