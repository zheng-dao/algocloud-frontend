import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { i18n } from 'src/i18n';
import DashboardBarChart from 'src/view/dashboard/DashboardBarChart';
import DashboardChart from 'src/view/dashboard/DashboardChart';
import DashboardDoughnutChart from 'src/view/dashboard/DashboardDoughnutChart';
import DashboardHorizontalBarChart from 'src/view/dashboard/DashboardHorizontalBarChart';
import DashboardLineChart from 'src/view/dashboard/DashboardLineChart';
import DashboardMixChartOne from 'src/view/dashboard/DashboardMixChartOne';
import DashboardMixChartTwo from 'src/view/dashboard/DashboardMixChartTwo';
import DashboardPolarChart from 'src/view/dashboard/DashboardPolarChart';
import DashboardRadarChart from 'src/view/dashboard/DashboardRadarChart';
import selectors from 'src/modules/algorand/overview/overviewSelectors';
import actions from 'src/modules/algorand/overview/overviewActions';

const DashboardPage = (props) => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.doReset());
    dispatch(actions.doFetch());
  }, [dispatch]);

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
            favorites && Array.isArray(favorites) && favorites.length > 0 &&
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
                    <DashboardChart asset={favorite} />
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

export default DashboardPage;
