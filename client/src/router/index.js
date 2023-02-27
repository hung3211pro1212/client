import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '../Layout/DefaultLayout.vue'
import Login from '../Layout/Login.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: DefaultLayout,
    meta: {
      layout: 'DefaultLayout',
    },
    children: [
      {
        name: 'DanhSachLopHoc',
        path: '/danh-sach-lop-hoc',
        component: () => import('../views/DanhSachLopHoc.vue')
      },
      {
        name: 'QuanLyHocSinh',
        path: '/quan-ly-hoc-sinh',
        component: () => import('../views/QuanLyHocSinh.vue')
      },
      {
        name: 'QuanLyGiaoVien',
        path: '/quan-ly-nhan-su',
        component: () => import('../views/QuanLyGiaoVien.vue')
      },
      {
        name: 'profile',
        path: '/profile',
        component: () => import('../views/Profile.vue')
      },

    ]


  },
  {
    name: 'Login',
    path: '/login',
    component: Login,
    meta: {
      layout: 'Login',
    },
  },
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/home'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router
