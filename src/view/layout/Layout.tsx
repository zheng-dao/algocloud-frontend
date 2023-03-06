import React, { useEffect } from 'react';
import Header from 'src/view/layout/Header';
import Menu from 'src/view/layout/Menu';
import { useRouteMatch } from 'react-router-dom';
import LayoutWrapper from 'src/view/layout/styles/LayoutWrapper';
import assetListActions from 'src/modules/algorand/asset/list/assetListActions';
import assetListSelectors from 'src/modules/algorand/asset/list/assetListSelectors';
import { useDispatch, useSelector } from 'react-redux';

function Layout(props) {
  const match = useRouteMatch();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(assetListActions.doFetch());
  }, [dispatch]);

  return (
    <LayoutWrapper>
      <Menu url={match.url} />
      <div id="main" className="main">
        <Header />
        <div className="content">{props.children}</div>
      </div>
    </LayoutWrapper>
  );
}

export default Layout;
