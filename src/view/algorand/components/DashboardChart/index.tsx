import React, { useState, useRef, useEffect } from 'react';
import { darken } from 'polished';
import { useMedia } from 'react-use';
import {
  ResponsiveContainer,
  AreaChart,
  BarChart,
  Bar,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

import {
  toK,
  toNiceDate,
  toNiceDateYear,
  formattedNum,
} from 'src/modules/algorand/utils';
import { ASSET_CHART_VIEW, ASSET_CHART_VIEW_DURATION, ASSET_CHART_VIEW_FRAME, CHART_TYPES } from 'src/modules/algorand/constants';
import CandleStickChart from 'src/view/algorand/components/CandleStickChart';
import {
  ChartWindowWrapper,
  Divider,
  OptionButton,
  OptionButtonBottomContainer,
  OptionButtonContainer,
  OptionButtonWrapper,
  RowBetween
} from 'src/view/algorand/styled';
import TradingViewChart from 'src/view/algorand/components/TradingViewChart';
import selectors from 'src/modules/algorand/asset/show/assetShowSelectors';
import { useSelector } from 'react-redux';

const DashboardAssetChart = (props) => {
  const {
    color,
    data,
    title = ''
  } = props;

  const togglePosition = JSON.parse(localStorage.getItem(data.data.assetId));

  const [chartFilter, setChartFilter] = useState(togglePosition === null ? ASSET_CHART_VIEW.LIQUIDITY : togglePosition.chartFilter);
  const [frame, setFrame] = useState(togglePosition === null ? ASSET_CHART_VIEW_FRAME.HOURLY : togglePosition.frame);
  const [duration, setDuration] = useState(togglePosition === null ? ASSET_CHART_VIEW_DURATION.THREEDAY : togglePosition.duration);

  const below2000 = useMedia('(max-width: 2000px)');
  const below1080 = useMedia('(max-width: 1080px)');
  const below600 = useMedia('(max-width: 600px)');
  const aspect = below2000 ? 60 / 50 : below1080 ? 60 / 32 : below600 ? 60 / 42 : 60 / 22;

  // const textColor = 'var(--algocloud-body-bg-2)';
  const ref = useRef<HTMLElement>();
  const isClient = typeof window === 'object';
  const [width, setWidth] = useState(ref?.current?.clientWidth);

  useEffect(() => {
    if (!isClient) {
      return;
    }
    function handleResize() {
      setWidth(ref?.current?.clientWidth ?? width);
    }
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [isClient, width]);

  let priceData = [];
  let assetData = [];
  priceData = frame === ASSET_CHART_VIEW_FRAME.DAILY ? data?.dailyPrices : data?.hourlyPrices;
  assetData = frame === ASSET_CHART_VIEW_FRAME.DAILY ? data?.dailyAssetData : data?.hourlyAssetData;

  const handleChangeDuration = (d: string) => {
    setDuration(d);
    let togglePosition = {
      chartFilter: chartFilter,
      frame: frame,
      duration: d
    };
    localStorage.setItem(data.data.assetId, JSON.stringify(togglePosition));
  }

  return (
    <ChartWindowWrapper >
      <RowBetween
        mb={
          chartFilter === ASSET_CHART_VIEW.LIQUIDITY ||
            chartFilter === ASSET_CHART_VIEW.VOLUME ||
            chartFilter === ASSET_CHART_VIEW.PRICE ? 40 : 0
        }
        align="flex-start"
      >

      </RowBetween>

      {chartFilter === ASSET_CHART_VIEW.PRICE && priceData && (
        <ResponsiveContainer aspect={aspect} ref={ref}>
          <CandleStickChart
            data={priceData}
            width={width}
            base={0}
            paddingTop='0'
            valueFormatter={(val) => val?.toFixed(4)}
            duration={duration}
            title={title}
          />
        </ResponsiveContainer>
      )}

      {chartFilter === ASSET_CHART_VIEW.VOLUME && assetData && (
        <ResponsiveContainer aspect={aspect}>
          <TradingViewChart
            data={assetData}
            base={0}
            field={'lastDayVolume'}
            width={width}
            type={CHART_TYPES.BAR}
            timeField='date'
            useWeekly={false}
            utc={true}
            duration={duration}
            assetId={title}
          />
        </ResponsiveContainer>
      )}
      {chartFilter === ASSET_CHART_VIEW.LIQUIDITY && assetData && (
        <ResponsiveContainer aspect={aspect}>
          <TradingViewChart
            data={assetData}
            base={0}
            field={'liquidity'}
            width={width}
            type={CHART_TYPES.AREA}
            timeField='date'
            useWeekly={false}
            utc={true}
            duration={duration}
            assetId={title}
          />
        </ResponsiveContainer>
      )}
      {chartFilter === ASSET_CHART_VIEW.MARKETCAP && assetData && (
        <ResponsiveContainer aspect={aspect}>
          <TradingViewChart
            data={assetData}
            base={0}
            field={'marketCap'}
            width={width}
            type={CHART_TYPES.AREA}
            timeField='date'
            useWeekly={false}
            utc={true}
            duration={duration}
            assetId={title}
          />
        </ResponsiveContainer>
      )}
      <OptionButtonBottomContainer className="chart-rack" >
        <OptionButtonContainer className="chart-buttons" style={{ textIndent: "0px" }}>
          <OptionButton className="chart-button"
            active={chartFilter === ASSET_CHART_VIEW.LIQUIDITY}
            onClick={() => {
              setChartFilter(ASSET_CHART_VIEW.LIQUIDITY);
              setFrame(ASSET_CHART_VIEW_FRAME.HOURLY);
              setDuration(ASSET_CHART_VIEW_DURATION.WEEK);
              let togglePosition = {
                chartFilter: ASSET_CHART_VIEW.LIQUIDITY,
                frame: ASSET_CHART_VIEW_FRAME.HOURLY,
                duration: ASSET_CHART_VIEW_DURATION.WEEK
              };
              localStorage.setItem(data.data.assetId, JSON.stringify(togglePosition));
            }}
          >
            Liquidity
          </OptionButton>
          <OptionButton className="chart-button"
            active={chartFilter === ASSET_CHART_VIEW.VOLUME}
            onClick={() => {
              setChartFilter(ASSET_CHART_VIEW.VOLUME);
              setFrame(ASSET_CHART_VIEW_FRAME.HOURLY);
              setDuration(ASSET_CHART_VIEW_DURATION.THREEDAY);
              let togglePosition = {
                chartFilter: ASSET_CHART_VIEW.VOLUME,
                frame: ASSET_CHART_VIEW_FRAME.HOURLY,
                duration: ASSET_CHART_VIEW_DURATION.THREEDAY
              };
              localStorage.setItem(data.data.assetId, JSON.stringify(togglePosition));
            }}
          >
            Volume
          </OptionButton>
          <OptionButton className="chart-button"
            active={chartFilter === ASSET_CHART_VIEW.PRICE}
            onClick={() => {
              setChartFilter(ASSET_CHART_VIEW.PRICE);
              setFrame(ASSET_CHART_VIEW_FRAME.HOURLY);
              setDuration(ASSET_CHART_VIEW_DURATION.THREEDAY);
              let togglePosition = {
                chartFilter: ASSET_CHART_VIEW.PRICE,
                frame: ASSET_CHART_VIEW_FRAME.HOURLY,
                duration: ASSET_CHART_VIEW_DURATION.THREEDAY
              };
              localStorage.setItem(data.data.assetId, JSON.stringify(togglePosition));
            }}
          >
            Price
          </OptionButton>
          <OptionButton className="chart-button"
            active={chartFilter === ASSET_CHART_VIEW.MARKETCAP}
            onClick={() => {
              setChartFilter(ASSET_CHART_VIEW.MARKETCAP);
              setFrame(ASSET_CHART_VIEW_FRAME.HOURLY);
              setDuration(ASSET_CHART_VIEW_DURATION.THREEDAY);
              let togglePosition = {
                chartFilter: ASSET_CHART_VIEW.MARKETCAP,
                frame: ASSET_CHART_VIEW_FRAME.HOURLY,
                duration: ASSET_CHART_VIEW_DURATION.THREEDAY
              };
              localStorage.setItem(data.data.assetId, JSON.stringify(togglePosition));
            }}
          >
            Market Cap
          </OptionButton>
        </OptionButtonContainer>
        <OptionButtonContainer className="time-buttons" style={{ textIndent: "0px" }}>
          <Divider width='1px' backgroundColor="black" />

          <OptionButton className="time-button"
            active={frame === ASSET_CHART_VIEW_FRAME.HOURLY}
            onClick={() => {
              setFrame(ASSET_CHART_VIEW_FRAME.HOURLY);
              let togglePosition = {
                chartFilter: chartFilter,
                frame: ASSET_CHART_VIEW_FRAME.HOURLY,
                duration: duration
              };
              localStorage.setItem(data.data.assetId, JSON.stringify(togglePosition));
            }}
          >
            1H
          </OptionButton>
          <OptionButton className="time-button"
            active={frame === ASSET_CHART_VIEW_FRAME.DAILY}
            onClick={() => {
              setFrame(ASSET_CHART_VIEW_FRAME.DAILY);
              let togglePosition = {
                chartFilter: chartFilter,
                frame: ASSET_CHART_VIEW_FRAME.DAILY,
                duration: duration
              };
              localStorage.setItem(data.data.assetId, JSON.stringify(togglePosition));
            }}
          >
            1D
          </OptionButton>
          <Divider width='1px' />
          <OptionButton className="time-button"
            active={duration === ASSET_CHART_VIEW_DURATION.THREEDAY}
            onClick={() => handleChangeDuration(ASSET_CHART_VIEW_DURATION.THREEDAY)}
          >
            3D
          </OptionButton>
          <OptionButton className="time-button"
            active={duration === ASSET_CHART_VIEW_DURATION.WEEK}
            onClick={() => handleChangeDuration(ASSET_CHART_VIEW_DURATION.WEEK)}
          >
            1W
          </OptionButton>
          <OptionButton className="time-button"
            active={duration === ASSET_CHART_VIEW_DURATION.MONTH}
            onClick={() => handleChangeDuration(ASSET_CHART_VIEW_DURATION.MONTH)}
          >
            1M
          </OptionButton>
          <OptionButton className="time-button"
            active={duration === ASSET_CHART_VIEW_DURATION.ALL}
            onClick={() => handleChangeDuration(ASSET_CHART_VIEW_DURATION.ALL)}
          >
            ALL
          </OptionButton>
        </OptionButtonContainer>
        <OptionButtonContainer>
        </OptionButtonContainer>
      </OptionButtonBottomContainer>
    </ChartWindowWrapper>
  );
}

export default DashboardAssetChart;
