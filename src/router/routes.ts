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
  }, {
    path: RoutePaths.MOCK_TEST,
    component: () => import('@/layout/index.vue'),
    name: 'MockTest',
    meta: {
      title: 'Data Mock Test',
      isMenu: true,
      hidden: true,
      icon: 'Promotion',
    },
    children: [
      {
        path: RoutePaths.MOCK_TEST_MANAGEMENT, // 需要在routePathConstants中添加此常量
        name: 'MockManagement',
        component: () => import('@/layout/blank/index.vue'),
        // redirect: RoutePaths.MOCK_TEMP,
        meta: {
          title: 'Mock管理',
          isMenu: true,
          hidden: false,
          icon: 'Folder'
        },
        children: [
          // 将原来的Mock Temp移动到中间目录下
          {
            path: RoutePaths.MOCK_TEST_TEMP,
            component: () => import('@/views/mock_test/temp/index.vue'),
            name: 'Mock Temp',
            meta: {
              title: '临时占位菜单',
              isMenu: true,
              hidden: false,
              icon: 'Promotion'
            }
          }
          // 可以在这里添加更多子路由
        ]
      }, {
        path: RoutePaths.MOCK_TEST_YAML,
        component: () => import('@/views/mock_test/yaml/index.vue'),
        name: 'Yaml',
        meta: {
          title: 'Yaml',
          isMenu: true,
          hidden: false,
          icon: "monitor",
        }
      }
    ]
  }, {
    path: RoutePaths.MOCK_CONFIG,
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
        path: RoutePaths.MOCK_CONFIG_ENV,
        component: () => import('@/views/mock/config/env/index.vue'),
        name: 'MockConfigEnv',
        meta: {
          title: 'MockConfigEnv',
          isMenu: true,
          hidden: false,
          icon: "monitor",
        }
      }, {
        path: RoutePaths.MOCK_CONFIG_PLATFORM,
        component: () => import('@/views/mock/config/platform/index.vue'),
        name: 'MockConfigPlatform',
        meta: {
          title: 'MockConfigPlatform',
          isMenu: true,
          hidden: false,
          icon: "monitor",
        },
      }, {
        path: RoutePaths.MOCK_CONFIG_DATASOURCE,
        component: () => import('@/views/mock/config/datasource/index.vue'),
        name: 'MockConfigDataSource',
        meta: {
          title: 'MockConfigDataSource',
          isMenu: true,
          hidden: false,
          icon: "monitor",
        },
      }, {
        path: RoutePaths.MOCK_CONFIG_RABBITMQ,
        component: () => import('@/views/mock/config/rabbitmq/index.vue'),
        name: 'MockConfigRabbitmq',
        meta: {
          title: 'MockConfigRabbitmq',
          isMenu: true,
          hidden: false,
          icon: "monitor",
        },
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



