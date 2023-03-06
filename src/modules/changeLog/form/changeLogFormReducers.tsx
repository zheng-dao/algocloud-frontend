import actions from 'src/modules/changeLog/form/changeLogFormActions';

const initialData = {
  initLoading: false,
  saveLoading: false,
  changeLog: null,
};

export default (state = initialData, { type, payload }) => {

  if (type === actions.INIT_STARTED) {
    return {
      ...state,
      changeLog: null,
      initLoading: true,
    };
  }

  if (type === actions.INIT_SUCCESS) {
    return {
      ...state,
      changeLog: payload,
      initLoading: false,
    };
  }

  if (type === actions.INIT_ERROR) {
    return {
      ...state,
      changeLog: null,
      initLoading: false,
    };
  }

  if (type === actions.ADD_STARTED) {
    return {
      ...state,
      saveLoading: true,
    };
  }

  if (type === actions.ADD_SUCCESS) {
    return {
      ...state,
      saveLoading: false,
    };
  }

  if (type === actions.ADD_ERROR) {
    return {
      ...state,
      saveLoading: false,
    };
  }

  if (type === actions.UPDATE_STARTED) {
    return {
      ...state,
      saveLoading: true,
    };
  }

  if (type === actions.UPDATE_SUCCESS) {
    return {
      ...state,
      saveLoading: false,
    };
  }

  if (type === actions.UPDATE_ERROR) {
    return {
      ...state,
      saveLoading: false,
    };
  }

  return state;
};
