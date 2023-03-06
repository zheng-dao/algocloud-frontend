import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch, Link } from 'react-router-dom';
import actions from 'src/modules/algorand/asset/show/assetShowActions';
import selectors from 'src/modules/algorand/asset/show/assetShowSelectors';
import { formatPercent, formattedNum } from 'src/modules/algorand/utils';
import { images } from 'src/images/images';
const AssetShowCard = () => {
const match = useRouteMatch();
const dispatch = useDispatch();
const assetId = match.params.assetId;
const pools = useSelector(selectors.selectPools);
const assetName = useSelector(selectors.selectAssetName);
const assetData = useSelector(selectors.selectDailyAssetData);
useEffect(() => {
dispatch(actions.doReset());
dispatch(actions.doFetch(assetId));
}, [dispatch, assetId]);
const asset = useSelector(selectors.selectAsset);
const priceData = useSelector(selectors.selectHourlyPrices);
let image = asset['assetId'] === 0 ? '/assets/asa-list/ALGO/icon.png' : `https://algoexplorer.io/images/assets/big/light/${asset['assetId']}.png`;
for (let i = 0; i < images?.length; i++) {
const img = images[i];
let id = parseInt(img.split('-')[1]);
if (id == asset['assetId']) {
image = `/assets/asa-list/${img}/icon.png`;
break;
}
}
return (
<>
<div className="container w-50 w-100 card bg-box rounded card-hover-3 m-0 p-0">
   <div className="ol" style={{ maxWidth: "100%", alignItems: "center" }}> <div className="p-3 token-card" style={{ width: "min-content" }}><img className='token card-token' src={image} style={{ width: 60}}></img>
</div>
<div className="p-2  col-sm w-130">
   <h5 className="banner-ticker" >{asset['unitName']}</h5>
   <Link to={`/algorand/assets/${asset.assetId}`}>
   <h6 className='ww'>{asset.name}</h6>
   </Link> 
</div>
<div className="p-2  col-sm w-130">
   <h5 className='text-info banner-ticker' >{priceData.length > 0 ? formattedNum(priceData[priceData.length - 1]['close'], true) : formattedNum(0)}</h5>
   <h6 className="ww">Price (Live)</h6>
</div>
<div className="p-2  col-sm w-130">
   <h5 className={(parseFloat(formatPercent(asset.lastDayPriceChange)) < 0) ? 'text-danger ww' : 'text-success ww'}>{formatPercent(asset.lastDayPriceChange)}
   {asset.lastDayPriceChange ? (parseFloat(formatPercent(asset.lastDayPriceChange)) < 0) ? <span>{'  '}<i
      className={`fas fa-arrow-down`}
      ></i></span> : <span>{'  '}<i
      className={`fas fa-arrow-up`}
      ></i></span> : ''}
   </h5>
   <h6 className="ww">Price (24hrs)</h6>
</div>
               </div></div>
</>
)
}
export default AssetShowCard;