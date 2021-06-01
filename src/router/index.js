import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'

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
