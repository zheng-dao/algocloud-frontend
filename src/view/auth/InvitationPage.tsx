import { i18n } from 'src/i18n';
import invitationActions from 'src/modules/tenant/invitation/tenantInvitationActions';
import { getHistory } from 'src/modules/store';
import queryString from 'query-string';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Content from 'src/view/auth/styles/Content';
import Wrapper from 'src/view/auth/styles/Wrapper';
import Logo from 'src/view/auth/styles/Logo';
import Spinner from 'src/view/shared/Spinner';
import invitationSelectors from 'src/modules/tenant/invitation/tenantInvitationSelectors';
import authActions from 'src/modules/auth/authActions';
import { useLocation } from 'react-router-dom';
import OtherActions from 'src/view/auth/styles/OtherActions';
import selectors from 'src/modules/auth/authSelectors';

function InviationPage() {
  const dispatch = useDispatch();
  const location = useLocation();

  const loading = useSelector(
    invitationSelectors.selectLoading,
  );
  const warningMessage = useSelector(
    invitationSelectors.selectWarningMessage,
  );
  const backgroundImageUrl = useSelector(
    selectors.selectBackgroundImageUrl,
  );
  const logoUrl = useSelector(selectors.selectLogoUrl);

  const token = queryString.parse(location.search).token;

  useEffect(() => {
    dispatch(invitationActions.doAcceptFromAuth(token));
  }, [dispatch, token]);

  const doAcceptWithWrongEmail = () => {
    dispatch(
      invitationActions.doAcceptFromAuth(token, true),
    );
  };

  const doSignout = async () => {
    await dispatch(authActions.doSignout());
    getHistory().push('/');
  };

  return (
    <Wrapper
    className="auth-page"
      style={{
        backgroundImage: `url(${
          backgroundImageUrl || ''
        })`,
      }}
    >
      <Content className="auth-page">
        
<main className="main" id="main">
   <div className="container-fluid" style={{overflow: "hidden"}}>
      <div className="min-vh-100 row" style={{backgroundColor: "var(--auth-login-pane) "}}>
         <div className="d-none d-lg-block col-6" style={{backgroundColor: "var(--auth-login-pane-bg)", boxShadow: "0 0 0 1px var(--card-border)"}}>
         </div>
         <div className="px-sm-0 align-self-center mx-auto py-0 col-sm-10 col-md-6">
            <div className="justify-content-center no-gutters row">
               <div className="col-xxl-6 col-lg-9 col-xl-9">
               <div className="card-2">
      <div className="card-header text-center p-2">
         <Logo style={{ marginBottom: '1rem', marginTop: '1rem' }}>
         {logoUrl ? (
         <img
            src={logoUrl("/assets/brand-assets/logo.svg")}
            width="240px"
            alt={i18n('app.title')}
            />
         ) : (
         <img style={{width: "60px"}} src="/assets/brand-assets/logo.svg" />
         )}
         </Logo>
      </div>
      <div className="card-body p-2 pt-3">
         <div className="row justify-content-start mb-1">
            <div className="col-auto">
               <h3>Confirm Email</h3>
            </div>
         </div>
         </div>
      <div className="card-body p-2">

      <div className="crayons-notice crayons-notice--danger" role="alert">

</div>
       

        <OtherActions>
          <a
            className="c-link c-link--branded c-link--block w-100 align-items-center "
            type="button"
            onClick={doSignout}
          ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-circle m-1" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
        </svg>
            {i18n('auth.signinWithAnotherAccount')}
          </a> 
        </OtherActions>
      </div>
   </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</main> 
        {loading && <Spinner />}

        {Boolean(warningMessage) && (
          <h4
            style={{
              textAlign: 'center',
            }}
          >
            {warningMessage}
          </h4>
        )}

        {Boolean(warningMessage) && (
          <button
            style={{ marginTop: '24px' }}
            type="submit"
            className="btn btn-primary btn-block crayons-btn"
            onClick={doAcceptWithWrongEmail}
          >
          <div className="crayons-notice crayons-notice--danger" role="alert">
      <h6 style={{ textAlign: 'start', color: 'red' }}>
        
      {i18n('tenant.invitation.acceptWrongEmail')}
        </h6>
        </div>
            
          </button>
        )}

        {!loading && (
          <OtherActions>
            <button
              className="btn btn-sm btn-link"
              type="button"
              onClick={doSignout}
            >
                        <div className="crayons-notice crayons-notice--danger" role="alert">
      <h6 style={{ textAlign: 'start', color: 'auto' }}>
        
      {i18n('auth.signout')}
      
        </h6>
        </div>
              
            </button>
          </OtherActions>
        )}
      </Content>
    </Wrapper>
  );
}

export default InviationPage;
