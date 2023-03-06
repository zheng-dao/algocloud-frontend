import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AlgorandService from 'src/modules/algorand/algorandService';
import overviewSelectors from 'src/modules/algorand/overview/overviewSelectors';
import DashboardAssetChart from 'src/view/algorand/components/DashboardChart';
import Spinner from 'src/view/shared/Spinner';
import { Link } from 'react-router-dom';
import { images } from 'src/images/images';
import { formatPercent, formattedNum } from 'src/modules/algorand/utils';

export default function DashboardChart(props) {
  const { asset } = props;
  const [assetData, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [mounted, setMounted] = useState(0);

  const lastUpdated = useSelector(
    overviewSelectors.selectLastUpdatedTime
  );

  useEffect(() => {
    if (!asset) return;
    getAssetData();
    setMounted(new Date().getTime() / 1000);
    return () => { setLoading(true) }
  }, [asset]);

  useEffect(() => {
    if (mounted) {
      let diff = new Date().getTime() / 1000 - mounted
      if (diff > 10) {
        getAssetData();
      }
    }
    return () => { setLoading(true) }
  }, [mounted, lastUpdated])

  let image = asset['assetId'] === 0 ? '/assets/asa-list/ALGO/icon.png' : `https://algoexplorer.io/images/assets/big/light/${asset['assetId']}.png`;
  for (let i = 0; i < images?.length; i++) {
    const img = images[i];
    let id = parseInt(img.split('-')[1]);
    if (id == asset['assetId']) {
      image = `/assets/asa-list/${img}/icon.png`;
      break;
    }
  }

  const getAssetData = async () => {
    try {
      setLoading(true);
      const data = await AlgorandService.getAlgorandAsset(
        asset.assetId,
        'id',
        10,
        0,
      );

      if (data.count) {
        setData(data);
      } else {
        if (data.error) {
          setError(true);
        }
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  }

  return (
    <>
      <div className="container w-50 w-100 bg-box rounded m-0 p-0">
        <div className="ol-2" style={{ maxWidth: "100%", alignItems: "center" }}>
          <div className="" style={{ width: "min-content" }}>
            <img className='token card-token' src={image} style={{ width: 35, marginRight: '.5rem' }}></img>
          </div>
          <div className="p-2   w-130">
            <h5 style={{ fontSize: "1rem" }} className="banner-ticker-2" >{asset['unitName']}</h5>
            <Link to={`/algorand/assets/${asset.assetId}`}>
              <h6 className='ww-2 m-0'>{asset.name}</h6>
            </Link>
          </div>
          <div className="p-2   w-130">
            <h5 style={{ fontSize: "1rem" }} className='text-info banner-ticker-2' >{(asset.price)?.toFixed(3) || ''}</h5>
            <h6 className="ww-2 m-0">Price (Live)</h6></div>
          <div className="p-2   w-130">
            <h5 style={{ fontSize: "1rem" }} className={(parseFloat(formatPercent(asset.lastDayPriceChange)) < 0) ? 'text-danger ww-2' : 'text-success ww-2'}>{formatPercent(asset.lastDayPriceChange)}
              {asset.lastDayPriceChange ? (parseFloat(formatPercent(asset.lastDayPriceChange)) < 0) ? <span>{'  '}<i
                className={`fas fa-arrow-down`}
              ></i></span> : <span>{'  '}<i
                className={`fas fa-arrow-up`}
              ></i></span> : ''}
            </h5>
            <h6 className="ww-2 m-0">Price (24hrs)</h6></div>
        </div>
      </div>
      <div className='dashboard-chard-card'>

        {
          loading && (
            <Spinner />
          )
        }
        {
          (!loading && assetData) &&
          <DashboardAssetChart
            color='#687dfd'
            data={assetData}
            title={asset.unitName}
          />
        }
        {
          (!loading && error) && (
            <h6 style={{ marginTop: 10 }}>There is no data to display</h6>
          )
        }
      </div>
    </>
  );
}
