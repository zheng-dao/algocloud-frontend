import authAxios from 'src/modules/shared/axios/authAxios';
import AuthCurrentTenant from 'src/modules/auth/authCurrentTenant';

export default class ChangeLogService {
  static async fetch() {
    const tenantId = AuthCurrentTenant.get();
    const response = await authAxios.get(
      `/tenant/${tenantId}/change-log`
    );
    return response.data;
  }

  static async create(data) {
    const body = {
      data,
    };

    const tenantId = AuthCurrentTenant.get();

    const response = await authAxios.post(
      `/tenant/${tenantId}/change-log`,
      body,
    );

    return response.data;
  }

  static async find(id) {
    const tenantId = AuthCurrentTenant.get();
    const response = await authAxios.get(
      `/tenant/${tenantId}/change-log/${id}`
    );

    return response.data;
  }

  static async edit(id, data) {
    const body = {
      data,
    };

    const tenantId = AuthCurrentTenant.get();

    const response = await authAxios.put(
      `/tenant/${tenantId}/change-log/${id}`,
      body,
    );

    return response.data;
  }

  static async destroy(ids) {
    const params = {
      ids,
    };

    const tenantId = AuthCurrentTenant.get();

    const response = await authAxios.delete(
      `/tenant/${tenantId}/change-log`,
      { params }
    );

    return response.data;
  }
}
