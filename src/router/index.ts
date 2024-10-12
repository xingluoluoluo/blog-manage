import { createWebHistory, createRouter } from 'vue-router'

import IndexView from '../views/mainView/IndexView.vue'

const routes = [
  {
    path: '/',
    redirect: '/overview',
    component: IndexView,
    children: [
      {
        // 当 /user/:id/profile 匹配成功
        // UserProfile 将被渲染到 User 的 <router-view> 内部
        path: 'overview',
        component: () => import('../views/mainView/OverView.vue'),
      },
      {
        path: 'test',
        component: () => import('../views/mainView/test.vue'),
      }
      // {
      // 当 /user/:id/posts 匹配成功
      // UserPosts 将被渲染到 User 的 <router-view> 内部
      // path: 'posts',
      // component: UserPosts,
      // },
    ],
  },
  { path: '/test11', component: IndexView }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
