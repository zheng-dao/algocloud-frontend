import ChangeLogService from 'src/modules/changeLog/changeLogService';
import selectors from 'src/modules/changeLog/list/changeLogListSelectors';
import { i18n } from 'src/i18n';
import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';

import { getHistory } from 'src/modules/store';

const prefix = 'CHANGELOG_LIST';

const changeLogListActions = {
  FETCH_STARTED: `${prefix}_FETCH_STARTED`,
  FETCH_SUCCESS: `${prefix}_FETCH_SUCCESS`,
  FETCH_ERROR: `${prefix}_FETCH_ERROR`,

  RESETED: `${prefix}_RESETED`,
  TOGGLE_ONE_SELECTED: `${prefix}_TOGGLE_ONE_SELECTED`,
  TOGGLE_ALL_SELECTED: `${prefix}_TOGGLE_ALL_SELECTED`,
  CLEAR_ALL_SELECTED: `${prefix}_CLEAR_ALL_SELECTED`,

  PAGINATION_CHANGED: `${prefix}_PAGINATION_CHANGED`,
  SORTER_CHANGED: `${prefix}_SORTER_CHANGED`,

  DESTROY_ALL_SELECTED_STARTED: `${prefix}_DESTROY_ALL_SELECTED_STARTED`,
  DESTROY_ALL_SELECTED_SUCCESS: `${prefix}_DESTROY_ALL_SELECTED_SUCCESS`,
  DESTROY_ALL_SELECTED_ERROR: `${prefix}_DESTROY_ALL_SELECTED_ERROR`,

  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  doClearAllSelected() {
    return {
      type: changeLogListActions.CLEAR_ALL_SELECTED,
    };
  },

  doToggleAllSelected() {
    return {
      type: changeLogListActions.TOGGLE_ALL_SELECTED,
    };
  },

  doToggleOneSelected(id) {
    return {
      type: changeLogListActions.TOGGLE_ONE_SELECTED,
      payload: id,
    };
  },

  doReset: () => async (dispatch) => {
    dispatch({
      type: changeLogListActions.RESETED,
    });

    // dispatch(changeLogListActions.doFetch());
  },

  doChangePagination: (pagination) => async (
    dispatch,
    getState,
  ) => {
    dispatch({
      type: changeLogListActions.PAGINATION_CHANGED,
      payload: pagination,
    });

    dispatch(changeLogListActions.doFetch());
  },

  doChangeSort: (sorter) => async (dispatch, getState) => {
    dispatch({
      type: changeLogListActions.SORTER_CHANGED,
      payload: sorter,
    });

    dispatch(changeLogListActions.doFetch());
  },

  doFetch: (keepPagination = false) => async (
    dispatch
  ) => {
    try {
      dispatch({
        type: changeLogListActions.FETCH_STARTED,
        payload: { keepPagination },
      });

      const response = await ChangeLogService.fetch();

      dispatch({
        type: changeLogListActions.FETCH_SUCCESS,
        payload: {
          rows: response.rows,
          count: response.count,
        },
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: changeLogListActions.FETCH_ERROR,
      });
    }
  },

  doDestroy: (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: changeLogListActions.DESTROY_STARTED,
      });

      const response = await ChangeLogService.destroy([id]);

      dispatch({
        type: changeLogListActions.DESTROY_SUCCESS,
        payload: {
          rows: response.rows,
          count: response.count,
        },
      });

      Message.success(i18n('changeLog.doDestroySuccess'));

      getHistory().push('/change-logs');
      
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: changeLogListActions.DESTROY_ERROR,
      });

      getHistory().push('/change-logs');
    }
  },

  doDestroyAllSelected: () => async (
    dispatch,
    getState,
  ) => {
    try {
      const selectedRows = selectors.selectSelectedRows(
        getState(),
      );

      dispatch({
        type: changeLogListActions.DESTROY_ALL_SELECTED_STARTED,
      });

      await ChangeLogService.destroy(
        selectedRows.map((row) => row.id),
      );

      dispatch({
        type: changeLogListActions.DESTROY_ALL_SELECTED_SUCCESS,
      });

      Message.success(
        i18n('changeLog.doDestroyAllSelectedSuccess'),
      );

      getHistory().push('/change-logs');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: changeLogListActions.DESTROY_ALL_SELECTED_ERROR,
      });

      getHistory().push('/change-logs');
    }
  },
};

export default changeLogListActions;
