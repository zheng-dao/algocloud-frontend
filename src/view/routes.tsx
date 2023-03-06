import Permissions from 'src/security/permissions';
import config from 'src/config';

const permissions = Permissions.values;

const privateRoutes = [
  {
    path: '/overview',
    loader: () =>
      import('src/view/overview/OverviewPage'),
    permissionRequired: null,
    exact: true,
  },
  {
    path: '/dashboard',
    loader: () =>
      import('src/view/dashboard/DashboardPage'),
    permissionRequired: null,
    exact: true,
  },

  {
    path: '/profile',
    loader: () => import('src/view/auth/ProfileFormPage'),
    permissionRequired: null,
    exact: true,
  },

  {
    path: '/password-change',
    loader: () =>
      import('src/view/auth/PasswordChangeFormPage'),
    permissionRequired: null,
    exact: true,
  },

  {
    path: '/tenant',
    loader: () =>
      import('src/view/tenant/list/TenantListPage'),
    permissionRequired: null,
    exact: true,
  },
  {
    path: '/tenant/new',
    loader: () =>
      import('src/view/tenant/form/TenantFormPage'),
    permissionRequired: null,
    exact: true,
  },
  {
    path: '/tenant/:id/edit',
    loader: () =>
      import('src/view/tenant/form/TenantFormPage'),
    permissionRequired: null,
    exact: true,
  },

  config.isPlanEnabled && {
    path: '/plan',
    loader: () => import('src/view/plan/PlanPage'),
    permissionRequired: permissions.planRead,
    exact: true,
  },

  {
    path: '/user',
    loader: () => import('src/view/user/list/UserPage'),
    permissionRequired: permissions.userRead,
    exact: true,
  },

  {
    path: '/user/new',
    loader: () => import('src/view/user/new/UserNewPage'),
    permissionRequired: permissions.userCreate,
    exact: true,
  },

  {
    path: '/user/importer',
    loader: () =>
      import('src/view/user/importer/UserImporterPage'),
    permissionRequired: permissions.userImport,
    exact: true,
  },
  {
    path: '/user/:id/edit',
    loader: () => import('src/view/user/edit/UserEditPage'),
    permissionRequired: permissions.userEdit,
    exact: true,
  },
  {
    path: '/user/:id',
    loader: () => import('src/view/user/view/UserViewPage'),
    permissionRequired: permissions.userRead,
    exact: true,
  },

  {
    path: '/audit-logs',
    loader: () => import('src/view/auditLog/AuditLogPage'),
    permissionRequired: permissions.auditLogRead,
  },

  {
    path: '/change-logs',
    loader: () => import('src/view/changeLog/list/ChangeLogPage'),
    permissionRequired: permissions.changeLogRead,
    exact: true,
  },

  {
    path: '/change-logs/new',
    loader: () => import('src/view/changeLog/new/ChangeLogNewPage'),
    permissionRequired: permissions.changeLogEdit,
    exact: true,
  },

  {
    path: '/change-logs/:id/edit',
    loader: () => import('src/view/changeLog/edit/ChangeLogEditPage'),
    permissionRequired: permissions.changeLogEdit,
    exact: true,
  },

  {
    path: '/settings',
    loader: () =>
      import('src/view/settings/SettingsFormPage'),
    permissionRequired: permissions.settingsEdit,
  },

  {
    path: '/customer',
    loader: () =>
      import('src/view/customer/list/CustomerListPage'),
    permissionRequired: permissions.customerRead,
    exact: true,
  },
  {
    path: '/customer/new',
    loader: () =>
      import('src/view/customer/form/CustomerFormPage'),
    permissionRequired: permissions.customerCreate,
    exact: true,
  },
  {
    path: '/customer/importer',
    loader: () =>
      import(
        'src/view/customer/importer/CustomerImporterPage'
      ),
    permissionRequired: permissions.customerImport,
    exact: true,
  },
  {
    path: '/customer/:id/edit',
    loader: () =>
      import('src/view/customer/form/CustomerFormPage'),
    permissionRequired: permissions.customerEdit,
    exact: true,
  },
  {
    path: '/customer/:id',
    loader: () =>
      import('src/view/customer/view/CustomerViewPage'),
    permissionRequired: permissions.customerRead,
    exact: true,
  },

  {
    path: '/product',
    loader: () =>
      import('src/view/product/list/ProductListPage'),
    permissionRequired: permissions.productRead,
    exact: true,
  },
  {
    path: '/product/new',
    loader: () =>
      import('src/view/product/form/ProductFormPage'),
    permissionRequired: permissions.productCreate,
    exact: true,
  },
  {
    path: '/product/importer',
    loader: () =>
      import(
        'src/view/product/importer/ProductImporterPage'
      ),
    permissionRequired: permissions.productImport,
    exact: true,
  },
  {
    path: '/product/:id/edit',
    loader: () =>
      import('src/view/product/form/ProductFormPage'),
    permissionRequired: permissions.productEdit,
    exact: true,
  },
  {
    path: '/product/:id',
    loader: () =>
      import('src/view/product/view/ProductViewPage'),
    permissionRequired: permissions.productRead,
    exact: true,
  },

  {
    path: '/order',
    loader: () =>
      import('src/view/order/list/OrderListPage'),
    permissionRequired: permissions.orderRead,
    exact: true,
  },
  {
    path: '/portfolio',
    loader: () =>
      import('src/view/Portfolio/Portfolio'),
    permissionRequired: permissions.orderRead,
    exact: true,
  },
  {
    path: '/order/new',
    loader: () =>
      import('src/view/order/form/OrderFormPage'),
    permissionRequired: permissions.orderCreate,
    exact: true,
  },
  {
    path: '/order/importer',
    loader: () =>
      import(
        'src/view/order/importer/OrderImporterPage'
      ),
    permissionRequired: permissions.orderImport,
    exact: true,
  },
  {
    path: '/order/:id/edit',
    loader: () =>
      import('src/view/order/form/OrderFormPage'),
    permissionRequired: permissions.orderEdit,
    exact: true,
  },
  {
    path: '/order/:id',
    loader: () =>
      import('src/view/order/view/OrderViewPage'),
    permissionRequired: permissions.orderRead,
    exact: true,
  },
  {
    path: '/algorand',
    loader: () => import('src/view/algorand/pages/overview/view/OverviewPage'),
    permissionRequired: permissions.algorandRead,
    exact: true,
  },
  {
    path: '/algorand/global',
    loader: () => import('src/view/algorand/pages/global/view/GlobalPage'),
    permissionRequired: permissions.algorandRead,
    exact: true,
  },
  {
    path: '/algorand/favorites',
    loader: () => import('src/view/algorand/pages/favorite/FavoriteListPage'),
    permissionRequired: permissions.algorandRead,
    exact: true,
  },
  {
    path: '/algorand/assets',
    loader: () => import('src/view/algorand/pages/asset/list/AssetListPage'),
    permissionRequired: permissions.algorandRead,
    exact: true,
  },
  {
    path: '/algorand/pools',
    loader: () => import('src/view/algorand/pages/pool/list/PoolListPage'),
    permissionRequired: permissions.algorandRead,
    exact: true,
  },
  {
    path: '/algorand/assets/:assetId',
    loader: () => import('src/view/algorand/pages/asset/show/AssetShowPage'),
    permissionRequired: permissions.algorandRead,
    exact: true,
  },
  {
    path: '/algorand/pools/:address',
    loader: () => import('src/view/algorand/pages/pool/show/PoolShowPage'),
    permissionRequired: permissions.algorandRead,
    exact: true,
  },
  {
    path: '/algocloudhq',
    loader: () => import('src/view/algocloudhq/pages/overview/view/OverviewPage'),
    permissionRequired: permissions.algorandRead,
    exact: true,
  },
  {
    path: '/algocloudhq/global',
    loader: () => import('src/view/algocloudhq/pages/global/view/GlobalPage'),
    permissionRequired: permissions.algorandRead,
    exact: true,
  },
  {
    path: '/algocloudhq/favorites',
    loader: () => import('src/view/algocloudhq/pages/favorite/FavoriteListPage'),
    permissionRequired: permissions.algorandRead,
    exact: true,
  },
  {
    path: '/algocloudhq/assets',
    loader: () => import('src/view/algocloudhq/pages/asset/list/AssetListPage'),
    permissionRequired: permissions.algorandRead,
    exact: true,
  },
  {
    path: '/algocloudhq/pools',
    loader: () => import('src/view/algocloudhq/pages/pool/list/PoolListPage'),
    permissionRequired: permissions.algorandRead,
    exact: true,
  },
  {
    path: '/algocloudhq/assets/:assetId',
    loader: () => import('src/view/algocloudhq/pages/asset/show/AssetShowPage'),
    permissionRequired: permissions.algorandRead,
    exact: true,
  },
  {
    path: '/algocloudhq/pools/:address',
    loader: () => import('src/view/algocloudhq/pages/pool/show/PoolShowPage'),
    permissionRequired: permissions.algorandRead,
    exact: true,
  },
].filter(Boolean);

