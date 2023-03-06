import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { i18n } from 'src/i18n';
import actions from 'src/modules/auth/authActions';
import selectors from 'src/modules/auth/authSelectors';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import Content from 'src/view/auth/styles/Content';
import Wrapper from 'src/view/auth/styles/Wrapper';
import Logo from 'src/view/auth/styles/Logo';
import OtherActions from 'src/view/auth/styles/OtherActions';
import ButtonIcon from 'src/view/shared/ButtonIcon';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  email: yupFormSchemas.string(i18n('user.fields.email'), {
    required: true,
    max: 255,
  }),
});

function ForgotPasswordPage() {
  const dispatch = useDispatch();

  const loading = useSelector(
    selectors.selectLoadingPasswordResetEmail,
  );

  const backgroundImageUrl = useSelector(
    selectors.selectBackgroundImageUrl,
  );
  const logoUrl = useSelector(selectors.selectLogoUrl);

  const [initialValues] = useState(() => ({ email: '' }));

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: initialValues,
  });

  const onSubmit = async ({ email }) => {
    await dispatch(actions.doSendPasswordResetEmail(email));
    Object.keys(initialValues).forEach((key: any) => {
      form.setValue(key, initialValues[key]);
    });
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
                      <div className="card-body p-4">
                        <div className="row flex-between-center mb-3">
                          <div className="col-auto ">
                            <h3>Reset PWD</h3>
                          </div>

                        </div>
                        <FormProvider {...form}>
                          <form onSubmit={form.handleSubmit(onSubmit)}>
                            <InputFormItem
                              name={'email'}
                              label={i18n('user.fields.email')}
                              autoComplete={'email'}
                              disabled={loading}
                              autoFocus
                            />

                            <button
                              type="submit"
                              className="crayons-btn btn btn-primary btn-block w-100 mt-3"
                              disabled={loading}
                            >
                              <ButtonIcon loading={loading} />{' '}
                              {i18n('auth.passwordResetEmail.message')}
                            </button>

                            <OtherActions>
                              <Link
                                className="c-pill"
                                to="/auth/signin"
                              >
                                {i18n('common.cancel')}
                                <svg fill="currentColor" className="crayons-icon c-pill__action-icon" aria-hidden="true" focusable="false" width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12 10.586 4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636l4.95 4.95z"></path></svg>
                              </Link>
                            </OtherActions>
                          </form>
                        </FormProvider>
                      </div>
                    </div>
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

export default ForgotPasswordPage;
