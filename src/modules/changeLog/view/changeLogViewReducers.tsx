import actions from 'src/modules/changeLog/view/changeLogViewActions';

const initialData = {
  loading: false,
  changeLog: null,
};

export default (state = initialData, { type, payload }) => {
  if (type === actions.FIND_STARTED) {
    return {
      ...state,
      changeLog: null,
      loading: true,
    };
  }

  if (type === actions.FIND_SUCCESS) {
    return {
      ...state,
      changeLog: payload,
      loading: false,
    };
  }

  if (type === actions.FIND_ERROR) {
    return {
      ...state,
      changeLog: null,
      loading: false,
    };
  }

  return state;
};
