import Permissions from 'src/security/permissions';
import { i18n } from 'src/i18n';
import config from 'src/config';

const permissions = Permissions.values;

export default [
  {
    path: '/algocloudhq',
    permissionRequired: permissions.algorandRead,
    icon: 'fas fa-layer-group',
    label: i18n('entities.algocloudhq.menu'),
  },
  {
    path: '/overview',
    exact: true,
    icon: 'fa-solid fa-table-columns',
    label: i18n('overview.menu'),
    permissionRequired: null,
  },
  {
    path: '/dashboard',
    exact: true,
    icon: 'fa-solid fa-table-columns',
    label: i18n('dashboard.menu'),
    permissionRequired: null,
  },

  config.isPlanEnabled && {
    path: '/plan',
    permissionRequired: permissions.planRead,
    icon: 'fas fa-credit-card',
    label: i18n('plan.menu'),
  },
  {
    path: '/algorand',
    permissionRequired: permissions.algorandRead,
    icon: 'fas fa-chart-line',
    label: i18n('entities.charts.menu'),
  },

  {
    path: '/user',
    label: i18n('user.menu'),
    permissionRequired: permissions.userRead,
    icon: 'fas fa-user-plus',
  },
  {
    path: '/portfolio',
    permissionRequired: permissions.portfolioRead,
    icon: 'fa-solid fa-coins',
    label: i18n('entities.portfolio.menu'),
  },

  {
    path: '/audit-logs',
    icon: 'fas fa-history',
    label: i18n('auditLog.menu'),
    permissionRequired: permissions.auditLogRead,
  },

  {
    path: '/settings',
    icon: 'fas fa-cog',
    label: i18n('settings.menu'),
    permissionRequired: permissions.settingsEdit,
  },
  {
    path: '/superadmin/user',
    label: i18n('user.menu'),
    permissionRequired: permissions.userReadSuperadmin,
    icon: 'fas fa-user-plus',
  },

  {
    path: '/superadmin/tenant',
    label: i18n('tenant.label'),
    permissionRequired: permissions.tenantReadSuperadmin,
    icon: 'fas fa-building',
  },

  {
    path: '/superadmin/settings',
    label: i18n('settings.menu'),
    permissionRequired: permissions.settingsReadSuperadmin,
    icon: 'fas fa-cog',
  },

  {
    path: '/superadmin/analytics',
    label: i18n('analytics.menu'),
    permissionRequired: permissions.settingsReadSuperadmin,
    icon: 'fas fa-chart-bar',
  },
  // {
  //   path: '/superadmin/algorand',
  //   permissionRequired: permissions.algorandReadSuperadmin,
  //   icon: 'fas fa-chart-bar',
  //   label: i18n('entities.algorand.menu'),
  // },
  {
    path: '#',
    label: i18n('hdx.menu'),
    permissionRequired: permissions.algorandRead,
    icon: 'fas fa-superscript', 
    style: 'fontSize: 26px',
  },
  {
    path: '#',
    label: i18n('pool.menu'),
    permissionRequired: permissions.algorandRead,
    icon: 'fas fa-tint',
  },
  {
    path: '#',
    label: i18n('explore.menu'),
    permissionRequired: permissions.algorandRead,
    icon: 'fas fa-globe',
  },
  {
    path: '#',
    label: i18n('farm.menu'),
    permissionRequired: permissions.algorandRead,
    icon: 'fas fa-tractor',
  },
  {
    path: '#',
    label: i18n('lending.menu'),
    permissionRequired: permissions.algorandRead,
    icon: 'fa-solid fa-building-columns',
  },
  {
    path: '#',
    label: i18n('launchpad.menu'),
    permissionRequired: permissions.algorandRead,
    icon: 'fas fa-rocket',
  },
  {
    path: '/customer',
    permissionRequired: permissions.customerRead,
    icon: 'fas fa-chevron-right',
    label: i18n('entities.customer.menu'),
  },

  {
    path: '/product',
    permissionRequired: permissions.productRead,
    icon: 'fas fa-chevron-right',
    label: i18n('entities.product.menu'),
  },

  {
    path: '/order',
    permissionRequired: permissions.orderRead,
    icon: 'fas fa-chevron-right',
    label: i18n('entities.order.menu'),
  },
].filter(Boolean);
