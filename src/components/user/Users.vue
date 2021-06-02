<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 1.搜索与添加区域 -->

      <el-row>
        <el-col :span="7">
          <el-input placeholder="请输入内容">
            <el-button
              slot="append"
              icon="el-icon-search"
            ></el-button> </el-input
        ></el-col>
        <el-col :span="2">
          <el-button type="primary"> 添加用户 </el-button>
        </el-col>
      </el-row>
      <!-- 用户列表区域 -->
      <el-table
        :data="data"
        style="width: 100%">
        <el-table-column
          prop="prop"
          label="label"
          width="width">
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      QueryInfo:{
        query:'',
        pagenum:1,
        pagesize:2
      },
      userList:[],
      total:0
    };
  },
  created(){
    this.getUserList();
  },
  methods:{
   async getUserList(){
     const {data:res}=await this.$http.get('users',{params:this.QueryInfo})
     if(res.meta.status!==200){return this.$message.error('获取用户列表失败！');}
     this.userList=res.data.users;
     this.total=res.data.total;
    }
  }
};
</script>

<style scoped>
.el-row {
  margin-right: 0 !important;
}
</style>