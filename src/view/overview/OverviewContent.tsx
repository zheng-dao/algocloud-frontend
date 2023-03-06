import React, { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { formattedNum } from 'src/modules/algorand/utils';
import { GraphWrapper } from 'src/view/algorand/styled';
import moment from 'moment';
import Spinner from 'src/view/shared/Spinner';

dayjs.extend(utc);

export const toLocalTime = (time: number) => {
  let utcDate = new Date(time * 1000).toString();
  let arr = utcDate.split('GMT');
  utcDate = arr[0] + 'UTC'
  let localDate = new Date(utcDate).getTime() / 1000;
  return localDate
}

const OverviewContent = ({
  data,
  base,
  field,
  title = '',
  assetId = null,
  width,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  let createdDate = new Date(data.createdDate)

  const formattedData = {
    time: toLocalTime(createdDate.getTime() / 1000),
    value: parseFloat(data[field])
  }

  let rootb = document.getElementById("root")!;
  let styleb = window.getComputedStyle(rootb);
  let textColor = styleb.getPropertyValue('--algocloud-headings-color');

  useEffect(() => {
    var toolTip = document.createElement('div');
    toolTip.setAttribute('id', 'tooltip-id-' + assetId);
    toolTip.className = 'three-line-legend';
    if (ref.current)
      ref.current.appendChild(toolTip);
    toolTip.style.display = 'block';
    toolTip.style.fontWeight = '500';
    toolTip.style.top = '-' + 8 + 'px';
    toolTip.style.position = 'absolute';
    toolTip.style.zIndex = '100';
    toolTip.style.backgroundColor = 'transparent';

    let price = base;
    let time: number;
    let date: string = '';
    if (formattedData) {
      price = formattedData.value;
      time = formattedData.time;
      date = moment(time * 1000).format('MMMM D, YYYY');
    }

    toolTip.innerHTML =
      `<div class='d-flex align-items-center justify-content-end'><div style="font-size: 16px; margin: 4px 0px;">${title}</div>` +
      `<div style="font-size: 22px; margin: 4px 0px; color:${textColor}" >` +
      formattedNum(price, true) +
      '</div></div>';
  }, [
    base,
    data,
    formattedData,
    textColor,
    title,
    width
  ]);

  return (
    <GraphWrapper>
      <div ref={ref} className="var-color" id={'tradchart-id-' + assetId} />
      {
        (formattedData) ? (
          ''
        ) : (
          <div style={{ position: 'absolute', top: '40%', left: '45%' }}>
            <Spinner />
          </div>
        )
      }
    </GraphWrapper>
  );
}

export default OverviewContent;
