import Vue from 'vue'
import Router from 'vue-router'

const routerOptions = [
  { path: '/', component: 'Landing' },
  { path: '/signin', component: 'Signin' },
  { path: '/signup', component: 'Signup' },
  { path: '/home', component: 'Home' }
]

/*
  Here I use a technique for routes called lazy loading.
  Basically, you need to create an array of router views,
  (in my case routerOptions) and then use the map function
  to create routes. Then just pass them to router configuration object.
  And last thing is that I configured router to work in HTML5 history mode.
*/
const routes = routerOptions.map(route => {
  return {
    path: route.path,
    component: () => import(`@/components/${route.component}.vue`)
  }
})

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes
})
