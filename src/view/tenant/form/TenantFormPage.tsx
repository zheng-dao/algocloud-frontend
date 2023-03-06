import React, { useState, useEffect } from 'react';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import PageTitle from 'src/view/shared/styles/PageTitle';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import TenantForm from 'src/view/tenant/form/TenantForm';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import actions from 'src/modules/tenant/form/tenantFormActions';
import selectors from 'src/modules/tenant/form/tenantFormSelectors';
import { useSelector, useDispatch } from 'react-redux';
import { useRouteMatch, Redirect } from 'react-router-dom';
import authSelectors from 'src/modules/auth/authSelectors';
import Spinner from 'src/view/shared/Spinner';
import PermissionChecker from 'src/modules/auth/permissionChecker';

function TenantFormPage() {
  const currentUserIsSuperadmin = useSelector(
    authSelectors.selectCurrentUserSuperadmin
  );

  const currentUser = useSelector(
    authSelectors.selectCurrentUser,
  );
  const currentTenant = useSelector(
    authSelectors.selectCurrentTenant,
  );

  const dispatch = useDispatch();
  const [dispatched, setDispatched] = useState(false);
  const match = useRouteMatch();
  
  const initLoading = useSelector(
    selectors.selectInitLoading,
  );
  const saveLoading = useSelector(
    selectors.selectSaveLoading,
  );
  const record = useSelector(selectors.selectRecord);

  const isEditing = Boolean(match.params.id);

  useEffect(() => {
    dispatch(actions.doInit(match.params.id));
    setDispatched(true);
  }, [dispatch, match.params.id]);

  const doSubmit = (id, data) => {
    if (isEditing) {
      dispatch(actions.doUpdate(id, data));
    } else {
      const permissionChecker = new PermissionChecker(
        currentTenant,
        currentUser,
      );
      if (permissionChecker.rolesMatchOneOf("custom")) {
        data.role = "custom"
      }
      dispatch(actions.doCreate(data));
    }
  };

  const title = isEditing
    ? i18n('tenant.edit.title')
    : i18n('tenant.new.title');

  if (currentUserIsSuperadmin) return <Redirect to="/403" />;

  return (
    <>
      <Breadcrumb
        items={[[i18n('tenant.menu'), '/tenant'], [title]]}
      />

      <ContentWrapper>
        <PageTitle>{title}</PageTitle>

        {initLoading && <Spinner />}

        {dispatched && !initLoading && (
          <TenantForm
            saveLoading={saveLoading}
            record={record}
            isEditing={isEditing}
            onSubmit={doSubmit}
            onCancel={() => getHistory().goBack()}
          />
        )}
      </ContentWrapper>
    </>
  );
}

export default TenantFormPage;
