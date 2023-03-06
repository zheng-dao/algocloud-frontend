import React, { useEffect, useState } from 'react';
import OverviewAssetCard from 'src/view/overview/OverviewAssetCard';
import { Link } from 'react-router-dom';
import { images } from 'src/images/images';
import { formatPercent } from 'src/modules/algorand/utils';

export default function OverviewCard(props) {
  const { asset } = props;

  useEffect(() => {
    if (!asset) return;
  }, [asset]);

  let image = asset['assetId'] === 0 ? '/assets/asa-list/ALGO/icon.png' : `https://algoexplorer.io/images/assets/big/light/${asset['assetId']}.png`;
  for (let i = 0; i < images?.length; i++) {
    const img = images[i];
    let id = parseInt(img.split('-')[1]);
    if (id === asset['assetId']) {
      image = `/assets/asa-list/${img}/icon.png`;
      break;
    }
  }

  return (
    <>
      <div className="container w-50 w-100 bg-box rounded m-0 p-0 dashboard-card">
        
     
      <div className='dashboard-chard-card ' style={{ minHeight: '200px' }}>
      <div className="ol-2" style={{ maxWidth: "100%", alignItems: "center" }}>
          <div className="" style={{ width: "min-content" }}>
            <img className='token card-token' src={image} alt="" style={{ width: 35, marginRight: '.5rem' }}></img>
          </div>
          <div className="p-2 w-130">
            <h5 style={{ fontSize: "1rem" }} className="banner-ticker-2" >{asset['unitName']}</h5>
            <Link to={`/algorand/assets/${asset.assetId}`}>
              <h6 className='ww-2 m-0'>{asset.name}</h6>
            </Link>
          </div>
          <div className="p-2 w-130">
            <h5 style={{ fontSize: "1rem" }} className='text-info banner-ticker-2' >{(asset.price)?.toFixed(3) || ''}</h5>
            <h6 className="ww-2 m-0">Price (Live)</h6></div>
          <div className="p-2 w-130">
            <h5 style={{ fontSize: "1rem" }} className={(parseFloat(formatPercent(asset.lastDayPriceChange)) < 0) ? 'text-danger ww-2' : 'text-success ww-2'}>{formatPercent(asset.lastDayPriceChange)}
              {asset.lastDayPriceChange ? (parseFloat(formatPercent(asset.lastDayPriceChange)) < 0) ? <span>{'  '}<i
                className={`fas fa-arrow-down`}
              ></i></span> : <span>{'  '}<i
                className={`fas fa-arrow-up`}
              ></i></span> : ''}
            </h5>
            <h6 className="ww-2 m-0">Price (24hrs)</h6></div>
        </div>
        <OverviewAssetCard
          color='#687dfd'
          data={asset}
          title={asset.unitName}
        />
      </div>
      </div>
    </>
  );
}
