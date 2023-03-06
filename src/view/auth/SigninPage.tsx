import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { i18n } from 'src/i18n';
import actions from 'src/modules/auth/authActions';
import selectors from 'src/modules/auth/authSelectors';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import Content from 'src/view/auth/styles/Content';
import Logo from 'src/view/auth/styles/Logo';
import OtherActions from 'src/view/auth/styles/OtherActions';
import Wrapper from 'src/view/auth/styles/Wrapper';
import I18nSelect from 'src/view/layout/I18nSelect';
import ButtonIcon from 'src/view/shared/ButtonIcon';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import SocialButtons from 'src/view/auth/styles/SocialButtons';
import config from 'src/config';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import Message from 'src/view/shared/message';
import 'src/app.css';
import PipeLogin from 'src/view/Portfolio/components/PipeLogin';

const schema = yup.object().shape({
   email: yupFormSchemas.string(i18n('user.fields.email'), {
      required: true,
   }),
   password: yupFormSchemas.string(
      i18n('user.fields.password'),
      {
         required: true,
      },
   ),
   rememberMe: yupFormSchemas.boolean(
      i18n('user.fields.rememberMe'),
   ),
});

const videoSource = "/assets/video.mp4";
function SigninPage() {
   const location = useLocation();
   const dispatch = useDispatch();
   const loading = useSelector(selectors.selectLoading);

   const { socialErrorCode } = queryString.parse(
      location.search,
   );

   const externalErrorMessage = useSelector(
      selectors.selectErrorMessage,
   );

   const backgroundImageUrl = useSelector(
      selectors.selectBackgroundImageUrl,
   );
   const logoUrl = useSelector(selectors.selectLogoUrl);

   useEffect(() => {
      dispatch(actions.doClearErrorMessage());
   }, [dispatch]);

   useEffect(() => {
      if (socialErrorCode) {
         if (socialErrorCode === 'generic') {
            Message.error(i18n('errors.defaultErrorMessage'));
         } else {
            Message.error(
               i18n(`auth.social.errors.${socialErrorCode}`),
            );
         }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const [initialValues] = useState({
      email: '',
      password: '',
      rememberMe: true,
   });
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [rememberMe, setRememberMe] = useState(true);
   const [address, setAddress] = useState('');

   const form = useForm({
      resolver: yupResolver(schema),
      mode: 'onSubmit',
      defaultValues: initialValues,
   });

   const onSubmit = ({ email, password, rememberMe }) => {
      dispatch(
         actions.doSigninWithEmailAndPassword(
            email,
            password,
            rememberMe,
            address,
         ),
      );
   };

   const checkAll = (address) => {
      setAddress(address);
      dispatch(
         actions.doSigninWithEmailAndPassword(
            email,
            password,
            rememberMe,
            address
         ),
      );
   };

   const handleEmailChange = (email) => {
      setEmail(email);
   }

   const handlePasswordChange = (password) => {
      setPassword(password);
   }

   const handleRememberMe = (e) => {
      setRememberMe(e.target.checked);
   }

   return (
      <Wrapper className="main signin"
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
                                    <Logo style={{ marginBottom: '1rem', marginTop: '1rem' }}
                                       className="logo-margin">
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
                                       <div className="col-auto">
                                          <h3>Login</h3>
                                       </div>
                                    </div>
                                    <FormProvider {...form}>
                                       <form onSubmit={form.handleSubmit(onSubmit)}>
                                          <div className="mb-3">
                                             <div className="row flex-between-center">
                                                <div className="col-auto">
                                                   <label className="form-label">Email address</label>
                                                </div>
                                                <div className="col-auto">
                                                   <OtherActions className="mt-0">
                                                      <p className=" text-600 form-label" style={{ display: "flex" }}>or
                                                         <Link className="c-link" style={{ marginTop: "0px", marginLeft: " 0.5rem" }}
                                                            to="/auth/signup"
                                                         >
                                                            {i18n('auth.createAnAccount')}
                                                         </Link>
                                                      </p>
                                                   </OtherActions>
                                                </div>
                                             </div>
                                             <div className="col-auto fs--1 text-600" >
                                             </div>
                                             <InputFormItem
                                                name="email"
                                                placeholder={i18n('user.fields.email')}
                                                autoComplete="email"
                                                autoFocus
                                                externalErrorMessage={externalErrorMessage}
                                                onChange={handleEmailChange}
                                             />
                                          </div>
                                          <div className="mb-3">
                                             <label className="form-label" >Password</label>
                                             <InputFormItem
                                                name="password"
                                                placeholder={i18n('user.fields.password')}
                                                autoComplete="password"
                                                type="password"
                                                onChange={handlePasswordChange}
                                             />
                                          </div>
                                          <div className="row flex-between-center">
                                             <div className="col-auto">
                                                <div className="">
                                                </div>
                                                <div className="crayons-field crayons-field--checkbox crayons-block">
                                                   <input
                                                      className="crayons-checkbox"
                                                      type="checkbox"
                                                      id={'rememberMe'}
                                                      name={'rememberMe'}
                                                      ref={form.register}
                                                      onChange={handleRememberMe}
                                                   />
                                                   <label
                                                      className="crayons-field__label mb-0"
                                                      htmlFor={'rememberMe'}
                                                      style={{ paddingLeft: '0px !important' }}
                                                   >
                                                      {i18n('user.fields.rememberMe')}
                                                   </label>
                                                </div>
                                             </div>
                                             <div className="col-auto">
                                                <Link
                                                   className="fs--1 c-link"
                                                   style={{ paddingLeft: '0px' }}
                                                   to="/auth/forgot-password"
                                                >
                                                   {i18n('auth.forgotPassword')}
                                                </Link>
                                             </div>
                                          </div>
                                          <div className="mb-3">
                                             <div className="mb-3 mt-3" >
                                                <PipeLogin checkAll={checkAll}></PipeLogin>
                                             </div>
                                             {/* <button
                                                className="btn btn-primary btn-block w-100 mt-3 crayons-btn"
                                                type="submit"
                                                disabled={loading}
                                             >
                                                <ButtonIcon loading={loading} />
                                                {' '}
                                                {i18n('auth.signin')}
                                             </button> */}
                                          </div>
                                          {/* <div className="position-relative mt-4">
                                             <hr className="bg-300" />
                                             <div className="divider-content-center text-600" style={{ backgroundColor: "var(--auth-login-pane) " }} >or log in with
                                             </div>
                                          </div>
                                          <form >
                                             <SocialButtons className="row g-2 mt-2">
                                                <div className="row g-2 mt-2">
                                                   <div className="col-sm-6">
                                                      <a className="c-pill btn btn-outline-facebook btn-sm d-block w-100"
                                                         style={{ textAlign: "center", borderColor: "#3c5a99" }}
                                                         href={`${config.backendUrl}/auth/social/facebook`}
                                                      >
                                                         <svg className="svg-inline--fa fa-facebook-square fa-w-14 me-2" data-fa-transform="grow-8" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="facebook-square" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg="" ><g transform="translate(224 256)"><g transform="translate(0, 0)  scale(1.5, 1.5)  rotate(0 0 0)"><path fill="currentColor" d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z" transform="translate(-224 -256)"></path></g></g></svg>
                                                         facebook
                                                      </a>
                                                   </div>
                                                   <div className="col-sm-6">
                                                      <a className="c-pill btn btn-outline-google-plus btn-sm d-block w-100"
                                                         style={{ textAlign: "center", borderColor: "#dd4b39" }}
                                                         href={`${config.backendUrl}/auth/social/google`}
                                                      >
                                                         <svg className="svg-inline--fa fa-google-plus-g fa-w-20 me-2" data-fa-transform="grow-8" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google-plus-g" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" data-fa-i2svg=""><g transform="translate(320 256)"><g transform="translate(0, 0)  scale(1.5, 1.5)  rotate(0 0 0)"><path fill="currentColor" d="M386.061 228.496c1.834 9.692 3.143 19.384 3.143 31.956C389.204 370.205 315.599 448 204.8 448c-106.084 0-192-85.915-192-192s85.916-192 192-192c51.864 0 95.083 18.859 128.611 50.292l-52.126 50.03c-14.145-13.621-39.028-29.599-76.485-29.599-65.484 0-118.92 54.221-118.92 121.277 0 67.056 53.436 121.277 118.92 121.277 75.961 0 104.513-54.745 108.965-82.773H204.8v-66.009h181.261zm185.406 6.437V179.2h-56.001v55.733h-55.733v56.001h55.733v55.733h56.001v-55.733H627.2v-56.001h-55.733z" transform="translate(-320 -256)"></path></g></g></svg>
                                                         google
                                                      </a>
                                                   </div>
                                                </div>
                                             </SocialButtons>
                                          </form> */}
                                          <OtherActions>
                                             <div>
                                                <I18nSelect />
                                             </div>
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

export default SigninPage;
