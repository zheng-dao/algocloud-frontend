import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { i18n } from 'src/i18n';
import selectors from 'src/modules/algocloudhq/overview/overviewSelectors';
import actions from 'src/modules/algocloudhq/overview/overviewActions';

import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import OverviewChart from 'src/view/algocloudhq/pages/overview/chart/OverviewChart';
import PoolsTable from 'src/view/algocloudhq/pages/overview/table/PoolsTable';
import AssetsTable from 'src/view/algocloudhq/pages/overview/table/AssetsTable';
import FavoritesTable from 'src/view/algocloudhq/pages/overview/table/FavoritesTable';
import {
  SectionTitleBar,
  SectionTitle,
  AlgoexplorerSection
} from 'src/view/algocloudhq/styled';


function OverviewPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.doReset());
    dispatch(actions.doFetch());
  }, [dispatch]);

  const assets = useSelector(selectors.selectAssets);
  const pools = useSelector(selectors.selectPools);
  const favorites = useSelector(selectors.selectFavorites);

  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('algocloudhq.menu')],
        ]}
      />

      <AlgoexplorerSection>
        Do you want to check global Algorand stats?<Link to="/algocloudhq/global">Click Here »</Link>
      </AlgoexplorerSection>

      <OverviewChart />

      <ContentWrapper className="card-hover">
        <SectionTitleBar className="table-header">
          <SectionTitle>Favorites</SectionTitle>
          <h6 className='m-0'>
            <Link
              className="btn btn-link no-padding"
              to={`/algocloudhq/favorites`}
            >
              See All
            </Link>
          </h6>
        </SectionTitleBar>
        <FavoritesTable
          assets={favorites}
        />
      </ContentWrapper>

      <ContentWrapper className="card-hover">
        <SectionTitleBar className="table-header">
          <SectionTitle>Top Assets</SectionTitle>
          <h6 className='m-0'>
            <Link
              className="btn btn-link no-padding"
              to={`/algocloudhq/assets`}
            >
              See All
            </Link>
          </h6>
        </SectionTitleBar>
        <AssetsTable
          assets={assets}
        />
      </ContentWrapper>

      <ContentWrapper className="card-hover">
        <SectionTitleBar className="table-header">
          <SectionTitle>Top Pools</SectionTitle>
          <Link
            className="btn btn-link no-padding"
            to={`/algocloudhq/pools`}
          >
            See All
          </Link>
        </SectionTitleBar>
        <PoolsTable
          pools={pools}
        />
      </ContentWrapper>
    </>
  )
}

export default OverviewPage;
