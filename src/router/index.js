import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },
  {
    path: '/user-management',
    component: Layout,
    // redirect: '/dashboard',
    children: [{
      path: 'user-management',
      name: '用户管理',
      component: () => import('@/views/user/UserInfo'),
      meta: { title: '用户管理', icon: 'user' }
    }]
  },
  {
    path: '/vehicle-management',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'vehicle-management',
      name: '车辆管理',
      component: () => import('@/views/vehicle/VehicleInfo'),
      meta: { title: '车辆管理', icon: 'bus' }
    }]
  },
  {
    path: '/capacity-warning',
    component: Layout,
    redirect: '/example/table',
    name: '容量预警',
    meta: { title: '容量预警', icon: '电池' },
    children: [
      {
        path: 'capacity-demand',
        name: '需求容量计算',
        component: () => import('@/views/capacity/need/index'),
        meta: { title: '需求容量', icon: 'need' }
      },
      {
        path: 'capacity-reduction',
        name: '容量衰减',
        component: () => import('@/views/capacity/soh/index'),
        meta: { title: '容量衰减', icon: 'decrease' }
      },
      {
        path: 'anchor-warning ',
        name: '抛锚预警',
        component: () => import('@/views/capacity/warning/index'),
        meta: { title: '抛锚预警', icon: 'warning' }
      }
    ]
  },

  {
    path: '/spare-parts-plan',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '备件计划',
        component: () => import('@/views/under-dev'),
        meta: { title: '备件计划', icon: 'form' }
      }
    ]
  },
  {
    path: '/capacity-jump-analysis',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '容量跳水分析',
        component: () => import('@/views/under-dev'),
        meta: { title: '容量跳水分析', icon: 'jump' }
      }
    ]
  },
  {
    path: '/user-suggestions',
    component: Layout,
    children: [
      {
        path: 'main',
        name: '用户用车建议',
        component: () => import('@/views/under-dev'),
        meta: { title: '用户用车建议', icon: 'user-suggestion' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
