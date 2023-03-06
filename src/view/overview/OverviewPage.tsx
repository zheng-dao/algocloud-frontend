import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { i18n } from 'src/i18n';
import OverviewCard from 'src/view/overview/OverviewCard';
import selectors from 'src/modules/algorand/favorite/favoriteSelectors';
import actions from 'src/modules/algorand/favorite/favoriteActions';
import Spinner from 'src/view/shared/Spinner';

const OverviewPage = (props) => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.doReset());
    dispatch(actions.doFetch());
  }, [dispatch]);

  const loading = useSelector(selectors.selectLoading);
  const favorites = useSelector(selectors.selectFavorites);

  return (
    <>
      <div
        style={{
          padding: 0,
        }}
      >
        <div className="row no-gutters">
          {
            loading && (
              <div className='d-flex align-items-center justify-content-center' style={{ height: '80vh'}}>
                <Spinner />
              </div>
            )
          }
          {
            !loading && favorites && Array.isArray(favorites) && favorites.length > 0 &&
            favorites.map(favorite => {
              return (
                <div
                  key={favorite.id}
                  style={{
                    paddingLeft: '6px',
                    paddingRight: '6px',
                    paddingBottom: '24px',
                  }}
                  className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-4"
                >
                  <div className="bg-box p-2 rounded">
                    <OverviewCard asset={favorite} />
                  </div>
                </div>
              );
            })
          }
          
          <footer className="footer">
            <div className="algocloud-f1 i18-mobile-1 row g-0 justify-content-between fs--1 mt-4 ">
              <div className="col-12 col-sm-auto ">
                <div className="i18-mobile mb-0 text-600">{i18n('dashboard.message')}
                  <div className="i18-mobile-2">{i18n('dashboard.rights')}</div>
                </div>
              </div>
              <div className="algocloud-footer">
                <p className="mb-0 text-600">v1.0.0</p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default OverviewPage;
