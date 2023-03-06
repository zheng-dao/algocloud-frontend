import actions from 'src/modules/superadmin/user/userActions';

const INITIAL_PAGE_SIZE = 10;

const initialData = {
  rows: [] as Array<any>,
  count: 0,
  loading: false,
  filter: {},
  rawFilter: {},
  pagination: {
    current: 1,
    pageSize: INITIAL_PAGE_SIZE,
  },
  sorter: {},
};

export default (state = initialData, { type, payload }) => {

  if (type === actions.RESETED) {
    return {
      ...initialData,
    };
  }

  if (type === actions.SORTER_CHANGED) {
    return {
      ...state,
      sorter: payload || {},
    };
  }

  if (type === actions.PAGINATION_CHANGED) {
    return {
      ...state,
      pagination: payload || {
        current: 1,
        pageSize: INITIAL_PAGE_SIZE,
      },
    };
  }

  if (type === actions.UPDATE_STARTED) {
    return {
      ...state,
      loading: true,
    };
  }

  if (type === actions.UPDATE_SUCCESS) {
    return {
      ...state,
      loading: false,
    };
  }

  if (type === actions.UPDATE_ERROR) {
    return {
      ...state,
      loading: false,
    };
  }

  if (type === actions.DELETE_STARTED) {
    return {
      ...state,
      loading: true,
    };
  }

  if (type === actions.DELETE_SUCCESS) {
    return {
      ...state,
      loading: false,
    };
  }

  if (type === actions.DELETE_ERROR) {
    return {
      ...state,
      loading: false,
    };
  }
  
  if (type === actions.FETCH_STARTED) {
    return {
      ...state,
      loading: true,
      filter: payload ? payload.filter : {},
      rawFilter: payload ? payload.rawFilter : {},
      pagination:
        payload && payload.keepPagination
          ? state.pagination
          : {
              current: 1,
              pageSize: INITIAL_PAGE_SIZE,
            },
    };
  }

  if (type === actions.FETCH_SUCCESS) {
    return {
      ...state,
      loading: false,
      rows: payload.rows,
      count: payload.count,
    };
  }

  if (type === actions.FETCH_ERROR) {
    return {
      ...state,
      loading: false,
      rows: [],
      count: 0,
    };
  }

  return state;
};
