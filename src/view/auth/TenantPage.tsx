import { i18n } from 'src/i18n';
import actions from 'src/modules/auth/authActions';
import selectors from 'src/modules/auth/authSelectors';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Content from 'src/view/auth/styles/Content';
import Logo from 'src/view/auth/styles/Logo';
import OtherActions from 'src/view/auth/styles/OtherActions';
import Wrapper from 'src/view/auth/styles/Wrapper';
import TenantNewForm from 'src/view/auth/TenantNewForm';
import TenantSelectForm from 'src/view/auth/TenantSelectForm';

function TenantPage() {
  const [view, setView] = useState('form');
  const dispatch = useDispatch();

  const invitedTenants = useSelector(
    selectors.selectInvitedTenants,
  );

  const backgroundImageUrl = useSelector(
    selectors.selectBackgroundImageUrl,
  );
  const logoUrl = useSelector(selectors.selectLogoUrl);

  useEffect(() => {
    setView(invitedTenants.length ? 'select' : 'form');
  }, [invitedTenants]);

  const doSignout = () => {
    dispatch(actions.doSignout());
  };

  const doToggleView = () => {
    setView((prevView) =>
      prevView === 'form' ? 'select' : 'form',
    );
  };

  return (
    <Wrapper
      className="auth-page"
      style={{
        backgroundImage: `url(${backgroundImageUrl || ''
          })`,
      }}
    >
      <Content className="auth-page">
        <main className="main" id="main">
          <div className="container-fluid" style={{ overflow: "hidden" }}>
            <div className="min-vh-100 row" style={{ backgroundColor: "var(--auth-login-pane) " }}>
              <div className="d-none d-lg-block col-6" style={{ backgroundColor: "var(--auth-login-pane-bg)", boxShadow: "0 0 0 1px var(--card-border)" }}>
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
                            <img style={{ width: "60px" }} src="/assets/brand-assets/logo.svg" />
                          )}
                        </Logo>
                      </div>
                    </div>




                    {view === 'form' ? (
                      <TenantNewForm
                        onViewToggle={doToggleView}
                      />
                    ) : (
                      <TenantSelectForm
                        onViewToggle={doToggleView} />
                    )}

                    <OtherActions>
                      <button
                        className="c-pill"
                        type="button"
                        onClick={doSignout}
                      >
                        {i18n('auth.signout')}
                      </button>
                    </OtherActions>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </Content>
    </Wrapper>
  );
}

export default TenantPage;
