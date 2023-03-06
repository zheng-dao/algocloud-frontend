import React, { useEffect, useState, useRef } from 'react';
import { ResponsiveContainer } from 'recharts';
import { useDispatch, useSelector } from 'react-redux';
import selectors from 'src/modules/algorand/overview/overviewSelectors';
import { CHART_TYPES } from 'src/modules/algorand/constants';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import TradingViewChart from 'src/view/algorand/components/TradingViewChart';
import PriceStickChart from 'src/view/algorand/components/PriceStickChart';
import { formatPercent, formattedNum } from 'src/modules/algorand/utils';
import { Link } from 'react-router-dom';
import { images } from 'src/images/images';
import {
  FlexContainer,
  ChartWindowWrapper,
} from 'src/view/algorand/styled';
import Spinner from 'src/view/shared/Spinner';


function ShowcaseChart() {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const [width1, setWidth1] = useState(0);
  const [width2, setWidth2] = useState(0);
  const [width3, setWidth3] = useState(0);
  const [width4, setWidth4] = useState(0);

  const showcase = useSelector(selectors.selectShowcase);
  const dailyData = useSelector(selectors.selectDailyData);
  const priceData = useSelector(selectors.selectHourlyPrices);
  let image = showcase['assetId'] === 0 ? '/assets/asa-list/ALGO/icon.png' : `https://algoexplorer.io/images/assets/big/light/${showcase['assetId']}.png`;
  for (let i = 0; i < images?.length; i++) {
    const img = images[i];
    let id = parseInt(img.split('-')[1]);
    if (id === showcase['assetId']) {
      image = `/assets/asa-list/${img}/icon.png`;
      break;
    }
  }

  useEffect(() => {
    if (ref1.current) {
      const current: any = ref1.current;
      setWidth1(Math.max(current.clientWidth, 400));
    }
    if (ref2.current) {
      const current: any = ref2.current;
      setWidth2(Math.max(current.clientWidth, 400));
    }
    if (ref3.current) {
      const current: any = ref3.current;
      setWidth3(Math.max(current.clientWidth, 400));
    }
    if (ref4.current) {
      const current: any = ref4.current;
      setWidth4(Math.max(current.clientWidth, 400));
    }
  }, [ref1, ref2, ref3, ref4])

  return (
    <FlexContainer gap="20px" className="showcase-row">
      <div className="container w-50 w-100 card bg-box rounded card-hover-3 m-0 p-0">
        <div className="ol-token-card" style={{ maxWidth: "100%", alignItems: "center" }}> <div className="p-3 token-card" style={{ width: "min-content" }}><img className='token card-token' src={image} style={{ width: 60 }}></img></div>
          <div className="p-2  col-sm w-130">
            <h5 className="banner-ticker" >{showcase['unitName']}</h5>
            <Link to={`/algorand/assets/${showcase.assetId}`}>

              <h6 className='ww'>{showcase.name}</h6></Link>

          </div>
          <div className="p-2  col-sm w-130">
            <h5 className='text-info banner-ticker' >{(showcase.price)?.toFixed(4) || ''}</h5>
            <h6 className="ww">Price (Live)</h6>
          </div>
          <div className="p-2  col-sm w-130">
            <h5 className={showcase.lastDayPriceChange ? 'text-danger ww' : 'text-success ww'}> {(showcase.lastDayPriceChange) ? (parseFloat(formatPercent(showcase.lastDayPriceChange)) < 0) ? <span className="ww-1">{'  '}<div  >{(showcase.lastDayPriceChange)?.toFixed(3) || ''}</div><i
              className={`fas fa-arrow-down pl-2`}
            ></i></span> : <span>{'  '}<i
              className={`fas fa-arrow-up pl-2`}
            ></i></span> : ''}</h5>
            <h6 className="ww">Price (24hrs)</h6>
          </div>
          <div className="p-2  col-sm w-130">
            <h5 className={showcase.lastDayLiquidityChange ? 'text-danger ww' : 'text-success ww'}> {(showcase.lastDayLiquidityChange) ? (parseFloat(formatPercent(showcase.lastDayLiquidityChange)) < 0) ? <span className="ww-1">{'  '}<div  >{(showcase.lastDayLiquidityChange)?.toFixed(3) || ''}</div><i
              className={`fas fa-arrow-down pl-2`}
            ></i></span> : <span>{'  '}<i
              className={`fas fa-arrow-up pl-2`}
            ></i></span> : ''}</h5>
            <h6 className="ww">Liquidity (24hrs)</h6>
          </div>
          <div className="p-2  col-sm w-130">
            <h5 className={showcase.lastDayVolumeChange ? 'text-danger ww' : 'text-success ww'}> {(showcase.lastDayVolumeChange) ? (parseFloat(formatPercent(showcase.lastDayVolumeChange)) < 0) ? <span className="ww-1">{'  '}<div  >{(showcase.lastDayVolumeChange)?.toFixed(3) || ''}</div><i
              className={`fas fa-arrow-down pl-2`}
            ></i></span> : <span>{'  '}<i
              className={`fas fa-arrow-up pl-2`}
            ></i></span> : ''}</h5>
            <h6 className="ww">Volume (24hrs)</h6>
          </div>
        </div>
      </div>
      <div className="showcase-row-1">
        <ContentWrapper gap="10px" className="w-50 w-100 card bg-box rounded card-hover m-0">
          <ResponsiveContainer aspect={40 / 28} ref={ref1}>
            <TradingViewChart
              data={dailyData}
              base={0}
              title={`<a href="/algorand/assets/${showcase.assetId}">${showcase.unitName || ''}</a> Liquidity`}
              field="liquidity"
              width={width1}
              type='area'
              utc={true}
              timeField='date'
            />
          </ResponsiveContainer>
        </ContentWrapper>
        <ChartWindowWrapper gap="10px" className="w-50 w-100 card bg-box rounded card-hover m-0">
          <ResponsiveContainer aspect={40 / 28} ref={ref2}>
            <TradingViewChart
              data={dailyData}
              base={0}
              title={`<a href="/algorand/assets/${showcase.assetId}">${showcase.unitName || ''}</a> Volume (24hr)`}
              field={'lastDayVolume'}
              width={width2}
              type={CHART_TYPES.BAR}
              timeField='date'
              useWeekly={false}
              utc={true}
            />
          </ResponsiveContainer>
        </ChartWindowWrapper>
      </div>
      <div className="showcase-row-1">
        <ChartWindowWrapper gap="10px" className="w-50 w-100 card bg-box rounded card-hover m-0">
          <ResponsiveContainer aspect={40 / 28} ref={ref3}>
            <PriceStickChart
              data={priceData}
              width={width3}
              type={CHART_TYPES.BAR}
              base={0}
              title={`<a href="/algorand/assets/${showcase.assetId}">${showcase.unitName || ''}</a> Price`}
              paddingTop='0'
              valueFormatter={(val) => val?.toFixed(4)}
            // duration={duration}
            />
          </ResponsiveContainer>
        </ChartWindowWrapper>
        <ContentWrapper gap="10px" className="w-50 w-100 card bg-box rounded card-hover m-0">
          <ResponsiveContainer aspect={40 / 28} ref={ref4}>
            <TradingViewChart
              data={dailyData}
              base={0}
              title={`<a href="/algorand/assets/${showcase.assetId}">${showcase.unitName || ''}</a> Market Cap`}
              field={'marketCap'}
              width={width4}
              type={CHART_TYPES.AREA}
              timeField='date'
              useWeekly={false}
              utc={true}
            />
          </ResponsiveContainer>
        </ContentWrapper>
      </div>
    </FlexContainer>
  )
}

export default ShowcaseChart;
