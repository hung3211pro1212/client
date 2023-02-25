import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '../Layout/DefaultLayout.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: DefaultLayout,
    meta: {
      layout: 'DefaultLayout', // we add new meta layout here to use it later
    },
    redirect: '/dashboard',
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

    ]
  },
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,





})

export default router
