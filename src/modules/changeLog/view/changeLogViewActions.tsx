import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';
import ChangeLogService from 'src/modules/changeLog/changeLogService';

const prefix = 'CHANGELOG_VIEW';

const changeLogViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: changeLogViewActions.FIND_STARTED,
      });

      const changeLog = await ChangeLogService.find(id);

      dispatch({
        type: changeLogViewActions.FIND_SUCCESS,
        payload: changeLog,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: changeLogViewActions.FIND_ERROR,
      });

      getHistory().push('/user');
    }
  },
};

export default changeLogViewActions;
