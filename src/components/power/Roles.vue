<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card>
      <!-- 添加角色区域 -->
      <el-row>
        <el-col :span="1">
          <el-button type="primary">添加角色</el-button></el-button>
        </el-col>
        <el-col>
          
          <el-table
            :data="roleList"
            style="width:100%;"
            border
            stripe
            >
            <!-- 展开列 -->
            <el-table-column
              type="expand"
              >
              <template slot-scope="scope" >
                
                <el-row :class="['bdbottom',i1===0?'bdtop':'','vcenter']" v-for="(item1,i1) in scope.row.children" :key="item1.id">
                  <!-- 渲染一级权限 -->
                  <el-col :span="5">
                    <el-tag type="primary">{{item1.authName}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                    </el-col>
                  <!-- 渲染二级和三级权限 -->
                  <el-col :span="19">
                    <!-- 通过for循环嵌套渲染二级权限 -->
                    <el-row :class="[i2===0?'':'bdtop','vcenter']" v-for="(item2,i2) in item1.children" :key="item2.id">
                      <el-col :span="6"><el-tag type="success">{{item2.authName}}</el-tag><i class="el-icon-caret-right"></i></el-col>
                      <!--  通过for循环嵌套渲染三级权限 -->
                      <el-col :span="18">
                        <el-tag v-for="(item3,i3) in item2.children" :key="item3.id" type="warning">{{item3.authName}}</el-tag>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </template>
            </el-table-column>
            <!-- 索引列 -->
            <el-table-column
              type="index"
              >
            </el-table-column>
            <el-table-column
              prop="roleName"
              label="角色名称"
              >
            </el-table-column>
            <el-table-column
              prop="roleDesc"
              label="角色描述"
              >
            </el-table-column>
            <el-table-column
                      label="操作"
              >
              <template slot-scope="scope">
                <el-button size="mini" type="primary" icon="el-icon-edit">编辑</el-button>
                <el-button size="mini" type="danger" icon="el-icon-delete">删除</el-button>
                <el-button size="mini" type="warning" icon="el-icon-setting">分配权限</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <!-- 角色列表区域 -->
    </el-card>
    
  </div>
</template>

<script>
export default {
    data(){
        return{
          // 所有角色列表数据
          roleList:[]
        }
    },
    created(){
      this.getRoleList();
    },
    methods:{
    async  getRoleList(){
      const{data:res}= await this.$http.get('roles');
      if(res.meta.status!==200){
        return this.$message.error('获取角色列表失败！');
      }
      this.roleList=res.data;
      console.log(this.roleList)
      }
    }
}
</script>

<style scoped>
.el-tag{
  margin: 7px;
}
.bdtop{
  border-top: 1px solid #eee;
}
.bdbottom{
  border-bottom: 1px solid #eee;
}
.vcenter{
  display: flex;
  align-items: center;

}
</style>