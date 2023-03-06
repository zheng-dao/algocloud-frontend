import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import selectors from 'src/modules/changeLog/list/changeLogListSelectors';
import actions from 'src/modules/changeLog/list/changeLogListActions';
import { i18n } from 'src/i18n';
import ButtonIcon from 'src/view/shared/ButtonIcon';
import ReactTooltip from 'react-tooltip';
import Toolbar from 'src/view/shared/styles/Toolbar';

function ChangeLogToolbar(props) {
  const dispatch = useDispatch();

  const loading = useSelector(selectors.selectLoading);
  const selectedKeys = useSelector(
    selectors.selectSelectedKeys,
  );

  const hasPermissionToDestroy = useSelector(
    selectors.selectPermissionToEdit,
  );
  const hasRows = useSelector(selectors.selectHasRows);
  

  const doDestroyAllSelected = () => {
    dispatch(actions.doDestroyAllSelected());
  };

  const renderDestroyButton = () => {
    if (!hasPermissionToDestroy) {
      return null;
    }

    const disabled = !selectedKeys.length || loading;

    const button = (
      <button
        disabled={disabled}
        className="btn btn-primary"
        type="button"
        onClick={doDestroyAllSelected}
      >
        <ButtonIcon iconClass="fas fa-trash" />{' '}
        {i18n('common.destroy')}
      </button>
    );

    if (disabled) {
      return (
        <span
          data-tip={i18n('common.mustSelectARow')}
          data-tip-disable={!disabled}
          data-for="user-users-toolbar-destroy-all-tooltip"
        >
          {button}
          <ReactTooltip id="user-users-toolbar-destroy-all-tooltip" />
        </span>
      );
    }

    return button;
  };

  const disabled = !hasRows || loading;

  return (
    <Toolbar>
      <Link to="/change-logs/new">
        <button className="btn btn-primary" type="button">
          <ButtonIcon iconClass="fas fa-plus" />{' '}
          {i18n('common.new')}
        </button>
      </Link>
      {renderDestroyButton()}
    </Toolbar>
  );
}

export default ChangeLogToolbar;
