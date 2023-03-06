import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import actions from 'src/modules/algorand/asset/show/assetShowActions';
import selectors from 'src/modules/algorand/asset/show/assetShowSelectors';
import { formatPercent, formattedNum } from 'src/modules/algorand/utils';
import { images } from 'src/images/images';

const IconBar= () => {
  const match = useRouteMatch();
  const dispatch = useDispatch();
  const assetId = match.params.assetId;

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

      <div className='row' style={{ paddingTop: 20 }}>
        <div className='col-sm-12 flex-row' style={{ display: 'flex', alignItems: 'center' }}>
          <img className='token' src={image} style={{ width: 40, marginRight: 10, objectFit: 'contain', float: 'left', marginBottom: 8 }}></img>

          <h3 style={{ marginRight: 20 }}>{asset['unitName']}</h3>
          <h5 className='text-info' style={{ marginRight: 20 }}>{priceData.length > 0 ? formattedNum(priceData[priceData.length - 1]['close'], true) : formattedNum(0)}</h5>
          <h6 className={(parseFloat(formatPercent(asset['lastDayPriceChange'], 3)) < 0) ? 'text-danger' : 'text-success'}>{formatPercent(asset['lastDayPriceChange'], 2)}</h6>
        </div>
      </div>
    </>
  )
}

export default IconBar;
