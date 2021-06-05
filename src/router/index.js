import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Users from '../components/user/Users.vue'
import Right from '../components/power/Right.vue'
import Roles from '../components/power/Roles.vue'


Vue.use(VueRouter)

const routes = [
  {path:'/',redirect:'/login'},
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    redirect:'/welcome',
    children:[
      {
      path:'/welcome',
      component:Welcome
    },
    {
      path:'/users',
      component:Users
    },
    {
      path:'/rights',
      component:Right
    },
    {
      path:'/roles',
      component:Roles
    }
    ]
  },
 
]

const router = new VueRouter({
  routes
})

router.beforeEach((to,from,next)=>{
  if(to.path==='/login')return next();
  //获取token
 const tokenStr=window.sessionStorage.getItem('token');
 if(!tokenStr){return next('/login');}
 next();
})
export default router