const publicRoutes = [
  {
    path: '/',
    loader: () => import('src/view/auth/LandingPage'),
  },
  {
    path: '/auth/signin',
    loader: () => import('src/view/auth/SigninPage'),
  },
  {
    path: '/auth/signup',
    loader: () => import('src/view/auth/SignupPage'),
  },
  {
    path: '/auth/forgot-password',
    loader: () =>
      import('src/view/auth/ForgotPasswordPage'),
  },
].filter(Boolean);

const emptyTenantRoutes = [
  {
    path: '/auth/tenant',
    loader: () => import('src/view/auth/TenantPage'),
  },
].filter(Boolean);

const emptyPermissionsRoutes = [
  {
    path: '/auth/empty-permissions',
    loader: () =>
      import('src/view/auth/EmptyPermissionsPage'),
  },
].filter(Boolean);

const emailUnverifiedRoutes = [
  {
    path: '/auth/email-unverified',
    loader: () =>
      import('src/view/auth/EmailUnverifiedPage'),
  },
].filter(Boolean);

const inactiveUserRoutes = [
  {
    path: '/auth/inactive-user',
    loader: () =>
      import('src/view/auth/InactiveUserPage'),
  },
].filter(Boolean);

const simpleRoutes = [
  {
    path: '/auth/password-reset',
    loader: () => import('src/view/auth/PasswordResetPage'),
  },
  {
    path: '/auth/invitation',
    loader: () => import('src/view/auth/InvitationPage'),
  },
  {
    path: '/auth/verify-email',
    loader: () => import('src/view/auth/VerifyEmailPage'),
  },
  {
    path: '/403',
    loader: () =>
      import('src/view/shared/errors/Error403Page'),
  },
  {
    path: '/500',
    loader: () =>
      import('src/view/shared/errors/Error500Page'),
  },
  {
    path: '/404',
    loader: () =>
      import('src/view/shared/errors/Error404Page'),
  },
  {
    path: '/search-error',
    loader: () =>
      import('src/view/shared/errors/SearchErrorPage'),
  },
].filter(Boolean);

