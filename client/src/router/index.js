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
<<<<<<< HEAD
    redirect: '',
=======
>>>>>>> 1f970035f8b7b336549bb9e98d2b2aca9f371542
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
        name: 'Login',
        path: '/login',
        component: Login,
      },

    ]
  },
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,





})

export default router
