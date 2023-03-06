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

import { POOL_CHART_VIEW, ASSET_CHART_VIEW_DURATION, ASSET_CHART_VIEW_FRAME, CHART_TYPES } from 'src/modules/algorand/constants';
import { toK, toNiceDate, toNiceDateYear, formattedNum } from 'src/modules/algorand/utils';
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
import selectors from 'src/modules/algorand/pool/show/poolShowSelectors';
import { useSelector } from 'react-redux';

const PoolChart = (props) => {
  const {
    color,
    loading,
    pool,
    _,
    __,
    ___,
  } = props;

  const [chartFilter, setChartFilter] = useState(POOL_CHART_VIEW.LIQUIDITY);
  const [frame, setFrame] = useState(ASSET_CHART_VIEW_FRAME.HOURLY);
  const [duration, setDuration] = useState(ASSET_CHART_VIEW_DURATION.THREEDAY);

  const below2000 = useMedia('(max-width: 2000px)');
  const below1080 = useMedia('(max-width: 1080px)')
  const below600 = useMedia('(max-width: 600px)')

  const aspect = below2000 ? 58 / 28 : below1080 ? 60 / 32 : below600 ? 60 / 42 : 60 / 22;

  const ref = useRef<HTMLElement>()
  const isClient = typeof window === 'object'
  const [width, setWidth] = useState(ref?.current?.clientWidth)

  useEffect(() => {
    if (!isClient) {
      return
    }
    function handleResize() {
      setWidth(ref?.current?.clientWidth ?? width)
    }
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [isClient, width]);

  const chartData = useSelector(frame === ASSET_CHART_VIEW_FRAME.DAILY ? selectors.selectDailyPoolData : selectors.selectHourlyPoolData);
  const rateOneData = useSelector(frame === ASSET_CHART_VIEW_FRAME.DAILY ? selectors.selectDailyOneRates : selectors.selectHourlyOneRates);
  const rateTwoData = useSelector(frame === ASSET_CHART_VIEW_FRAME.DAILY ? selectors.selectDailyTwoRates : selectors.selectHourlyTwoRates);
  console.log('rateTwoData: ', rateTwoData);
  const handleChangeDuration = (d: string) => {
    setDuration(d);
  }

  return (
    <ChartWindowWrapper className="card-hover">
      <RowBetween
        mb={
          chartFilter === POOL_CHART_VIEW.LIQUIDITY ||
            chartFilter === POOL_CHART_VIEW.VOLUME ||
            chartFilter === POOL_CHART_VIEW.RATE_ONE ||
            chartFilter === POOL_CHART_VIEW.RATE_TWO ? 40 : 0
        }
        align="flex-start"
      >

      </RowBetween>

      {chartFilter === POOL_CHART_VIEW.RATE_ONE && rateOneData && (
        <ResponsiveContainer aspect={aspect} ref={ref}>
          <CandleStickChart
            data={rateOneData}
            width={width}
            base={0}
            paddingTop='0'
            valueFormatter={(val) => val?.toFixed(4)}
            duration={duration}
          />
        </ResponsiveContainer>
      )}

      {chartFilter === POOL_CHART_VIEW.RATE_TWO && rateTwoData && (
        <ResponsiveContainer aspect={aspect} ref={ref}>
          <CandleStickChart
            data={rateTwoData}
            width={width}
            base={0}
            paddingTop='0'
            valueFormatter={(val) => val?.toFixed(4)}
            duration={duration}
          />
        </ResponsiveContainer>
      )}

      {chartFilter === POOL_CHART_VIEW.VOLUME && chartData && (
        <ResponsiveContainer aspect={aspect}>
          <TradingViewChart
            data={chartData}
            base={0}
            field={'lastDayVolume'}
            width={width}
            type={CHART_TYPES.BAR}
            timeField='date'
            useWeekly={false}
            utc={true}
            duration={duration}
          />
        </ResponsiveContainer>
      )}

      {chartFilter === POOL_CHART_VIEW.LIQUIDITY && chartData && (
        <ResponsiveContainer aspect={aspect}>
          <TradingViewChart
            data={chartData}
            base={0}
            field={'liquidity'}
            width={width}
            type={'area'}
            timeField='date'
            useWeekly={false}
            utc={true}
            duration={duration}
          />
        </ResponsiveContainer>
      )}
      <OptionButtonBottomContainer className="chart-rack">
        <OptionButtonContainer className="chart-buttons" style={{ textIndent: "0px" }}>
          <OptionButton className="chart-button"
            active={chartFilter === POOL_CHART_VIEW.LIQUIDITY}
            onClick={() => {
              setChartFilter(POOL_CHART_VIEW.LIQUIDITY);
              setFrame(ASSET_CHART_VIEW_FRAME.HOURLY);
              setDuration(ASSET_CHART_VIEW_DURATION.WEEK);
            }}
          >
            Liquidity
          </OptionButton>
          <OptionButton className="chart-button"
            active={chartFilter === POOL_CHART_VIEW.VOLUME}
            onClick={() => {
              setChartFilter(POOL_CHART_VIEW.VOLUME);
              setFrame(ASSET_CHART_VIEW_FRAME.HOURLY);
              setDuration(ASSET_CHART_VIEW_DURATION.THREEDAY);
            }}
          >
            Volume
          </OptionButton>

          {!loading && (
            <OptionButton className="chart-button"
              active={chartFilter === POOL_CHART_VIEW.RATE_ONE}
              onClick={() => {
                setChartFilter(POOL_CHART_VIEW.RATE_ONE);
                setFrame(ASSET_CHART_VIEW_FRAME.HOURLY);
                setDuration(ASSET_CHART_VIEW_DURATION.THREEDAY);
              }}
            >
              {`${pool['assetOneUnitName']}/${pool['assetTwoUnitName']}`}
            </OptionButton>
          )}

          {!loading && (
            <OptionButton className="chart-button"
              active={chartFilter === POOL_CHART_VIEW.RATE_TWO}
              onClick={() => {
                setChartFilter(POOL_CHART_VIEW.RATE_TWO);
                setFrame(ASSET_CHART_VIEW_FRAME.HOURLY);
                setDuration(ASSET_CHART_VIEW_DURATION.THREEDAY);
              }}
            >
              {`${pool['assetTwoUnitName']}/${pool['assetOneUnitName']}`}
            </OptionButton>
          )}
        </OptionButtonContainer>

        <OptionButtonContainer className="time-buttons" style={{ textIndent: "0px" }}>
          <Divider width='1px' backgroundColor="black" />

          <OptionButton className="time-button"
            active={frame === ASSET_CHART_VIEW_FRAME.HOURLY}
            onClick={() => setFrame(ASSET_CHART_VIEW_FRAME.HOURLY)}
          >
            1H
          </OptionButton>
          <OptionButton className="time-button"
            active={frame === ASSET_CHART_VIEW_FRAME.DAILY}
            onClick={() => setFrame(ASSET_CHART_VIEW_FRAME.DAILY)}
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

export default PoolChart;
