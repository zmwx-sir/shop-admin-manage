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
          <el-input
            placeholder="请输入内容"
            v-model="QueryInfo.query"
            clearable
            @clear="getUserList"
          >
            <el-button
              @click="getUserList"
              slot="append"
              icon="el-icon-search"
            ></el-button> </el-input
        ></el-col>
        <el-col :span="2">
          <el-button type="primary" @click="addDialogVisible=true"> 添加用户 </el-button>
        </el-col>
      </el-row>
      <!-- 用户列表区域 -->
      <el-table border stripe :data="userList" style="width: 100%">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="username" label="姓名"> </el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>
        <el-table-column prop="moblie" label="电话"> </el-table-column>
        <el-table-column prop="role_name" label="角色"> </el-table-column>

        <el-table-column prop="mg_state" label="状态">
          <template slot-scope="scope">
            <el-switch
              @change="userStateChange(scope.row)"
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
            ></el-button>
            <el-tooltip
              effect="dark"
              content="分配角色"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="warning"
                icon="el-icon-setting"
                size="mini"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="QueryInfo.pagenum"
        :page-sizes="[2, 5, 10, 15]"
        :page-size="QueryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    
    <!-- 添加用户的对话框 -->
    <el-dialog
  title="添加用户"
  :visible.sync="addDialogVisible"
  width="50%"
  >
  <!-- 内容主体区域 -->
  <span>这是一段信息</span>
  <!-- 底部区域 -->
  <span slot="footer" class="dialog-footer">
    <el-button @click="addDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addDialogVisible = false">确 定</el-button>
  </span>
</el-dialog>


  </div>
</template>

<script>
export default {
  data() {
    return {
      QueryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 2,
      },
      userList: [],
      total: 0,
      // 控制添加用户对话框的显示隐藏
    addDialogVisible:false,

    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    async getUserList() {
      const { data: res } = await this.$http.get("users", {
        params: this.QueryInfo,
      });
      if (res.meta.status !== 200) {
        return this.$message.error("获取用户列表失败！");
      }
      this.userList = res.data.users;
      this.total = res.data.total;
    },
    handleSizeChange(newPagesize) {
      this.QueryInfo.pagesize = newPagesize;
      this.getUserList();
    },
    handleCurrentChange(newPagenum) {
      this.QueryInfo.pagesize = newPagenum;
      this.getUserList();
    },
    // 监听Switch开关状态的变化
    async userStateChange(userInfo) {
      const { data: res } = await this.$http.put(
        `Users/${userInfo.id}/state/${userInfo.mg_state}`
      );
      console.log("res:", res);

      if (res.meta.status !== 200) {
        userInfo.mg_state = !userInfo.mg_state;
        return this.$message.error("更新用户状态失败!");
      }
      this.$message.success("更新用户状态成功!");
    },
    
  },
};
</script>

<style scoped>
.el-row {
  margin-right: 0 !important;
}
</style>