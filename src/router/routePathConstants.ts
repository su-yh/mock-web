const routePrefix = import.meta.env.VITE_ROUTE_PREFIX;

const RoutePaths = {
  ROOT: routePrefix + '/',
  HOME: routePrefix + '/home',
  LOGIN: routePrefix + '/login',
  SCREEN: routePrefix + '/screen',
  ACL: routePrefix + '/acl',
  ACL_USER: routePrefix + '/acl/user',
  ACL_ROLE: routePrefix + '/acl/role',
  ACL_PERMISSION: routePrefix + '/acl/permission',
  PRODUCT: routePrefix + '/product',
  PRODUCT_TRADEMARK: routePrefix + '/product/trademark',
  PRODUCT_ATTR: routePrefix + '/product/attr',
  PRODUCT_SPU: routePrefix + '/product/spu',
  PRODUCT_SKU: routePrefix + '/product/sku',
  MOCK_TEST: routePrefix + '/mock/test',
  MOCK_TEST_MANAGEMENT: routePrefix + '/mock/test/manage',
  MOCK_TEST_TEMP: routePrefix + '/mock/test/manage/temp',
  MOCK_TEST_YAML: routePrefix + '/mock/test/yaml',
  NOT_FOUND: routePrefix + '/404',
  OTHER: routePrefix + '/:pathMatch(.*)*'
} as const; // 使用as const 让类型更精确

export default RoutePaths;
