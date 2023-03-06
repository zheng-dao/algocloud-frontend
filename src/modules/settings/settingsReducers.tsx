import actions from 'src/modules/settings/settingsActions';

const initialData = {
  initLoading: false,
  saveLoading: false,
  changeLoading: false,
  settings: null,
  theme: null
};

export default (state = initialData, { type, payload }) => {
  if (type === actions.INIT_STARTED) {
    return {
      ...state,
      initLoading: true,
    };
  }

  if (type === actions.INIT_SUCCESS) {
    return {
      ...state,
      settings: payload,
      initLoading: false,
    };
  }

  if (type === actions.INIT_ERROR) {
    return {
      ...state,
      settings: null,
      initLoading: false,
    };
  }

  if (type === actions.SAVE_STARTED) {
    return {
      ...state,
      saveLoading: true,
    };
  }

  if (type === actions.SAVE_SUCCESS) {
    return {
      ...state,
      settings: payload,
      saveLoading: false,
    };
  }

  if (type === actions.SAVE_ERROR) {
    return {
      ...state,
      saveLoading: false,
    };
  }

  if (type === actions.CHANGE_THEME_STARTED) {
    return {
      ...state,
      changeLoading: true,
    };
  }

  if (type === actions.CHANGE_THEME_SUCCESS) {
    return {
      ...state,
      theme: payload,
      changeLoading: false,
    };
  }

  if (type === actions.CHANGE_THEME_ERROR) {
    return {
      ...state,
      changeLoading: false,
    };
  }

  return state;
};
