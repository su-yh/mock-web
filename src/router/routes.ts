import type {RouteRecordRaw} from "vue-router";
import RoutePaths from '@/router/routePathConstants'

const constantRoutes: RouteRecordRaw[] = [
  {
    path: RoutePaths.ROOT,
    component: () => import('@/layout/index.vue'),
    redirect: RoutePaths.HOME,
    name: 'root',
    meta: {
      title: '根',
      isMenu: false,
      icon: "Promotion",
    },
    children: [
      {
        path: RoutePaths.HOME,
        component: () => import('@/views/home/index.vue'),
        name: 'home',
        meta: {
          title: '主页',
          isMenu: true,
          hidden: false,
          icon: "Promotion",
        },
      }
    ]
  }, {
    path: RoutePaths.LOGIN,
    component: () => import('@/views/login/index.vue'),
    name: 'login',
    meta: {
      title: '登录',
      isMenu: false,
      icon: "Promotion",
    }
  }, {
    path: RoutePaths.SCREEN,
    component: () => import('@/views/screen/index.vue'),
    name: 'Screen',
    meta: {
      title: '数据大屏',
      isMenu: true,
      hidden: true,
      icon: "Platform",
    }
  }, {
    path: RoutePaths.ACL,
    component: () => import('@/layout/index.vue'),
    name: 'Acl',
    meta: {
      title: '权限管理',
      isMenu: true,
      hidden: false,
      icon: "Lock",
    },
    children: [
      {
        path: RoutePaths.ACL_USER,
        component: () => import('@/views/acl/user/index.vue'),
        name: 'User',
        meta: {
          title: '用户管理',
          isMenu: true,
          hidden: false,
          icon: "User",
        },
      }, {
        path: RoutePaths.ACL_ROLE,
        component: () => import('@/views/acl/role/index.vue'),
        name: 'Role',
        meta: {
          title: '角色管理',
          isMenu: true,
          hidden: false,
          icon: "UserFilled",
        },
      }, {
        path: RoutePaths.ACL_PERMISSION,
        component: () => import('@/views/acl/permission/index.vue'),
        name: 'Permission',
        meta: {
          title: '菜单管理',
          isMenu: true,
          hidden: false,
          icon: "Monitor",
        },
      }
    ]
  },{
    path: RoutePaths.PRODUCT,
    component: () => import('@/layout/index.vue'),
    name: 'Product',
    meta: {
      title: '商品管理',
      isMenu: true,
      hidden: true,
      icon: "Goods",
    },
    children: [
      {
        path: RoutePaths.PRODUCT_TRADEMARK,
        component: () => import('@/views/product/trademark/index.vue'),
        name: 'Trademark',
        meta: {
          title: '品牌管理',
          isMenu: true,
          hidden: true,
          icon: "ShoppingCartFull",
        },
      }, {
        path: RoutePaths.PRODUCT_ATTR,
        component: () => import('@/views/product/attr/index.vue'),
        name: 'Attr',
        meta: {
          title: '属性管理',
          isMenu: true,
          hidden: true,
          icon: "UserFilled",
        },
      }, {
        path: RoutePaths.PRODUCT_SPU,
        component: () => import('@/views/product/spu/index.vue'),
        name: 'Spu',
        meta: {
          title: 'SPU管理',
          isMenu: true,
          hidden: true,
          icon: "Monitor",
        },
      }, {
        path: RoutePaths.PRODUCT_SKU,
        component: () => import('@/views/product/sku/index.vue'),
        name: 'Sku',
        meta: {
          title: 'SKU管理',
          isMenu: true,
          hidden: true,
          icon: "Monitor",
        },
      }
    ]
  }, {
    path: RoutePaths.MOCK,
    component: () => import('@/layout/index.vue'),
    name: 'Mock',
    meta: {
      title: 'Data Mock',
      isMenu: true,
      hidden: false,
      icon: 'Promotion',
    },
    children: [
      {
        path: RoutePaths.MOCK_TEMP,
        component: () => import('@/views/mock/temp/index.vue'),
        name: 'Mock Temp',
        meta: {
          title: '临时占位菜单',
          isMenu: true,
          hidden: false,
          icon: 'Promotion'
        }
      }
    ]
  }, {
    path: RoutePaths.NOT_FOUND,
    component: () => import('@/views/404/index.vue'),
    name: '404',
    meta: {
      title: '404',
      isMenu: false,
      icon: "Promotion",
    }
  }, {
    path: RoutePaths.OTHER,
    redirect: RoutePaths.NOT_FOUND,
    name: 'Any',
    meta: {
      title: 'any',
      isMenu: false,
      icon: "Promotion",
    }
  }
];

export default constantRoutes;



