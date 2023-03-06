import { i18n } from 'src/i18n';

class Roles {
  static get superadmin() {
    return "superadmin";
  }

  static get values() {
    return {
      admin: 'admin',
      custom: 'custom',
      // beta: 'beta',
    };
  }

  static labelOf(roleId) {
    if (!this.values[roleId]) {
      return roleId;
    }

    return i18n(`roles.${roleId}.label`);
  }

  static descriptionOf(roleId) {
    if (!this.values[roleId]) {
      return roleId;
    }

    return i18n(`roles.${roleId}.description`);
  }
}

export default Roles;