const superadminRoutes = [
  {
    path: '/superadmin/user',
    loader: () => import('src/view/superadmin/user/UserListPage'),
    permissionRequired: permissions.userReadSuperadmin,
    exact: true,
  },
  {
    path: '/superadmin/tenant',
    loader: () => import('src/view/superadmin/tenant/list/TenantListPage'),
    permissionRequired: permissions.tenantReadSuperadmin,
    exact: true,
  },
  {
    path: '/superadmin/tenant/new',
    loader: () => import('src/view/superadmin/tenant/form/TenantFormPage'),
    permissionRequired: permissions.tenantCreateSuperadmin,
    exact: true,
  },
  {
    path: '/superadmin/settings',
    loader: () => import('src/view/superadmin/settings/SettingsFormPage'),
    permissionRequired: permissions.settingsReadSuperadmin,
    exact: true,
  },  
  {
    path: '/superadmin/analytics',
    loader: () => import('src/view/superadmin/analytics/AnalyticsPage'),
    permissionRequired: permissions.userReadSuperadmin,
    exact: true,
  },
  // {
  //   path: '/superadmin/algorand',
  //   loader: () => import('src/view/algorand/pages/overview/view/OverviewPage'),
  //   permissionRequired: permissions.algorandReadSuperadmin,
  //   exact: true,
  // },
].filter(Boolean);

export default {
  privateRoutes,
  publicRoutes,
  emptyTenantRoutes,
  emptyPermissionsRoutes,
  emailUnverifiedRoutes,
  inactiveUserRoutes,
  superadminRoutes,
  simpleRoutes,
};
