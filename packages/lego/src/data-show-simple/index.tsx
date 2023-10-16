import React, { CSSProperties } from 'react';

import { DataShowProps } from '../data-show';
import useTheme from '../hooks/useTheme';
import './index.less';

// 默认宽高
const initialSize = 450;

const prefixName = 'td-lego-data-simple-show';

export default ({ style, title, data }: DataShowProps) => {
  const theme = useTheme();
  const { width = initialSize, height = initialSize } = style || {};
  return (
    <div
      className={`${prefixName}-container`}
      style={{
        ...style,
        width,
        height,
      }}
    >
      <div className={`${prefixName}-content`}>
        <div className={`${prefixName}-title-wrap`}>
          <div
            className={`${prefixName}-title`}
            style={
              {
                ...theme.typography.h3,
                color: theme.colors.gray50,
              } as CSSProperties
            }
          >
            {title}
          </div>
        </div>
        <div
          className={`${prefixName}-data`}
          style={
            {
              color: theme.colors.gray50,
              ...theme.typography.h4,
              lineHeight: theme.typography.h4.lineHeight + 'px',
            } as CSSProperties
          }
        >
          {data}
        </div>
      </div>
    </div>
  );
};
