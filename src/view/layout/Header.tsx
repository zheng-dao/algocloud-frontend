import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { i18n } from 'src/i18n';
import authActions from 'src/modules/auth/authActions';
import authSelectors from 'src/modules/auth/authSelectors';
import assetListSelectors from 'src/modules/algorand/asset/list/assetListSelectors';
import layoutActions from 'src/modules/layout/layoutActions';
import { getHistory } from 'src/modules/store';
import I18nSelect from 'src/view/layout/I18nSelect';
import HeaderWrapper from 'src/view/layout/styles/HeaderWrapper';
import Avatar from 'src/view/shared/Avatar';
import config from 'src/config';
import { Link } from 'react-router-dom';
import DarkMode from 'src/view/algorand/components/DarkMode/DarkMode';
import PipeConnect from 'src/view/Portfolio/components/PipeConnect';

import { StreamChat } from 'stream-chat';

const apiKey = config.STREAM_API_KEY;

function Header(props) {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const [isSearched, setIsSearched] = useState(false);
  const [filtered, setFiltered] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const [chatClient, setChatClient] = useState(null);

  const [messages, setMessages] = useState([]);

  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target) && event.target.tagName !== 'A' && event.target.tagName !== 'H6') {
        setIsSearched(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  useLayoutEffect(() => {
    function updateSize() {
      let searchBox = document.getElementById("search-box");
      if (window.innerWidth > 575) {
        searchBox.style["position"] = "relative";
        searchBox.style["display"] = "block";
        searchBox.style["margin-right"] = "1rem";
        searchBox.style["max-width"] = "100%";
        searchBox.style["top"] = "0px";
        searchBox.style["left"] = "0px";
      } else {
        searchBox.style["display"] = "none";
      }
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const doToggleMenu = () => {
    let element1 = document.getElementById("main") || { style: { margin: "" } }
    let element2 = document.getElementById("menu-nav") || { style: { position: "", display: "block" } }
    let element3 = document.getElementById("body") || { style: { position: "" } }

    toggle ? setToggle(false) : setToggle(true)
    if (window.innerWidth < 575)
      if (toggle) {
        element1.style["margin"] = ""
        element2.style["position"] = "fixed"
        element2.style["display"] = "block"
        element3.style["position"] = "relative"
      }
      else {
        element1.style["margin"] = "unset"
        element2.style["position"] = "fixed"
        element2.style["display"] = "block"
        element3.style["position"] = ""
      }
    dispatch(layoutActions.doToggleMenu());
  };

  const currentUser = useSelector(
    authSelectors.selectCurrentUser,
  );

  const userText = useSelector(
    authSelectors.selectCurrentUserNameOrEmailPrefix,
  );
  const userAvatar = useSelector(
    authSelectors.selectCurrentUserAvatar,
  );
  const currentTenant = useSelector(
    authSelectors.selectCurrentTenant,
  );
  const currentUserIsSuperadmin = useSelector(
    authSelectors.selectCurrentUserSuperadmin,
  );

  const assets = useSelector(assetListSelectors.selectAssets);

  const filter = { type: 'messaging' };
  const sort = [{ last_message_at: -1 }];
  const userToConnect = { id: currentUser.id, name: currentUser.fullName, image: userAvatar };
  useEffect(() => {
    const initChat = async () => {
      const client = StreamChat.getInstance(apiKey, {
        enableInsights: true,
        enableWSFallback: true,
      });
      const userToken = client.devToken(userToConnect.id);
      // await client.disconnect();
      await client.connectUser(userToConnect, userToken);
      client.on(event => {
        if (event.total_unread_count !== undefined && event.total_unread_count === 0) {
          console.log("event.total_unread_count", event.total_unread_count);
          setMessages([]);
        }

        if (event.unread_channels !== undefined && event.unread_channels === 0) {
          console.log("event.unread_channels", event.unread_channels);
          setMessages([]);
        }
      });
      setChatClient(client);
    };

    initChat();

    // return () => chatClient?.disconnectUser();
  }, [currentUser]);

  useEffect(() => {
    if (chatClient) {
      getChannels();
    }
  }, [chatClient]);

  const getChannels = async () => {
    const channels = await chatClient.queryChannels(filter, sort, {
      watch: true, // this is the default 
      state: true,
    });

    const unread: any[] = await Promise.all(
      channels.map(async (channel) => {
        const messages = await channel.query();
        const lastRead = messages.read.filter(message => message.unread_messages > 0 && message.user.id === userToConnect.id);
        const unreadMessages = messages.messages.filter(message => lastRead && lastRead.length > 0 && Date.parse(message.created_at) > Date.parse(lastRead[0].last_read));
        return { channel: messages.channel, unreadMessages: unreadMessages }
      })
    );
    const filtered = unread.filter(item => item.unreadMessages.length > 0);

    setMessages(filtered);
  }

  const doSignout = () => {
    dispatch(authActions.doSignout());
  };

  const doNavigateToProfile = () => {
    getHistory().push('/plan');
    // window.location.href = "http://localhost:3000/profile"
  };

  const doNavigateToPasswordChange = () => {
    getHistory().push('/password-change');
  };

  const doNavigateToTenants = () => {
    getHistory().push('/tenant');
  };

  const updateInputValue = (evt) => {
    const val = evt.target.value;
    // ...
    setInputValue(val);
  }

  const handleSearch = () => {
    inputValue === '' ? setFiltered([]) : setFiltered(assets.filter(asset => asset.name.toLowerCase().includes(inputValue.toLowerCase()) || asset.unitName.toLowerCase().includes(inputValue.toLowerCase()) || asset.assetId.toString().toLowerCase().includes(inputValue.toLowerCase())));
    inputValue === '' ? setIsSearched(false) : setIsSearched(true);
  }

  const showSearchBox = () => {
    let searchBox = document.getElementById("search-box");
    if (window.innerWidth < 825) {
      searchBox.style["position"] = "fixed";
      searchBox.style["display"] = "block";
      searchBox.style["top"] = "65px";
      searchBox.style["left"] = "10px";
      searchBox.style["right"] = "10px";
      searchBox.style["width"] = `${window.innerWidth - 20}px`;
    }
  }

  const markAll = async (e) => {
    e.preventDefault();
    if (chatClient) {
      await chatClient.markAllRead();
    }
  }

  const newMessages = () => {
    return messages.map(message => {
      return message.unreadMessages.map((unreadMessage, index) => {
        return (
          <div key={index}>
            <div className="list-group-title border-bottom">{message.channel.name}</div>
            <div className="list-group-item">
              <a className="notification notification-flush notification-unread" href="#!">
                <div className="notification-avatar">
                  <div className="avatar avatar-2xl me-3">
                    <img className="rounded-circle" src={unreadMessage.user.image} alt="avatar" />
                  </div>
                </div>
                <div className="notification-body">
                  <p className="mb-1"><strong>{unreadMessage.user.name}</strong> sent to your {message.channel.name} : {unreadMessage.text}</p>
                  {/* <span className="notification-time"><span className="me-2" role="img" aria-label="Emoji">💬</span>Just now</span> */}
                </div>
              </a>
            </div>
          </div>
        )
      });
    });
  }

  return (
    <HeaderWrapper id="stickyTop" >
      <div id="stickyTop-2" className="navbar sticky-top">
        <button
          type="button"
          onClick={doToggleMenu}
          className="btn navbar-toggler-humburger-icon navbar-vertical-toggle"
        >
          <i className="fas fa-bars" />
        </button>
        <a className="algocloud-navbar-brand" href=".">
          <div className="algocloud-font">AlgoCloud</div>
          <svg className="algocloud-font-logo" xmlns="http://www.w3.org/2000/svg" id="algocloud-font-logo" data-name="Layer 1" viewBox="0 0 230 230"><path d="M120.38942,116.97445q-4.12061.81445-8.23974,1.43652-4.12134.624-7.47413,1.10254A50.50469,50.50469,0,0,0,92.1238,122.867a20.24693,20.24693,0,0,0-8.33594,6.17969,15.37525,15.37525,0,0,0-2.97022,9.62988q0,8.335,6.08448,12.69531,6.08349,4.36084,15.47412,4.35938a33.942,33.942,0,0,0,15.90527-3.59278,27.81533,27.81533,0,0,0,10.82715-9.72558,25.1984,25.1984,0,0,0,3.92871-13.89356V112.90218a20.87085,20.87085,0,0,1-5.22217,2.251A76.457,76.457,0,0,1,120.38942,116.97445Z" fill="currentColor" /><path d="M114.9,5.14529a110,110,0,1,0,110,110A110,110,0,0,0,114.9,5.14529Zm58.66712,175.9776H134.85768V160.71371h-1.14941a40.93579,40.93579,0,0,1-9.48584,12.12109,42.77205,42.77205,0,0,1-14.27686,8.14453,58.15417,58.15417,0,0,1-19.25879,2.92188,60.81052,60.81052,0,0,1-25.104-4.93457,39.67133,39.67133,0,0,1-17.39062-14.65918q-6.37355-9.72363-6.37159-24.29,0-12.26367,4.50342-20.60059a36.46676,36.46676,0,0,1,12.26416-13.41357,59.42139,59.42139,0,0,1,17.67822-7.66553,133.236,133.236,0,0,1,20.83985-3.64111q12.83862-1.34034,20.69629-2.53906,7.85522-1.19679,11.40234-3.59327a8.00139,8.00139,0,0,0,3.54492-7.09033v-.57471q0-9.1018-5.70117-14.085-5.70117-4.9812-16.14453-4.98242-11.02,0-17.53467,4.83887a22.706,22.706,0,0,0-8.62353,12.1206L46.9944,75.72494A51.63992,51.63992,0,0,1,58.30055,52.48959,54.84107,54.84107,0,0,1,80.09889,37.35091Q93.4656,32.0328,111.09548,32.033a94.73173,94.73173,0,0,1,23.52295,2.87452,62.04052,62.04052,0,0,1,20.02539,8.91064,43.61658,43.61658,0,0,1,13.8457,15.47461q5.07788,9.43872,5.07764,22.56445Z" fill="currentColor" /></svg>
        </a>

        <div className="last-child" style={{ display: 'flex', alignItems: 'center', justifyContent: "flex-end" }}>
          <div id='search-box' className='search-box'>
            <div className='d-flex'>
              <input ref={wrapperRef} type='search' className='crayons-header--search-input crayons-textfield' placeholder='Search by Asset Name/Asset ID/Asset Unit'
                onMouseUp={() => handleSearch()}
                onKeyUp={() => handleSearch()}
                onChange={evt => updateInputValue(evt)}
                style={{ height: '40px', textOverflow: 'ellipsis', width: '100%', paddingRight: '1rem', paddingLeft: '40px', lineHeight: '2.2', borderTopLeftRadius: `${isSearched ? '1.2rem' : '50rem'}`, borderBottomLeftRadius: `${isSearched ? '0rem' : '50rem'}`, borderTopRightRadius: '0rem', borderBottomRightRadius: '0rem' }} />
              <button className='c-btn c-btn--icon-alone absolute inset-px left-auto mt-0 py-0' onClick={() => handleSearch()}
                style={{ fontSize: "16px" }}>
                <i className='fas fa-search'></i>
              </button>
            </div>
            {
              isSearched &&
              <div className='dropdown-content d-flex flex-column '
                style={{ position: 'absolute', padding: '1rem', marginTop: ".5rem", borderRadius: ".375rem", border: "0px", backgroundColor: 'var(--header-bg)', width: '100%', height: 'auto', overflowY: 'auto', boxShadow: '0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -2px rgba(0,0,0,.05),0 0 0 1px var(--base-a10)' }}>
                {
                  filtered.map((asset, index) => {
                    return (
                      <Link to={`/algorand/assets/${asset.assetId}`} key={asset.assetId}>
                        <h6 id="seach-item" className='text-secondary m-0'>{asset.name} - {asset.assetId} {' '} {asset.unitName} {index === 0 && <i className='fas fa-check ml-3'></i>}</h6>
                      </Link>
                    )
                  })
                }
              </div>
            }
          </div>

          <button className='c-link c-link--icon-alone c-link--block m:hidden  mobile-search' onClick={() => showSearchBox()}>
            <i className='fas fa-search'></i>
          </button>

          <span className="i18n-select">
            <PipeConnect />
          </span>

          <li className="nav-item dropdown">
            {
              messages.length > 0 ?
                <button className="nav-link notification-indicator notification-indicator-primary px-0 fa-icon-wait user-dropdown"
                  id="navbarDropdownNotification"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  data-hide-on-body-scroll="data-hide-on-body-scroll"
                  aria-expanded="true"
                  data-toggle="dropdown"
                >
                  <svg className="svg-inline--fa fa-bell fa-w-14" data-fa-transform="shrink-6"
                    style={{ fontSize: '33px', transformOrigin: "0.4375em 0.5em" }}
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="bell" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg="" fill="currentColor">
                    <g transform="translate(224 256)">
                      <g transform="translate(0, 0)  scale(0.625, 0.625)  rotate(0 0 0)"><path fill="currentColor" d="M224 512c35.32 0 63.97-28.65 63.97-64H160.03c0 35.35 28.65 64 63.97 64zm215.39-149.71c-19.32-20.76-55.47-51.99-55.47-154.29 0-77.7-54.48-139.9-127.94-155.16V32c0-17.67-14.32-32-31.98-32s-31.98 14.33-31.98 32v20.84C118.56 68.1 64.08 130.3 64.08 208c0 102.3-36.15 133.53-55.47 154.29-6 6.45-8.66 14.16-8.61 21.71.11 16.4 12.98 32 32.1 32h383.8c19.12 0 32-15.6 32.1-32 .05-7.55-2.61-15.27-8.61-21.71z" transform="translate(-224 -256)"></path></g>
                    </g>
                  </svg>
                </button>
                :
                <button className="nav-link px-0 fa-icon-wait user-dropdown"
                  id="navbarDropdownNotification"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  data-hide-on-body-scroll="data-hide-on-body-scroll"
                  aria-expanded="true"
                  data-toggle="dropdown"
                >
                  <svg className="svg-inline--fa fa-bell fa-w-14" data-fa-transform="shrink-6"
                    style={{ fontSize: '33px', transformOrigin: "0.4375em 0.5em" }}
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="bell" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg="" fill="currentColor">
                    <g transform="translate(224 256)">
                      <g transform="translate(0, 0)  scale(0.625, 0.625)  rotate(0 0 0)"><path fill="currentColor" d="M224 512c35.32 0 63.97-28.65 63.97-64H160.03c0 35.35 28.65 64 63.97 64zm215.39-149.71c-19.32-20.76-55.47-51.99-55.47-154.29 0-77.7-54.48-139.9-127.94-155.16V32c0-17.67-14.32-32-31.98-32s-31.98 14.33-31.98 32v20.84C118.56 68.1 64.08 130.3 64.08 208c0 102.3-36.15 133.53-55.47 154.29-6 6.45-8.66 14.16-8.61 21.71.11 16.4 12.98 32 32.1 32h383.8c19.12 0 32-15.6 32.1-32 .05-7.55-2.61-15.27-8.61-21.71z" transform="translate(-224 -256)"></path></g>
                    </g>
                  </svg>
                </button>
            }
            <div className="dropdown-menu dropdown-menu-end dropdown-menu-card dropdown-menu-notification" aria-labelledby="navbarDropdownNotification">
              <div className="card card-notification shadow-none">
                <div className="card-header">
                  <div className="row justify-content-between align-items-center">
                    <div className="col-auto">
                      <h6 className="card-header-title mb-0">Notifications</h6>
                    </div>
                    <div className="col-auto ps-0 ps-sm-3"><a className="card-link fw-normal" href="#" onClick={markAll}>Mark all as read</a></div>
                  </div>
                </div>
                <div className="scrollbar-overlay os-host os-theme-dark os-host-resize-disabled os-host-scrollbar-horizontal-hidden os-host-scrollbar-vertical-hidden os-host-transition notification-body"
                  style={{ maxHeight: "19rem" }} >
                  <div className="os-resize-observer-host observed">
                    <div className="os-resize-observer"
                      style={{ left: "0px", right: "auto", maxHeight: "19rem" }} >
                    </div></div><div className="os-size-auto-observer observed"
                      style={{ height: "calc(100% + 1px)", float: "left", maxHeight: "19rem" }} >
                    <div className="os-resize-observer"></div></div>
                  <div className="os-content-glue"
                    style={{ margin: "0px", minHeight: "250px", width: "317px" }}></div>
                  <div className="os-padding">
                    <div className="os-viewport os-viewport-native-scrollbars-invisible">
                      <div className="os-content-2"
                        style={{ padding: "0px", height: "100%", width: "100%" }} >
                        <div className="list-group list-group-flush fw-normal fs--1">
                          {
                            newMessages()
                          }
                          {/* <div className="list-group-title border-bottom">NEW</div>
                          <div className="list-group-item">
                            <a className="notification notification-flush notification-unread" href="#!">
                              <div className="notification-avatar">
                                <div className="avatar avatar-2xl me-3">
                                  <img className="rounded-circle" src="../../images/Astro-1.jpg" alt="" />
                                </div>
                              </div>
                              <div className="notification-body">
                                <p className="mb-1"><strong>Astro Joe</strong> replied to your FORUM comment : "Hello world 😍"</p>
                                <span className="notification-time"><span className="me-2" role="img" aria-label="Emoji">💬</span>Just now</span>
                              </div>
                            </a>
                          </div>
                          <div className="list-group-item">
                            <a className="notification notification-flush notification-unread" href="#!">
                              <div className="notification-avatar">
                                <div className="avatar avatar-2xl me-3">
                                  <div className="avatar-name rounded-circle"><span>AB</span></div>
                                </div>
                              </div>
                              <div className="notification-body">
                                <p className="mb-1"><strong>Antonio Banderas</strong> reacted to <strong>Mia Khalifa's</strong> status</p>
                                <span className="notification-time"><svg className="svg-inline--fa fa-gratipay fa-w-16 me-2 text-danger" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="gratipay" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" data-fa-i2svg=""><path fill="currentColor" d="M248 8C111.1 8 0 119.1 0 256s111.1 248 248 248 248-111.1 248-248S384.9 8 248 8zm114.6 226.4l-113 152.7-112.7-152.7c-8.7-11.9-19.1-50.4 13.6-72 28.1-18.1 54.6-4.2 68.5 11.9 15.9 17.9 46.6 16.9 61.7 0 13.9-16.1 40.4-30 68.1-11.9 32.9 21.6 22.6 60 13.8 72z"></path></svg><span className="me-2 fab fa-gratipay text-danger"></span>9hr</span>
                              </div>
                            </a>
                          </div> */}
                          {/* <div className="list-group-title border-top border-bottom">EARLIER</div>
                          <div className="list-group-item">
                            <a className="notification notification-flush" href="#!">
                              <div className="notification-avatar">
                                <div className="avatar avatar-2xl me-3">
                                  <img className="rounded-circle" src="../../images/promo-logo.png" alt="" />
                                </div>
                              </div>
                              <div className="notification-body">
                                <p className="mb-1">The forecast today shows a low of 20℃ in Cupertino, CA. See today's weather.</p>
                                <span className="notification-time"><span className="me-2" role="img" aria-label="Emoji">🌤️</span>1d</span>
                              </div>
                            </a>
                          </div>
                          <div className="list-group-item">
                            <a className="border-bottom-0 notification-unread  notification notification-flush" href="#!">
                              <div className="notification-avatar">
                                <div className="avatar avatar-xl me-3">
                                  <img className="rounded-circle" src="../../images/Astro-3.jpg" alt="" />
                                </div>
                              </div>
                              <div className="notification-body">
                                <p className="mb-1"><strong>University of Arizona</strong> created an event : "Brawndo: It has what plants crave."</p>
                                <span className="notification-time"><span className="me-2" role="img" aria-label="Emoji">✌️</span>1w</span>
                              </div>
                            </a>
                          </div>
                          <div className="list-group-item">
                            <a className="border-bottom-0 notification notification-flush" href="#!">
                              <div className="notification-avatar">
                                <div className="avatar avatar-xl me-3">
                                  <img className="rounded-circle" src="../../images/Astro-2.jpg" alt="" />
                                </div>
                              </div>
                              <div className="notification-body">
                                <p className="mb-1"><strong>Jim Cameron</strong> invited to join the group: Tres Comas Tequila for Prez</p>
                                <span className="notification-time"><span className="me-2" role="img" aria-label="Emoji">🙋&zwj;</span>2d</span>
                              </div>
                            </a>
                          </div> */}
                        </div>
                      </div>
                    </div></div></div><div className="os-scrollbar os-scrollbar-horizontal os-scrollbar-unusable os-scrollbar-auto-hidden"><div className="os-scrollbar-track os-scrollbar-track-off"><div className="os-scrollbar-handle"
                      style={{ transform: "translate(0px, 0px)", float: "left", maxHeight: "19rem" }}>
                    </div></div></div>
                <div className="os-scrollbar os-scrollbar-vertical os-scrollbar-unusable os-scrollbar-auto-hidden">
                  <div className="os-scrollbar-track os-scrollbar-track-off"><div className="os-scrollbar-handle"
                    style={{ transform: "translate(0px, 0px)" }}>
                  </div></div></div><div className="os-scrollbar-corner"></div>
              </div>
              <div className="card-footer text-center border-top">
                <a className="card-link d-block" href="../../app/social/notifications.html">View all</a>
              </div>
            </div>
          </li >

          <div className="dropdown app-dropdown">

            <button
              className="app-dropdown user-dropdown"
              id="navbarDropdownMenu" role="button" data-hide-on-body-scroll="data-hide-on-body-scroll" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="true"
              data-toggle="dropdown">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="18" height="18" viewBox="0 0 276.167 276.167"><path d="M33.144 2.471C15.336 2.471.85 16.958.85 34.765s14.48 32.293 32.294 32.293 32.294-14.486 32.294-32.293S50.951 2.471 33.144 2.471zm104.519 0c-17.807 0-32.294 14.487-32.294 32.294s14.487 32.293 32.294 32.293 32.297-14.486 32.297-32.293-14.483-32.294-32.297-32.294zm106.21 64.588c17.804 0 32.294-14.486 32.294-32.293S261.689 2.471 243.873 2.471s-32.294 14.487-32.294 32.294 14.489 32.294 32.294 32.294zM32.3 170.539c17.807 0 32.297-14.483 32.297-32.293s-14.49-32.297-32.297-32.297S0 120.436 0 138.246s14.493 32.293 32.3 32.293zm104.519 0c17.804 0 32.294-14.483 32.294-32.293s-14.478-32.297-32.294-32.297-32.294 14.486-32.294 32.297 14.487 32.293 32.294 32.293zm106.219 0c17.811 0 32.294-14.483 32.294-32.293s-14.483-32.297-32.294-32.297-32.306 14.486-32.306 32.297 14.49 32.293 32.306 32.293zM33.039 209.108c-17.807 0-32.3 14.483-32.3 32.294 0 17.804 14.493 32.293 32.3 32.293s32.293-14.482 32.293-32.293-14.486-32.294-32.293-32.294zm104.525 0c-17.808 0-32.3 14.483-32.3 32.294 0 17.804 14.487 32.293 32.3 32.293 17.804 0 32.293-14.482 32.293-32.293s-14.489-32.294-32.293-32.294zm106.207 0c-17.804 0-32.294 14.483-32.294 32.294 0 17.804 14.49 32.293 32.294 32.293 17.811 0 32.294-14.482 32.294-32.293s-14.49-32.294-32.294-32.294z" /></svg>
            </button>
            <div id="app-dropdown" className="dropdown-menu dropdown-menu-end dropdown-menu-card" aria-labelledby="navbarDropdownMenu" data-bs-popper="none">
              <div className="card shadow-none">
                <div className="scrollbar-overlay navbar-dropdown-dots os-host os-theme-dark os-host-resize-disabled os-host-scrollbar-horizontal-hidden os-host-transition os-host-overflow os-host-overflow-y" style={{ overflow: 'scroll !important', overflowY: 'scroll' }}><div className="os-resize-observer-host observed"><div className="os-resize-observer" ></div></div><div className="os-size-auto-observer observed" ><div className="os-resize-observer"></div></div><div className="os-content-glue" ></div><div className="os-padding"><div className="os-viewport os-viewport-native-scrollbars-invisible" ><div className="os-content" >
                  <div className="card-body px-3">
                    <div className="row text-center gx-0 gy-0">
                      <div className="col-4"><a className="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="/profile" target="_blank">
                        <div className="avatar avatar-2xl">
                          <Avatar
                            size="large"
                            src={userAvatar || undefined}
                            alt="avatar"
                            className="rounded-circle"
                          />
                        </div>
                        <p className="mb-0 fw-medium  text-truncate fs--2 pt-1">Account</p>
                      </a></div>
                      <div className="col-4"><a className="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="https://algorand.com/" target="_blank"><img className="rounded" src="../../assets/img/nav-icons/algorand-logo.png" alt="" width="40" height="40" />
                        <p className="mb-0 fw-medium  text-truncate fs--2 pt-1">Algorand</p>
                      </a></div>
                      <div className="col-4"><a className="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="https://mailbluster.com/" target="_blank"><img className="rounded" src="../../assets/img/nav-icons/mailbluster.png" alt="" width="40" height="40" />
                        <p className="mb-0 fw-medium  text-truncate fs--2 pt-1">Mailbluster</p>
                      </a></div>
                      <div className="col-4"><a className="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="#!" target="_blank"><img className="rounded" src="../../assets/img/nav-icons/google.png" alt="" width="40" height="40" />
                        <p className="mb-0 fw-medium  text-truncate fs--2 pt-1">Google</p>
                      </a></div>
                      <div className="col-4"><a className="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="#!" target="_blank"><img className="rounded" src="../../assets/img/nav-icons/spotify.png" alt="" width="40" height="40" />
                        <p className="mb-0 fw-medium  text-truncate fs--2 pt-1">Spotify</p>
                      </a></div>
                      <div className="col-4"><a className="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="#!" target="_blank"><img className="rounded" src="../../assets/img/nav-icons/steam.png" alt="" width="40" height="40" />
                        <p className="mb-0 fw-medium  text-truncate fs--2 pt-1">Steam</p>
                      </a></div>
                      <div className="col-4"><a className="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="#!" target="_blank"><img className="rounded" src="../../assets/img/nav-icons/github-light.png" alt="" width="40" height="40" />
                        <p className="mb-0 fw-medium  text-truncate fs--2 pt-1">Github</p>
                      </a></div>
                      <div className="col-4"><a className="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="#!" target="_blank"><img className="rounded" src="../../assets/img/nav-icons/discord.png" alt="" width="40" height="40" />
                        <p className="mb-0 fw-medium  text-truncate fs--2 pt-1">Discord</p>
                      </a></div>
                      <div className="col-4"><a className="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="#!" target="_blank"><img className="rounded" src="../../assets/img/nav-icons/xbox.png" alt="" width="40" height="40" />
                        <p className="mb-0 fw-medium  text-truncate fs--2 pt-1">xbox</p>
                      </a></div>
                      <div className="col-4"><a className="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="#!" target="_blank"><img className="rounded" src="../../assets/img/nav-icons/trello.png" alt="" width="40" height="40" />
                        <p className="mb-0 fw-medium  text-truncate fs--2 pt-1">Kanban</p>
                      </a></div>
                      <div className="col-4"><a className="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="#!" target="_blank"><img className="rounded" src="../../assets/img/nav-icons/hp.png" alt="" width="40" height="40" />
                        <p className="mb-0 fw-medium  text-truncate fs--2 pt-1">Hp</p>
                      </a></div>
                      <div className="col-12">
                        <hr className="my-3 mx-n3 bg-200" />
                      </div>
                      <div className="col-4"><a className="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="#!" target="_blank"><img className="rounded" src="../../assets/img/nav-icons/linkedin.png" alt="" width="40" height="40" />
                        <p className="mb-0 fw-medium  text-truncate fs--2 pt-1">Linkedin</p>
                      </a></div>
                      <div className="col-4"><a className="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="#!" target="_blank"><img className="rounded" src="../../assets/img/nav-icons/twitter.png" alt="" width="40" height="40" />
                        <p className="mb-0 fw-medium  text-truncate fs--2 pt-1">Twitter</p>
                      </a></div>
                      <div className="col-4"><a className="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="#!" target="_blank"><img className="rounded" src="../../assets/img/nav-icons/facebook.png" alt="" width="40" height="40" />
                        <p className="mb-0 fw-medium  text-truncate fs--2 pt-1">Facebook</p>
                      </a></div>
                      <div className="col-4"><a className="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="#!" target="_blank"><img className="rounded" src="../../assets/img/nav-icons/instagram.png" alt="" width="40" height="40" />
                        <p className="mb-0 fw-medium  text-truncate fs--2 pt-1">Instagram</p>
                      </a></div>
                      <div className="col-4"><a className="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="#!" target="_blank"><img className="rounded" src="../../assets/img/nav-icons/pinterest.png" alt="" width="40" height="40" />
                        <p className="mb-0 fw-medium  text-truncate fs--2 pt-1">Pinterest</p>
                      </a></div>
                      <div className="col-4"><a className="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="#!" target="_blank"><img className="rounded" src="../../assets/img/nav-icons/slack.png" alt="" width="40" height="40" />
                        <p className="mb-0 fw-medium  text-truncate fs--2 pt-1">Slack</p>
                      </a></div>
                      <div className="col-4"><a className="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="#!" target="_blank"><img className="rounded" src="../../assets/img/nav-icons/deviantart.png" alt="" width="40" height="40" />
                        <p className="mb-0 fw-medium  text-truncate fs--2 pt-1">Deviantart</p>
                      </a></div>
                      <div className="col-4"><a className="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="../../app/events/event-detail.html" target="_blank">
                        <div className="avatar avatar-2xl">
                          <div className="avatar-name rounded-circle bg-soft-primary text-primary"><span className="fs-2">E</span></div>
                        </div>
                        <p className="mb-0 fw-medium  text-truncate fs--2">Events</p>
                      </a></div>
                      <div className="col-12"><a className="btn btn-outline-primary btn-sm mt-4" href="#!">Show more</a></div>
                    </div>
                  </div>
                </div></div></div><div className="os-scrollbar os-scrollbar-horizontal os-scrollbar-unusable os-scrollbar-auto-hidden"><div className="os-scrollbar-track os-scrollbar-track-off"><div className="os-scrollbar-handle" ></div></div></div><div className="os-scrollbar os-scrollbar-vertical os-scrollbar-auto-hidden"><div className="os-scrollbar-track os-scrollbar-track-off"><div className="os-scrollbar-handle" ></div></div></div><div className="os-scrollbar-corner"></div></div>
              </div>
            </div>
          </div>
          <div className="avatar-dropdown dropdown">
            <span
              className="user-dropdown"
              data-toggle="dropdown"
            >
              <div className="user-dropdown-content">
                <span className="user-dropdown-avatar">
                  <Avatar
                    size="medium"
                    src={userAvatar || undefined}
                    alt="avatar"
                  />
                </span>
                <span className="user-dropdown-text">
                  <span>{userText}</span>{' '}
                  {!currentUserIsSuperadmin && ['multi', 'multi-with-subdomain'].includes(
                    config.tenantMode,
                  ) && (
                      <Link to="/tenant">
                        <button
                          className="dropdown-item"
                          type="button"
                        >
                          <i className="fas fa-th-large" />{' '}
                          {i18n('auth.tenants')}
                        </button>
                      </Link>
                    )}
                  {config.apiDocumentationUrl && (
                    <a
                      href={config.apiDocumentationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: 'none' }}
                    >
                      <button
                        className="dropdown-item"
                        type="button"
                      >
                        <i className="fas fa-code" />{' '}
                        {i18n('api.menu')}
                      </button>
                    </a>
                  )}
                  <div className="dropdown-divider"></div>
                  <DarkMode />
                  <button
                    onClick={doSignout}
                    className="dropdown-item"
                    type="button"
                  >
                    <i className="fas fa-sign-out-alt" />{' '}
                    {i18n('auth.signout')}
                  </button>
                </span>
              </div>
            </span>
            <div className="dropdown-menu dropdown-menu-right">
              <div className="bg-white dark__bg-1000 rounded-2 py-2 m-25">
                <Link to='/profile'>
                  <button
                    className="dropdown-item"
                    type="button"
                  >
                    <i className="fas fa-user" />{' '}
                    {i18n('auth.profile.title')}
                  </button>
                </Link>
                <Link to="/password-change">
                  <button
                    className="dropdown-item"
                    type="button"
                  >
                    <i className="fas fa-lock" />{' '}
                    {i18n('auth.passwordChange.title')}
                  </button>
                </Link>
                {!currentUserIsSuperadmin && ['multi', 'multi-with-subdomain'].includes(
                  config.tenantMode,
                ) && (
                    <Link to="/tenant">
                      <button
                        className="dropdown-item"
                        type="button"
                      >
                        <i className="fas fa-th-large" />{' '}
                        {i18n('auth.tenants')}
                      </button>
                    </Link>
                  )}
                {config.apiDocumentationUrl && (
                  <a
                    href={config.apiDocumentationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none' }}
                  >
                    <button
                      onClick={doSignout}
                      className="dropdown-item"
                      type="button"
                    >
                      <i className="fas fa-code" />{' '}
                      {i18n('api.menu')}
                    </button>
                  </a>
                )}
                <Link to="/change-logs">
                  <button
                    className="dropdown-item"
                    type="button"
                  >
                    <i className="fas fa-history" />{' '}
                    {i18n('changeLog.title')}
                  </button>
                </Link>
                <div className="dropdown-divider"></div>
                <DarkMode />
                <button
                  onClick={doSignout}
                  className="dropdown-item"
                  type="button"
                >
                  <i className="fas fa-sign-out-alt" />{' '}
                  {i18n('auth.signout')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HeaderWrapper >
  );
}

export default Header;
