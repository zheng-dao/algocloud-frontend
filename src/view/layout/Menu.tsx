import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { i18n } from 'src/i18n';
import authSelectors from 'src/modules/auth/authSelectors';
import PermissionChecker from 'src/modules/auth/permissionChecker';
import actions from 'src/modules/layout/layoutActions';
import overviewActions from 'src/modules/algorand/overview/overviewActions';
import layoutSelectors from 'src/modules/layout/layoutSelectors';
import layoutActions from 'src/modules/layout/layoutActions';
import MenuWrapper from 'src/view/layout/styles/MenuWrapper';
import menus from 'src/view/menus';
import selectors from 'src/modules/auth/authSelectors';
import AlgorandService from 'src/modules/algorand/algorandService';
import overviewSelectors from 'src/modules/algorand/overview/overviewSelectors';

function Menu(props) {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const [timer, setTimer] = useState(0);
  const [mounted, setMounted] = useState(false);

  const doToggleMenu = () => {
    let element1 = document.getElementById("body") || { style: { position: "" } }
    let element2 = document.getElementById("menu-nav") || { style: { position: "" } }
    toggle ? setToggle(false) : setToggle(true)
    if (toggle)
    if  (window.innerWidth < 575) {
      element1.style["position"] = "relative"
      element2.style["position"] = "inherit"
    }
    else {
      element1.style["position"] = ""
      element2.style["position"] = "inherit"
    }
    dispatch(layoutActions.doToggleMenu());
  };

  const logoUrl = useSelector(selectors.selectLogoUrl);

  const currentTenant = useSelector(
    authSelectors.selectCurrentTenant,
  );
  const currentUser = useSelector(
    authSelectors.selectCurrentUser,
  );
  const menuVisible = useSelector(
    layoutSelectors.selectMenuVisible,
  );
  const lastUpdated = useSelector(
    overviewSelectors.selectLastUpdatedTime
  );

  const permissionChecker = new PermissionChecker(
    currentTenant,
    currentUser,
  );

  useEffect(() => {
    if (!mounted) {
      dispatch(overviewActions.doFetchLastUpdate());
      setMounted(true);
    }
  }, [mounted, dispatch])

  useLayoutEffect(() => {
    const toggleMenuOnResize = () => {
      window.innerWidth < 576
        ? dispatch(actions.doHideMenu())
        : dispatch(actions.doShowMenu());
    };

    toggleMenuOnResize();

    window.addEventListener('resize', toggleMenuOnResize);

    return () => {
      window.removeEventListener(
        'resize',
        toggleMenuOnResize,
      );
    };
  }, [dispatch]);

  useEffect(() => {
    const newInterval = setInterval(() => {
      dispatch(overviewActions.doFetchLastUpdate());
    }, 60000);
    return () => {
      clearInterval(newInterval)
    }
  }, [dispatch]);

  useEffect(() => {
    const newTimer = setInterval(() => {
      setTimer(new Date().getTime() / 1000);
    }, 1000);
    return () => {
      clearInterval(newTimer);
    }
  }, [lastUpdated]);

  const selectedKeys = () => {
    const url = props.url;

    const match = menus.find((option) => {
      if (option.exact) {
        return url === option.path;
      }

      return (
        url === option.path ||
        url.startsWith(option.path + '/')
      );
    });

    if (match) {
      return [match.path];
    }

    return [];
  };

  const match = (permission) => {
    return permissionChecker.match(permission);
  };

  const lockedForCurrentPlan = (permission) => {
    return permissionChecker.lockedForCurrentPlan(
      permission,
    );
  };

  const updatedText = () => {
    if (lastUpdated === null) return '';
    if (timer === 0) return ''
    let pastTime = Math.floor(timer - parseInt(lastUpdated));
    return `Updated ${pastTime}s ago`
  }

  return (
    <MenuWrapper
      style={{
        display: menuVisible ? 'block' : 'none',

      }}
    >
      <div id="menu-nav" className="menu-nav">

        <div className="algocloud-fixed">
          <header className="hamburger__content__header">
            <h2 className="fs-l fw-bold flex-1 break-word lh-tight">algocloud</h2>
            <button
              type="button"
              onClick={doToggleMenu}
              className="c-btn c-btn--icon-alone js-hamburger-trigger shrink-0" aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" className="crayons-icon c-btn__icon"><title>Close</title><path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636l4.95 4.95z"></path></svg>
            </button>
          </header>

          <ul className="menu-ul">
            {menus
              .filter((menu) =>
                match(menu.permissionRequired),
              )
              .map((menu, index) => (
                <li
                  key={menu.path + index}
                  className={`menu-li text-nowrap ${selectedKeys().includes(menu.path)
                    ? 'active'
                    : ''
                    }`}
                >
                  <Link to={menu.path}>
                    <i
                      className={`menu-icon ${menu.icon}`}
                    ></i>{' '}
                    <span>{menu.label}</span>
                  </Link>
                </li>
              ))}

            {menus
              .filter((menu) =>
                lockedForCurrentPlan(menu.permissionRequired),
              )
              .map((menu, index) => (
                <li
                  key={menu.path + index}
                  className={`menu-li text-nowrap`}
                  style={{
                    cursor: 'auto',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    opacity: 0.5,
                  }}
                >
                  <div className="menu-li-locked">
                    <i
                      className={`menu-icon ${menu.icon}`}
                    ></i>{' '}
                    <span>{menu.label}</span>
                  </div>
                </li>
              ))}
          </ul>
          {
            lastUpdated && timer > 0 && (
              <div className='last-updated'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="22px" height="22px" className="signal-icon"><path d="M183.7 149.1C173.8 141.2 158.6 142.2 149.8 152.2c-50.33 57.25-50.33 150.4 0 207.7c4.738 5.406 11.39 8.156 18.06 8.156c5.615 0 11.28-1.969 15.84-5.969c9.963-8.75 10.95-23.91 2.19-33.87c-34.97-39.78-34.97-104.5 0-144.3C194.7 173.9 193.7 158.7 183.7 149.1zM512.8 75.96c-11.09-13.78-31.23-15.97-44.98-4.938c-13.8 11.06-16 31.22-4.953 45C495 156.1 512 204.5 512 256c0 51.5-16.98 99.91-49.13 139.1c-11.05 13.78-8.844 33.94 4.953 45C473.7 445.7 480.8 448 487.8 448c9.375 0 18.66-4.094 24.98-11.97C553.6 385.2 576 321.3 576 256C576 190.7 553.6 126.8 512.8 75.96zM64 256c0-51.5 16.98-99.91 49.13-139.1c11.05-13.78 8.844-33.94-4.953-45c-13.75-10.97-33.89-8.812-44.98 4.938C22.44 126.8 0 190.7 0 256c0 65.28 22.44 129.2 63.19 180C69.52 443.9 78.8 448 88.17 448c7.031 0 14.09-2.312 20-7.031c13.8-11.06 16-31.22 4.953-45C80.98 355.9 64 307.5 64 256zM426.2 152.2c-8.727-9.965-23.9-10.93-33.91-2.187c-9.963 8.75-10.95 23.91-2.19 33.87c34.97 39.78 34.97 104.5 0 144.3c-8.758 9.969-7.773 25.12 2.19 33.87c4.566 4 10.21 5.969 15.84 5.969c6.678 0 13.32-2.75 18.06-8.156C476.5 302.6 476.5 209.4 426.2 152.2zM288 200C257.1 200 232 225.1 232 256S257.1 312 288 312S344 286.9 344 256S318.9 200 288 200z"/></svg>
                <span >{updatedText()}</span> 
              </div>
            )
          }
        </div>
      </div>
    </MenuWrapper>
  );
}

export default Menu;
