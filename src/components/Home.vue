<template>
  <el-container class="home_container">
    <el-header>
      <div>
        <img src="../../public/new_logo1_legal1.png" alt width="100" height="50" />
        <span>货捕头电商管理系统</span>
        
      </div>
      <el-button type="info" @click="login_out">退出</el-button>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse?'64px':'200px'">
        <div class="toggle-btn" @click="toggleCollapse">|||</div>
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#313743"
          text-color="#fff"
          active-text-color="#409eff"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          :router="true"
        >
          <el-submenu :index="item.id+''" v-for="item in MenuList" :key="item.id">
            <!-- 一级菜单 的模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconsObj[item.id]"></i>
              <!-- 文本 -->
              <span>{{item.authName}}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item index="item.id" v-for="item in item.children" :key="item.id">
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>{{item.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      MenuList: [],
      iconsObj:{
        "125":'iconfont icon-user',
        "103":'iconfont icon-tijikongjian',
        "101":'iconfont icon-shangpin',
        "102":'iconfont icon-danju',
        "145":'iconfont icon-baobiao',
      },
      // 是否折叠
      isCollapse:false,
    };
  },
  created() {
    this.getMenuList();
  },
  methods: {
    login_out() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    //获取左侧菜单导航列表
    async getMenuList() {
      const { data: res } = await this.$http.get("menus");
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
      this.MenuList = res.data;
      console.log(res);
    },
    //左侧菜单导航的折叠与展开
    toggleCollapse(){
      this.isCollapse=!this.isCollapse
    }
  }
};
</script>

<style scoped>
.el-header {
  background-color: #313743;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-size: 20px;
}

.el-header div{
  display: flex;
  align-items: center;
}
.el-header>div>span{
  margin-left: 15px;
}
.el-aside {
  background-color: #313743;
}
.el-aside el-menu{
  border-right: none;
}
.el-main {
  background-color: #eaedf1;
}
.home_container {
  height: 100%;
}
.iconfont{
  margin-right: 10px;
}
.toggle-btn{
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
