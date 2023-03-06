import React, { useState, useRef, useEffect } from 'react';
import { darken } from 'polished';
import { useMedia } from 'react-use';
import {
  ResponsiveContainer,
} from 'recharts';

import { ASSET_CHART_VIEW } from 'src/modules/algorand/constants';
import {
  ChartWindowWrapper,
  Divider,
  OptionButton,
  OptionButtonBottomContainer,
  OptionButtonContainer,
  OptionButtonWrapper,
  RowBetween
} from 'src/view/algorand/styled';
import OverviewContent from 'src/view/overview/OverviewContent';
import moment from 'moment';

export const toLocalTime = (time: number) => {
  let utcDate = new Date(time * 1000).toString();
  let arr = utcDate.split('GMT');
  utcDate = arr[0] + 'UTC'
  let localDate = new Date(utcDate).getTime() / 1000;
  return localDate
}

const OverviewAssetCard = (props) => {
  const {
    color,
    data,
    title = ''
  } = props;

  const togglePosition = JSON.parse(localStorage.getItem(data.assetId));

  const [chartFilter, setChartFilter] = useState(togglePosition === null ? ASSET_CHART_VIEW.LIQUIDITY : togglePosition.chartFilter);

  const below2000 = useMedia('(max-width: 2000px)');
  const below1080 = useMedia('(max-width: 1080px)');
  const below600 = useMedia('(max-width: 600px)');
  const aspect = below2000 ? 60 / 50 : below1080 ? 60 / 32 : below600 ? 60 / 42 : 60 / 22;

  const ref = useRef<HTMLElement>();
  const isClient = typeof window === 'object';
  const [width, setWidth] = useState(ref?.current?.clientWidth);

  let createdDate = new Date(data.createdDate)

  const formattedData = {
    time: toLocalTime(createdDate.getTime() / 1000),
    value: parseFloat(data['liquidity'])
  }

  let time: number;
  let date: string = '';

  if (formattedData) {
    time = formattedData.time;
    date = moment(time * 1000).format('MMMM D, YYYY');
  }

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

  return (
    <ChartWindowWrapper >
      <RowBetween
        mb={
          chartFilter === ASSET_CHART_VIEW.LIQUIDITY ||
          chartFilter === ASSET_CHART_VIEW.VOLUME
        }
        align="flex-start"
      >

      </RowBetween>

      {date && <div className='var-color mb-2'>{date}</div>}

      <div style={{ height: '50px' }}>
        <ResponsiveContainer aspect={aspect}>
          <OverviewContent
            data={data}
            base={0}
            title={'Liquidity'}
            field={'liquidity'}
            width={width}
            assetId={title}
          />
        </ResponsiveContainer>
      </div>

      <div style={{ height: '50px' }}>
        <ResponsiveContainer aspect={aspect}>
          <OverviewContent
            data={data}
            base={0}
            title={'Volume'}
            field={'lastDayVolume'}
            width={width}
            assetId={title}
          />
        </ResponsiveContainer>
      </div>

      <div style={{ height: '50px' }}>
        <ResponsiveContainer aspect={aspect}>
          <OverviewContent
            data={data}
            base={0}
            title={'Market Cap'}
            field={'marketCap'}
            width={width}
            assetId={title}
          />
        </ResponsiveContainer>
      </div>
    </ChartWindowWrapper>
  );
}

export default OverviewAssetCard;
