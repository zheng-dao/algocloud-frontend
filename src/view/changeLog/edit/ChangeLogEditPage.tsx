import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import actions from 'src/modules/changeLog/form/changeLogFormActions';
import selectors from 'src/modules/changeLog/form/changeLogFormSelectors';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import Spinner from 'src/view/shared/Spinner';
import PageTitle from 'src/view/shared/styles/PageTitle';
import ChangeLogEditForm from 'src/view/changeLog/edit/ChangeLogEditForm';

function ChangeLogEditPage(props) {
  const dispatch = useDispatch();
  const [dispatched, setDispatched] = useState(false);

  const initLoading = useSelector(
    selectors.selectInitLoading,
  );

  const saveLoading = useSelector(
    selectors.selectSaveLoading,
  );

  const changeLog = useSelector(selectors.selectChangeLog);

  const match = useRouteMatch();

  useEffect(() => {
    dispatch(actions.doInit(match.params.id));
    setDispatched(true);
  }, [dispatch, match.params.id]);

  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('changeLog.menu'), '/change-logs'],
          [i18n('changeLog.edit.title')],
        ]}
      />

      <ContentWrapper>
        <PageTitle>{i18n('changeLog.edit.title')}</PageTitle>

        {initLoading && <Spinner />}

        {dispatched && !initLoading && (
          <ChangeLogEditForm
            changeLog={changeLog}
            saveLoading={saveLoading}
            onCancel={() => getHistory().push('/change-logs')}
          />
        )}
      </ContentWrapper>
    </>
  );
}

export default ChangeLogEditPage;
