import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import ChangeLogService from 'src/modules/changeLog/changeLogService';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';

const prefix = 'CHANGELOG_FORM';

const changeLogFormActions = {

  INIT_STARTED: `${prefix}_INIT_STARTED`,
  INIT_SUCCESS: `${prefix}_INIT_SUCCESS`,
  INIT_ERROR: `${prefix}_INIT_ERROR`,

  ADD_STARTED: `${prefix}_ADD_STARTED`,
  ADD_SUCCESS: `${prefix}_ADD_SUCCESS`,
  ADD_ERROR: `${prefix}_ADD_ERROR`,

  UPDATE_STARTED: `${prefix}_UPDATE_STARTED`,
  UPDATE_SUCCESS: `${prefix}_UPDATE_SUCCESS`,
  UPDATE_ERROR: `${prefix}_UPDATE_ERROR`,

  doInit: (id?) => async (dispatch) => {
    try {
      dispatch({
        type: changeLogFormActions.INIT_STARTED,
      });

      const isEdit = Boolean(id);
      let record = {};

      if (isEdit) {
        record = await ChangeLogService.find(id);
      }

      dispatch({
        type: changeLogFormActions.INIT_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: changeLogFormActions.INIT_ERROR,
      });

      getHistory().push('/change-logs');
    }
  },

  doAdd: (values) => async (dispatch) => {
    try {
      dispatch({
        type: changeLogFormActions.ADD_STARTED,
      });

      await ChangeLogService.create(values);

      dispatch({
        type: changeLogFormActions.ADD_SUCCESS,
      });

      Message.success(i18n('changeLog.doAddSuccess'));

      getHistory().push('/change-logs');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: changeLogFormActions.ADD_ERROR,
      });
    }
  },

  doUpdate: (id, values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: changeLogFormActions.UPDATE_STARTED,
      });

      await ChangeLogService.edit(id, values);

      dispatch({
        type: changeLogFormActions.UPDATE_SUCCESS,
      });

      Message.success(i18n('changeLog.doUpdateSuccess'));

      getHistory().push('/change-logs');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: changeLogFormActions.UPDATE_ERROR,
      });

      getHistory().push('/change-logs');
    }
  },
};

export default changeLogFormActions;
