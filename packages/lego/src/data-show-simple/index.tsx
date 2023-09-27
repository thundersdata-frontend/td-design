import React, { CSSProperties } from 'react';

import { DataShowProps } from '../data-show';
import useStyle from '../hooks/useStyle';
import useTheme from '../hooks/useTheme';
import './index.less';

const prefixName = 'td-lego-data-simple-show';

export default ({ style, title, data }: DataShowProps) => {
  const theme = useTheme();
  const { style: modifiedStyle } = useStyle(style);
  return (
    <div
      className={`${prefixName}-container`}
      style={{
        ...modifiedStyle,
      }}
    >
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

      <div className={`${prefixName}-data-wrap`}>
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
