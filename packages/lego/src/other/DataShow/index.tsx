import React, { CSSProperties } from 'react';

import useTheme from '../../hooks/useTheme';
import './index.less';

const prefixName = 'td-lego-data-show';

// 默认宽高
const initialSize = 450;

export interface DataShowProps {
  style?: CSSProperties;
  title?: string;
  data?: string;
}

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
      <div className={`${prefixName}-data-wrap`}>
        <div className={`${prefixName}-title-wrap`}>
          <div
            className={`${prefixName}-title`}
            style={{
              ...theme.typography.h3,
              color: theme.colors.gray50,
              lineHeight: '65px',
            }}
          >
            {title}
          </div>
        </div>
        <div
          className={`${prefixName}-total`}
          style={{
            color: theme.colors.gray50,
            ...theme.typography.h4,
            lineHeight: theme.typography.h4.lineHeight + 'px',
          }}
        >
          {data}
        </div>
      </div>
    </div>
  );
};
