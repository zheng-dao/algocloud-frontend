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
import I18nFlags from 'src/view/layout/I18nFlags';
import ButtonIcon from 'src/view/shared/ButtonIcon';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Typed from 'react-typed';
import SocialButtons from 'src/view/auth/styles/SocialButtons';
import config from 'src/config';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import Message from 'src/view/shared/message';
import { urlfy } from 'src/view/shared/urlfy';
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
function LandingPage() {
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
            address
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
      <Wrapper className="main-signin">
         <main className="main" id="main">
            <nav className="navbar navbar-inverse navbar navbar-standard navbar-expand-lg fixed-top navbar-dark navbar-glass-shadow" data-navbar-darken-on-scroll="data-navbar-darken-on-scroll" >
               <div className="container-fluid">
                  <a className="algocloud-navbar-brand" href=".">
                     <div className="algocloud-font dark__text-white-2 navbar-brand">algocloud</div>
                     <svg className="algocloud-font-logo" xmlns="http://www.w3.org/2000/svg" id="algocloud-font-logo" data-name="Layer 1" viewBox="0 0 230 230"><path d="M120.38942,116.97445q-4.12061.81445-8.23974,1.43652-4.12134.624-7.47413,1.10254A50.50469,50.50469,0,0,0,92.1238,122.867a20.24693,20.24693,0,0,0-8.33594,6.17969,15.37525,15.37525,0,0,0-2.97022,9.62988q0,8.335,6.08448,12.69531,6.08349,4.36084,15.47412,4.35938a33.942,33.942,0,0,0,15.90527-3.59278,27.81533,27.81533,0,0,0,10.82715-9.72558,25.1984,25.1984,0,0,0,3.92871-13.89356V112.90218a20.87085,20.87085,0,0,1-5.22217,2.251A76.457,76.457,0,0,1,120.38942,116.97445Z" fill="currentColor" /><path d="M114.9,5.14529a110,110,0,1,0,110,110A110,110,0,0,0,114.9,5.14529Zm58.66712,175.9776H134.85768V160.71371h-1.14941a40.93579,40.93579,0,0,1-9.48584,12.12109,42.77205,42.77205,0,0,1-14.27686,8.14453,58.15417,58.15417,0,0,1-19.25879,2.92188,60.81052,60.81052,0,0,1-25.104-4.93457,39.67133,39.67133,0,0,1-17.39062-14.65918q-6.37355-9.72363-6.37159-24.29,0-12.26367,4.50342-20.60059a36.46676,36.46676,0,0,1,12.26416-13.41357,59.42139,59.42139,0,0,1,17.67822-7.66553,133.236,133.236,0,0,1,20.83985-3.64111q12.83862-1.34034,20.69629-2.53906,7.85522-1.19679,11.40234-3.59327a8.00139,8.00139,0,0,0,3.54492-7.09033v-.57471q0-9.1018-5.70117-14.085-5.70117-4.9812-16.14453-4.98242-11.02,0-17.53467,4.83887a22.706,22.706,0,0,0-8.62353,12.1206L46.9944,75.72494A51.63992,51.63992,0,0,1,58.30055,52.48959,54.84107,54.84107,0,0,1,80.09889,37.35091Q93.4656,32.0328,111.09548,32.033a94.73173,94.73173,0,0,1,23.52295,2.87452,62.04052,62.04052,0,0,1,20.02539,8.91064,43.61658,43.61658,0,0,1,13.8457,15.47461q5.07788,9.43872,5.07764,22.56445Z" fill="currentColor" /></svg>
                  </a>
                  <button type="button" className="nav-link landing-mobile-btn dropdown-toggle navbar-toggle collapsed" data-toggle="collapse" data-target="#mainNavBar"><i className="fas fa-bars"></i></button>
                  <div id="mainNavBar" className="collapse navbar-collapse" >
                     <div className="nav navbar-nav">
                        <div className="dropdown">
                           <a className="nav-link fw-semi-bold dropdown-toggle" aria-haspopup="true" data-bs-toggle="dropdown" data-hide-on-body-scroll="data-hide-on-body-scroll" data-toggle="dropdown" aria-expanded="false" href="/">Contact</a>
                           <div aria-labelledby="react-aria3374201582-20" data-bs-popper="static" className="dropdown-menu-card mt-0 dropdown-menu">
                              <div className="shadow-none dark__bg-1000 card">
                                 <div className="scrollbar max-h-dropdown p-0 py-2 px-2 card-body"><a data-rr-ui-dropdown-item="" className="link-600 dropdown-item" href="mailto:contact@headline-inc.com">Admin Email</a><a data-rr-ui-dropdown-item="" className="link-600 dropdown-item" href="https://twitter.com/headline_crypto">Twitter (DM)</a><a data-rr-ui-dropdown-item="" className="link-600 dropdown-item" href="https://forum.ax">FORUM</a><a data-rr-ui-dropdown-item="" className="link-600 dropdown-item" href="https://www.headline-inc.com/contact/enterprise-hotline">Inv. Enquiry</a><a data-rr-ui-dropdown-item="" className="link-600 dropdown-item" href="https://discord.gg/qDcfQWny3H">(Discord DM)</a><a data-rr-ui-dropdown-item="" className="link-600 dropdown-item" href="https://t.me/headline_crypto">Group Help</a></div>
                              </div>
                           </div>
                        </div>
                        <div className="dropdown">
                           <a className="nav-link fw-semi-bold dropdown-toggle" aria-haspopup="true" data-bs-toggle="dropdown" data-hide-on-body-scroll="data-hide-on-body-scroll" data-toggle="dropdown" aria-expanded="false" href="/">Press</a>
                           <div aria-labelledby="react-aria3374201582-20" data-bs-popper="static" className="dropdown-menu-card mt-0 dropdown-menu">
                              <div className="shadow-none dark__bg-1000 card">
                                 <div className="scrollbar max-h-dropdown p-0 py-2 px-2 card-body"><a data-rr-ui-dropdown-item="" className="link-600 dropdown-item" href="https://cryptoslate.com/worlds-first-embeddable-dex-algoswap-launches-on-algorand">Crypto Slate</a><a data-rr-ui-dropdown-item="" className="link-600 dropdown-item" href="https://www.benzinga.com/pressreleases/22/01/g25287521/dolphin-defenders-algorand-start-up-headline-inc-makes-a-splash-with-a-new-csr-initiative">Benzinga</a><a data-rr-ui-dropdown-item="" className="link-600 dropdown-item" href="https://www.fxleaders.com/news/2021/10/26/algorand-algo-getting-ready-to-break-past-2/">FXLeaders</a><a data-rr-ui-dropdown-item="" className="link-600 dropdown-item" href="https://finance.yahoo.com/news/headline-x-ledger-partnership-confirmed-182600722.html">Yahoo Finance</a><a data-rr-ui-dropdown-item="" className="link-600 dropdown-item" href="https://algorand.foundation/news/headline-inc-development-award">Algorand Foundation</a><a data-rr-ui-dropdown-item="" className="link-600 dropdown-item" href="https://algonaut.space/headline-algorand">Algonaut Space</a></div>
                              </div>
                           </div>
                        </div>
                        <div className="dropdown">
                           <a className="nav-link fw-semi-bold dropdown-toggle" aria-haspopup="true" data-bs-toggle="dropdown" data-hide-on-body-scroll="data-hide-on-body-scroll" data-toggle="dropdown" aria-expanded="false" href="/landing#!">Ecosystem</a>
                           <div aria-labelledby="react-aria3374201582-24" data-bs-popper="static" className="dropdown-menu-card mt-0 dropdown-menu">
                              <div className="shadow-none dark__bg-1000 navbar-card-pages card">
                                 <div className="scrollbar max-h-dropdown card-body">
                                    <div className="row">
                                       <div className="col-xxl-3 col-6">
                                          <div className="flex-column navbar-nav">
                                             <p className="fw-medium text-500 text-700 mb-0 fw-bold nav-link">DeFi Projects</p>
                                             <a className="fw-medium py-1 link-600 nav-link" href="https://yieldly.finance">Yieldly</a><a className="fw-medium py-1 link-600 nav-link" href="https://tinyman.org">TinyMan</a>
                                             <a className="fw-medium py-1 link-600 nav-link" href="https://algomint.io">AlgoMint</a><a className="fw-medium py-1 link-600 nav-link" href="https://www.algofi.org">AlgoFi</a><a className="fw-medium py-1 link-600 nav-link" href="https://www.pact.fi">PactFi</a><a className="fw-medium py-1 link-600 nav-link" href="https://c3.io">C3 Protocol</a>
                                          </div>
                                       </div>
                                       <div className="col-xxl-3 col-6">
                                          <div className="flex-column navbar-nav">
                                             <div className="flex-column navbar-nav">
                                                <p className="fw-medium text-500 text-700 mb-0 fw-bold nav-link">Analytics</p>
                                                <a className="fw-medium py-1 link-600 nav-link" href="https://tinychart.org">TinyChart</a>
                                                <a className="fw-medium py-1 link-600 nav-link" href="https://www.tinyhero.app">TinyHero</a>
                                                <a className="fw-medium py-1 link-600 nav-link" href="https://www.asastats.com">ASA Stats</a>
                                                <a className="fw-medium py-1 link-600 nav-link" href="https://algogator.finance">Algogator</a>
                                                <a className="fw-medium py-1 link-600 nav-link" href="https://algocharts.net">AlgoCharts</a>
                                                <a className="fw-medium py-1 link-600 nav-link" href="https://www.asalytic.app">ASAlytic</a>
                                             </div>
                                          </div>
                                       </div>
                                       <div className="col-xxl-3 col-6">
                                          <div className="flex-column navbar-nav">
                                             <p className="fw-medium text-500 text-700 mb-0 fw-bold nav-link">NFT Marketplaces</p>
                                             <a className="fw-medium py-1 link-600 nav-link" href="https://algogems.io">AlgoGems</a><a className="fw-medium py-1 link-600 nav-link" href="https://ab2.gallery">AB2 Gallery</a><a className="fw-medium py-1 link-600 nav-link" href="https://www.randgallery.com">Rand Gallery</a><a className="fw-medium py-1 link-600 nav-link" href="https://www.nftexplorer.app">NFT Explorer</a><a className="fw-medium py-1 link-600 nav-link" href="https://dartroom.xyz">Dartroom</a><a className="fw-medium py-1 link-600 nav-link" href="https://zestbloom.com">Zest Bloom</a>
                                          </div>
                                       </div>
                                       <div className="col-xxl-3 col-6">
                                          <div className="flex-column navbar-nav">
                                             <p className="fw-medium text-500 text-700 mb-0 fw-bold nav-link">DAOs</p>
                                             <a className="fw-medium py-1 link-600 nav-link" href="https://www.xbacked.io">XBacked</a>
                                             <a className="fw-medium py-1 link-600 nav-link" href="https://algod.network">AlgodMonitor</a>
                                             <a className="fw-medium py-1 link-600 nav-link" href="https://algodao.fi">AlgoDAO</a>
                                             <a className="fw-medium py-1 link-600 nav-link" href="https://acorntoken.xyz">Acorn</a>
                                             <a className="fw-medium py-1 link-600 nav-link" href="https://www.coffeedao.dev">CoffeeDAO</a>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="dropdown">
                           <a className="nav-link fw-semi-bold dropdown-toggle" role="button" aria-haspopup="true" data-bs-toggle="dropdown" data-hide-on-body-scroll="data-hide-on-body-scroll" data-toggle="dropdown" aria-expanded="false" href="/landing#!">HEADLINE</a>
                           <div aria-labelledby="react-aria3374201582-28" data-bs-popper="static" className="dropdown-menu-card mt-0 dropdown-menu">
                              <div className="shadow-none dark__bg-1000 card sj-col">
                                 <div className="scrollbar max-h-dropdown p-0 py-2 px-2 card-body sj-col-2">
                                    <p className="fw-medium text-500 text-700 mb-0 fw-bold nav-link sj-color">Projects</p>
                                    <a className="link-600 dropdown-item" href="https://www.pipeline-ui.com">PIPELINE-UI</a><a className="link-600 dropdown-item" href="https://algopay.finance">AlgoPay</a><a className="link-600 dropdown-item" href="https://algo-glyph.vercel.app">AlgoGlyph</a><a className="link-600 dropdown-item" href="https://forum.ax/">FORUM</a><a className="link-600 dropdown-item" href="https://daotools.org">DAO Tools</a><a className="link-600 dropdown-item" href="https://algopay.finance/algoswap">AlgoSwap</a><a className="link-600 dropdown-item" href="https://algoastros.com/">AlgoAstros</a><a className="link-600 dropdown-item" href="https://www.libra-network.com">Libra Network</a><a className="link-600 dropdown-item" href="https://www.libra-network.com/bias-barometer">Bias Barometer</a><a className="link-600 dropdown-item" href="https://algocloud.org">AlgoCloud</a>
                                 </div>
                                 <div className="scrollbar max-h-dropdown p-0 py-2 px-2 card-body sj-col-2">
                                    <p className="fw-medium text-500 text-700 mb-0 fw-bold nav-link sj-color">Social</p>
                                    <a className="link-600 dropdown-item" href="https://t.me/headline_crypto">Telegram</a><a className="link-600 dropdown-item" href="https://www.reddit.com/r/HEADLINECrypto">Reddit</a><a className="link-600 dropdown-item" href="https://twitter.com/headline_crypto">Twitter</a><a className="link-600 dropdown-item" href="https://www.getrevue.co/profile/headline_crypto">Dispatch</a><a className="link-600 dropdown-item" href="https://discord.gg/qDcfQWny3H">Discord</a><a className="link-600 dropdown-item" href="https://forum.ax">FORUM</a><a className="link-600 dropdown-item" href="#">AlgoChat</a>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="dropdown">
                           <a className="nav-link fw-semi-bold dropdown-toggle" role="button" aria-haspopup="true" data-bs-toggle="dropdown" data-hide-on-body-scroll="data-hide-on-body-scroll" data-toggle="dropdown" aria-expanded="false" href="/landing#!">Algorand</a>
                           <div aria-labelledby="react-aria3374201582-28" data-bs-popper="static" className="dropdown-menu-card mt-0 dropdown-menu">
                              <div className="shadow-none dark__bg-1000 card">
                                 <div className="scrollbar max-h-dropdown p-0 py-2 px-2 card-body"><a data-rr-ui-dropdown-item="" className="link-600 dropdown-item" href="https://algorand.foundation">Algorand Foundation</a><a data-rr-ui-dropdown-item="" className="link-600 dropdown-item" href="https://www.algorand.com">Algorand Inc</a><a data-rr-ui-dropdown-item="" className="link-600 dropdown-item" href="https://developer.algorand.org">Developer Portal</a><a data-rr-ui-dropdown-item="" className="link-600 dropdown-item" href="https://coinmarketcap.com/currencies/algorand">CoinMarketCap</a><a data-rr-ui-dropdown-item="" className="link-600 dropdown-item" href="https://github.com/algorand">GitHub</a><a data-rr-ui-dropdown-item="" className="link-600 dropdown-item" href="https://twitter.com/algorand">Twitter</a><a data-rr-ui-dropdown-item="" className="link-600 dropdown-item" href="https://www.youtube.com/channel/UCYqAUajjZd0PuHyHslY_8Ww">YouTube</a></div>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="ms-auto navbar-nav">
                        <div className="nav-item">
                           <button className="nav-link c-pill crayons-tooltip__activator" type="button" aria-disabled="false">
                              <div>
                                 <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chart-pie" className="svg-inline--fa fa-chart-pie fa-w-17 d-none d-lg-inline-block" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 544 512" id="dashboardTooltip">
                                    <path fill="currentColor" d="M527.79 288H290.5l158.03 158.03c6.04 6.04 15.98 6.53 22.19.68 38.7-36.46 65.32-85.61 73.13-140.86 1.34-9.46-6.51-17.85-16.06-17.85zm-15.83-64.8C503.72 103.74 408.26 8.28 288.8.04 279.68-.59 272 7.1 272 16.24V240h223.77c9.14 0 16.82-7.68 16.19-16.8zM224 288V50.71c0-9.55-8.39-17.4-17.84-16.06C86.99 51.49-4.1 155.6.14 280.37 4.5 408.51 114.83 513.59 243.03 511.98c50.4-.63 96.97-16.87 135.26-44.03 7.9-5.6 8.42-17.23 1.57-24.08L224 288z"></path>
                                 </svg>
                              </div>
                              <span data-testid="tooltip" className="crayons-tooltip__content">Dashboard</span>
                           </button>
                        </div>
                        <div className="nav-item">
                           <button className="nav-link c-pill crayons-tooltip__activator" type="button" aria-disabled="false">
                              <div>
                                 <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="book" className="svg-inline--fa fa-book fa-w-14 d-none d-lg-inline-block" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" id="documentationTooltip">
                                    <path fill="currentColor" d="M448 360V24c0-13.3-10.7-24-24-24H96C43 0 0 43 0 96v320c0 53 43 96 96 96h328c13.3 0 24-10.7 24-24v-16c0-7.5-3.5-14.3-8.9-18.7-4.2-15.4-4.2-59.3 0-74.7 5.4-4.3 8.9-11.1 8.9-18.6zM128 134c0-3.3 2.7-6 6-6h212c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H134c-3.3 0-6-2.7-6-6v-20zm0 64c0-3.3 2.7-6 6-6h212c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H134c-3.3 0-6-2.7-6-6v-20zm253.4 250H96c-17.7 0-32-14.3-32-32 0-17.6 14.4-32 32-32h285.4c-1.9 17.1-1.9 46.9 0 64z"></path>
                                 </svg>
                              </div>
                              <span data-testid="tooltip" className="crayons-tooltip__content">Documentation</span>
                           </button>
                        </div>
                        <li className="nav-item dropdown">
                           <a className="nav-link dropdown-toggle" id="navbarDropdownLogin" role="button" aria-haspopup="true"
                              data-bs-toggle="dropdown"
                              data-hide-on-body-scroll="data-hide-on-body-scroll"
                              aria-expanded="true"
                              data-toggle="dropdown" >Login</a>
                           <div className="dropdown-menu dropdown-menu-end dropdown-menu-card " aria-labelledby="navbarDropdownNotification">
                              <div className="navbar-card-login shadow-none card">
                                 <Content className="mobile-login-card" style={{ padding: '0px' }}>
                                    <Logo className="login-header" >
                                       <a className="font-sans-serif fw-bolder fs-4 z-index-1 position-relative link-light light" href="."></a>
                                       {logoUrl ? (
                                          <img
                                             src={logoUrl}
                                             width="240px"
                                             alt={i18n('app.title')}
                                          />
                                       ) : (
                                          <img className="login-header-img" alt="AlgoCloud" title="AlgoCloud" src="/assets/brand-assets/logo.svg" />
                                       )}
                                    </Logo>
                                    <div className="fs--1 fw-normal p-4 card-body">
                                       <div className="d-flex justify-content-between align-items-center mb-2">
                                          <h5>Log in</h5>
                                          <div className="fs--1 text-600 mb-0" style={{ display: "flex" }}>or
                                             <OtherActions style={{ marginTop: "0px", marginLeft: ".5rem" }}>
                                                <Link style={{ color: "var(--link-brand-color)", marginTop: "0px" }}
                                                   to="/auth/signup"
                                                >
                                                   {i18n('auth.createAnAccount')}
                                                </Link>
                                             </OtherActions>
                                          </div>
                                       </div>
                                       <FormProvider {...form}>
                                          <form onSubmit={form.handleSubmit(onSubmit)}>
                                             <div className="mb-3">
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
                                                <InputFormItem
                                                   name="password"
                                                   placeholder={i18n('user.fields.password')}
                                                   autoComplete="password"
                                                   type="password"
                                                   onChange={handlePasswordChange}
                                                />
                                             </div>
                                             <div className="justify-content-between align-items-center row">
                                                <div className="col-auto">
                                                   <div className="form-check mb-0 text-600">
                                                      <input
                                                         className={"form-check-input "}
                                                         type={"checkbox"}
                                                         id={'rememberMe'}
                                                         name={'rememberMe'}
                                                         ref={form.register}
                                                         onChange={handleRememberMe}
                                                      />
                                                      <label
                                                         className="form-check-label mb-0"
                                                         htmlFor={'rememberMe'}
                                                         style={{ paddingLeft: '0px !important' }}
                                                      >
                                                         {i18n('user.fields.rememberMe')}
                                                      </label>
                                                   </div>
                                                </div>
                                                <div className="col-auto">
                                                   <Link
                                                      style={{ color: "var(--link-brand-color)", marginTop: "0px", paddingLeft: "0px" }}
                                                      className="fs--1"
                                                      to="/auth/forgot-password"
                                                   >
                                                      {i18n('auth.forgotPassword')}
                                                   </Link>
                                                </div>
                                             </div>
                                             <div>
                                                <div className="mb-3">
                                                   <div className="mb-3 mt-3" >
                                                      <PipeLogin checkAll={checkAll}></PipeLogin>
                                                   </div>
                                                   {/* <button
                                                      className="btn btn-primary d-block w-100 mt-3"
                                                      type="submit"
                                                      disabled={loading}
                                                   >
                                                      <ButtonIcon loading={loading} />
                                                      {' '}
                                                      {i18n('auth.signin')}
                                                   </button> */}
                                                </div>
                                             </div>
                                             {/* <div className="w-100 position-relative text-center mt-4">
                                                <hr className="text-300" />
                                                <div className="divider-content-center text-600">or log in with</div>
                                             </div>
                                             <div className="mb-0">
                                                <div className="row">
                                                   <SocialButtons className="mt-0">
                                                      <div className="row g-2 mt-2 w-100">
                                                         <div className="col-sm-6">
                                                            <a className="btn-outline-facebook mt-2 w-100 btn btn-sm"
                                                               href={`${config.backendUrl}/auth/social/facebook`}
                                                            >
                                                               <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="facebook-square" className="svg-inline--fa fa-facebook-square fa-w-14 me-2" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style={{ transformOrigin: "0.4375em 0.5em" }}>
                                                                  <g transform="translate(224 256)">
                                                                     <g transform="translate(0, 0)  scale(1.5, 1.5)  rotate(0 0 0)">
                                                                        <path fill="currentColor" d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z" transform="translate(-224 -256)"></path>
                                                                     </g>
                                                                  </g>
                                                               </svg> facebook
                                                            </a>
                                                         </div>
                                                         <div className="col-sm-6">
                                                            <a className="btn-outline-google-plus mt-2 w-100 btn btn-sm"
                                                               href={`${config.backendUrl}/auth/social/google`}
                                                            >
                                                               <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google-plus-g" className="svg-inline--fa fa-google-plus-g fa-w-20 me-2" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" style={{ transformOrigin: "0.625em 0.5em" }}>
                                                                  <g transform="translate(320 256)">
                                                                     <g transform="translate(0, 0)  scale(1.5, 1.5)  rotate(0 0 0)">
                                                                        <path fill="currentColor" d="M386.061 228.496c1.834 9.692 3.143 19.384 3.143 31.956C389.204 370.205 315.599 448 204.8 448c-106.084 0-192-85.915-192-192s85.916-192 192-192c51.864 0 95.083 18.859 128.611 50.292l-52.126 50.03c-14.145-13.621-39.028-29.599-76.485-29.599-65.484 0-118.92 54.221-118.92 121.277 0 67.056 53.436 121.277 118.92 121.277 75.961 0 104.513-54.745 108.965-82.773H204.8v-66.009h181.261zm185.406 6.437V179.2h-56.001v55.733h-55.733v56.001h55.733v55.733h56.001v-55.733H627.2v-56.001h-55.733z" transform="translate(-320 -256)"></path>
                                                                     </g>
                                                                  </g>
                                                               </svg> google
                                                            </a>
                                                         </div>
                                                      </div>
                                                   </SocialButtons>
                                                </div>
                                             </div> */}
                                          </form>
                                          <div className="">
                                             <I18nFlags className="built-by-flags" />
                                          </div>
                                       </FormProvider>
                                    </div>
                                 </Content>
                                 <div className="nav-item dropdown">
                                 </div>
                              </div>
                           </div>
                        </li>
                        <li id="register-link" className="nav-link">
                           <Link
                              to="/auth/signup"
                           >
                              {i18n('Register')}
                           </Link>
                        </li>
                     </div>
                  </div>
               </div>
            </nav>
            <section className="ac-landing py-0 overflow-hidden light" id="banner">
               <div className="bg-holder overlay" style={{ backgroundImage: "url(/assets/light-bg-01.png)", backgroundPosition: "centerBottom" }}></div>
               <div className="container">
                  <div className="justify-content-center align-items-center pt-8 pb-lg-9 pt-lg-9 pb-xl-0 row">
                     <div className="pb-7 pb-xl-9 text-center text-xl-start col-xl-4 col-lg-8 col-md-11">
                        <a role="button" href="https://forum.ax" className="mb-4 fs--1 border-2 rounded-pill btn btn-outline-danger forum-cta"><span className="me-2" role="img" aria-label="Gift">🚀</span>Become a trailblazer</a>
                        <h1 className="text-white-2 fw-light">
                           Bring
                           <Typed
                              strings={['power', 'performance', 'speed', 'rocket fuel']}
                              typeSpeed={40}
                              backSpeed={50}
                              className="fw-bold ps-2"
                              loop
                           />
                           <br />
                           to your Algorand DeFi experience
                        </h1>
                        <p className="lead text-white-2 opacity-90">With the unlimited horsepower of AlgoCloud, you can now navigate the Algorand DeFi ecosystem like never before. Pilot your own ship, the stars are the limit!</p>
                        <Link role="button" className="border-2 rounded-pill mt-4 fs-0 py-2 btn btn-outline-light btn-lg"
                           to="/auth/signup"
                        >
                           {i18n('Start your journey')}
                           <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="play" className="svg-inline--fa fa-play fa-w-14 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
                              style={{ transformOrigin: '0.75em 0.5625em' }}>
                              <g transform="translate(224 256)">
                                 <g transform="translate(160, 32)  scale(0.625, 0.625)  rotate(0 0 0)">
                                    <path fill="currentColor" d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z" transform="translate(-224 -256)"></path>
                                 </g>
                              </g>
                           </svg>
                        </Link>
                     </div>
                     <div className="align-self-end mt-4 mt-xl-0 col-xl-7 offset-xl-1"><a className="img-landing-banner" href="/"><img className="img-fluid" src="/assets/dashboard-darkMode.png" alt="" /></a></div>
                  </div>
               </div>
            </section>
            <section className="ac-landing bg-light py-3 shadow-sm">
               <div className="container">
                  <div className="flex-center row">
                     <div className="my-1 my-sm-3 px-card col-sm-auto col-3">
                        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%233c465c' viewBox='0 0 285.8 51.9'%3E%3Cpath d='M72.8 42.8v5c0 .3-.1.5-.2.7-.2.2-.4.3-.7.3H45c-.7 0-1.1-.4-1.1-1.1V4.3c0-.7.3-1.1.9-1.1h26.5c.5 0 .7.3.7 1v4.7c0 .8-.3 1.1-1 1.1H53c-.6 0-.9.3-.9.8v10.7c0 .6.2.9.7.9h12.5c.6 0 .9.3.9 1v5c0 .3-.1.4-.2.6-.1.1-.3.2-.6.2H52.8c-.5 0-.7.2-.7.7v11.4c0 .5.2.7.6.7h19.2c.5-.1.9.2.9.8zM244 3.2h-5.1c-.6 0-.9.3-.9 1v28c0 .3-.1.5-.2.6s-.3-.1-.6-.4L219.6 4c-.2-.3-.4-.5-.6-.7-.2-.1-.5-.2-.8-.2h-5.5c-.6 0-.9.4-.9 1.1v43.4c0 .7.3 1 1 1h4.8c.3 0 .6-.1.8-.3s.2-.4.2-.8V18.3c0-.2.1-.3.2-.3s.2.1.4.3L237.8 48c.2.3.4.5.6.6s.4.1.7.1h4.5c.3 0 .5-.1.7-.3s.3-.4.3-.7V4.1c.1-.6-.1-.9-.6-.9zm-41.6 0h-6.5c-.6 0-.9.4-.9 1.1v43.3c0 .4.1.7.2.8.2.2.5.3.9.3h5.7c.5 0 .8-.1 1-.3s.3-.6.3-1.1V4.2c.1-.7-.2-1-.7-1zm-14.5 38.7H170c-.4 0-.6-.2-.6-.7v-37c0-.7-.3-1-.8-1H162c-.6 0-.9.4-.9 1.1v43.3c0 .4.1.7.2.8.2.2.4.3.8.3h25.6c.3 0 .6-.1.7-.3.2-.2.2-.4.2-.7v-5c.2-.5-.1-.8-.7-.8zm-36-28.1c1.5 3.3 2.2 7.3 2.2 11.9 0 4.8-.8 9-2.4 12.4s-4 6.1-7.2 7.9-7.3 2.7-12.2 2.7h-10.6c-.7 0-1.1-.4-1.1-1.3v-43c0-.4.1-.7.3-.9s.5-.3.9-.3h8.7c1 0 1.8 0 2.3.1 4.9.1 9 1.1 12.2 2.9 3 1.8 5.4 4.4 6.9 7.6zm-6.3 12c0-3.9-.5-7-1.5-9.4-1-2.3-2.6-4-4.7-5.1s-4.8-1.6-8-1.6h-2c-.3 0-.5.3-.5.8v30.8c0 .5.2.7.7.7h1.4c3.3 0 6.1-.5 8.3-1.6s3.8-2.8 4.9-5.2c.8-2.2 1.4-5.4 1.4-9.4zm-31.3 21.4c.1.3.1.7 0 1s-.3.5-.6.5H107c-.5 0-.9-.3-1-.8l-3.2-9.9c0-.2-.1-.3-.2-.4s-.3-.1-.5-.1H87.9c-.3 0-.5.2-.6.5L84 48c0 .2-.1.4-.3.6-.2.1-.4.2-.7.2h-5.3c-.3 0-.5-.2-.7-.4-.1-.3-.1-.7 0-1.1l13.9-43c.1-.4.3-.7.5-.9s.5-.3.9-.3H99c.8 0 1.3.4 1.6 1.2l13.7 42.9zm-13.7-17.8l-5.3-16.3c-.1-.3-.2-.4-.4-.4-.1 0-.2.2-.4.5l-5.3 16.3c-.1.4-.1.6 0 .8.1.1.2.2.4.2h10.5c.2 0 .3-.1.4-.2.2-.2.3-.5.1-.9zm180.6 12.5H262c-.4 0-.6-.2-.6-.7V29.8c0-.5.2-.7.7-.7h12.6c.3 0 .5-.1.6-.2s.2-.3.2-.6v-5c0-.6-.3-1-.9-1h-12.5c-.5 0-.7-.3-.7-.9V10.8c0-.6.3-.8.9-.8h18.1c.7 0 1-.4 1-1.1V4.2c0-.6-.3-1-.7-1h-26.5c-.6 0-.9.4-.9 1.1v43.3c0 .8.4 1.1 1.1 1.1h26.8c.3 0 .6-.1.7-.3.2-.2.2-.4.2-.7v-5c0-.5-.3-.8-.9-.8zM35 3.2h-6.5c-.5 0-.8.4-.8.8v11.2c0 .7-.6 1.3-1.3 1.3H13.1c-.7 0-1.3-.6-1.3-1.3V4c0-.5-.4-.8-.8-.8H4.5c-.4 0-.8.4-.8.8v43.8c0 .5.4.8.8.8H11c.5 0 .8-.4.8-.8V26.3c0-.7.6-1.3 1.3-1.3h13.3c.7 0 1.3.6 1.3 1.3v21.6c0 .5.4.8.8.8H35c.5 0 .8-.4.8-.8V4.1c.1-.5-.3-.9-.8-.9z'/%3E%3C/svg%3E" height="40" alt="Partner" className="landing-cta-img" />
                     </div>
                     <div className="my-1 my-sm-3 px-card col-sm-auto col-3">
                        <img src="data:image/svg+xml,%3Csvg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 247.98162 45.86078'%3E%3Cpath d='M49.35,6.49941H38.9383l4.59117,8.95985H50.156a6.1369,6.1369,0,0,1,.00484,12.27379h-.34164l4.06032,7.9238a14.71263,14.71263,0,0,0,3.43662-1.59461,14.92732,14.92732,0,0,0,6.95427-12.62653h0A14.93742,14.93742,0,0,0,49.35,6.49869h-.00071Z' transform='translate(-4.27038 -4.4141)' fill='%233c465c'/%3E%3Cpolygon points='28.79 23.319 24.283 23.319 24.26 23.301 14.084 43.354 24.138 43.354 30.007 31.788 32.016 31.788 37.043 31.801 32.791 23.319 28.79 23.319' fill='%233c465c'/%3E%3Cpath d='M55.48929,44.80591,51.113,36.26533l-4.37215-8.53228L40.4511,15.45926,35.85994,6.49941h0A3.8319,3.8319,0,0,0,32.449,4.4141H27.53556a3.83321,3.83321,0,0,0-3.411,2.08455l-19.63,38.30651a2.03382,2.03382,0,0,0,1.81082,2.96119h7.025L27.44687,20.21946a2.86213,2.86213,0,0,1,5.0922,0l3.84962,7.51217,4.37011,8.52744,5.89677,11.50662h7.025a2.03379,2.03379,0,0,0,1.81006-2.9612l-.00138.00071Z' transform='translate(-4.27038 -4.4141)' fill='%233c465c'/%3E%3Cpath d='M76.34014,42.22312a1.23955,1.23955,0,0,1,0-.92481l10.956-30.4917a1.69547,1.69547,0,0,1,.396-.68212,1.11573,1.11573,0,0,1,.748-.19776h6.6001a1.31446,1.31446,0,0,1,1.31983.96777l10.86816,30.4917a1.15691,1.15691,0,0,1,0,.77051.522.522,0,0,1-.52832.418h-6.46777a.78568.78568,0,0,1-.83594-.61621L97.1082,35.53464a.7838.7838,0,0,0-.15429-.35156.52448.52448,0,0,0-.418-.13281H85.8001a.55258.55258,0,0,0-.57178.44043l-2.332,6.51171a.8617.8617,0,0,1-.28613.418,1.04108,1.04108,0,0,1-.63819.1543H76.91191A.59473.59473,0,0,1,76.34014,42.22312ZM94.73223,29.1987q.61522,0,.396-.748l-3.69629-10.2959c-.08789-.17627-.18359-.26416-.28564-.26416-.10352,0-.19824.103-.28613.3081l-3.74024,10.252q-.30834.74853.396.748Z' transform='translate(-4.27038 -4.4141)' fill='%233c465c'/%3E%3Cpath d='M117.96416,41.519a1.064,1.064,0,0,1-.26416.81347,1.36585,1.36585,0,0,1-.92432.24219h-4.66357q-.96827,0-.96826-.92383l.13183-30.88818q0-.835.70411-.83594H117.304q.65992,0,.66016.792Z' transform='translate(-4.27038 -4.4141)' fill='%233c465c'/%3E%3Cpath d='M147.06914,18.46286a.97581.97581,0,0,1,.24219.748v2.9917a1.13146,1.13146,0,0,1-.26367.85791.83078.83078,0,0,1-.74805.1543,10.16,10.16,0,0,0-1.12207-.11035,3.75055,3.75055,0,0,0-.94629.0664q-1.18653.17579-.87988,1.01172.08789.39624.24218.87988a3.63437,3.63437,0,0,1,.15332,1.1001,6.15372,6.15372,0,0,1-1.16552,3.62988,7.77041,7.77041,0,0,1-3.542,2.61817,15.68784,15.68784,0,0,1-5.896.96777,15.94326,15.94326,0,0,0-2.81592.19824,3.961,3.961,0,0,0-1.51807.52832.91463.91463,0,0,0-.46191.72559.8543.8543,0,0,0,.68213.81445,8.245,8.245,0,0,0,2.08984.33008l6.292.35156q4.48827.26367,6.55615,1.98047a5.4596,5.4596,0,0,1,2.06836,4.39942,6.33814,6.33814,0,0,1-3.16846,5.45605q-3.16773,2.1123-9.32812,2.11231-6.38013,0-9.5918-1.40821-3.2124-1.40918-3.21192-4.26758a3.08614,3.08614,0,0,1,1.188-2.50878,10.22807,10.22807,0,0,1,3.03614-1.62793q.57128-.21973,0-.4834a6.11937,6.11937,0,0,1-1.82618-1.29785,2.74133,2.74133,0,0,1-.72607-1.958,2.53544,2.53544,0,0,1,.57178-1.60645,6.10387,6.10387,0,0,1,1.54-1.34179,11.39437,11.39437,0,0,1,2.15625-1.05664.58525.58525,0,0,0,.3081-.24122q.08716-.1538-.22021-.28613a8.05872,8.05872,0,0,1-3.168-2.46387,5.77992,5.77992,0,0,1-1.1001-3.5205,6.21157,6.21157,0,0,1,2.83789-5.27979q2.83814-2.02368,8.29443-2.02392a14.63708,14.63708,0,0,1,4.17969.52783,7.94879,7.94879,0,0,1,2.86035,1.45215.96127.96127,0,0,0,.6377.19775.75717.75717,0,0,0,.55029-.28564,7.109,7.109,0,0,1,1.36377-1.27637,7.79513,7.79513,0,0,1,1.67188-.92383,4.25292,4.25292,0,0,1,1.54-.352A.91222.91222,0,0,1,147.06914,18.46286ZM129.84355,41.25437a4.02789,4.02789,0,0,0-1.67187.26465,3.48254,3.48254,0,0,0-1.32031.87988,1.88475,1.88475,0,0,0-.52783,1.31934,2.409,2.409,0,0,0,.748,1.76074,5.03263,5.03263,0,0,0,2.41992,1.14355,20.26924,20.26924,0,0,0,4.4878.39649,10.10636,10.10636,0,0,0,4.5542-.81446,2.52486,2.52486,0,0,0,1.562-2.30957,1.94906,1.94906,0,0,0-.85791-1.584,4.66889,4.66889,0,0,0-2.61817-.74805Zm6.666-12.29785a3.6157,3.6157,0,0,0,1.07813-2.66162,3.99187,3.99187,0,0,0-1.07813-2.88233,4.54779,4.54779,0,0,0-3.41016-1.12207,4.67894,4.67894,0,0,0-3.34375,1.12207,3.78944,3.78944,0,0,0-1.188,2.88233,3.44993,3.44993,0,0,0,1.188,2.66162,4.794,4.794,0,0,0,3.34375,1.07812A4.65909,4.65909,0,0,0,136.50957,28.95652Z' transform='translate(-4.27038 -4.4141)' fill='%233c465c'/%3E%3Cpath d='M153.9334,41.47507a10.90714,10.90714,0,0,1-4.15723-4.24609,12.556,12.556,0,0,1-1.49609-6.18164,12.88191,12.88191,0,0,1,1.54-6.40284,11.10736,11.10736,0,0,1,4.22363-4.29,12.92456,12.92456,0,0,1,12.27637.022,10.89,10.89,0,0,1,4.11328,4.312,13.16432,13.16432,0,0,1,1.47461,6.31494,12.6584,12.6584,0,0,1-1.4961,6.22559,10.92288,10.92288,0,0,1-4.1582,4.24609,13.09019,13.09019,0,0,1-12.32031,0Zm8.91015-3.80664a5.13825,5.13825,0,0,0,1.6504-2.57422,13.82521,13.82521,0,0,0,.5498-4.17969,14.14041,14.14041,0,0,0-.5498-4.29,5.27875,5.27875,0,0,0-1.6504-2.57374,4.63419,4.63419,0,0,0-5.43359,0,5.32852,5.32852,0,0,0-1.69434,2.57374,13.60226,13.60226,0,0,0-.57226,4.29,13.26292,13.26292,0,0,0,.57226,4.20215A5.1814,5.1814,0,0,0,157.41,37.66843a4.72841,4.72841,0,0,0,5.43359,0Z' transform='translate(-4.27038 -4.4141)' fill='%233c465c'/%3E%3Cpath d='M201.52031,25.56882a9.58919,9.58919,0,0,1-4.20215,3.36621,15.55242,15.55242,0,0,1-6.18164,1.14356h-6.60058a.42757.42757,0,0,0-.4834.48437v11q0,1.01222-1.14453,1.01172h-5.63184a.76553.76553,0,0,1-.92383-.87988V10.76267q0-.835.70411-.83594h13.20019a18.19683,18.19683,0,0,1,6.44531,1.1001,10.2049,10.2049,0,0,1,4.64258,3.34375,9.15241,9.15241,0,0,1,1.71582,5.72021A9.38516,9.38516,0,0,1,201.52031,25.56882Zm-7.04-8.14014a3.93047,3.93047,0,0,0-1.8916-1.47412,7.67324,7.67324,0,0,0-2.8164-.48388h-4.88379q-.83643,0-.83594.748v7.52393q0,.83643.61621.83594h5.41113a5.30621,5.30621,0,0,0,3.69629-1.23194,4.33371,4.33371,0,0,0,1.36426-3.38818A4.47023,4.47023,0,0,0,194.48027,17.42868Z' transform='translate(-4.27038 -4.4141)' fill='%233c465c'/%3E%3Cpath d='M215.75469,42.28855a9.80633,9.80633,0,0,1-3.89453.72656,7.35667,7.35667,0,0,1-5.25782-1.80469,6.0653,6.0653,0,0,1-1.91406-4.62011,6.52756,6.52756,0,0,1,1.54-4.31153,9.99145,9.99145,0,0,1,4.40039-2.88183,21.5671,21.5671,0,0,1,6.81934-1.12207l1.54-.13184a.92789.92789,0,0,0,.48437-.13184.51719.51719,0,0,0,.21973-.48437v-.92432a3.49529,3.49529,0,0,0-.96778-2.61767,3.8053,3.8053,0,0,0-2.77246-.94629,5.666,5.666,0,0,0-2.52929.59424,4.88966,4.88966,0,0,0-2.0459,2.04589.75148.75148,0,0,1-.3086.396,1.1867,1.1867,0,0,1-.66015,0l-4.39942-1.01221a.62877.62877,0,0,1-.374-.28564q-.11133-.19849.15332-.85791a7.28844,7.28844,0,0,1,3.80664-3.8501,15.80851,15.80851,0,0,1,6.666-1.25391,15.01847,15.01847,0,0,1,5.80761.92383,6.37254,6.37254,0,0,1,3.124,2.57373,7.4683,7.4683,0,0,1,.96777,3.8501V41.60691a1.21964,1.21964,0,0,1-.17578.748.81046.81046,0,0,1-.66016.21973h-4.53125a.71729.71729,0,0,1-.68261-.35156,2.1549,2.1549,0,0,1-.24219-.88086l-.08789-.96777q-.0879-.791-.96778-.044A10.97844,10.97844,0,0,1,215.75469,42.28855ZM219.032,31.44284l-1.23144.0879a11.1892,11.1892,0,0,0-2.28809.33007,8.69705,8.69705,0,0,0-2.06836.792,4.79869,4.79869,0,0,0-1.51758,1.27539,2.83593,2.83593,0,0,0-.59375,1.78222,2.5758,2.5758,0,0,0,.92383,2.08985,3.86459,3.86459,0,0,0,2.55176.7705,5.11364,5.11364,0,0,0,1.958-.35253A6.12069,6.12069,0,0,0,218.24,37.3823a6.23114,6.23114,0,0,0,1.05664-1.14356,2.06008,2.06008,0,0,0,.39551-1.18847V32.19089Q219.69219,31.44236,219.032,31.44284Z' transform='translate(-4.27038 -4.4141)' fill='%233c465c'/%3E%3Cpath d='M230.78008,49.70261a.67363.67363,0,0,1-.61524-.7041v-3.3877a.63018.63018,0,0,1,.26368-.48437,1.65855,1.65855,0,0,1,1.01171-.21973h2.99219a2.9631,2.9631,0,0,0,1.51758-.39648,3.54383,3.54383,0,0,0,1.10059-.96778,3.68375,3.68375,0,0,0,.59375-1.23144,1.63862,1.63862,0,0,0-.08789-1.18848l-8.44825-20.812a.749.749,0,0,1,.02246-.72607.72906.72906,0,0,1,.68164-.32959h5.54395a.99989.99989,0,0,1,.61621.19775.94993.94993,0,0,1,.35156.55029l4.88477,13.11182c.08789.26367.2041.40332.35156.418.14649.01465.27832-.13867.39649-.46192l4.83984-13.1123a2.01049,2.01049,0,0,1,.39551-.50586.82226.82226,0,0,1,.57226-.19775h3.78418a.63969.63969,0,0,1,.61621.32959.71075.71075,0,0,1,0,.68212l-9.0205,22.30811a19.30032,19.30032,0,0,1-1.91407,3.71777,7.98321,7.98321,0,0,1-2.17773,2.2002,7.467,7.467,0,0,1-2.70606,1.05566,19.6373,19.6373,0,0,1-3.58593.28614A10.51567,10.51567,0,0,1,230.78008,49.70261Z' transform='translate(-4.27038 -4.4141)' fill='%233c465c'/%3E%3C/svg%3E" height="40" alt="Partner" className="landing-cta-img" />
                     </div>
                     <div className="my-1 my-sm-3 px-card col-sm-auto col-3">
                        <img src="data:image/svg+xml,%3Csvg id='svg' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 237.3905 38.41434'%3E%3Cpath d='M39.25256,24.81917l3.89287-2.07555-1.86479-5.59743-4.338.67183a15.31038,15.31038,0,0,0-1.93917-2.44566l1.63142-4.04528L31.61014,8.23849,28.74427,11.513a14.88927,14.88927,0,0,0-3.09163-.62905L24.31222,6.76556l-.16715.02572v6.93487a12.1395,12.1395,0,0,1,4.48467.84109,12.141,12.141,0,0,0-4.48467-.84006v-.001l-.001,0V6.79128l-5.66778.8398-.091,4.34211a15.1,15.1,0,0,0-2.7731,1.51267l-3.67409-2.2913L8.02332,15.6078,10.76276,19.014A15.1955,15.1955,0,0,0,9.6251,21.92953l-4.31937.61128-.1603,5.89735,4.33319.85557A14.94342,14.94342,0,0,0,10.467,32.2162L7.51982,35.49481l3.66439,4.62089,3.90973-2.14765a15.15261,15.15261,0,0,0,2.59781,1.58174l-.15235,4.445,5.78143,1.18508.82321-2.13085V38.10644a12.212,12.212,0,0,1-9.79161-4.99384,12.21589,12.21589,0,0,0,9.79264,4.992v4.94447l.7944-2.0488q.73-.03581,1.46809-.14442A14.70449,14.70449,0,0,0,27.93,40.55009L30.68323,44.066l5.187-2.80759-1.4434-4.2351a15.11292,15.11292,0,0,0,2.01133-2.27244l4.35587.92207,2.16853-5.48379-3.79609-2.3A15.17165,15.17165,0,0,0,39.25256,24.81917ZM14.59915,27.339a9.77,9.77,0,1,1,9.54592,8.2656A9.70031,9.70031,0,0,1,14.59915,27.339Zm15.94142,9.00325a12.12774,12.12774,0,0,0,5.28422-14.08749,12.12643,12.12643,0,0,1-5.28422,14.08749Z' transform='translate(-5.14543 -6.76556)' fill='%233c465c'/%3E%3Cpath d='M67.25176,15.46335a7.87493,7.87493,0,0,1,4.84472,7.582,8.26646,8.26646,0,0,1-1.25781,4.57325,8.00559,8.00559,0,0,1-3.58691,2.99121A13.39583,13.39583,0,0,1,61.76055,31.647h-4.794v6.5625H51.4583V14.40964H61.76055A13.23293,13.23293,0,0,1,67.25176,15.46335Zm-2.02344,10.625a3.72967,3.72967,0,0,0,1.292-3.043,3.7712,3.7712,0,0,0-1.292-3.07714,5.78573,5.78573,0,0,0-3.77393-1.07081H56.9666v8.26221h4.48779A5.78573,5.78573,0,0,0,65.22832,26.08835Z' transform='translate(-5.14543 -6.76556)' fill='%233c465c'/%3E%3Cpath d='M75.90459,16.51755a2.87867,2.87867,0,0,1,0-4.21631,3.36585,3.36585,0,0,1,2.37988-.84961,3.44906,3.44906,0,0,1,2.37989.81592,2.617,2.617,0,0,1,.918,2.04,2.888,2.888,0,0,1-.918,2.19287,3.32507,3.32507,0,0,1-2.37989.86719A3.36179,3.36179,0,0,1,75.90459,16.51755Zm-.272,3.3999h5.30371v18.292H75.63262Z' transform='translate(-5.14543 -6.76556)' fill='%233c465c'/%3E%3Cpath d='M101.31914,20.81833a8.43057,8.43057,0,0,1,3.28125,3.29834,9.95866,9.95866,0,0,1,1.18994,4.94629,9.95854,9.95854,0,0,1-1.18994,4.94727,8.41969,8.41969,0,0,1-3.28125,3.29785A9.32,9.32,0,0,1,96.678,38.48191,7.06074,7.06074,0,0,1,91.17021,36.271v8.53418H85.8665V19.91745h5.06592v2.10791A7.03425,7.03425,0,0,1,96.678,19.64548,9.32447,9.32447,0,0,1,101.31914,20.81833Zm-2.21,11.93408a5.13351,5.13351,0,0,0,1.30908-3.68945,5.13267,5.13267,0,0,0-1.30908-3.68847,4.76084,4.76084,0,0,0-6.69775,0A5.13057,5.13057,0,0,0,91.10234,29.063a5.13141,5.13141,0,0,0,1.30909,3.68945,4.76084,4.76084,0,0,0,6.69775,0Z' transform='translate(-5.14543 -6.76556)' fill='%233c465c'/%3E%3Cpath d='M127.14189,30.55906H113.30352a4.30873,4.30873,0,0,0,1.76806,2.68652,5.8567,5.8567,0,0,0,3.46826.98535,7.00457,7.00457,0,0,0,2.53272-.4248,6.13266,6.13266,0,0,0,2.05713-1.34278L125.952,35.5239q-2.58471,2.95752-7.54834,2.958a11.94033,11.94033,0,0,1-5.47412-1.207,8.85243,8.85243,0,0,1-3.67187-3.34961,9.22772,9.22772,0,0,1-1.292-4.86231,9.35332,9.35332,0,0,1,1.27491-4.84472,8.9347,8.9347,0,0,1,3.50244-3.36573,10.84262,10.84262,0,0,1,9.84277-.05127,8.44466,8.44466,0,0,1,3.417,3.31543,9.88522,9.88522,0,0,1,1.24122,5.01465Q127.244,29.23386,127.14189,30.55906Zm-12.41015-5.88184a4.34358,4.34358,0,0,0-1.4961,2.78809h9.01026a4.38944,4.38944,0,0,0-1.4961-2.771,4.4744,4.4744,0,0,0-2.99218-1.03662A4.56806,4.56806,0,0,0,114.73174,24.67722Z' transform='translate(-5.14543 -6.76556)' fill='%233c465c'/%3E%3Cpath d='M130.78008,12.98142h5.30371v25.228h-5.30371Z' transform='translate(-5.14543 -6.76556)' fill='%233c465c'/%3E%3Cpath d='M141.285,16.51755a2.87972,2.87972,0,0,1,0-4.21631,3.36749,3.36749,0,0,1,2.37988-.84961,3.45158,3.45158,0,0,1,2.38086.81592,2.6186,2.6186,0,0,1,.918,2.04,2.8897,2.8897,0,0,1-.918,2.19287,3.32744,3.32744,0,0,1-2.38086.86719A3.36343,3.36343,0,0,1,141.285,16.51755Zm-.27148,3.3999h5.30371v18.292h-5.30371Z' transform='translate(-5.14543 -6.76556)' fill='%233c465c'/%3E%3Cpath d='M167.85527,21.68552q2.0918,2.03979,2.0918,6.05127V38.20945h-5.30469V28.5532a4.76727,4.76727,0,0,0-.95215-3.24659,3.49046,3.49046,0,0,0-2.7539-1.07129,4.2203,4.2203,0,0,0-3.19531,1.24122,5.13656,5.13656,0,0,0-1.19043,3.689v9.04395h-5.30372v-18.292h5.06543v2.14209a7.04489,7.04489,0,0,1,2.61817-1.78515,9.128,9.128,0,0,1,3.43457-.62891A7.52732,7.52732,0,0,1,167.85527,21.68552Z' transform='translate(-5.14543 -6.76556)' fill='%233c465c'/%3E%3Cpath d='M192.76055,30.55906H178.92266a4.30744,4.30744,0,0,0,1.76855,2.68652,5.85409,5.85409,0,0,0,3.46777.98535,7.00731,7.00731,0,0,0,2.53321-.4248,6.13082,6.13082,0,0,0,2.05664-1.34278l2.82226,3.06055q-2.584,2.95752-7.54785,2.958a11.941,11.941,0,0,1-5.47461-1.207,8.84946,8.84946,0,0,1-3.67187-3.34961,9.22771,9.22771,0,0,1-1.292-4.86231,9.3443,9.3443,0,0,1,1.27539-4.84472,8.927,8.927,0,0,1,3.50195-3.36573,10.84262,10.84262,0,0,1,9.84277-.05127,8.44768,8.44768,0,0,1,3.417,3.31543,9.88522,9.88522,0,0,1,1.24122,5.01465Q192.86309,29.23386,192.76055,30.55906Zm-12.41016-5.88184a4.34253,4.34253,0,0,0-1.49512,2.78809H187.865a4.38722,4.38722,0,0,0-1.49609-2.771,4.47444,4.47444,0,0,0-2.99219-1.03662A4.5712,4.5712,0,0,0,180.35039,24.67722Z' transform='translate(-5.14543 -6.76556)' fill='%233c465c'/%3E%3Cpath d='M196.0584,26.51365h9.62207v4.24951H196.0584Z' transform='translate(-5.14543 -6.76556)' fill='%233c465c'/%3E%3Cpath d='M212.8709,35.79538q-2.83887-2.82129-2.83887-8.05859V14.40964h5.50781v13.124q0,6.39112,5.30371,6.39161a4.97333,4.97333,0,0,0,3.94434-1.54688,7.21345,7.21345,0,0,0,1.36035-4.84473v-13.124h5.43946V27.73679q0,5.23682-2.83887,8.05859-2.83887,2.82276-7.93848,2.82227Q215.70977,38.61765,212.8709,35.79538Z' transform='translate(-5.14543 -6.76556)' fill='%233c465c'/%3E%3Cpath d='M237.02812,14.40964h5.50782V38.20945h-5.50782Z' transform='translate(-5.14543 -6.76556)' fill='%233c465c'/%3E%3C/svg%3E" height="40" alt="Partner" className="landing-cta-img" />
                     </div>
                     <div className="my-1 my-sm-3 px-card col-sm-auto col-3">
                        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 241.809 39.67' fill='%233c465c'%3E%3Cpath d='M33.408 23.116L20.213.925c0-.15-.15-.15-.3-.3l-.45-.45h0a1.95 1.95 0 0 0-2.549.9L.121 33.462a.9.9 0 0 0 0 .9 1.5 1.5 0 0 0 1.499 1.05h3.749a1.35 1.35 0 0 0 1.499-.75L17.364 14.42l.3-.3.45-.45a1.35 1.35 0 0 1 1.649.3h.15l6.597 11.096a1.65 1.65 0 0 0 1.349.75h3.898a2.4 2.4 0 0 0 1.499-.75c.45-.6.45-.75.45-.9a3.6 3.6 0 0 0-.3-1.05zM53.8 17.569a10.35 10.35 0 0 0-7.347-3.149h-3.898a4.05 4.05 0 0 1-4.048-2.999 3.45 3.45 0 0 1 .75-3.149 3.6 3.6 0 0 1 2.849-1.499H52.75a1.65 1.65 0 0 0 1.649-.9l1.499-2.999a1.5 1.5 0 0 0-.15-1.799 1.35 1.35 0 0 0-1.499-1.05H40.155a6.9 6.9 0 0 0-5.698 2.999c-4.498 5.698-2.999 11.845.3 15.144a10.65 10.65 0 0 0 7.347 3.149h4.048a3.9 3.9 0 0 1 4.048 2.999 3.6 3.6 0 0 1-.9 2.999 3.9 3.9 0 0 1-2.849 1.499h-21.14c-.3.15-.6-.15-.75-.3l-3.898-6.747a1.8 1.8 0 0 0-3.299 0l-5.548 11.096a2.25 2.25 0 0 0 0 1.949 1.65 1.65 0 0 0 1.649.75h34.936a8.7 8.7 0 0 0 5.848-2.849c4.498-5.848 2.849-11.845-.45-15.144zm36.269 13.176h-6.531l-1.893-5.919h-9.463l-1.874 5.919h-6.494L73.5 4.137h7.106zm-9.797-10.52l-2.857-8.944a11.63 11.63 0 0 1-.445-2.394h-.148a10.17 10.17 0 0 1-.464 2.319l-2.894 9.018zm18.406 10.52h-5.863V2.615h5.863zm23.565-2.171q0 5.288-3.062 8.192-3.062 2.903-8.869 2.903c-2.085.091-4.164-.283-6.086-1.095v-4.936a11.66 11.66 0 0 0 5.919 1.707c1.681.106 3.335-.458 4.602-1.568 1.121-1.125 1.714-2.672 1.633-4.258v-1.503h-.074a6.55 6.55 0 0 1-5.919 3.191 7.12 7.12 0 0 1-5.771-2.561 10.38 10.38 0 0 1-2.134-6.865c-.148-2.756.694-5.474 2.375-7.664 1.529-1.868 3.84-2.918 6.253-2.839a5.77 5.77 0 0 1 5.195 2.672h.074v-2.208h5.863zm-5.789-6.958v-1.503a4.62 4.62 0 0 0-1.067-3.071 3.45 3.45 0 0 0-2.774-1.271 3.59 3.59 0 0 0-3.062 1.521 7.16 7.16 0 0 0-1.113 4.287 6.04 6.04 0 0 0 1.058 3.758 3.45 3.45 0 0 0 2.895 1.382c1.148.031 2.241-.49 2.941-1.401.791-1.067 1.188-2.375 1.123-3.701zm19.742 9.593a10.21 10.21 0 0 1-7.468-2.663 9.65 9.65 0 0 1-2.719-7.227 9.66 9.66 0 0 1 2.82-7.376 10.66 10.66 0 0 1 7.626-2.663 10.09 10.09 0 0 1 7.422 2.663 9.47 9.47 0 0 1 2.69 7.042 10.05 10.05 0 0 1-2.773 7.478 10.33 10.33 0 0 1-7.599 2.746zm.148-15.438a3.91 3.91 0 0 0-3.229 1.429 6.3 6.3 0 0 0-1.15 4.045q0 5.474 4.416 5.474 4.211 0 4.212-5.622 0-5.325-4.249-5.326zm13.378 13.953v-5.937c1.038.881 2.226 1.569 3.507 2.032 1.225.445 2.519.674 3.822.677a8.44 8.44 0 0 0 1.976-.204 4.58 4.58 0 0 0 1.41-.566 2.45 2.45 0 0 0 .845-.854 2.12 2.12 0 0 0 .278-1.066c.006-.5-.15-.988-.445-1.392-.336-.445-.747-.828-1.215-1.132a12.66 12.66 0 0 0-1.828-1.002q-1.058-.482-2.282-.983a11.64 11.64 0 0 1-4.647-3.173 6.92 6.92 0 0 1-1.531-4.527 7.21 7.21 0 0 1 .835-3.572 7.1 7.1 0 0 1 2.272-2.458c1.017-.668 2.145-1.149 3.331-1.419a17.13 17.13 0 0 1 4.008-.455 24.1 24.1 0 0 1 3.683.25 14.5 14.5 0 0 1 2.96.77v5.548a8.92 8.92 0 0 0-1.456-.816 11.62 11.62 0 0 0-1.624-.584 12.43 12.43 0 0 0-1.661-.343c-.519-.072-1.043-.109-1.567-.111a8.15 8.15 0 0 0-1.855.195 4.77 4.77 0 0 0-1.41.547 2.72 2.72 0 0 0-.891.844 1.99 1.99 0 0 0-.315 1.104c-.006.425.117.843.353 1.197a4.02 4.02 0 0 0 1.002 1.002 10.62 10.62 0 0 0 1.577.928q.927.455 2.097.937a23.33 23.33 0 0 1 2.866 1.419 10.17 10.17 0 0 1 2.181 1.698c.6.623 1.073 1.357 1.392 2.162a7.65 7.65 0 0 1 .482 2.83c.043 1.298-.247 2.586-.844 3.739-.55.993-1.337 1.835-2.292 2.449a9.93 9.93 0 0 1-3.368 1.345 19.5 19.5 0 0 1-4.054.408 22.55 22.55 0 0 1-4.165-.371c-1.189-.205-2.342-.579-3.424-1.113zm49.096-17.98l-5.474 19.001h-6.16l-2.802-11.133c-.193-.797-.299-1.612-.315-2.431h-.111a14.67 14.67 0 0 1-.371 2.357l-3.006 11.207h-6.086l-5.362-19.001h5.975l2.616 12.395a16.37 16.37 0 0 1 .278 2.115h.111a11.67 11.67 0 0 1 .334-2.189l3.266-12.321h5.585l2.932 12.395a19.92 19.92 0 0 1 .26 2.152h.13a21.18 21.18 0 0 1 .297-2.152l2.468-12.395zm18.592 19.001h-5.548v-2.728h-.074a6.19 6.19 0 0 1-5.659 3.191 5.92 5.92 0 0 1-4.351-1.567 5.62 5.62 0 0 1-1.587-4.185q0-5.53 6.55-6.383l5.158-.687q0-3.118-3.377-3.118a11.53 11.53 0 0 0-6.457 2.022v-4.416a14.49 14.49 0 0 1 3.35-1.113 17.63 17.63 0 0 1 3.868-.482q8.127 0 8.127 8.109zm-5.511-7.719v-1.28l-3.451.445q-2.858.371-2.857 2.579c-.019.623.235 1.223.695 1.643a2.68 2.68 0 0 0 1.884.64 3.47 3.47 0 0 0 2.69-1.142 4.12 4.12 0 0 0 1.039-2.885zm16.087 5.511h-.074v10.947h-5.863v-27.74h5.863v2.857h.074a7.46 7.46 0 0 1 11.81-.789 10.78 10.78 0 0 1 2.014 6.894c.137 2.739-.694 5.438-2.348 7.626a7.65 7.65 0 0 1-6.243 2.876c-2.094.1-4.085-.917-5.232-2.672zm-.167-7.793v1.522a4.83 4.83 0 0 0 1.039 3.21 3.38 3.38 0 0 0 2.728 1.243c1.233.051 2.407-.534 3.108-1.55a7.48 7.48 0 0 0 1.104-4.388q0-5.011-3.896-5.01a3.66 3.66 0 0 0-2.941 1.364c-.8 1.028-1.204 2.309-1.141 3.609z'/%3E%3C/svg%3E" height="40" alt="Partner" className="landing-cta-img" />
                     </div>
                     <div className="my-1 my-sm-3 px-card col-sm-auto col-3">
                        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:v='https://vecta.io/nano' viewBox='0 0 200.161 42.345' fill='%233c465c'%3E%3Cpath d='M52.142 10.275h1.92 1.905l1.41.03c2.7.06 4.92.55 6.66 1.47s3.025 2.185 3.855 3.795 1.245 3.525 1.245 5.745c0 2.281-.435 4.265-1.305 5.956s-2.19 2.99-3.96 3.899-3.985 1.365-6.645 1.365h-6.51c-.46 0-.69-.24-.69-.72v-20.91c0-.24.05-.405.15-.495s.27-.135.51-.135h1.455zm3.135 4.14v14.011c0 .28.13.42.39.42h.57c1.64 0 3.01-.245 4.11-.735a4.95 4.95 0 0 0 2.475-2.385c.55-1.1.825-2.56.825-4.38 0-1.76-.255-3.175-.765-4.245a4.83 4.83 0 0 0-2.34-2.355c-1.05-.5-2.385-.75-4.005-.75h-.96c-.2 0-.3.14-.3.42zm14.82 17.879c-.08-.159-.08-.369 0-.63l7.47-20.79c.08-.22.169-.375.27-.465s.27-.135.51-.135h4.5c.44 0 .74.22.9.66l7.41 20.791c.06.16.06.335 0 .524s-.18.285-.36.285h-4.41c-.3 0-.49-.14-.57-.42l-1.56-4.38a.54.54 0 0 0-.105-.24c-.05-.06-.146-.09-.285-.09h-7.32c-.2 0-.33.101-.39.3l-1.59 4.44c-.041.12-.105.215-.195.284s-.235.105-.435.105h-3.45c-.18 0-.31-.08-.39-.24zm12.54-8.88c.28 0 .37-.169.27-.51l-2.52-7.02c-.06-.12-.125-.18-.195-.18s-.135.07-.195.21l-2.55 6.99c-.14.341-.05.51.27.51h4.92zm14.28 8.055c-1.54-.909-2.725-2.214-3.555-3.914s-1.245-3.721-1.245-6.061c0-2.38.425-4.43 1.275-6.15s2.045-3.045 3.585-3.975 3.35-1.395 5.43-1.395 3.885.465 5.415 1.395 2.715 2.25 3.555 3.96 1.26 3.755 1.26 6.135c0 2.34-.416 4.361-1.245 6.06s-2.015 3.01-3.555 3.93-3.35 1.38-5.43 1.38c-2.12 0-3.95-.454-5.49-1.365zm9.09-4.109c.76-1.189 1.14-3.135 1.14-5.835 0-2.76-.385-4.765-1.155-6.015s-1.965-1.875-3.585-1.875c-1.64 0-2.85.63-3.63 1.89s-1.17 3.26-1.17 6c0 2.681.385 4.62 1.155 5.82s1.984 1.8 3.645 1.8c1.64 0 2.839-.595 3.6-1.785zm15.15-16.546c0-.16.049-.29.15-.39s.25-.15.45-.15h17.22c.22 0 .375.05.465.15a.56.56 0 0 1 .135.39v2.79c0 .3-.18.45-.54.45h-5.61c-.22 0-.33.1-.33.3v17.61c0 .381-.17.57-.51.57h-4.29c-.3 0-.45-.17-.45-.51v-17.58c0-.26-.11-.39-.33-.39h-5.79c-.38 0-.57-.15-.57-.45v-2.79zm20.805 20.97a7.44 7.44 0 0 1-2.835-2.895c-.68-1.23-1.02-2.635-1.02-4.215 0-1.66.35-3.115 1.05-4.366a7.56 7.56 0 0 1 2.88-2.925c1.22-.7 2.601-1.05 4.139-1.05 1.621 0 3.031.355 4.23 1.065s2.135 1.69 2.805 2.94 1.006 2.685 1.006 4.305c0 1.601-.342 3.015-1.021 4.245s-1.625 2.194-2.834 2.895-2.615 1.05-4.215 1.05c-1.58 0-2.975-.35-4.185-1.05zm6.075-2.595c.498-.39.873-.975 1.125-1.755s.375-1.729.375-2.851c0-1.18-.127-2.154-.375-2.925s-.627-1.354-1.125-1.755-1.121-.6-1.861-.6c-.719 0-1.333.2-1.843.6s-.896.985-1.156 1.755-.39 1.745-.39 2.925c0 1.141.13 2.096.39 2.865s.645 1.351 1.156 1.74 1.125.585 1.843.585c.74 0 1.359-.195 1.861-.585zm11.893 2.595c-1.211-.7-2.155-1.665-2.835-2.895s-1.021-2.635-1.021-4.215c0-1.66.35-3.115 1.051-4.366a7.56 7.56 0 0 1 2.88-2.925c1.22-.7 2.6-1.05 4.14-1.05 1.62 0 3.03.355 4.23 1.065a7.43 7.43 0 0 1 2.805 2.94c.67 1.25 1.005 2.685 1.005 4.305 0 1.601-.341 3.015-1.021 4.245a7.45 7.45 0 0 1-2.835 2.895c-1.21.701-2.614 1.05-4.215 1.05-1.58 0-2.975-.35-4.185-1.05zm6.075-2.595c.499-.39.874-.975 1.125-1.755s.375-1.729.375-2.851c0-1.18-.126-2.154-.375-2.925s-.626-1.354-1.125-1.755-1.121-.6-1.86-.6c-.72 0-1.335.2-1.845.6s-.896.985-1.155 1.755-.39 1.745-.39 2.925c0 1.141.13 2.096.39 2.865s.645 1.351 1.155 1.74 1.125.585 1.845.585c.739 0 1.359-.195 1.86-.585zm13.41 2.626c0 .26-.06.445-.18.555s-.33.165-.63.165h-3.181c-.439 0-.659-.21-.659-.63l.09-21.06c0-.38.159-.57.479-.57h3.63c.301 0 .45.18.45.54v21zm11.76-12.18c-.58-.32-1.29-.48-2.13-.48-.74 0-1.365.145-1.875.435s-.766.685-.766 1.185c0 .26.101.505.301.735s.659.435 1.38.615l3.45.841c1.659.38 2.839 1 3.54 1.859a4.44 4.44 0 0 1 1.05 2.88c0 1.08-.306 2-.915 2.761s-1.455 1.345-2.535 1.754-2.32.615-3.72.615c-1.78 0-3.29-.314-4.53-.944s-2.11-1.415-2.61-2.355c-.08-.14-.12-.274-.12-.404s.061-.226.181-.285l2.04-1.051c.199-.1.354-.145.465-.135s.205.065.285.165c.26.36.569.7.93 1.021s.81.575 1.35.765 1.22.275 2.04.255a5.43 5.43 0 0 0 1.516-.195c.45-.129.805-.319 1.064-.569s.391-.545.391-.885-.141-.635-.42-.886-.801-.465-1.561-.645l-3.09-.66c-1.5-.34-2.636-.875-3.405-1.605s-1.154-1.685-1.154-2.865c0-1.02.265-1.92.795-2.7s1.305-1.395 2.324-1.845 2.24-.675 3.66-.675c1.52 0 2.835.28 3.945.84s1.905 1.23 2.385 2.01c.08.12.14.245.18.375s-.029.245-.21.345l-2.159 1.05c-.141.06-.266.075-.375.045a.64.64 0 0 1-.315-.225c-.34-.44-.8-.82-1.38-1.14zM14.28 21.475c0 4.297 3.496 7.793 7.793 7.793s7.793-3.496 7.793-7.793a7.76 7.76 0 0 0-3.34-6.397v6.397a1.11 1.11 0 0 1-.496.926l-3.34 2.227c-.374.249-.861.249-1.235 0l-3.34-2.227a1.11 1.11 0 0 1-.496-.926v-6.397a7.76 7.76 0 0 0-3.34 6.397h0zm10.019 19v-9.23c-.716.163-1.462.25-2.227.25s-1.51-.087-2.227-.25v9.23h4.453zm15.926-23.421l-3.49-.857-.569-1.354 1.817-3.029c.263-.438.194-.999-.167-1.36l-4.723-4.723c-.361-.361-.922-.43-1.36-.167l-3.029 1.818-1.354-.569-.856-3.489c-.122-.498-.569-.848-1.081-.848h-6.68c-.513 0-.959.35-1.081.848l-.856 3.489-1.354.569-3.029-1.818c-.438-.263-.999-.194-1.36.167L6.33 10.454c-.361.361-.43.922-.167 1.36l1.817 3.029-.569 1.354-3.49.857c-.498.122-.848.569-.848 1.081v6.68c0 .513.35.959.848 1.081l3.49.857.569 1.354-1.817 3.029c-.263.438-.194.999.167 1.36l4.723 4.723c.361.361.922.43 1.36.167l3.029-1.818 1.354.569.824 3.359v-9.048c-3.296-1.642-5.566-5.048-5.566-8.974 0-2.031.607-3.989 1.756-5.661a10.03 10.03 0 0 1 4.505-3.627c.343-.139.733-.099 1.041.108a1.11 1.11 0 0 1 .492.924v7.661l2.227 1.484 2.227-1.484v-7.661c0-.37.184-.717.492-.924s.697-.247 1.041-.108a10.03 10.03 0 0 1 4.505 3.627c1.149 1.672 1.756 3.63 1.756 5.661 0 3.926-2.27 7.331-5.566 8.974v9.048l.824-3.359c.452-.165.905-.355 1.354-.569l3.029 1.818c.438.263.999.194 1.36-.167l4.723-4.723c.361-.361.43-.922.167-1.36l-1.817-3.029c.214-.449.404-.902.569-1.354l3.49-.857c.498-.122.848-.569.848-1.081v-6.68c0-.513-.35-.959-.848-1.081h0z'/%3E%3C/svg%3E" height="40" alt="Partner" className="landing-cta-img" />
                     </div>
                     <div className="my-1 my-sm-3 px-card col-sm-auto col-3">
                        <img src="data:image/svg+xml,%3Csvg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 253.09306 40'%3E%3Cpath d='M18.83213,40.92049l-2.00067-3.35942h-6.315L11.6179,35.6703h4.09375l-2.97394-4.99376L6.6791,40.92049H4.01737L11.69117,28.143a1.78187,1.78187,0,0,1,.47706-.55116,1.08459,1.08459,0,0,1,.66106-.20231,1.04545,1.04545,0,0,1,.65191.20231,1.84006,1.84006,0,0,1,.4679.55116l7.69212,12.77746Zm5.08534.23062V38.78578H34.06983a2.04518,2.04518,0,0,0,1.462-.48456,1.68619,1.68619,0,0,0,.512-1.28548,1.63141,1.63141,0,0,0-.512-1.313,2.18978,2.18978,0,0,0-1.462-.43793H27.848a4.87925,4.87925,0,0,1-1.72342-.2889A3.73836,3.73836,0,0,1,24.8208,34.175a3.51893,3.51893,0,0,1-.81924-1.22055,4.05946,4.05946,0,0,1-.28891-1.54608,4.18437,4.18437,0,0,1,.26976-1.51861,3.23844,3.23844,0,0,1,.80093-1.2014,3.79592,3.79592,0,0,1,1.313-.79178,5.12635,5.12635,0,0,1,1.78836-.2889h9.72359v2.36616H27.8855a1.73005,1.73005,0,0,0-1.26634.43794,1.63286,1.63286,0,0,0-.44709,1.21971,1.57683,1.57683,0,0,0,.45625,1.21056,1.74152,1.74152,0,0,0,1.23886.42877h6.20348a4.53668,4.53668,0,0,1,3.13879.96828A3.77075,3.77075,0,0,1,38.281,37.18225a4.67365,4.67365,0,0,1-.26059,1.58354,3.42188,3.42188,0,0,1-.78262,1.25718,3.5872,3.5872,0,0,1-1.313.82924,5.24116,5.24116,0,0,1-1.85331.29806h-10.154Zm20.73349,0V29.97385H39.50984V27.60769H52.15825v2.36616H47.01713V41.15028H44.6518Zm21.79087.12988-3.456-3.794H57.87718V35.38306h5.69145a2.54379,2.54379,0,0,0,1.95321-.70435,2.88168,2.88168,0,0,0,.6569-2.03813,2.60587,2.60587,0,0,0-.68521-1.98152,2.69218,2.69218,0,0,0-1.9249-.64774H56.13045V41.281h-2.367V27.62683H63.5678a5.87617,5.87617,0,0,1,2.08475.34719,4.275,4.275,0,0,1,1.55858.99492,4.32944,4.32944,0,0,1,.9766,1.56856,5.95384,5.95384,0,0,1,.338,2.06644,5.19578,5.19578,0,0,1-.74182,2.864,4.14613,4.14613,0,0,1-2.07559,1.66264l4.1129,4.1512H66.44017Zm23.12131-.01915V38.89651H99.7155a2.0452,2.0452,0,0,0,1.462-.48455,1.68623,1.68623,0,0,0,.512-1.28549,1.63138,1.63138,0,0,0-.512-1.313,2.18973,2.18973,0,0,0-1.462-.43794H93.4937a4.87906,4.87906,0,0,1-1.72342-.2889,3.73817,3.73817,0,0,1-1.3038-.80093,3.519,3.519,0,0,1-.81926-1.22055,4.05965,4.05965,0,0,1-.2889-1.54608,4.18458,4.18458,0,0,1,.26975-1.51861,3.23868,3.23868,0,0,1,.80093-1.2014,3.79606,3.79606,0,0,1,1.313-.79178,5.12639,5.12639,0,0,1,1.78836-.2889h9.72359v2.36617H93.53033a1.73008,1.73008,0,0,0-1.26634.43793,1.63288,1.63288,0,0,0-.44709,1.21971,1.5769,1.5769,0,0,0,.45624,1.21056,1.74154,1.74154,0,0,0,1.23887.42877h6.20348a4.53667,4.53667,0,0,1,3.13878.96828,3.77079,3.77079,0,0,1,1.07152,2.94314,4.67375,4.67375,0,0,1-.26059,1.58355,3.42188,3.42188,0,0,1-.78262,1.25718,3.58727,3.58727,0,0,1-1.313.82923,5.24109,5.24109,0,0,1-1.8533.29807H89.564Zm-11.53027.00583a6.40112,6.40112,0,0,1-2.61677-.53118,6.44294,6.44294,0,0,1-3.46432-3.64166,7.484,7.484,0,0,1-.49371-2.73833,7.24565,7.24565,0,0,1,.49371-2.72,6.03233,6.03233,0,0,1,1.37791-2.09558,6.20978,6.20978,0,0,1,2.08641-1.34127,7.06144,7.06144,0,0,1,2.61677-.4754h3.297a7.23256,7.23256,0,0,1,2.6917.48456A5.99508,5.99508,0,0,1,87.47672,31.664a7.23261,7.23261,0,0,1,.48456,2.69171,7.48064,7.48064,0,0,1-.49372,2.73832,6.55332,6.55332,0,0,1-1.37874,2.18883,6.48546,6.48546,0,0,1-2.09557,1.45283,6.561,6.561,0,0,1-2.66339.53118h-3.297Zm3.297-2.36533a4.30446,4.30446,0,0,0,1.71343-.33553,4.05121,4.05121,0,0,0,2.23545-2.3287,4.87045,4.87045,0,0,0,.31638-1.77,4.80219,4.80219,0,0,0-.31638-1.76,3.98256,3.98256,0,0,0-2.23545-2.29123,4.41217,4.41217,0,0,0-1.71343-.32637h-3.297a4.29586,4.29586,0,0,0-1.686.32637,3.99414,3.99414,0,0,0-1.33212.90333,4.152,4.152,0,0,0-.87586,1.37874,4.76479,4.76479,0,0,0-.31638,1.76921,4.88148,4.88148,0,0,0,.31638,1.77,4.19619,4.19619,0,0,0,.87586,1.40622,4.04363,4.04363,0,0,0,1.33212.92248,4.18385,4.18385,0,0,0,1.686.33553ZM33.57278,21.47664V1.34176h3.51761V17.95987H50.63381v3.51761h-17.061Zm-7.44984.01166-2.9781-4.99959h-9.398l1.63933-2.81409h6.09275L17.05292,6.2431,8.03619,21.4883H4.07482L15.49518,2.47322a2.64219,2.64219,0,0,1,.71019-.81924,1.615,1.615,0,0,1,.98326-.30056,1.56189,1.56189,0,0,1,.97.30056,2.7245,2.7245,0,0,1,.69686.81924L30.30328,21.4883Zm62.92567-.07077a9.52121,9.52121,0,0,1-3.89143-.78928,9.583,9.583,0,0,1-5.15111-5.415,11.12967,11.12967,0,0,1-.73433-4.07127,10.75748,10.75748,0,0,1,.73433-4.0438,8.993,8.993,0,0,1,2.049-3.11631,9.20821,9.20821,0,0,1,3.10215-1.994,10.50048,10.50048,0,0,1,3.89143-.706h4.90218A10.76836,10.76836,0,0,1,97.953,2.002a8.91931,8.91931,0,0,1,5.13779,5.137,10.74838,10.74838,0,0,1,.72017,4.00217,11.12616,11.12616,0,0,1-.73349,4.07127,9.75821,9.75821,0,0,1-2.04979,3.25451,9.61534,9.61534,0,0,1-3.1163,2.16052,9.75734,9.75734,0,0,1-3.96054.78928H89.04861Zm4.90218-3.51761a6.40022,6.40022,0,0,0,2.54766-.49871,6.01731,6.01731,0,0,0,3.32362-3.46266,7.238,7.238,0,0,0,.47124-2.63092A7.13138,7.13138,0,0,0,99.82207,8.69,5.91852,5.91852,0,0,0,96.49845,5.284a6.56416,6.56416,0,0,0-2.54766-.48455H89.04861a6.38269,6.38269,0,0,0-2.506.48455,5.93857,5.93857,0,0,0-1.98068,1.34294,6.16605,6.16605,0,0,0-1.30214,2.04979,7.09532,7.09532,0,0,0-.47124,2.63092,7.21733,7.21733,0,0,0,.47124,2.63092A6.26079,6.26079,0,0,0,84.56189,16.03a5.99451,5.99451,0,0,0,1.98068,1.37124,6.23251,6.23251,0,0,0,2.506.49871ZM75.97642,5.00008l-.00749-3.5326h0l-3.10133.00416c-1.87078-.00166-7.45067.005-9.045.0025a11.00679,11.00679,0,0,0-2.44526.25976,10.63194,10.63194,0,0,0-1.4828.46208,9.10019,9.10019,0,0,0-3.0622,1.98984,8.96488,8.96488,0,0,0-2.02314,3.10965,10.84751,10.84751,0,0,0-.72434,4.03547,11.20026,11.20026,0,0,0,.72434,4.06294,9.75432,9.75432,0,0,0,2.02314,3.24786,9.54133,9.54133,0,0,0,3.0622,2.15636,9.30711,9.30711,0,0,0,3.84148.78761l12.19215.01748L75.93646,9.864,63.58278,9.86312,63.582,12.857l8.92516-.00333.00249,5.22272L63.736,18.07476a6.08316,6.08316,0,0,1-2.4744-.49788A5.9333,5.9333,0,0,1,59.3067,16.209a6.24929,6.24929,0,0,1-1.28465-2.08725,7.30042,7.30042,0,0,1-.46458-2.62593,7.15641,7.15641,0,0,1,.46458-2.62593A6.1818,6.1818,0,0,1,59.3067,6.82424,5.81971,5.81971,0,0,1,61.26158,5.4838a5.91563,5.91563,0,0,1,1.13812-.35134c.0408-.00833.08159-.015.12239-.02248a6.71828,6.71828,0,0,1,1.21305-.1099L75.9756,4.99924Z' transform='translate(-4.01737 -1.28182)' fill='%233c465c'/%3E%3Cpath d='M197.21641,21.73941c3.109-1.476,4.106-4.484,4.106-8.701,0-7.38-4.144-9.736-11.444-9.736h-8.277a.51.51,0,0,0-.508.512v0h0v35.659a.51.51,0,0,0,.509.511h5.608a.51.51,0,0,0,.508-.512v-16.288h2.759a.51.51,0,0,1,.493.384l4.172,16.036a.51.51,0,0,0,.494.384h5.6a.49984.49984,0,0,0,.139-.02.51383.51383,0,0,0,.352-.634l-4.793-17.006A.50339.50339,0,0,1,197.21641,21.73941Zm-7.381-2.723v.002h-2.119V7.87941h2.476c3.831,0,4.867,1.809,4.867,5.523,0,3.938-1.397,5.614-5.225,5.614h.001Zm67.272,20.451a.51265.51265,0,0,1-.503.522h-3.945a.51.51,0,0,1-.51-.501l-.434-20.415a.51.51,0,0,0-1.01-.091l-4.186,20.599a.51.51,0,0,1-.5.41h-3.178a.51249.51249,0,0,1-.5-.408l-4.267-20.708a.509.509,0,0,0-1.008.093l-.398,20.52a.51.51,0,0,1-.51.503h-3.985a.51255.51255,0,0,1-.51-.515v-.007l.007-.435V3.82141a.51.51,0,0,1,.508-.512h.61l.002-.004h5.977a.51.51,0,0,1,.5.41l4.606,22.589a.51.51,0,0,0,.999.002l4.77-22.594a.51.51,0,0,1,.498-.405h1.037l-.001-.013h5.415a.51.51,0,0,1,.509.511h0v35.141l.01.52Zm-104.995-35.652v3.594a.51.51,0,0,1-.507.513h-7.363a.51.51,0,0,0-.51.51v9.664a.51.51,0,0,0,.507.513h5.833a.51.51,0,0,1,.51.51v3.643a.51.51,0,0,1-.508.512h-5.832a.51.51,0,0,0-.51.51v15.688a.51.51,0,0,1-.507.513h-5.608a.51.51,0,0,1-.51-.51V3.81741a.51.51,0,0,1,.507-.513h13.989a.51.51,0,0,1,.51.51Zm74.404,0v24.305c0,7.697-2.118,12.365-10.273,12.365-8.2,0-10.273-4.665-10.273-12.365V3.81741a.51.51,0,0,1,.507-.513h5.47a.51.51,0,0,1,.51.51h0v25.076c0,3.488.406,6.61,3.786,6.61,3.423,0,3.831-3.125,3.831-6.61V3.81741a.51.51,0,0,1,.507-.513h5.425a.51.51,0,0,1,.51.51h0v.001h0Zm-60.837-.919c-7.839,0-10.543,4.393-10.543,11.819v13.767h0c0,7.426,2.657,12,10.543,12,7.794,0,10.498-4.617,10.498-12v-13.766c0-7.426-2.704-11.819-10.498-11.819h0Zm3.738,27.171c0,3.034-.496,5.48-3.738,5.48-3.292,0-3.788-2.448-3.788-5.48v-16.891c0-3.08.545-5.39,3.788-5.39s3.738,2.31,3.738,5.39v16.891Z' transform='translate(-4.01737 -1.28182)' fill='%233c465c'/%3E%3C/svg%3E" height="40" alt="Partner" className="landing-cta-img" />
                     </div>
                  </div>
               </div>
            </section>
            <section className="ac-landing">
               <div className="container">
                  <div className="justify-content-center text-center row">
                     <div className="col-xxl-6 col-xxl-6 col-xl-7 col-lg-8">
                        <h1 className="fs-2 fs-sm-4 fs-md-5">The future is Web 4</h1>
                        <p className="lead">Built with a hybrid DeFi/CeFi framework, AlgoCloud integrates the best of Web 2 with the promise of Web 3, offering an unparraled user experience. Privacy-first, multi-workspace, fully customizable, infinitely extendable.</p>
                     </div>
                  </div>
                  <div className="flex-center mt-8 row">
                     <div className="ps-lg-6 col-xl-4 col-lg-5 col-md-6 order-md-0"><img src="/assets/iso-1.png" alt="" className="px-6 px-md-0 img-fluid" /></div>
                     <div className="mt-4 mt-md-0 col-xl-4 col-lg-5 col-md">
                        <h5 className="text-danger">
                           <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="lightbulb" className="svg-inline--fa fa-lightbulb fa-w-11 me-2" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512">
                              <path fill="currentColor" d="M176 80c-52.94 0-96 43.06-96 96 0 8.84 7.16 16 16 16s16-7.16 16-16c0-35.3 28.72-64 64-64 8.84 0 16-7.16 16-16s-7.16-16-16-16zM96.06 459.17c0 3.15.93 6.22 2.68 8.84l24.51 36.84c2.97 4.46 7.97 7.14 13.32 7.14h78.85c5.36 0 10.36-2.68 13.32-7.14l24.51-36.84c1.74-2.62 2.67-5.7 2.68-8.84l.05-43.18H96.02l.04 43.18zM176 0C73.72 0 0 82.97 0 176c0 44.37 16.45 84.85 43.56 115.78 16.64 18.99 42.74 58.8 52.42 92.16v.06h48v-.12c-.01-4.77-.72-9.51-2.15-14.07-5.59-17.81-22.82-64.77-62.17-109.67-20.54-23.43-31.52-53.15-31.61-84.14-.2-73.64 59.67-128 127.95-128 70.58 0 128 57.42 128 128 0 30.97-11.24 60.85-31.65 84.14-39.11 44.61-56.42 91.47-62.1 109.46a47.507 47.507 0 0 0-2.22 14.3v.1h48v-.05c9.68-33.37 35.78-73.18 52.42-92.16C335.55 260.85 352 220.37 352 176 352 78.8 273.2 0 176 0z"></path>
                           </svg>
                           ROUTING
                        </h5>
                        <h3>Data-first framework</h3>
                        <p>With AlgoCloud, we store terabytes of on-chain data that can be retrieved and analyzed at any time. Access to enterprise-grade analytics give AlgoCloud users a major competitive advantage.</p>
                     </div>
                  </div>
                  <div className="flex-center mt-7 row">
                     <div className="pe-lg-6 col-xl-4 col-lg-5 col-md-6 order-md-2"><img src="/assets/iso-2.png" alt="" className="px-6 px-md-0 img-fluid" /></div>
                     <div className="mt-4 mt-md-0 col-xl-4 col-lg-5 col-md">
                        <h5 className="text-info">
                           <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="object-ungroup" className="svg-inline--fa fa-object-ungroup fa-w-18 me-2" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                              <path fill="currentColor" d="M564 224c6.627 0 12-5.373 12-12v-72c0-6.627-5.373-12-12-12h-72c-6.627 0-12 5.373-12 12v12h-88v-24h12c6.627 0 12-5.373 12-12V44c0-6.627-5.373-12-12-12h-72c-6.627 0-12 5.373-12 12v12H96V44c0-6.627-5.373-12-12-12H12C5.373 32 0 37.373 0 44v72c0 6.627 5.373 12 12 12h12v160H12c-6.627 0-12 5.373-12 12v72c0 6.627 5.373 12 12 12h72c6.627 0 12-5.373 12-12v-12h88v24h-12c-6.627 0-12 5.373-12 12v72c0 6.627 5.373 12 12 12h72c6.627 0 12-5.373 12-12v-12h224v12c0 6.627 5.373 12 12 12h72c6.627 0 12-5.373 12-12v-72c0-6.627-5.373-12-12-12h-12V224h12zM352 64h32v32h-32V64zm0 256h32v32h-32v-32zM64 352H32v-32h32v32zm0-256H32V64h32v32zm32 216v-12c0-6.627-5.373-12-12-12H72V128h12c6.627 0 12-5.373 12-12v-12h224v12c0 6.627 5.373 12 12 12h12v160h-12c-6.627 0-12 5.373-12 12v12H96zm128 136h-32v-32h32v32zm280-64h-12c-6.627 0-12 5.373-12 12v12H256v-12c0-6.627-5.373-12-12-12h-12v-24h88v12c0 6.627 5.373 12 12 12h72c6.627 0 12-5.373 12-12v-72c0-6.627-5.373-12-12-12h-12v-88h88v12c0 6.627 5.373 12 12 12h12v160zm40 64h-32v-32h32v32zm0-256h-32v-32h32v32z"></path>
                           </svg>
                           Refraction
                        </h5>
                        <h3>DeFi + Insights</h3>
                        <p>Web 3 plugins available on AlgoCloud interact with our servers to deliver a personalized and highly customizable DeFi experience.</p>
                     </div>
                  </div>
                  <div className="flex-center mt-7 row">
                     <div className="ps-lg-6 col-xl-4 col-lg-5 col-md-6 order-md-0"><img src="/assets/iso-3.png" alt="" className="px-6 px-md-0 img-fluid" /></div>
                     <div className="mt-4 mt-md-0 col-xl-4 col-lg-5 col-md">
                        <h5 className="text-success">
                           <svg fill="currentColor" id="Layer_1" className="svg-inline--fa fa-w-18 me-2" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36.14555 31">
                              <path d="M30.78478,18.14505c0-2.29786-1.90608-4.28125-4.56253-4.78125C25.604,9.74905,21.8829,7.04544,17.47978,7.04544a10.34473,10.34473,0,0,0-6.09287,1.95117,6.44341,6.44341,0,0,0-2.44465,3.21973c-2.81358.67675-4.76294,2.83789-4.76294,5.30859,0,3.04394,2.95819,5.52051,6.59387,5.52051H24.93331C28.16022,23.04544,30.78478,20.84719,30.78478,18.14505ZM24.93331,15.607a2.86139,2.86139,0,0,1,3.09483,2.53809,2.86069,2.86069,0,0,1-3.09483,2.53711H10.77319c-2.11673,0-3.83836-1.416-3.83836-3.15723a3.45043,3.45043,0,0,1,3.39429-3.13965l1.22631-.11621V13.21145a3.41875,3.41875,0,0,1,1.53375-2.35107l.09679-.07227a7.29449,7.29449,0,0,1,4.29608-1.3789,6.72382,6.72382,0,0,1,4.31089,1.48193,4.583,4.583,0,0,1,1.76262,3.53418V15.607Z" transform="translate(0.59101 0.45456)"></path>
                              <path d="M8.7373,28.18216H2.37686a.19882.19882,0,0,1-.21179-.18262v-5.4541A1.2928,1.2928,0,0,0,.78732,21.3638,1.293,1.293,0,0,0-.591,22.54544v5.4541a2.78431,2.78431,0,0,0,2.96787,2.5459H8.7373a1.1956,1.1956,0,1,0,0-2.36328Z" transform="translate(0.59101 0.45456)"></path>
                              <path d="M.78732,8.72708A1.2928,1.2928,0,0,0,2.16507,7.54544V2.09085a.19841.19841,0,0,1,.21179-.18164H8.7373A1.29284,1.29284,0,0,0,10.11505.72708,1.2928,1.2928,0,0,0,8.7373-.45456H2.37686A2.7846,2.7846,0,0,0-.591,2.09085V7.54544A1.293,1.293,0,0,0,.78732,8.72708Z" transform="translate(0.59101 0.45456)"></path>
                              <path d="M34.17565,21.3638a1.2928,1.2928,0,0,0-1.37775,1.18164v5.4541a.19882.19882,0,0,1-.21179.18262h-6.3593a1.19575,1.19575,0,1,0,0,2.36328h6.3593a2.78413,2.78413,0,0,0,2.96844-2.5459v-5.4541A1.29318,1.29318,0,0,0,34.17565,21.3638Z" transform="translate(0.59101 0.45456)"></path>
                              <path d="M32.58611-.45456h-6.3593A1.29317,1.29317,0,0,0,24.84792.72708a1.29321,1.29321,0,0,0,1.37889,1.18213h6.3593a.19841.19841,0,0,1,.21179.18164V7.54544a1.39469,1.39469,0,0,0,2.75665,0V2.09085A2.78443,2.78443,0,0,0,32.58611-.45456Z" transform="translate(0.59101 0.45456)"></path>
                           </svg>
                           SCALABILITY
                        </h5>
                        <h3>Crypto-native Cloud</h3>
                        <p>From Proof-of-Stake sign-on through every consecutive screen, AlgoCloud is designed for optimal blockchain connectivity and constant on-chain interaction.</p>
                     </div>
                  </div>
               </div>
            </section>
            <section className="ac-landing bg-light text-center">
               <div className="container">
                  <div className="justify-content-center text-center row">
                     <div className="col-xxl-6 col-xxl-6 col-xl-7 col-lg-8">
                        <h1 className="fs-2 fs-sm-4 fs-md-5">Here's what's waiting for you!</h1>
                        <p className="lead">Things HDL holders will get right out of the box with AlgoCloud.</p>
                     </div>
                  </div>
                  <div className="mt-6 row">
                     <div className="col-lg-4">
                        <div className="card-span h-100 card">
                           <div className="card-span-img">
                              <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 256 256" fill="none">
                                 <circle cx="128" cy="128" r="128" fill="black" />
                                 <path d="M182.09 183.16H163.405L151.27 138.02L125.18 183.165H104.32L144.645 113.285L138.155 89.0248L83.7799 183.18H62.9099L131.82 63.8198H150.09L158.09 93.4748H176.94L164.07 115.855L182.09 183.16Z" fill="white" />
                              </svg>
                           </div>
                           <div className="pt-6 pb-4 card-body">
                              <h5 className="mb-2">Algorand Hub</h5>
                              <p>AlgoCloud will be the ultimate Algorand portal. AlgoCloud users will have the oppurtunity to beta test new apps
                                 that showcase the latest Algorand innovation.
                              </p>
                           </div>
                        </div>
                     </div>
                     <div className="mt-6 mt-lg-0 col-lg-4">
                        <div className="card-span h-100 card">
                           <div className="card-span-img">
                              <svg width="70" height="70" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <circle cx="128" cy="128" r="128" fill="#2F3130" />
                                 <path d="M184.338 67.8871C184.6 64.7736 182.042 62.2324 178.918 62.2324H123.757C120.633 62.2324 118.1 64.7654 118.1 67.8899V120.221C118.1 123.346 115.567 125.879 112.443 125.879H66.0932C61.0385 125.879 58.5209 132.003 62.114 135.558L117.861 190.718C118.92 191.766 120.35 192.354 121.84 192.354H171.019C176.045 192.354 178.576 186.29 175.041 182.718L121.52 128.621C154.763 126.936 181.563 100.831 184.338 67.8871Z" fill="#2F3130" />
                                 <path d="M77 58C77 56.3431 78.3431 55 80 55H99C100.657 55 102 56.3431 102 58V90C102 93.866 105.134 97 109 97H147C150.866 97 154 93.866 154 90V58C154 56.3431 155.343 55 157 55H176C177.657 55 179 56.3431 179 58V197C179 198.657 177.657 200 176 200H157C155.343 200 154 198.657 154 197V132C154 128.134 150.866 125 147 125H109C105.134 125 102 128.134 102 132V197C102 198.657 100.657 200 99 200H80C78.3431 200 77 198.657 77 197V58Z" fill="white" />
                              </svg>
                           </div>
                           <div className="pt-6 pb-4 card-body">
                              <h5 className="mb-2">HEADLINE DeFi</h5>
                              <p>HEADLINE-native DeFi solutions will be available alongside DeFi aggregators, giving AlgoCloud users an unparalled range of options that cover the risk tollerance spectrum of risk tollerances. </p>
                           </div>
                        </div>
                     </div>
                     <div className="mt-6 mt-lg-0 col-lg-4">
                        <div className="card-span h-100 card">
                           <div className="card-span-img">
                              <svg xmlns="http://www.w3.org/2000/svg" width="70" className="tinyman-logo" height="70" viewBox="0 0 1024 1024" fill="none">
                                 <path d="M0 243.931C0 158.547 0 115.855 16.6168 83.2427C31.2333 54.5562 54.5562 31.2333 83.2427 16.6168C115.855 0 158.547 0 243.931 0H780.069C865.453 0 908.145 0 940.757 16.6168C969.444 31.2333 992.767 54.5562 1007.38 83.2427C1024 115.855 1024 158.547 1024 243.931V780.069C1024 865.453 1024 908.145 1007.38 940.757C992.767 969.444 969.444 992.767 940.757 1007.38C908.145 1024 865.453 1024 780.069 1024H243.931C158.547 1024 115.855 1024 83.2427 1007.38C54.5562 992.767 31.2333 969.444 16.6168 940.757C0 908.145 0 865.453 0 780.069V243.931Z" fill="#F2FE67"></path>
                                 <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="1024" height="1024">
                                    <path d="M0 243.931C0 158.547 0 115.855 16.6168 83.2427C31.2333 54.5562 54.5562 31.2333 83.2427 16.6168C115.855 0 158.547 0 243.931 0H780.069C865.453 0 908.145 0 940.757 16.6168C969.444 31.2333 992.767 54.5562 1007.38 83.2427C1024 115.855 1024 158.547 1024 243.931V780.069C1024 865.453 1024 908.145 1007.38 940.757C992.767 969.444 969.444 992.767 940.757 1007.38C908.145 1024 865.453 1024 780.069 1024H243.931C158.547 1024 115.855 1024 83.2427 1007.38C54.5562 992.767 31.2333 969.444 16.6168 940.757C0 908.145 0 865.453 0 780.069V243.931Z" fill="#F2FE67"></path>
                                 </mask>
                                 <g mask="url(#mask0)">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M484.991 -553.337C551.858 -583.055 629.781 -548.685 652.92 -479.267L715.958 -290.153C756.869 -254.624 780.472 -203.035 780.472 -148.67V319.892C780.472 362.006 746.332 396.145 704.219 396.145C702.972 396.145 701.732 396.115 700.499 396.056V597.878C700.499 628.524 722.475 654.759 752.647 660.132L780.487 665.09C812.76 670.837 836.267 698.9 836.267 731.681C836.267 739.681 834.851 747.461 832.213 754.706C832.435 756.067 832.548 757.435 832.548 758.811C832.548 809.142 681.834 849.942 495.918 849.942C310.003 849.942 159.289 809.142 159.289 758.811C159.289 716.265 266.98 680.53 412.591 670.492L415.818 236.558C377.863 199.574 354.932 147.339 356.85 90.0098L366.978 -212.718C367.554 -229.937 374.085 -246.423 385.458 -259.364L418.368 -296.813C420.005 -298.677 420.829 -301.118 420.656 -303.592L411.687 -431.394C408.036 -483.415 437.337 -532.157 484.991 -553.337ZM531.255 379.517V711.741C525.687 712.763 519.46 713.233 512.682 713.16C499.552 713.018 485.89 710.858 473.842 708.127C464.669 706.047 457.032 696.962 457.128 684.05L459.537 359.958C474.959 367.199 510.034 378.421 531.255 379.517ZM627.966 390.565C627.966 408.957 639.574 424.638 655.863 430.682V597.878C655.863 650.157 693.351 694.911 744.821 704.077L772.661 709.035C783.637 710.989 791.631 720.533 791.631 731.681C791.631 742.64 784.183 751.183 774.533 752.79C727.91 760.555 647.046 770.578 584.603 761.125C580.475 760.5 575.89 756.378 575.89 749.098V271.06C575.89 257.97 565.279 247.359 552.19 247.359C466.921 247.359 398.609 176.723 401.461 91.5024L411.589 -211.226C411.82 -218.119 414.434 -224.718 418.987 -229.899L451.897 -267.348C461.407 -278.17 466.19 -292.346 465.182 -306.717L456.213 -434.519C453.877 -467.806 472.627 -498.996 503.12 -512.548C545.907 -531.565 595.768 -509.572 610.575 -465.152L675.268 -271.072C676.823 -266.406 679.669 -262.277 683.476 -259.162C716.616 -232.047 735.836 -191.489 735.836 -148.67V319.892C735.836 337.354 721.68 351.509 704.219 351.509C686.757 351.509 672.602 337.354 672.602 319.892V-113.448H627.966V319.892L627.966 320.204V390.565Z" fill="black"></path>
                                    <path fillRule="evenodd" clipRule="evenodd" d="M530.946 379.532V711.756C525.379 712.778 519.152 713.249 512.373 713.175C499.244 713.033 485.582 710.874 473.533 708.142C464.361 706.063 456.724 696.977 456.82 684.066L459.229 359.973C474.651 367.214 509.726 378.436 530.946 379.532ZM627.658 390.58C627.658 408.972 639.266 424.653 655.555 430.697V597.893C655.555 650.172 693.043 694.926 744.513 704.092L772.353 709.05C783.329 711.005 791.323 720.548 791.323 731.696C791.323 742.655 783.875 751.198 774.225 752.805C727.602 760.571 646.737 770.594 584.295 761.14C580.167 760.515 575.582 756.394 575.582 749.113V271.075C575.582 257.985 564.971 247.374 551.882 247.374C466.613 247.374 398.301 176.739 401.153 91.5177L411.281 -211.21C411.512 -218.103 414.126 -224.703 418.679 -229.884L451.589 -267.333C461.098 -278.154 465.882 -292.331 464.874 -306.701L455.905 -434.504C453.569 -467.791 472.318 -498.98 502.812 -512.533C545.598 -531.549 595.46 -509.556 610.267 -465.137L674.96 -271.057C676.515 -266.391 679.361 -262.261 683.168 -259.147C716.308 -232.032 735.528 -191.474 735.528 -148.654V319.908C735.528 337.369 721.372 351.525 703.911 351.525C686.449 351.525 672.294 337.369 672.294 319.908V-113.433H627.658V319.908L627.658 320.22V390.58Z" fill="#F2FE67"></path>
                                 </g>
                              </svg>
                           </div>
                           <div className="pt-6 pb-4 card-body">
                              <h5 className="mb-2">TinyMan Analytics</h5>
                              <p>What beta testers currently have access too. A wealth of live and historical data on the Algorand ecosystem.
                                 AlgoCloud APIs deliver blazing fast analytics on the TinyMan AMM.
                              </p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </section>
            <section className="ac-landing text-center bg-200-2">
               <div className="container">
                  <div className="card landing-faq">
                     <div className="card-header">
                        <h3 className="mb-0">Frequently asked questions</h3>
                     </div>
                     <div className="card-body bg-light pb-3">
                        <div className="row">
                           <div className="col-lg-6">
                              <h5 className="fs-1">How much does it cost to signup for AlgoCloud?</h5>
                              <p className="fs--1">Signing up for the AlgoCloud platform is 100% free for HDL token holders who have access to at least 500 HDL tokens. AlgoCloud is part of HEADLINE's POS (Proof-of-Stake) application suite. HDL tokens are essentially keys that allow users to access these platforms - FORUM (100 HDL tokens) and AlgoCloud (500 HDL tokens). We do not custody your tokens and you can use the same tokens to access any number of HEADLINE POS platforms.</p>

                              <h5 className="fs-1">Do I have to pay to use the service on AlgoCloud? </h5>
                              <p className="fs--1">Many DeFi protocols have a fee pool, so DeFi aggregator applications on AlgoCloud will have the parent fee pool. Additionally, over time we may add fee pools to any number of native DeFi or aggregator apps on AlgoCloud, but as is the case with many decisions HEADLINE makes, we tend let the community have a prominent voice in the discussion. Apart from the DeFi apps, other AlgoCloud apps may have additional fees. One feature of AlgoCloud, however will always be free: Analytics.</p>

                              <h5 className="fs-1">Analytics will always be free to AlgoCloud users?</h5>
                              <p className="fs--1">Yes! We are committed to providing the Algorand HDL community with free customizable analytics in perpetuity. Not only that, but we are committed to expending significant capital to make the AlgoCloud analytics suite one of the most robust, comprehensive data tools in the blockchain industry. We believe that data is one of the most valuable commodities in the blockchain ecosystem. While smart contract protocols can be forked and replicated, a serious data operation is extremely difficult to reproduce, even in cursory fashion. That is why our first core product on AlgoCloud is analytics. And that is why analytics will always be free to HDL holders. </p>

                              <h5 className="fs-1">Speaking of data, what information do you store on users?</h5>
                              <p className="fs--1">That is a great question and a serious point of focus for HEADLINE. We make every effort possible to protect the anonymity and privacy of our users. We are so committed to this endeavor, in fact, that some of our most popular open source tools have absolutely no tracking.
                                 Regarding AlgoCloud, we will have the platform carefully audited before the beta is over to address any security issues and ensure that every effort is made to respect users privacy. During the beta, we encourage testers to to use the platform with caution.
                              </p>
                           </div>
                           <div className="col-lg-6">
                              <h5 className="fs-1">If AlgoCloud is free, how does HEADLINE pay for it?</h5>
                              <p className="fs--1">At HEADLINE, we believe trust is the most valuable asset within a community. The higher the level of relative trust, the stronger the community. We build free tools for the HDL community and larger Algorand ecosystem, because it provides real value to people. When you constantly deliver real value, it directly correlates to the strength of your community. But getting back to the original question, our NFT sales and ongoing software services work pay for the development of AlgoCloud and other free applications we build. In the near future, the framework of AlgoCloud (not the analytics and DeFi suite) will have paid subscription tiers for business owners and enterprise clients. We will have several blockchain-native templates made for hedge funds, NFT Artists, software teams, etc that will allow people to white label the AlgoCloud framework to run their business on. All with built-in Algorand functionality. </p>

                              <h5 className="fs-1">What is the time frame to add AlgoCloud features?</h5>
                              <p className="fs--1">We will begin adding applications to AlgoCloud as soon as we feel confident that any security, privacy, efficiency, UI/UX, database concerns, etc have been addressed. We are also going to be getting smart contracts audited for 4 different HEADLINE DeFi applications as well as a full audit of our Algorand SDK. While all of that is getting finalized, we will continue to build out all of the analytics, insights, UI/UX, etc. </p>

                              <h5 className="fs-1">Where do I sign up?</h5>
                              <p className="fs--1">AlgoCloud is currently in a closed beta while we chase down bugs and harden the security. We will create a form here on AlgoCloud for HDL holders to request access/join the waiting list.</p>

                              <h5 className="fs-1">Why isn't AlgoCloud fully decentralized?</h5>
                              <p className="fs--1 mb-0">While we at HEADLINE believe in the spirit of Web 3 and decentralization, practical implementation is a lot messier. Moxie Marlinspike, the creator of Signal, wrote a scathing<a href="https://moxie.org/2022/01/07/web3-first-impressions.html"> article </a>about the current state of Web 3 and decentralization. Essentially what he is arguing is that while many blockchain protocols and practices may appear to be decentralized, they are in fact much more centralized than you may think. We agree with Moxie 100%. And while we work tirelessly to build fully decentralized applications that can make the dream of Web 3 a reality, we aren't going to sacrifice user experience on the altar of perceived innovation.  </p>
                           </div>
                        </div>
                     </div>
                     <div className="modal fade" id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                           <div className="modal-content border-0">
                              <div className="modal-header bg-card light">
                                 <h5 className="modal-title text-white" id="exampleModalLabel">Ask your question</h5>
                                 <button className="btn-close btn-close-white text-white" type="button" data-dismiss="modal" aria-label="Close"></button>
                              </div>
                              <div className="modal-body">
                                 <form>
                                    <div className="mb-3"><label >Name</label><input className="form-control" id="name" type="text" /></div>
                                    <div className="mb-3"> <label >Email</label><input className="form-control" id="emailModal" type="email" /></div>
                                    <div className="mb-3"> <label >Question</label><textarea className="form-control" id="question" ></textarea></div>
                                 </form>
                                 <button className="btn btn-primary btn-sm px-4" type="submit">
                                    <svg className="svg-inline--fa fa-paper-plane fa-w-16 me-2" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="paper-plane" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="">
                                       <path fill="currentColor" d="M476 3.2L12.5 270.6c-18.1 10.4-15.8 35.6 2.2 43.2L121 358.4l287.3-253.2c5.5-4.9 13.3 2.6 8.6 8.3L176 407v80.5c0 23.6 28.5 32.9 42.5 15.8L282 426l124.6 52.2c14.2 6 30.4-2.9 33-18.2l72-432C515 7.8 493.3-6.8 476 3.2z"></path>
                                    </svg>
                                    Send
                                 </button>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="card-footer py-3">
                        <div className="text-center py-3">
                           <h6 className="fs-0 fw-normal">Have more questions?</h6>
                           <a className="c-pill" href="#" data-toggle="modal" data-target="#exampleModal">Ask us anything</a>
                        </div>
                     </div>
                  </div>
                  <div className="justify-content-center row">
                  </div>
               </div>
            </section>
            <section className="ac-landing light">
               <div className="bg-holder overlay"
                  style={{ backgroundImage: "url(/assets/bg-motherboard.png)", backgroundPosition: "centerTop" }}></div>
               <div className="container">
                  <div className="justify-content-center text-center row">
                     <div className="col-lg-8">
                        <p className="fs-3 fs-sm-4 text-white-footer">Join our HDL Algorand community of 20,000+ developers, degens, and creators on their mission to build the future of finance.</p>
                        <Link className="border-2 rounded-pill mt-4 fs-0 py-2 btn btn-outline btn-lg btn-primary"
                           to="/auth/signup"
                        >
                           {i18n('Start your journey')}
                        </Link>
                     </div>
                  </div>
               </div>
            </section>
            <section className="ac-landing bg-dark-2 pt-8 pb-4 light">
               <div className="container">
                  <div className="position-absolute btn-back-to-top cursor-pointer bg-dark-2">
                     <a className="text-600" href="#banner" data-bs-offset-top="0" data-scroll-to="#banner">
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-up" className="svg-inline--fa fa-chevron-up fa-w-14 text-600" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style={{ transformOrigin: '0.4375em 0.5em' }}>
                           <g transform="translate(224 256)">
                              <g transform="translate(0, 0)  scale(1, 1)  rotate(45 0 0)">
                                 <path fill="currentColor" d="M240.971 130.524l194.343 194.343c9.373 9.373 9.373 24.569 0 33.941l-22.667 22.667c-9.357 9.357-24.522 9.375-33.901.04L224 227.495 69.255 381.516c-9.379 9.335-24.544 9.317-33.901-.04l-22.667-22.667c-9.373-9.373-9.373-24.569 0-33.941L207.03 130.525c9.372-9.373 24.568-9.373 33.941-.001z" transform="translate(-224 -256)"></path>
                              </g>
                           </g>
                        </svg>
                     </a>
                  </div>
                  <div className="row">
                     <div className="col-lg-4">
                        <h5 className="text-uppercase text-white-2 opacity-85 mb-3">Our Mission</h5>
                        <p className="text-600">AlgoCloud is a core application suite from HEADLINE, a fintech startup and Algorand development team.</p>
                        <div className="icon-group mt-4">
                           <a className="icon-item bg-white text-facebook" href="https://twitter.com/headline_crypto">
                              <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="facebook-f" className="svg-inline--fa fa-facebook-f fa-w-10 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                 <path fill="currentColor" d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path>
                              </svg>
                           </a>
                           <a className="icon-item bg-white text-twitter" href="https://twitter.com/headline_crypto">
                              <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="twitter" className="svg-inline--fa fa-twitter fa-w-16 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                 <path fill="currentColor" d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path>
                              </svg>
                           </a>
                           <a className="icon-item bg-white text-google-plus" href="https://twitter.com/headline_crypto">
                              <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google-plus-g" className="svg-inline--fa fa-google-plus-g fa-w-20 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                                 <path fill="currentColor" d="M386.061 228.496c1.834 9.692 3.143 19.384 3.143 31.956C389.204 370.205 315.599 448 204.8 448c-106.084 0-192-85.915-192-192s85.916-192 192-192c51.864 0 95.083 18.859 128.611 50.292l-52.126 50.03c-14.145-13.621-39.028-29.599-76.485-29.599-65.484 0-118.92 54.221-118.92 121.277 0 67.056 53.436 121.277 118.92 121.277 75.961 0 104.513-54.745 108.965-82.773H204.8v-66.009h181.261zm185.406 6.437V179.2h-56.001v55.733h-55.733v56.001h55.733v55.733h56.001v-55.733H627.2v-56.001h-55.733z"></path>
                              </svg>
                           </a>
                           <a className="icon-item bg-white text-linkedin" href="https://www.linkedin.com/company/hdlne">
                              <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="linkedin-in" className="svg-inline--fa fa-linkedin-in fa-w-14 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                 <path fill="currentColor" d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path>
                              </svg>
                           </a>
                           <a className="icon-item bg-white text-700" href="https://twitter.com/headline_crypto">
                              <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="medium-m" className="svg-inline--fa fa-medium-m fa-w-16 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                 <path fill="currentColor" d="M71.5 142.3c.6-5.9-1.7-11.8-6.1-15.8L20.3 72.1V64h140.2l108.4 237.7L364.2 64h133.7v8.1l-38.6 37c-3.3 2.5-5 6.7-4.3 10.8v272c-.7 4.1 1 8.3 4.3 10.8l37.7 37v8.1H307.3v-8.1l39.1-37.9c3.8-3.8 3.8-5 3.8-10.8V171.2L241.5 447.1h-14.7L100.4 171.2v184.9c-1.1 7.8 1.5 15.6 7 21.2l50.8 61.6v8.1h-144v-8L65 377.3c5.4-5.6 7.9-13.5 6.5-21.2V142.3z"></path>
                              </svg>
                           </a>
                        </div>
                     </div>
                     <div className="ps-lg-6 ps-xl-8 col">
                        <div className="mt-5 mt-lg-0 row">
                           <div className="col-md-3 col-6">
                              <h5 className="text-uppercase text-white-2 opacity-85 mb-3">Company</h5>
                              <ul className="list-unstyled">
                                 <li className="mb-1"><a className="text-600" href="https://www.headline-inc.com/history/overview">About</a></li>
                                 <li className="mb-1"><a className="text-600" href="https://www.headline-inc.com/contact/community-landline">Contact</a></li>
                                 <li className="mb-1"><a className="text-600" href="https://www.headline-inc.com/organization/team">Careers</a></li>
                                 <li className="mb-1"><a className="text-600" href="https://twitter.com/headline_crypto">Blog</a></li>
                                 <li className="mb-1"><a className="text-600" href="https://www.headline-inc.com/terms-of-use/">Terms</a></li>
                                 <li className="mb-1"><a className="text-600" href="https://www.headline-inc.com/help/privacy">Privacy</a></li>
                              </ul>
                           </div>
                           <div className="col-md-3 col-6">
                              <h5 className="text-uppercase text-white-2 opacity-85 mb-3">Product</h5>
                              <ul className="list-unstyled">
                                 <li className="mb-1"><a className="text-600" href="https://twitter.com/headline_crypto">Features</a></li>
                                 <li className="mb-1"><a className="text-600" href="https://twitter.com/headline_crypto">Roadmap</a></li>
                                 <li className="mb-1"><a className="text-600" href="https://twitter.com/headline_crypto">Changelog</a></li>
                                 <li className="mb-1"><a className="text-600" href="https://twitter.com/headline_crypto">Pricing</a></li>
                                 <li className="mb-1"><a className="text-600" href="https://twitter.com/headline_crypto">Docs</a></li>
                                 <li className="mb-1"><a className="text-600" href="https://twitter.com/headline_crypto">System Status</a></li>
                                 <li className="mb-1"><a className="text-600" href="https://twitter.com/headline_crypto">Agencies</a></li>
                                 <li className="mb-1"><a className="text-600" href="https://twitter.com/headline_crypto">Enterprise</a></li>
                              </ul>
                           </div>
                           <div className="mt-5 mt-md-0 col">
                              <h5 className="text-uppercase text-white-2 opacity-85 mb-3">In the News</h5>
                              <ul className="list-unstyled">
                                 <li>
                                    <h5 className="fs-0 mb-0"><a className="text-600" href="https://cryptoslate.com/worlds-first-embeddable-dex-algoswap-launches-on-algorand">"World's First Embeddable DEX"</a></h5>
                                    <p className="text-600 opacity-50">Jan 15 • 2min read <span>★</span></p>
                                 </li>
                                 <li>
                                    <h5 className="fs-0 mb-0"><a className="text-600" href="https://algonaut.space/headline-algorand">"Algorand's Ecosystem Builder"</a></h5>
                                    <p className="text-600 opacity-50">Jan 5 • 8min read </p>
                                 </li>
                                 <li>
                                    <h5 className="fs-0 mb-0"><a className="text-600" href="https://algorand.foundation/news/headline-inc-development-award">"Groundbreaking On-Ramp Solution"</a></h5>
                                    <p className="text-600 opacity-50">Dec 25 • 4min read </p>
                                 </li>
                                 <li>
                                    <h5 className="fs-0 mb-0"><a className="text-600" href="https://www.benzinga.com/pressreleases/22/01/g25287521/dolphin-defenders-algorand-start-up-headline-inc-makes-a-splash-with-a-new-csr-initiative">"Dolphin Defenders"</a></h5>
                                    <p className="text-600 opacity-50">Dec 23 • 6min read </p>
                                 </li>
                              </ul>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </section>
            <section className="ac-landing bg-dark-2 py-0 text-center fs--1 light">
               <hr className="my-0 border-600 opacity-25" />
               <div className="container py-3">
                  <div className="justify-content-between row">
                     <div className="col-sm-auto col-12 footer-auto">
                        <p className="mb-0 text-600"><span className="d-none d-sm-inline-block">👷 AlgoCloud is in Beta. Please wear a hardhat! | </span><br className="d-sm-none" /> 2022 © <a className="text-white-2 opacity-85" href="https://headline-inc.com" target="_blank" rel="noopener noreferrer">HEADLINE INC</a></p>
                     </div>
                     <div className="col-sm-auto col-12 footer-auto">
                        <p className="mb-0 text-600">v0.0.8</p>
                     </div>
                  </div>
               </div>
            </section>
         </main>
      </Wrapper>
   );
}
export default LandingPage;