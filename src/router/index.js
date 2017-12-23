import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'
import NotFound from '@/components/NotFound'

const routerOptions = [
  { path: '/', component: 'Landing' },
  { path: '/signin', component: 'Signin' },
  { path: '/signup', component: 'Signup' },
  { path: '/admin', component: 'Admin', meta: { requiresAuth: true } }
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
    component: () => import(`@/components/${route.component}.vue`),
    meta: route.meta
  }
})

Vue.use(Router)

const router = new Router({
  mode: 'history', // use hash history
  routes: [
    ...routes,
    { path: '*', component: NotFound } // catch all route
  ]
})

/* Navigation Guards ( https://router.vuejs.org/en/advanced/navigation-guards.html )
 * To enable navigation protection we will use global guard named beforeEach.
 * This is a function applied to router instance which will be executed each time
 * you enter new route.
 */
router.beforeEach((to, from, next) => {
  // const to return true if route you intend to navigate to is protected
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const user = firebase.auth().currentUser
  if (requiresAuth && !user) {
    next('/signin')
  }
  next()
})

export default router
