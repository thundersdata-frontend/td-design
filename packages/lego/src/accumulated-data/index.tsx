import React from 'react';

import ScrollNumber from '../flip-number';
import './index.less';

const prefixName = 'td-lego-accumulated-data';

export default function ({
  data,
  numberScroll = false,
}: {
  data: { name: string; value: string | number; unit?: string }[];
  numberScroll?: boolean;
}) {
  return (
    <div className={`${prefixName}-container`}>
      {data.map(({ name, unit, value }, index) => (
        <div className={`${prefixName}-item`} key={index}>
          <div className={`${prefixName}-block`}>
            <div className={`${prefixName}-name`}>{name}</div>
            <div className={`${prefixName}-valueContent`}>
              <div className={`${prefixName}-value`}>{numberScroll ? <ScrollNumber value={value} /> : value}</div>
              <div className={`${prefixName}-unit`}>{unit}</div>
            </div>
          </div>
          {index !== data.length - 1 && <div className={`${prefixName}-border`}></div>}
        </div>
      ))}
    </div>
  );
}
