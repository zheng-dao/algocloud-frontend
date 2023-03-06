import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import actions from 'src/modules/changeLog/form/changeLogFormActions';
import selectors from 'src/modules/changeLog/form/changeLogFormSelectors';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';
import ChangeLogNewForm from 'src/view/changeLog/new/ChangeLogNewForm';

function ChangeLogNewPage(props) {
  const dispatch = useDispatch();

  const saveLoading = useSelector(
    selectors.selectSaveLoading,
  );

  const doSubmit = (data) => {
    dispatch(actions.doAdd(data));
  };

  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('changeLog.menu'), '/change-logs'],
          [i18n('changeLog.new.title')],
        ]}
      />

      <ContentWrapper>
        <PageTitle>{i18n('changeLog.new.title')}</PageTitle>

        <ChangeLogNewForm
          saveLoading={saveLoading}
          onSubmit={doSubmit}
          onCancel={() => getHistory().goBack()}
        />
      </ContentWrapper>
    </>
  );
}

export default ChangeLogNewPage;
