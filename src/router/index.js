import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Index = ()=>import('@/views/home/Index')
const About = ()=>import('@/views/home/About')

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
]

const router = new VueRouter({
  routes
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
