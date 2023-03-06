import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { i18n } from 'src/i18n';
import ChangeLogTable from 'src/view/changeLog/list/ChangeLogTable';
import ChangeLogToolbar from 'src/view/changeLog/list/ChangeLogToolbar';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';
import selectors from 'src/modules/changeLog/changeLogSelectors';

function ChangeLogPage(props) {

  const hasPermissionToEdit = useSelector(
    selectors.selectPermissionToEdit
  );;

  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('changeLog.menu')],
        ]}
      />

      <ContentWrapper>
        <PageTitle>{i18n('changeLog.title')}</PageTitle>
        {
          hasPermissionToEdit && <ChangeLogToolbar />
        }
        <ChangeLogTable />
      </ContentWrapper>
    </>
  );
}

export default ChangeLogPage;
